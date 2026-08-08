import React, { useState, useEffect, useRef } from 'react';
import BugReportModal from './BugReportModal';
import BugReportDetailModal from './BugReportDetailModal';
import { BugCategoryBadge } from './BugClassifier';
import Papa from 'papaparse';
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

// ── AssigneeEmailModal ────────────────────────────────────────────
function AssigneeEmailModal({ onConfirm, onCancel }) {
  const [email, setEmail] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(email);
  }
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="modal" style={{ maxWidth: 400, width: '100%' }}>
        <div className="modal-header">
          <h2 className="modal-title">✈️ Transfer ke Plane</h2>
          <button className="btn btn-ghost btn-icon" onClick={onCancel}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ padding: '12px 0 8px' }}>
            <div className="form-group">
              <label>Assignee Email <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opsional)</span></label>
              <input
                type="email"
                autoFocus
                maxLength={255}
                placeholder="contoh: diyahdo123@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <small style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                Kosongkan jika tidak perlu assign ke siapapun
              </small>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Batal</button>
            <button type="submit" className="btn btn-primary">Transfer</button>
          </div>
        </form>
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
  // Assignee email modal state
  const [assigneeModalState, setAssigneeModalState] = useState(null); // { bugId, resolve }

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
  }, [bugs, search, filterStatus, filterSeverity, filterPriority, filterProject, filterModule, sortField, sortDir]);

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
      await window.api.syncPlaneStatus({});
      lastSyncRef.current = Date.now();
      const data = await window.api.getBugReports(null);
      setBugs(data || []);
      setSyncStatus('idle');
    } catch {
      setSyncStatus('error');
      // Preserve existing bug data — do not clear
    }
  }

  async function loadBugReports() {
    const data = await window.api.getBugReports(null);
    setBugs(data || []);
    setSelected([]);
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
      await window.api.syncPlaneStatus({});
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

    // Show assignee email modal — returns email string or null if cancelled
    const assigneeEmail = await new Promise((resolve) => {
      setAssigneeModalState({ bugId, resolve });
    });

    // null means user cancelled
    if (assigneeEmail === null) return;

    setTransferringIds(prev => [...prev, bugId]);
    try {
      const result = await window.api.transferBugToPlane({ bugId, assigneeEmail: assigneeEmail.trim() });
      if (result && result.success) {
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

    setBulkTransferring(true);
    try {
      const result = await window.api.transferBugsBulkToPlane({ bugIds: selected });
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
    if (editingBug) {
      await window.api.updateBugReport({ ...formData, id: editingBug.id });
    } else {
      await window.api.createBugReport(formData);
    }
    await loadBugReports();
    setShowModal(false);
    setEditingBug(null);
    if (onClearPrefill) {
      onClearPrefill();
      if (transferLabel) {
        alert('✅ Bug report berhasil dibuat dari test case: ' + transferLabel);
      }
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Hapus bug report ini?')) return;
    await window.api.deleteBugReport(id);
    await loadBugReports();
  }

  async function handleBulkDelete() {
    if (!window.confirm(`Hapus ${selected.length} bug report?`)) return;
    for (const id of selected) await window.api.deleteBugReport(id);
    await loadBugReports();
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

  function toggleSelect(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }

  function toggleSelectAll() {
    setSelected(prev => prev.length === filtered.length ? [] : filtered.map(b => b.id));
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
          <button className="btn btn-secondary btn-sm" onClick={handleOpenPlaneSettings}>⚙️ Plane</button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => { setEditingBug(null); setShowModal(true); }}
            disabled={bulkTransferring}
          >
            + Tambah Bug
          </button>
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
        {selected.length > 0 && (
          <>
            <button className="btn btn-danger btn-sm" onClick={handleBulkDelete} disabled={bulkTransferring}>🗑️ Delete ({selected.length})</button>
            <button className="btn btn-secondary btn-sm" onClick={handleBulkTransfer} disabled={bulkTransferring}>
              {bulkTransferring ? '⏳ Mentransfer...' : `✈️ Transfer ke Plane (${selected.length})`}
            </button>
          </>
        )}
        <span className="bug-count">{filtered.length} Bug</span>
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
              <th style={{ width: 90 }}>Bug No</th>
              <th>Title</th>
              <th style={{ width: 100 }}>Severity</th>
              <th style={{ width: 90 }}>Priority</th>
              <th style={{ width: 120 }}>Status</th>
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
              <th style={{ width: 80 }}>Tipe</th>
              <th style={{ width: 100 }}>Reporter</th>
              <th style={{ width: 110 }}>Module</th>
              <th style={{ width: 100 }}>Created</th>
              <th style={{ width: 80 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={12} className="empty-row">Belum ada data bug report.</td>
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
                <td className="bug-number">{b.bug_number || '—'}</td>
                <td className="bug-title">{b.title}</td>
                <td><span className={severityBadgeClass(b.severity)}>{b.severity}</span></td>
                <td>{b.priority}</td>
                <td><span className={statusBadgeClass(b.status)}>{b.status}</span></td>
                <td onClick={e => e.stopPropagation()}>
                  <PlaneStatusBadge bug={b} />
                </td>
                <td>
                  <BugCategoryBadge bug={b} />
                </td>
                <td className="bug-reporter">{b.reporter || '—'}</td>
                <td className="bug-module">{b.module || '—'}</td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{formatDate(b.created_at)}</td>
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
                    <button
                      className="btn btn-ghost btn-icon btn-sm"
                      onClick={() => { setEditingBug(b); setShowModal(true); }}
                      title="Edit"
                      disabled={bulkTransferring}
                    >✏️</button>
                    <button
                      className="btn btn-ghost btn-icon btn-sm"
                      onClick={() => handleDelete(b.id)}
                      title="Delete"
                      style={{ color: 'var(--danger)' }}
                      disabled={bulkTransferring}
                    >🗑️</button>
                  </div>
                </td>
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
      {assigneeModalState && (
        <AssigneeEmailModal
          onConfirm={(email) => {
            const resolve = assigneeModalState.resolve;
            setAssigneeModalState(null);
            resolve(email);
          }}
          onCancel={() => {
            const resolve = assigneeModalState.resolve;
            setAssigneeModalState(null);
            resolve(null);
          }}
        />
      )}
    </div>
  );
}
