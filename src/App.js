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
import ProjectModal from './components/ProjectModal';
import ProjectCredentialModal from './components/ProjectCredentialModal';
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

  useEffect(() => { loadProjects(); }, []);

  async function loadProjects() {
    const data = await window.api.getProjects();
    setProjects(data);
  }

  async function handleCreateProject(data) {
    await window.api.createProject(data);
    await loadProjects();
    setShowProjectModal(false);
  }

  async function handleUpdateProject(data) {
    await window.api.updateProject(data);
    await loadProjects();
    setEditingProject(null);
  }

  async function handleDeleteProject(id) {
    if (!window.confirm('Hapus project ini beserta semua test case di dalamnya?')) return;
    await window.api.deleteProject(id);
    if (selectedProject?.id === id) {
      setSelectedProject(null);
      setView('dashboard');
    }
    if (view === 'bugreports') {
      setView('dashboard');
    }
    await loadProjects();
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
  function handleSelectTestPlans()     { setView('testplans'); }
  function handleSelectRequirements()  { setView('requirements'); }
  function handleSelectTCLibrary()     { setSelectedProject(null); setView('tclibrary'); }
  function handleSelectDocLab()        { setSelectedProject(null); setView('doclab'); }

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

  return (
    <div className="app-layout">
      {/* Title Bar (macOS inset) */}
      <div className="titlebar" />

      <div className="app-body">
        <Sidebar
          projects={projects}
          selectedProject={selectedProject}
          view={view}
          onSelectDashboard={() => { setSelectedProject(null); setView('dashboard'); }}
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
          onOpenCredentials={(p) => setCredentialProject(p)}
          onSelectProject={handleSelectProject}
          onNewProject={() => setShowProjectModal(true)}
          onEditProject={(p) => setEditingProject(p)}
          onDeleteProject={handleDeleteProject}
        />

        <main className="main-content">
          {view === 'dashboard' && (
            <Dashboard projects={projects} onSelectProject={handleSelectProject} />
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
    </div>
  );
}
