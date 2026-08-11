import React, { useState, useEffect, useRef } from 'react';
import { CICD_ROADMAP, FAILURE_SCENARIOS } from './cicdData';
import { generatePipeline, validateGithubActionsYAML, buildPipelineSteps } from './cicdUtils';
import WebhookRunner from './WebhookRunner';
import DeploymentReadinessGate from './DeploymentReadinessGate';
import TutorialPanel from '../TutorialPanel';
import './CICDLab.css';

// ── Tab: Academy ──────────────────────────────────────────────────────────────
function AcademyTab() {
  const allLessons = CICD_ROADMAP.flatMap(m => m.lessons.map(l => ({ ...l, moduleIcon: m.icon, moduleTitle: m.title })));
  const [activeId, setActiveId] = useState(allLessons[0].id);
  const lesson = allLessons.find(l => l.id === activeId);

  return (
    <div className="cicd-academy-layout">
      <div className="cicd-sidebar">
        {CICD_ROADMAP.map(mod => (
          <div key={mod.id}>
            <div className="cicd-module-title">{mod.icon} {mod.title}</div>
            {mod.lessons.map(l => (
              <button key={l.id} className={`cicd-lesson-btn ${activeId === l.id ? 'active' : ''}`}
                onClick={() => setActiveId(l.id)}>{l.title}</button>
            ))}
          </div>
        ))}
      </div>
      <div className="cicd-lesson-content">
        {lesson && (
          <div className="cicd-lesson-card">
            <h2 style={{ fontSize: 18, color: 'var(--text-primary)', marginBottom: 16 }}>{lesson.title}</h2>
            {lesson.content && <div className="lesson-body">{lesson.content}</div>}
            {lesson.keyPoints && (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Key Points</div>
                <div className="lesson-kp">
                  {lesson.keyPoints.map((p, i) => <div key={i} className="lesson-kp-item">→ {p}</div>)}
                </div>
              </>
            )}
            {lesson.table && (
              <table className="lesson-table">
                <thead><tr>{Object.keys(lesson.table[0]).map(k => <th key={k}>{k.charAt(0).toUpperCase() + k.slice(1)}</th>)}</tr></thead>
                <tbody>{lesson.table.map((row, i) => <tr key={i}>{Object.values(row).map((v, j) => <td key={j}>{v}</td>)}</tr>)}</tbody>
              </table>
            )}
            {lesson.example && (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '16px 0 8px' }}>Contoh</div>
                <div className="code-block">{lesson.example}</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Tab: Pipeline Visualizer ──────────────────────────────────────────────────
const VIZ_NODES = [
  { id: 'commit', icon: '💻', label: 'Commit' },
  { id: 'trigger', icon: '⚡', label: 'Trigger' },
  { id: 'checkout', icon: '📥', label: 'Checkout' },
  { id: 'install', icon: '📦', label: 'Install' },
  { id: 'test', icon: '🧪', label: 'E2E Test' },
  { id: 'report', icon: '📊', label: 'Report' },
  { id: 'deploy', icon: '🚀', label: 'Deploy' },
];

function PipelineVisualizerTab() {
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [statuses, setStatuses] = useState({});
  const [failAt, setFailAt] = useState(null);

  function reset() { setRunning(false); setCurrentStep(-1); setStatuses({}); }

  async function runViz() {
    reset();
    setRunning(true);
    for (let i = 0; i < VIZ_NODES.length; i++) {
      const nodeId = VIZ_NODES[i].id;
      setCurrentStep(i);
      setStatuses(p => ({ ...p, [nodeId]: 'running' }));
      await new Promise(r => setTimeout(r, 800));
      if (failAt === nodeId) {
        setStatuses(p => ({ ...p, [nodeId]: 'failed' }));
        setRunning(false);
        return;
      }
      setStatuses(p => ({ ...p, [nodeId]: 'success' }));
    }
    setRunning(false);
    setCurrentStep(-1);
  }

  function nodeClass(id) {
    const s = statuses[id];
    if (s === 'running') return 'node-running';
    if (s === 'success') return 'node-success';
    if (s === 'failed')  return 'node-failed';
    return 'node-pending';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="builder-card">
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={runViz} disabled={running}>▶ Jalankan Simulasi</button>
          <button className="btn btn-secondary btn-sm" onClick={reset}>↺ Reset</button>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 12, color: 'var(--text-muted)' }}>Simulasikan gagal di:</label>
            <select value={failAt || ''} onChange={e => setFailAt(e.target.value || null)} style={{ fontSize: 12 }}>
              <option value="">— Tidak ada (semua pass) —</option>
              {VIZ_NODES.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
            </select>
          </div>
        </div>

        <div className="pipeline-viz">
          {VIZ_NODES.map((node, i) => (
            <React.Fragment key={node.id}>
              <div className="pipeline-node">
                <div className={`node-circle ${nodeClass(node.id)}`}>{node.icon}</div>
                <div className="node-label">{node.label}</div>
                {statuses[node.id] === 'success' && <div style={{ fontSize: 10, color: '#22c55e' }}>✓ done</div>}
                {statuses[node.id] === 'failed'  && <div style={{ fontSize: 10, color: '#ef4444' }}>✗ failed</div>}
                {statuses[node.id] === 'running' && <div style={{ fontSize: 10, color: '#f97316' }}>⟳ running</div>}
              </div>
              {i < VIZ_NODES.length - 1 && (
                <div className={`pipeline-arrow ${statuses[node.id] === 'success' ? 'active' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>
          Pipeline ini menggambarkan alur dari commit developer hingga deploy ke staging. Klik "Jalankan Simulasi" untuk melihat animasi step-by-step.
        </div>
      </div>

      <div className="builder-card">
        <h3 style={{ fontSize: 14, color: 'var(--text-primary)', marginBottom: 12 }}>📘 Deployment Flow: Dev → Staging → Production</h3>
        <DeploymentFlowMini />
      </div>
    </div>
  );
}

function DeploymentFlowMini() {
  const envs = [
    { id: 'dev', icon: '💻', name: 'Development', desc: 'Auto-deploy setiap push' },
    { id: 'staging', icon: '🧪', name: 'Staging', desc: 'Auto-deploy dari main' },
    { id: 'prod', icon: '🏭', name: 'Production', desc: 'Manual approval' },
  ];
  const [deployed, setDeployed] = useState({});
  const [approvals, setApprovals] = useState({});
  const [current, setCurrent] = useState(null);

  async function runDeploy() {
    setDeployed({}); setApprovals({}); setCurrent(null);
    for (const env of envs) {
      setCurrent(env.id);
      await new Promise(r => setTimeout(r, 1000));
      if (env.id === 'prod' && !approvals['prod-gate']) {
        // Wait for approval — shown as waiting state
        break;
      }
      setDeployed(p => ({ ...p, [env.id]: true }));
    }
    setCurrent(null);
  }

  function approve() {
    setApprovals(p => ({ ...p, 'prod-gate': true }));
    setDeployed(p => ({ ...p, prod: true }));
  }

  return (
    <div>
      <div className="deploy-flow">
        {envs.map((env, i) => (
          <React.Fragment key={env.id}>
            <div className={`env-box ${current === env.id ? 'active' : ''} ${deployed[env.id] ? 'deployed' : ''}`}>
              <div className="env-icon">{env.icon}</div>
              <div className="env-name">{env.name}</div>
              <div className="env-status">{deployed[env.id] ? '✅ Deployed' : current === env.id ? '⟳ Deploying...' : env.desc}</div>
            </div>
            {i < envs.length - 1 && (
              <>
                <div className={`deploy-arrow ${deployed[envs[i].id] ? 'active' : ''}`}>→</div>
                {i === 1 && (
                  <div
                    className={`approval-gate ${approvals['prod-gate'] ? 'approved' : ''}`}
                    onClick={approve}
                    title="Klik untuk approve"
                  >
                    🔐<br />Approval<br />{approvals['prod-gate'] ? '✓ Approved' : 'Pending'}
                  </div>
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button className="btn btn-primary btn-sm" onClick={runDeploy}>▶ Simulasikan Deploy</button>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', alignSelf: 'center' }}>
          Klik 🔐 Approval untuk approve deploy ke Production
        </span>
      </div>
    </div>
  );
}

// ── Tab: Pipeline Builder ─────────────────────────────────────────────────────
const PLATFORMS = [
  { id: 'github-actions', label: 'GitHub Actions', icon: '🐙' },
  { id: 'gitlab-ci',      label: 'GitLab CI',      icon: '🦊' },
  { id: 'jenkins',        label: 'Jenkins',         icon: '⚙️' },
];
const BROWSER_OPTIONS = ['chromium', 'firefox', 'webkit'];

function PipelineBuilderTab() {
  const [config, setConfig] = useState({
    platform: 'github-actions', name: 'Playwright E2E Tests',
    branch: 'main', nodeVersion: '20', browsers: ['chromium'],
    retries: 2, uploadArtifact: true, notifySlack: false, timeout: 30,
  });
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  function set(field, val) { setConfig(p => ({ ...p, [field]: val })); }

  function toggleBrowser(b) {
    setConfig(p => {
      const bs = p.browsers.includes(b) ? p.browsers.filter(x => x !== b) : [...p.browsers, b];
      return { ...p, browsers: bs.length ? bs : ['chromium'] };
    });
  }

  function handleGenerate() { setOutput(generatePipeline(config)); }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="builder-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="builder-card">
            <h3>🎯 Platform</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PLATFORMS.map(p => (
                <button key={p.id} className={`platform-btn ${config.platform === p.id ? 'active' : ''}`}
                  onClick={() => set('platform', p.id)}>
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="builder-card">
            <h3>⚙️ Konfigurasi</h3>
            <div className="form-group"><label>Nama Workflow</label>
              <input value={config.name} onChange={e => set('name', e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group"><label>Branch</label>
                <input value={config.branch} onChange={e => set('branch', e.target.value)} />
              </div>
              <div className="form-group"><label>Node.js Version</label>
                <select value={config.nodeVersion} onChange={e => set('nodeVersion', e.target.value)}>
                  {['18','20','22'].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Retries (pada failure)</label>
                <input type="number" value={config.retries} onChange={e => set('retries', Number(e.target.value))} min={0} max={3} />
              </div>
              <div className="form-group"><label>Timeout (menit)</label>
                <input type="number" value={config.timeout} onChange={e => set('timeout', Number(e.target.value))} min={5} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="builder-card">
            <h3>🌐 Browser</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {BROWSER_OPTIONS.map(b => (
                <label key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)' }}>
                  <input type="checkbox" checked={config.browsers.includes(b)} onChange={() => toggleBrowser(b)} style={{ width: 'auto' }} />
                  {b.charAt(0).toUpperCase() + b.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="builder-card">
            <h3>🔧 Opsi Tambahan</h3>
            {[
              { field: 'uploadArtifact', label: '📤 Upload Playwright Report sebagai Artifact' },
              { field: 'notifySlack', label: '🔔 Notifikasi Slack jika pipeline gagal' },
            ].map(opt => (
              <label key={opt.field} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>
                <input type="checkbox" checked={config[opt.field]} onChange={e => set(opt.field, e.target.checked)} style={{ width: 'auto' }} />
                {opt.label}
              </label>
            ))}
            <button className="btn btn-primary" style={{ marginTop: 8, width: '100%' }} onClick={handleGenerate}>
              ⚡ Generate Pipeline YAML
            </button>
          </div>
        </div>
      </div>

      {output && (
        <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '10px 16px', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
              Generated {PLATFORMS.find(p => p.id === config.platform)?.label} YAML
            </span>
            <button className="btn btn-secondary btn-sm" onClick={handleCopy}>{copied ? '✅ Copied!' : '📋 Copy'}</button>
          </div>
          <div className="code-block" style={{ margin: 0, borderRadius: 0, maxHeight: 400, overflowY: 'auto' }}>{output}</div>
        </div>
      )}
    </div>
  );
}

// ── Tab: Pipeline Runner (Simulator) ─────────────────────────────────────────
function PipelineRunnerTab() {
  const [steps, setSteps]     = useState([]);
  const [running, setRunning] = useState(false);
  const [logs, setLogs]       = useState([]);
  const [forceFailure, setForceFailure] = useState(false);
  const [config] = useState({ nodeVersion: '20', browsers: ['chromium'], uploadArtifact: true });
  const logRef = useRef(null);

  function addLog(text, type = '') {
    setLogs(p => [...p, { text, type, id: Date.now() + Math.random() }]);
    setTimeout(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, 50);
  }

  async function runPipeline() {
    const pSteps = buildPipelineSteps({ ...config, forceFailure });
    setSteps(pSteps.map(s => ({ ...s, status: 'pending' })));
    setLogs([]);
    setRunning(true);

    addLog('🚀 Pipeline started', 'info');
    addLog(`Triggered by: push to main`, 'info');

    for (let i = 0; i < pSteps.length; i++) {
      const step = pSteps[i];
      setSteps(p => p.map((s, idx) => idx === i ? { ...s, status: 'running' } : s));
      addLog(`\n▶ ${step.name}`, 'info');
      await new Promise(r => setTimeout(r, step.duration));

      step.log.split('\n').forEach(line => {
        addLog(line, line.includes('✗') || line.includes('failed') ? 'error' : line.includes('✓') ? 'success' : '');
      });

      if (step.shouldFail) {
        setSteps(p => p.map((s, idx) => idx === i ? { ...s, status: 'failed' } : s));
        addLog('\n❌ Pipeline FAILED', 'error');
        setRunning(false);
        return;
      }
      setSteps(p => p.map((s, idx) => idx === i ? { ...s, status: 'success' } : s));
    }

    addLog('\n✅ Pipeline completed successfully', 'success');
    setRunning(false);
  }

  function reset() { setSteps([]); setLogs([]); }

  const statusIcon = { pending: '⬜', running: '⟳', success: '✅', failed: '❌' };
  const stepCls    = { pending: '', running: 'active', success: 'done', failed: 'failed' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="builder-card">
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={runPipeline} disabled={running}>▶ Jalankan Pipeline</button>
          <button className="btn btn-secondary btn-sm" onClick={reset} disabled={running}>↺ Reset</button>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer', marginLeft: 'auto' }}>
            <input type="checkbox" checked={forceFailure} onChange={e => setForceFailure(e.target.checked)} style={{ width: 'auto' }} />
            💥 Simulasikan test gagal
          </label>
        </div>

        {steps.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            {steps.map((s) => (
              <div key={s.id} className={`step-row ${stepCls[s.status]}`}>
                <span>{statusIcon[s.status]}</span>
                <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{s.name}</span>
              </div>
            ))}
          </div>
        )}

        <div className="runner-log" ref={logRef}>
          {logs.length === 0 && <div style={{ color: '#475569' }}>Klik "Jalankan Pipeline" untuk memulai simulasi...</div>}
          {logs.map(l => <div key={l.id} className={`log-line ${l.type}`}>{l.text}</div>)}
        </div>
      </div>
    </div>
  );
}

// ── Tab: Failure Analyzer ─────────────────────────────────────────────────────
function FailureAnalyzerTab() {
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers]   = useState({});
  const [showFix, setShowFix]   = useState(false);

  if (!selected) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Latihan mendiagnosis kegagalan pipeline dari log. Identifikasi penyebab kegagalan dan lihat cara memperbaikinya.
        </div>
        {FAILURE_SCENARIOS.map(s => (
          <div key={s.id} className="failure-scenario" onClick={() => { setSelected(s); setAnswers({}); setShowFix(false); }}>
            <span className={`diff-${s.difficulty}`}>{s.difficulty.toUpperCase()}</span>
            <h3 style={{ fontSize: 14, color: 'var(--text-primary)', margin: '4px 0 6px' }}>{s.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>Klik untuk mulai analisis</p>
          </div>
        ))}
      </div>
    );
  }

  const answered = answers[selected.id] !== undefined;
  const correct  = answers[selected.id] === selected.answer;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setSelected(null)}>← Kembali</button>
        <span className={`diff-${selected.difficulty}`}>{selected.difficulty.toUpperCase()}</span>
        <h2 style={{ fontSize: 16, color: 'var(--text-primary)', margin: 0 }}>{selected.title}</h2>
      </div>

      <div className="builder-card">
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Error Log</div>
        <div className="runner-log" style={{ minHeight: 'auto' }}>
          {selected.log.split('\n').map((line, i) => (
            <div key={i} className={`log-line ${line.includes('Error') || line.includes('failed') || line.includes('FAIL') ? 'error' : line.includes('passed') ? 'success' : ''}`}>{line}</div>
          ))}
        </div>
      </div>

      <div className="builder-card">
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
          🔍 Apa penyebab kegagalan ini?
        </div>
        {selected.options.map((opt, i) => {
          let cls = '';
          if (answered) {
            if (i === selected.answer) cls = 'correct';
            else if (i === answers[selected.id] && !correct) cls = 'wrong';
          }
          return (
            <button key={i} className={`fail-quiz-option ${cls}`}
              onClick={() => !answered && setAnswers(p => ({ ...p, [selected.id]: i }))}
              disabled={answered}>
              {opt}
            </button>
          );
        })}

        {answered && (
          <div className="fail-explanation">
            {correct ? '✅ Benar! ' : '❌ Kurang tepat. '}{selected.explanation}
          </div>
        )}

        {answered && (
          <button className="btn btn-secondary btn-sm" style={{ marginTop: 12 }} onClick={() => setShowFix(p => !p)}>
            {showFix ? '▲ Sembunyikan' : '🔧 Lihat cara fix'}
          </button>
        )}

        {showFix && selected.fix && (
          <div className="code-block" style={{ marginTop: 8 }}>{selected.fix}</div>
        )}
      </div>
    </div>
  );
}

// ── Tab: YAML Validator ───────────────────────────────────────────────────────
const SAMPLE_YAML = `name: Playwright Tests

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx playwright install chromium
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: report
          path: playwright-report/`;

function YAMLValidatorTab() {
  const [yaml, setYaml]     = useState('');
  const [issues, setIssues] = useState(null);

  function validate() { setIssues(validateGithubActionsYAML(yaml)); }
  function loadSample() { setYaml(SAMPLE_YAML); setIssues(null); }

  const iconMap = { error: '❌', warn: '⚠️', pass: '✅' };
  const clsMap  = { error: 'validation-error', warn: 'validation-warn', pass: 'validation-pass' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="builder-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h3 style={{ margin: 0, fontSize: 14, color: 'var(--text-primary)' }}>📝 Paste YAML Pipeline (GitHub Actions)</h3>
          <button className="btn btn-secondary btn-sm" onClick={loadSample}>Muat Contoh</button>
        </div>
        <textarea
          className="yaml-editor"
          value={yaml}
          onChange={e => { setYaml(e.target.value); setIssues(null); }}
          placeholder={`name: My Pipeline\n\non:\n  push:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci`}
          spellCheck={false}
        />
        <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }} onClick={validate} disabled={!yaml.trim()}>
          🔍 Validasi YAML
        </button>
      </div>

      {issues && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
            Hasil Validasi — {issues.filter(i => i.level === 'error').length} error, {issues.filter(i => i.level === 'warn').length} warning
          </div>
          {issues.map((issue, i) => (
            <div key={i} className={`validation-item ${clsMap[issue.level]}`}>
              <span>{iconMap[issue.level]}</span>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {issue.line && <strong>[Baris {issue.line}]</strong>} {issue.message}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Tab: Artifact Explorer ────────────────────────────────────────────────────
function ArtifactExplorerTab() {
  const [artifacts, setArtifacts] = useState([]);
  const [selected, setSelected]   = useState(null);
  const [dragOver, setDragOver]   = useState(false);

  function processFiles(files) {
    const newArtifacts = [];
    Array.from(files).forEach(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      let type = 'unknown';
      if (['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext)) type = 'screenshot';
      else if (ext === 'mp4' || ext === 'webm') type = 'video';
      else if (ext === 'json') type = 'json';
      else if (ext === 'html') type = 'html';
      else if (ext === 'zip') type = 'trace';
      else if (ext === 'xml') type = 'xml';

      const reader = new FileReader();
      reader.onload = (e) => {
        newArtifacts.push({
          id: Date.now() + Math.random(),
          name: file.name,
          type,
          size: file.size,
          content: e.target.result,
          file,
        });
        if (newArtifacts.length === files.length) {
          setArtifacts(p => [...p, ...newArtifacts]);
        }
      };
      if (type === 'screenshot') reader.readAsDataURL(file);
      else reader.readAsText(file);
    });
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    processFiles(e.dataTransfer.files);
  }

  function handleFileInput(e) { processFiles(e.target.files); }

  function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  const typeIcon = { screenshot: '🖼️', video: '🎬', json: '📋', html: '🌐', trace: '🔍', xml: '📄', unknown: '📎' };

  function renderPreview(artifact) {
    if (artifact.type === 'screenshot') {
      return <img src={artifact.content} alt={artifact.name} style={{ maxWidth: '100%', borderRadius: 8, border: '1px solid var(--border)' }} />;
    }
    if (artifact.type === 'json') {
      let parsed;
      try { parsed = JSON.parse(artifact.content); } catch { parsed = null; }
      if (parsed) {
        // Detect Allure summary
        if (parsed.statistic) {
          const s = parsed.statistic;
          return (
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>📊 Allure Summary Report</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
                {[
                  { label: 'Total', val: s.total || 0, color: '#6366f1' },
                  { label: 'Passed',  val: s.passed  || 0, color: '#22c55e' },
                  { label: 'Failed',  val: s.failed  || 0, color: '#ef4444' },
                  { label: 'Broken',  val: s.broken  || 0, color: '#f97316' },
                  { label: 'Skipped', val: s.skipped || 0, color: '#64748b' },
                ].map(item => (
                  <div key={item.label} style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary)', border: `1px solid ${item.color}33`, textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: item.color }}>{item.val}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.label}</div>
                  </div>
                ))}
              </div>
              {s.total > 0 && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Pass Rate: {Math.round(((s.passed || 0) / s.total) * 100)}%</div>
                  <div style={{ height: 8, borderRadius: 4, background: 'var(--border)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: '#22c55e', borderRadius: 4, width: `${Math.round(((s.passed || 0) / s.total) * 100)}%`, transition: 'width 0.5s' }} />
                  </div>
                </div>
              )}
            </div>
          );
        }
        // Generic JSON
        return <div className="code-block" style={{ maxHeight: 400, overflowY: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(parsed, null, 2)}</div>;
      }
    }
    if (artifact.type === 'xml') {
      // Try parse JUnit XML
      const passMatch  = artifact.content.match(/tests="(\d+)"/);
      const failMatch  = artifact.content.match(/failures="(\d+)"/);
      const errorMatch = artifact.content.match(/errors="(\d+)"/);
      const timeMatch  = artifact.content.match(/time="([\d.]+)"/);
      if (passMatch) {
        const total   = parseInt(passMatch[1]);
        const failed  = parseInt(failMatch?.[1] || '0');
        const errors  = parseInt(errorMatch?.[1] || '0');
        const passed  = total - failed - errors;
        return (
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>📄 JUnit XML Report</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {[{ l:'Total', v:total, c:'#6366f1' }, { l:'Passed', v:passed, c:'#22c55e' }, { l:'Failed', v:failed, c:'#ef4444' }, { l:'Time', v:`${timeMatch?.[1] || '?'}s`, c:'#f59e0b' }].map(i => (
                <div key={i.l} style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary)', textAlign: 'center', border: `1px solid ${i.c}33` }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: i.c }}>{i.v}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{i.l}</div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
    if (artifact.type === 'html') {
      return (
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Preview HTML tidak ditampilkan langsung karena alasan keamanan.</div>
          <div className="code-block" style={{ maxHeight: 300, overflowY: 'auto', whiteSpace: 'pre-wrap', fontSize: 11 }}>
            {artifact.content.slice(0, 2000)}{artifact.content.length > 2000 ? '\n... (truncated)' : ''}
          </div>
        </div>
      );
    }
    if (artifact.type === 'trace') {
      return <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>🔍 Playwright trace file terdeteksi.<br />Gunakan <code>npx playwright show-trace {artifact.name}</code> untuk membukanya.</div>;
    }
    return <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Preview tidak tersedia untuk tipe file ini.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Drop zone */}
      <div
        className={`artifact-drop ${dragOver ? 'drag-over' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('artifact-input').click()}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>📦</div>
        <div style={{ fontSize: 14, color: 'var(--text-primary)', marginBottom: 4 }}>Drag & drop artifact ke sini</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Screenshot (.png), Video (.mp4), Allure JSON, JUnit XML, Playwright Trace (.zip)</div>
        <input id="artifact-input" type="file" multiple style={{ display: 'none' }} onChange={handleFileInput}
          accept=".png,.jpg,.jpeg,.webp,.mp4,.webm,.json,.html,.zip,.xml" />
      </div>

      {artifacts.length > 0 && (
        <div style={{ display: 'flex', gap: 16, minHeight: 0 }}>
          {/* List */}
          <div style={{ width: 220, flexShrink: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
              {artifacts.length} Artifact
            </div>
            <div className="artifact-grid" style={{ gridTemplateColumns: '1fr' }}>
              {artifacts.map(a => (
                <div key={a.id} className="artifact-card" style={{ border: selected?.id === a.id ? '1px solid #f97316' : undefined }}
                  onClick={() => setSelected(a)}>
                  <div className="artifact-icon">{typeIcon[a.type]}</div>
                  <div className="artifact-name">{a.name}</div>
                  <div className="artifact-size">{formatSize(a.size)}</div>
                </div>
              ))}
            </div>
            <button className="btn btn-secondary btn-sm" style={{ marginTop: 10, width: '100%' }}
              onClick={() => { setArtifacts([]); setSelected(null); }}>🗑️ Clear All</button>
          </div>

          {/* Preview */}
          <div className="builder-card" style={{ flex: 1, minWidth: 0, overflow: 'auto' }}>
            {selected ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{selected.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{typeIcon[selected.type]} {selected.type} · {formatSize(selected.size)}</div>
                  </div>
                </div>
                {renderPreview(selected)}
              </>
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                Pilih artifact di sebelah kiri untuk preview
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Tab: AI Pipeline Assistant (rule-based) ───────────────────────────────────
const ASSISTANT_RULES = [
  {
    keywords: ['github actions', 'github action', 'gha'],
    answer: `GitHub Actions menggunakan file YAML di .github/workflows/. Struktur dasarnya:\n\n• name: Nama workflow\n• on: Event trigger (push, pull_request, schedule)\n• jobs: Kumpulan job yang dijalankan\n• steps: Langkah-langkah di dalam job\n\nContoh trigger untuk QA: on: pull_request akan menjalankan pipeline setiap ada PR baru.`,
  },
  {
    keywords: ['playwright', 'e2e', 'end-to-end'],
    answer: `Pipeline Playwright yang baik harus:\n\n1. npm ci (bukan npm install) untuk reproducible build\n2. npx playwright install --with-deps untuk install browser + dependencies\n3. npx playwright test untuk jalankan tests\n4. Upload artifact dengan if: always() agar report tersimpan meski tests gagal\n5. Aktifkan retries: 2 di playwright.config.ts untuk handle flaky tests di CI`,
  },
  {
    keywords: ['allure', 'report', 'laporan'],
    answer: `Untuk generate Allure report di pipeline:\n\n1. Install allure-playwright: npm install allure-playwright\n2. Tambahkan reporter di playwright.config.ts:\n   reporter: [['allure-playwright']]\n3. Di pipeline, generate report:\n   allure generate allure-results -o allure-report\n4. Upload sebagai artifact:\n   path: allure-report/\n   retention-days: 30`,
  },
  {
    keywords: ['secret', 'secrets', 'environment variable', 'env', 'token'],
    answer: `Cara aman menyimpan credentials di pipeline:\n\n• GitHub Actions: Settings → Secrets → New repository secret\n• Akses di YAML: \${{ secrets.NAMA_SECRET }}\n• Jangan pernah hardcode credentials di YAML\n• Gunakan environment variable: env: API_KEY: \${{ secrets.API_KEY }}\n• Secret otomatis ter-mask di logs sehingga tidak terlihat`,
  },
  {
    keywords: ['flaky', 'intermittent', 'gagal kadang', 'random fail', 'tidak stabil'],
    answer: `Strategi menangani flaky tests di CI:\n\n1. Tambahkan retries di playwright.config.ts:\n   retries: process.env.CI ? 2 : 0\n\n2. Aktifkan screenshot & video on failure:\n   screenshot: 'only-on-failure'\n   video: 'retain-on-failure'\n\n3. Gunakan waitForSelector/waitForLoadState daripada sleep\n\n4. Jalankan ulang hanya tests gagal:\n   npx playwright test --last-failed\n\n5. Gunakan trace viewer untuk debug:\n   npx playwright show-trace trace.zip`,
  },
  {
    keywords: ['timeout', 'waktu habis', 'timed out'],
    answer: `Timeout di CI lebih sering terjadi karena:\n\n• Environment CI lebih lambat dari local\n• Sumber daya (CPU/RAM) lebih terbatas\n• Network latency ke server target lebih tinggi\n\nSolusi:\n1. Tingkatkan timeout di playwright.config.ts: timeout: 60000\n2. Tambahkan timeout-minutes di workflow: timeout-minutes: 30\n3. Pastikan BASE_URL di environment CI sudah benar\n4. Mock external services yang lambat`,
  },
  {
    keywords: ['cache', 'caching', 'lambat', 'slow', 'lama'],
    answer: `Mempercepat pipeline dengan caching:\n\n• Cache node_modules:\n  - uses: actions/cache@v4\n    with:\n      path: ~/.npm\n      key: npm-\${{ hashFiles('package-lock.json') }}\n\n• Atau gunakan cache bawaan setup-node:\n  - uses: actions/setup-node@v4\n    with:\n      cache: 'npm'\n\n• Cache Playwright browsers:\n  path: ~/.cache/ms-playwright\n  key: playwright-\${{ hashFiles('package-lock.json') }}`,
  },
  {
    keywords: ['gitlab', 'gitlab ci'],
    answer: `GitLab CI menggunakan file .gitlab-ci.yml di root project.\nPerbedaan dengan GitHub Actions:\n\n• image: menentukan Docker image (bukan runs-on)\n• stages: urutan stage yang dijalankan\n• script: perintah yang dijalankan\n• artifacts: hasil yang disimpan (mirip upload-artifact)\n• only/rules: kondisi kapan job dijalankan\n\nContoh minimal:\nimage: node:20\ntest:\n  script:\n    - npm ci\n    - npx playwright test`,
  },
  {
    keywords: ['jenkins'],
    answer: `Jenkins menggunakan Jenkinsfile (Declarative Pipeline).\nStruktur utama:\n\npipeline {\n  agent any\n  stages {\n    stage('Test') {\n      steps { sh 'npx playwright test' }\n      post { always { publishHTML [...] } }\n    }\n  }\n}\n\nKelebihan Jenkins: sangat fleksibel, bisa on-premise\nKekurangan: butuh maintenance server sendiri`,
  },
  {
    keywords: ['parallel', 'paralel', 'sharding', 'shard'],
    answer: `Menjalankan tests secara paralel di CI:\n\n1. Matrix strategy (GitHub Actions):\n   strategy:\n     matrix:\n       shardIndex: [1, 2, 3, 4]\n   run: npx playwright test --shard=\${{ matrix.shardIndex }}/4\n\n2. Konfigurasi workers di playwright.config.ts:\n   workers: process.env.CI ? 2 : undefined\n\nCatatan: terlalu banyak workers di CI bisa menyebabkan resource exhaustion dan flaky tests.`,
  },
];

function getAssistantAnswer(question) {
  const q = question.toLowerCase();
  const match = ASSISTANT_RULES.find(rule => rule.keywords.some(kw => q.includes(kw)));
  if (match) return match.answer;
  return `Maaf, saya belum punya informasi spesifik tentang "${question}".\n\nTopik yang bisa saya bantu:\n• GitHub Actions, GitLab CI, Jenkins\n• Pipeline untuk Playwright / E2E tests\n• Allure report di CI\n• Secrets dan environment variables\n• Flaky tests dan cara mengatasinya\n• Timeout dan optimasi pipeline\n• Caching node_modules\n• Parallel testing / sharding\n\nCoba tanyakan salah satu topik di atas!`;
}

const SUGGESTED_QUESTIONS = [
  'Bagaimana cara setup GitHub Actions untuk Playwright?',
  'Cara mengatasi flaky test di CI?',
  'Bagaimana menyimpan credentials sebagai secret?',
  'Cara generate Allure report di pipeline?',
  'Bagaimana mempercepat pipeline dengan caching?',
  'Perbedaan GitHub Actions dan GitLab CI?',
];

function AIAssistantTab() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Halo! Saya AI Pipeline Assistant untuk CI/CD. Tanya apa saja tentang pipeline, GitHub Actions, GitLab CI, Jenkins, atau cara menjalankan Playwright di CI. Saya siap membantu! 🚀' },
  ]);
  const [input, setInput]   = useState('');
  const bottomRef           = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  function send(question) {
    const q = question || input.trim();
    if (!q) return;
    const answer = getAssistantAnswer(q);
    setMessages(p => [...p, { role: 'user', text: q }, { role: 'assistant', text: answer }]);
    setInput('');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      {/* Chat area */}
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 380px)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%',
              padding: '10px 14px',
              borderRadius: m.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
              background: m.role === 'user' ? 'rgba(249,115,22,0.15)' : 'var(--bg-card)',
              border: m.role === 'user' ? '1px solid rgba(249,115,22,0.3)' : '1px solid var(--border)',
              fontSize: 13,
              color: 'var(--text-secondary)',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.6,
            }}>
              {m.role === 'assistant' && <span style={{ fontSize: 11, color: '#f97316', fontWeight: 700, display: 'block', marginBottom: 4 }}>🤖 Pipeline Assistant</span>}
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 2 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button key={i} className="btn btn-secondary btn-sm" style={{ fontSize: 11 }} onClick={() => send(q)}>{q}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
          placeholder="Tanya tentang CI/CD, GitHub Actions, Playwright pipeline..."
          style={{ flex: 1 }}
        />
        <button className="btn btn-primary" onClick={() => send()} disabled={!input.trim()}>Kirim</button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'academy',    label: '📚 Academy' },
  { id: 'visualizer', label: '🗺️ Visualizer' },
  { id: 'builder',    label: '⚙️ Pipeline Builder' },
  { id: 'runner',     label: '▶️ Runner' },
  { id: 'failure',    label: '🔥 Failure Analyzer' },
  { id: 'validator',  label: '✅ YAML Validator' },
  { id: 'artifacts',  label: '📦 Artifacts' },
  { id: 'readiness',  label: '🛡️ Readiness Gate' },
  { id: 'webhook',    label: '🚀 Trigger & Classify' },
  { id: 'assistant',  label: '🤖 AI Assistant' },
];

export default function CICDLabPage() {
  const [tab, setTab] = useState('academy');
  return (
    <div className="cicd-container">
      <div className="cicd-header">
        <div>
          <h1 className="page-title">CI/CD Lab</h1>
          <p className="page-subtitle">Pipeline visualizer, builder, simulator, failure analyzer, dan AI assistant</p>
        </div>
        <TutorialPanel menuKey="cicdlab" />
      </div>
      <div className="cicd-tabs">
        {TABS.map(t => (
          <button key={t.id} className={`cicd-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="cicd-content">
        {tab === 'academy'    && <AcademyTab />}
        {tab === 'visualizer' && <PipelineVisualizerTab />}
        {tab === 'builder'    && <PipelineBuilderTab />}
        {tab === 'runner'     && <PipelineRunnerTab />}
        {tab === 'failure'    && <FailureAnalyzerTab />}
        {tab === 'validator'  && <YAMLValidatorTab />}
        {tab === 'artifacts'  && <ArtifactExplorerTab />}
        {tab === 'readiness'  && <DeploymentReadinessGate />}
        {tab === 'webhook'    && <WebhookRunner />}
        {tab === 'assistant'  && <AIAssistantTab />}
      </div>
    </div>
  );
}
