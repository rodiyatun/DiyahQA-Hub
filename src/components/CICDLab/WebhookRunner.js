import React, { useState, useRef, useEffect } from 'react';
import { classifyBugsFromTestOutput } from '../BugClassifier';

// ─── Webhook Runner — Trigger CI/CD Pipeline dari dalam aplikasi ──────────────
//
// Mendukung:
// - GitHub Actions (workflow_dispatch via REST API)
// - GitLab CI (pipeline trigger via token)
// - Jenkins (build via webhook / crumb)
// - Generic webhook (custom URL + payload)

const PROVIDER_CONFIG = {
  github: {
    label: 'GitHub Actions',
    icon: '🐙',
    color: '#6366f1',
    fields: [
      { key: 'token',    label: 'Personal Access Token (PAT)', type: 'password', placeholder: 'ghp_xxxx...' },
      { key: 'owner',    label: 'Owner / Org', type: 'text',     placeholder: 'my-org' },
      { key: 'repo',     label: 'Repository',  type: 'text',     placeholder: 'my-repo' },
      { key: 'workflow', label: 'Workflow File',type: 'text',     placeholder: 'playwright.yml' },
      { key: 'ref',      label: 'Branch/Tag',  type: 'text',     placeholder: 'main' },
    ],
    hint: 'Membutuhkan PAT dengan scope: repo + actions. Workflow harus memiliki trigger workflow_dispatch.',
  },
  gitlab: {
    label: 'GitLab CI',
    icon: '🦊',
    color: '#f97316',
    fields: [
      { key: 'token',     label: 'Pipeline Trigger Token', type: 'password', placeholder: 'glptt-xxxx...' },
      { key: 'projectId', label: 'Project ID / Namespace', type: 'text',     placeholder: '12345 atau group/project' },
      { key: 'ref',       label: 'Branch/Tag',             type: 'text',     placeholder: 'main' },
      { key: 'baseUrl',   label: 'GitLab Base URL',        type: 'text',     placeholder: 'https://gitlab.com' },
    ],
    hint: 'Dapatkan trigger token di: Settings → CI/CD → Pipeline triggers.',
  },
  jenkins: {
    label: 'Jenkins',
    icon: '⚙️',
    color: '#22c55e',
    fields: [
      { key: 'url',      label: 'Jenkins Job URL',    type: 'text',     placeholder: 'https://jenkins.company.com/job/my-job' },
      { key: 'token',    label: 'Build Token',        type: 'password', placeholder: 'token from job config' },
      { key: 'user',     label: 'Username (opsional)',type: 'text',     placeholder: 'admin' },
      { key: 'apiToken', label: 'API Token (opsional)',type: 'password', placeholder: 'Jenkins API token' },
    ],
    hint: 'Aktifkan "Trigger builds remotely" di konfigurasi Jenkins job. URL: /buildWithParameters?token=TOKEN',
  },
  generic: {
    label: 'Generic Webhook',
    icon: '🔗',
    color: '#8b5cf6',
    fields: [
      { key: 'url',    label: 'Webhook URL',    type: 'text',     placeholder: 'https://api.example.com/trigger' },
      { key: 'method', label: 'HTTP Method',    type: 'select',   options: ['POST', 'GET', 'PUT'], placeholder: 'POST' },
      { key: 'token',  label: 'Bearer Token / Secret (opsional)', type: 'password', placeholder: 'secret-token' },
      { key: 'body',   label: 'Request Body (JSON, opsional)', type: 'textarea', placeholder: '{"branch":"main","environment":"staging"}' },
    ],
    hint: 'Kirim request HTTP ke URL webhook. Gunakan untuk integrasi custom atau platform lainnya.',
  },
};

// Saved configs key
const STORAGE_KEY = 'cicd_webhook_configs';

function loadSavedConfigs() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch { return {}; }
}

function saveConfigs(configs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
}

// ─── Build trigger request ────────────────────────────────────────────────────

async function triggerGitHub({ token, owner, repo, workflow, ref, inputs }) {
  const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ref: ref || 'main', inputs: inputs || {} }),
  });
  if (resp.status === 204) return { success: true, message: 'Workflow dispatched (HTTP 204)' };
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.message || `HTTP ${resp.status}`);
  return { success: true, message: data.message || 'Triggered' };
}

