import React, { useState, useEffect, useRef } from 'react';

const CATEGORIES = [
  { id: 'general',   label: '📄 General' },
  { id: 'strategy',  label: '🎯 Test Strategy' },
  { id: 'sop',       label: '📋 SOP' },
  { id: 'checklist', label: '✅ Checklist' },
  { id: 'onboarding',label: '🎓 Onboarding' },
  { id: 'notes',     label: '📝 Meeting Notes' },
];

function SimpleMarkdown({ content }) {
  const render = (text) =>
    text
      .replace(/^### (.+)$/gm, '<h3 style="color:var(--text-primary);margin:12px 0 6px;font-size:14px">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 style="color:var(--text-primary);margin:16px 0 8px;font-size:16px">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 style="color:var(--text-primary);margin:20px 0 10px;font-size:20px">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code style="background:#0f172a;padding:1px 5px;border-radius:3px;font-family:monospace;font-size:12px;color:#94a3b8">$1</code>')
      .replace(/^- (.+)$/gm, '<li style="margin:3px 0;color:var(--text-secondary)">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li style="margin:3px 0;color:var(--text-secondary)">$2</li>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  return <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: render(content || '') }} />;
}

export default function DocLabPage({ projects }) {
  const [docs, setDocs]           = useState([]);
  const [selected, setSelected]   = useState(null);
  const [editing, setEditing]     = useState(false);
  const [content, setContent]     = useState('');
  const [dirty, setDirty]         = useState(false);
  const [search, setSearch]       = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [filterProj, setFilterProj] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm]           = useState({ title:'', category:'general', projectId:'', tags:'' });
  const [versions, setVersions]   = useState([]);
  const [showVersions, setShowVersions] = useState(false);
  const searchTimer = useRef(null);

  useEffect(() => {
    if (search) {
      clearTimeout(searchTimer.current);
      searchTimer.current = setTimeout(() => searchDocs(), 300);
    } else {
      load();
    }
  }, [search, filterCat, filterProj]);

  async function load() {
    const params = {};
    if (filterProj) params.projectId = filterProj;
    if (filterCat)  params.category  = filterCat;
    const data = await window.api.getDocuments(params);
    setDocs(data || []);
  }
  async function searchDocs() {
    const data = await window.api.searchDocuments(search);
    setDocs(data || []);
  }
  async function openDoc(doc) {
    const full = await window.api.getDocument(doc.id);
    setSelected(full); setContent(full.content || ''); setEditing(false); setDirty(false);
  }
  async function saveDoc() {
    await window.api.updateDocument({ id: selected.id, title: selected.title, content, category: selected.category, tags: selected.tags });
    setDirty(false); setEditing(false);
    await load();
    setSelected({ ...selected, content, version: selected.version + 1 });
  }
  async function createDoc() {
    if (!form.title.trim()) return alert('Title wajib diisi');
    const doc = await window.api.createDocument({ projectId: form.projectId || null, category: form.category, title: form.title, content: '', tags: form.tags });
    setShowCreate(false); setForm({ title:'', category:'general', projectId:'', tags:'' });
    await load();
    openDoc(doc);
  }
  async function deleteDoc(id) {
    if (!window.confirm('Hapus dokumen ini?')) return;
    await window.api.deleteDocument(id);
    if (selected?.id === id) { setSelected(null); setContent(''); }
    await load();
  }
  async function loadVersions() {
    const v = await window.api.getDocumentVersions(selected.id);
    setVersions(v || []);
    setShowVersions(true);
  }

  const projName = (id) => id ? (projects.find(p => p.id === Number(id))?.name || 'Unknown') : 'Global';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Documentation Lab</h1>
          <p className="page-subtitle">Test strategy, SOP, checklist, dan dokumen QA dalam satu tempat</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowCreate(true)}>+ New Document</button>
      </div>

      <div style={{ display: 'flex', gap: 16, minHeight: 0, height: 'calc(100vh - 200px)' }}>
        {/* Sidebar */}
        <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Cari dokumen..." style={{ fontSize: 12 }} />
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ fontSize: 12 }}>
            <option value="">All Category</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <select value={filterProj} onChange={e => setFilterProj(e.target.value)} style={{ fontSize: 12 }}>
            <option value="">All Projects</option>
            {(projects||[]).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>

          <div style={{ flex: 1, overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 10, background: 'var(--bg-card)' }}>
            {docs.length === 0 && <div style={{ padding: '20px', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>Tidak ada dokumen</div>}
            {docs.map(doc => (
              <div key={doc.id}
                style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', cursor: 'pointer', background: selected?.id === doc.id ? 'rgba(99,102,241,0.08)' : 'transparent', transition: 'background 0.1s' }}
                onClick={() => openDoc(doc)}>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.title}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 3 }}>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{CATEGORIES.find(c => c.id === doc.category)?.label || doc.category}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>·</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{projName(doc.project_id)}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 'auto' }}>v{doc.version}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', background: 'var(--bg-card)' }}>
          {!selected ? (
            <div style={{ padding: '80px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
              Pilih dokumen di sebelah kiri atau buat dokumen baru
            </div>
          ) : (
            <>
              {/* Toolbar */}
              <div style={{ padding: '10px 16px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{selected.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {CATEGORIES.find(c => c.id === selected.category)?.label} · {projName(selected.project_id)} · v{selected.version}
                    {dirty && <span style={{ color: '#f59e0b', marginLeft: 6 }}>● unsaved</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }} onClick={loadVersions}>📜 History</button>
                  {editing
                    ? <>
                        <button className="btn btn-secondary btn-sm" onClick={() => { setEditing(false); setContent(selected.content || ''); setDirty(false); }}>Batal</button>
                        <button className="btn btn-primary btn-sm" onClick={saveDoc} disabled={!dirty}>💾 Simpan</button>
                      </>
                    : <button className="btn btn-primary btn-sm" onClick={() => setEditing(true)}>✏️ Edit</button>
                  }
                  <button className="btn btn-ghost btn-icon btn-sm" onClick={() => deleteDoc(selected.id)} style={{ color: 'var(--danger)' }}>🗑️</button>
                </div>
              </div>

              {/* Editor / Preview */}
              <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
                {editing ? (
                  <textarea
                    value={content}
                    onChange={e => { setContent(e.target.value); setDirty(true); }}
                    onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); saveDoc(); } }}
                    style={{ flex: 1, padding: 20, background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: 13, border: 'none', outline: 'none', resize: 'none', lineHeight: 1.7 }}
                    placeholder={'# Judul Dokumen\n\n## Section 1\n\nTulis konten di sini menggunakan Markdown...\n\n- Item list\n- Item lain\n\n**Bold** dan *italic* tersedia'}
                    spellCheck={false}
                  />
                ) : (
                  <div style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
                    {content ? <SimpleMarkdown content={content} /> : (
                      <div style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', marginTop: 40 }}>
                        Dokumen kosong. Klik "✏️ Edit" untuk mulai menulis.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Versions modal */}
      {showVersions && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowVersions(false)}>
          <div className="modal" style={{ maxWidth: 520 }}>
            <div className="modal-header">
              <h3 className="modal-title">📜 Version History — {selected?.title}</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowVersions(false)}>✕</button>
            </div>
            {versions.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>Belum ada history</div>
            ) : (
              <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                {versions.map(v => (
                  <div key={v.id} style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>Version {v.version_number}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{new Date(v.saved_at).toLocaleString('id-ID')}</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', maxHeight: 40 }}>{v.content_snapshot?.slice(0, 120)}...</div>
                    <button className="btn btn-ghost btn-sm" style={{ fontSize: 11, marginTop: 4 }}
                      onClick={() => { setContent(v.content_snapshot || ''); setEditing(true); setDirty(true); setShowVersions(false); }}>
                      ↩️ Restore versi ini
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowCreate(false)}>
          <div className="modal" style={{ maxWidth: 480 }}>
            <div className="modal-header">
              <h3 className="modal-title">New Document</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowCreate(false)}>✕</button>
            </div>
            <div className="form-group"><label>Judul *</label>
              <input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="Test Strategy v2.0" />
            </div>
            <div className="form-row">
              <div className="form-group"><label>Kategori</label>
                <select value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))}>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Project (opsional)</label>
                <select value={form.projectId} onChange={e => setForm(p => ({...p, projectId: e.target.value}))}>
                  <option value="">Global</option>
                  {(projects||[]).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group"><label>Tags</label>
              <input value={form.tags} onChange={e => setForm(p => ({...p, tags: e.target.value}))} placeholder="strategy, regression, smoke" />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Batal</button>
              <button className="btn btn-primary" onClick={createDoc}>Buat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
