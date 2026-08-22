import React, { useState, useEffect, useRef } from 'react';
import BugReportModal from './BugReportModal';
import BugReportDetailModal from './BugReportDetailModal';
import { BugCategoryBadge } from './BugClassifier';
import TutorialPanel from './TutorialPanel';
import Papa from 'papaparse';
import { useAuth } from '../contexts/AuthContext';
import { useWorkspace } from '../contexts/WorkspaceContext';
import { supabase } from '../lib/supabaseClient';
import { exportToPDF } from '../utils/pdfExport';
import { isDesktop, requireDesktop } from '../utils/platform';
import './BugReportList.css';

const DEFAULT_PROJECT_ID = '65975ef6-fe92-43b0-bc11-293d6fe5c666';

// ── Plane helpers (duplicated here; planeHelpers.js is Node-only) ──
function getPlaneStatusClass(status) {
  const map = {
    'Todo': 'grey',
    'Backlog': 'grey',
    'In Progress': 'blue',
    'On Progress': 'blue',
    'Done': 'green',
    'Cancelled': 'red',
    'Rejected': 'red',
  };
  return map[status] || 'light-grey';
}

function shouldAutoSync(lastSyncAt) {
  if (lastSyncAt == null) return true;
  return Date.now() - lastSyncAt >= 60000;
}

// ── PlaneStatusBadge ──────────────────────────────────────────────
function PlaneStatusBadge({ bug }) {
  if (!bug.plane_issue_id) return <span style={{ color: 'var(--text-muted)' }}>—</span>;

  function handleClick(e) {
    e.stopPropagation();
    if (bug.plane_issue_url) {
      window.open(bug.plane_issue_url, '_blank');
    } else {
      alert('URL issue Plane tidak tersedia');
    }
  }

  return (
    <span
      className={`plane-badge-${getPlaneStatusClass(bug.plane_status)}`}
      onClick={handleClick}
      title={`Plane: ${bug.plane_status || '—'} — klik untuk membuka di Plane`}
      style={{ cursor: 'pointer' }}
    >
      {bug.plane_status || '—'}
    </span>
  );
}

