import React, { useState, useEffect, useRef } from 'react';
import { PLAYWRIGHT_MODULES } from './playwrightAcademy';
import { analyzePlaywrightError } from './automationUtils';
import { TUTORIALS } from './tutorialData';

// ── Shared LogPanel
export function LogPanel({ logs, onClear }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [logs]);
  return (
    <div style={{ position: 'relative' }}>
      <div className="run-log" ref={ref}>
        {logs.length === 0 && <span style={{ color: '#475569' }}>Output akan tampil di sini...</span>}
        {logs.map((l, i) => <div key={i} className={`log-${l.type || 'info'}`}>{l.text}</div>)}
      </div>
      {logs.length > 0 && (
        <button className="btn btn-ghost btn-sm" onClick={onClear}
          style={{ position: 'absolute', top: 6, right: 6, fontSize: 10 }}>Clear</button>
      )}
    </div>
  );
}

// ── Tab: Playwright Academy
export function AcademyTab() {
  const allLessons = PLAYWRIGHT_MODULES.flatMap(m =>
    m.lessons.map(l => ({ ...l, moduleIcon: m.icon, moduleTitle: m.title }))
  );
  const [activeId, setActiveId] = useState(allLessons[0].id);
  const lesson = allLessons.find(l => l.id === activeId);

  return (
    <div style={{ display: 'flex', gap: 20, height: 'calc(100vh - 220px)', minHeight: 0 }}>
      {/* Sidebar */}
      <div style={{ width: 210, flexShrink: 0, overflowY: 'auto' }}>
        {PLAYWRIGHT_MODULES.map(mod => (
          <div key={mod.id}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '8px 8px 4px', letterSpacing: '0.05em' }}>
              {mod.icon} {mod.title}
            </div>
            {mod.lessons.map(l => (
              <button key={l.id}
                style={{ width: '100%', textAlign: 'left', padding: '7px 12px', borderRadius: 8, border: 'none', background: activeId === l.id ? 'rgba(139,92,246,0.1)' : 'none', color: activeId === l.id ? '#8b5cf6' : 'var(--text-secondary)', fontSize: 12, cursor: 'pointer', fontWeight: activeId === l.id ? 600 : 400 }}
                onClick={() => setActiveId(l.id)}>{l.title}</button>
            ))}
          </div>
        ))}
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {lesson && (
          <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 24 }}>
            <h2 style={{ fontSize: 18, color: 'var(--text-primary)', marginBottom: 16 }}>{lesson.title}</h2>
            {lesson.content && <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: 16 }}>{lesson.content}</p>}
            {lesson.keyPoints && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Key Points</div>
                {lesson.keyPoints.map((p, i) => (
                  <div key={i} style={{ padding: '7px 12px', background: 'rgba(139,92,246,0.05)', borderLeft: '3px solid #8b5cf6', borderRadius: '0 6px 6px 0', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 5 }}>→ {p}</div>
                ))}
              </div>
            )}
            {lesson.table && (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginBottom: 16 }}>
                <thead><tr>{Object.keys(lesson.table[0]).map(k => <th key={k} style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', padding: '8px 12px', textAlign: 'left', fontSize: 11, textTransform: 'uppercase' }}>{k}</th>)}</tr></thead>
                <tbody>{lesson.table.map((row, i) => <tr key={i}>{Object.values(row).map((v, j) => <td key={j} style={{ padding: '8px 12px', borderTop: '1px solid var(--border)', color: 'var(--text-secondary)', fontFamily: typeof v === 'string' && v.startsWith('get') ? 'monospace' : undefined, fontSize: typeof v === 'string' && v.startsWith('get') ? 11 : 12 }}>{v}</td>)}</tr>)}</tbody>
              </table>
            )}
            {lesson.example && (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Contoh Kode</div>
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, padding: 16, fontFamily: 'monospace', fontSize: 12, color: '#94a3b8', whiteSpace: 'pre', overflowX: 'auto', maxHeight: 400, overflowY: 'auto' }}>{lesson.example}</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Tab: Test Data Manager
export function TestDataTab({ project }) {
  const [files, setFiles]       = useState([]);
  const [selected, setSelected] = useState(null);
  const [content, setContent]   = useState('');
  const [dirty, setDirty]       = useState(false);
  const [newName, setNewName]   = useState('');

  useEffect(() => { loadFiles(); }, [project]);

  async function loadFiles() {
    const list = await window.api.waReadDataFiles({ projPath: project.path });
    setFiles(list || []);
  }

  async function openFile(name) {
    const text = await window.api.waReadDataFile({ projPath: project.path, name });
    setSelected(name);
    setContent(text || '');
    setDirty(false);
  }

  async function saveFile() {
    await window.api.waWriteDataFile({ projPath: project.path, name: selected, content });
    setDirty(false);
  }

  async function createFile(name) {
    if (!name) return;
    const ext = name.split('.').pop();
    const template = ext === 'json'
      ? '[\n  { "email": "user1@test.com", "password": "pass1", "expectedStatus": 200 },\n  { "email": "wrong@test.com", "password": "wrong", "expectedStatus": 401 }\n]'
      : ext === 'ts'
      ? `export const testData = [\n  { email: 'user1@test.com', password: 'pass1' },\n];\n`
      : 'email,password,expectedStatus\nuser1@test.com,pass1,200\nwrong@test.com,wrong,401';
    await window.api.waWriteDataFile({ projPath: project.path, name, content: template });
    await loadFiles();
    openFile(name);
  }

  async function deleteFile(name) {
    if (!window.confirm(`Hapus ${name}?`)) return;
    await window.api.waDeleteDataFile({ projPath: project.path, name });
    await loadFiles();
    if (selected === name) { setSelected(null); setContent(''); }
  }

  // Parse CSV ke tabel preview
  function parseCSV(text) {
    const lines = text.trim().split('\n');
    if (!lines.length) return null;
    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1).map(l => l.split(',').map(v => v.trim()));
    return { headers, rows };
  }

  const csvData = selected?.endsWith('.csv') ? parseCSV(content) : null;

  return (
    <div style={{ display: 'flex', gap: 16, height: 'calc(100vh - 220px)', minHeight: 0 }}>
      {/* Sidebar */}
      <div style={{ width: 200, flexShrink: 0, border: '1px solid var(--border)', borderRadius: 10, background: 'var(--bg-card)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
          DATA FILES
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => {
            const n = window.prompt('Nama file (misal: users.csv, data.json):');
            if (n) createFile(n);
          }}>+</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {files.length === 0 && <div style={{ padding: 12, fontSize: 11, color: 'var(--text-muted)' }}>Belum ada data file</div>}
          {files.map(f => (
            <div key={f.name} className={`wa-file-item ${selected === f.name ? 'active' : ''}`} onClick={() => openFile(f.name)}>
              <span>{f.name.endsWith('.json') ? '📋' : f.name.endsWith('.ts') ? '📘' : '📊'}</span>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>{f.name}</span>
              <button className="btn btn-ghost btn-icon btn-sm" onClick={e => { e.stopPropagation(); deleteFile(f.name); }}
                style={{ color: 'var(--danger)', fontSize: 10 }}>✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Editor / Preview */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {selected && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>data/{selected}</span>
            {dirty && <span style={{ fontSize: 10, color: '#f59e0b' }}>●</span>}
            <button className="btn btn-primary btn-sm" onClick={saveFile} disabled={!dirty} style={{ marginLeft: 'auto' }}>💾 Save</button>
          </div>
        )}

        {csvData && (
          <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'auto', maxHeight: 200 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead><tr>{csvData.headers.map(h => <th key={h} style={{ padding: '6px 10px', background: 'var(--bg-secondary)', color: 'var(--text-muted)', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>{h}</th>)}</tr></thead>
              <tbody>{csvData.rows.map((row, i) => <tr key={i}>{row.map((v, j) => <td key={j} style={{ padding: '6px 10px', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{v}</td>)}</tr>)}</tbody>
            </table>
          </div>
        )}

        {selected
          ? <textarea style={{ flex: 1, background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: 12, padding: 16, border: '1px solid #1e293b', borderRadius: 8, resize: 'none', outline: 'none', lineHeight: 1.6 }}
              value={content} onChange={e => { setContent(e.target.value); setDirty(true); }}
              onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); saveFile(); } }}
              spellCheck={false} />
          : <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, border: '1px dashed var(--border)', borderRadius: 8, flex: 1 }}>
              Pilih file di sebelah kiri atau buat file baru (+)<br />
              <span style={{ fontSize: 11, marginTop: 6, display: 'block' }}>Support: CSV, JSON, TypeScript</span>
            </div>
        }
      </div>
    </div>
  );
}