async function triggerGitLab({ token, projectId, ref, variables, baseUrl }) {
  const base = (baseUrl || 'https://gitlab.com').replace(/\/$/, '');
  const encodedId = encodeURIComponent(projectId);
  const url = `${base}/api/v4/projects/${encodedId}/trigger/pipeline`;
  const body = new URLSearchParams({ token, ref: ref || 'main' });
  if (variables) {
    Object.entries(variables).forEach(([k, v]) => body.append(`variables[${k}]`, v));
  }
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.message || `HTTP ${resp.status}`);
  return { success: true, pipelineId: data.id, webUrl: data.web_url, status: data.status };
}

async function triggerJenkins({ url: jobUrl, token, user, apiToken }) {
  const buildUrl = `${jobUrl.replace(/\/$/, '')}/buildWithParameters?token=${encodeURIComponent(token)}`;
  const headers = {};
  if (user && apiToken) {
    headers.Authorization = 'Basic ' + btoa(`${user}:${apiToken}`);
  }
  const resp = await fetch(buildUrl, { method: 'POST', headers });
  if (resp.status === 201 || resp.status === 200 || resp.status === 302) {
    return { success: true, message: `Jenkins build triggered (HTTP ${resp.status})` };
  }
  throw new Error(`HTTP ${resp.status} — pastikan token dan URL benar`);
}

