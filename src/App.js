import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TestCaseList from './components/TestCaseList';
import BugReportList from './components/BugReportList';
import SQLLabPage from './components/SQLLab/SQLLabPage';
import SecurityLabPage from './components/SecurityLab/SecurityLabPage';
import PerformanceLabPage from './components/PerformanceLab/PerformanceLabPage';
import CICDLabPage from './components/CICDLab/CICDLabPage';
import APILabPage from './components/APILab/APILabPage';
import AutomationLabPage from './components/AutomationLab/AutomationLabPage';
import EnvironmentManager from './components/EnvironmentManager/EnvironmentManager';
import TestPlanPage from './components/TestPlan/TestPlanPage';
import RequirementsPage from './components/Requirements/RequirementsPage';
import TCLibraryPage from './components/TCLibrary/TCLibraryPage';
import DocLabPage from './components/DocLab/DocLabPage';
import VaultSettingsModal from './components/VaultSettingsModal';
import IntegrationSettingsModal from './components/IntegrationSettingsModal';
import ProjectModal from './components/ProjectModal';
import ProjectCredentialModal from './components/ProjectCredentialModal';
import AgentChat from './components/AgentChat';
import ProjectGrid from './components/ProjectGrid';
import TeamAdminPage from './components/TeamAdmin/TeamAdminPage';
import Login from './components/Login';
import UpdatePassword from './components/UpdatePassword';
import Onboarding from './components/Onboarding';
import { supabase } from './lib/supabaseClient';
import { useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [view, setView] = useState('dashboard'); // dashboard|testcases|bugreports|sqllab|securitylab|performancelab|cicdlab|apilab|automationlab|environments|testplans|requirements|tclibrary|doclab
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [bugPrefillData, setBugPrefillData] = useState(null);
  const [bugTransferLabel, setBugTransferLabel] = useState(null);
  const [credentialProject, setCredentialProject] = useState(null);
  const [showCredsModal, setShowCredsModal] = useState(false);
  const [showVaultSettings, setShowVaultSettings] = useState(false);
  const [showIntegrationSettings, setShowIntegrationSettings] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const { user, loading, recoveryMode } = useAuth();

  useEffect(() => { loadProjects(); }, []);

  // Show onboarding for new users
  useEffect(() => {
    if (user) {
      const completed = localStorage.getItem('onboarding_completed');
      if (!completed) setShowOnboarding(true);
    }
  }, [user]);

  async function loadProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error.message);
      setProjects([]);
    }
  }

  async function handleCreateProject(data) {
    try {
      const { error } = await supabase.from('projects').insert([{ name: data.name, description: data.description }]);
      if (error) throw error;
      await loadProjects();
      setShowProjectModal(false);
    } catch (err) {
      alert("Error creating project: " + err.message);
    }
  }

  async function handleUpdateProject(data) {
    try {
      const { error } = await supabase.from('projects').update({ name: data.name, description: data.description }).eq('id', data.id);
      if (error) throw error;
      await loadProjects();
      setEditingProject(null);
    } catch (err) {
      alert("Error updating project: " + err.message);
    }
  }

  async function handleDeleteProject(id) {
    if (!window.confirm('Hapus project ini beserta semua test case di dalamnya?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      
      if (selectedProject?.id === id) {
        setSelectedProject(null);
        setView('dashboard');
      }
      if (view === 'bugreports') {
        setView('dashboard');
      }
      await loadProjects();
    } catch (err) {
      alert("Error deleting project: " + err.message);
    }
  }


  function handleSelectProject(project) {
    setSelectedProject(project);
    setView('testcases');
  }

  function handleSelectBugReports() {
    setSelectedProject(null);
    setView('bugreports');
  }

  function handleSelectSQLLab() {
    setSelectedProject(null);
    setView('sqllab');
  }

  function handleSelectSecurityLab() {
    setSelectedProject(null);
    setView('securitylab');
  }

  function handleSelectPerformanceLab() {
    setSelectedProject(null);
    setView('performancelab');
  }

  function handleSelectCICDLab() {
    setSelectedProject(null);
    setView('cicdlab');
  }

  function handleSelectAPILab() {
    setSelectedProject(null);
    setView('apilab');
  }

  function handleSelectAutomationLab() {
    setSelectedProject(null);
    setView('automationlab');
  }

  function handleSelectEnvironments()  { setSelectedProject(null); setView('environments'); }
  function handleSelectTestPlans()     { setSelectedProject(null); setView('testplans'); }
  function handleSelectRequirements()  { setSelectedProject(null); setView('requirements'); }
  function handleSelectTCLibrary()     { setSelectedProject(null); setView('tclibrary'); }
  function handleSelectDocLab()        { setSelectedProject(null); setView('doclab'); }
  function handleSelectTeamAdmin()     { setSelectedProject(null); setView('teamadmin'); }

  function handleCreateBugFromTC(tc) {
    setBugPrefillData({
      title: tc.title,
      module: tc.module || '',
      steps_to_reproduce: tc.scenario || '',
      expected_behavior: tc.expected_result || '',
      linked_testcase_id: tc.id,
      project_id: selectedProject?.id || '',
      severity: 'High',
      status: 'Open',
      priority: 'High',
    });
    setBugTransferLabel(tc.no ? `${tc.no} — ${tc.title}` : tc.title);
    setView('bugreports');
  }

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>Memuat Aplikasi...</div>;
  }

  if (recoveryMode) {
    return <UpdatePassword />;
  }

  if (!user) {
    return (
      <LanguageProvider>
        <Login />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="app-layout">
        {/* Onboarding Modal */}
        {showOnboarding && (
          <Onboarding
            onComplete={() => setShowOnboarding(false)}
            onCreateProject={loadProjects}
          />
        )}

        {/* Title Bar (macOS inset) */}
        <div className="titlebar" />

        <div className="app-body">
          <Sidebar
            projects={projects}
            selectedProject={selectedProject}
            view={view}
            onSelectProject={handleSelectProject}
            onNewProject={() => setShowProjectModal(true)}
            onSelectDashboard={() => { setSelectedProject(null); setView('dashboard'); }}
            onSelectAllProjects={() => { setSelectedProject(null); setView('projects'); }}
            onSelectBugReports={handleSelectBugReports}
            onSelectSQLLab={handleSelectSQLLab}
            onSelectSecurityLab={handleSelectSecurityLab}
            onSelectPerformanceLab={handleSelectPerformanceLab}
            onSelectCICDLab={handleSelectCICDLab}
            onSelectAPILab={handleSelectAPILab}
            onSelectAutomationLab={handleSelectAutomationLab}
            onSelectEnvironments={handleSelectEnvironments}
            onSelectTestPlans={handleSelectTestPlans}
            onSelectRequirements={handleSelectRequirements}
            onSelectTCLibrary={handleSelectTCLibrary}
            onSelectDocLab={handleSelectDocLab}
            onSelectTeamAdmin={handleSelectTeamAdmin}
            onSelectProject={handleSelectProject}
            onNewProject={() => setShowProjectModal(true)}
            onOpenCredentials={(p) => setCredentialProject(p)}
            onEditProject={(p) => setEditingProject(p)}
            onDeleteProject={handleDeleteProject}
            onOpenVaultSettings={() => setShowVaultSettings(true)}
            onOpenIntegrationSettings={() => setShowIntegrationSettings(true)}
          />

          <main className="main-content">
            {view === 'projects' && (
              <ProjectGrid 
                projects={projects} 
                onSelectProject={handleSelectProject} 
                onCreateProject={() => setShowProjectModal(true)} 
              />
            )}
            {view === 'dashboard' && (
              <Dashboard projects={projects} onSelectProject={handleSelectProject} />
            )}
            {view === 'teamadmin' && !selectedProject && (
              <TeamAdminPage />
            )}
            {view === 'testcases' && selectedProject && (
              <TestCaseList project={selectedProject} onCreateBugFromTC={handleCreateBugFromTC} />
            )}
            {view === 'bugreports' && (
              <BugReportList
                projects={projects}
                selectedProject={selectedProject}
                prefillData={bugPrefillData}
                transferLabel={bugTransferLabel}
                onClearPrefill={() => { setBugPrefillData(null); setBugTransferLabel(null); }}
              />
            )}
            {view === 'sqllab' && <SQLLabPage />}
            {view === 'securitylab' && <SecurityLabPage />}
            {view === 'performancelab' && <PerformanceLabPage />}
            {view === 'cicdlab' && <CICDLabPage />}
            {view === 'apilab' && <APILabPage />}
            {view === 'automationlab' && <AutomationLabPage />}
            {(view === 'environments' || view === 'testplans' || view === 'requirements' || view === 'tclibrary' || view === 'doclab') && (
              <div style={{ padding: 24, height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
                {view === 'environments' && <EnvironmentManager projects={projects} />}
                {view === 'testplans'    && <TestPlanPage projects={projects} selectedProject={selectedProject} />}
                {view === 'requirements' && <RequirementsPage projects={projects} selectedProject={selectedProject} />}
                {view === 'tclibrary'    && <TCLibraryPage projects={projects} selectedProject={selectedProject} />}
                {view === 'doclab'       && <DocLabPage projects={projects} />}
              </div>
            )}
          </main>
        </div>

        {showProjectModal && (
          <ProjectModal
            onSave={handleCreateProject}
            onClose={() => setShowProjectModal(false)}
          />
        )}
        {editingProject && (
          <ProjectModal
            project={editingProject}
            onSave={handleUpdateProject}
            onClose={() => setEditingProject(null)}
          />
        )}
        {credentialProject && (
          <ProjectCredentialModal
            project={credentialProject}
            onClose={() => setCredentialProject(null)}
          />
        )}
        {showVaultSettings && (
          <VaultSettingsModal
            onClose={() => setShowVaultSettings(false)}
          />
        )}
        {showIntegrationSettings && (
          <IntegrationSettingsModal
            onClose={() => setShowIntegrationSettings(false)}
          />
        )}
        
        {/* AI Assistant Sidebar Chat */}
        <AgentChat onNavigate={(target) => {
          setSelectedProject(null);
          setView(target);
        }} />
      </div>
    </LanguageProvider>
  );
}
