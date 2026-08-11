import TutorialPanel from '../TutorialPanel';
import React, { useState, useEffect } from 'react';

const PRIORITY_COLORS = { Critical:'#ef4444', High:'#f97316', Medium:'#f59e0b', Low:'#6366f1' };
const STATUS_COLORS   = { Active:'#22c55e', Deprecated:'#64748b', Draft:'#f59e0b' };

export default function RequirementsPage({ projects, selectedProject }) {
  const [reqs, setReqs]           = useState([]);
  const [matrix, setMatrix]       = useState([]);
  const [view, setView]           = useState('list'); // list | matrix
  const [filterProj, setFilterProj] = useState(selectedProject?.id || '');
  const [showForm, setShowForm]   = useState(false);
  const [editingReq, setEditingReq] = useState(null);
  const [detailReq, setDetailReq] = useState(null);
  const [form, setForm]           = useState({ code:'', title:'', description:'', priority:'Medium' });
  const [tcList, setTcList]       = useState([]);
  const [linkingTcId, setLinkingTcId] = useState('');

  useEffect(() => { if (filterProj) { load(); loadMatrix(); loadTCs(); } }, [filterProj]);

  async function load() {
    const data = await window.api.getRequirements(filterProj);
    setReqs(data || []);
  }
  async function loadMatrix() {
    const data = await window.api.getTraceabilityMatrix(filterProj);
    setMatrix(data || []);
  }
  async function loadTCs() {
    const data = await window.api.getTestcases(filterProj);
    setTcList(data || []);
  }

  async function saveReq() {
    if (!form.title.trim()) return alert('Title wajib diisi');
    if (editingReq) {
      await window.api.updateRequirement({ id: editingReq.id, ...form });
    } else {
      await window.api.createRequirement({ projectId: Number(filterProj), ...form });
    }
    setShowForm(false); setEditingReq(null); setForm({ code:'', title:'', description:'', priority:'Medium' });
    await load(); await loadMatrix();
  }

  async function deleteReq(id) {
    if (!window.confirm('Hapus requirement ini?')) return;
    await window.api.deleteRequirement(id);
    if (detailReq?.id === id) setDetailReq(null);
    await load(); await loadMatrix();
  }

  async function linkTC() {
    if (!linkingTcId || !detailReq) return;
    await window.api.linkRequirementTc({ requirementId: detailReq.id, testcaseId: Number(linkingTcId) });
    setLinkingTcId('');
    await load(); await loadMatrix();
    const updated = reqs.find(r => r.id === detailReq.id);
    if (updated) setDetailReq(updated);
  }

  async function unlinkTC(requirementId, testcaseId) {
    await window.api.unlinkRequirementTc({ requirementId, testcaseId });
    await load(); await loadMatrix();
  }

  const coveredCount = matrix.filter(r => r.covered).length;
  const allPassCount = matrix.filter(r => r.allPassed).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Requirements & Traceability</h1>
          <p className="page-subtitle">Mapping requirement ke test case untuk lihat coverage</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <TutorialPanel menuKey="requirements" />
          <button className="btn btn-primary btn-sm" onClick={() => { setEditingReq(null); setForm({ code:'',title:'',description:'',priority:'Medium' }); setShowForm(true); }}
          disabled={!filterProj}>+ New Requirement</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <select value={filterProj} onChange={e => setFilterProj(e.target.value)} style={{ fontSize: 12, width: 220 }}>
          <option value="">— Pilih Project —</option>
          {(projects||[]).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <div style={{ display: 'flex', gap: 4 }}>
          {[{ id:'list', label:'📋 List' }, { id:'matrix', label:'🗺️ Matrix' }].map(v => (
            <button key={v.id} className={`env-tab-btn ${view === v.id ? 'active' : ''}`} onClick={() => setView(v.id)}>{v.label}</button>
          ))}
        </div>
        {filterProj && (
          <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>
            {coveredCount}/{matrix.length} covered · {allPassCount} all-pass
          </div>
        )}
      </div>

      {!filterProj ? (
        <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border)', borderRadius: 12, fontSize: 13 }}>Pilih project untuk melihat requirements</div>
      ) : view === 'list' ? (
        <div style={{ display: 'flex', gap: 16 }}>
          {/* List */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {reqs.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border)', borderRadius: 12, fontSize: 13 }}>Belum ada requirement</div>}
            {reqs.map(req => (
              <div key={req.id}
                style={{ border: `1px solid ${detailReq?.id === req.id ? '#6366f1' : 'var(--border)'}`, borderRadius: 10, background: 'var(--bg-card)', padding: 14, cursor: 'pointer' }}
                onClick={() => setDetailReq(req)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    {req.code && <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#6366f1', fontWeight: 700, marginRight: 8 }}>{req.code}</span>}
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{req.title}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 700, background: `${PRIORITY_COLORS[req.priority]}22`, color: PRIORITY_COLORS[req.priority] }}>{req.priority}</span>
                    <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 700, background: (req.linkedTCs||[]).length > 0 ? 'rgba(34,197,94,0.15)' : 'rgba(100,116,139,0.15)', color: (req.linkedTCs||[]).length > 0 ? '#22c55e' : '#64748b' }}>
                      {(req.linkedTCs||[]).length} TC
                    </span>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={e => { e.stopPropagation(); setEditingReq(req); setForm({ code: req.code, title: req.title, description: req.description, priority: req.priority }); setShowForm(true); }}>✏️</button>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={e => { e.stopPropagation(); deleteReq(req.id); }} style={{ color: 'var(--danger)' }}>🗑️</button>
                  </div>
                </div>
                {req.description && <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{req.description}</div>}
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {detailReq && (
            <div style={{ width: 340, flexShrink: 0, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
                {detailReq.code && <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#6366f1', marginRight: 6 }}>{detailReq.code}</span>}
                {detailReq.title}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Linked Test Cases</div>
              {(detailReq.linkedTCs || []).map(tc => (
                <div key={tc.testcase_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: 'var(--bg-secondary)', borderRadius: 6, marginBottom: 4, fontSize: 12 }}>
                  <span>{tc.no && <span style={{ color: 'var(--text-muted)', marginRight: 4 }}>{tc.no}</span>}{tc.title}</span>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: tc.status === 'Pass' ? '#22c55e' : tc.status === 'Fail' ? '#ef4444' : 'var(--text-muted)' }}>{tc.status}</span>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => unlinkTC(detailReq.id, tc.testcase_id)} style={{ color: 'var(--danger)', fontSize: 10 }}>✕</button>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <select value={linkingTcId} onChange={e => setLinkingTcId(e.target.value)} style={{ flex: 1, fontSize: 12 }}>
                  <option value="">Link TC...</option>
                  {tcList.filter(tc => !(detailReq.linkedTCs||[]).some(l => l.testcase_id === tc.id)).map(tc => (
                    <option key={tc.id} value={tc.id}>{tc.no ? tc.no + ' — ' : ''}{tc.title}</option>
                  ))}
                </select>
                <button className="btn btn-primary btn-sm" onClick={linkTC} disabled={!linkingTcId}>Link</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Matrix view
        <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead><tr>
              <th style={{ padding: '10px 14px', background: 'var(--bg-secondary)', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', minWidth: 200 }}>Requirement</th>
              <th style={{ padding: '10px 14px', background: 'var(--bg-secondary)', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Priority</th>
              <th style={{ padding: '10px 14px', background: 'var(--bg-secondary)', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Test Cases</th>
              <th style={{ padding: '10px 14px', background: 'var(--bg-secondary)', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Coverage</th>
            </tr></thead>
            <tbody>
              {matrix.map(req => (
                <tr key={req.id}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
                    {req.code && <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#6366f1', marginRight: 6 }}>{req.code}</span>}
                    <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{req.title}</span>
                  </td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 700, background: `${PRIORITY_COLORS[req.priority]}22`, color: PRIORITY_COLORS[req.priority] }}>{req.priority}</span>
                  </td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {(req.linkedTCs||[]).map(tc => (
                        <span key={tc.id} style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: tc.status === 'Pass' ? 'rgba(34,197,94,0.15)' : tc.status === 'Fail' ? 'rgba(239,68,68,0.15)' : 'var(--bg-secondary)', color: tc.status === 'Pass' ? '#22c55e' : tc.status === 'Fail' ? '#ef4444' : 'var(--text-muted)' }}>
                          {tc.no || tc.title?.slice(0,15)}
                        </span>
                      ))}
                      {(req.linkedTCs||[]).length === 0 && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>—</span>}
                    </div>
                  </td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
                    {!req.covered ? <span style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>❌ Not Covered</span>
                      : req.allPassed ? <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>✅ All Pass</span>
                      : <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700 }}>⚠️ Partial</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal" style={{ maxWidth: 480 }}>
            <div className="modal-header">
              <h3 className="modal-title">{editingReq ? 'Edit Requirement' : 'New Requirement'}</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Kode (REQ-001)</label>
                <input value={form.code} onChange={e => setForm(p => ({...p, code: e.target.value}))} placeholder="REQ-001" style={{ fontFamily: 'monospace' }} />
              </div>
              <div className="form-group"><label>Priority</label>
                <select value={form.priority} onChange={e => setForm(p => ({...p, priority: e.target.value}))}>
                  {['Critical','High','Medium','Low'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group"><label>Title *</label>
              <input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="User dapat login dengan email dan password" />
            </div>
            <div className="form-group"><label>Deskripsi</label>
              <textarea rows={3} value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} placeholder="Detail requirement..." />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Batal</button>
              <button className="btn btn-primary" onClick={saveReq}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
