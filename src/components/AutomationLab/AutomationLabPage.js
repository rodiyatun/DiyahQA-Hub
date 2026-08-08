import React, { useState, useEffect, useRef } from 'react';
import { generateFromRequirement, generatePageObject, analyzePlaywrightError, generateWithOpenAI } from './automationUtils';
import { AcademyTab, TestDataTab, RunConfigTab, FailureCenterTab, LocatorInspectorTab, TutorialTab } from './subTabs';
import './AutomationLab.css';

// ─── Shared LogPanel ──────────────────────────────────────────────────────────
function LogPanel({ logs, onClear }) {
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

// ─── Tab: Projects ────────────────────────────────────────────────────────────
function ProjectsTab({ onSelectProject }) {
  const [projects, setProjects]   = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm]           = useState({ name: '', type: 'web', baseUrl: '' });
  const [creating, setCreating]   = useState(false);
  const [setupLogs, setSetupLogs] = useState([]);
  const [done, setDone]           = useState(false);

  useEffect(() => {
    loadProjects();
    window.api.waOnSetupLog(log => setSetupLogs(p => [...p, log]));
    return () => window.api.waOffLog();
  }, []);

  async function loadProjects() {
    const list = await window.api.waListProjects();
    setProjects(list || []);
  }

  async function handleCreate() {
    if (!form.name.trim()) return alert('Nama project wajib diisi');
    setCreating(true);
    setSetupLogs([{ type: 'info', text: `📁 Membuat project "${form.name}"...\n` }]);
    const result = await window.api.waCreateProject(form);
    setCreating(false);
    if (result.success) { setDone(true); await loadProjects(); }
    else setSetupLogs(p => [...p, { type: 'error', text: `❌ ${result.error}` }]);
  }

  if (showCreate) {
    return (
      <div style={{ maxWidth: 560 }}>
        <button className="btn btn-secondary btn-sm" style={{ marginBottom: 16 }}
          onClick={() => { setShowCreate(false); setSetupLogs([]); setDone(false); }}>← Kembali</button>
        <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 24 }}>
          <h3 style={{ fontSize: 16, color: 'var(--text-primary)', marginBottom: 20 }}>🆕 Buat Project Baru</h3>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            {[{ t:'web', icon:'🌐', label:'Web Automation', desc:'Playwright browser test' },
              { t:'api', icon:'🔌', label:'API Automation',  desc:'Playwright API test' }].map(opt => (
              <button key={opt.t} className={`type-btn ${form.type === opt.t ? 'active' : ''}`}
                onClick={() => setForm(p => ({ ...p, type: opt.t }))}>
                <div className="type-icon">{opt.icon}</div>
                <div className="type-label">{opt.label}</div>
                <div className="type-desc">{opt.desc}</div>
              </button>
            ))}
          </div>
          <div className="form-group"><label>Nama Project *</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="my-automation-project" />
          </div>
          <div className="form-group"><label>{form.type === 'api' ? 'Base URL API' : 'Base URL Website'}</label>
            <input value={form.baseUrl} onChange={e => setForm(p => ({ ...p, baseUrl: e.target.value }))}
              placeholder={form.type === 'api' ? 'https://api.staging.example.com' : 'https://staging.example.com'} />
          </div>
          {!done && (
            <button className="btn btn-primary" onClick={handleCreate} disabled={creating}>
              {creating ? <><span className="wa-spinning">⟳</span> Setup...</> : '🚀 Buat Project'}
            </button>
          )}
          {setupLogs.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>Setup Log</div>
              <div className="setup-log">
                {setupLogs.map((l, i) => <div key={i} className={`log-${l.type}`}>{l.text}</div>)}
              </div>
            </div>
          )}
          {done && (
            <div style={{ marginTop: 12, padding: '12px 16px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8 }}>
              <div style={{ fontSize: 13, color: '#22c55e', fontWeight: 600 }}>✅ Project berhasil dibuat!</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>~/DiyahQA-Projects/{form.name.replace(/[^a-zA-Z0-9-_]/g,'-')}</div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }} onClick={() => {
                const proj = projects.find(p => p.name.includes(form.name.replace(/[^a-zA-Z0-9-_]/g,'-')));
                if (proj) onSelectProject(proj);
                setShowCreate(false);
              }}>→ Buka Project</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Projects di <code style={{ color: 'var(--text-primary)' }}>~/DiyahQA-Projects/</code>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowCreate(true)}>+ New Project</button>
      </div>
      {projects.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border)', borderRadius: 12 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🤖</div>
          <div style={{ fontSize: 14, marginBottom: 4 }}>Belum ada project</div>
          <div style={{ fontSize: 12 }}>Klik "+ New Project" untuk memulai</div>
        </div>
      )}
      <div className="proj-grid">
        {projects.map(p => (
          <div key={p.path} className="proj-card" onClick={() => onSelectProject(p)}>
            <div className="proj-card-icon">{p.type === 'api' ? '🔌' : '🌐'}</div>
            <div className="proj-card-name">{p.name}</div>
            <div className="proj-card-meta">
              <span className={p.type === 'api' ? 'badge-api' : 'badge-web'}>{p.type?.toUpperCase()}</span>
              <span style={{ marginLeft: 6 }}>{p.testCount} test files</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.path}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Script Editor ───────────────────────────────────────────────────────
function ScriptEditorTab({ project }) {
  const [files, setFiles]     = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [content, setContent] = useState('');
  const [dirty, setDirty]     = useState(false);

  useEffect(() => { loadFiles(); }, [project]);

  async function loadFiles() {
    const list = await window.api.waListFiles({ projPath: project.path, dir: 'tests' });
    setFiles(list || []);
    if (list?.length && !activeFile) openFile(list[0].name);
  }
  async function openFile(name) {
    const text = await window.api.waReadFile({ projPath: project.path, relPath: `tests/${name}` });
    setActiveFile(name); setContent(text || ''); setDirty(false);
  }
  async function saveFile() {
    if (!activeFile) return;
    await window.api.waWriteFile({ projPath: project.path, relPath: `tests/${activeFile}`, content });
    setDirty(false);
  }
  async function deleteFile(name) {
    if (!window.confirm(`Hapus ${name}?`)) return;
    await window.api.waDeleteFile({ projPath: project.path, relPath: `tests/${name}` });
    await loadFiles();
    if (activeFile === name) { setActiveFile(null); setContent(''); }
  }

  return (
    <div className="wa-layout">
      <div className="wa-sidebar">
        <div className="wa-sidebar-header">tests/
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => {
            const n = window.prompt('Nama file (.spec.ts):');
            if (!n) return;
            const name = n.endsWith('.spec.ts') || n.endsWith('.ts') ? n : n + '.spec.ts';
            window.api.waWriteFile({ projPath: project.path, relPath: `tests/${name}`, content: `import { test, expect } from '@playwright/test';\n\ntest('${name.replace('.spec.ts','')}', async ({ page }) => {\n  // TODO\n});\n` })
              .then(() => { loadFiles(); openFile(name); });
          }}>+</button>
        </div>
        {files.filter(f => !f.isDir).map(f => (
          <div key={f.name} className={`wa-file-item ${activeFile === f.name ? 'active' : ''}`} onClick={() => openFile(f.name)}>
            <span>📄</span>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={e => { e.stopPropagation(); deleteFile(f.name); }}
              style={{ color: 'var(--danger)', fontSize: 10, flexShrink: 0 }}>✕</button>
          </div>
        ))}
        {files.length === 0 && <div style={{ padding: 12, fontSize: 11, color: 'var(--text-muted)' }}>Belum ada file</div>}
      </div>
      <div className="wa-editor-area">
        <div className="wa-editor-toolbar">
          {activeFile && <>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>tests/{activeFile}</span>
            {dirty && <span style={{ fontSize: 10, color: '#f59e0b', marginLeft: 4 }}>●</span>}
            <button className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }} onClick={saveFile} disabled={!dirty}>💾 Save</button>
          </>}
        </div>
        {activeFile
          ? <textarea className="wa-editor" value={content}
              onChange={e => { setContent(e.target.value); setDirty(true); }}
              onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); saveFile(); } }}
              spellCheck={false} />
          : <div style={{ padding: 20, color: 'var(--text-muted)', fontSize: 13 }}>Pilih file atau buat baru (+)</div>
        }
      </div>
    </div>
  );
}

