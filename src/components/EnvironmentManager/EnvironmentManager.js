import React, { useState, useEffect } from 'react';

const TYPE_COLORS = { staging: '#6366f1', uat: '#f59e0b', production: '#ef4444' };
const TYPE_LABELS = { staging: 'Staging', uat: 'UAT', production: 'Production' };

export default function EnvironmentManager({ projects }) {
  const [envs, setEnvs]           = useState([]);
  const [selected, setSelected]   = useState(null);
  const [filterProj, setFilterProj] = useState('');
  const [showForm, setShowForm]   = useState(false);
  const [editingEnv, setEditingEnv] = useState(null);
  const [form, setForm]           = useState({ name: '', type: 'staging', baseUrl: '', projectId: '' });
  const [varForm, setVarForm]     = useState({ keyName: '', value: '', description: '', isSecret: true });
  const [showVarForm, setShowVarForm] = useState(false);
  const [revealed, setRevealed]   = useState({});

  useEffect(() => { load(); }, [filterProj]);

  async function load() {
    const data = await window.api.getEnvironments(filterProj || undefined);
    setEnvs(data || []);
    if (selected) setSelected(data.find(e => e.id === selected.id) || null);
  }

  async function saveEnv() {
    if (!form.name.trim()) return alert('Nama environment wajib diisi');
    if (editingEnv) {
      await window.api.updateEnvironment({ id: editingEnv.id, name: form.name, type: form.type, baseUrl: form.baseUrl });
    } else {
      await window.api.createEnvironment({ projectId: form.projectId || null, name: form.name, type: form.type, baseUrl: form.baseUrl });
    }
    setShowForm(false); setEditingEnv(null); setForm({ name: '', type: 'staging', baseUrl: '', projectId: '' });
    await load();
  }

  async function deleteEnv(id) {
    if (!window.confirm('Hapus environment ini beserta semua variabelnya?')) return;
    await window.api.deleteEnvironment(id);
    if (selected?.id === id) setSelected(null);
    await load();
  }

  async function saveVar() {
    if (!varForm.keyName.trim() || !varForm.value.trim()) return alert('Key dan value wajib diisi');
    await window.api.upsertEnvVariable({ environmentId: selected.id, keyName: varForm.keyName.trim(), value: varForm.value, description: varForm.description, isSecret: varForm.isSecret });
    setShowVarForm(false); setVarForm({ keyName: '', value: '', description: '', isSecret: true });
    await load();
  }

  async function deleteVar(id) {
    await window.api.deleteEnvVariable(id);
    await load();
  }

  async function revealVar(envId, keyName, varId) {
    const val = await window.api.getEnvDecrypted({ envId, keyName });
    setRevealed(p => ({ ...p, [varId]: val }));
  }

  function startEdit(env) {
    setEditingEnv(env);
    setForm({ name: env.name, type: env.type, baseUrl: env.base_url || '', projectId: env.project_id || '' });
    setShowForm(true);
  }

  const projName = (id) => projects.find(p => p.id === id)?.name || '—';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Environment Manager</h1>
          <p className="page-subtitle">Kelola URL dan credentials per environment — staging, UAT, production</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => { setEditingEnv(null); setForm({ name:'',type:'staging',baseUrl:'',projectId:'' }); setShowForm(true); }}>+ New Environment</button>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8 }}>
        <select value={filterProj} onChange={e => setFilterProj(e.target.value)} style={{ fontSize: 12 }}>
          <option value="">All Projects</option>
          {(projects || []).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', alignSelf: 'center' }}>{envs.length} environment</span>
      </div>

      <div style={{ display: 'flex', gap: 16, minHeight: 0 }}>
        {/* Env list */}
        <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {envs.length === 0 && (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border)', borderRadius: 12, fontSize: 13 }}>
              Belum ada environment
            </div>
          )}
          {envs.map(env => (
            <div key={env.id}
              style={{ border: `1px solid ${selected?.id === env.id ? TYPE_COLORS[env.type] : 'var(--border)'}`, borderRadius: 10, background: 'var(--bg-card)', padding: 14, cursor: 'pointer', transition: 'all 0.15s' }}
              onClick={() => setSelected(env)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 700, background: `${TYPE_COLORS[env.type]}22`, color: TYPE_COLORS[env.type] }}>{TYPE_LABELS[env.type]}</span>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>{env.name}</div>
                  {env.project_id && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>📁 {projName(env.project_id)}</div>}
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button className="btn btn-ghost btn-icon btn-sm" onClick={e => { e.stopPropagation(); startEdit(env); }}>✏️</button>
                  <button className="btn btn-ghost btn-icon btn-sm" onClick={e => { e.stopPropagation(); deleteEnv(env.id); }} style={{ color: 'var(--danger)' }}>🗑️</button>
                </div>
              </div>
              {env.base_url && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{env.base_url}</div>}
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{(env.variables || []).length} variable</div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div style={{ flex: 1 }}>
          {!selected ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border)', borderRadius: 12, fontSize: 13 }}>
              Pilih environment di sebelah kiri untuk manage variables
            </div>
          ) : (
            <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: 11, padding: '2px 7px', borderRadius: 4, fontWeight: 700, background: `${TYPE_COLORS[selected.type]}22`, color: TYPE_COLORS[selected.type] }}>{TYPE_LABELS[selected.type]}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginLeft: 8 }}>{selected.name}</span>
                  {selected.base_url && <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: 2 }}>{selected.base_url}</div>}
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => setShowVarForm(true)}>+ Add Variable</button>
              </div>

              {showVarForm && (
                <div style={{ padding: 14, background: 'var(--bg-secondary)', borderRadius: 8, marginBottom: 14 }}>
                  <div className="form-row">
                    <div className="form-group"><label>Key Name *</label>
                      <input value={varForm.keyName} onChange={e => setVarForm(p => ({ ...p, keyName: e.target.value }))} placeholder="API_TOKEN" style={{ fontFamily: 'monospace' }} />
                    </div>
                    <div className="form-group"><label>Value *</label>
                      <input type="password" value={varForm.value} onChange={e => setVarForm(p => ({ ...p, value: e.target.value }))} placeholder="nilai credential" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Deskripsi</label>
                      <input value={varForm.description} onChange={e => setVarForm(p => ({ ...p, description: e.target.value }))} placeholder="Token untuk login endpoint" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                        <input type="checkbox" checked={varForm.isSecret} onChange={e => setVarForm(p => ({ ...p, isSecret: e.target.checked }))} style={{ width: 'auto' }} />
                        Secret (masked)
                      </label>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-primary btn-sm" onClick={saveVar}>💾 Simpan</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => { setShowVarForm(false); setVarForm({ keyName:'',value:'',description:'',isSecret:true }); }}>Batal</button>
                  </div>
                </div>
              )}

              {(selected.variables || []).length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>Belum ada variable. Klik "+ Add Variable"</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead><tr>
                    {['Key', 'Value', 'Deskripsi', ''].map(h => <th key={h} style={{ padding: '8px 10px', background: 'var(--bg-secondary)', textAlign: 'left', fontWeight: 700, fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {(selected.variables || []).map(v => (
                      <tr key={v.id}>
                        <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border)', fontFamily: 'monospace', color: '#60a5fa', fontWeight: 600 }}>{v.key_name}</td>
                        <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border)', fontFamily: 'monospace' }}>
                          <span style={{ color: revealed[v.id] ? '#22c55e' : 'var(--text-muted)' }}>
                            {revealed[v.id] || v.value}
                          </span>
                          {v.is_secret && !revealed[v.id] && (
                            <button className="btn btn-ghost btn-sm" style={{ fontSize: 10, marginLeft: 6 }}
                              onClick={() => revealVar(selected.id, v.key_name, v.id)}>👁️</button>
                          )}
                          {revealed[v.id] && (
                            <button className="btn btn-ghost btn-sm" style={{ fontSize: 10, marginLeft: 6 }}
                              onClick={() => setRevealed(p => { const n={...p}; delete n[v.id]; return n; })}>🙈</button>
                          )}
                        </td>
                        <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>{v.description || '—'}</td>
                        <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border)' }}>
                          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => deleteVar(v.id)} style={{ color: 'var(--danger)' }}>🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal" style={{ maxWidth: 480 }}>
            <div className="modal-header">
              <h3 className="modal-title">{editingEnv ? 'Edit Environment' : 'New Environment'}</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <div className="form-group"><label>Nama *</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Staging, UAT, Prod-Mirror" />
            </div>
            <div className="form-row">
              <div className="form-group"><label>Tipe</label>
                <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                  <option value="staging">Staging</option>
                  <option value="uat">UAT</option>
                  <option value="production">Production</option>
                </select>
              </div>
              <div className="form-group"><label>Project (opsional)</label>
                <select value={form.projectId} onChange={e => setForm(p => ({ ...p, projectId: e.target.value }))}>
                  <option value="">Global (semua project)</option>
                  {(projects || []).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group"><label>Base URL</label>
              <input value={form.baseUrl} onChange={e => setForm(p => ({ ...p, baseUrl: e.target.value }))} placeholder="https://staging.example.com" />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Batal</button>
              <button className="btn btn-primary" onClick={saveEnv}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
