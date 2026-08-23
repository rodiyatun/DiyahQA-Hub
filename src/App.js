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
import AutomatedUXPage from './components/AutomatedUX/AutomatedUXPage';
import BASTPage from './components/BAST/BASTPage';
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
import LicenseActivation from './components/LicenseActivation';
import { supabase } from './lib/supabaseClient';
import { useAuth } from './contexts/AuthContext';
import { useWorkspace } from './contexts/WorkspaceContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { isLicenseValid } from './lib/license';
import './App.css';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [view, setView] = useState('dashboard');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [bugPrefillData, setBugPrefillData] = useState(null);
  const [bugTransferLabel, setBugTransferLabel] = useState(null);
  const [credentialProject, setCredentialProject] = useState(null);
  const [showCredsModal, setShowCredsModal] = useState(false);
  const [showVaultSettings, setShowVaultSettings] = useState(false);
  const [showIntegrationSettings, setShowIntegrationSettings] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [licensed, setLicensed] = useState(() => isLicenseValid());

  const { user, loading, recoveryMode } = useAuth();
  const { activeWorkspaceId } = useWorkspace();

  useEffect(() => { loadProjects(); }, [activeWorkspaceId]);

  // Show onboarding for new users
  useEffect(() => {
    if (user) {
      const completed = localStorage.getItem('onboarding_completed');
      if (!completed) setShowOnboarding(true);
    }
  }, [user]);

  // Handle deep links from Electron main process
  useEffect(() => {
    if (window.api && window.api.onDeepLink) {
      window.api.onDeepLink((url) => {
        // url is something like diyahqahub://login#access_token=...
        if (url.includes('#') || url.includes('?')) {
          const params = url.substring(url.indexOf(url.includes('#') ? '#' : '#'));
          // Set the hash so Supabase can read it
          window.location.hash = params;
          console.log("Deep link received, hash updated:", params);
        }
      });
      return () => {
        if (window.api.offDeepLink) window.api.offDeepLink();
      };
    }
  }, []);

  async function loadProjects() {
    try {
      let query = supabase.from('projects').select('*').order('created_at', { ascending: false });
      
      if (activeWorkspaceId) {
        query = query.or(`workspace_id.eq.${activeWorkspaceId},workspace_id.is.null`);
      } else {
        query = query.is('workspace_id', null);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error.message);
      
      // Fallback if workspace_id column doesn't exist
      if (error.message.includes('workspace_id') || error.message.includes('Could not find')) {
        try {
          const { data: fallbackData, error: fallbackError } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
          if (fallbackError) {
            alert("Error loading projects (fallback): " + fallbackError.message);
          } else {
            setProjects(fallbackData || []);
          }
        } catch (err) {
          alert("Error loading projects (catch): " + err.message);
        }
      } else {
        alert("Error loading projects: " + error.message);
        setProjects([]);
      }
    }
  }

  async function handleCreateProject(data) {
    try {
      const { error } = await supabase.from('projects').insert([{ 
        name: data.name, 
        description: data.description,
        workspace_id: activeWorkspaceId || null
      }]);
      if (error) {
        if (error.message.includes('workspace_id') || error.message.includes('Could not find')) {
          console.log("Falling back to insert without workspace_id...");
          const { error: fallbackError } = await supabase.from('projects').insert([{ 
            name: data.name, 
            description: data.description
          }]);
          if (fallbackError) throw fallbackError;
        } else {
          throw error;
        }
      }
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

  async function handleMigrateLocalData() {
    try {
      if (!window.api || !window.api.getProjects) {
        alert("Fungsi migrasi hanya tersedia di aplikasi Desktop.");
        return;
      }
      
      const confirmMigrate = window.confirm("Salin semua data Project dan Testcase lokal ke Supabase?");
      if (!confirmMigrate) return;

      const localProjects = await window.api.getProjects();
      if (!localProjects || localProjects.length === 0) {
        alert("Tidak ada project di database lokal Anda.");
        return;
      }

      for (let p of localProjects) {
        // 1. Insert Project
        const { data: newProject, error: pError } = await supabase.from('projects').insert([{
          name: p.name,
          description: p.description || '',
          workspace_id: activeWorkspaceId || null
        }]).select().single();

        if (pError) throw pError;

        // 2. Ambil testcases lokal
        const localTestcases = await window.api.getTestcases(p.id);
        if (localTestcases && localTestcases.length > 0) {
          const tcPayload = localTestcases.map(tc => ({
            project_id: newProject.id,
            workspace_id: activeWorkspaceId || null,
            no: tc.no,
            title: tc.title,
            module: tc.module,
            section: tc.section,
            scenario: tc.scenario,
            expected_result: tc.expected_result,
            status: tc.status || 'Pending',
            evidence: tc.evidence,
            note: tc.note,
            test_data: tc.test_data || ''
          }));
          
          const { error: tcError } = await supabase.from('testcases').insert(tcPayload);
          if (tcError) {
            console.error("Gagal memigrasi testcase untuk project", p.name, tcError);
          }
        }

        // 3. Ambil bug_reports lokal
        if (window.api.getBugReports) {
          const localBugs = await window.api.getBugReports(p.id);
          if (localBugs && localBugs.length > 0) {
            const bugPayload = localBugs.map(b => ({
              project_id: newProject.id,
              workspace_id: activeWorkspaceId || null,
              bug_number: b.bug_number || '',
              title: b.title,
              description: b.description || '',
              steps_to_reproduce: b.steps_to_reproduce || '',
              severity: b.severity || 'Medium',
              priority: b.priority || 'Medium',
              status: b.status || 'Open',
              environment: b.environment || '',
              expected_behavior: b.expected_behavior || '',
              actual_behavior: b.actual_behavior || '',
              evidence_url: b.evidence_url || '',
              reporter: b.reporter || '',
              assignee: b.assignee || '',
              module: b.module || '',
              plane_status: b.plane_status || 'Backlog',
              plane_issue_id: b.plane_issue_id || null,
              plane_issue_url: b.plane_issue_url || null
            }));

            const { error: bugError } = await supabase.from('bug_reports').insert(bugPayload);
            if (bugError) {
              console.error("Gagal memigrasi bug_reports untuk project", p.name, bugError);
            }
          }
        }
      }
      
      alert("Migrasi selesai!");
      await loadProjects();
    } catch (err) {
      console.error(err);
      alert("Error saat migrasi: " + err.message);
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
  function handleSelectAutomatedUX()   { setSelectedProject(null); setView('automatedux'); }
  function handleSelectTeamAdmin()     { setSelectedProject(null); setView('teamadmin'); }
  function handleSelectBAST()          { setSelectedProject(null); setView('bast'); }

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

  // License gate — tampil sebelum login
  if (!licensed) {
    return (
      <LanguageProvider>
        <LicenseActivation onActivated={() => setLicensed(true)} />
      </LanguageProvider>
    );
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
            onSelectAutomatedUX={handleSelectAutomatedUX}
            onSelectTeamAdmin={handleSelectTeamAdmin}
            onSelectBAST={handleSelectBAST}
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
            {(view === 'environments' || view === 'testplans' || view === 'requirements' || view === 'tclibrary' || view === 'doclab' || view === 'automatedux' || view === 'bast') && (
              <div style={{ padding: 24, height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
                {view === 'environments' && <EnvironmentManager projects={projects} />}
                {view === 'testplans'    && <TestPlanPage projects={projects} selectedProject={selectedProject} />}
                {view === 'requirements' && <RequirementsPage projects={projects} selectedProject={selectedProject} />}
                {view === 'tclibrary'    && <TCLibraryPage projects={projects} selectedProject={selectedProject} />}
                {view === 'doclab'       && <DocLabPage projects={projects} />}
                {view === 'automatedux'  && <AutomatedUXPage />}
                {view === 'bast'         && <BASTPage projects={projects} />}
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
