import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// ─── Extract Figma URL dari teks ──────────────────────────────────────────────
function extractFigmaUrls(text) {
  if (!text) return [];
  const regex = /https:\/\/(?:www\.)?figma\.com\/(?:design|file|proto)\/[^\s"')>\n]+/g;
  const found = text.match(regex) || [];
  return [...new Set(found)];
}

function toFigmaEmbedUrl(url) {
  return `https://www.figma.com/embed?embed_host=diyahqa&url=${encodeURIComponent(url)}`;
}

// ─── Figma fullscreen embed ───────────────────────────────────────────────────
function FigmaEmbed({ url, onClose }) {
  const [error, setError] = useState(false);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: 'var(--bg-secondary)', flexShrink: 0 }}>
        <span style={{ fontSize: 16 }}>🎨</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Figma Preview
        </span>
        <a href={url} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 12, color: '#6366f1', textDecoration: 'none', flexShrink: 0 }}>
          🔗 Buka di Browser
        </a>
        <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        {error && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ fontSize: 32 }}>⚠️</div>
            <div style={{ fontSize: 13, color: '#f59e0b' }}>Figma tidak bisa dimuat di dalam app</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 320 }}>
              File mungkin private. Set ke "Anyone with the link can view" di Figma, atau buka di browser.
            </div>
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              🔗 Buka di Browser
            </a>
          </div>
        )}
        {!error && (
          <iframe
            src={toFigmaEmbedUrl(url)}
            style={{ width: '100%', height: '100%', border: 'none' }}
            onError={() => setError(true)}
            title="Figma Preview"
            allow="clipboard-write"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
          />
        )}
      </div>
    </div>
  );
}