// ─── Tab: Recorder ────────────────────────────────────────────────────────────
function RecorderTab({ project }) {
  const [url, setUrl]             = useState(project.baseUrl || '');
  const [outputFile, setOutputFile] = useState('recorded.spec.ts');
  const [recording, setRecording] = useState(false);
  const [logs, setLogs]           = useState([]);
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    window.api.waOnLog(log => setLogs(p => [...p, log]));
    return () => window.api.waOffLog();
  }, []);

  async function startRecord() {
    setLogs([{ type: 'info', text: `🎬 Membuka Playwright Codegen...\nURL: ${url || '(kosong)'}\nOutput: tests/${outputFile}\n` }]);
    setGeneratedCode(''); setRecording(true);
    const result = await window.api.waCodegen({ projPath: project.path, url, outputFile });
    setRecording(false);
    if (result.generatedCode) {
      setGeneratedCode(result.generatedCode);
      setLogs(p => [...p, { type: 'success', text: `✅ Selesai! Disimpan ke tests/${outputFile}` }]);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 20 }}>
        <h3 style={{ fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>🎬 Playwright Codegen — Record Actions</h3>
        <div style={{ padding: '10px 14px', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)', marginBottom: 14 }}>
          Browser akan terbuka. Lakukan aksi — klik, input, navigasi otomatis direkam. Tutup browser untuk selesai.
        </div>
        <div className="form-row">
          <div className="form-group"><label>URL</label>
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" />
          </div>
          <div className="form-group"><label>Output File</label>
            <input value={outputFile} onChange={e => setOutputFile(e.target.value)} placeholder="recorded.spec.ts" />
          </div>
        </div>
        <button className="btn btn-primary" onClick={startRecord} disabled={recording}>
          {recording ? <><span className="wa-spinning">⟳</span> Recording...</> : '🔴 Start Recording'}
        </button>
      </div>
      <LogPanel logs={logs} onClear={() => setLogs([])} />
      {generatedCode && (
        <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '10px 16px', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Generated Script</span>
            <button className="btn btn-secondary btn-sm" onClick={() => navigator.clipboard.writeText(generatedCode)}>📋 Copy</button>
          </div>
          <div style={{ background: '#0f172a', padding: 16, fontFamily: 'monospace', fontSize: 12, color: '#94a3b8', whiteSpace: 'pre', overflowX: 'auto', maxHeight: 300 }}>{generatedCode}</div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Execution ───────────────────────────────────────────────────────────
function ExecutionTab({ project }) {
  const [logs, setLogs]       = useState([]);
  const [running, setRunning] = useState(false);
  const [grep, setGrep]       = useState('');
  const [mode, setMode]       = useState('run');
  const [files, setFiles]     = useState([]);
  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    window.api.waOnLog(log => setLogs(p => [...p, log]));
    window.api.waListFiles({ projPath: project.path, dir: 'tests' }).then(list => {
      setFiles((list || []).filter(f => !f.isDir && f.name.endsWith('.spec.ts')));
    });
    return () => window.api.waOffLog();
  }, [project]);

  async function run() {
    setLogs([]); setRunning(true);
    await window.api.waRun({ projPath: project.path, mode, file: selectedFile ? `tests/${selectedFile}` : undefined, grep: grep || undefined });
    setRunning(false);
  }
  async function stop() {
    await window.api.waStop(); setRunning(false);
    setLogs(p => [...p, { type: 'warn', text: '⛔ Dihentikan' }]);
  }

  const MODES = [{ id:'run', label:'▶ Run', desc:'Headless' }, { id:'headed', label:'🪟 Headed', desc:'Dengan browser' }, { id:'debug', label:'🐛 Debug', desc:'Step-by-step' }];

  return (
    <div className="exec-layout">
      <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 14 }}>
        <div className="exec-toolbar">
          {MODES.map(m => (
            <button key={m.id} className={`platform-btn ${mode === m.id ? 'active' : ''}`} style={{ padding: '8px 14px' }} onClick={() => setMode(m.id)}>
              {m.label} <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 4 }}>{m.desc}</span>
            </button>
          ))}
          <select value={selectedFile} onChange={e => setSelectedFile(e.target.value)} style={{ fontSize: 12 }}>
            <option value="">All tests</option>
            {files.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
          </select>
          <input value={grep} onChange={e => setGrep(e.target.value)} placeholder="--grep pattern" style={{ fontSize: 12, width: 140 }} />
          {!running
            ? <button className="btn btn-primary" onClick={run}>▶ Run</button>
            : <button className="btn btn-danger btn-sm" onClick={stop}>⛔ Stop</button>
          }
        </div>
      </div>
      <LogPanel logs={logs} onClear={() => setLogs([])} />
    </div>
  );
}

