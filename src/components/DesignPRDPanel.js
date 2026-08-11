import React, { useState } from 'react';

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

// ─── Storage per project ──────────────────────────────────────────────────────
function loadLinks(projectId) {
  try { return JSON.parse(localStorage.getItem(`design_prd_links_${projectId}`) || '[]'); }
  catch { return []; }
}
function saveLinks(projectId, links) {
  localStorage.setItem(`design_prd_links_${projectId}`, JSON.stringify(links));
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

// ─── Link Card ────────────────────────────────────────────────────────────────
function LinkCard({ link, onDelete, onOpenFigma }) {
  const isFigma = link.figmaUrl?.trim();
  const isPRD = link.prdUrl?.trim();

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 10, background: 'var(--bg-card)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {link.label || 'Untitled'}
          </div>
          {link.note && (
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{link.note}</div>
          )}
        </div>
        <button className="btn btn-ghost btn-icon btn-sm" onClick={onDelete}
          style={{ color: 'var(--danger)', flexShrink: 0 }}>🗑️</button>
      </div>

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

// ─── Add Link Form ────────────────────────────────────────────────────────────
function AddLinkForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({ label: '', prdUrl: '', figmaUrl: '', note: '' });

  function set(k, v) { setForm(p => ({ ...p, [k]: v })); }

  function handleAdd() {
    if (!form.label.trim() && !form.prdUrl.trim() && !form.figmaUrl.trim()) return;
    onAdd({
      id: Date.now(),
      label: form.label.trim() || 'Untitled',
      prdUrl: form.prdUrl.trim(),
      figmaUrl: form.figmaUrl.trim(),
      note: form.note.trim(),
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <div style={{ border: '1px solid rgba(99,102,241,0.4)', borderRadius: 10, background: 'var(--bg-card)', padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
        ➕ Tambah Referensi Design & PRD
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
        <small style={{ color: 'var(--text-muted)', fontSize: 10 }}>
          Copy URL issue Plane langsung dari browser
        </small>
      </div>
      <div className="form-group">
        <label>Link Figma</label>
        <textarea rows={2} value={form.figmaUrl} onChange={e => set('figmaUrl', e.target.value)}
          placeholder="https://www.figma.com/design/...&#10;Bisa paste lebih dari satu URL, satu per baris" />
        <small style={{ color: 'var(--text-muted)', fontSize: 10 }}>
          File harus di-set "Anyone with the link can view" untuk bisa di-preview
        </small>
      </div>
      <div className="form-group">
        <label>Catatan (opsional)</label>
        <input value={form.note} onChange={e => set('note', e.target.value)}
          placeholder="Sprint 23, v2.0, dll" />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-primary btn-sm" onClick={handleAdd}>💾 Simpan</button>
        <button className="btn btn-secondary btn-sm" onClick={onCancel}>Batal</button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DesignPRDPanel({ project }) {
  const [links, setLinks] = useState(() => loadLinks(project?.id));
  const [showForm, setShowForm] = useState(false);
  const [selectedFigma, setSelectedFigma] = useState(null);
  const [search, setSearch] = useState('');

  function handleAdd(link) {
    const updated = [link, ...links];
    setLinks(updated);
    saveLinks(project?.id, updated);
    setShowForm(false);
  }

  function handleDelete(id) {
    const updated = links.filter(l => l.id !== id);
    setLinks(updated);
    saveLinks(project?.id, updated);
  }

  const filtered = search
    ? links.filter(l =>
        l.label?.toLowerCase().includes(search.toLowerCase()) ||
        l.note?.toLowerCase().includes(search.toLowerCase()) ||
        l.prdUrl?.toLowerCase().includes(search.toLowerCase())
      )
    : links;

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
          onClick={() => setShowForm(p => !p)}
          style={{ flexShrink: 0 }}>
          {showForm ? '✕ Batal' : '+ Tambah Link'}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <AddLinkForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />
      )}

      {/* Search */}
      {links.length > 2 && (
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Cari berdasarkan nama atau catatan..."
          style={{ fontSize: 12 }} />
      )}

      {/* Empty state */}
      {links.length === 0 && !showForm && (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border)', borderRadius: 12, fontSize: 13 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📐</div>
          <div style={{ marginBottom: 4 }}>Belum ada referensi design.</div>
          <div style={{ fontSize: 11 }}>Klik "+ Tambah Link" untuk menyimpan link Figma dan PRD.</div>
        </div>
      )}

      {/* Link list */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12 }}>
        {filtered.map(link => (
          <LinkCard
            key={link.id}
            link={link}
            onDelete={() => handleDelete(link.id)}
            onOpenFigma={setSelectedFigma}
          />
        ))}
      </div>

      {/* Figma embed */}
      {selectedFigma && (
        <FigmaEmbed url={selectedFigma} onClose={() => setSelectedFigma(null)} />
      )}
    </div>
  );
}
