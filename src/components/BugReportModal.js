import React, { useState, useEffect } from 'react';

const SEVERITY_OPTIONS = ['Critical', 'High', 'Medium', 'Low'];
const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'];
const STATUS_OPTIONS = ['Open', 'In Progress', 'Resolved', 'Closed', "Won't Fix"];

const emptyForm = {
  project_id: '',
  bug_number: '',
  title: '',
  description: '',
  steps_to_reproduce: '',
  severity: 'Medium',
  priority: 'Medium',
  status: 'Open',
  environment: '',
  expected_behavior: '',
  actual_behavior: '',
  evidence_url: '',
  reporter: '',
  assignee: '',
  module: '',
  linked_testcase_id: null,
};

export default function BugReportModal({ bug, projects, onSave, onClose, prefillData, transferLabel }) {
  const [form, setForm] = useState(emptyForm);
  const [testcases, setTestcases] = useState([]);
  const [showOtherProject, setShowOtherProject] = useState(false);
  const [otherProjectName, setOtherProjectName] = useState('');
  const [creatingProject, setCreatingProject] = useState(false);

  // Initialize form on mount
  useEffect(() => {
    if (bug) {
      setForm({ ...emptyForm, ...bug });
    } else if (prefillData) {
      setForm({ ...emptyForm, ...prefillData });
    } else {
      setForm(emptyForm);
    }
  }, [bug, prefillData]);

  // Fetch test cases when project_id changes
  useEffect(() => {
    if (form.project_id) {
      window.api.getTestcases(form.project_id).then(data => {
        setTestcases(data || []);
        // Reset linked_testcase_id if it's no longer in the new list
        if (form.linked_testcase_id) {
          const stillValid = (data || []).some(tc => tc.id === form.linked_testcase_id);
          if (!stillValid) {
            setForm(prev => ({ ...prev, linked_testcase_id: '' }));
          }
        }
      });
    } else {
      setTestcases([]);
      setForm(prev => ({ ...prev, linked_testcase_id: '' }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.project_id]);

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleCreateOtherProject() {
    if (!otherProjectName.trim()) return alert('Nama project wajib diisi');
    setCreatingProject(true);
    try {
      const newProject = await window.api.createProject({ name: otherProjectName.trim(), description: '' });
      if (newProject?.id) {
        setForm(prev => ({ ...prev, project_id: newProject.id }));
        setShowOtherProject(false);
        setOtherProjectName('');
        // Refresh projects list jika ada callback — tidak ada di props, tapi project baru tetap tersimpan
      }
    } catch (err) {
      alert('Gagal membuat project: ' + err.message);
    } finally {
      setCreatingProject(false);
    }
  }

  function handleProjectChange(val) {
    if (val === '__other__') {
      setShowOtherProject(true);
      set('project_id', '');
    } else {
      setShowOtherProject(false);
      setOtherProjectName('');
      set('project_id', val);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return alert('Title wajib diisi');
    if (!form.project_id) return alert('Project wajib dipilih');
    onSave(form);
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{bug ? 'Edit Bug Report' : 'Tambah Bug Report'}</h2>
            {transferLabel && (
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                Transfer dari TC: {transferLabel}
              </div>
            )}
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: 4 }}>

            {/* Row 1: Project | Bug Number */}
            <div className="form-row">
              <div className="form-group">
                <label>Project *</label>
                <select
                  value={showOtherProject ? '__other__' : form.project_id}
                  onChange={e => handleProjectChange(e.target.value)}
                >
                  <option value="">— Pilih Project —</option>
                  {(projects || []).map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                  <option value="__other__">+ Other (buat baru...)</option>
                </select>
                {showOtherProject && (
                  <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
                    <input
                      placeholder="Nama project baru"
                      value={otherProjectName}
                      onChange={e => setOtherProjectName(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleCreateOtherProject())}
                      autoFocus
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={handleCreateOtherProject}
                      disabled={creatingProject}
                    >
                      {creatingProject ? '...' : 'Buat'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => { setShowOtherProject(false); setOtherProjectName(''); }}
                    >
                      Batal
                    </button>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Bug Number</label>
                <input
                  placeholder="BUG-001 (auto)"
                  value={form.bug_number}
                  onChange={e => set('bug_number', e.target.value)}
                />
              </div>
            </div>

            {/* Row 2: Severity | Priority | Status */}
            <div className="form-row">
              <div className="form-group">
                <label>Severity</label>
                <select value={form.severity} onChange={e => set('severity', e.target.value)}>
                  {SEVERITY_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select value={form.priority} onChange={e => set('priority', e.target.value)}>
                  {PRIORITY_OPTIONS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value)}>
                  {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Title (full width) */}
            <div className="form-group">
              <label>Title *</label>
              <input
                placeholder="Deskripsi singkat bug"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                required
              />
            </div>

            {/* Row 3: Module | Environment */}
            <div className="form-row">
              <div className="form-group">
                <label>Module</label>
                <input
                  placeholder="Nama module"
                  value={form.module}
                  onChange={e => set('module', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Environment</label>
                <input
                  placeholder="Staging / Production / Dev"
                  value={form.environment}
                  onChange={e => set('environment', e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows={3}
                placeholder="Deskripsi lengkap bug"
                value={form.description}
                onChange={e => set('description', e.target.value)}
              />
            </div>

            {/* Steps to Reproduce */}
            <div className="form-group">
              <label>Steps to Reproduce</label>
              <textarea
                rows={4}
                placeholder={"1. Buka halaman...\n2. Klik tombol...\n3. Isi form...\n4. Amati hasil"}
                value={form.steps_to_reproduce}
                onChange={e => set('steps_to_reproduce', e.target.value)}
              />
            </div>

            {/* Row 4: Expected Behavior | Actual Behavior */}
            <div className="form-row">
              <div className="form-group">
                <label>Expected Behavior</label>
                <textarea
                  rows={3}
                  placeholder="Perilaku yang diharapkan"
                  value={form.expected_behavior}
                  onChange={e => set('expected_behavior', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Actual Behavior</label>
                <textarea
                  rows={3}
                  placeholder="Perilaku yang terjadi sebenarnya"
                  value={form.actual_behavior}
                  onChange={e => set('actual_behavior', e.target.value)}
                />
              </div>
            </div>

            {/* Evidence URL */}
            <div className="form-group">
              <label>Evidence URL</label>
              <input
                placeholder="Link screenshot / video / log"
                value={form.evidence_url}
                onChange={e => set('evidence_url', e.target.value)}
              />
            </div>

            {/* Row 5: Reporter | Assignee */}
            <div className="form-row">
              <div className="form-group">
                <label>Reporter</label>
                <input
                  placeholder="Nama reporter"
                  value={form.reporter}
                  onChange={e => set('reporter', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Assignee</label>
                <input
                  placeholder="Nama assignee"
                  value={form.assignee}
                  onChange={e => set('assignee', e.target.value)}
                />
              </div>
            </div>

            {/* Linked Test Case */}
            <div className="form-group">
              <label>Linked Test Case</label>
              <select
                value={form.linked_testcase_id || ''}
                onChange={e => set('linked_testcase_id', e.target.value || null)}
              >
                <option value="">— Tidak ada —</option>
                {testcases.map(tc => (
                  <option key={tc.id} value={tc.id}>
                    {tc.no ? `${tc.no} — ` : ''}{tc.title}
                  </option>
                ))}
              </select>
            </div>

          </div>{/* end scrollable body */}

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
            <button type="submit" className="btn btn-primary">
              {bug ? 'Update' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
