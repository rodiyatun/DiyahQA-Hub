import React, { useState, useEffect } from 'react';
import TutorialPanel from '../TutorialPanel';

const STATUS_COLORS = { draft:'#64748b', active:'#6366f1', completed:'#22c55e' };
const ITEM_COLORS  = { 'Not Run':'#64748b', Pass:'#22c55e', Fail:'#ef4444', Blocked:'#f97316', Skip:'#94a3b8' };

function ProgressBar({ passed, failed, blocked, skipped, total }) {
  if (!total) return null;
  return (
    <div style={{ height: 6, borderRadius: 3, overflow: 'hidden', background: 'var(--border)', display: 'flex', marginTop: 6 }}>
      {[{ v: passed, c: '#22c55e' }, { v: failed, c: '#ef4444' }, { v: blocked, c: '#f97316' }, { v: skipped, c: '#94a3b8' }].map((s, i) => (
        s.v > 0 && <div key={i} style={{ width: `${(s.v / total) * 100}%`, background: s.c, transition: 'width 0.3s' }} />
      ))}
    </div>
  );
}

export default function TestPlanPage({ projects, selectedProject }) {
  const [plans, setPlans]         = useState([]);
  const [selected, setSelected]   = useState(null);
  const [detail, setDetail]       = useState(null);
  const [filterProj, setFilterProj] = useState(selectedProject?.id || '');
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm]           = useState({ name: '', description: '', projectId: selectedProject?.id || '', environmentId: '' });
  const [tcList, setTcList]       = useState([]);
  const [selectedTCs, setSelectedTCs] = useState([]);
  const [envList, setEnvList]     = useState([]);
  // Modal state untuk input catatan Fail
  const [failModal, setFailModal] = useState(null); // { itemId } | null
  const [failNote, setFailNote]   = useState('');

  useEffect(() => { loadPlans(); }, [filterProj]);
  useEffect(() => { if (showCreate && form.projectId) loadTCs(); }, [showCreate, form.projectId]);
  useEffect(() => { window.api.getEnvironments().then(e => setEnvList(e || [])); }, []);

  async function loadPlans() {
    const data = await window.api.getTestPlans(filterProj || undefined);
    setPlans(data || []);
  }
  async function loadTCs() {
    const data = await window.api.getTestcases(form.projectId);
    setTcList(data || []);
  }
  async function openPlan(plan) {
    setSelected(plan);
    const d = await window.api.getTestPlanDetail(plan.id);
    setDetail(d);
  }
  async function createPlan() {
    if (!form.name.trim() || !form.projectId) return alert('Nama dan project wajib diisi');
    await window.api.createTestPlan({ projectId: Number(form.projectId), name: form.name, description: form.description, environmentId: form.environmentId || null, testcaseIds: selectedTCs });
    setShowCreate(false); setForm({ name:'', description:'', projectId: selectedProject?.id||'', environmentId:'' }); setSelectedTCs([]);
    await loadPlans();
  }
  async function updateItem(itemId, status) {
    if (status === 'Fail') {
      // Tampilkan modal input catatan — jangan pakai window.prompt (tidak berfungsi di Electron production)
      setFailNote('');
      setFailModal({ itemId });
      return;
    }
    await window.api.updatePlanItem({ itemId, status, note: '', executedBy: 'QA', evidence: '' });
    if (selected) openPlan(selected);
    await loadPlans();
  }

  async function submitFail() {
    if (!failModal) return;
    await window.api.updatePlanItem({ itemId: failModal.itemId, status: 'Fail', note: failNote, executedBy: 'QA', evidence: '' });
    setFailModal(null);
    setFailNote('');
    if (selected) openPlan(selected);
    await loadPlans();
  }
  async function changeStatus(status) {
    if (status === 'completed' && detail && (detail.notRun || 0) > 0) {
      const ok = window.confirm(
        `Masih ada ${detail.notRun} test case belum dijalankan (Not Run).\nApakah Anda yakin ingin menyelesaikan test plan ini?`
      );
      if (!ok) return;
    }
    await window.api.updateTestPlanStatus({ planId: selected.id, status });
    await loadPlans();
    if (selected) openPlan({ ...selected, status });
  }
  async function deletePlan(id) {
    if (!window.confirm('Hapus test plan ini?')) return;
    await window.api.deleteTestPlan(id);
    if (selected?.id === id) { setSelected(null); setDetail(null); }
    await loadPlans();
  }

  if (selected && detail) {
    const progress = Math.round(((detail.passed || 0) / (detail.total || 1)) * 100);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => { setSelected(null); setDetail(null); }}>← Test Plans</button>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{detail.name}</span>
          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 700, background: `${STATUS_COLORS[detail.status]}22`, color: STATUS_COLORS[detail.status] }}>{detail.status?.toUpperCase()}</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            {detail.status === 'draft'     && <button className="btn btn-primary btn-sm"    onClick={() => changeStatus('active')}>▶ Mulai</button>}
            {detail.status === 'active'    && <button className="btn btn-secondary btn-sm"  onClick={() => changeStatus('completed')}>✅ Selesai</button>}
            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => deletePlan(detail.id)} style={{ color: 'var(--danger)' }}>🗑️</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10 }}>
          {[{ l:'Total', v: detail.total||0, c:'#6366f1' }, { l:'Pass', v: detail.passed||0, c:'#22c55e' }, { l:'Fail', v: detail.failed||0, c:'#ef4444' }, { l:'Blocked', v: detail.blocked||0, c:'#f97316' }, { l:'Not Run', v: detail.notRun||0, c:'#64748b' }].map(s => (
            <div key={s.l} style={{ border: `1px solid ${s.c}33`, borderRadius: 10, background: 'var(--bg-card)', padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1 }}><ProgressBar passed={detail.passed} failed={detail.failed} blocked={detail.blocked} skipped={detail.skipped} total={detail.total} /></div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{progress}% pass</span>
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead><tr>
              {['No','Test Case','Module','Status','Catatan','Aksi'].map(h => <th key={h} style={{ padding: '10px 14px', background: 'var(--bg-secondary)', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {(detail.items || []).map(item => (
                <tr key={item.id}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 11 }}>{item.no || '—'}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text-primary)', fontWeight: 500 }}>{item.title}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 12 }}>{item.module || '—'}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 700, background: `${ITEM_COLORS[item.status]}22`, color: ITEM_COLORS[item.status] }}>{item.status}</span>
                  </td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.note || '—'}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
                    {detail.status === 'active' && (
                      <div style={{ display: 'flex', gap: 4 }}>
                        {['Pass','Fail','Blocked','Skip'].map(s => (
                          <button key={s} className="btn btn-ghost btn-sm" style={{ fontSize: 10, padding: '2px 6px', color: ITEM_COLORS[s] }}
                            onClick={() => updateItem(item.id, s)}>{s}</button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Test Plans</h1>
          <p className="page-subtitle">Kelola siklus eksekusi test per sprint/release</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <TutorialPanel menuKey="testplans" />
          <button className="btn btn-primary btn-sm" onClick={() => setShowCreate(true)}>+ New Test Plan</button>
        </div>
      </div>

      <select value={filterProj} onChange={e => setFilterProj(e.target.value)} style={{ fontSize: 12, width: 220 }}>
        <option value="">All Projects</option>
        {(projects || []).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      {plans.length === 0 ? (
        <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border)', borderRadius: 12, fontSize: 13 }}>
          Belum ada test plan. Klik "+ New Test Plan" untuk membuat.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
          {plans.map(plan => (
            <div key={plan.id} style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 16, cursor: 'pointer', transition: 'all 0.15s' }}
              onClick={() => openPlan(plan)}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#6366f1'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 700, background: `${STATUS_COLORS[plan.status]}22`, color: STATUS_COLORS[plan.status] }}>{plan.status?.toUpperCase()}</span>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>{plan.name}</div>
                </div>
                <button className="btn btn-ghost btn-icon btn-sm" onClick={e => { e.stopPropagation(); deletePlan(plan.id); }} style={{ color: 'var(--danger)' }}>🗑️</button>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
                {plan.passed||0} Pass · {plan.failed||0} Fail · {plan.notRun||0} Not Run · {plan.total||0} Total
              </div>
              <ProgressBar passed={plan.passed} failed={plan.failed} blocked={plan.blocked} skipped={plan.skipped} total={plan.total} />
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>{new Date(plan.created_at).toLocaleDateString('id-ID')}</div>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowCreate(false)}>
          <div className="modal" style={{ maxWidth: 560 }}>
            <div className="modal-header">
              <h3 className="modal-title">New Test Plan</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowCreate(false)}>✕</button>
            </div>
            <div className="form-group"><label>Nama Plan *</label>
              <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="Sprint 12 Regression" />
            </div>
            <div className="form-group"><label>Deskripsi</label>
              <input value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} placeholder="Regression test sebelum rilis v2.1" />
            </div>
            <div className="form-row">
              <div className="form-group"><label>Project *</label>
                <select value={form.projectId} onChange={e => setForm(p => ({...p, projectId: e.target.value}))}>
                  <option value="">— Pilih Project —</option>
                  {(projects||[]).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Environment</label>
                <select value={form.environmentId} onChange={e => setForm(p => ({...p, environmentId: e.target.value}))}>
                  <option value="">— Pilih Environment —</option>
                  {envList.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
              </div>
            </div>
            {form.projectId && tcList.length > 0 && (
              <div className="form-group">
                <label>Test Cases ({selectedTCs.length}/{tcList.length} dipilih)
                  <button className="btn btn-ghost btn-sm" style={{ marginLeft: 8, fontSize: 11 }}
                    onClick={() => setSelectedTCs(selectedTCs.length === tcList.length ? [] : tcList.map(t => t.id))}>
                    {selectedTCs.length === tcList.length ? 'Deselect All' : 'Select All'}
                  </button>
                </label>
                <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 8, padding: 8 }}>
                  {tcList.map(tc => (
                    <label key={tc.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px', cursor: 'pointer', borderRadius: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
                      <input type="checkbox" checked={selectedTCs.includes(tc.id)}
                        onChange={() => setSelectedTCs(p => p.includes(tc.id) ? p.filter(i => i !== tc.id) : [...p, tc.id])}
                        style={{ width: 'auto' }} />
                      {tc.no && <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>{tc.no}</span>}
                      {tc.title}
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Batal</button>
              <button className="btn btn-primary" onClick={createPlan}>Buat Test Plan</button>
            </div>
          </div>
        </div>
      )}
      {/* Modal input catatan Fail */}
      {failModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setFailModal(null)}>
          <div className="modal" style={{ maxWidth: 400, width: '100%' }}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ color: '#ef4444' }}>❌ Tandai Fail</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setFailModal(null)}>✕</button>
            </div>
            <div style={{ padding: '12px 0 8px' }}>
              <div className="form-group">
                <label>Catatan <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opsional)</span></label>
                <textarea
                  rows={3}
                  autoFocus
                  placeholder="Deskripsi kegagalan, error yang ditemukan, dll."
                  value={failNote}
                  onChange={e => setFailNote(e.target.value)}
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setFailModal(null)}>Batal</button>
              <button className="btn btn-danger" onClick={submitFail} style={{ background: '#ef4444', color: 'white', border: 'none' }}>Konfirmasi Fail</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
