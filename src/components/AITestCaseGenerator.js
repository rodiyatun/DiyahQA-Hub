import React, { useState } from 'react';

// ─── AI Test Case Generator ───────────────────────────────────────────────────
// Mendukung OpenAI (GPT-4o-mini) dan Google Gemini

async function callOpenAI(apiKey, prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Kamu adalah QA Engineer senior. Generate test case dalam format JSON array.
Setiap test case harus memiliki field: title, module, section, scenario, expected_result, note, status.
- title: nama test case yang deskriptif
- module: nama modul/fitur
- section: sub-section atau halaman
- scenario: langkah-langkah testing (numbered list)
- expected_result: hasil yang diharapkan
- note: jenis test (Positive Case / Negative Case / Edge Case)
- status: selalu "Pending"
Jawab HANYA dengan JSON array yang valid, tanpa penjelasan tambahan.`,
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 3000,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `OpenAI error: HTTP ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content || '';
  return parseJsonFromLLM(content);
}

async function callGemini(apiKey, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const systemInstruction = `Kamu adalah QA Engineer senior. Generate test case dalam format JSON array.
Setiap test case harus memiliki field: title, module, section, scenario, expected_result, note, status.
- title: nama test case yang deskriptif
- module: nama modul/fitur  
- section: sub-section atau halaman
- scenario: langkah-langkah testing (numbered list)
- expected_result: hasil yang diharapkan
- note: jenis test (Positive Case / Negative Case / Edge Case)
- status: selalu "Pending"
Jawab HANYA dengan JSON array yang valid, tanpa markdown code block, tanpa penjelasan.`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: `${systemInstruction}\n\n${prompt}` }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 3000 },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gemini error: HTTP ${response.status}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return parseJsonFromLLM(content);
}

function parseJsonFromLLM(content) {
  // Strip markdown code blocks jika ada
  const clean = content
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/gi, '')
    .trim();

  // Coba parse langsung
  try {
    const parsed = JSON.parse(clean);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    // Coba ekstrak array dari dalam teks
    const match = clean.match(/\[[\s\S]*\]/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {}
    }
    throw new Error('LLM tidak mengembalikan JSON yang valid. Coba lagi.');
  }
}