// ── Tab: Run Configuration
const DEFAULT_CONFIG = {
  browser: 'chromium', headed: false, slowMo: 0,
  timeout: 30000, retries: 1, workers: 2,
  baseUrl: '', storageState: '', viewport: '1280x720',
  grep: '', tags: '', extraEnv: '',
};

export function RunConfigTab({ project }) {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [saved, setSaved]   = useState(false);

  useEffect(() => {
    window.api.waReadRunConfig({ projPath: project.path }).then(c => {
      if (c) setConfig({ ...DEFAULT_CONFIG, ...c });
    });
  }, [project]);

  function set(field, val) { setConfig(p => ({ ...p, [field]: val })); }

  async function saveConfig() {
    await window.api.waWriteRunConfig({ projPath: project.path, config });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function generateConfigStr() {
    const [w, h] = (config.viewport || '1280x720').split('x').map(Number);
    return `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: ${config.timeout},
  retries: ${config.retries},
  workers: ${config.workers},
  ${config.grep ? `grep: /${config.grep}/,` : ''}
  reporter: [['allure-playwright'], ['html', { open: 'never' }], ['list']],
  use: {
    ${config.baseUrl ? `baseURL: '${config.baseUrl}',` : ''}
    ${config.storageState ? `storageState: '${config.storageState}',` : ''}
    headless: ${!config.headed},
    slowMo: ${config.slowMo},
    viewport: { width: ${w}, height: ${h} },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: '${config.browser}', use: { ...devices['Desktop ${config.browser === 'chromium' ? 'Chrome' : config.browser === 'firefox' ? 'Firefox' : 'Safari'}'] } },
  ],
});`;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="settings-section">
          <h3>🌐 Browser & Execution</h3>
          <div className="form-group"><label>Browser</label>
            <select value={config.browser} onChange={e => set('browser', e.target.value)}>
              {['chromium', 'firefox', 'webkit'].map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Workers (paralel)</label>
              <input type="number" value={config.workers} onChange={e => set('workers', Number(e.target.value))} min={1} max={8} />
            </div>
            <div className="form-group"><label>Retries</label>
              <input type="number" value={config.retries} onChange={e => set('retries', Number(e.target.value))} min={0} max={3} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Timeout (ms)</label>
              <input type="number" value={config.timeout} onChange={e => set('timeout', Number(e.target.value))} step={5000} />
            </div>
            <div className="form-group"><label>Slow Mo (ms)</label>
              <input type="number" value={config.slowMo} onChange={e => set('slowMo', Number(e.target.value))} min={0} step={100} />
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer', marginTop: 4 }}>
            <input type="checkbox" checked={config.headed} onChange={e => set('headed', e.target.checked)} style={{ width: 'auto' }} />
            🪟 Headed mode (tampilkan browser)
          </label>
        </div>

        <div className="settings-section">
          <h3>🔧 Environment</h3>
          <div className="form-group"><label>Base URL</label>
            <input value={config.baseUrl} onChange={e => set('baseUrl', e.target.value)} placeholder="https://staging.example.com" />
          </div>
          <div className="form-group"><label>Storage State (path ke auth.json)</label>
            <input value={config.storageState} onChange={e => set('storageState', e.target.value)} placeholder="tests/fixtures/auth.json" />
          </div>
          <div className="form-group"><label>Viewport</label>
            <select value={config.viewport} onChange={e => set('viewport', e.target.value)}>
              {['1920x1080','1280x720','1024x768','375x667','390x844'].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div className="form-group"><label>Grep (filter test name)</label>
            <input value={config.grep} onChange={e => set('grep', e.target.value)} placeholder="login|checkout" />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-primary" onClick={saveConfig}>{saved ? '✅ Tersimpan!' : '💾 Simpan Config'}</button>
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '10px 16px', background: 'var(--bg-secondary)', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>
          Preview playwright.config.ts yang akan di-generate
        </div>
        <div style={{ background: '#0f172a', padding: 16, fontFamily: 'monospace', fontSize: 12, color: '#94a3b8', whiteSpace: 'pre', overflowX: 'auto', maxHeight: 300 }}>
          {generateConfigStr()}
        </div>
      </div>
    </div>
  );
}

// ── Tab: Failure Center
export function FailureCenterTab({ project }) {
  const [failures, setFailures] = useState([]);
  const [selected, setSelected] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [errorLog, setErrorLog]     = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => { loadFailures(); }, [project]);

  async function loadFailures() {
    const list = await window.api.waReadFailures({ projPath: project.path });
    setFailures(list || []);
    setSelected(null);
    setScreenshot(null);
  }

  async function selectFailure(f) {
    setSelected(f);
    setSuggestions([]);
    // Load first screenshot
    if (f.screenshots.length) {
      const img = await window.api.waReadImage({ imagePath: f.screenshots[0] });
      setScreenshot(img);
    } else {
      setScreenshot(null);
    }
  }

  async function openTrace(tracePath) {
    await window.api.waOpenTrace({ projPath: project.path, tracePath });
  }

  function analyzeError() {
    if (!errorLog.trim()) return;
    setSuggestions(analyzePlaywrightError(errorLog));
  }

  return (
    <div style={{ display: 'flex', gap: 16, minHeight: 0, height: 'calc(100vh - 220px)' }}>
      {/* Failure list */}
      <div style={{ width: 240, flexShrink: 0, border: '1px solid var(--border)', borderRadius: 10, background: 'var(--bg-card)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>FAILURES ({failures.length})</span>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={loadFailures} title="Refresh">↺</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {failures.length === 0 && (
            <div style={{ padding: 16, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
              Tidak ada failure.<br />Jalankan tests dulu.
            </div>
          )}
          {failures.map(f => (
            <div key={f.id} className={`wa-file-item ${selected?.id === f.id ? 'active' : ''}`}
              onClick={() => selectFailure(f)} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
              <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500 }}>❌ {f.testName}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                {f.screenshots.length} 📷 · {f.videos.length} 🎬 · {f.traces.length} 🔍
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
        {!selected ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, border: '1px dashed var(--border)', borderRadius: 12 }}>
            Pilih failure di sebelah kiri untuk lihat detail
          </div>
        ) : (
          <>
            <div style={{ border: '1px solid #ef4444', borderRadius: 12, background: 'rgba(239,68,68,0.05)', padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#ef4444', marginBottom: 8 }}>❌ {selected.testName}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {selected.traces.map((t, i) => (
                  <button key={i} className="btn btn-secondary btn-sm" onClick={() => openTrace(t)}>
                    🔍 Buka Trace {i + 1}
                  </button>
                ))}
                {selected.videos.map((v, i) => (
                  <div key={i} style={{ fontSize: 12, color: 'var(--text-muted)' }}>🎬 Video tersedia: {v.split('/').pop()}</div>
                ))}
              </div>
            </div>

            {screenshot && (
              <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ padding: '8px 14px', background: 'var(--bg-secondary)', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                  📷 Screenshot ({selected.screenshots.length} file)
                </div>
                <img src={screenshot} alt="Test failure screenshot"
                  style={{ width: '100%', maxHeight: 350, objectFit: 'contain', background: '#0f172a' }} />
                {selected.screenshots.length > 1 && (
                  <div style={{ display: 'flex', gap: 6, padding: 8, background: 'var(--bg-secondary)', overflowX: 'auto' }}>
                    {selected.screenshots.map((s, i) => (
                      <div key={i} onClick={() => window.api.waReadImage({ imagePath: s }).then(setScreenshot)}
                        style={{ fontSize: 11, color: 'var(--accent)', cursor: 'pointer', padding: '2px 6px', background: 'var(--bg-card)', borderRadius: 4 }}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 16, background: 'var(--bg-card)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>🔥 AI Error Analyzer</div>
              <textarea rows={4} value={errorLog} onChange={e => setErrorLog(e.target.value)}
                style={{ width: '100%', fontFamily: 'monospace', fontSize: 12, background: '#0d1117', color: '#e2e8f0', border: '1px solid #1e293b', borderRadius: 8, padding: 10, resize: 'vertical' }}
                placeholder="Paste error message dari log Playwright..." />
              <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }} onClick={analyzeError}>🔍 Analisis</button>
              {suggestions.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 8, marginTop: 8, background: 'var(--bg-secondary)' }}>
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '2px 0' }}>{s.desc}</div>
                    <div style={{ fontSize: 12, color: '#8b5cf6', fontStyle: 'italic' }}>→ {s.fix}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Tab: Locator Inspector
export function LocatorInspectorTab({ project }) {
  const [url, setUrl]       = useState(project.baseUrl || '');
  const [running, setRunning] = useState(false);
  const [logs, setLogs]     = useState([]);

  useEffect(() => {
    window.api.waOnLog(log => setLogs(p => [...p, log]));
    return () => window.api.waOffLog();
  }, []);

  async function startInspect() {
    if (!url.trim()) return alert('URL wajib diisi');
    setLogs([{ type: 'info', text: `🔍 Membuka browser inspector untuk: ${url}\n` }]);
    setRunning(true);
    await window.api.waLocatorInspect({ projPath: project.path, url });
    setRunning(false);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 20 }}>
        <h3 style={{ fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>🎯 Visual Locator Inspector</h3>
        <div style={{ padding: '12px 16px', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
          Inspector akan membuka browser Chromium. Hover elemen di halaman untuk melihat locator terbaik (getByRole, getByLabel, getByTestId, dll.) yang tampil sebagai overlay di pojok kanan atas browser.
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://staging.example.com/login"
            style={{ flex: 1 }} onKeyDown={e => e.key === 'Enter' && startInspect()} />
          <button className="btn btn-primary" onClick={startInspect} disabled={running}>
            {running ? <><span className="wa-spinning">⟳</span> Inspecting...</> : '🎯 Start Inspector'}
          </button>
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>Locator Priority yang Digunakan:</div>
          {[
            { l: 'data-testid', c: '#22c55e', d: 'Paling stabil — minta dev untuk tambahkan' },
            { l: 'aria-label', c: '#6366f1', d: 'Accessible label' },
            { l: 'placeholder', c: '#06b6d4', d: 'Untuk input fields' },
            { l: 'role + text', c: '#f97316', d: 'getByRole() untuk button & link' },
            { l: 'name attribute', c: '#f59e0b', d: 'Form elements' },
            { l: '#id / .class', c: '#ef4444', d: 'Fallback — kurang stabil' },
          ].map(item => (
            <div key={item.l} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '4px 0' }}>
              <span style={{ width: 120, fontSize: 11, fontFamily: 'monospace', color: item.c, fontWeight: 600 }}>{item.l}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.d}</span>
            </div>
          ))}
        </div>
      </div>
      <LogPanel logs={logs} onClear={() => setLogs([])} />
    </div>
  );
}

// ── Tab: Tutorial ─────────────────────────────────────────────────────────────
export function TutorialTab() {
  const [selected, setSelected] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const levelColor = { beginner: '#22c55e', intermediate: '#f59e0b', advanced: '#ef4444' };
  const levelLabel = { beginner: 'Pemula', intermediate: 'Menengah', advanced: 'Lanjutan' };

  if (selected) {
    const tutorial = TUTORIALS.find(t => t.id === selected);
    const step = tutorial.steps[activeStep];
    const isLast = activeStep === tutorial.steps.length - 1;
    const isFirst = activeStep === 0;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => { setSelected(null); setActiveStep(0); }}>← Kembali</button>
          <div>
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 700, background: `${levelColor[tutorial.level]}22`, color: levelColor[tutorial.level] }}>
              {levelLabel[tutorial.level]}
            </span>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginLeft: 8 }}>{tutorial.icon} {tutorial.title}</span>
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>⏱ {tutorial.duration}</span>
        </div>

        {/* Step progress */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {tutorial.steps.map((s, i) => (
            <React.Fragment key={i}>
              <button
                onClick={() => setActiveStep(i)}
                style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer', flexShrink: 0,
                  background: i === activeStep ? '#8b5cf6' : i < activeStep ? '#22c55e' : 'var(--bg-secondary)',
                  color: i <= activeStep ? '#fff' : 'var(--text-muted)' }}>
                {i < activeStep ? '✓' : i + 1}
              </button>
              {i < tutorial.steps.length - 1 && (
                <div style={{ flex: 1, height: 2, background: i < activeStep ? '#22c55e' : 'var(--border)', transition: 'background 0.3s' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step content */}
        <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 24 }}>
          <div style={{ fontSize: 12, color: '#8b5cf6', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Langkah {activeStep + 1} dari {tutorial.steps.length}
          </div>
          <h2 style={{ fontSize: 18, color: 'var(--text-primary)', marginBottom: 12 }}>{step.title}</h2>
          <div style={{ fontSize: 14, color: '#06b6d4', fontWeight: 500, marginBottom: 16, padding: '10px 14px', background: 'rgba(6,182,212,0.08)', borderRadius: 8, borderLeft: '3px solid #06b6d4' }}>
            {step.content}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: step.tip || step.code ? 16 : 0 }}>
            {step.detail}
          </div>
          {step.tip && (
            <div style={{ padding: '10px 14px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, fontSize: 12, color: '#f59e0b', marginBottom: step.code ? 16 : 0 }}>
              💡 <strong>Tip:</strong> {step.tip}
            </div>
          )}
          {step.code && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Contoh Kode</div>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, padding: 16, fontFamily: 'monospace', fontSize: 12, color: '#94a3b8', whiteSpace: 'pre', overflowX: 'auto', maxHeight: 320, overflowY: 'auto' }}>
                {step.code}
              </div>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: 6 }}
                onClick={() => navigator.clipboard.writeText(step.code)}>📋 Copy</button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={() => setActiveStep(p => p - 1)} disabled={isFirst}>← Sebelumnya</button>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{activeStep + 1} / {tutorial.steps.length}</span>
          {isLast
            ? <button className="btn btn-primary" onClick={() => { setSelected(null); setActiveStep(0); }}>✅ Selesai</button>
            : <button className="btn btn-primary" onClick={() => setActiveStep(p => p + 1)}>Selanjutnya →</button>
          }
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ padding: '14px 18px', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
        📖 Pilih tutorial untuk mulai belajar cara menggunakan Automation Lab. Tutorial dibagi berdasarkan level dan topik.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {TUTORIALS.map(t => (
          <div key={t.id}
            style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 18, cursor: 'pointer', transition: 'all 0.15s' }}
            onClick={() => { setSelected(t.id); setActiveStep(0); }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#8b5cf6'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{t.title}</div>
              <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 700, background: `${levelColor[t.level]}22`, color: levelColor[t.level], flexShrink: 0, marginLeft: 8 }}>
                {levelLabel[t.level]}
              </span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.5 }}>{t.description}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>⏱ {t.duration} · {t.steps.length} langkah</span>
              <span style={{ fontSize: 12, color: '#8b5cf6', fontWeight: 500 }}>Mulai →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
