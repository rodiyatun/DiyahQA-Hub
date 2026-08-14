import TutorialPanel from '../TutorialPanel';
import React, { useState } from 'react';
import { ACADEMY_MODULES, PERFORMANCE_CHECKLIST, PERFORMANCE_CHALLENGES } from './performanceData';
import { analyzeK6Report, generateK6Script, compareTrends } from './performanceUtils';
import { 
  GraduationCap, Zap, Search, TrendingUp, CheckSquare, Trophy, Settings, Link, Activity, Flame, 
  Waves, Ruler, Copy, Play, Database, FileText, CheckCircle2, AlertTriangle, XCircle, BarChart2,
  ArrowRight, ArrowUp, ArrowDown, Save, Trash2, RotateCcw, Check, ArrowLeft
} from 'lucide-react';
import { isWeb } from '../../utils/platform';
import './PerformanceLab.css';

// ── Tab: Performance Academy ──────────────────────────────────────────────────
function AcademyTab() {
  const allLessons = ACADEMY_MODULES.flatMap(m => m.lessons.map(l => ({ ...l, moduleTitle: m.title, moduleIcon: m.icon })));
  const [activeId, setActiveId] = useState(allLessons[0].id);
  const lesson = allLessons.find(l => l.id === activeId);

  return (
    <div className="academy-layout">
      <div className="academy-sidebar">
        {ACADEMY_MODULES.map(mod => (
          <div key={mod.id} className="academy-module-group">
            <div className="academy-module-title">{mod.icon} {mod.title}</div>
            {mod.lessons.map(lesson => (
              <button
                key={lesson.id}
                className={`academy-lesson-btn ${activeId === lesson.id ? 'active' : ''}`}
                onClick={() => setActiveId(lesson.id)}
              >
                {lesson.title}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="academy-content">
        {lesson && <LessonView lesson={lesson} />}
      </div>
    </div>
  );
}

function LessonView({ lesson }) {
  return (
    <div className="academy-card">
      <h2 style={{ fontSize: 18, color: 'var(--text-primary)', marginBottom: 16 }}>{lesson.title}</h2>
      {lesson.content && <div className="academy-body">{lesson.content}</div>}
      {lesson.keyPoints && (
        <>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Key Points</div>
          <div className="key-points">
            {lesson.keyPoints.map((p, i) => <div key={i} className="key-point">✦ {p}</div>)}
          </div>
        </>
      )}
      {lesson.table && (
        <table className="academy-table">
          <thead>
            <tr>
              {Object.keys(lesson.table[0]).map(k => <th key={k}>{k.charAt(0).toUpperCase() + k.slice(1)}</th>)}
            </tr>
          </thead>
          <tbody>
            {lesson.table.map((row, i) => (
              <tr key={i}>{Object.values(row).map((v, j) => <td key={j}>{v}</td>)}</tr>
            ))}
          </tbody>
        </table>
      )}
      {lesson.metrics && (
        <div className="metric-cards">
          {lesson.metrics.map(m => (
            <div key={m.name} className="metric-card">
              <div className="metric-name">{m.name}</div>
              <div className="metric-desc">{m.desc}</div>
              <div className="metric-thresholds">
                <div className="metric-threshold"><span className="dot-good" /><span style={{ color: '#22c55e' }}>Good: {m.good}</span></div>
                <div className="metric-threshold"><span className="dot-ok" /><span style={{ color: '#f59e0b' }}>OK: {m.ok}</span></div>
                <div className="metric-threshold"><span className="dot-bad" /><span style={{ color: '#ef4444' }}>Bad: {m.bad}</span></div>
              </div>
              {m.tip && <div className="metric-tip">💡 {m.tip}</div>}
            </div>
          ))}
        </div>
      )}
      {lesson.example && (
        <>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, marginTop: 16 }}>Contoh Script</div>
          <div className="code-block">{lesson.example}</div>
        </>
      )}
    </div>
  );
}

// ── Tab: Scenario Builder + k6 Generator ─────────────────────────────────────
const SCENARIO_TYPES = [
  { id: 'load',     icon: <Activity size={18} className="icon-blue" />, label: 'Load Test',  desc: 'Beban normal/peak' },
  { id: 'stress',   icon: <Flame size={18} className="icon-red" />, label: 'Stress Test', desc: 'Temukan batas sistem' },
  { id: 'spike',    icon: <Zap size={18} className="icon-yellow" />, label: 'Spike Test',  desc: 'Lonjakan tiba-tiba' },
  { id: 'soak',     icon: <Waves size={18} className="icon-purple" />, label: 'Soak Test',   desc: 'Durasi panjang' },
  { id: 'baseline', icon: <Ruler size={18} className="icon-green" />, label: 'Baseline',    desc: 'Rekam referensi awal' },
];

const emptyEndpoint = { method: 'GET', path: '/api/endpoint', name: '', body: '' };

function ScenarioBuilderTab() {
  const [scenario, setScenario] = useState({
    name: 'My Performance Test', baseUrl: 'https://api.example.com',
    testType: 'load', vus: 50, duration: '5m', rampUp: '2m', rampDown: '1m',
    thresholdP95: 1000, thresholdErrorRate: 0.01,
    authType: 'none', authToken: '', thinkTime: 1,
    endpoints: [{ ...emptyEndpoint }],
  });
  const [script, setScript] = useState('');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [k6Logs, setK6Logs] = useState([]);
  const logEndRef = React.useRef(null);

  React.useEffect(() => {
    if (!window.ipcRenderer) return;
    const handleLog = (_, log) => {
      setK6Logs(prev => [...prev, log]);
    };
    window.ipcRenderer.on('k6-log', handleLog);
    return () => window.ipcRenderer.removeListener('k6-log', handleLog);
  }, []);

  React.useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [k6Logs]);

  async function handleRunK6() {
    if (!window.ipcRenderer) {
      alert("Fitur ini hanya berjalan di versi Desktop (Electron).");
      return;
    }
    setK6Logs([]);
    setIsRunning(true);
    const res = await window.ipcRenderer.invoke('run-k6-script', script);
    setIsRunning(false);
    if (!res.success) {
      if (res.error) {
        setK6Logs(prev => [...prev, '\n[ERROR] k6 gagal dijalankan. Pastikan k6 sudah ter-install dan terdaftar di PATH.\nError: ' + res.error]);
      } else {
        setK6Logs(prev => [...prev, '\n[ERROR] K6 gagal atau threshold performa tidak terpenuhi (Exit Code: ' + res.code + ').']);
        
        const bugData = {
          project_id: '',
          title: `[Performance Lab] Load Test Failed: ${scenario.name}`,
          description: `Performance test "${scenario.name}" gagal memenuhi threshold yang ditentukan atau terdapat script error.\n\nSimulasi URL: ${scenario.baseUrl}`,
          steps_to_reproduce: '1. Buka Performance Lab\n2. Jalankan skenario: ' + scenario.name,
          severity: 'High',
          priority: 'P1',
          status: 'Open',
          environment: scenario.baseUrl,
          expected_behavior: `P95 Threshold < ${scenario.thresholdP95}ms\nError Rate < ${scenario.thresholdErrorRate * 100}%`,
          actual_behavior: 'Threshold tidak terpenuhi (k6 mengembalikan exit code ' + res.code + ')',
          module: 'Performance'
        };
        
        try {
          await window.ipcRenderer.invoke('create-bug-report', bugData);
          setK6Logs(prev => [...prev, '\n[AI QA] 🤖 Performa tidak sesuai standar. Tiket Bug Report otomatis telah dibuat dan disimpan di sistem!']);
        } catch (e) {
          setK6Logs(prev => [...prev, '\n[AI QA] 🤖 Gagal membuat tiket Bug Report.']);
        }
      }
    } else {
      setK6Logs(prev => [...prev, '\n[SUCCESS] Test selesai dan memenuhi standar performa.']);
    }
  }

  function set(field, val) { setScenario(p => ({ ...p, [field]: val })); }

  function addEndpoint() {
    setScenario(p => ({ ...p, endpoints: [...p.endpoints, { ...emptyEndpoint }] }));
  }
  function removeEndpoint(i) {
    setScenario(p => ({ ...p, endpoints: p.endpoints.filter((_, idx) => idx !== i) }));
  }
  function setEndpoint(i, field, val) {
    setScenario(p => {
      const eps = [...p.endpoints];
      eps[i] = { ...eps[i], [field]: val };
      return { ...p, endpoints: eps };
    });
  }

  function handleGenerate() { setScript(generateK6Script(scenario)); }

  function handleCopy() {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="scenario-builder">
        {/* Left: Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="builder-card">
            <h3><Settings size={18} style={{ marginRight: 6 }}/> Konfigurasi Test</h3>
            <div className="form-group"><label>Nama Test</label>
              <input value={scenario.name} onChange={e => set('name', e.target.value)} />
            </div>
            <div className="form-group"><label>Base URL</label>
              <input value={scenario.baseUrl} onChange={e => set('baseUrl', e.target.value)} placeholder="https://api.example.com" />
            </div>
            <div className="form-row">
              <div className="form-group"><label>Virtual Users (VU)</label>
                <input type="number" value={scenario.vus} onChange={e => set('vus', Number(e.target.value))} min={1} />
              </div>
              <div className="form-group"><label>Duration</label>
                <input value={scenario.duration} onChange={e => set('duration', e.target.value)} placeholder="5m" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>p95 Threshold (ms)</label>
                <input type="number" value={scenario.thresholdP95} onChange={e => set('thresholdP95', Number(e.target.value))} />
              </div>
              <div className="form-group"><label>Error Rate Threshold</label>
                <input type="number" value={scenario.thresholdErrorRate} step={0.001} onChange={e => set('thresholdErrorRate', Number(e.target.value))} placeholder="0.01" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Auth Type</label>
                <select value={scenario.authType} onChange={e => set('authType', e.target.value)}>
                  <option value="none">None</option>
                  <option value="bearer">Bearer Token</option>
                  <option value="basic">Basic Auth</option>
                </select>
              </div>
              <div className="form-group"><label>Think Time (detik)</label>
                <input type="number" value={scenario.thinkTime} onChange={e => set('thinkTime', Number(e.target.value))} min={0} step={0.5} />
              </div>
            </div>
            {scenario.authType !== 'none' && (
              <div className="form-group"><label>Token / Credentials</label>
                <input value={scenario.authToken} onChange={e => set('authToken', e.target.value)} placeholder={scenario.authType === 'bearer' ? 'eyJhbGci...' : 'user:password'} />
              </div>
            )}
          </div>

          <div className="builder-card">
            <h3>🎯 Tipe Skenario</h3>
            <div className="scenario-type-grid">
              {SCENARIO_TYPES.map(t => (
                <button key={t.id} className={`scenario-type-btn ${scenario.testType === t.id ? 'active' : ''}`}
                  onClick={() => set('testType', t.id)}>
                  <span className="scenario-type-icon">{t.icon}</span>
                  {t.label}
                  <div className="scenario-type-desc">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Endpoints */}
        <div className="builder-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Link size={18}/> Endpoints</h3>
          <div className="endpoint-list">
            {scenario.endpoints.map((ep, i) => (
              <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <select value={ep.method} onChange={e => setEndpoint(i, 'method', e.target.value)}
                    style={{ width: 80 }}>
                    {['GET','POST','PUT','PATCH','DELETE'].map(m => <option key={m}>{m}</option>)}
                  </select>
                  <input style={{ flex: 1 }} value={ep.path} onChange={e => setEndpoint(i, 'path', e.target.value)} placeholder="/api/endpoint" />
                  {scenario.endpoints.length > 1 && (
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => removeEndpoint(i)} style={{ color: 'var(--danger)' }}>✕</button>
                  )}
                </div>
                <input value={ep.name} onChange={e => setEndpoint(i, 'name', e.target.value)} placeholder="Nama endpoint (opsional)" />
                {['POST','PUT','PATCH'].includes(ep.method) && (
                  <textarea rows={2} value={ep.body} onChange={e => setEndpoint(i, 'body', e.target.value)}
                    placeholder='{"key": "value"}' style={{ fontFamily: 'monospace', fontSize: 12 }} />
                )}
              </div>
            ))}
          </div>
          <button className="btn btn-secondary btn-sm" style={{ marginTop: 10, width: '100%' }} onClick={addEndpoint}>+ Tambah Endpoint</button>
          <button className="btn btn-primary" style={{ marginTop: 12, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }} onClick={handleGenerate}>
            <Zap size={16}/> Generate k6 Script
          </button>
        </div>
      </div>

      {/* Script Output & Runner */}
      {script && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Generated k6 Script</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary btn-sm" style={{ display: 'flex', gap: 6, alignItems: 'center' }} onClick={handleCopy}>
                  <Copy size={14}/> {copied ? 'Copied!' : 'Copy'}
                </button>
                <button className="btn btn-primary btn-sm" style={{ display: 'flex', gap: 6, alignItems: 'center' }} onClick={handleRunK6} disabled={isRunning}>
                  {isRunning ? '⏳ Running...' : <><Play size={14}/> Run Script Now</>}
                </button>
              </div>
            </div>
            <div className="code-block" style={{ margin: 0, borderRadius: 0, maxHeight: 400, overflowY: 'auto' }}>{script}</div>
          </div>
          
          {(isRunning || k6Logs.length > 0) && (
            <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', background: '#0d1117' }}>
              <div style={{ padding: '8px 16px', background: '#161b22', borderBottom: '1px solid #30363d', fontSize: 13, color: '#c9d1d9', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                <span>k6 Terminal</span>
                {isRunning && <span style={{ color: '#58a6ff' }}>Menjalankan...</span>}
              </div>
              <div style={{ padding: 16, maxHeight: 300, overflowY: 'auto', color: '#c9d1d9', fontFamily: 'monospace', fontSize: 12, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                {k6Logs.join('')}
                <div ref={logEndRef} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Tab: Report Analyzer ──────────────────────────────────────────────────────
function ReportAnalyzerTab() {
  const [metrics, setMetrics] = useState({ p95: '', p99: '', avg: '', errorRate: '', rps: '', vus: '' });
  const [result, setResult] = useState(null);

  function set(field, val) { setMetrics(p => ({ ...p, [field]: val })); setResult(null); }

  function handleAnalyze() {
    const m = {};
    if (metrics.p95)        m.p95 = Number(metrics.p95);
    if (metrics.p99)        m.p99 = Number(metrics.p99);
    if (metrics.avg)        m.avg = Number(metrics.avg);
    if (metrics.errorRate)  m.errorRate = Number(metrics.errorRate) / 100;
    if (metrics.rps)        m.rps = Number(metrics.rps);
    if (metrics.vus)        m.vus = Number(metrics.vus);
    setResult(analyzeK6Report(m));
  }

  function loadSample() {
    setMetrics({ p95: '780', p99: '1950', avg: '280', errorRate: '0.5', rps: '87', vus: '200' });
    setResult(null);
  }

  const findingIcon = { pass: <CheckCircle2 size={16} className="icon-green"/>, warn: <AlertTriangle size={16} className="icon-yellow"/>, fail: <XCircle size={16} className="icon-red"/> };

  return (
    <div className="analyzer-layout">
      <div className="builder-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 14, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}><BarChart2 size={16}/> Input Metrik Hasil Pengujian</h3>
          <button className="btn btn-secondary btn-sm" onClick={loadSample}>Muat Contoh Data</button>
        </div>
        <div className="metrics-input-grid">
          {[
            { field: 'p95', label: 'p95 Response Time (ms)', placeholder: '500' },
            { field: 'p99', label: 'p99 Response Time (ms)', placeholder: '1200' },
            { field: 'avg', label: 'Avg Response Time (ms)', placeholder: '280' },
            { field: 'errorRate', label: 'Error Rate (%)', placeholder: '0.5' },
            { field: 'rps', label: 'Throughput (RPS)', placeholder: '150' },
            { field: 'vus', label: 'Virtual Users (VU)', placeholder: '100' },
          ].map(({ field, label, placeholder }) => (
            <div key={field} className="form-group">
              <label>{label}</label>
              <input type="number" value={metrics[field]} onChange={e => set(field, e.target.value)} placeholder={placeholder} />
            </div>
          ))}
        </div>
        <div className="builder-card" style={{ marginTop: 16 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FileText size={18}/> Hasil k6 Run (Raw Log)</h3>
            <textarea
              className="script-output"
              rows={6}
              value={metrics.raw}
              onChange={e => set('raw', e.target.value)}
              placeholder="Paste hasil log/JSON dari k6 di sini..."
            />
        </div>
        <button className="btn btn-primary" style={{ marginTop: 16, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={handleAnalyze}
          disabled={!metrics.p95 && !metrics.errorRate && !metrics.raw}>
          <Search size={16}/> Analisis Sekarang
        </button>
      </div>

      {result && (
        <>
          <div className={`verdict-banner ${result.verdictClass}`}>
            <span style={{ fontSize: 32 }}>{result.verdict === 'FAIL' ? <XCircle size={32}/> : result.verdict === 'PASS' ? <CheckCircle2 size={32}/> : result.verdict === 'EXCELLENT' ? <Trophy size={32}/> : <AlertTriangle size={32}/>}</span>
            <div>
              <div className="verdict-label">{result.verdict}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {result.findings.filter(f => f.level === 'fail').length} critical ·{' '}
                {result.findings.filter(f => f.level === 'warn').length} warnings ·{' '}
                {result.findings.filter(f => f.level === 'pass').length} passed
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {result.findings.map((f, i) => (
              <div key={i} className={`finding-item finding-${f.level}`}>
                <span className="finding-icon">{findingIcon[f.level]}</span>
                <div>
                  <div className="finding-category">{f.category}</div>
                  <div className="finding-title">{f.title}</div>
                  <div className="finding-message">{f.message}</div>
                  {f.recommendation && <div className="finding-rec">→ {f.recommendation}</div>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!result && (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13,
          border: '1px dashed var(--border)', borderRadius: 12 }}>
          Masukkan metrik hasil pengujian lalu klik <strong>Analisis Sekarang</strong>.<br />
          Kamu bisa copy nilai dari output k6 atau JMeter.
        </div>
      )}
    </div>
  );
}

// ── Tab: Trend Dashboard ──────────────────────────────────────────────────────
const STORAGE_KEY = 'perflab_runs';

function TrendDashboardTab() {
  const [runs, setRuns] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  });
  const [form, setForm] = useState({ label: '', p95: '', errorRate: '', rps: '', vus: '', date: new Date().toISOString().slice(0, 10) });

  function saveRun() {
    if (!form.label || !form.p95) return alert('Label dan p95 wajib diisi');
    const run = { ...form, id: Date.now(), p95: Number(form.p95), errorRate: Number(form.errorRate), rps: Number(form.rps), vus: Number(form.vus) };
    const updated = [...runs, run];
    setRuns(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setForm({ label: '', p95: '', errorRate: '', rps: '', vus: '', date: new Date().toISOString().slice(0, 10) });
  }

  function deleteRun(id) {
    const updated = runs.filter(r => r.id !== id);
    setRuns(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  const trend = compareTrends(runs);

  function trendArrow(diff, invertGood = false) {
    if (!diff && diff !== 0) return null;
    const isGood = invertGood ? diff < 0 : diff > 0;
    if (diff === 0) return <span className="trend-flat"><ArrowRight size={14}/> 0</span>;
    if (diff > 0) return <span className={invertGood ? 'trend-up' : 'trend-down'}><ArrowUp size={14}/> +{diff}</span>;
    return <span className={invertGood ? 'trend-down' : 'trend-up'}><ArrowDown size={14}/> {diff}</span>;
  }

  return (
    <div className="trend-layout">
      {trend && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { label: 'p95 vs Previous', val: `${trend.p95.current}ms`, arrow: trendArrow(trend.p95.diff, true), regression: trend.p95.regression, pct: trend.p95.pct },
            { label: 'Error Rate vs Previous', val: `${(trend.errorRate.current * 100).toFixed(2)}%`, arrow: trendArrow(trend.errorRate.diff, true), regression: trend.errorRate.regression },
            { label: 'Throughput vs Previous', val: `${trend.rps.current} RPS`, arrow: trendArrow(trend.rps.diff, false), regression: trend.rps.regression },
          ].map((item, i) => (
            <div key={i} className="builder-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>{item.val}</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>{item.arrow}</div>
              {item.regression && <span className="regression-badge" style={{ marginTop: 6, display: 'inline-block' }}><AlertTriangle size={12}/> REGRESSION</span>}
            </div>
          ))}
        </div>
      )}

      <div className="builder-card">
        <h3 style={{ fontSize: 14, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}><Save size={16}/> Simpan Hasil Run</h3>
        <div className="metrics-input-grid">
          <div className="form-group"><label>Label / Release</label>
            <input value={form.label} onChange={e => setForm(p => ({ ...p, label: e.target.value }))} placeholder="v1.2.0 / Sprint 12" />
          </div>
          <div className="form-group"><label>Tanggal</label>
            <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
          </div>
          <div className="form-group"><label>p95 (ms) *</label>
            <input type="number" value={form.p95} onChange={e => setForm(p => ({ ...p, p95: e.target.value }))} />
          </div>
          <div className="form-group"><label>Error Rate (%)</label>
            <input type="number" value={form.errorRate} onChange={e => setForm(p => ({ ...p, errorRate: e.target.value }))} step="0.01" />
          </div>
          <div className="form-group"><label>RPS</label>
            <input type="number" value={form.rps} onChange={e => setForm(p => ({ ...p, rps: e.target.value }))} />
          </div>
          <div className="form-group"><label>VU</label>
            <input type="number" value={form.vus} onChange={e => setForm(p => ({ ...p, vus: e.target.value }))} />
          </div>
        </div>
        <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }} onClick={saveRun}><Save size={14}/> Simpan Run</button>
      </div>

      {runs.length > 0 ? (
        <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <table className="runs-table">
            <thead><tr>
              <th>Label</th><th>Tanggal</th><th>p95 (ms)</th><th>Error Rate</th><th>RPS</th><th>VU</th><th></th>
            </tr></thead>
            <tbody>
              {runs.map((r, i) => {
                const prev = runs[i - 1];
                const p95Regress = prev && r.p95 > prev.p95 * 1.1;
                return (
                  <tr key={r.id}>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{r.label}</td>
                    <td>{r.date}</td>
                    <td>
                      {r.p95}ms{' '}
                      {prev && <span className={p95Regress ? 'trend-up' : 'trend-down'} style={{ fontSize: 11 }}>
                        ({r.p95 > prev.p95 ? '+' : ''}{r.p95 - prev.p95}ms)
                      </span>}
                      {p95Regress && <span className="regression-badge" style={{ marginLeft: 4 }}><AlertTriangle size={10}/> REG</span>}
                    </td>
                    <td>{r.errorRate ? `${r.errorRate}%` : '—'}</td>
                    <td>{r.rps || '—'}</td>
                    <td>{r.vus || '—'}</td>
                    <td><button className="btn btn-ghost btn-icon btn-sm" onClick={() => deleteRun(r.id)} style={{ color: 'var(--danger)' }}><Trash2 size={16}/></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, border: '1px dashed var(--border)', borderRadius: 12 }}>
          Belum ada data run. Simpan hasil pengujian untuk mulai tracking tren performa.
        </div>
      )}
    </div>
  );
}

// ── Tab: Performance Checklist ────────────────────────────────────────────────
function ChecklistTab() {
  const [activeCategory, setActiveCategory] = useState(PERFORMANCE_CHECKLIST[0].category);
  const [checked, setChecked] = useState({});
  const current = PERFORMANCE_CHECKLIST.find(c => c.category === activeCategory);
  const items = current?.items || [];
  const done = items.filter(i => checked[i.id]).length;
  const pct = items.length ? Math.round((done / items.length) * 100) : 0;

  const riskColor = { critical: '#ef4444', high: '#f97316', medium: '#f59e0b', low: '#6366f1' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {PERFORMANCE_CHECKLIST.map(cat => {
          const catDone = cat.items.filter(i => checked[i.id]).length;
          return (
            <button key={cat.category}
              className={`perf-checklist-cat-btn ${activeCategory === cat.category ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.category)}>
              {cat.label} <span style={{ marginLeft: 4, fontSize: 11, opacity: 0.8 }}>{catDone}/{cat.items.length}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="checklist-progress" style={{ flex: 1 }}>
          <div className="checklist-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', minWidth: 60 }}>{done}/{items.length} ({pct}%)</span>
        <button className="btn btn-secondary btn-sm" onClick={() => {
          const ids = items.map(i => i.id);
          setChecked(p => { const n = { ...p }; ids.forEach(id => delete n[id]); return n; });
        }}><RotateCcw size={14}/> Reset</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(item => (
          <div key={item.id} className={`checklist-item ${checked[item.id] ? 'checked' : ''}`}
            onClick={() => setChecked(p => ({ ...p, [item.id]: !p[item.id] }))}>
            <div className="checklist-checkbox">{checked[item.id] && <Check size={14}/>}</div>
            <div className="checklist-content">
              <div className="checklist-text">{item.text}</div>
              <div className="checklist-detail">{item.detail}</div>
            </div>
            <span className="checklist-risk"
              style={{ background: `${riskColor[item.risk]}22`, color: riskColor[item.risk] }}>
              {item.risk.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Performance Challenge ────────────────────────────────────────────────
function ChallengeTab() {
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  function startChallenge(ch) { setSelected(ch); setAnswers({}); setScore(null); }

  function answer(qi, oi) {
    setAnswers(p => ({ ...p, [qi]: oi }));
  }

  function submitQuiz() {
    if (!selected) return;
    const correct = selected.questions.filter((q, i) => answers[i] === q.answer).length;
    setScore({ correct, total: selected.questions.length });
  }

  if (selected) {
    const allAnswered = selected.questions.every((_, i) => answers[i] !== undefined);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setSelected(null)}><ArrowLeft size={16}/> Kembali</button>
          <div>
            <span className={`difficulty-badge difficulty-${selected.difficulty}`}>{selected.difficulty.toUpperCase()}</span>
            <h2 style={{ fontSize: 16, color: 'var(--text-primary)', margin: 0 }}>{selected.title}</h2>
          </div>
        </div>

        <div className="builder-card">
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>{selected.scenario}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>Metrik Hasil Test</div>
          <div className="metrics-panel">
            {Object.entries(selected.metrics).map(([k, v]) => (
              <div key={k} className="metrics-row">
                <span className="metrics-key">{k}</span>
                <span className="metrics-val">{typeof v === 'object' ? JSON.stringify(v) : String(v)}</span>
              </div>
            ))}
          </div>
        </div>

        {selected.questions.map((q, qi) => {
          const answered = answers[qi] !== undefined;
          const isCorrect = answers[qi] === q.answer;
          return (
            <div key={qi} className="quiz-question">
              <div className="quiz-q">Q{qi + 1}. {q.q}</div>
              <div className="quiz-options">
                {q.options.map((opt, oi) => {
                  let cls = '';
                  if (answered) {
                    if (oi === q.answer) cls = 'reveal';
                    if (oi === answers[qi] && isCorrect) cls = 'correct';
                    if (oi === answers[qi] && !isCorrect) cls = 'wrong';
                  }
                  return (
                    <button key={oi} className={`quiz-option ${cls}`}
                      onClick={() => !answered && answer(qi, oi)} disabled={answered}>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {answered && <div className="quiz-explanation">💡 {q.explanation}</div>}
            </div>
          );
        })}

        {allAnswered && !score && (
          <button className="btn btn-primary" onClick={submitQuiz}><BarChart2 size={16}/> Lihat Skor</button>
        )}

        {score && (
          <div className={`verdict-banner ${score.correct === score.total ? 'verdict-excellent' : score.correct >= score.total * 0.7 ? 'verdict-pass' : 'verdict-fail'}`}>
            <span style={{ fontSize: 32 }}>{score.correct === score.total ? <Trophy size={32}/> : score.correct >= score.total * 0.7 ? <CheckCircle2 size={32}/> : <GraduationCap size={32}/>}</span>
            <div>
              <div className="verdict-label">{score.correct}/{score.total} Benar</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {score.correct === score.total ? 'Sempurna!' : score.correct >= score.total * 0.7 ? 'Bagus! Terus berlatih.' : 'Pelajari kembali materinya.'}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        Latihan membaca hasil pengujian performa dan menentukan apakah sistem memenuhi SLA. Pilih skenario di bawah.
      </div>
      <div className="challenge-list">
        {PERFORMANCE_CHALLENGES.map(ch => (
          <div key={ch.id} className="challenge-card" onClick={() => startChallenge(ch)}>
            <span className={`difficulty-badge difficulty-${ch.difficulty}`}>{ch.difficulty.toUpperCase()}</span>
            <h3 style={{ fontSize: 15, color: 'var(--text-primary)', margin: '4px 0 8px' }}>{ch.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>{ch.scenario}</p>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>
              {ch.questions.length} pertanyaan · Klik untuk mulai
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'academy',   label: <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><GraduationCap size={16}/> Academy</span> },
  { id: 'builder',   label: <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Zap size={16}/> Scenario Builder</span> },
  { id: 'analyzer',  label: <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Search size={16}/> Report Analyzer</span> },
  { id: 'trend',     label: <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><TrendingUp size={16}/> Trend Dashboard</span> },
  { id: 'checklist', label: <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><CheckSquare size={16}/> Checklist</span> },
  { id: 'challenge', label: <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Trophy size={16}/> Challenge</span> },
];

export default function PerformanceLabPage() {
  const [tab, setTab] = useState('academy');

  if (isWeb()) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-primary)' }}>
        <Zap size={48} style={{ color: 'var(--text-muted)', marginBottom: 20 }} />
        <h2>Fitur Eksklusif Desktop</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '16px auto', lineHeight: '1.6' }}>
          Performance Lab menjalankan *load testing* menggunakan `k6` CLI dan berinteraksi langsung dengan *command line* di sistem lokal Anda.
          Karena keterbatasan keamanan Web Browser, fitur ini <strong>hanya tersedia di DiyahQA Hub versi Desktop</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="perflab-container">
      <div className="perflab-header">
        <div>
          <h1 className="page-title">Performance Lab</h1>
          <p className="page-subtitle">Belajar, bangun skenario, generate script k6, analisis hasil, dan track tren performa</p>
        </div>
        <TutorialPanel menuKey="performancelab" />
      </div>

      <div className="perflab-tabs">
        {TABS.map(t => (
          <button key={t.id} className={`perflab-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="perflab-content">
        {tab === 'academy'   && <AcademyTab />}
        {tab === 'builder'   && <ScenarioBuilderTab />}
        {tab === 'analyzer'  && <ReportAnalyzerTab />}
        {tab === 'trend'     && <TrendDashboardTab />}
        {tab === 'checklist' && <ChecklistTab />}
        {tab === 'challenge' && <ChallengeTab />}
      </div>
    </div>
  );
}