async function triggerGeneric({ url, method, token, body }) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const resp = await fetch(url, {
    method: method || 'POST',
    headers,
    body: body && (method || 'POST') !== 'GET' ? body : undefined,
  });
  const text = await resp.text();
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${text.slice(0, 200)}`);
  return { success: true, message: `OK (HTTP ${resp.status})`, response: text.slice(0, 500) };
}

// ─── RunHistory component ─────────────────────────────────────────────────────

function RunHistoryItem({ run }) {
  const [expanded, setExpanded] = useState(false);
  const statusColor = run.success ? '#22c55e' : '#ef4444';
  const classifications = run.classified || [];

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', background: 'var(--bg-card)' }}
        onClick={() => setExpanded(p => !p)}
      >
        <span style={{ fontSize: 14, color: statusColor }}>{run.success ? '✅' : '❌'}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
            {run.provider} — {run.label || run.triggeredAt}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            {run.triggeredAt} · {run.success ? run.message : run.error}
          </div>
        </div>
        {classifications.length > 0 && (
          <div style={{ display: 'flex', gap: 4 }}>
            {['Frontend', 'Backend', 'CI-CD'].map(cat => {
              const count = classifications.filter(c => c.category === cat).length;
              if (!count) return null;
              const colors = { Frontend: '#6366f1', Backend: '#22c55e', 'CI-CD': '#f97316' };
              return (
                <span key={cat} style={{ fontSize: 10, padding: '1px 6px', borderRadius: 10, background: `${colors[cat]}20`, color: colors[cat], border: `1px solid ${colors[cat]}40` }}>
                  {cat}: {count}
                </span>
              );
            })}
          </div>
        )}
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div style={{ padding: 14, borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
          {run.details && (
            <pre style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0, marginBottom: classifications.length ? 12 : 0 }}>
              {JSON.stringify(run.details, null, 2)}
            </pre>
          )}
          {classifications.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>
                🔍 Klasifikasi Otomatis dari Output
              </div>
              {classifications.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '4px 0', borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 10, background: c.bg, color: c.color, flexShrink: 0 }}>
                    {c.icon} {c.category}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{c.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WebhookRunner() {
  const [provider, setProvider] = useState('github');
  const [configs, setConfigs] = useState(loadSavedConfigs);
  const [form, setForm] = useState({});
  const [extraVars, setExtraVars] = useState('');
  const [triggering, setTriggering] = useState(false);
  const [runHistory, setRunHistory] = useState([]);
  const [testOutput, setTestOutput] = useState('');
  const [classified, setClassified] = useState([]);
  const [activeTab, setActiveTab] = useState('trigger'); // trigger | classify | history
  const logRef = useRef(null);

  const cfg = PROVIDER_CONFIG[provider];

  // Load saved config for this provider
  useEffect(() => {
    setForm(configs[provider] || {});
  }, [provider]); // eslint-disable-line react-hooks/exhaustive-deps

  function setField(k, v) {
    const updated = { ...form, [k]: v };
    setForm(updated);
    // Auto-save (tanpa field password untuk keamanan dasar)
    const toSave = { ...updated };
    delete toSave.token;
    delete toSave.apiToken;
    const newConfigs = { ...configs, [provider]: toSave };
    setConfigs(newConfigs);
    saveConfigs(newConfigs);
  }

  function addLog(msg, type = 'info') {
    // store in runHistory last run's logs (not used directly here)
    void type;
    if (logRef.current) {
      const line = document.createElement('div');
      line.className = `log-${type}`;
      line.textContent = msg;
      logRef.current.appendChild(line);
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }

  async function handleTrigger() {
    // Clear previous logs
    if (logRef.current) logRef.current.innerHTML = '';
    setTriggering(true);
    const now = new Date().toLocaleString('id-ID');
    addLog(`▶ Memulai trigger [${cfg.label}] — ${now}`, 'info');

    try {
      let result;
      // Parse extra variables
      let extraParsed = {};
      if (extraVars.trim()) {
        try { extraParsed = JSON.parse(extraVars); } catch { addLog('⚠️ Extra variables bukan JSON valid — diabaikan', 'warn'); }
      }

      if (provider === 'github') {
        addLog(`📡 POST https://api.github.com/repos/${form.owner}/${form.repo}/actions/workflows/${form.workflow}/dispatches`, 'info');
        result = await triggerGitHub({ ...form, inputs: extraParsed });
      } else if (provider === 'gitlab') {
        addLog(`📡 POST ${form.baseUrl || 'https://gitlab.com'}/api/v4/projects/...trigger/pipeline`, 'info');
        result = await triggerGitLab({ ...form, variables: extraParsed });
      } else if (provider === 'jenkins') {
        addLog(`📡 POST ${form.url}/buildWithParameters`, 'info');
        result = await triggerJenkins(form);
      } else {
        addLog(`📡 ${form.method || 'POST'} ${form.url}`, 'info');
        result = await triggerGeneric(form);
      }

      addLog(`✅ Berhasil: ${result.message || JSON.stringify(result)}`, 'success');
      if (result.webUrl) addLog(`🔗 Pipeline URL: ${result.webUrl}`, 'info');
      if (result.pipelineId) addLog(`🆔 Pipeline ID: ${result.pipelineId}`, 'info');

      setRunHistory(prev => [{
        provider: cfg.label,
        label: form.workflow || form.projectId || form.url || 'webhook',
        triggeredAt: now,
        success: true,
        message: result.message || 'Triggered',
        details: result,
        classified: [],
      }, ...prev.slice(0, 19)]);
    } catch (e) {
      addLog(`❌ Gagal: ${e.message}`, 'error');
      setRunHistory(prev => [{
        provider: cfg.label,
        label: form.workflow || form.projectId || form.url || 'webhook',
        triggeredAt: now,
        success: false,
        error: e.message,
        classified: [],
      }, ...prev.slice(0, 19)]);
    } finally {
      setTriggering(false);
    }
  }

  function handleClassifyOutput() {
    const results = classifyBugsFromTestOutput(testOutput);
    setClassified(results);
  }

  const TABS = [
    { id: 'trigger',  label: '🚀 Trigger Pipeline' },
    { id: 'classify', label: '🔍 Klasifikasi Output' },
    { id: 'history',  label: `📋 Riwayat${runHistory.length ? ` (${runHistory.length})` : ''}` },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Sub-tabs */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        {TABS.map(t => (
          <button key={t.id}
            style={{
              padding: '6px 14px', background: 'none', border: 'none',
              color: activeTab === t.id ? '#f97316' : 'var(--text-muted)',
              fontSize: 12, cursor: 'pointer',
              borderBottom: activeTab === t.id ? '2px solid #f97316' : '2px solid transparent',
              transition: 'all 0.15s',
            }}
            onClick={() => setActiveTab(t.id)}
          >{t.label}</button>
        ))}
      </div>

      {/* Trigger Tab */}
      {activeTab === 'trigger' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Provider selector */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {Object.entries(PROVIDER_CONFIG).map(([id, pc]) => (
              <button
                key={id}
                className={`platform-btn ${provider === id ? 'active' : ''}`}
                style={provider === id ? { borderColor: pc.color, color: pc.color, background: `${pc.color}10` } : {}}
                onClick={() => setProvider(id)}
              >
                {pc.icon} {pc.label}
              </button>
            ))}
          </div>

          {/* Hint */}
          <div style={{ padding: '8px 12px', background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
            ℹ️ {cfg.hint}
          </div>

          {/* Config fields */}
          <div className="builder-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="form-row" style={{ flexWrap: 'wrap' }}>
              {cfg.fields.map(field => (
                <div className="form-group" key={field.key} style={{ minWidth: 200 }}>
                  <label>{field.label}</label>
                  {field.type === 'select' ? (
                    <select value={form[field.key] || field.options?.[0] || ''} onChange={e => setField(field.key, e.target.value)}>
                      {(field.options || []).map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea rows={3} value={form[field.key] || ''} onChange={e => setField(field.key, e.target.value)} placeholder={field.placeholder} />
                  ) : (
                    <input
                      type={field.type}
                      value={form[field.key] || ''}
                      onChange={e => setField(field.key, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Extra variables */}
            <div className="form-group">
              <label>
                Extra Variables / Inputs
                <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 6 }}>(JSON object, opsional)</span>
              </label>
              <textarea
                rows={2}
                value={extraVars}
                onChange={e => setExtraVars(e.target.value)}
                placeholder='{"ENVIRONMENT":"staging","TEST_SUITE":"smoke"}'
              />
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                className="btn btn-primary"
                onClick={handleTrigger}
                disabled={triggering}
                style={{ background: triggering ? undefined : cfg.color }}
              >
                {triggering
                  ? <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span> Triggering...</>
                  : `🚀 Trigger ${cfg.label}`
                }
              </button>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                Pastikan koneksi internet aktif dan token valid.
              </span>
            </div>
          </div>

          {/* Live log */}
          <div className="builder-card">
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
              Log Output
            </div>
            <div
              ref={logRef}
              className="runner-log"
              style={{ minHeight: 80 }}
            >
              <span style={{ color: '#475569' }}>Output trigger akan tampil di sini...</span>
            </div>
          </div>
        </div>
      )}

      {/* Classify Tab */}
      {activeTab === 'classify' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: '8px 12px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
            🔍 Paste output dari test runner (Playwright, Jest, Pytest, JUnit). Sistem akan otomatis mengklasifikasikan failures ke Frontend / Backend / CI-CD.
          </div>

          <div className="form-group">
            <label>Output Test Runner</label>
            <textarea
              className="yaml-editor"
              style={{ minHeight: 200, fontFamily: 'monospace', fontSize: 11 }}
              value={testOutput}
              onChange={e => setTestOutput(e.target.value)}
              placeholder={`Contoh output Playwright:
  ✗ tests/auth.spec.ts:15:5 › Login › should fail with invalid password
  TimeoutError: locator not found after 30000ms

  ✗ tests/api/users.spec.ts:42:3 › Users API › GET /users returns 401 Unauthorized
  Error: expect(received).toBe(expected) Expected: 200 Received: 401

  ● Auth › register › duplicate email returns 409
    Error: 409 Conflict`}
            />
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" onClick={handleClassifyOutput} disabled={!testOutput.trim()}>
              🔍 Klasifikasi Otomatis
            </button>
            {classified.length > 0 && (
              <button className="btn btn-secondary btn-sm" onClick={() => setClassified([])}>Hapus Hasil</button>
            )}
          </div>

          {classified.length > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 10 }}>
                {classified.length} Failure Terklasifikasi
              </div>

              {/* Summary */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                {['Frontend', 'Backend', 'CI-CD'].map(cat => {
                  const count = classified.filter(c => c.category === cat).length;
                  if (!count) return null;
                  const colors = { Frontend: '#6366f1', Backend: '#22c55e', 'CI-CD': '#f97316' };
                  const icons = { Frontend: '🖥️', Backend: '🔧', 'CI-CD': '⚙️' };
                  return (
                    <div key={cat} style={{ padding: '8px 14px', borderRadius: 8, background: `${colors[cat]}15`, border: `1px solid ${colors[cat]}40`, textAlign: 'center', minWidth: 80 }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: colors[cat] }}>{count}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{icons[cat]} {cat}</div>
                    </div>
                  );
                })}
                <div style={{ padding: '8px 14px', borderRadius: 8, background: 'rgba(100,116,139,0.1)', border: '1px solid rgba(100,116,139,0.2)', textAlign: 'center', minWidth: 80 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#64748b' }}>{classified.filter(c => c.category === 'Unknown').length}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>❓ Unknown</div>
                </div>
              </div>

              {/* Detail list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {classified.map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', borderRadius: 8, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: c.bg, color: c.color, flexShrink: 0, fontWeight: 600 }}>
                      {c.icon} {c.category}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500 }}>{c.title}</div>
                      {c.reasons?.length > 0 && (
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                          Signal: {c.reasons.join(' · ')}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', flexShrink: 0 }}>{c.confidence}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {runHistory.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, border: '1px dashed var(--border)', borderRadius: 10 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📋</div>
              <div>Belum ada riwayat trigger.</div>
              <div style={{ fontSize: 11, marginTop: 4 }}>Trigger pipeline untuk melihat riwayat di sini.</div>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setRunHistory([])}>🗑️ Clear History</button>
              </div>
              {runHistory.map((run, i) => <RunHistoryItem key={i} run={run} />)}
            </>
          )}
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
