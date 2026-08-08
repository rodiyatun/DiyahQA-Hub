import React, { useState, useEffect } from 'react';
import { generateWithOpenAI } from './AutomationLab/automationUtils';

// ─── Convert TC → Playwright script (smart rule-based) ───────────────────────

function toFileName(title) {
  return (title || 'test')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

// Parse langkah scenario menjadi Playwright action code
function parseStepToCode(step, testData) {
  const s = step.toLowerCase().trim();
  // Hapus nomor di awal: "1.", "2)", dst
  const cleanStep = step.replace(/^\d+[\.\)]\s*/, '').trim();

  // ── Navigate / goto ──
  const urlMatch = cleanStep.match(/https?:\/\/[\S]+/);
  if (s.includes('buka') || s.includes('navigate') || s.includes('goto') || s.includes('halaman')) {
    if (urlMatch) return `  await page.goto('${urlMatch[0].replace(/['"]/g, '')}');`;
    return `  // TODO: await page.goto('URL_HALAMAN');  // ${cleanStep}`;
  }

  // ── Fill / input / isi ──
  if (s.includes('isi') || s.includes('input') || s.includes('ketik') || s.includes('masuk') || s.includes('fill') || s.includes('enter')) {
    // Cari quoted value: "email" atau 'value'
    const quoted = cleanStep.match(/["'`]([^"'`]{1,80})["'`]/g);
    if (quoted && quoted.length >= 2) {
      const field = quoted[0].replace(/["'`]/g, '');
      const value = quoted[1].replace(/["'`]/g, '');
      // Detect tipe field
      if (/email/i.test(field)) return `  await page.getByLabel('Email').fill('${value}');`;
      if (/pass|sandi/i.test(field)) return `  await page.getByLabel('Password').fill('${value}');`;
      return `  await page.getByLabel('${field}').fill('${value}');`;
    }
    if (quoted && quoted.length === 1) {
      const val = quoted[0].replace(/["'`]/g, '');
      if (/email/i.test(s)) return `  await page.getByLabel('Email').fill('${val}');`;
      if (/pass|sandi/i.test(s)) return `  await page.getByLabel('Password').fill('${val}');`;
      return `  await page.getByPlaceholder('${val}').fill('TODO_VALUE');`;
    }
    // Dari test_data
    if (testData) {
      if (/email/i.test(s)) {
        const emailMatch = testData.match(/[\w.+-]+@[\w.-]+\.\w+/);
        if (emailMatch) return `  await page.getByLabel('Email').fill('${emailMatch[0]}');`;
      }
      if (/pass|sandi/i.test(s)) {
        const passMatch = testData.match(/[Pp]ass(?:word)?[:\s]*([^\s,]+)/);
        if (passMatch) return `  await page.getByLabel('Password').fill('${passMatch[1]}');`;
      }
    }
    if (/email/i.test(s)) return `  await page.getByLabel('Email').fill('user@example.com');  // TODO: isi email`;
    if (/pass|sandi/i.test(s)) return `  await page.getByLabel('Password').fill('password123');  // TODO: isi password`;
    return `  // TODO: await page.fill('SELECTOR', 'VALUE');  // ${cleanStep}`;
  }

  // ── Click / klik ──
  if (s.includes('klik') || s.includes('click') || s.includes('tekan') || s.includes('press')) {
    const quoted = cleanStep.match(/["'`]([^"'`]{1,60})["'`]/);
    if (quoted) {
      const label = quoted[1];
      if (/login|masuk|sign in/i.test(label)) return `  await page.getByRole('button', { name: /login|masuk|sign in/i }).click();`;
      if (/submit|kirim|simpan|save/i.test(label)) return `  await page.getByRole('button', { name: /submit|kirim|simpan/i }).click();`;
      if (/logout|keluar/i.test(label)) return `  await page.getByRole('button', { name: /logout|keluar/i }).click();`;
      return `  await page.getByRole('button', { name: '${label}' }).click();`;
    }
    // Infer dari konteks kalimat
    if (/login|masuk|sign in/i.test(s)) return `  await page.getByRole('button', { name: /login|masuk|sign in/i }).click();`;
    if (/submit|kirim|simpan/i.test(s)) return `  await page.getByRole('button', { name: /submit|kirim|simpan/i }).click();`;
    if (/logout|keluar/i.test(s)) return `  await page.getByRole('button', { name: /logout|keluar/i }).click();`;
    if (/register|daftar/i.test(s)) return `  await page.getByRole('button', { name: /register|daftar/i }).click();`;
    return `  // TODO: await page.getByRole('button', { name: 'NAMA_TOMBOL' }).click();  // ${cleanStep}`;
  }

  // ── Select / pilih dropdown ──
  if (s.includes('pilih') || s.includes('select')) {
    const quoted = cleanStep.match(/["'`]([^"'`]{1,60})["'`]/g);
    if (quoted && quoted.length >= 2) {
      return `  await page.selectOption('select', { label: '${quoted[1].replace(/["'`]/g, '')}' });`;
    }
    return `  // TODO: await page.selectOption('select', 'VALUE');  // ${cleanStep}`;
  }

  // ── Verify / verifikasi / tampil / visible ──
  if (s.includes('verif') || s.includes('tampil') || s.includes('visible') || s.includes('muncul') || s.includes('lihat') || s.includes('pastikan')) {
    const quoted = cleanStep.match(/["'`]([^"'`]{1,80})["'`]/);
    if (quoted) return `  await expect(page.getByText('${quoted[1]}')).toBeVisible();`;
    if (/dashboard/i.test(s)) return `  await expect(page).not.toHaveURL(/login/);  // Redirect ke dashboard`;
    if (/redirect/i.test(s)) {
      const urlM = cleanStep.match(/https?:\/\/\S+|\/[\w/-]+/);
      if (urlM) return `  await expect(page).toHaveURL(/${urlM[0].replace(/[^a-zA-Z0-9/-]/g, '')}/);`;
    }
    if (/error|gagal|invalid|salah/i.test(s)) return `  await expect(page.locator('[class*="error"], [class*="alert"], [role="alert"]')).toBeVisible();`;
    if (/sukses|berhasil|success/i.test(s)) return `  await expect(page.locator('[class*="success"], [class*="toast"]')).toBeVisible();`;
    return `  // TODO: await expect(page.getByText('TEKS_YANG_DIHARAPKAN')).toBeVisible();  // ${cleanStep}`;
  }

  // ── Wait / tunggu ──
  if (s.includes('tunggu') || s.includes('wait')) {
    return `  await page.waitForLoadState('networkidle');`;
  }

  // ── Scroll ──
  if (s.includes('scroll')) {
    return `  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));`;
  }

  // ── Screenshot ──
  if (s.includes('screenshot')) {
    return `  await page.screenshot({ path: 'screenshots/step.png' });`;
  }

  // Fallback: comment
  return `  // ${cleanStep}`;
}

function tcToPlaywright(tc, projectType = 'web') {
  const title = tc.title || 'Generated Test';
  const url = tc.website || '';
  const testData = tc.test_data || '';
  const expectedResult = tc.expected_result || '';

  if (projectType === 'api') {
    return `import { test, expect } from '@playwright/test';

test('${title}', async ({ request }) => {
  const response = await request.get('${url || 'https://api.example.com/endpoint'}');

  expect(response.status()).toBe(200);
  const json = await response.json();
  console.log(json);
  // Expected: ${expectedResult || 'response sesuai schema'}
  // TODO: tambahkan assertion sesuai response body
});
`;
  }

  const stepLines = (tc.scenario || '').split('\n').map(s => s.trim()).filter(Boolean);

  // Build action lines
  const actionLines = [];

  // Selalu tambahkan goto jika ada URL
  if (url) {
    actionLines.push(`  await page.goto('${url}');`);
  }

  // Parse setiap step
  for (const step of stepLines) {
    const code = parseStepToCode(step, testData);
    // Skip goto duplikat
    if (code.includes('page.goto') && url && code.includes(url)) continue;
    actionLines.push(code);
  }

  // Build expected result assertion
  let assertion = '';
  if (expectedResult) {
    const exp = expectedResult.toLowerCase();
    if (/redirect|dashboard|home|beranda/i.test(exp)) {
      assertion = `\n  // Expected: ${expectedResult}\n  await expect(page).not.toHaveURL(/login/);`;
    } else if (/error|gagal|invalid/i.test(exp)) {
      assertion = `\n  // Expected: ${expectedResult}\n  await expect(page.locator('[class*="error"], [role="alert"]')).toBeVisible();`;
    } else if (/sukses|berhasil|success/i.test(exp)) {
      assertion = `\n  // Expected: ${expectedResult}\n  await expect(page.locator('[class*="success"], [class*="toast"]')).toBeVisible();`;
    } else {
      assertion = `\n  // Expected: ${expectedResult}\n  // TODO: tambahkan assertion yang sesuai`;
    }
  }

  // Test data sebagai komentar
  const testDataComment = testData
    ? `\n  // Test Data: ${testData.replace(/\n/g, ' | ')}`
    : '';

  return `import { test, expect } from '@playwright/test';

test('${title}', async ({ page }) => {${testDataComment}
${actionLines.join('\n') || `  await page.goto('${url || 'https://example.com'}');\n  // TODO: tambahkan langkah test`}${assertion}
});
`;
}

async function tcToPlaywrightAI(tc, apiKey) {
  const prompt = `Generate Playwright TypeScript test untuk test case berikut. Gunakan locator yang AKURAT dan SPESIFIK.

Judul: ${tc.title}
Module: ${tc.module || '-'}
Website/URL: ${tc.website || 'https://example.com'}
Test Data: ${tc.test_data || '-'}

Scenario (langkah-langkah):
${tc.scenario || '(tidak ada langkah)'}

Expected Result:
${tc.expected_result || '(tidak ada expected result)'}

Instruksi:
- Gunakan getByLabel, getByPlaceholder, getByRole dengan nama yang SESUAI konteks (bukan 'button' generik)
- Isi value fill() dengan data dari Test Data jika tersedia
- Assertion harus sesuai Expected Result (contoh: jika login berhasil → expect redirect ke dashboard, bukan toHaveURL(/login/))
- Jangan gunakan selector CSS/xpath kecuali terpaksa
- Tambahkan waitForLoadState atau waitForURL jika perlu
- Return HANYA kode TypeScript, tanpa penjelasan`;

  return generateWithOpenAI(apiKey, prompt);
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function GeneratePlaywrightModal({ testcase: tc, onClose }) {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mode, setMode] = useState('offline');
  const [code, setCode] = useState('');
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState(toFileName(tc.title) + '.spec.ts');
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    window.api.waListProjects().then(list => {
      setProjects(list || []);
      if (list && list.length > 0) setSelectedProject(list[0]);
      setLoadingProjects(false);
    }).catch(() => {
      setProjects([]);
      setLoadingProjects(false);
    });
  }, []);

  useEffect(() => {
    const projectType = selectedProject?.type || 'web';
    setCode(tcToPlaywright(tc, projectType));
    setSaved(false);
  }, [tc, selectedProject]);

  async function handleGenerate() {
    if (mode === 'offline') {
      const projectType = selectedProject?.type || 'web';
      setCode(tcToPlaywright(tc, projectType));
      setSaved(false);
      return;
    }
    if (!apiKey.trim()) return setError('API key belum diisi.');
    setGenerating(true);
    setError('');
    try {
      const result = await tcToPlaywrightAI(tc, apiKey);
      setCode(result);
      setSaved(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave() {
    if (!selectedProject) return setError('Pilih project Automation Lab terlebih dahulu.');
    if (!code.trim()) return setError('Code kosong.');
    const name = fileName.endsWith('.spec.ts') || fileName.endsWith('.spec.js')
      ? fileName : fileName + '.spec.ts';
    setSaving(true);
    setError('');
    try {
      const result = await window.api.waWriteFile({
        projPath: selectedProject.path,
        relPath: `tests/${name}`,
        content: code,
      });
      if (result?.success) setSaved(true);
      else setError('Gagal menyimpan file.');
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  function saveApiKey(key) {
    setApiKey(key);
    localStorage.setItem('openai_api_key', key);
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 820, width: '100%', maxHeight: '92vh' }}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">🎭 Generate Playwright Script</h2>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0' }}>
              {tc.no ? `${tc.no} — ` : ''}{tc.title}
            </p>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto', maxHeight: 'calc(92vh - 120px)', padding: '0 0 8px' }}>

          {/* Project + filename */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
              <label>Simpan ke Project Automation Lab</label>
              {loadingProjects ? (
                <div style={{ fontSize: 12, color: 'var(--text-muted)', padding: '8px 0' }}>⏳ Memuat...</div>
              ) : projects.length === 0 ? (
                <div style={{ fontSize: 12, color: '#f97316', padding: '8px 0' }}>
                  ⚠️ Belum ada project. Buat project dulu di Automation Lab.
                </div>
              ) : (
                <select value={selectedProject?.path || ''} onChange={e => {
                  setSelectedProject(projects.find(x => x.path === e.target.value) || null);
                  setSaved(false);
                }}>
                  {projects.map(p => (
                    <option key={p.path} value={p.path}>{p.type === 'api' ? '🔌' : '🌐'} {p.name}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
              <label>Nama File</label>
              <input value={fileName} onChange={e => { setFileName(e.target.value); setSaved(false); }}
                placeholder="nama-test.spec.ts" style={{ fontFamily: 'monospace', fontSize: 12 }} />
            </div>
          </div>

          {/* Mode + API key */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Mode:</span>
            {[
              { id: 'offline', label: '⚡ Rule-based (offline)' },
              { id: 'ai',      label: '🤖 OpenAI (akurat)' },
            ].map(m => (
              <button key={m.id}
                className={`btn btn-sm ${mode === m.id ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setMode(m.id); setSaved(false); setError(''); }}>
                {m.label}
              </button>
            ))}
            {mode === 'ai' && (
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginLeft: 4 }}>
                <input type={showKey ? 'text' : 'password'} value={apiKey}
                  onChange={e => saveApiKey(e.target.value)} placeholder="sk-proj-..."
                  style={{ width: 200, fontFamily: 'monospace', fontSize: 11 }} />
                <button className="btn btn-secondary btn-sm" onClick={() => setShowKey(p => !p)}>
                  {showKey ? '🙈' : '👁️'}
                </button>
              </div>
            )}
            <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}
              onClick={handleGenerate} disabled={generating}>
              {generating
                ? <><span style={{ display:'inline-block', animation:'spin 1s linear infinite' }}>⟳</span> Generating...</>
                : '🔄 Re-generate'}
            </button>
          </div>

          {/* TC info chips */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[
              { label: 'Module',     val: tc.module },
              { label: 'Website',    val: tc.website },
              { label: 'Test Data',  val: tc.test_data },
              { label: 'Status',     val: tc.status },
            ].filter(x => x.val).map(x => (
              <span key={x.label} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10,
                background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                {x.label}: <strong style={{ color: 'var(--text-secondary)' }}>{x.val.slice(0, 40)}</strong>
              </span>
            ))}
          </div>

          {error && (
            <div style={{ padding: '8px 12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, fontSize: 12, color: '#ef4444' }}>
              ❌ {error}
            </div>
          )}

          {/* Code editor */}
          <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 14px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                tests/{fileName.endsWith('.spec.ts') || fileName.endsWith('.spec.js') ? fileName : fileName + '.spec.ts'}
              </span>
              <button className="btn btn-secondary btn-sm" onClick={() => navigator.clipboard.writeText(code)}
                style={{ fontSize: 10 }}>📋 Copy</button>
            </div>
            <textarea value={code} onChange={e => { setCode(e.target.value); setSaved(false); }}
              style={{ width: '100%', minHeight: 300, background: '#0f172a', color: '#94a3b8',
                fontFamily: 'monospace', fontSize: 12, padding: 16, border: 'none', outline: 'none',
                resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              spellCheck={false} />
          </div>

          {selectedProject && (
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>
              → {selectedProject.path}/tests/{fileName.endsWith('.spec.ts') || fileName.endsWith('.spec.js') ? fileName : fileName + '.spec.ts'}
            </div>
          )}
        </div>

        <div className="modal-footer" style={{ marginTop: 8 }}>
          <button className="btn btn-secondary" onClick={onClose}>Tutup</button>
          {saved ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: '#22c55e', fontWeight: 600 }}>✅ Tersimpan!</span>
              <button className="btn btn-secondary btn-sm" onClick={() => setSaved(false)}>Simpan ulang</button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={handleSave}
              disabled={saving || !selectedProject || !code.trim() || projects.length === 0}>
              {saving
                ? <><span style={{ display:'inline-block', animation:'spin 1s linear infinite' }}>⟳</span> Menyimpan...</>
                : '💾 Simpan ke Automation Lab'}
            </button>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