// ─── Diff Modal ───────────────────────────────────────────────────────────────
function DiffModal({ link, histories, onClose }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 700, width: '100%', maxHeight: '90vh' }}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Riwayat Perubahan (Sejak Terakhir Dilihat)</h2>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0' }}>{link.label}</p>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <div style={{ padding: 16, overflowY: 'auto', maxHeight: 'calc(90vh - 120px)' }}>
          {histories.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 20 }}>Tidak ada riwayat perubahan.</div>
          ) : (
            histories.map(h => (
              <div key={h.id} style={{ marginBottom: 20, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '8px 12px', fontSize: 12, fontWeight: 600, borderBottom: '1px solid var(--border)' }}>
                  Tanggal: {new Date(h.changed_at).toLocaleString('id-ID')}
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-card)' }}>
                      <th style={{ padding: 8, borderBottom: '1px solid var(--border)', textAlign: 'left', width: '20%' }}>Field</th>
                      <th style={{ padding: 8, borderBottom: '1px solid var(--border)', borderLeft: '1px solid var(--border)', textAlign: 'left', width: '40%' }}>Data Lama</th>
                      <th style={{ padding: 8, borderBottom: '1px solid var(--border)', borderLeft: '1px solid var(--border)', textAlign: 'left', width: '40%' }}>Data Baru</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(h.diff).map(([key, value]) => (
                      <tr key={key}>
                        <td style={{ padding: '10px 8px', borderBottom: '1px solid var(--border)', fontWeight: 600, color: 'var(--text-muted)' }}>
                          {key === 'label' ? 'Nama Fitur' : key === 'prdUrl' ? 'Link PRD' : key === 'figmaUrl' ? 'Link Figma' : 'Catatan'}
                        </td>
                        <td style={{ padding: '10px 8px', borderBottom: '1px solid var(--border)', borderLeft: '1px solid var(--border)', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', wordBreak: 'break-all' }}>
                          <del>{value.old || '-'}</del>
                        </td>
                        <td style={{ padding: '10px 8px', borderBottom: '1px solid var(--border)', borderLeft: '1px solid var(--border)', background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', wordBreak: 'break-all' }}>
                          {value.new || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>✓ Tandai Telah Dibaca & Tutup</button>
        </div>
      </div>
    </div>
  );
}

// ─── Link Card ────────────────────────────────────────────────────────────────
function LinkCard({ link, isUpdated, onEdit, onDelete, onOpenFigma, onOpenDiff }) {
  const isFigma = link.figmaUrl?.trim();
  const isPRD = link.prdUrl?.trim();

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 10, background: 'var(--bg-card)', overflow: 'hidden', position: 'relative' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {link.label || 'Untitled'}
            </div>
          </div>
          {link.note && (
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{link.note}</div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={onEdit} title="Edit">✏️</button>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={onDelete} title="Hapus" style={{ color: 'var(--danger)' }}>🗑️</button>
        </div>
      </div>

      {isUpdated && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '6px 14px', borderBottom: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: '#f87171', fontWeight: 600 }}>🔴 Diperbarui</span>
          <button onClick={onOpenDiff} style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: 11, cursor: 'pointer', padding: 0 }}>
            Lihat Perubahan
          </button>
        </div>
      )}

      <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* PRD link */}
        {isPRD && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', flexShrink: 0, width: 40 }}>PRD</span>
            <a href={link.prdUrl} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, color: '#6366f1', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
              🔗 {link.prdUrl.slice(0, 60)}{link.prdUrl.length > 60 ? '...' : ''}
            </a>
          </div>
        )}

        {/* Figma links */}
        {isFigma && extractFigmaUrls(link.figmaUrl).map((furl, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6', flexShrink: 0, width: 40 }}>Figma</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                {furl.slice(0, 55)}{furl.length > 55 ? '...' : ''}
              </span>
              <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                <button className="btn btn-primary btn-sm" style={{ fontSize: 10 }}
                  onClick={() => onOpenFigma(furl)}>👁️ Preview</button>
                <a href={furl} target="_blank" rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm" style={{ fontSize: 10, textDecoration: 'none' }}>🔗</a>
              </div>
            </div>
            {/* Figma thumbnail */}
            <div style={{ height: 140, borderRadius: 8, overflow: 'hidden', background: '#0f172a', cursor: 'pointer', position: 'relative' }}
              onClick={() => onOpenFigma(furl)}>
              <iframe
                src={toFigmaEmbedUrl(furl)}
                style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
                title={`Figma ${i + 1}`}
                sandbox="allow-same-origin allow-scripts"
              />
              <div style={{ position: 'absolute', inset: 0 }} onClick={() => onOpenFigma(furl)} />
            </div>
          </div>
        ))}

        {!isPRD && !isFigma && (
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Tidak ada link.</div>
        )}
      </div>
    </div>
  );
}

// ─── Add/Edit Link Form ───────────────────────────────────────────────────────
function AddLinkForm({ onSave, onCancel, initialData }) {
  const [form, setForm] = useState(initialData || { label: '', prdUrl: '', figmaUrl: '', note: '' });

  function set(k, v) { setForm(p => ({ ...p, [k]: v })); }

  function handleSave() {
    if (!form.label.trim() && !form.prdUrl.trim() && !form.figmaUrl.trim()) return;
    onSave({
      id: initialData?.id ? String(initialData.id) : String(Date.now()),
      label: form.label.trim() || 'Untitled',
      prdUrl: form.prdUrl.trim(),
      figmaUrl: form.figmaUrl.trim(),
      note: form.note.trim(),
    });
  }

  return (
    <div style={{ border: '1px solid rgba(99,102,241,0.4)', borderRadius: 10, background: 'var(--bg-card)', padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
        {initialData ? '✏️ Edit Referensi Design & PRD' : '➕ Tambah Referensi Design & PRD'}
      </div>
      <div className="form-group">
        <label>Label / Nama Fitur *</label>
        <input value={form.label} onChange={e => set('label', e.target.value)}
          placeholder="contoh: CV Form Candidate, Login Flow" />
      </div>
      <div className="form-group">
        <label>Link PRD (Plane Issue URL)</label>
        <input value={form.prdUrl} onChange={e => set('prdUrl', e.target.value)}
          placeholder="https://workspace.jobseeker.company/jsc/browse/TECHS-4854/" />
      </div>
      <div className="form-group">
        <label>Link Figma</label>
        <textarea rows={2} value={form.figmaUrl} onChange={e => set('figmaUrl', e.target.value)}
          placeholder="https://www.figma.com/design/...&#10;Bisa paste lebih dari satu URL, satu per baris" />
      </div>
      <div className="form-group">
        <label>Catatan (opsional)</label>
        <input value={form.note} onChange={e => set('note', e.target.value)}
          placeholder="Sprint 23, v2.0, dll" />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-primary btn-sm" onClick={handleSave}>💾 Simpan</button>
        <button className="btn btn-secondary btn-sm" onClick={onCancel}>Batal</button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DesignPRDPanel({ project }) {
  const [data, setData] = useState({ links: [], history: [] });
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [selectedFigma, setSelectedFigma] = useState(null);
  const [diffModalLink, setDiffModalLink] = useState(null);
  const [search, setSearch] = useState('');
  const [lastViewed, setLastViewed] = useState(Date.now());

  const lastViewedKey = `design_prd_last_viewed_${project?.id || 'default'}`;

  useEffect(() => {
    // Load last viewed timestamp
    const storedLV = localStorage.getItem(lastViewedKey);
    const lvTime = storedLV ? parseInt(storedLV, 10) : Date.now();
    setLastViewed(lvTime);
    localStorage.setItem(lastViewedKey, Date.now().toString());

    if (!project?.id) return;

    // Load Design & PRD links from Supabase
    supabase
      .from('design_prd_links')
      .select('*')
      .eq('project_id', project.id)
      .order('created_at', { ascending: false })
      .then(({ data: rows, error }) => {
        if (error) { console.error('Error loading design links:', error.message); return; }
        const links = (rows || []).map(r => ({
          id: r.id,
          label: r.label,
          figmaUrl: r.figma_url,
          prdUrl: r.prd_url,
          note: r.note,
          updated_at: r.updated_at,
        }));
        setData({ links, history: [] });
      });
  }, [project]);

  function handleSaveLink(newLink) {
    const updatedLinks = [...data.links];
    const updatedHistory = [...data.history];
    const existingIdx = updatedLinks.findIndex(l => l.id === newLink.id);
    
    const nowIso = new Date().toISOString();
    
    if (existingIdx >= 0) {
      const oldLink = updatedLinks[existingIdx];
      const diff = {};
      if (oldLink.prdUrl !== newLink.prdUrl) diff.prdUrl = { old: oldLink.prdUrl, new: newLink.prdUrl };
      if (oldLink.figmaUrl !== newLink.figmaUrl) diff.figmaUrl = { old: oldLink.figmaUrl, new: newLink.figmaUrl };
      if (oldLink.label !== newLink.label) diff.label = { old: oldLink.label, new: newLink.label };
      if (oldLink.note !== newLink.note) diff.note = { old: oldLink.note, new: newLink.note };
      
      if (Object.keys(diff).length > 0) {
        newLink.updated_at = nowIso;
        updatedHistory.unshift({
          id: 'hist_' + Date.now(),
          link_id: newLink.id,
          changed_at: nowIso,
          diff
        });
      } else {
        newLink.updated_at = oldLink.updated_at || nowIso;
      }
      updatedLinks[existingIdx] = newLink;
    } else {
      newLink.updated_at = nowIso;
      updatedLinks.unshift(newLink);
    }
    
    const newData = { links: updatedLinks, history: updatedHistory };
    setData(newData);

    // Save to Supabase
    if (project?.id) {
      const supabaseRow = {
        id: newLink.id,
        project_id: project.id,
        label: newLink.label,
        figma_url: newLink.figmaUrl || null,
        prd_url: newLink.prdUrl || null,
        note: newLink.note || null,
        updated_at: new Date().toISOString(),
      };
      supabase.from('design_prd_links').upsert(supabaseRow, { onConflict: 'id' })
        .then(({ error }) => { if (error) console.error('Error saving design link:', error.message); });
    }

    setShowForm(false);
    setEditingLink(null);
  }

  function handleDelete(id) {
    if (!window.confirm('Hapus link ini?')) return;
    const updatedLinks = data.links.filter(l => l.id !== id);
    setData({ links: updatedLinks, history: data.history });

    // Delete from Supabase
    if (project?.id) {
      supabase.from('design_prd_links').delete().eq('id', id)
        .then(({ error }) => { if (error) console.error('Error deleting design link:', error.message); });
    }
  }

  function handleOpenDiff(link) {
    setDiffModalLink(link);
    // Update last viewed so it clears the badge after viewing
    const now = Date.now();
    setLastViewed(now);
    localStorage.setItem(lastViewedKey, now.toString());
  }

  const filtered = search
    ? data.links.filter(l =>
        l.label?.toLowerCase().includes(search.toLowerCase()) ||
        l.note?.toLowerCase().includes(search.toLowerCase()) ||
        l.prdUrl?.toLowerCase().includes(search.toLowerCase())
      )
    : data.links;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            📐 Design & PRD
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '3px 0 0' }}>
            Simpan link Figma dan PRD per fitur untuk project ini
          </p>
        </div>
        <button className="btn btn-primary btn-sm"
          onClick={() => { setShowForm(p => !p); setEditingLink(null); }}
          style={{ flexShrink: 0 }}>
          {showForm ? '✕ Batal' : '+ Tambah Link'}
        </button>
      </div>

      {/* Add / Edit form */}
      {(showForm || editingLink) && (
        <AddLinkForm 
          initialData={editingLink}
          onSave={handleSaveLink} 
          onCancel={() => { setShowForm(false); setEditingLink(null); }} 
        />
      )}

      {/* Search */}
      {data.links.length > 2 && (
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Cari berdasarkan nama atau catatan..."
          style={{ fontSize: 12 }} />
      )}

      {/* Empty state */}
      {data.links.length === 0 && !showForm && !editingLink && (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border)', borderRadius: 12, fontSize: 13 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📐</div>
          <div style={{ marginBottom: 4 }}>Belum ada referensi design.</div>
          <div style={{ fontSize: 11 }}>Klik "+ Tambah Link" untuk menyimpan link Figma dan PRD.</div>
        </div>
      )}

      {/* Link list */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12 }}>
        {filtered.map(link => {
          const linkTime = link.updated_at ? new Date(link.updated_at).getTime() : 0;
          const isUpdated = linkTime > lastViewed;
          
          return (
            <LinkCard
              key={link.id}
              link={link}
              isUpdated={isUpdated}
              onEdit={() => { setEditingLink(link); setShowForm(false); }}
              onDelete={() => handleDelete(link.id)}
              onOpenFigma={setSelectedFigma}
              onOpenDiff={() => handleOpenDiff(link)}
            />
          );
        })}
      </div>

      {/* Figma embed */}
      {selectedFigma && (
        <FigmaEmbed url={selectedFigma} onClose={() => setSelectedFigma(null)} />
      )}
      
      {/* Diff Modal */}
      {diffModalLink && (
        <DiffModal 
          link={diffModalLink} 
          histories={data.history.filter(h => h.link_id === diffModalLink.id)} 
          onClose={() => setDiffModalLink(null)} 
        />
      )}
    </div>
  );
}