// ── PlaneTransferModal ────────────────────────────────────────────
function PlaneTransferModal({ onConfirm, onCancel }) {
  const [email, setEmail] = useState('');
  const [labels, setLabels] = useState([]);
  const [modules, setModules] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedCycle, setSelectedCycle] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [lbls, mods, cycs] = await Promise.all([
          window.api.getPlaneLabels(),
          window.api.getPlaneModules(),
          window.api.getPlaneCycles()
        ]);
        setLabels(lbls || []);
        setModules(mods || []);
        setCycles(cycs || []);
      } catch (err) {
        console.error('Failed to load Plane data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function handleLabelChange(e) {
    const options = Array.from(e.target.options);
    const selected = options.filter(o => o.selected).map(o => o.value);
    setSelectedLabels(selected);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm({
      email,
      labelIds: selectedLabels,
      moduleIds: selectedModule ? [selectedModule] : [],
      cycleId: selectedCycle || null
    });
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="modal" style={{ maxWidth: 500, width: '100%' }}>
        <div className="modal-header">
          <h2 className="modal-title">✈️ Transfer ke Plane</h2>
          <button className="btn btn-ghost btn-icon" onClick={onCancel}>✕</button>
        </div>
        {loading ? (
          <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>Memuat data dari Plane...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ padding: '12px 0 8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label>Assignee Email <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opsional)</span></label>
                <input
                  type="email"
                  maxLength={255}
                  placeholder="contoh: diyahdo123@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Tags / Labels</label>
                <select multiple style={{ height: 100 }} value={selectedLabels} onChange={handleLabelChange}>
                  {labels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
                <small style={{ color: 'var(--text-muted)', fontSize: 11 }}>Tahan Ctrl/Cmd untuk memilih lebih dari satu</small>
              </div>
              <div className="form-group">
                <label>Module Workspace</label>
                <select value={selectedModule} onChange={e => setSelectedModule(e.target.value)}>
                  <option value="">-- Pilih Module (opsional) --</option>
                  {modules.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Cycle / Sprint</label>
                <select value={selectedCycle} onChange={e => setSelectedCycle(e.target.value)}>
                  <option value="">-- Pilih Cycle (opsional) --</option>
                  {cycles.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCancel}>Batal</button>
              <button type="submit" className="btn btn-primary">Transfer</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ── PlaneSettingsModal ────────────────────────────────────────────
function PlaneSettingsModal({ onClose, onSaved }) {
  const [apiKey, setApiKey] = useState('');
  const [workspaceSlug, setWorkspaceSlug] = useState('');
  const [projectId, setProjectId] = useState(DEFAULT_PROJECT_ID);
  const [baseUrl, setBaseUrl] = useState('https://api.plane.so');
  const [assigneeEmail, setAssigneeEmail] = useState('');
  const [gchatWebhookUrl, setGchatWebhookUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // { ok: bool, message: string }
  const [validationError, setValidationError] = useState('');

  // Load existing config on mount
  useEffect(() => {
    window.api.getPlaneConfig().then(config => {
      if (config) {
        if (config.apiKey) setApiKey(config.apiKey);
        if (config.workspaceSlug) setWorkspaceSlug(config.workspaceSlug);
        if (config.projectId) setProjectId(config.projectId);
        if (config.baseUrl) setBaseUrl(config.baseUrl);
        if (config.assigneeEmail !== undefined) setAssigneeEmail(config.assigneeEmail);
        if (config.gchatWebhookUrl !== undefined) setGchatWebhookUrl(config.gchatWebhookUrl);
      }
    }).catch(() => {
      // Ignore errors on load
    });
  }, []);

  function validate() {
    if (!apiKey.trim() || !workspaceSlug.trim()) {
      setValidationError('API Key dan Workspace Slug wajib diisi');
      return false;
    }
    setValidationError('');
    return true;
  }

  async function handleSave() {
    if (!validate()) return;
    setSaving(true);
    setTestResult(null);
    try {
      const result = await window.api.savePlaneConfig({ apiKey, workspaceSlug, projectId, baseUrl, assigneeEmail, gchatWebhookUrl });
      if (result && result.error) {
        setValidationError(result.error);
      } else {
        onSaved();
      }
    } catch (err) {
      setValidationError('Gagal menyimpan konfigurasi: ' + (err.message || err));
    } finally {
      setSaving(false);
    }
  }

  async function handleTestConnection() {
    if (!validate()) return;
    setTesting(true);
    setTestResult(null);
    try {
      const result = await window.api.syncPlaneStatus({});
      if (result && typeof result.updated === 'number' && typeof result.failed === 'number') {
        setTestResult({ ok: true, message: 'Koneksi berhasil' });
      } else if (result && result.error) {
        const errMsg = String(result.error);
        if (errMsg.toLowerCase().includes('timeout') || errMsg.toLowerCase().includes('timedout')) {
          setTestResult({ ok: false, message: 'Koneksi timeout' });
        } else {
          const statusMatch = errMsg.match(/\b([4-5]\d{2})\b/);
          if (statusMatch) {
            setTestResult({ ok: false, message: `Koneksi gagal (HTTP ${statusMatch[1]}): ${errMsg}` });
          } else {
            setTestResult({ ok: false, message: 'Koneksi gagal: ' + errMsg });
          }
        }
      } else {
        setTestResult({ ok: true, message: 'Koneksi berhasil' });
      }
    } catch (err) {
      const errMsg = String(err.message || err);
      if (errMsg.toLowerCase().includes('timeout') || errMsg.toLowerCase().includes('timedout')) {
        setTestResult({ ok: false, message: 'Koneksi timeout' });
      } else {
        const statusMatch = errMsg.match(/\b([4-5]\d{2})\b/);
        if (statusMatch) {
          setTestResult({ ok: false, message: `Koneksi gagal (HTTP ${statusMatch[1]}): ${errMsg}` });
        } else {
          setTestResult({ ok: false, message: 'Koneksi gagal: ' + errMsg });
        }
      }
    } finally {
      setTesting(false);
    }
  }

  return (
    <div
      className="modal-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="modal" style={{ maxWidth: 480, width: '100%' }}>
        <div className="modal-header">
          <h2 className="modal-title">⚙️ Konfigurasi Plane API</h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>

        <div style={{ padding: '0 0 8px' }}>
          <div className="form-group">
            <label>API Key *</label>
            <input
              type="password"
              maxLength={512}
              placeholder="Masukkan Plane API Key"
              value={apiKey}
              onChange={e => { setApiKey(e.target.value); setValidationError(''); setTestResult(null); }}
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label>Workspace Slug *</label>
            <input
              type="text"
              maxLength={255}
              placeholder="contoh: my-workspace"
              value={workspaceSlug}
              onChange={e => { setWorkspaceSlug(e.target.value); setValidationError(''); setTestResult(null); }}
            />
          </div>
          <div className="form-group">
            <label>Project ID</label>
            <input
              type="text"
              maxLength={255}
              placeholder={DEFAULT_PROJECT_ID}
              value={projectId}
              onChange={e => { setProjectId(e.target.value); setTestResult(null); }}
            />
            <small style={{ color: 'var(--text-muted)', fontSize: 11 }}>
              Default: {DEFAULT_PROJECT_ID}
            </small>
          </div>
          <div className="form-group">
            <label>Base URL</label>
            <input
              type="text"
              maxLength={512}
              placeholder="https://api.plane.so"
              value={baseUrl}
              onChange={e => { setBaseUrl(e.target.value); setValidationError(''); setTestResult(null); }}
            />
            <small style={{ color: 'var(--text-muted)', fontSize: 11 }}>
              Default: https://api.plane.so — ubah jika menggunakan self-hosted Plane (contoh: https://workspace.jobseeker.company/jsc)
            </small>
          </div>
          <div className="form-group">
            <label>Assignee Email (opsional)</label>
            <input
              type="email"
              maxLength={255}
              placeholder="contoh: diyahdo123@gmail.com"
              value={assigneeEmail}
              onChange={e => { setAssigneeEmail(e.target.value); setTestResult(null); }}
            />
            <small style={{ color: 'var(--text-muted)', fontSize: 11 }}>
              Jika diisi, semua issue yang dibuat akan di-assign ke email ini secara otomatis
            </small>
          </div>
          <div className="form-group">
            <label>Google Chat Webhook URL (opsional)</label>
            <input
              type="text"
              maxLength={1024}
              placeholder="https://chat.googleapis.com/v1/spaces/..."
              value={gchatWebhookUrl}
              onChange={e => { setGchatWebhookUrl(e.target.value); setTestResult(null); }}
            />
            <small style={{ color: 'var(--text-muted)', fontSize: 11 }}>
              Notifikasi otomatis ke Google Chat saat bug ditransfer ke Plane
            </small>
          </div>
          {validationError && (
            <div style={{
              color: '#ef4444', fontSize: 13, marginBottom: 8,
              padding: '6px 10px', background: 'rgba(239,68,68,0.08)', borderRadius: 6,
            }}>
              {validationError}
            </div>
          )}
          {testResult && (
            <div style={{
              fontSize: 13, marginBottom: 8, padding: '6px 10px', borderRadius: 6,
              color: testResult.ok ? '#22c55e' : '#ef4444',
              background: testResult.ok ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
            }}>
              {testResult.ok ? '✅' : '❌'} {testResult.message}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
          <button type="button" className="btn btn-secondary" onClick={handleTestConnection} disabled={testing || saving}>
            {testing ? '🔄 Testing...' : '🔌 Test Koneksi'}
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave} disabled={saving || testing}>
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── BugReportList ─────────────────────────────────────────────────
export default function BugReportList({ projects, selectedProject, prefillData, transferLabel, onClearPrefill }) {
  const [bugs, setBugs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterModule, setFilterModule] = useState('');
  const [filterPlaneStatus, setFilterPlaneStatus] = useState('');
  const [sortField, setSortField] = useState('created_at');
  const [sortDir, setSortDir] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBug, setEditingBug] = useState(null);
  const [detailBug, setDetailBug] = useState(null);

  // --- Plane Integration State ---
  const [planeConfig, setPlaneConfig] = useState(null);
  const [transferringIds, setTransferringIds] = useState([]);
  const [bulkTransferring, setBulkTransferring] = useState(false);
  const [showPlaneSettings, setShowPlaneSettings] = useState(false);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle' | 'syncing' | 'error'
  const lastSyncRef = useRef(null);
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastResult, setBroadcastResult] = useState(null); // { ok, message }
  const [collapsedReady, setCollapsedReady] = useState(false);
  // Assignee email modal state
  const [planeTransferModalState, setPlaneTransferModalState] = useState(null); // { resolve }
  
  const { role, user } = useAuth();
  const { activeWorkspaceId } = useWorkspace();

  // ── Column visibility (sama seperti TestCaseList) ─────────────
  const [showColMenu, setShowColMenu] = useState(false);
  const [visibleCols, setVisibleCols] = useState({
    bugNo: true, title: true, severity: true, priority: false,
    status: true, planeStatus: true, tipe: true, reporter: true,
    assignee: false, module: true, environment: false, created: true, actions: true
  });
  function toggleCol(col) { setVisibleCols(p => ({ ...p, [col]: !p[col] })); }
  const COL_LABELS = {
    bugNo: 'Bug No', title: 'Title', severity: 'Severity', priority: 'Priority',
    status: 'Status', planeStatus: 'Plane Status', tipe: 'Tipe', reporter: 'Reporter',
    assignee: 'Assignee', module: 'Module', environment: 'Environment',
    created: 'Created', actions: 'Actions'
  };

  // Load on mount and when selectedProject changes
  useEffect(() => {
    loadBugReports();
    if (selectedProject?.id) setFilterProject(String(selectedProject.id));
  }, [selectedProject]); // eslint-disable-line react-hooks/exhaustive-deps

  // Open modal when prefillData arrives
  useEffect(() => {
    if (prefillData) {
      setEditingBug(null);
      setShowModal(true);
    }
  }, [prefillData]);

  // Apply filters/sort whenever deps change
  useEffect(() => {
    let result = [...bugs];
    if (filterProject) result = result.filter(b => String(b.project_id) === String(filterProject));
    if (filterStatus) result = result.filter(b => b.status === filterStatus);
    if (filterSeverity) result = result.filter(b => b.severity === filterSeverity);
    if (filterPriority) result = result.filter(b => b.priority === filterPriority);
    if (filterModule) result = result.filter(b => b.module === filterModule);
    if (filterPlaneStatus) result = result.filter(b => b.plane_status === filterPlaneStatus);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.title?.toLowerCase().includes(q) ||
        b.bug_number?.toLowerCase().includes(q) ||
        b.reporter?.toLowerCase().includes(q) ||
        b.assignee?.toLowerCase().includes(q) ||
        b.module?.toLowerCase().includes(q)
      );
    }
    result.sort((a, bItem) => {
      const av = a[sortField] || '';
      const bv = bItem[sortField] || '';
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    setFiltered(result);
  }, [bugs, search, filterStatus, filterSeverity, filterPriority, filterProject, filterModule, filterPlaneStatus, sortField, sortDir]);

  // ── Plane config helpers ──────────────────────────────────────
  async function loadPlaneConfig() {
    try {
      const config = await window.api.getPlaneConfig();
      setPlaneConfig(config || null);
      return config || null;
    } catch {
      setPlaneConfig(null);
      return null;
    }
  }

  async function triggerAutoSync(config) {
    const cfg = config || planeConfig;
    if (!cfg || !cfg.apiKey || cfg.apiKey.trim() === '') return;
    if (!shouldAutoSync(lastSyncRef.current)) return;

    setSyncStatus('syncing');
    try {
      if (isDesktop()) {
        await window.api.syncPlaneStatus({});
      }
      lastSyncRef.current = Date.now();
      await loadBugReports();
      setSyncStatus('idle');
    } catch {
      setSyncStatus('error');
      // Preserve existing bug data — do not clear
    }
  }

  async function loadBugReports() {
    try {
      let query = supabase
        .from('bug_reports')
        .select('*')
        .order('created_at', { ascending: false });

      // Filter by workspace if available
      if (activeWorkspaceId) {
        query = query.eq('workspace_id', activeWorkspaceId);
      }

      const { data, error } = await query;
      if (error) throw error;
      setBugs(data || []);
      setSelected([]);
    } catch (err) {
      console.error(err);
      setBugs([]);
    }
    const config = await loadPlaneConfig();
    if (config && config.apiKey) {
      triggerAutoSync(config);
    }
  }

  function handleOpenPlaneSettings() {
    setShowPlaneSettings(true);
  }

  async function handlePlaneSettingsSaved() {
    setShowPlaneSettings(false);
    await loadPlaneConfig();
  }

  async function handleManualSync() {
    if (syncStatus === 'syncing') return;
    setSyncStatus('syncing');
    try {
      const result = await window.api.syncPlaneStatus({ bugs });
      if (result && result.success && result.updates) {
        for (const u of result.updates) {
          await supabase.from('bug_reports').update({ plane_status: u.plane_status }).eq('id', u.id);
        }
      }
      lastSyncRef.current = Date.now();
      await loadBugReports();
      setSyncStatus('idle');
    } catch {
      setSyncStatus('error');
    }
  }

  // ── Single transfer ───────────────────────────────────────────
  async function handleTransferSingle(bugId) {
    const bug = bugs.find(b => b.id === bugId);
    if (!bug) return;

    if (!planeConfig || !planeConfig.apiKey || !planeConfig.workspaceSlug) {
      alert('Plane API belum dikonfigurasi. Silakan buka ⚙️ Plane untuk mengatur API Key dan Workspace Slug.');
      return;
    }

    if (bug.plane_issue_id) {
      const ok = window.confirm('Bug ini sudah pernah ditransfer ke Plane. Issue duplikat akan dibuat. Lanjutkan?');
      if (!ok) return;
    }

    const transferData = await new Promise((resolve) => {
      setPlaneTransferModalState({ resolve });
    });

    // null means user cancelled
    if (transferData === null) return;

    setTransferringIds(prev => [...prev, bugId]);
    try {
      const result = await window.api.transferBugToPlane({ 
        bug, 
        assigneeEmail: transferData.email?.trim(),
        labelIds: transferData.labelIds,
        moduleIds: transferData.moduleIds,
        cycleId: transferData.cycleId
      });
      if (result && result.success) {
        await supabase.from('bug_reports').update({
          plane_issue_id: result.planeIssueId,
          plane_issue_url: result.planeIssueUrl,
          plane_status: result.planeStatus || 'Backlog'
        }).eq('id', bugId);

        setBugs(prev => prev.map(b =>
          b.id === bugId
            ? { ...b, plane_issue_id: result.planeIssueId, plane_issue_url: result.planeIssueUrl, plane_status: result.planeStatus || 'Backlog' }
            : b
        ));
      } else {
        const errMsg = result?.error || 'Transfer gagal';
        alert(`❌ Transfer gagal: ${errMsg}`);
      }
    } catch (err) {
      alert(`❌ Transfer error: ${err.message || err}`);
    } finally {
      setTransferringIds(prev => prev.filter(id => id !== bugId));
    }
  }

  // ── Bulk transfer ─────────────────────────────────────────────
  async function handleBulkTransfer() {
    if (!planeConfig || !planeConfig.apiKey || !planeConfig.workspaceSlug) {
      alert('Plane API belum dikonfigurasi. Silakan buka ⚙️ Plane untuk mengatur API Key dan Workspace Slug.');
      return;
    }

    const bugsToTransfer = bugs.filter(b => selected.includes(b.id));
    const notSkipped = bugsToTransfer.filter(b => !b.plane_issue_id);

    const ok = window.confirm(
      `Anda akan mentransfer ${selected.length} bug ke Plane. Lanjutkan?\n` +
      (notSkipped.length < selected.length
        ? `(${selected.length - notSkipped.length} bug sudah ditransfer sebelumnya akan dilewati)`
        : '')
    );
    if (!ok) return;

    const transferData = await new Promise((resolve) => {
      setPlaneTransferModalState({ resolve });
    });

    if (transferData === null) return;

    setBulkTransferring(true);
    try {
      const result = await window.api.transferBugsBulkToPlane({ 
        bugs: bugsToTransfer,
        assigneeEmail: transferData.email?.trim(),
        labelIds: transferData.labelIds,
        moduleIds: transferData.moduleIds,
        cycleId: transferData.cycleId
      });

      if (result && result.results) {
        for (const res of result.results) {
          if (res.status === 'success') {
            await supabase.from('bug_reports').update({
              plane_issue_id: res.planeIssueId,
              plane_issue_url: res.planeIssueUrl,
              plane_status: res.planeStatus || 'Backlog'
            }).eq('id', res.bugId);
          }
        }
      }

      await loadBugReports();

      if (result && result.results) {
        const succeeded = result.results.filter(r => r.status === 'success');
        const failed = result.results.filter(r => r.status === 'failed');
        const skipped = result.results.filter(r => r.status === 'skipped');

        let summary = `✅ Berhasil: ${succeeded.length}\n❌ Gagal: ${failed.length}\n⏭️ Dilewati: ${skipped.length}`;

        if (failed.length > 0) {
          summary += '\n\nDetail gagal:\n' + failed.map(f =>
            `• ${f.title}: ${f.error || ''}${f.httpStatus ? ` (HTTP ${f.httpStatus})` : ''}`
          ).join('\n');
        }
        if (skipped.length > 0) {
          summary += '\n\nDilewati (sudah ada di Plane):\n' + skipped.map(s => `• ${s.title}`).join('\n');
        }

        alert(summary);
      }
    } catch (err) {
      alert(`❌ Bulk transfer error: ${err.message || err}`);
      await loadBugReports();
    } finally {
      setBulkTransferring(false);
    }
  }

  // ── Existing handlers ─────────────────────────────────────────
  async function handleSaveBug(formData) {
    try {
      // Sanitize: convert empty strings to null to prevent "invalid input syntax for type bigint: ''"
      const sanitizedForm = {};
      for (const key in formData) {
        sanitizedForm[key] = formData[key] === '' ? null : formData[key];
      }

      if (editingBug) {
        const { error } = await supabase.from('bug_reports').update(sanitizedForm).eq('id', editingBug.id);
        if (error) throw error;
      } else {
        const insertData = {
          ...sanitizedForm,
          workspace_id: activeWorkspaceId || null,
          created_by: user?.id || null,
        };
        
        // Auto-generate bug_number if not provided
        if (!insertData.bug_number && insertData.project_id) {
          const { count } = await supabase.from('bug_reports').select('*', { count: 'exact', head: true }).eq('project_id', insertData.project_id);
          insertData.bug_number = `BUG-${String((count || 0) + 1).padStart(3, '0')}`;
        }
        
        const { error } = await supabase.from('bug_reports').insert([insertData]);
        if (error) throw error;
      }
      await loadBugReports();
      setShowModal(false);
      setEditingBug(null);
    } catch (err) {
      alert("Error saving bug report: " + err.message);
    }
    if (onClearPrefill) {
      onClearPrefill();
      if (transferLabel) {
        alert('✅ Bug report berhasil dibuat dari test case: ' + transferLabel);
      }
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this bug report?')) return;
    try {
      const { error } = await supabase.from('bug_reports').delete().eq('id', id);
      if (error) throw error;
      await loadBugReports();
    } catch (err) {
      alert("Error deleting bug report: " + err.message);
    }
  }

  async function handleBulkDelete() {
    if (!window.confirm(`Delete ${selected.length} bug reports?`)) return;
    try {
      for (const id of selected) {
        await supabase.from('bug_reports').delete().eq('id', id);
      }
      await loadBugReports();
    } catch (err) {
      alert("Error deleting bug reports: " + err.message);
    }
  }

  async function handleImportCSV() {
    const targetProjectId = filterProject || (projects.length === 1 ? String(projects[0].id) : null);
    if (!targetProjectId) {
      alert('Pilih project terlebih dahulu sebelum import (gunakan filter Project di atas).');
      return;
    }
    const csvText = await window.api.openFileDialog();
    if (!csvText) return;
    const result = await window.api.importBugCSV({ projectId: Number(targetProjectId), csvText });
    await loadBugReports();
    const msg = `✅ Import selesai: ${result.imported} bug berhasil, ${result.skipped} dilewati.` +
      (result.errors?.length ? `\n\nError:\n${result.errors.slice(0, 5).join('\n')}` : '');
    alert(msg);
  }


  async function handleImportPlane() {
    const targetProjectId = filterProject || (projects.length === 1 ? String(projects[0].id) : null);
    if (!targetProjectId) {
      alert('Pilih project terlebih dahulu sebelum import dari Plane (gunakan filter Project di atas).');
      return;
    }
    const csvText = await window.api.openFileDialog();
    if (!csvText) return;
    const result = await window.api.importBugPlane({ projectId: Number(targetProjectId), csvText });
    await loadBugReports();
    const msg = `✅ Import dari Plane selesai: ${result.imported} bug berhasil, ${result.skipped} dilewati.` +
      (result.errors?.length ? `\n\nError:\n${result.errors.slice(0, 5).join('\n')}` : '');
    alert(msg);
  }

  async function handleExportCSV() {
    const data = filtered.map(b => ({
      'Bug Number': b.bug_number,
      'Title': b.title,
      'Description': b.description,
      'Steps to Reproduce': b.steps_to_reproduce,
      'Severity': b.severity,
      'Priority': b.priority,
      'Status': b.status,
      'Environment': b.environment,
      'Expected Behavior': b.expected_behavior,
      'Actual Behavior': b.actual_behavior,
      'Evidence URL': b.evidence_url,
      'Reporter': b.reporter,
      'Assignee': b.assignee,
      'Module': b.module,
      'Linked TC': b.linked_testcase_id || '',
      'Created At': b.created_at,
      'Updated At': b.updated_at,
    }));
    const csv = Papa.unparse(data);
    await window.api.saveFileDialog({ defaultName: `bug-reports-${Date.now()}.csv`, content: csv });
  }

  async function handleExportPDF() {
    const headers = ['Bug No', 'Title', 'Severity', 'Status', 'Assignee'];
    const body = filtered.map(b => [
      b.bug_number || '-',
      b.title || '-',
      b.severity || '-',
      b.status || '-',
      b.assignee || '-'
    ]);
    exportToPDF(`Bug Reports`, headers, body, `bug-reports-${Date.now()}.pdf`);
  }

  function toggleSelect(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }

  function toggleSelectAll() {
    setSelected(prev => prev.length === filtered.length ? [] : filtered.map(b => b.id));
  }

  // ── Ready to Release helpers ──────────────────────────────────────
  function isReadyToRelease(bug) {
    const s = (bug.plane_status || '').toLowerCase();
    return s.includes('ready') || s.includes('release') || s.includes('ready to release')
      || s.includes('ready up') || s.includes('ready for release') || s.includes('prod');
  }

  const readyBugs = bugs.filter(isReadyToRelease);

  async function handleBroadcastRelease() {
    if (!readyBugs.length) return;
    const config = await window.api.getPlaneConfig();
    const webhookUrl = config?.gchatWebhookUrl;

    if (!webhookUrl) {
      alert('Google Chat webhook belum dikonfigurasi.\nBuka ⚙️ Plane → isi field Google Chat Webhook URL.');
      return;
    }

    setBroadcasting(true);
    setBroadcastResult(null);

    const now = new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });
    const listItems = readyBugs.map((b, i) => {
      const link = b.plane_issue_url ? ` <${b.plane_issue_url}|${b.bug_number || `#${b.id}`}>` : ` (${b.bug_number || `#${b.id}`})`;
      return `${i + 1}.${link} *${b.title}*  [${b.severity}]${b.module ? `  — ${b.module}` : ''}`;
    }).join('\n');

    const message = {
      text: `🚀 *READY TO RELEASE — Siap Naik Production*\n` +
        `📅 ${now}\n` +
        `📋 ${readyBugs.length} issue sudah selesai QA dan siap deploy:\n\n` +
        `${listItems}\n\n` +
        `✅ Semua issue di atas sudah pass testing.\n` +
        `🔔 *CC @squad4 @infra-team* — silakan koordinasi deployment.`,
    };

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });
      if (res.ok) {
        setBroadcastResult({ ok: true, message: `✅ Broadcast terkirim ke Google Chat! (${readyBugs.length} issue)` });
      } else {
        setBroadcastResult({ ok: false, message: `❌ Gagal kirim: HTTP ${res.status}` });
      }
    } catch (e) {
      setBroadcastResult({ ok: false, message: `❌ Error: ${e.message}` });
    } finally {
      setBroadcasting(false);
      setTimeout(() => setBroadcastResult(null), 6000);
    }
  }

  function statusBadgeClass(status) {
    const map = {
      'Open': 'open',
      'In Progress': 'in-progress',
      'Resolved': 'resolved',
      'Closed': 'closed',
      "Won't Fix": 'wont-fix',
    };
    return 'badge badge-' + (map[status] || 'open');
  }

  function severityBadgeClass(severity) {
    return 'badge badge-' + (severity || 'medium').toLowerCase();
  }

  function formatDate(str) {
    if (!str) return '—';
    return new Date(str).toLocaleDateString('id-ID', { dateStyle: 'short' });
  }

  const severityCounts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
  bugs.forEach(b => { if (severityCounts[b.severity] !== undefined) severityCounts[b.severity]++; });

  const modules = [...new Set(bugs.map(b => b.module).filter(Boolean))];

  // Suppress unused-var lint for sortField/sortDir setters (used later)
  void setSortField; void setSortDir;

  return (
    <div className="bug-container">
      {/* Header */}
      <div className="bug-header">
        <div>
          <h1 className="page-title">Bug Reports</h1>
          <p className="page-subtitle">Manajemen laporan bug</p>
        </div>
        <div className="bug-header-actions">
          <button className="btn btn-secondary btn-sm" onClick={handleImportCSV}>📥 Import CSV</button>
          <button className="btn btn-secondary btn-sm" onClick={handleImportPlane}>📋 Import Plane</button>
          <button className="btn btn-secondary btn-sm" onClick={handleExportCSV}>📤 Export CSV</button>
          <button className="btn btn-secondary btn-sm" onClick={handleExportPDF}>📄 Export PDF</button>
          <button className="btn btn-secondary btn-sm" onClick={handleOpenPlaneSettings}>⚙️ Plane</button>
          <TutorialPanel menuKey="bugreports" />
          {readyBugs.length > 0 && (
            <button
              className="btn btn-sm"
              onClick={handleBroadcastRelease}
              disabled={broadcasting}
              style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.5)', color: '#22c55e', fontWeight: 600 }}
            >
              {broadcasting ? '⏳ Mengirim...' : `🚀 Broadcast Release (${readyBugs.length})`}
            </button>
          )}
          {role !== 'viewer' && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => { setEditingBug(null); setShowModal(true); }}
              disabled={bulkTransferring}
            >
              + Tambah Bug
            </button>
          )}
        </div>
      </div>

      {/* Severity Summary Bar */}
      <div className="status-bar">
        <div className="status-bar-item">
          <span className="status-bar-num">{bugs.length}</span>
          <span className="status-bar-label">Total</span>
        </div>
        {['Critical', 'High', 'Medium', 'Low'].map(s => (
          <div key={s} className={`status-bar-item status-bar-${s.toLowerCase()}`}>
            <span className="status-bar-num">{severityCounts[s]}</span>
            <span className="status-bar-label">{s}</span>
          </div>
        ))}
      </div>

      {/* Ready to Release Panel */}
      {readyBugs.length > 0 && (
        <div style={{
          border: '1px solid rgba(34,197,94,0.4)',
          borderRadius: 12,
          background: 'rgba(34,197,94,0.05)',
          padding: '10px 16px',
          flexShrink: 0,
        }}>
          {/* Header — always visible, clickable to collapse */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
            onClick={() => setCollapsedReady(p => !p)}
          >
            <span style={{ fontSize: 16 }}>🚀</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>
                Ready to Release — {readyBugs.length} issue siap naik Production
              </span>
            </div>
            <button
              className="btn btn-sm"
              onClick={e => { e.stopPropagation(); handleBroadcastRelease(); }}
              disabled={broadcasting}
              style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.5)', color: '#22c55e', fontWeight: 600, flexShrink: 0 }}
            >
              {broadcasting ? '⏳ Mengirim...' : '📢 Broadcast'}
            </button>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>
              {collapsedReady ? '▼ Lihat' : '▲ Sembunyikan'}
            </span>
          </div>

          {/* Collapsible content */}
          {!collapsedReady && (
            <div style={{ marginTop: 10 }}>
              {broadcastResult && (
                <div style={{
                  padding: '6px 12px', borderRadius: 8, fontSize: 12, marginBottom: 8,
                  background: broadcastResult.ok ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                  color: broadcastResult.ok ? '#22c55e' : '#ef4444',
                  border: `1px solid ${broadcastResult.ok ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                }}>
                  {broadcastResult.message}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 200, overflowY: 'auto' }}>
                {readyBugs.map(b => (
                  <div key={b.id} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px',
                    background: 'var(--bg-card)', borderRadius: 7, border: '1px solid var(--border)',
                  }}>
                    <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 7, background: 'rgba(34,197,94,0.15)', color: '#22c55e', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0, fontFamily: 'monospace' }}>{b.bug_number || `#${b.id}`}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-primary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</span>
                    <span style={{ fontSize: 10, padding: '1px 5px', borderRadius: 5, flexShrink: 0,
                      background: b.severity === 'Critical' ? 'rgba(239,68,68,0.15)' : b.severity === 'High' ? 'rgba(249,115,22,0.15)' : 'rgba(245,158,11,0.15)',
                      color: b.severity === 'Critical' ? '#ef4444' : b.severity === 'High' ? '#f97316' : '#f59e0b',
                    }}>{b.severity}</span>
                    {b.module && <span style={{ fontSize: 10, color: 'var(--text-muted)', flexShrink: 0 }}>{b.module}</span>}
                    {b.plane_issue_url && (
                      <a href={b.plane_issue_url} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 10, color: '#6366f1', flexShrink: 0, textDecoration: 'none' }}
                        onClick={e => e.stopPropagation()}>🔗</a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="bug-filters">
        <input
          className="search-input"
          placeholder="🔍  Search Bug, Title, Reporter..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={filterProject} onChange={e => setFilterProject(e.target.value)}>
          <option value="">All Project</option>
          {(projects || []).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          {['Open', 'In Progress', 'Resolved', 'Closed', "Won't Fix"].map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filterSeverity} onChange={e => setFilterSeverity(e.target.value)}>
          <option value="">All Severity</option>
          {['Critical', 'High', 'Medium', 'Low'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option value="">All Priority</option>
          {['High', 'Medium', 'Low'].map(p => <option key={p}>{p}</option>)}
        </select>
        <select value={filterModule} onChange={e => setFilterModule(e.target.value)}>
          <option value="">All Module</option>
          {modules.map(m => <option key={m}>{m}</option>)}
        </select>
        <select value={filterPlaneStatus} onChange={e => setFilterPlaneStatus(e.target.value)}>
          <option value="">All Plane Status</option>
          {[...new Set(bugs.map(b => b.plane_status).filter(Boolean))].sort().map(s => <option key={s}>{s}</option>)}
        </select>
        {selected.length > 0 && (
          <>
            {role === 'admin' && (
            <button className="btn btn-danger btn-sm" onClick={handleBulkDelete} disabled={bulkTransferring}>🗑️ Delete ({selected.length})</button>
            )}
            <button className="btn btn-secondary btn-sm" onClick={handleBulkTransfer} disabled={bulkTransferring}>
              {bulkTransferring ? '⏳ Mentransfer...' : `✈️ Transfer ke Plane (${selected.length})`}
            </button>
          </>
        )}
        <span className="bug-count">{filtered.length} Bug</span>

        {/* Column toggle */}
        <div style={{ marginLeft: 'auto', position: 'relative' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowColMenu(v => !v)}
            title="Show/Hide columns"
          >⊞ Kolom</button>
          {showColMenu && (
            <div style={{
              position: 'absolute', top: '110%', right: 0, background: 'var(--bg-secondary, #1e293b)',
              border: '1px solid var(--border)', borderRadius: 8, padding: '8px 0',
              zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,0.4)', minWidth: 160
            }}>
              {Object.keys(COL_LABELS).map(col => (
                <label key={col} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 16px', cursor: 'pointer', fontSize: 13,
                  color: 'var(--text-primary)'
                }}>
                  <input
                    type="checkbox" checked={visibleCols[col]}
                    onChange={() => toggleCol(col)}
                    style={{ width: 'auto', accentColor: '#6366f1' }}
                  />
                  {COL_LABELS[col]}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bug-table-wrapper">
        <table className="bug-table">
          <thead>
            <tr>
              <th style={{ width: 32 }}>
                <input
                  type="checkbox"
                  checked={selected.length === filtered.length && filtered.length > 0}
                  onChange={toggleSelectAll}
                  disabled={bulkTransferring}
                  style={{ width: 'auto', cursor: 'pointer' }}
                />
              </th>
              {visibleCols.bugNo       && <th style={{ width: 90 }}>Bug No</th>}
              {visibleCols.title       && <th>Title</th>}
              {visibleCols.severity    && <th style={{ width: 100 }}>Severity</th>}
              {visibleCols.priority    && <th style={{ width: 90 }}>Priority</th>}
              {visibleCols.status      && <th style={{ width: 120 }}>Status</th>}
              {visibleCols.planeStatus && (
                <th style={{ width: 110 }}>
                  Plane Status{' '}
                  <button
                    className="btn btn-ghost btn-icon"
                    style={{ fontSize: 11, padding: '1px 4px' }}
                    onClick={() => handleManualSync()}
                    title="Sync status dari Plane"
                    disabled={syncStatus === 'syncing'}
                  >
                    {syncStatus === 'syncing' ? '⏳' : '🔄'}
                  </button>
                  {syncStatus === 'error' && (
                    <span style={{ fontSize: 10, color: '#ef4444', marginLeft: 2 }}>⚠️ Sync gagal</span>
                  )}
                </th>
              )}
              {visibleCols.tipe        && <th style={{ width: 80 }}>Tipe</th>}
              {visibleCols.reporter    && <th style={{ width: 100 }}>Reporter</th>}
              {visibleCols.assignee    && <th style={{ width: 100 }}>Assignee</th>}
              {visibleCols.module      && <th style={{ width: 110 }}>Module</th>}
              {visibleCols.environment && <th style={{ width: 110 }}>Environment</th>}
              {visibleCols.created     && <th style={{ width: 100 }}>Created</th>}
              {visibleCols.actions     && <th style={{ width: 80 }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={Object.values(visibleCols).filter(Boolean).length + 1} className="empty-row">Belum ada data bug report.</td>
              </tr>
            )}
            {filtered.map(b => (
              <tr
                key={b.id}
                className={selected.includes(b.id) ? 'selected' : ''}
                onClick={() => setDetailBug(b)}
              >
                <td onClick={e => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selected.includes(b.id)}
                    onChange={() => toggleSelect(b.id)}
                    disabled={bulkTransferring}
                    style={{ width: 'auto', cursor: 'pointer' }}
                  />
                </td>
                {visibleCols.bugNo       && <td className="bug-number">{b.bug_number || '—'}</td>}
                {visibleCols.title       && <td className="bug-title">{b.title}</td>}
                {visibleCols.severity    && <td><span className={severityBadgeClass(b.severity)}>{b.severity}</span></td>}
                {visibleCols.priority    && <td>{b.priority}</td>}
                {visibleCols.status      && <td><span className={statusBadgeClass(b.status)}>{b.status}</span></td>}
                {visibleCols.planeStatus && (
                  <td onClick={e => e.stopPropagation()}>
                    <PlaneStatusBadge bug={b} />
                  </td>
                )}
                {visibleCols.tipe        && <td><BugCategoryBadge bug={b} /></td>}
                {visibleCols.reporter    && <td className="bug-reporter">{b.reporter || '—'}</td>}
                {visibleCols.assignee    && <td className="bug-reporter">{b.assignee || '—'}</td>}
                {visibleCols.module      && <td className="bug-module">{b.module || '—'}</td>}
                {visibleCols.environment && <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.environment || '—'}</td>}
                {visibleCols.created     && <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{formatDate(b.created_at)}</td>}
                {visibleCols.actions     && (
                  <td onClick={e => e.stopPropagation()}>
                    <div className="bug-actions">
                      <button
                        className="btn btn-ghost btn-icon btn-sm"
                        onClick={() => handleTransferSingle(b.id)}
                        title={b.plane_issue_id ? 'Transfer ulang ke Plane' : 'Transfer ke Plane'}
                        disabled={transferringIds.includes(b.id) || bulkTransferring}
                      >
                        {transferringIds.includes(b.id) ? '⏳' : '✈️'}
                      </button>
                      {role !== 'viewer' && (
                      <button
                        className="btn btn-ghost btn-icon btn-sm"
                        onClick={() => { setEditingBug(b); setShowModal(true); }}
                        title="Edit"
                        disabled={bulkTransferring}
                      >✏️</button>
                      )}
                      {role === 'admin' && (
                      <button
                        className="btn btn-ghost btn-icon btn-sm"
                        onClick={() => handleDelete(b.id)}
                        title="Delete"
                        style={{ color: 'var(--danger)' }}
                        disabled={bulkTransferring}
                      >🗑️</button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <BugReportModal
          bug={editingBug}
          projects={projects}
          prefillData={editingBug ? null : prefillData}
          transferLabel={editingBug ? null : transferLabel}
          onSave={handleSaveBug}
          onClose={() => { setShowModal(false); setEditingBug(null); if (onClearPrefill) onClearPrefill(); }}
        />
      )}
      {detailBug && (
        <BugReportDetailModal
          bug={detailBug}
          onClose={() => setDetailBug(null)}
          onEdit={() => { setEditingBug(detailBug); setDetailBug(null); setShowModal(true); }}
        />
      )}
      {showPlaneSettings && (
        <PlaneSettingsModal
          onClose={() => setShowPlaneSettings(false)}
          onSaved={handlePlaneSettingsSaved}
        />
      )}
      {planeTransferModalState && (
        <PlaneTransferModal
          onConfirm={(data) => {
            const resolve = planeTransferModalState.resolve;
            setPlaneTransferModalState(null);
            resolve(data);
          }}
          onCancel={() => {
            const resolve = planeTransferModalState.resolve;
            setPlaneTransferModalState(null);
            resolve(null);
          }}
        />
      )}
    </div>
  );
}