// ─── Tab: AI Generator ────────────────────────────────────────────────────────
function AIGeneratorTab({ project }) {
  const [mode, setMode]         = useState('requirement');
  const [form, setForm]         = useState({ url: project.baseUrl || '', title: '', steps: '', expectedResult: '', type: project.type || 'web', pageName: '', elements: '' });
  const [code, setCode]         = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError]   = useState('');
  const [errorLog, setErrorLog] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const apiKey = localStorage.getItem('openai_api_key') || '';

  function set(f, v) { setForm(p => ({ ...p, [f]: v })); }

  function generateLocal() {
    setCode(mode === 'pom' ? generatePageObject(form) : generateFromRequirement(form));
  }

  async function generateAI() {
    if (!apiKey) return setAiError('API key belum di-set di Settings.');
    setAiLoading(true); setAiError('');
    try {
      const prompt = aiPrompt || `Generate Playwright TypeScript test:\nURL: ${form.url}\nSkenario: ${form.title}\nLangkah:\n${form.steps}\nExpected: ${form.expectedResult}`;
      setCode(await generateWithOpenAI(apiKey, prompt));
    } catch(e) { setAiError(e.message); }
    finally { setAiLoading(false); }
  }

  async function saveToProject() {
    if (!code) return;
    const name = `${(form.title||'generated').replace(/\s+/g,'-').toLowerCase()}.spec.ts`;
    await window.api.waWriteFile({ projPath: project.path, relPath: `tests/${name}`, content: code });
    alert(`✅ Disimpan ke tests/${name}`);
  }

  const MODES = [{ id:'requirement', label:'📝 Requirement' }, { id:'pom', label:'🏗️ Page Object' }, { id:'ai', label:'🤖 OpenAI' }, { id:'error', label:'🔥 Error Analyzer' }];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {MODES.map(m => (
          <button key={m.id} className={`env-tab-btn ${mode === m.id ? 'active' : ''}`}
            style={mode === m.id ? { borderColor: '#8b5cf6', color: '#8b5cf6' } : {}}
            onClick={() => setMode(m.id)}>{m.label}</button>
        ))}
      </div>
      <div className="ai-gen-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(mode === 'requirement' || mode === 'pom') && (
            <div className="ai-card">
              <h3>{mode === 'pom' ? '🏗️ Generate Page Object' : '📝 Generate dari Requirement'}</h3>
              <div className="form-group"><label>URL</label>
                <input value={form.url} onChange={e => set('url', e.target.value)} placeholder="https://example.com" />
              </div>
              {mode === 'requirement' && <>
                <div className="form-group"><label>Nama Test</label>
                  <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Login with valid credentials" />
                </div>
                <div className="form-group"><label>Langkah-Langkah</label>
                  <textarea rows={5} value={form.steps} onChange={e => set('steps', e.target.value)}
                    placeholder={"Klik tombol Login\nIsi email 'qa@test.com'\nIsi password\nKlik Submit\nVerifikasi dashboard tampil"} />
                </div>
                <div className="form-group"><label>Expected Result</label>
                  <input value={form.expectedResult} onChange={e => set('expectedResult', e.target.value)} />
                </div>
              </>}
              {mode === 'pom' && <>
                <div className="form-group"><label>Nama Page</label>
                  <input value={form.pageName} onChange={e => set('pageName', e.target.value)} placeholder="LoginPage" />
                </div>
                <div className="form-group"><label>Elemen (satu per baris)</label>
                  <textarea rows={4} value={form.elements} onChange={e => set('elements', e.target.value)}
                    placeholder={"Email Input\nPassword Input\nLogin Button"} />
                </div>
              </>}
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary" onClick={generateLocal}>⚡ Generate</button>
                {code && <button className="btn btn-secondary btn-sm" onClick={saveToProject}>💾 Simpan</button>}
              </div>
            </div>
          )}
          {mode === 'ai' && (
            <div className="ai-card">
              <h3>🤖 AI Generator (OpenAI)</h3>
              {!apiKey && <div style={{ padding: '8px 12px', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: 8, fontSize: 12, color: '#f97316', marginBottom: 10 }}>⚠️ Set API key di Settings.</div>}
              <div className="form-group"><label>Prompt</label>
                <textarea rows={6} value={aiPrompt} onChange={e => setAiPrompt(e.target.value)}
                  placeholder="Buat Playwright test untuk login ke https://app.example.com dengan email qa@test.com, password secret123, verifikasi redirect ke /dashboard" />
              </div>
              {aiError && <div style={{ fontSize: 12, color: '#ef4444', marginBottom: 8 }}>❌ {aiError}</div>}
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary" onClick={generateAI} disabled={aiLoading || !aiPrompt.trim()}>
                  {aiLoading ? <><span className="wa-spinning">⟳</span> Generating...</> : '🤖 Generate'}
                </button>
                {code && <button className="btn btn-secondary btn-sm" onClick={saveToProject}>💾 Simpan</button>}
              </div>
            </div>
          )}
          {mode === 'error' && (
            <div className="ai-card">
              <h3>🔥 Error Analyzer</h3>
              <div className="form-group"><label>Paste Error Log Playwright</label>
                <textarea rows={8} value={errorLog} onChange={e => setErrorLog(e.target.value)} placeholder="TimeoutError: locator not found..." />
              </div>
              <button className="btn btn-primary" onClick={() => setSuggestions(analyzePlaywrightError(errorLog))} disabled={!errorLog.trim()}>🔍 Analisis</button>
              {suggestions.map((s, i) => (
                <div key={i} className="ai-step" style={{ marginTop: 10 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '2px 0' }}>{s.desc}</div>
                    <div style={{ fontSize: 12, color: '#8b5cf6', fontStyle: 'italic' }}>→ {s.fix}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="ai-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>📄 Generated Code</h3>
            {code && <button className="btn btn-secondary btn-sm" onClick={() => navigator.clipboard.writeText(code)}>📋 Copy</button>}
          </div>
          {code
            ? <div className="ai-output">{code}</div>
            : <div style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, border: '1px dashed var(--border)', borderRadius: 8 }}>Code akan tampil di sini</div>
          }
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Report ──────────────────────────────────────────────────────────────
function ReportTab({ project }) {
  const [logs, setLogs]       = useState([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    window.api.waOnLog(log => setLogs(p => [...p, log]));
    return () => window.api.waOffLog();
  }, [project]);

  async function generateReport() {
    setRunning(true);
    setLogs([{ type: 'info', text: '📊 Generating Allure report...\n' }]);
    const r = await window.api.waAllureReport({ projPath: project.path });
    setRunning(false);
    if (!r.success) setLogs(p => [...p, { type: 'error', text: `❌ ${r.error}` }]);
    else setLogs(p => [...p, { type: 'success', text: '✅ Report berhasil di-generate!' }]);
  }

  async function openReport() {
    const r = await window.api.waOpenReport({ projPath: project.path });
    if (!r.success) alert(r.error);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 16 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={generateReport} disabled={running}>
            {running ? <><span className="wa-spinning">⟳</span> Generating...</> : '📊 Generate Allure Report'}
          </button>
          <button className="btn btn-secondary" onClick={openReport}>🌐 Buka di Browser</button>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>
          Pastikan tests sudah dijalankan dulu. Report dibuka di browser default.
        </div>
      </div>
      <LogPanel logs={logs} onClear={() => setLogs([])} />
    </div>
  );
}

// ─── Tab: Settings ────────────────────────────────────────────────────────────
function SettingsTab() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved]   = useState(false);

  function save() {
    localStorage.setItem('openai_api_key', apiKey);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className="settings-section">
        <h3>🤖 OpenAI API Key</h3>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>
          Opsional. Tanpa API key, AI Generator pakai rule-based (offline).<br />
          Dapatkan key di <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6' }}>platform.openai.com</a>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input type={showKey ? 'text' : 'password'} value={apiKey} onChange={e => setApiKey(e.target.value)}
            placeholder="sk-proj-..." style={{ flex: 1, fontFamily: 'monospace' }} />
          <button className="btn btn-secondary btn-sm" onClick={() => setShowKey(p => !p)}>{showKey ? '🙈' : '👁️'}</button>
        </div>
        <button className="btn btn-primary btn-sm" style={{ marginTop: 10 }} onClick={save}>
          {saved ? '✅ Tersimpan!' : '💾 Simpan'}
        </button>
      </div>
      <div className="settings-section">
        <h3>📁 Project Location</h3>
        <div style={{ padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: 8, fontFamily: 'monospace', fontSize: 13, color: 'var(--text-primary)' }}>
          ~/DiyahQA-Projects/
        </div>
      </div>
      <div className="settings-section">
        <h3>ℹ️ Requirements</h3>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <div>• Node.js — untuk npm install dan menjalankan Playwright</div>
          <div>• Playwright Chromium — diinstall otomatis saat buat project</div>
          <div>• Internet — untuk setup project pertama kali</div>
          <div>• OpenAI API key — opsional, untuk AI Generator lebih cerdas</div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab list + Main Export ───────────────────────────────────────────────────
const PROJECT_TABS = [
  { id: 'recorder',  label: '🔴 Recorder' },
  { id: 'editor',    label: '📝 Script Editor' },
  { id: 'ai',        label: '🤖 AI Generator' },
  { id: 'execution', label: '▶️ Execution' },
  { id: 'data',      label: '📊 Test Data' },
  { id: 'config',    label: '⚙️ Run Config' },
  { id: 'failure',   label: '🔥 Failure Center' },
  { id: 'inspector', label: '🎯 Locator Inspector' },
  { id: 'report',    label: '📈 Report' },
];

export default function AutomationLabPage() {
  const [view, setView]         = useState('projects');
  const [project, setProject]   = useState(null);
  const [tab, setTab]           = useState('recorder');
  const [mainTab, setMainTab]   = useState('projects');

  function openProject(proj) { setProject(proj); setView('project-detail'); setTab('recorder'); }

  if (view === 'project-detail' && project) {
    return (
      <div className="walab-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setView('projects')}>← Projects</button>
          <span className={project.type === 'api' ? 'badge-api' : 'badge-web'}>{project.type?.toUpperCase()}</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{project.name}</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace', marginLeft: 'auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 300 }}>{project.path}</span>
        </div>
        <div className="walab-tabs">
          {PROJECT_TABS.map(t => (
            <button key={t.id} className={`walab-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
          <button className="walab-tab" onClick={() => setTab('settings')}
            style={tab === 'settings' ? { color: '#8b5cf6', borderBottomColor: '#8b5cf6' } : {}}>🔧 Settings</button>
        </div>
        <div className="walab-content">
          {tab === 'recorder'  && <RecorderTab    project={project} />}
          {tab === 'editor'    && <ScriptEditorTab project={project} />}
          {tab === 'ai'        && <AIGeneratorTab  project={project} />}
          {tab === 'execution' && <ExecutionTab    project={project} />}
          {tab === 'data'      && <TestDataTab     project={project} />}
          {tab === 'config'    && <RunConfigTab    project={project} />}
          {tab === 'failure'   && <FailureCenterTab project={project} />}
          {tab === 'inspector' && <LocatorInspectorTab project={project} />}
          {tab === 'report'    && <ReportTab       project={project} />}
          {tab === 'settings'  && <SettingsTab />}
        </div>
      </div>
    );
  }

  return (
    <div className="walab-container">
      <div>
        <h1 className="page-title">Automation Lab</h1>
        <p className="page-subtitle">Web & API automation powered by Playwright — Recorder, AI Generator, Failure Center, Academy</p>
      </div>
      <div className="walab-tabs">
        <button className={`walab-tab ${mainTab === 'projects' ? 'active' : ''}`} onClick={() => setMainTab('projects')}>🤖 Projects</button>
        <button className={`walab-tab ${mainTab === 'academy'  ? 'active' : ''}`} onClick={() => setMainTab('academy')}>🎭 Playwright Academy</button>
        <button className={`walab-tab ${mainTab === 'tutorial' ? 'active' : ''}`} onClick={() => setMainTab('tutorial')}>📖 Tutorial</button>
      </div>
      <div className="walab-content">
        {mainTab === 'projects' && <ProjectsTab onSelectProject={openProject} />}
        {mainTab === 'academy'  && <AcademyTab />}
        {mainTab === 'tutorial' && <TutorialTab />}
      </div>
    </div>
  );
}
