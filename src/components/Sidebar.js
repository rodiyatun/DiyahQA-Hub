import { useState } from 'react';
import './Sidebar.css';

// SVG icon minimalis — stroke-based, tidak ada emoji
const Icon = ({ d, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const NAV_ITEMS = [
  { view: 'dashboard',      label: 'Dashboard',        d: 'M2 2h5v5H2zm7 0h5v5H9zM2 9h5v5H2zm7 0h5v5H9z' },
  { view: 'bugreports',     label: 'Bug Reports',       d: 'M6 2a2 2 0 00-2 2v1H2l1 9h10l1-9h-2V4a2 2 0 00-2-2H6zm2 7a1 1 0 110 2 1 1 0 010-2z' },
  { view: 'sqllab',         label: 'SQL Lab',           d: 'M2 5c0-1.1 2.7-2 6-2s6 .9 6 2v6c0 1.1-2.7 2-6 2s-6-.9-6-2V5zm0 3c0 1.1 2.7 2 6 2s6-.9 6-2' },
  { view: 'securitylab',    label: 'Security Lab',      d: 'M8 1L2 4v4c0 3.3 2.5 6.4 6 7 3.5-.6 6-3.7 6-7V4L8 1z' },
  { view: 'performancelab', label: 'Performance Lab',   d: 'M13 8A5 5 0 113 8m5-5v5l3 2' },
  { view: 'cicdlab',        label: 'CI/CD Lab',         d: 'M5 3l-3 5 3 5m6-10l3 5-3 5M9 3l-2 10' },
  { view: 'apilab',         label: 'API Lab',           d: 'M10 3l3 3-3 3M6 9l-3 3 3 3m1-9l-2 9' },
  { view: 'automationlab',  label: 'Automation Lab',    d: 'M4 4h8v8H4zM6 7h4M8 5v6' },
];

const QA_ITEMS = [
  { view: 'environments',   label: 'Environments',      d: 'M8 1a7 7 0 100 14A7 7 0 008 1zm0 0c-2 0-3.5 3-3.5 7S6 15 8 15s3.5-3 3.5-7S10 1 8 1zM1 8h14' },
  { view: 'testplans',      label: 'Test Plans',        d: 'M4 3h8a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm2 3h4M6 9h4M6 12h2' },
  { view: 'requirements',   label: 'Requirements',      d: 'M5 5h6M5 8h6M5 11h3M3 2h10a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z' },
  { view: 'tclibrary',      label: 'TC Library',        d: 'M3 3h10v10H3zm2 3h6M5 9h4M5 12h2' },
  { view: 'doclab',         label: 'Doc Lab',           d: 'M4 2h5l4 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1zm5 0v4h4M6 9h4M6 12h2' },
];

export default function Sidebar({
  projects, selectedProject, view,
  onSelectDashboard, onSelectBugReports, onSelectSQLLab, onSelectSecurityLab,
  onSelectPerformanceLab, onSelectCICDLab, onSelectAPILab, onSelectAutomationLab,
  onSelectEnvironments, onSelectTestPlans, onSelectRequirements, onSelectTCLibrary, onSelectDocLab,
  onSelectProject, onNewProject, onEditProject, onDeleteProject, onOpenCredentials,
}) {
  const [hoveredProject, setHoveredProject] = useState(null);

  const handlers = {
    dashboard:      onSelectDashboard,
    bugreports:     onSelectBugReports,
    sqllab:         onSelectSQLLab,
    securitylab:    onSelectSecurityLab,
    performancelab: onSelectPerformanceLab,
    cicdlab:        onSelectCICDLab,
    apilab:         onSelectAPILab,
    automationlab:  onSelectAutomationLab,
    environments:   onSelectEnvironments,
    testplans:      onSelectTestPlans,
    requirements:   onSelectRequirements,
    tclibrary:      onSelectTCLibrary,
    doclab:         onSelectDocLab,
  };

  const isActive = (v) =>
    v === 'dashboard' ? (view === 'dashboard' && !selectedProject) : view === v;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: 'var(--accent)', flexShrink: 0 }}>
          <circle cx="6.5" cy="6.5" r="4.5" />
          <path d="M11 11l3.5 3.5" />
        </svg>
        <span className="logo-text">DiyahQA Hub</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.view}
            className={`nav-item ${isActive(item.view) ? 'active' : ''}`}
            onClick={handlers[item.view]}
          >
            <span className="nav-icon"><Icon d={item.d} /></span>
            <span>{item.label}</span>
          </button>
        ))}

        <div style={{ margin: '10px 12px 4px', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          QA Management
        </div>

        {QA_ITEMS.map(item => (
          <button
            key={item.view}
            className={`nav-item ${isActive(item.view) ? 'active' : ''}`}
            onClick={handlers[item.view]}
          >
            <span className="nav-icon"><Icon d={item.d} /></span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-section">
        <div className="section-header">
          <span className="section-title">PROJECTS</span>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={onNewProject} title="New Project"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 1v10M1 6h10" />
            </svg>
          </button>
        </div>

        <div className="project-list">
          {projects.length === 0 && (
            <div className="empty-projects">No projects yet</div>
          )}
          {projects.map(p => (
            <div
              key={p.id}
              className={`project-item ${selectedProject?.id === p.id ? 'active' : ''}`}
              onMouseEnter={() => setHoveredProject(p.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <button className="project-name-btn" onClick={() => onSelectProject(p)}>
                <span className="project-dot" />
                <span className="project-name">{p.name}</span>
              </button>
              {hoveredProject === p.id && (
                <div className="project-actions">
                  <button className="btn btn-ghost btn-icon btn-sm"
                    onClick={(e) => { e.stopPropagation(); onOpenCredentials && onOpenCredentials(p); }}
                    title="Credentials">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="7" width="10" height="8" rx="1" />
                      <path d="M5 7V5a3 3 0 116 0v2" />
                      <circle cx="8" cy="11" r="1" />
                    </svg>
                  </button>
                  <button className="btn btn-ghost btn-icon btn-sm"
                    onClick={(e) => { e.stopPropagation(); onEditProject(p); }} title="Edit">
                    <Icon d="M10.5 2.5l3 3-8 8H2.5v-3l8-8z" size={12} />
                  </button>
                  <button className="btn btn-ghost btn-icon btn-sm"
                    onClick={(e) => { e.stopPropagation(); onDeleteProject(p.id); }}
                    title="Delete" style={{ color: 'var(--danger)' }}>
                    <Icon d="M2 4h12M5 4V2h6v2M4 4l.7 9.3a1 1 0 001 .7h4.6a1 1 0 001-.7L12 4" size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>v1.0.0</span>
      </div>
    </aside>
  );
}