// Rule-based fallback (offline)
function generateRuleBased(form) {
  const { featureName, module, description, testTypes } = form;
  const results = [];

  if (testTypes.includes('positive')) {
    results.push({
      title: `Verifikasi ${featureName} berhasil dengan data valid`,
      module: module || featureName,
      section: featureName,
      scenario: `1. Buka halaman ${featureName}\n2. Isi semua field yang diperlukan dengan data valid\n3. Klik tombol Submit/Simpan\n4. Verifikasi hasil`,
      expected_result: `${featureName} berhasil diproses dan menampilkan pesan sukses`,
      note: 'Positive Case',
      status: 'Pending',
    });
  }

  if (testTypes.includes('negative')) {
    results.push({
      title: `Verifikasi ${featureName} gagal dengan data kosong`,
      module: module || featureName,
      section: featureName,
      scenario: `1. Buka halaman ${featureName}\n2. Biarkan semua field kosong\n3. Klik tombol Submit/Simpan\n4. Verifikasi pesan error`,
      expected_result: 'Sistem menampilkan pesan validasi untuk field yang wajib diisi',
      note: 'Negative Case',
      status: 'Pending',
    });

    results.push({
      title: `Verifikasi ${featureName} dengan input tidak valid`,
      module: module || featureName,
      section: featureName,
      scenario: `1. Buka halaman ${featureName}\n2. Isi field dengan format data yang salah\n3. Klik Submit/Simpan\n4. Amati response sistem`,
      expected_result: 'Sistem menolak input dan menampilkan pesan error yang sesuai',
      note: 'Negative Case',
      status: 'Pending',
    });
  }

  if (testTypes.includes('edge')) {
    results.push({
      title: `Verifikasi ${featureName} dengan karakter khusus`,
      module: module || featureName,
      section: featureName,
      scenario: `1. Buka halaman ${featureName}\n2. Isi field dengan karakter khusus (!@#$%)\n3. Klik Submit/Simpan\n4. Amati response`,
      expected_result: 'Sistem menangani karakter khusus dengan aman (escape atau reject)',
      note: 'Edge Case',
      status: 'Pending',
    });
  }

  if (description) {
    results.push({
      title: `Verifikasi ${featureName} — ${description.slice(0, 50)}`,
      module: module || featureName,
      section: featureName,
      scenario: `1. ${description}\n2. Verifikasi hasilnya`,
      expected_result: 'Sistem bekerja sesuai deskripsi',
      note: 'Positive Case',
      status: 'Pending',
    });
  }

  return results;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AITestCaseGenerator({ project, onInsert, onClose }) {
  const [provider, setProvider] = useState(
    localStorage.getItem('ai_tc_provider') || 'openai'
  );
  const [apiKey, setApiKey] = useState(
    localStorage.getItem(
      `ai_tc_key_${localStorage.getItem('ai_tc_provider') || 'openai'}`
    ) || ''
  );
  const [form, setForm] = useState({
    featureName: '',
    module: project?.name || '',
    description: '',
    testTypes: ['positive', 'negative'],
    count: 5,
    customPrompt: '',
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState([]);
  const [mode, setMode] = useState('guided'); // guided | custom | offline

  function setField(k, v) {
    setForm(p => ({ ...p, [k]: v }));
  }

  function toggleType(t) {
    setForm(p => ({
      ...p,
      testTypes: p.testTypes.includes(t)
        ? p.testTypes.filter(x => x !== t)
        : [...p.testTypes, t],
    }));
  }

  function saveApiKey(key) {
    setApiKey(key);
    localStorage.setItem(`ai_tc_key_${provider}`, key);
  }

  function switchProvider(p) {
    setProvider(p);
    localStorage.setItem('ai_tc_provider', p);
    setApiKey(localStorage.getItem(`ai_tc_key_${p}`) || '');
  }

  function buildPrompt() {
    if (mode === 'custom') return form.customPrompt;
    const types = form.testTypes.map(t =>
      t === 'positive' ? 'Positive Case' : t === 'negative' ? 'Negative Case' : 'Edge Case'
    ).join(', ');
    return `Generate ${form.count} test case untuk fitur: "${form.featureName}"
Module: ${form.module}
${form.description ? `Deskripsi: ${form.description}` : ''}
Jenis test yang diperlukan: ${types}
Bahasa: Indonesia
Format output: JSON array`;
  }

  async function handleGenerate() {
    if (mode === 'offline') {
      if (!form.featureName.trim()) return setError('Feature name wajib diisi');
      setResults(generateRuleBased(form));
      setSelected([]);
      setError('');
      return;
    }

    const prompt = buildPrompt();
    if (!prompt.trim()) return setError('Prompt wajib diisi');
    if (!apiKey.trim()) return setError('API Key belum diisi');

    setLoading(true);
    setError('');
    setResults([]);

    try {
      let generated;
      if (provider === 'openai') {
        generated = await callOpenAI(apiKey, prompt);
      } else {
        generated = await callGemini(apiKey, prompt);
      }
      // Normalize fields
      const normalized = generated.map(tc => ({
        title: tc.title || tc.name || '',
        module: tc.module || form.module || '',
        section: tc.section || '',
        scenario: tc.scenario || tc.steps || '',
        expected_result: tc.expected_result || tc.expected || '',
        note: tc.note || tc.type || 'Positive Case',
        status: 'Pending',
      })).filter(tc => tc.title.trim());

      setResults(normalized);
      setSelected(normalized.map((_, i) => i));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function toggleSelect(i) {
    setSelected(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  }

  function toggleAll() {
    setSelected(p => p.length === results.length ? [] : results.map((_, i) => i));
  }

  function handleInsert() {
    const toInsert = results.filter((_, i) => selected.includes(i));
    onInsert(toInsert);
  }

  const TEST_TYPES = [
    { id: 'positive', label: '✅ Positive Case' },
    { id: 'negative', label: '❌ Negative Case' },
    { id: 'edge',     label: '⚡ Edge Case' },
  ];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 800, width: '100%', maxHeight: '92vh' }}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">🤖 AI Generate Test Case</h2>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0' }}>
              Generate test case otomatis menggunakan LLM
            </p>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>

        <div style={{ overflowY: 'auto', maxHeight: 'calc(92vh - 120px)', display: 'flex', flexDirection: 'column', gap: 16, padding: '0 0 8px' }}>

          {/* Mode selector */}
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { id: 'guided',  label: '📋 Guided' },
              { id: 'custom',  label: '✍️ Custom Prompt' },
              { id: 'offline', label: '⚡ Offline (rule-based)' },
            ].map(m => (
              <button key={m.id}
                className={`btn btn-sm ${mode === m.id ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setMode(m.id)}>
                {m.label}
              </button>
            ))}
          </div>

          {/* Provider & API Key — hanya jika bukan offline */}
          {mode !== 'offline' && (
            <div style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 14, background: 'var(--bg-card)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10 }}>
                🔑 API PROVIDER
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                {[
                  { id: 'openai', label: '🟢 OpenAI (GPT-4o-mini)' },
                  { id: 'gemini', label: '🔵 Google Gemini' },
                ].map(p => (
                  <button key={p.id}
                    className={`btn btn-sm ${provider === p.id ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => switchProvider(p.id)}>
                    {p.label}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  type="password"
                  value={apiKey}
                  onChange={e => saveApiKey(e.target.value)}
                  placeholder={provider === 'openai' ? 'sk-proj-...' : 'AIza...'}
                  style={{ flex: 1, fontFamily: 'monospace', fontSize: 12 }}
                />
                <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>
                  {provider === 'openai'
                    ? '→ platform.openai.com/api-keys'
                    : '→ aistudio.google.com/app/apikey'}
                </span>
              </div>
            </div>
          )}

          {/* Form input */}
          {mode === 'guided' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nama Fitur *</label>
                  <input
                    value={form.featureName}
                    onChange={e => setField('featureName', e.target.value)}
                    placeholder="contoh: Login, Register, Checkout"
                  />
                </div>
                <div className="form-group">
                  <label>Module</label>
                  <input
                    value={form.module}
                    onChange={e => setField('module', e.target.value)}
                    placeholder="contoh: Authentication"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Deskripsi (opsional)</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setField('description', e.target.value)}
                  placeholder="Jelaskan detail fitur yang ingin di-test... contoh: User dapat login menggunakan email dan password, ada validasi format email, maksimal 3x percobaan salah"
                />
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Jenis Test</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {TEST_TYPES.map(t => (
                      <label key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', fontSize: 12 }}>
                        <input
                          type="checkbox"
                          checked={form.testTypes.includes(t.id)}
                          onChange={() => toggleType(t.id)}
                          style={{ width: 'auto' }}
                        />
                        {t.label}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group" style={{ minWidth: 120 }}>
                  <label>Jumlah TC</label>
                  <input
                    type="number"
                    value={form.count}
                    onChange={e => setField('count', Math.max(1, Math.min(20, Number(e.target.value))))}
                    min={1} max={20}
                    style={{ width: 80 }}
                  />
                </div>
              </div>
            </div>
          )}

          {mode === 'offline' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: '8px 12px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                ⚡ Mode offline menggunakan template berbasis aturan — tidak memerlukan API key.
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Nama Fitur *</label>
                  <input
                    value={form.featureName}
                    onChange={e => setField('featureName', e.target.value)}
                    placeholder="contoh: Login"
                  />
                </div>
                <div className="form-group">
                  <label>Module</label>
                  <input
                    value={form.module}
                    onChange={e => setField('module', e.target.value)}
                    placeholder="contoh: Authentication"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Deskripsi singkat</label>
                <input value={form.description} onChange={e => setField('description', e.target.value)} placeholder="Deskripsi fitur..." />
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Jenis Test</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {TEST_TYPES.map(t => (
                    <label key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', fontSize: 12 }}>
                      <input type="checkbox" checked={form.testTypes.includes(t.id)} onChange={() => toggleType(t.id)} style={{ width: 'auto' }} />
                      {t.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mode === 'custom' && (
            <div className="form-group">
              <label>Custom Prompt</label>
              <textarea
                rows={7}
                value={form.customPrompt}
                onChange={e => setField('customPrompt', e.target.value)}
                placeholder={`Contoh:\nGenerate 10 test case untuk fitur login di aplikasi HR:\n- Email dan password wajib diisi\n- Validasi format email\n- Maksimal 3x percobaan salah lalu akun terkunci\n- Remember me tetap login 7 hari\nFormat: JSON array dengan field title, module, section, scenario, expected_result, note, status`}
              />
            </div>
          )}

          {error && (
            <div style={{ padding: '8px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, fontSize: 12, color: '#ef4444' }}>
              ❌ {error}
            </div>
          )}

          {/* Generate button */}
          <button
            className="btn btn-primary"
            onClick={handleGenerate}
            disabled={loading}
            style={{ alignSelf: 'flex-start' }}
          >
            {loading
              ? <><span className="wa-spinning" style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span> Generating...</>
              : mode === 'offline' ? '⚡ Generate (Offline)' : `🤖 Generate dengan ${provider === 'openai' ? 'OpenAI' : 'Gemini'}`
            }
          </button>

          {/* Results */}
          {results.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                  ✅ {results.length} test case di-generate — {selected.length} dipilih
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-secondary btn-sm" onClick={toggleAll}>
                    {selected.length === results.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 360, overflowY: 'auto' }}>
                {results.map((tc, i) => (
                  <div
                    key={i}
                    style={{
                      border: `1px solid ${selected.includes(i) ? 'rgba(99,102,241,0.5)' : 'var(--border)'}`,
                      borderRadius: 8,
                      padding: 12,
                      background: selected.includes(i) ? 'rgba(99,102,241,0.06)' : 'var(--bg-card)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    onClick={() => toggleSelect(i)}
                  >
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <input
                        type="checkbox"
                        checked={selected.includes(i)}
                        onChange={() => toggleSelect(i)}
                        style={{ width: 'auto', flexShrink: 0, marginTop: 2 }}
                        onClick={e => e.stopPropagation()}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                          {tc.title}
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                          {tc.module && <span style={{ fontSize: 10, padding: '2px 6px', background: 'rgba(99,102,241,0.15)', color: '#818cf8', borderRadius: 4 }}>{tc.module}</span>}
                          {tc.section && <span style={{ fontSize: 10, padding: '2px 6px', background: 'rgba(99,102,241,0.1)', color: 'var(--text-muted)', borderRadius: 4 }}>{tc.section}</span>}
                          <span style={{
                            fontSize: 10, padding: '2px 6px', borderRadius: 4,
                            background: tc.note?.includes('Negative') ? 'rgba(239,68,68,0.1)' : tc.note?.includes('Edge') ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)',
                            color: tc.note?.includes('Negative') ? '#ef4444' : tc.note?.includes('Edge') ? '#f59e0b' : '#22c55e',
                          }}>
                            {tc.note}
                          </span>
                        </div>
                        {tc.scenario && (
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                            {tc.scenario.split('\n').slice(0, 3).join('\n')}
                            {tc.scenario.split('\n').length > 3 ? '\n...' : ''}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ marginTop: 8 }}>
          <button className="btn btn-secondary" onClick={onClose}>Batal</button>
          {results.length > 0 && (
            <button
              className="btn btn-primary"
              onClick={handleInsert}
              disabled={selected.length === 0}
            >
              ➕ Tambahkan {selected.length} Test Case ke Project
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
