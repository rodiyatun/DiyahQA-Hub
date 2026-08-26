const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Projects
  getProjects: () => ipcRenderer.invoke('get-projects'),
  createProject: (data) => ipcRenderer.invoke('create-project', data),
  updateProject: (data) => ipcRenderer.invoke('update-project', data),
  deleteProject: (id) => ipcRenderer.invoke('delete-project', id),

  // Test Cases
  getTestcases: (projectId) => ipcRenderer.invoke('get-testcases', projectId),
  createTestcase: (data) => ipcRenderer.invoke('create-testcase', data),
  updateTestcase: (data) => ipcRenderer.invoke('update-testcase', data),
  deleteTestcase: (id) => ipcRenderer.invoke('delete-testcase', id),
  getStatusHistory: (id) => ipcRenderer.invoke('get-status-history', id),

  // Dashboard
  getStats: (projectId) => ipcRenderer.invoke('get-stats', projectId),

  // Bug Reports
  getBugReports: (projectId) => ipcRenderer.invoke('get-bug-reports', projectId),
  createBugReport: (data) => ipcRenderer.invoke('create-bug-report', data),
  updateBugReport: (data) => ipcRenderer.invoke('update-bug-report', data),
  deleteBugReport: (id) => ipcRenderer.invoke('delete-bug-report', id),
  getBugStats: (projectId) => ipcRenderer.invoke('get-bug-stats', projectId),
  importBugCSV: (data) => ipcRenderer.invoke('import-bug-csv', data),
  importBugPlane: (data) => ipcRenderer.invoke('import-bug-plane', data),

  // Teams & Admin
  getUsers: () => ipcRenderer.invoke('get-users'),
  addUser: (data) => ipcRenderer.invoke('add-user', data),
  updateUserRole: (data) => ipcRenderer.invoke('update-user-role', data),
  deleteUser: (id) => ipcRenderer.invoke('delete-user', id),
  getAuditLogs: () => ipcRenderer.invoke('get-audit-logs'),
  addAuditLog: (data) => ipcRenderer.invoke('add-audit-log', data),
  getApiKeys: () => ipcRenderer.invoke('get-api-keys'),
  createApiKey: (data) => ipcRenderer.invoke('create-api-key', data),
  revokeApiKey: (id) => ipcRenderer.invoke('revoke-api-key', id),
  getWorkspaces: () => ipcRenderer.invoke('get-workspaces'),
  createWorkspace: (data) => ipcRenderer.invoke('create-workspace', data),
  switchWorkspace: (id) => ipcRenderer.invoke('switch-workspace', id),

  // HashiCorp Vault
  getVaultConfig: () => ipcRenderer.invoke('vault-config-get'),
  setVaultConfig: (config) => ipcRenderer.invoke('vault-config-set', config),
  writeVaultSecret: (secretPath, data) => ipcRenderer.invoke('vault-write', { secretPath, data }),
  readVaultSecret: (secretPath) => ipcRenderer.invoke('vault-read', { secretPath }),

  // CI/CD & DevSecOps Simulators
  triggerJenkinsPipeline: (config) => ipcRenderer.invoke('trigger-jenkins-pipeline', config),
  getArgoCDStatus: () => ipcRenderer.invoke('get-argocd-status'),
  runSecretScan: () => ipcRenderer.invoke('run-secret-scan'),
  runScaScan: () => ipcRenderer.invoke('run-sca-scan'),
  runSastScan: () => ipcRenderer.invoke('run-sast-scan'),
  runDastScan: (data) => ipcRenderer.invoke('run-dast-scan', data),

  // SQL Lab
  runSQL: (data) => ipcRenderer.invoke('run-sql', data),

  // Import / Export
  importCSV: (data) => ipcRenderer.invoke('import-csv', data),
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  openJsonDialog: () => ipcRenderer.invoke('open-json-dialog'),
  saveFileDialog: (data) => ipcRenderer.invoke('save-file-dialog', data),
  importAllure: (data) => ipcRenderer.invoke('import-allure', data),
  exportAllureJson: (data) => ipcRenderer.invoke('export-allure-json', data),

  // API Lab
  apiRequest: (data) => ipcRenderer.invoke('api-request', data),
  saveTextFile: (data) => ipcRenderer.invoke('save-text-file', data),

  // Web Automation Lab
  waListProjects:          () => ipcRenderer.invoke('wa-list-projects'),
  waGetDesignLinks:        (projectPath) => ipcRenderer.invoke('wa-get-design-links', projectPath),
  waSaveDesignLinks:       (projectPath, data) => ipcRenderer.invoke('wa-save-design-links', projectPath, data),
  waListFiles:             (projectPath) => ipcRenderer.invoke('wa-list-files', projectPath),
  waGetFileContent:        (filePath) => ipcRenderer.invoke('wa-get-file-content', filePath),
  waSaveFileContent:       (filePath, content) => ipcRenderer.invoke('wa-save-file-content', filePath, content),
  waRunTest:               (projectPath, filePath) => ipcRenderer.invoke('wa-run-test', projectPath, filePath),

  // Antigravity
  generateWithAntigravity: (tc, projectPath) => ipcRenderer.invoke('generate-with-antigravity', tc, projectPath),
  askAntigravity:          (prompt) => ipcRenderer.invoke('askAntigravity', prompt),
  scheduleAITask:          (prompt) => ipcRenderer.invoke('schedule-ai-task', prompt),
  getActiveSchedules:      () => ipcRenderer.invoke('get-active-schedules'),
  waAntigravityExplore:    (data) => ipcRenderer.invoke('wa-antigravity-explore', data),
  waAntigravityHeal:       (data) => ipcRenderer.invoke('wa-antigravity-heal', data),
  waAntigravityData:       (data) => ipcRenderer.invoke('wa-antigravity-data', data),

  waCreateProject: (data) => ipcRenderer.invoke('wa-create-project', data),
  waReadFile:      (data) => ipcRenderer.invoke('wa-read-file', data),
  waWriteFile:     (data) => ipcRenderer.invoke('wa-write-file', data),
  waDeleteFile:    (data) => ipcRenderer.invoke('wa-delete-file', data),
  waRun:           (data) => ipcRenderer.invoke('wa-run', data),
  waStop:          ()     => ipcRenderer.invoke('wa-stop'),
  waCodegen:       (data) => ipcRenderer.invoke('wa-codegen', data),
  waAllureReport:  (data) => ipcRenderer.invoke('wa-allure-report', data),
  waOpenReport:    (data) => ipcRenderer.invoke('wa-open-report', data),
  waReadResults:   (data) => ipcRenderer.invoke('wa-read-results', data),
  waOnLog: (callback) => ipcRenderer.on('wa-run-log', (_, data) => callback(data)),
  waOnSetupLog: (callback) => ipcRenderer.on('wa-setup-log', (_, data) => callback(data)),
  waOffLog: () => { ipcRenderer.removeAllListeners('wa-run-log'); ipcRenderer.removeAllListeners('wa-setup-log'); },
  waImportProject: () => ipcRenderer.invoke('wa-import-project'),


  // Test Data Manager
  waReadDataFiles:  (data) => ipcRenderer.invoke('wa-read-data-files', data),
  waReadDataFile:   (data) => ipcRenderer.invoke('wa-read-data-file', data),
  waWriteDataFile:  (data) => ipcRenderer.invoke('wa-write-data-file', data),
  waDeleteDataFile: (data) => ipcRenderer.invoke('wa-delete-data-file', data),

  // Run Configuration
  waReadRunConfig:  (data) => ipcRenderer.invoke('wa-read-run-config', data),
  waWriteRunConfig: (data) => ipcRenderer.invoke('wa-write-run-config', data),

  // Failure Center
  waReadFailures: (data) => ipcRenderer.invoke('wa-read-failures', data),
  waReadImage:    (data) => ipcRenderer.invoke('wa-read-image', data),
  waOpenTrace:    (data) => ipcRenderer.invoke('wa-open-trace', data),

  // Locator Inspector
  waLocatorInspect: (data) => ipcRenderer.invoke('wa-locator-inspect', data),

  // Environment Manager
  getEnvironments:    (projectId) => ipcRenderer.invoke('get-environments', projectId),
  getEnvDecrypted:    (data)      => ipcRenderer.invoke('get-env-decrypted', data),
  createEnvironment:  (data)      => ipcRenderer.invoke('create-environment', data),
  updateEnvironment:  (data)      => ipcRenderer.invoke('update-environment', data),
  deleteEnvironment:  (id)        => ipcRenderer.invoke('delete-environment', id),
  upsertEnvVariable:  (data)      => ipcRenderer.invoke('upsert-env-variable', data),
  deleteEnvVariable:  (id)        => ipcRenderer.invoke('delete-env-variable', id),

  // Test Plans
  getTestPlans:         (projectId) => ipcRenderer.invoke('get-test-plans', projectId),
  getTestPlanDetail:    (planId)    => ipcRenderer.invoke('get-test-plan-detail', planId),
  createTestPlan:       (data)      => ipcRenderer.invoke('create-test-plan', data),
  updatePlanItem:       (data)      => ipcRenderer.invoke('update-plan-item', data),
  updateTestPlanStatus: (data)      => ipcRenderer.invoke('update-test-plan-status', data),
  deleteTestPlan:       (planId)    => ipcRenderer.invoke('delete-test-plan', planId),

  // Requirements / Traceability
  getRequirements:       (projectId) => ipcRenderer.invoke('get-requirements', projectId),
  createRequirement:     (data)      => ipcRenderer.invoke('create-requirement', data),
  updateRequirement:     (data)      => ipcRenderer.invoke('update-requirement', data),
  deleteRequirement:     (id)        => ipcRenderer.invoke('delete-requirement', id),
  linkRequirementTc:     (data)      => ipcRenderer.invoke('link-requirement-tc', data),
  unlinkRequirementTc:   (data)      => ipcRenderer.invoke('unlink-requirement-tc', data),
  getTraceabilityMatrix: (projectId) => ipcRenderer.invoke('get-traceability-matrix', projectId),

  // TC Library
  getTcLibrary:          (params) => ipcRenderer.invoke('get-tc-library', params),
  createTcLibraryItem:   (data)   => ipcRenderer.invoke('create-tc-library-item', data),
  updateTcLibraryItem:   (data)   => ipcRenderer.invoke('update-tc-library-item', data),
  deleteTcLibraryItem:   (id)     => ipcRenderer.invoke('delete-tc-library-item', id),
  importFromLibrary:     (data)   => ipcRenderer.invoke('import-from-library', data),
  getLibraryTags:        ()       => ipcRenderer.invoke('get-library-tags'),

  // Documentation Lab
  getDocuments:         (params)  => ipcRenderer.invoke('get-documents', params),
  getDocument:          (id)      => ipcRenderer.invoke('get-document', id),
  createDocument:       (data)    => ipcRenderer.invoke('create-document', data),
  updateDocument:       (data)    => ipcRenderer.invoke('update-document', data),
  deleteDocument:       (id)      => ipcRenderer.invoke('delete-document', id),
  getDocumentVersions:  (docId)   => ipcRenderer.invoke('get-document-versions', docId),
  searchDocuments:      (query)   => ipcRenderer.invoke('search-documents', query),

  // Project Credentials
  getProjectCredentials:  (projectId) => ipcRenderer.invoke('get-project-credentials', projectId),
  saveProjectCredentials: (data)      => ipcRenderer.invoke('save-project-credentials', data),

  // Plane Integration
  transferBugToPlane:      (data) => ipcRenderer.invoke('transfer-bug-to-plane', data),
  getPlaneLabels:          () => ipcRenderer.invoke('get-plane-labels'),
  getPlaneModules:         () => ipcRenderer.invoke('get-plane-modules'),
  getPlaneCycles:          () => ipcRenderer.invoke('get-plane-cycles'),
  transferBugsBulkToPlane: (data) => ipcRenderer.invoke('transfer-bugs-bulk-to-plane', data),
  syncPlaneStatus:         (data) => ipcRenderer.invoke('sync-plane-status', data),
  savePlaneConfig:         (data) => ipcRenderer.invoke('save-plane-config', data),
  getPlaneConfig:          ()     => ipcRenderer.invoke('get-plane-config'),

  // Automated UX
  extractLiveStyles: (url) => ipcRenderer.invoke('extract-live-styles', url),

  // Advanced Recorder
  launchChromeCdp: (url) => ipcRenderer.invoke('launch-chrome-cdp', url),
  startNetworkLog: () => ipcRenderer.invoke('start-network-log'),
  stopNetworkLog: () => ipcRenderer.invoke('stop-network-log'),
  compressVideo: (data) => ipcRenderer.invoke('compress-video', data),
  uploadB2: (data) => ipcRenderer.invoke('upload-b2', data),
  getDesktopSources: () => ipcRenderer.invoke('get-desktop-sources'),

  // Deep linking
  onDeepLink: (callback) => ipcRenderer.on('deep-link', (_, url) => callback(url)),
  offDeepLink: () => ipcRenderer.removeAllListeners('deep-link'),
});
