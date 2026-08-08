import React, { useState, useRef, useEffect } from 'react';

// ─── Storage helpers ──────────────────────────────────────────────────────────
const GATE_CONFIG_KEY = 'deployment_gate_config';
const GATE_HISTORY_KEY = 'deployment_gate_history';

function loadConfig() {
  try { return JSON.parse(localStorage.getItem(GATE_CONFIG_KEY) || 'null') || { services: [], retryInterval: 30, maxRetries: 5, gchatWebhook: '' }; }
  catch { return { services: [], retryInterval: 30, maxRetries: 5, gchatWebhook: '' }; }
}
function saveConfig(c) { localStorage.setItem(GATE_CONFIG_KEY, JSON.stringify(c)); }
function loadHistory() {
  try { return JSON.parse(localStorage.getItem(GATE_HISTORY_KEY) || '[]'); }
  catch { return []; }
}
function saveHistory(h) { localStorage.setItem(GATE_HISTORY_KEY, JSON.stringify(h.slice(0, 20))); }

// ─── Parse version dari response ─────────────────────────────────────────────
function extractVersion(body) {
  if (!body) return null;
  try {
    const json = JSON.parse(body);
    return json.version || json.commit || json.build?.commit || json.build?.version
      || json.data?.version || json.info?.version || json.sha || json.hash || null;
  } catch {
    // Try regex untuk plain text: "v1.2.3" atau commit hash
    const m = body.match(/\b([a-f0-9]{7,40}|v?\d+\.\d+[\.\d]*)\b/);
    return m ? m[1] : body.slice(0, 20).trim();
  }
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    idle:     { color: '#64748b', bg: 'rgba(100,116,139,0.1)', label: '— Idle' },
    checking: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  label: '⏳ Checking...' },
    synced:   { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',   label: '✅ Sinkron' },
    mismatch: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   label: '❌ Mismatch' },
    error:    { color: '#f97316', bg: 'rgba(249,115,22,0.1)',  label: '⚠️ Error' },
    timeout:  { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)',  label: '⏰ Timeout' },
    retrying: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  label: '🔄 Retrying...' },
  };
  const s = map[status] || map.idle;
  return (
    <span style={{ padding: '2px 10px', borderRadius: 10, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color, border: `1px solid ${s.color}40` }}>
      {s.label}
    </span>
  );
}

