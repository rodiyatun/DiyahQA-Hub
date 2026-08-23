import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Search, Filter, Plus, Settings, Folder, Users } from 'lucide-react';
import './ProjectGrid.css';

const GRADIENTS = [
  'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
  'linear-gradient(135deg, #831843 0%, #be185d 100%)',
  'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
  'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
  'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
  'linear-gradient(135deg, #1c1917 0%, #44403c 100%)',
  'linear-gradient(135deg, #312e81 0%, #4f46e5 100%)',
];

const AVATAR_COLORS = ['#38bdf8', '#fb7185', '#a78bfa', '#4ade80', '#fbbf24', '#f97316', '#e879f9'];

function getGradient(id) {
  const idx = typeof id === 'number' ? id : parseInt(String(id).replace(/\D/g, '').slice(0, 5) || '0', 10);
  return GRADIENTS[idx % GRADIENTS.length];
}

function getAvatarColor(id, offset = 0) {
  const idx = typeof id === 'number' ? id : parseInt(String(id).replace(/\D/g, '').slice(0, 5) || '0', 10);
  return AVATAR_COLORS[(idx + offset) % AVATAR_COLORS.length];
}

function getMemberCount(id) {
  const idx = typeof id === 'number' ? id : parseInt(String(id).replace(/\D/g, '').slice(0, 5) || '0', 10);
  return 5 + (idx % 30);
}

export default function ProjectGrid({ projects, onSelectProject, onCreateProject, onMigrateData }) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at_desc');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const SORT_OPTIONS = [
    { value: 'created_at_desc', label: 'Created date (Terbaru)' },
    { value: 'created_at_asc',  label: 'Created date (Terlama)' },
    { value: 'name_asc',        label: 'Name A–Z' },
    { value: 'name_desc',       label: 'Name Z–A' },
  ];

  const sortedFiltered = [...projects]
    .filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name_asc':        return a.name.localeCompare(b.name);
        case 'name_desc':       return b.name.localeCompare(a.name);
        case 'created_at_asc':  return new Date(a.created_at) - new Date(b.created_at);
        case 'created_at_desc':
        default:                return new Date(b.created_at) - new Date(a.created_at);
      }
    });

  const currentSort = SORT_OPTIONS.find(o => o.value === sortBy);

  return (
    <div className="project-grid-view">
      <div className="pg-header">
        <h2 className="pg-title"><Folder size={20}/> {t('sidebar.projects') || 'Projects'}</h2>
        <div className="pg-actions">
          <div className="pg-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setShowSortMenu(v => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Filter size={13} />
              {currentSort?.label || 'Sort'}
            </button>
            {showSortMenu && (
              <div style={{
                position: 'absolute', top: '110%', right: 0, background: 'var(--bg-secondary, #1e293b)',
                border: '1px solid var(--border)', borderRadius: 8, padding: '6px 0',
                minWidth: 200, zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
              }}>
                {SORT_OPTIONS.map(opt => (
                  <button key={opt.value} onClick={() => { setSortBy(opt.value); setShowSortMenu(false); }} style={{
                    display: 'block', width: '100%', padding: '8px 16px', textAlign: 'left',
                    background: sortBy === opt.value ? 'rgba(99,102,241,0.15)' : 'transparent',
                    border: 'none', color: sortBy === opt.value ? '#818cf8' : 'var(--text-primary)', cursor: 'pointer',
                    fontSize: 13,
                  }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="btn btn-primary btn-sm" onClick={onCreateProject}>
            <Plus size={14} /> Add Project
          </button>
        </div>
      </div>

      {sortedFiltered.length === 0 ? (
        <div className="pg-empty">
          <Folder size={48} style={{ color: 'var(--text-muted)', marginBottom: 16 }} />
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Belum ada project</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Buat project pertama Anda dengan klik "+ Add Project"</p>
          <div style={{ display: 'flex', gap: '12px', marginTop: 16, justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={onCreateProject}>
              <Plus size={14} /> Add Project
            </button>
          </div>
        </div>
      ) : (
        <div className="pg-grid">
          {sortedFiltered.map((p) => {
            const gradient = getGradient(p.id);
            const memberCount = getMemberCount(p.id);
            const initials = p.name.substring(0, 2).toUpperCase();

            return (
              <div
                className="pg-card"
                key={p.id}
                onClick={() => onSelectProject(p)}
              >
                <div className="pg-card-top" style={{ background: gradient }}>
                  <div className="pg-card-overlay">
                    <div className="pg-card-header">
                      <div className="pg-card-icon-wrapper">
                        <div className="pg-card-dot" style={{ background: getAvatarColor(p.id) }} />
                      </div>
                      <div className="pg-card-title-area">
                        <h3 className="pg-card-name">{p.name}</h3>
                        <span className="pg-card-subtitle">{initials}</span>
                      </div>
                    </div>
                    {p.description && (
                      <p className="pg-card-description">{p.description}</p>
                    )}
                  </div>
                </div>

                <div className="pg-card-bottom">
                  <div className="pg-card-date">
                    Created on {new Date(p.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="pg-card-footer">
                    <div className="pg-avatars">
                      <div className="pg-avatar" style={{ background: getAvatarColor(p.id, 0) }}>
                        {p.name.charAt(0)}
                      </div>
                      <div className="pg-avatar" style={{ background: getAvatarColor(p.id, 1) }}>
                        R
                      </div>
                      <div className="pg-avatar-count">+{memberCount}</div>
                    </div>
                    <div className="pg-join-btn">
                      <button
                        className="btn-join"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(p);
                        }}
                      >
                        Open
                      </button>
                      <button
                        className="pg-icon-btn-sm"
                        title="Settings"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(p);
                        }}
                      >
                        <Settings size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
