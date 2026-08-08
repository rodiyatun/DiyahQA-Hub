import React, { useState, useEffect } from 'react';

export default function TCLibraryPage({ projects, selectedProject }) {
  const [items, setItems]         = useState([]);
  const [tags, setTags]           = useState([]);
  const [search, setSearch]       = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [showForm, setShowForm]   = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState({ title:'', module:'', section:'', scenario:'', expected_result:'', tags:[] });
  const [tagInput, setTagInput]   = useState('');
  const [importing, setImporting] = useState(false);
  const [importTarget, setImportTarget] = useState(selectedProject?.id || '');
  const [selected, setSelected]   = useState([]);

  useEffect(() => { load(); loadTags(); }, [search, filterTag]);

  async function load() {
    const data = await window.api.getTcLibrary({ search: search || undefined, tag: filterTag || undefined });
    setItems(data || []);
  }
  async function loadTags() {
    const t = await window.api.getLibraryTags();
    setTags(t || []);
  }

  async function save() {
    if (!form.title.trim()) return alert('Title wajib diisi');
    if (editing) {
      await window.api.updateTcLibraryItem({ id: editing.id, ...form });
    } else {
      await window.api.createTcLibraryItem(form);
    }
    setShowForm(false); setEditing(null); setForm({ title:'', module:'', section:'', scenario:'', expected_result:'', tags:[] });
    await load(); await loadTags();
  }

  async function deleteItem(id) {
    if (!window.confirm('Hapus template ini?')) return;
    await window.api.deleteTcLibraryItem(id);
    await load();
  }

  async function handleImport() {
    if (!importTarget) return alert('Pilih project tujuan');
    if (selected.length === 0) return alert('Pilih minimal 1 template');
    const result = await window.api.importFromLibrary({ projectId: Number(importTarget), libraryItemIds: selected });
    setImporting(false); setSelected([]);
    alert(`✅ ${result.length} test case berhasil diimport ke project!`);
    await load();
  }

  function startEdit(item) {
    let parsedTags = [];
    try { parsedTags = JSON.parse(item.tags || '[]'); } catch {}
    setEditing(item);
    setForm({ title: item.title, module: item.module||'', section: item.section||'', scenario: item.scenario||'', expected_result: item.expected_result||'', tags: parsedTags });
    setShowForm(true);
  }

  function addTag() {
    const t = tagInput.trim().toLowerCase();
    if (t && !form.tags.includes(t)) setForm(p => ({ ...p, tags: [...p.tags, t] }));
    setTagInput('');
  }
  function removeTag(t) { setForm(p => ({ ...p, tags: p.tags.filter(x => x !== t) })); }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">TC Library</h1>
          <p className="page-subtitle">Template test case reusable — import ke project tanpa tulis ulang</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {selected.length > 0 && (
            <button className="btn btn-secondary btn-sm" onClick={() => setImporting(true)}>📥 Import {selected.length} ke Project</button>
          )}
          <button className="btn btn-primary btn-sm" onClick={() => { setEditing(null); setForm({ title:'',module:'',section:'',scenario:'',expected_result:'',tags:[] }); setShowForm(true); }}>+ Tambah Template</button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search template..." style={{ fontSize: 12, width: 220 }} />
        <button className={`env-tab-btn ${!filterTag ? 'active' : ''}`} onClick={() => setFilterTag('')} style={!filterTag ? { borderColor: '#6366f1', color: '#6366f1' } : {}}>All</button>
        {tags.map(t => (
          <button key={t} className={`env-tab-btn ${filterTag === t ? 'active' : ''}`}
            style={filterTag === t ? { borderColor: '#6366f1', color: '#6366f1' } : {}}
            onClick={() => setFilterTag(filterTag === t ? '' : t)}>#{t}</button>
        ))}
        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>{items.length} template</span>
      </div>

      {items.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border)', borderRadius: 12, fontSize: 13 }}>
          Belum ada template. Klik "+ Tambah Template" untuk mulai.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 10 }}>
        {items.map(item => {
          let parsedTags = [];
          try { parsedTags = JSON.parse(item.tags || '[]'); } catch {}
          const isSelected = selected.includes(item.id);
          return (
            <div key={item.id}
              style={{ border: `1px solid ${isSelected ? '#6366f1' : 'var(--border)'}`, borderRadius: 10, background: isSelected ? 'rgba(99,102,241,0.05)' : 'var(--bg-card)', padding: 14, transition: 'all 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                  <input type="checkbox" checked={isSelected}
                    onChange={() => setSelected(p => isSelected ? p.filter(i => i !== item.id) : [...p, item.id])}
                    style={{ width: 'auto', flexShrink: 0, cursor: 'pointer' }} />
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                </div>
                <div style={{ display: 'flex', gap: 4, flexShrink: 0, marginLeft: 8 }}>
                  <button className="btn btn-ghost btn-icon btn-sm" onClick={() => startEdit(item)}>✏️</button>
                  <button className="btn btn-ghost btn-icon btn-sm" onClick={() => deleteItem(item.id)} style={{ color: 'var(--danger)' }}>🗑️</button>
                </div>
              </div>
              {item.module && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>📁 {item.module}{item.section ? ' › ' + item.section : ''}</div>}
              {item.scenario && <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6, overflow: 'hidden', maxHeight: 40, lineHeight: 1.5 }}>{item.scenario.slice(0, 100)}{item.scenario.length > 100 ? '...' : ''}</div>}
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                {parsedTags.map(t => <span key={t} style={{ fontSize: 10, padding: '1px 6px', borderRadius: 10, background: 'rgba(99,102,241,0.12)', color: '#6366f1' }}>#{t}</span>)}
                <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 'auto' }}>🔁 {item.usage_count}x dipakai</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Import modal */}
      {importing && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setImporting(false)}>
          <div className="modal" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 className="modal-title">Import {selected.length} Template ke Project</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setImporting(false)}>✕</button>
            </div>
            <div className="form-group"><label>Pilih Project Tujuan</label>
              <select value={importTarget} onChange={e => setImportTarget(e.target.value)}>
                <option value="">— Pilih Project —</option>
                {(projects||[]).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
              Template akan di-clone (copy) ke project — bisa dikustomisasi tanpa mengubah library.
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setImporting(false)}>Batal</button>
              <button className="btn btn-primary" onClick={handleImport}>📥 Import</button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit modal */}
      {showForm && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal" style={{ maxWidth: 560 }}>
            <div className="modal-header">
              <h3 className="modal-title">{editing ? 'Edit Template' : 'Tambah Template'}</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: 4 }}>
              <div className="form-group"><label>Title *</label>
                <input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="Login dengan kredensial valid" />
              </div>
              <div className="form-row">
                <div className="form-group"><label>Module</label>
                  <input value={form.module} onChange={e => setForm(p => ({...p, module: e.target.value}))} placeholder="Authentication" />
                </div>
                <div className="form-group"><label>Section</label>
                  <input value={form.section} onChange={e => setForm(p => ({...p, section: e.target.value}))} placeholder="Login" />
                </div>
              </div>
              <div className="form-group"><label>Skenario / Langkah</label>
                <textarea rows={4} value={form.scenario} onChange={e => setForm(p => ({...p, scenario: e.target.value}))}
                  placeholder={"1. Buka halaman login\n2. Isi email valid\n3. Isi password valid\n4. Klik Login"} />
              </div>
              <div className="form-group"><label>Expected Result</label>
                <textarea rows={2} value={form.expected_result} onChange={e => setForm(p => ({...p, expected_result: e.target.value}))} placeholder="User berhasil login dan redirect ke dashboard" />
              </div>
              <div className="form-group">
                <label>Tags</label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
                  {form.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: 'rgba(99,102,241,0.12)', color: '#6366f1', cursor: 'pointer' }}
                      onClick={() => removeTag(t)}>#{t} ✕</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <input value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="auth, login, smoke..."
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} style={{ fontSize: 12 }} />
                  <button className="btn btn-secondary btn-sm" onClick={addTag}>+</button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Batal</button>
              <button className="btn btn-primary" onClick={save}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
