import { useState } from 'react';
import { 
  Folder, Plus, LayoutDashboard, Settings, Key, 
  Bug, Search, Database, Terminal, Shield, BookOpen, Layers, Target, CheckSquare, 
  FileCode, Play, Lock, Activity, Globe, Plug, Edit2, Trash2, Users, LogOut
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

export default function Sidebar({
  projects, selectedProject, view,
  onSelectDashboard, onSelectAllProjects, onSelectBugReports, onSelectSQLLab, onSelectSecurityLab,
  onSelectPerformanceLab, onSelectCICDLab, onSelectAPILab, onSelectAutomationLab,
  onSelectEnvironments, onSelectTestPlans, onSelectRequirements, onSelectTCLibrary, onSelectDocLab,
  onSelectProject, onNewProject, onEditProject, onDeleteProject, onOpenCredentials,
  onOpenVaultSettings, onOpenIntegrationSettings, onSelectTeamAdmin, onSelectBAST
}) {
  const { t, lang, setLang } = useLanguage();
  const { role, setRole, logout } = useAuth();
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainNav = [
    { id: 'dashboard', label: t('sidebar.dashboard') || 'Dashboard', icon: <LayoutDashboard size={16} />, action: onSelectDashboard },
    { id: 'bugreports', label: t('sidebar.bugReports') || 'Bug Reports', icon: <Bug size={16} />, action: onSelectBugReports },
    ...(role === 'admin' ? [{ id: 'teamadmin', label: t('sidebar.teamAdmin') || 'Teams & Admin', icon: <Users size={16} />, action: onSelectTeamAdmin }] : []),
  ];

  const testingLabs = [
    { id: 'performancelab', label: t('sidebar.performance'), icon: <Activity size={16} />, action: onSelectPerformanceLab },
    { id: 'apilab', label: t('sidebar.api'), icon: <Search size={16} />, action: onSelectAPILab },
    { id: 'automationlab', label: t('sidebar.automation'), icon: <Play size={16} />, action: onSelectAutomationLab },
    { id: 'cicdlab', label: t('sidebar.cicd'), icon: <Terminal size={16} />, action: onSelectCICDLab },
    { id: 'securitylab', label: t('sidebar.security'), icon: <Shield size={16} />, action: onSelectSecurityLab },
    { id: 'doclab', label: t('sidebar.doc'), icon: <BookOpen size={16} />, action: onSelectDocLab },
    { id: 'sqllab', label: t('sidebar.sql'), icon: <Database size={16} />, action: onSelectSQLLab },
  ];

  const qaModules = [
    { id: 'environments', label: t('sidebar.environments'), icon: <Layers size={14} />, action: onSelectEnvironments },
    { id: 'testplans', label: t('sidebar.testPlans'), icon: <Target size={14} />, action: onSelectTestPlans },
    { id: 'requirements', label: t('sidebar.requirements'), icon: <CheckSquare size={14} />, action: onSelectRequirements },
    { id: 'tclibrary', label: t('sidebar.tcLibrary'), icon: <FileCode size={14} />, action: onSelectTCLibrary },
    { id: 'bast', label: 'BAST & Laporan', icon: <CheckSquare size={14} />, action: onSelectBAST },
  ];

  const isActive = (v) =>
    v === 'dashboard' ? (view === 'dashboard' && !selectedProject) : view === v;

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', flex: 1, overflow: 'hidden'}}>
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ color: 'var(--accent)', flexShrink: 0 }}>
            <circle cx="6.5" cy="6.5" r="4.5" />
            <path d="M11 11l3.5 3.5" />
          </svg>
          <span className="logo-text">DiyahQA Hub</span>
        </div>
        <button 
          className="btn btn-ghost btn-icon btn-sm toggle-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          title="Toggle Sidebar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isCollapsed ? <path d="M9 18l6-6-6-6" /> : <path d="M15 18l-6-6 6-6" />}
          </svg>
        </button>
      </div>

      <nav className="sidebar-nav">
        {mainNav.map(item => (
          <button key={item.id} className={`nav-item ${isActive(item.id) ? 'active' : ''}`} onClick={item.action} title={isCollapsed ? item.label : undefined}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}

        {!isCollapsed && (
          <div style={{ margin: '12px 12px 6px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {t('sidebar.testingLabs')}
          </div>
        )}
        {testingLabs.map(item => (
          <button key={item.id} className={`nav-item ${isActive(item.id) ? 'active' : ''}`} onClick={item.action} title={isCollapsed ? item.label : undefined}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}

        {!isCollapsed && (
          <div style={{ margin: '12px 12px 6px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {t('sidebar.qaManagement')}
          </div>
        )}
        {qaModules.map(item => (
          <button key={item.id} className={`nav-item ${isActive(item.id) ? 'active' : ''}`} onClick={item.action} title={isCollapsed ? item.label : undefined}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-section">
        <div className="section-header">
          {!isCollapsed && <span className="section-title">{t('sidebar.projects')}</span>}
          <button className="btn btn-ghost btn-icon btn-sm" onClick={onNewProject} title={t('sidebar.newProject')}>
            <Plus size={14} />
          </button>
        </div>

        <div className="project-list">
          <button className={`nav-item ${!selectedProject && view === 'projects' ? 'active' : ''}`} onClick={onSelectAllProjects} title={isCollapsed ? t('sidebar.allProjects') : undefined}>
            <span className="nav-icon"><Folder size={16} /></span>
            <span className="nav-label">{t('sidebar.allProjects')}</span>
          </button>
          {projects.map(p => (
            <div
              key={p.id}
              className={`project-item ${selectedProject?.id === p.id && view === 'testcases' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredProject(p.id)}
              onMouseLeave={() => setHoveredProject(p.id === selectedProject?.id ? p.id : null)}
            >
              <button className="project-name-btn" onClick={() => onSelectProject(p)} title={isCollapsed ? p.name : undefined}>
                <Folder size={14} style={{ flexShrink: 0 }} />
                <span className="nav-label" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
              </button>
              {(!isCollapsed && hoveredProject === p.id) && (
                <div className="project-actions">
                  <button className="btn btn-ghost btn-icon btn-sm"
                    onClick={(e) => { e.stopPropagation(); onOpenCredentials && onOpenCredentials(p); }}
                    title="Credentials">
                    <Lock size={12} />
                  </button>
                  <button className="btn btn-ghost btn-icon btn-sm"
                    onClick={(e) => { e.stopPropagation(); onEditProject(p); }} title="Edit">
                    <Edit2 size={12} />
                  </button>
                  <button className="btn btn-ghost btn-icon btn-sm"
                    onClick={(e) => { e.stopPropagation(); onDeleteProject(p.id); }}
                    title="Delete" style={{ color: 'var(--danger)' }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <button 
            className="btn btn-ghost btn-icon btn-sm"
            onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
            title="Toggle Language"
            style={{ fontSize: 16, cursor: 'pointer', background: 'transparent', border: 'none' }}
          >
            {lang === 'en' ? '🇬🇧' : '🇮🇩'}
          </button>
          {!isCollapsed && (
            <select 
              value={role} 
              onChange={e => {
                setRole(e.target.value);
                // Also kick out of admin page if role is downgraded
                if (e.target.value !== 'admin' && view === 'teamadmin') {
                  onSelectDashboard();
                }
              }}
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 4px', fontSize: 11, cursor: 'pointer' }}
              title="Switch Role"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          )}
          <button 
            className="btn btn-ghost btn-icon btn-sm"
            onClick={logout}
            title="Logout"
            style={{ color: 'var(--danger)', marginLeft: 8 }}
          >
            <LogOut size={14} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button 
            className="btn btn-ghost btn-icon btn-sm" 
            onClick={onOpenIntegrationSettings} 
            title={t('sidebar.integrations')}
            style={{ color: 'var(--text-muted)' }}
          >
            <Plug size={14} />
          </button>
          <button 
            className="btn btn-ghost btn-icon btn-sm" 
            onClick={onOpenVaultSettings} 
            title={t('sidebar.vault')}
            style={{ color: 'var(--text-muted)' }}
          >
            <Lock size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