// ─── Flow Diagram (visual sesuai gambar) ─────────────────────────────────────
function FlowDiagram({ gateStatus, serviceResults }) {
  const synced   = gateStatus === 'synced';
  const mismatch = gateStatus === 'mismatch' || gateStatus === 'retrying';
  const timeout  = gateStatus === 'timeout';
  const checking = gateStatus === 'checking';

  const nodeStyle = (active, color, bg) => ({
    padding: '12px 20px', borderRadius: 10, textAlign: 'center', fontSize: 12, fontWeight: 600,
    border: `1.5px solid ${active ? color : 'var(--border)'}`,
    background: active ? bg : 'var(--bg-card)',
    color: active ? color : 'var(--text-muted)',
    transition: 'all 0.3s', minWidth: 140,
  });

  const arrow = (active) => (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
      <div style={{ width: 2, height: 28, background: active ? '#6366f1' : 'var(--border)', transition: 'background 0.3s', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 0, left: -4, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `8px solid ${active ? '#6366f1' : 'var(--border)'}` }} />
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', gap: 0, userSelect: 'none' }}>
      {/* Top row: Environments Lab + CI/CD Lab */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 0 }}>
        <div style={nodeStyle(gateStatus !== 'idle', '#6366f1', 'rgba(99,102,241,0.1)')}>
          <div>🌐 Environments Lab</div>
          <div style={{ fontSize: 10, fontWeight: 400, marginTop: 2, opacity: 0.8 }}>Track versi/commit service</div>
        </div>
        <div style={nodeStyle(gateStatus !== 'idle', '#8b5cf6', 'rgba(139,92,246,0.1)')}>
          <div>⚙️ CI/CD Lab</div>
          <div style={{ fontSize: 10, fontWeight: 400, marginTop: 2, opacity: 0.8 }}>Cek status pipeline deploy</div>
        </div>
      </div>

      {/* Arrows converging */}
      <div style={{ display: 'flex', gap: 20, margin: '2px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: 140 }}>
          <div style={{ width: 2, height: 24, background: gateStatus !== 'idle' ? '#6366f1' : 'var(--border)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: 140 }}>
          <div style={{ width: 2, height: 24, background: gateStatus !== 'idle' ? '#8b5cf6' : 'var(--border)' }} />
        </div>
      </div>

      {/* Deployment Readiness Check */}
      <div style={{ ...nodeStyle(gateStatus !== 'idle', '#06b6d4', 'rgba(6,182,212,0.1)'), minWidth: 260, animation: checking ? 'pulse 1s ease-in-out infinite' : 'none' }}>
        <div>🔍 Deployment Readiness Check</div>
        <div style={{ fontSize: 10, fontWeight: 400, marginTop: 2, opacity: 0.8 }}>Bandingkan versi semua service</div>
      </div>

      {arrow(gateStatus !== 'idle')}

      {/* Decision diamond */}
      <div style={{ width: 160, height: 60, background: gateStatus !== 'idle' ? 'rgba(100,116,139,0.2)' : 'var(--bg-secondary)', border: `1.5px solid ${gateStatus !== 'idle' ? '#94a3b8' : 'var(--border)'}`, transform: 'rotate(45deg) scale(0.85)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
        <div style={{ transform: 'rotate(-45deg)', fontSize: 11, fontWeight: 600, color: gateStatus !== 'idle' ? 'var(--text-primary)' : 'var(--text-muted)', textAlign: 'center', lineHeight: 1.3 }}>
          Semua service<br />sinkron?
        </div>
      </div>

      {/* Branch labels */}
      <div style={{ display: 'flex', width: 380, justifyContent: 'space-between', margin: '4px 0', paddingRight: 8 }}>
        <span style={{ fontSize: 10, color: mismatch || timeout ? '#f97316' : 'var(--text-muted)', fontWeight: mismatch ? 700 : 400 }}>Belum sinkron</span>
        <span style={{ fontSize: 10, color: synced ? '#22c55e' : 'var(--text-muted)', fontWeight: synced ? 700 : 400 }}>Sinkron</span>
      </div>

      {/* Bottom branches */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', width: 420 }}>
        {/* Left: retry + notif */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <div style={nodeStyle(mismatch, '#d97706', 'rgba(217,119,6,0.1)')}>
            <div>🔄 Auto retry & tunggu</div>
            <div style={{ fontSize: 10, fontWeight: 400, marginTop: 2, opacity: 0.8 }}>Retry otomatis tiap interval</div>
          </div>
          {arrow(timeout)}
          <div style={nodeStyle(timeout, '#b45309', 'rgba(180,83,9,0.12)')}>
            <div>🔔 Notif ke tim</div>
            <div style={{ fontSize: 10, fontWeight: 400, marginTop: 2, opacity: 0.8 }}>Deployment belum siap, bukan bug</div>
          </div>
        </div>
        {/* Right: proceed */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <div style={nodeStyle(synced, '#16a34a', 'rgba(22,163,74,0.1)')}>
            <div>🚀 Lanjut ke test</div>
            <div style={{ fontSize: 10, fontWeight: 400, marginTop: 2, opacity: 0.8 }}>Versi semua service cocok</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Service Config Row ───────────────────────────────────────────────────────
function ServiceRow({ svc, onChange, onDelete }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
      <select value={svc.type} onChange={e => onChange({ ...svc, type: e.target.value })}
        style={{ width: 80, fontSize: 11 }}>
        <option value="fe">FE</option>
        <option value="be">BE</option>
        <option value="bff">BFF</option>
        <option value="other">Other</option>
      </select>
      <input value={svc.name} onChange={e => onChange({ ...svc, name: e.target.value })}
        placeholder="Nama service" style={{ width: 100, fontSize: 11 }} />
      <input value={svc.url} onChange={e => onChange({ ...svc, url: e.target.value })}
        placeholder="https://app.staging.com/health" style={{ flex: 1, fontSize: 11 }} />
      <input value={svc.expectedVersion || ''} onChange={e => onChange({ ...svc, expectedVersion: e.target.value })}
        placeholder="v1.2.3 atau commit (opsional)" style={{ width: 160, fontSize: 11 }} />
      <button className="btn btn-ghost btn-icon btn-sm" onClick={onDelete}
        style={{ color: 'var(--danger)', flexShrink: 0 }}>✕</button>
    </div>
  );
}

// ─── Single service check ─────────────────────────────────────────────────────
async function checkService(svc) {
  try {
    const res = await window.api.apiRequest({ method: 'GET', url: svc.url, headers: {}, timeout: 8000 });
    const version = extractVersion(res.body);
    const ok = res.ok;
    return { id: svc.id, name: svc.name, type: svc.type, url: svc.url, version, status: ok ? 'ok' : 'error', httpStatus: res.status, duration: res.duration, error: ok ? null : `HTTP ${res.status}` };
  } catch (e) {
    return { id: svc.id, name: svc.name, type: svc.type, url: svc.url, version: null, status: 'error', error: e.message };
  }
}

// ─── Check all services & compare versions ───────────────────────────────────
async function checkAllServices(services) {
  const results = await Promise.all(services.map(checkService));
  const okResults = results.filter(r => r.status === 'ok' && r.version);

  // Check if all versions match (all same value OR all match their expected)
  let synced = false;
  let mismatchDetails = [];

  if (services.some(s => s.expectedVersion)) {
    // Expected version mode
    synced = results.every(r => {
      const svc = services.find(s => s.id === r.id);
      if (!svc.expectedVersion) return r.status === 'ok';
      return r.version && (r.version === svc.expectedVersion || r.version.startsWith(svc.expectedVersion));
    });
    mismatchDetails = results
      .filter(r => { const s = services.find(x => x.id === r.id); return s.expectedVersion && r.version !== s.expectedVersion; })
      .map(r => { const s = services.find(x => x.id === r.id); return `${r.name}: got ${r.version || 'N/A'}, expected ${s.expectedVersion}`; });
  } else if (okResults.length >= 2) {
    // All-same-version mode
    const versions = [...new Set(okResults.map(r => r.version))];
    synced = versions.length === 1 && results.every(r => r.status === 'ok');
    if (versions.length > 1) {
      mismatchDetails = results.map(r => `${r.name}: ${r.version || 'N/A'}`);
    }
  } else {
    synced = results.every(r => r.status === 'ok');
  }

  // Error services
  const errors = results.filter(r => r.status === 'error').map(r => `${r.name}: ${r.error}`);
  if (errors.length) synced = false;

  return { results, synced, mismatchDetails: [...mismatchDetails, ...errors] };
}

// ─── Google Chat notification ─────────────────────────────────────────────────
async function sendGchatNotif(webhookUrl, message) {
  if (!webhookUrl) return;
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message }),
    });
  } catch {}
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DeploymentReadinessGate() {
  const [config, setConfig]           = useState(loadConfig);
  const [gateStatus, setGateStatus]   = useState('idle');
  const [serviceResults, setServiceResults] = useState([]);
  const [retryCount, setRetryCount]   = useState(0);
  const [logs, setLogs]               = useState([]);
  const [history, setHistory]         = useState(loadHistory);
  const [activeTab, setActiveTab]     = useState('monitor');
  const [onSuccessAction, setOnSuccessAction] = useState('none');
  const retryRef   = useRef(null);
  const runningRef = useRef(false);
  const logRef     = useRef(null);

  useEffect(() => { return () => { if (retryRef.current) clearInterval(retryRef.current); }; }, []);

  function addLog(text, type = 'info') {
    setLogs(p => [...p, { text, type, ts: new Date().toLocaleTimeString('id-ID') }]);
    setTimeout(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, 50);
  }

  function saveCurrentConfig(c) { setConfig(c); saveConfig(c); }

  async function runCheck() {
    if (!config.services.length) return alert('Tambahkan minimal satu service dulu.');
    runningRef.current = true;
    setGateStatus('checking');
    setServiceResults([]);
    setRetryCount(0);
    setLogs([]);
    addLog(`▶ Memulai Deployment Readiness Check — ${new Date().toLocaleString('id-ID')}`, 'info');
    addLog(`Checking ${config.services.length} service(s)...`, 'info');
    await performCheck(0);
  }

  async function performCheck(attempt) {
    if (!runningRef.current) return;
    if (attempt > 0) {
      setGateStatus('retrying');
      addLog(`\n🔄 Retry #${attempt} dari ${config.maxRetries}...`, 'warn');
    }
    setRetryCount(attempt);
    const { results, synced, mismatchDetails } = await checkAllServices(config.services);
    setServiceResults(results);

    results.forEach(r => {
      const icon = r.status === 'ok' ? '✅' : '❌';
      addLog(`${icon} ${r.name} (${r.type.toUpperCase()}): ${r.version || 'N/A'} ${r.error ? '— ' + r.error : ''}  [${r.duration || 0}ms]`, r.status === 'ok' ? 'success' : 'error');
    });

    if (synced) {
      setGateStatus('synced');
      const versions = [...new Set(results.map(r => r.version).filter(Boolean))];
      addLog(`\n✅ Semua service SINKRON! Versi: ${versions.join(', ')}`, 'success');
      addLog('🚀 Lanjut ke test suite...', 'success');

      // Save to history
      const entry = { ts: new Date().toISOString(), status: 'synced', results, retries: attempt };
      const h = [entry, ...loadHistory()];
      saveHistory(h); setHistory(h);

      if (onSuccessAction === 'gchat' && config.gchatWebhook) {
        const msg = `✅ *Deployment Readiness: SINKRON*\n${config.services.map(s => `• ${s.type.toUpperCase()} ${s.name}: ${results.find(r => r.id === s.id)?.version || 'N/A'}`).join('\n')}\nTest suite siap dijalankan.`;
        await sendGchatNotif(config.gchatWebhook, msg);
        addLog('📬 Notifikasi Google Chat terkirim (sync)', 'success');
      }
      return;
    }

    addLog(`\n⚠️ Mismatch: ${mismatchDetails.join(' | ')}`, 'error');

    if (attempt >= config.maxRetries) {
      setGateStatus('timeout');
      addLog(`\n⏰ TIMEOUT — sudah ${config.maxRetries}x retry, deployment belum siap.`, 'error');
      addLog('🔔 Ini bukan bug — deployment belum selesai. Notifikasi dikirim ke tim.', 'warn');

      // Save to history
      const entry = { ts: new Date().toISOString(), status: 'timeout', results, retries: attempt, mismatch: mismatchDetails };
      const h = [entry, ...loadHistory()];
      saveHistory(h); setHistory(h);

      // Google Chat notification
      if (config.gchatWebhook) {
        const msg = `⏰ *Deployment Readiness: BELUM SIAP* (timeout setelah ${config.maxRetries}x retry)\n${mismatchDetails.map(d => `• ${d}`).join('\n')}\n⚠️ Ini info deployment, bukan bug. CC @infra-team`;
        await sendGchatNotif(config.gchatWebhook, msg);
        addLog('📬 Notifikasi Google Chat terkirim (timeout)', 'warn');
      }
      runningRef.current = false;
      return;
    }

    setGateStatus('mismatch');
    addLog(`⏳ Tunggu ${config.retryInterval}s lalu retry... (${attempt + 1}/${config.maxRetries})`, 'warn');
    retryRef.current = setTimeout(() => { if (runningRef.current) performCheck(attempt + 1); }, config.retryInterval * 1000);
  }

  function stopCheck() {
    runningRef.current = false;
    if (retryRef.current) clearTimeout(retryRef.current);
    setGateStatus('idle');
    addLog('\n⛔ Check dihentikan manual.', 'warn');
  }

  const isRunning = gateStatus === 'checking' || gateStatus === 'retrying' || gateStatus === 'mismatch';

  const TABS = [
    { id: 'monitor',  label: '🔍 Monitor & Run' },
    { id: 'config',   label: '⚙️ Konfigurasi Service' },
    { id: 'history',  label: `📋 Riwayat${history.length ? ` (${history.length})` : ''}` },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Sub-tabs */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: '6px 14px', background: 'none', border: 'none', fontSize: 12, cursor: 'pointer',
            color: activeTab === t.id ? '#f97316' : 'var(--text-muted)',
            borderBottom: activeTab === t.id ? '2px solid #f97316' : '2px solid transparent',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Monitor Tab */}
      {activeTab === 'monitor' && (
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {/* Left: flow diagram */}
          <div style={{ flex: '0 0 460px', border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: '12px 8px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center', marginBottom: 8 }}>
              Deployment Readiness Flow
            </div>
            <FlowDiagram gateStatus={gateStatus} serviceResults={serviceResults} />

            {/* Status + controls */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12, flexWrap: 'wrap' }}>
              <StatusBadge status={gateStatus} />
              {gateStatus === 'mismatch' || gateStatus === 'retrying' ? (
                <span style={{ fontSize: 11, color: '#f59e0b' }}>Retry {retryCount}/{config.maxRetries}</span>
              ) : null}
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10 }}>
              {!isRunning ? (
                <button className="btn btn-primary" onClick={runCheck}
                  disabled={config.services.length === 0}
                  style={{ fontSize: 12 }}>
                  ▶ Jalankan Check
                </button>
              ) : (
                <button className="btn btn-danger btn-sm" onClick={stopCheck}>⛔ Stop</button>
              )}
              <button className="btn btn-secondary btn-sm" onClick={() => { setGateStatus('idle'); setServiceResults([]); setLogs([]); }}>
                ↺ Reset
              </button>
            </div>

            {/* On success action */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10, fontSize: 11 }}>
              <span style={{ color: 'var(--text-muted)' }}>Jika sinkron:</span>
              <select value={onSuccessAction} onChange={e => setOnSuccessAction(e.target.value)} style={{ fontSize: 11 }}>
                <option value="none">Hanya notifikasi log</option>
                <option value="gchat">Kirim ke Google Chat</option>
              </select>
            </div>
          </div>

          {/* Right: service results + log */}
          <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Service status cards */}
            {config.services.length === 0 && (
              <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 12, border: '1px dashed var(--border)', borderRadius: 10 }}>
                Tambahkan service di tab Konfigurasi dulu.
              </div>
            )}
            {config.services.map(svc => {
              const r = serviceResults.find(x => x.id === svc.id);
              const statusColor = !r ? '#64748b' : r.status === 'ok' ? '#22c55e' : '#ef4444';
              const statusBg    = !r ? 'transparent' : r.status === 'ok' ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)';
              const typeColors  = { fe: '#6366f1', be: '#22c55e', bff: '#f59e0b', other: '#94a3b8' };
              return (
                <div key={svc.id} style={{ border: `1px solid ${r ? statusColor + '40' : 'var(--border)'}`, borderRadius: 10, padding: '12px 14px', background: statusBg, transition: 'all 0.3s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 8, background: `${typeColors[svc.type] || '#94a3b8'}20`, color: typeColors[svc.type] || '#94a3b8', fontWeight: 700 }}>
                      {svc.type.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{svc.name}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 11, fontFamily: 'monospace', color: r ? statusColor : 'var(--text-muted)', fontWeight: 600 }}>
                      {r ? (r.version || 'N/A') : '—'}
                    </span>
                    {r && <span style={{ fontSize: 10, color: statusColor }}>{r.status === 'ok' ? '✅' : '❌'}</span>}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4, fontFamily: 'monospace' }}>
                    {svc.url}
                    {r?.duration ? ` · ${r.duration}ms` : ''}
                    {r?.error ? ` · ⚠️ ${r.error}` : ''}
                    {svc.expectedVersion ? ` · expected: ${svc.expectedVersion}` : ''}
                  </div>
                </div>
              );
            })}

            {/* Log panel */}
            <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ padding: '6px 12px', background: 'var(--bg-secondary)', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Log Output
              </div>
              <div ref={logRef} style={{ background: '#0f172a', padding: 12, fontFamily: 'monospace', fontSize: 11, minHeight: 100, maxHeight: 240, overflowY: 'auto' }}>
                {logs.length === 0 && <span style={{ color: '#475569' }}>Output akan tampil di sini...</span>}
                {logs.map((l, i) => (
                  <div key={i} style={{ color: l.type === 'success' ? '#22c55e' : l.type === 'error' ? '#ef4444' : l.type === 'warn' ? '#f59e0b' : '#94a3b8', lineHeight: 1.6 }}>
                    <span style={{ color: '#475569' }}>[{l.ts}]</span> {l.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Config Tab */}
      {activeTab === 'config' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="builder-card">
            <h3 style={{ fontSize: 14, color: 'var(--text-primary)', marginBottom: 12 }}>🔧 Service Endpoints</h3>
            <div style={{ display: 'flex', gap: 8, fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, paddingBottom: 6, borderBottom: '1px solid var(--border)' }}>
              <span style={{ width: 80 }}>Tipe</span>
              <span style={{ width: 100 }}>Nama</span>
              <span style={{ flex: 1 }}>Version/Health Endpoint URL</span>
              <span style={{ width: 160 }}>Expected Version (opsional)</span>
              <span style={{ width: 28 }}></span>
            </div>
            {config.services.map((svc, i) => (
              <ServiceRow key={svc.id} svc={svc}
                onChange={updated => {
                  const s = config.services.map((x, idx) => idx === i ? updated : x);
                  saveCurrentConfig({ ...config, services: s });
                }}
                onDelete={() => {
                  const s = config.services.filter((_, idx) => idx !== i);
                  saveCurrentConfig({ ...config, services: s });
                }}
              />
            ))}
            <button className="btn btn-secondary btn-sm" style={{ marginTop: 10 }}
              onClick={() => saveCurrentConfig({ ...config, services: [...config.services, { id: Date.now(), type: 'fe', name: '', url: '', expectedVersion: '' }] })}>
              + Tambah Service
            </button>
            <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 8, fontSize: 11, color: 'var(--text-secondary)' }}>
              💡 Endpoint harus return JSON dengan field <code>version</code>, <code>commit</code>, atau <code>build.commit</code>. Contoh: <code>/health</code>, <code>/api/version</code>, <code>/actuator/info</code>
            </div>
          </div>

          <div className="builder-card">
            <h3 style={{ fontSize: 14, color: 'var(--text-primary)', marginBottom: 12 }}>⏱️ Retry Settings</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Interval Retry (detik)</label>
                <input type="number" value={config.retryInterval} min={5} max={300}
                  onChange={e => saveCurrentConfig({ ...config, retryInterval: Number(e.target.value) })} />
                <small style={{ color: 'var(--text-muted)', fontSize: 10 }}>Cek ulang tiap N detik jika belum sinkron</small>
              </div>
              <div className="form-group">
                <label>Maks Retry</label>
                <input type="number" value={config.maxRetries} min={1} max={20}
                  onChange={e => saveCurrentConfig({ ...config, maxRetries: Number(e.target.value) })} />
                <small style={{ color: 'var(--text-muted)', fontSize: 10 }}>Notif dikirim setelah N kali retry</small>
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
              Total waktu tunggu maksimal: <strong style={{ color: 'var(--text-primary)' }}>{config.retryInterval * config.maxRetries} detik ({Math.round(config.retryInterval * config.maxRetries / 60)} menit)</strong>
            </div>
          </div>

          <div className="builder-card">
            <h3 style={{ fontSize: 14, color: 'var(--text-primary)', marginBottom: 12 }}>📬 Google Chat Webhook</h3>
            <div className="form-group">
              <label>Webhook URL <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opsional)</span></label>
              <input type="text" value={config.gchatWebhook}
                onChange={e => saveCurrentConfig({ ...config, gchatWebhook: e.target.value })}
                placeholder="https://chat.googleapis.com/v1/spaces/..." />
              <small style={{ color: 'var(--text-muted)', fontSize: 10 }}>Notifikasi dikirim saat timeout (deployment belum siap, bukan bug)</small>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {history.length === 0 && (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, border: '1px dashed var(--border)', borderRadius: 10 }}>
              Belum ada riwayat check.
            </div>
          )}
          {history.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => { saveHistory([]); setHistory([]); }}>🗑️ Clear</button>
            </div>
          )}
          {history.map((h, i) => (
            <div key={i} style={{ border: `1px solid ${h.status === 'synced' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: 10, padding: '12px 14px', background: h.status === 'synced' ? 'rgba(34,197,94,0.04)' : 'rgba(239,68,68,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 14 }}>{h.status === 'synced' ? '✅' : '⏰'}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{h.status === 'synced' ? 'SINKRON' : 'TIMEOUT'}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>
                  {new Date(h.ts).toLocaleString('id-ID')} · {h.retries} retries
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(h.results || []).map((r, j) => (
                  <span key={j} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 8, background: r.status === 'ok' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: r.status === 'ok' ? '#22c55e' : '#ef4444' }}>
                    {r.name}: {r.version || 'N/A'}
                  </span>
                ))}
              </div>
              {h.mismatch?.length > 0 && (
                <div style={{ fontSize: 10, color: '#f59e0b', marginTop: 6 }}>⚠️ {h.mismatch.join(' | ')}</div>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }`}</style>
    </div>
  );
}
