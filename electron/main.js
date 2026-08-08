const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
const { isConfigValid, maskApiKey, getTodoStateId, mapBugToPlanePayload, buildPlaneIssueUrl, planeRequest, sendGoogleChatNotification } = require('./planeHelpers');

// ─── Database (sql.js — pure JS, no native compile needed) ───────────────────
let db;
let dbPath;

function initDB() {
  const initSqlJs = require('sql.js');
  const userDataPath = app.getPath('userData');
  dbPath = path.join(userDataPath, 'testcases.db');

  initSqlJs().then((SQL) => {
    if (fs.existsSync(dbPath)) {
      const fileBuffer = fs.readFileSync(dbPath);
      db = new SQL.Database(fileBuffer);
    } else {
      db = new SQL.Database();
    }

    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT DEFAULT '',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS testcases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        no TEXT DEFAULT '',
        title TEXT NOT NULL,
        website TEXT DEFAULT '',
        module TEXT DEFAULT '',
        section TEXT DEFAULT '',
        test_data TEXT DEFAULT '',
        scenario TEXT DEFAULT '',
        expected_result TEXT DEFAULT '',
        status TEXT DEFAULT 'Pending',
        evidence TEXT DEFAULT '',
        note TEXT DEFAULT '',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS status_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        testcase_id INTEGER,
        old_status TEXT,
        new_status TEXT,
        changed_at TEXT DEFAULT (datetime('now')),
        note TEXT DEFAULT '',
        FOREIGN KEY (testcase_id) REFERENCES testcases(id)
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS bug_reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        bug_number TEXT DEFAULT '',
        title TEXT NOT NULL,
        description TEXT DEFAULT '',
        steps_to_reproduce TEXT DEFAULT '',
        severity TEXT DEFAULT 'Medium',
        priority TEXT DEFAULT 'Medium',
        status TEXT DEFAULT 'Open',
        environment TEXT DEFAULT '',
        expected_behavior TEXT DEFAULT '',
        actual_behavior TEXT DEFAULT '',
        evidence_url TEXT DEFAULT '',
        reporter TEXT DEFAULT '',
        assignee TEXT DEFAULT '',
        linked_testcase_id INTEGER,
        module TEXT DEFAULT '',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (project_id) REFERENCES projects(id),
        UNIQUE(project_id, bug_number)
      );
    `);

    // ── Environment Manager ───────────────────────────────────────────────────
    db.run(`
      CREATE TABLE IF NOT EXISTS environments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        name TEXT NOT NULL,
        type TEXT DEFAULT 'staging',
        base_url TEXT DEFAULT '',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS env_variables (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        environment_id INTEGER,
        key_name TEXT NOT NULL,
        value_encrypted TEXT NOT NULL,
        description TEXT DEFAULT '',
        is_secret INTEGER DEFAULT 1,
        FOREIGN KEY (environment_id) REFERENCES environments(id)
      );
    `);

    // ── Test Plans / Test Runs ────────────────────────────────────────────────
    db.run(`
      CREATE TABLE IF NOT EXISTS test_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        name TEXT NOT NULL,
        description TEXT DEFAULT '',
        environment_id INTEGER,
        status TEXT DEFAULT 'draft',
        created_at TEXT DEFAULT (datetime('now')),
        started_at TEXT,
        completed_at TEXT,
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS test_plan_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        plan_id INTEGER,
        testcase_id INTEGER,
        status TEXT DEFAULT 'Not Run',
        note TEXT DEFAULT '',
        executed_by TEXT DEFAULT '',
        executed_at TEXT,
        evidence TEXT DEFAULT '',
        FOREIGN KEY (plan_id) REFERENCES test_plans(id),
        FOREIGN KEY (testcase_id) REFERENCES testcases(id)
      );
    `);

    // ── Requirements / Traceability ───────────────────────────────────────────
    db.run(`
      CREATE TABLE IF NOT EXISTS requirements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        code TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT DEFAULT '',
        priority TEXT DEFAULT 'Medium',
        status TEXT DEFAULT 'Active',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS requirement_tc_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        requirement_id INTEGER,
        testcase_id INTEGER,
        UNIQUE(requirement_id, testcase_id),
        FOREIGN KEY (requirement_id) REFERENCES requirements(id),
        FOREIGN KEY (testcase_id) REFERENCES testcases(id)
      );
    `);

    // ── TC Library ────────────────────────────────────────────────────────────
    db.run(`
      CREATE TABLE IF NOT EXISTS tc_library (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        module TEXT DEFAULT '',
        section TEXT DEFAULT '',
        scenario TEXT DEFAULT '',
        expected_result TEXT DEFAULT '',
        tags TEXT DEFAULT '[]',
        usage_count INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
      );
    `);

    // ── Documentation Lab ─────────────────────────────────────────────────────
    db.run(`
      CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        category TEXT DEFAULT 'general',
        title TEXT NOT NULL,
        content TEXT DEFAULT '',
        tags TEXT DEFAULT '',
        version INTEGER DEFAULT 1,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS document_versions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        document_id INTEGER,
        content_snapshot TEXT,
        version_number INTEGER,
        saved_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (document_id) REFERENCES documents(id)
      );
    `);

    // ── Project Credentials ───────────────────────────────────────────────────
    db.run(`
      CREATE TABLE IF NOT EXISTS project_credentials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        project_code TEXT DEFAULT '',
        version TEXT DEFAULT '',
        support_pin TEXT DEFAULT '',
        remark TEXT DEFAULT '',
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS project_env_credentials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        env_name TEXT NOT NULL,
        site_url TEXT DEFAULT '',
        username_encrypted TEXT DEFAULT '',
        password_encrypted TEXT DEFAULT '',
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );
    `);

    // ── Plane Integration Migration ───────────────────────────────────────────
    migratePlaneSchema();

    saveDB();
  });
}

// ─── Plane Integration: Schema Migration ─────────────────────────────────────
function migratePlaneSchema() {
  try {
    // Create plane_config table if not exists
    db.run(`
      CREATE TABLE IF NOT EXISTS plane_config (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        api_key_enc   TEXT NOT NULL DEFAULT '',
        workspace_slug TEXT NOT NULL DEFAULT '',
        project_id    TEXT NOT NULL DEFAULT '65975ef6-fe92-43b0-bc11-293d6fe5c666',
        base_url      TEXT NOT NULL DEFAULT 'https://api.plane.so',
        updated_at    TEXT DEFAULT (datetime('now'))
      );
    `);

    // Idempotently add Plane columns to bug_reports
    const cols = queryAll('PRAGMA table_info(bug_reports)').map(c => c.name);
    if (!cols.includes('plane_issue_id')) {
      db.run('ALTER TABLE bug_reports ADD COLUMN plane_issue_id TEXT DEFAULT NULL');
    }
    if (!cols.includes('plane_issue_url')) {
      db.run('ALTER TABLE bug_reports ADD COLUMN plane_issue_url TEXT DEFAULT NULL');
    }
    if (!cols.includes('plane_status')) {
      db.run('ALTER TABLE bug_reports ADD COLUMN plane_status TEXT DEFAULT NULL');
    }

    // Idempotently add base_url column to plane_config (for existing installs)
    const planeCols = queryAll('PRAGMA table_info(plane_config)').map(c => c.name);
    if (!planeCols.includes('base_url')) {
      db.run("ALTER TABLE plane_config ADD COLUMN base_url TEXT NOT NULL DEFAULT 'https://api.plane.so'");
    }
    if (!planeCols.includes('assignee_email')) {
      db.run("ALTER TABLE plane_config ADD COLUMN assignee_email TEXT NOT NULL DEFAULT ''");
    }
    if (!planeCols.includes('gchat_webhook_url')) {
      db.run("ALTER TABLE plane_config ADD COLUMN gchat_webhook_url TEXT NOT NULL DEFAULT ''");
    }

    // Fix any plane_status values that are UUIDs (from previous bug) — reset to NULL so sync will re-fetch
    db.run(`
      UPDATE bug_reports
      SET plane_status = NULL
      WHERE plane_status IS NOT NULL
        AND length(plane_status) = 36
        AND plane_status LIKE '________-____-____-____-____________'
    `);

    saveDB();
  } catch (e) {
    console.error('[Plane] Schema migration failed:', e);
    // Do not crash the app — Plane features will be silently disabled
  }
}

function saveDB() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

// Helper: run query yang mengembalikan rows sebagai array of objects
function queryAll(sql, params = []) {
  if (!db) return [];
  try {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const rows = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
    return rows;
  } catch (e) {
    console.error('queryAll error:', e, sql);
    return [];
  }
}

function queryOne(sql, params = []) {
  const rows = queryAll(sql, params);
  return rows[0] || null;
}

function run(sql, params = []) {
  if (!db) return null;
  try {
    db.run(sql, params);
    const idRow = queryOne('SELECT last_insert_rowid() as id');
    saveDB();
    return idRow?.id;
  } catch (e) {
    console.error('run error:', e, sql);
    return null;
  }
}

// ─── Window ──────────────────────────────────────────────────────────────────
function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#0f172a',
    show: false
  });

  win.once('ready-to-show', () => win.show());

  if (isDev) {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadFile(path.join(__dirname, '../build/index.html'));
  }
}

app.whenReady().then(() => {
  initDB();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ─── IPC: Projects ───────────────────────────────────────────────────────────
ipcMain.handle('get-projects', () => {
  return queryAll('SELECT * FROM projects ORDER BY created_at DESC');
});

ipcMain.handle('create-project', (_, { name, description }) => {
  const id = run('INSERT INTO projects (name, description) VALUES (?, ?)', [name, description || '']);
  return queryOne('SELECT * FROM projects WHERE id = ?', [id]);
});

ipcMain.handle('update-project', (_, { id, name, description }) => {
  run("UPDATE projects SET name=?, description=?, updated_at=datetime('now') WHERE id=?", [name, description || '', id]);
  return queryOne('SELECT * FROM projects WHERE id = ?', [id]);
});

ipcMain.handle('delete-project', (_, id) => {
  run('DELETE FROM bug_reports WHERE project_id = ?', [id]);
  run('DELETE FROM testcases WHERE project_id = ?', [id]);
  run('DELETE FROM projects WHERE id = ?', [id]);
  return { success: true };
});

// ─── IPC: Test Cases ─────────────────────────────────────────────────────────
ipcMain.handle('get-testcases', (_, projectId) => {
  if (projectId) {
    return queryAll('SELECT * FROM testcases WHERE project_id = ? ORDER BY created_at DESC', [projectId]);
  }
  return queryAll('SELECT * FROM testcases ORDER BY created_at DESC');
});

ipcMain.handle('create-testcase', (_, d) => {
  const id = run(
    `INSERT INTO testcases (project_id, no, title, website, module, section, test_data, scenario, expected_result, status, evidence, note)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [d.project_id, d.no||'', d.title, d.website||'', d.module||'', d.section||'',
     d.test_data||'', d.scenario||'', d.expected_result||'', d.status||'Pending', d.evidence||'', d.note||'']
  );
  return queryOne('SELECT * FROM testcases WHERE id = ?', [id]);
});

ipcMain.handle('update-testcase', (_, d) => {
  const existing = queryOne('SELECT status FROM testcases WHERE id = ?', [d.id]);
  if (existing && existing.status !== d.status) {
    run('INSERT INTO status_history (testcase_id, old_status, new_status, note) VALUES (?, ?, ?, ?)',
      [d.id, existing.status, d.status, d.note || '']);
  }
  run(
    `UPDATE testcases SET no=?, title=?, website=?, module=?, section=?, test_data=?, scenario=?,
     expected_result=?, status=?, evidence=?, note=?, updated_at=datetime('now') WHERE id=?`,
    [d.no||'', d.title, d.website||'', d.module||'', d.section||'', d.test_data||'',
     d.scenario||'', d.expected_result||'', d.status, d.evidence||'', d.note||'', d.id]
  );
  return queryOne('SELECT * FROM testcases WHERE id = ?', [d.id]);
});

ipcMain.handle('delete-testcase', (_, id) => {
  run('DELETE FROM status_history WHERE testcase_id = ?', [id]);
  run('DELETE FROM testcases WHERE id = ?', [id]);
  return { success: true };
});

ipcMain.handle('get-status-history', (_, testcaseId) => {
  return queryAll('SELECT * FROM status_history WHERE testcase_id = ? ORDER BY changed_at DESC', [testcaseId]);
});

// ─── IPC: Stats ──────────────────────────────────────────────────────────────
ipcMain.handle('get-stats', (_, projectId) => {
  const where = projectId ? 'WHERE project_id = ?' : '';
  const params = projectId ? [projectId] : [];
  const totalRow = queryOne(`SELECT COUNT(*) as count FROM testcases ${where}`, params);
  const byStatus = queryAll(`SELECT status, COUNT(*) as count FROM testcases ${where} GROUP BY status`, params);
  const recentHistory = queryAll('SELECT * FROM status_history ORDER BY changed_at DESC LIMIT 10');
  return { total: totalRow?.count || 0, byStatus, recentHistory };
});

// ─── IPC: Bug Reports ────────────────────────────────────────────────────────

function generateBugNumber(projectId) {
  const row = queryOne(
    "SELECT bug_number FROM bug_reports WHERE project_id = ? AND bug_number LIKE 'BUG-%' ORDER BY id DESC LIMIT 1",
    [projectId]
  );
  if (!row) return 'BUG-001';
  const lastNum = parseInt((row.bug_number || '').replace('BUG-', ''), 10);
  if (isNaN(lastNum)) return 'BUG-001';
  const nextNum = lastNum + 1;
  return 'BUG-' + String(nextNum).padStart(3, '0');
}

ipcMain.handle('get-bug-reports', (_, projectId) => {
  if (!db) return [];
  if (projectId) {
    return queryAll('SELECT * FROM bug_reports WHERE project_id = ? ORDER BY created_at DESC', [projectId]);
  }
  return queryAll('SELECT * FROM bug_reports ORDER BY created_at DESC');
});

ipcMain.handle('create-bug-report', (_, data) => {
  const VALID_SEVERITY = ['Critical', 'High', 'Medium', 'Low'];
  const VALID_STATUS = ['Open', 'In Progress', 'Resolved', 'Closed', "Won't Fix"];

  if (!data.title || !data.title.trim()) return null;
  if (!VALID_SEVERITY.includes(data.severity)) return null;
  if (!VALID_STATUS.includes(data.status)) return null;

  const bugNumber = (data.bug_number && data.bug_number.trim())
    ? data.bug_number.trim()
    : generateBugNumber(data.project_id);

  db.run(
    `INSERT INTO bug_reports (
      project_id, bug_number, title, description, steps_to_reproduce,
      severity, priority, status, environment, expected_behavior,
      actual_behavior, evidence_url, reporter, assignee,
      linked_testcase_id, module, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, datetime('now'), datetime('now')
    )`,
    [
      data.project_id || null,
      bugNumber,
      data.title.trim(),
      data.description || '',
      data.steps_to_reproduce || '',
      data.severity || 'Medium',
      data.priority || 'Medium',
      data.status || 'Open',
      data.environment || '',
      data.expected_behavior || '',
      data.actual_behavior || '',
      data.evidence_url || '',
      data.reporter || '',
      data.assignee || '',
      data.linked_testcase_id || null,
      data.module || ''
    ]
  );
  const idRow = queryOne('SELECT last_insert_rowid() as id');
  saveDB();
  return queryOne('SELECT * FROM bug_reports WHERE id = ?', [idRow?.id]);
});

ipcMain.handle('update-bug-report', (_, data) => {
  const VALID_SEVERITY = ['Critical', 'High', 'Medium', 'Low'];
  const VALID_PRIORITY = ['Critical', 'High', 'Medium', 'Low'];
  const VALID_STATUS = ['Open', 'In Progress', 'Resolved', 'Closed', "Won't Fix"];

  if (!data.title || !data.title.trim()) return null;
  if (!VALID_SEVERITY.includes(data.severity)) return null;
  if (!VALID_PRIORITY.includes(data.priority)) return null;
  if (!VALID_STATUS.includes(data.status)) return null;

  db.run(
    `UPDATE bug_reports SET
      title = ?, description = ?, steps_to_reproduce = ?,
      severity = ?, priority = ?, status = ?, environment = ?,
      expected_behavior = ?, actual_behavior = ?, evidence_url = ?,
      reporter = ?, assignee = ?, linked_testcase_id = ?, module = ?,
      updated_at = datetime('now')
    WHERE id = ?`,
    [
      data.title.trim(),
      data.description || '',
      data.steps_to_reproduce || '',
      data.severity,
      data.priority,
      data.status,
      data.environment || '',
      data.expected_behavior || '',
      data.actual_behavior || '',
      data.evidence_url || '',
      data.reporter || '',
      data.assignee || '',
      data.linked_testcase_id || null,
      data.module || '',
      data.id
    ]
  );
  saveDB();
  return queryOne('SELECT * FROM bug_reports WHERE id = ?', [data.id]);
});

ipcMain.handle('delete-bug-report', (_, id) => {
  db.run('DELETE FROM bug_reports WHERE id = ?', [id]);
  saveDB();
  return { success: true };
});

ipcMain.handle('get-bug-stats', (_, projectId) => {
  if (!db) return { total: 0, bySeverity: [], byStatus: [] };

  const where = projectId ? 'WHERE project_id = ?' : '';
  const params = projectId ? [projectId] : [];

  const totalRow = queryOne(`SELECT COUNT(*) as count FROM bug_reports ${where}`, params);
  const total = totalRow?.count || 0;

  if (total === 0) return { total: 0, bySeverity: [], byStatus: [] };

  const bySeverity = queryAll(
    `SELECT severity, COUNT(*) as count FROM bug_reports ${where} GROUP BY severity`,
    params
  );
  const byStatus = queryAll(
    `SELECT status, COUNT(*) as count FROM bug_reports ${where} GROUP BY status`,
    params
  );

  return { total, bySeverity, byStatus };
});

// ─── IPC: Import / Export ────────────────────────────────────────────────────
ipcMain.handle('import-csv', (_, { projectId, csvText }) => {
  const Papa = require('papaparse');
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  
  console.log('CSV Import: Parsed', parsed.data.length, 'rows');
  if (parsed.data.length > 0) {
    console.log('CSV Sample row:', parsed.data[0]);
  }

  let count = 0;
  let skipped = 0;

  for (const row of parsed.data) {
    // Accept any common casing for Title/TITLE/title
    const title = row['TITLE'] || row['Title'] || row['title'] || '';
    
    if (!title.trim()) {
      skipped++;
      console.log('Skipped row (no title):', row);
      continue;
    }

    try {
      run(
        `INSERT INTO testcases (project_id, no, title, website, module, section, test_data, scenario, expected_result, status, evidence, note)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          projectId,
          row['NO'] || row['No'] || row['no'] || '',
          title,
          row['WEBSITE'] || row['Website'] || row['website'] || '',
          row['MODULE'] || row['Module'] || row['module'] || '',
          row['SECTION'] || row['Section'] || row['section'] || '',
          row['TEST DATA'] || row['Test Data'] || row['test_data'] || '',
          row['SCENARIO'] || row['Scenario'] || row['scenario'] || '',
          row['EXPECTED RESULT'] || row['Expected Result'] || row['expected_result'] || '',
          row['STATUS'] || row['Status'] || row['status'] || 'Pending',
          row['EVIDENCE'] || row['Evidence'] || row['evidence'] || '',
          row['NOTE'] || row['Note'] || row['note'] || ''
        ]
      );
      count++;
    } catch (err) {
      console.error('Failed to insert row:', row, err);
      skipped++;
    }
  }

  console.log(`CSV Import complete: ${count} imported, ${skipped} skipped`);
  return { imported: count, skipped };
});

// ─── IPC: Import Allure Results ──────────────────────────────────────────────

// Helper: mapping Allure status → TestCase status
function mapAllureStatus(allureStatus) {
  const s = (allureStatus || '').toLowerCase();
  if (s === 'passed') return 'Pass';
  if (s === 'failed' || s === 'broken') return 'Fail';
  if (s === 'skipped') return 'Skip';
  return 'Pending';
}

// Helper: extract label value dari array labels Allure
function getAllureLabel(labels, name) {
  if (!Array.isArray(labels)) return '';
  const found = labels.find(l => l.name === name);
  return found ? (found.value || '') : '';
}

// Helper: extract steps dari test case Allure jadi string scenario
function extractAllureSteps(steps, indent = '') {
  if (!Array.isArray(steps) || steps.length === 0) return '';
  return steps.map((step, i) => {
    const num = indent ? `  ${indent}${i + 1}.` : `${i + 1}.`;
    const subSteps = step.steps ? extractAllureSteps(step.steps, `${i + 1}.`) : '';
    return `${num} ${step.name || ''}${subSteps ? '\n' + subSteps : ''}`;
  }).join('\n');
}

// Helper: parse satu test case object dari Allure format
function parseAllureTestCase(tc) {
  const title = tc.name || tc.fullName || '';
  if (!title.trim()) return null;

  const status = mapAllureStatus(tc.status);
  const labels = tc.labels || [];
  const module = getAllureLabel(labels, 'suite') ||
                 getAllureLabel(labels, 'parentSuite') ||
                 getAllureLabel(labels, 'package') || '';
  const section = getAllureLabel(labels, 'feature') ||
                  getAllureLabel(labels, 'subSuite') || '';
  const note = getAllureLabel(labels, 'severity') ||
               getAllureLabel(labels, 'story') || '';

  // Steps sebagai scenario
  const scenario = extractAllureSteps(tc.steps);

  // Description sebagai test_data
  const testData = tc.description || tc.descriptionHtml
    ? (tc.description || '').replace(/<[^>]+>/g, '').trim()
    : '';

  // Expected result dari parameters atau expected
  const expectedResult = tc.parameters
    ? tc.parameters.map(p => `${p.name}: ${p.value}`).join(', ')
    : '';

  // Evidence dari attachments
  const evidence = Array.isArray(tc.attachments) && tc.attachments.length > 0
    ? tc.attachments.map(a => a.name || a.source || '').filter(Boolean).join(', ')
    : '';

  // Durasi dalam ms → note tambahan
  const durationNote = tc.duration ? ` [${Math.round(tc.duration / 1000)}s]` : '';

  return {
    title: title.trim(),
    status,
    module,
    section,
    scenario,
    test_data: testData,
    expected_result: expectedResult,
    evidence,
    note: note + durationNote,
  };
}

// Detect format: allure-results (single test) vs allure-report (summary dengan array)
function parseAllureJson(jsonText) {
  let data;
  try {
    data = JSON.parse(jsonText);
  } catch (e) {
    return { error: 'Invalid JSON: ' + e.message, testCases: [] };
  }

  const testCases = [];

  // Format 1: allure-report/data/test-cases/*.json (single test case object)
  if (data.name && (data.status || data.steps)) {
    const tc = parseAllureTestCase(data);
    if (tc) testCases.push(tc);
    return { testCases };
  }

  // Format 2: allure-report summary/widgets (array di field results, tests, atau children)
  const candidates = [
    ...(Array.isArray(data.results) ? data.results : []),
    ...(Array.isArray(data.tests) ? data.tests : []),
    ...(Array.isArray(data.children) ? data.children : []),
    ...(Array.isArray(data) ? data : []),
  ];

  for (const item of candidates) {
    if (!item || typeof item !== 'object') continue;
    // Rekursif untuk nested children (suite structure)
    if (Array.isArray(item.children)) {
      for (const child of item.children) {
        const tc = parseAllureTestCase(child);
        if (tc) testCases.push(tc);
      }
    } else {
      const tc = parseAllureTestCase(item);
      if (tc) testCases.push(tc);
    }
  }

  return { testCases };
}

ipcMain.handle('import-allure', (_, { projectId, jsonText }) => {
  if (!db) return { imported: 0, skipped: 0, errors: ['Database not ready'] };

  const { testCases, error } = parseAllureJson(jsonText);
  if (error) return { imported: 0, skipped: 0, errors: [error] };
  if (!testCases.length) return { imported: 0, skipped: 0, errors: ['Tidak ada test case ditemukan dalam file JSON ini'] };

  let imported = 0;
  let skipped = 0;
  const errors = [];

  for (const tc of testCases) {
    if (!tc.title) { skipped++; continue; }
    try {
      run(
        `INSERT INTO testcases (project_id, no, title, module, section, test_data, scenario, expected_result, status, evidence, note)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          projectId,
          '',
          tc.title,
          tc.module || '',
          tc.section || '',
          tc.test_data || '',
          tc.scenario || '',
          tc.expected_result || '',
          tc.status || 'Pending',
          tc.evidence || '',
          tc.note || '',
        ]
      );
      imported++;
    } catch (err) {
      errors.push(`"${tc.title}": ${err.message}`);
      skipped++;
    }
  }

  saveDB();
  return { imported, skipped, errors };
});

// ─── IPC: SQL Lab ─────────────────────────────────────────────────────────────

// In-memory SQL Lab databases (per schema, per session)
const sqlLabDbs = {};

function getSqlLabDb(schemaKey) {
  if (sqlLabDbs[schemaKey]) return sqlLabDbs[schemaKey];

  const initSqlJs = require('sql.js');
  // We need to return a promise, so we'll use a sync approach
  // Actually initSqlJs is async — we handle this by pre-initializing
  return null;
}

// Pre-initialize sql lab databases
let sqlJsReady = false;
let SQL_LIB = null;

function initSqlLab() {
  const initSqlJs = require('sql.js');
  initSqlJs().then(SQL => {
    SQL_LIB = SQL;
    sqlJsReady = true;
    console.log('SQL Lab ready');
  }).catch(e => console.error('SQL Lab init error:', e));
}

// Call this after app ready
app.whenReady().then(() => {
  setTimeout(initSqlLab, 2000); // delay to not block main db init
});

const SEED_SQL_MAP = {
  hr: require('path').join(__dirname, '../src/components/SQLLab/sqlSeedData.js'),
};

// Read seed from file or hardcode
function getSeedSQL(schemaKey) {
  const seeds = {
    hr: `CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT, manager_id INTEGER, budget REAL);
CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, email TEXT, department_id INTEGER, position TEXT, salary REAL, hire_date TEXT, status TEXT);
CREATE TABLE attendance (id INTEGER PRIMARY KEY, employee_id INTEGER, date TEXT, clock_in TEXT, clock_out TEXT, status TEXT);
CREATE TABLE leave_requests (id INTEGER PRIMARY KEY, employee_id INTEGER, type TEXT, start_date TEXT, end_date TEXT, status TEXT, approved_by INTEGER);
INSERT INTO departments VALUES (1,'Engineering',1,500000),(2,'Marketing',5,300000),(3,'HR',8,200000),(4,'Finance',10,400000),(5,'Operations',12,350000);
INSERT INTO employees VALUES (1,'Andi Pratama','andi@company.com',1,'Senior Engineer',12000000,'2020-01-15','active'),(2,'Budi Santoso','budi@company.com',1,'Junior Engineer',7000000,'2021-03-01','active'),(3,'Citra Dewi','citra@company.com',1,'Engineer',9000000,'2020-06-10','active'),(4,'Dian Rahayu','dian@company.com',2,'Marketing Lead',11000000,'2019-08-20','active'),(5,'Eka Putri','eka@company.com',2,'Marketing Staff',6500000,'2022-01-10','active'),(6,'Fajar Nugroho','fajar@company.com',3,'HR Manager',10000000,'2018-05-15','active'),(7,'Gita Sari','gita@company.com',3,'HR Staff',6000000,'2022-07-01','active'),(8,'Hendra Wijaya','hendra@company.com',4,'Finance Manager',11500000,'2019-02-10','active'),(9,'Indah Kurnia','indah@company.com',4,'Accountant',8000000,'2021-09-01','active'),(10,'Joko Susilo','joko@company.com',5,'Ops Lead',9500000,'2020-11-15','active'),(11,'Kartini','kartini@company.com',1,'Engineer',8500000,'2021-05-20','active'),(12,'Lina Marlina','lina@company.com',2,'Marketing Staff',6500000,'2022-03-15','inactive'),(13,'Mario Kart','mario@company.com',1,'Junior Engineer',7000000,'2023-01-10','active'),(14,'Nita Sari','nita@company.com',3,'HR Staff',6000000,'2022-10-01','active'),(15,'Oki Wibowo','oki@company.com',4,'Accountant',8000000,'2020-04-20','active');
INSERT INTO attendance VALUES (1,1,'2024-01-15','08:00','17:05','present'),(2,1,'2024-01-16','08:15','17:00','present'),(3,2,'2024-01-15','09:30','17:00','late'),(4,2,'2024-01-16','08:00','17:00','present'),(5,3,'2024-01-15',NULL,NULL,'absent'),(6,3,'2024-01-16','08:05','17:10','present'),(7,4,'2024-01-15','08:00','17:00','present'),(8,5,'2024-01-15','10:00','17:00','late'),(9,6,'2024-01-15','08:00','17:00','present'),(10,7,'2024-01-15','08:30','17:00','present'),(11,1,'2024-01-17','08:00','17:00','present'),(12,2,'2024-01-17','08:00',NULL,'present'),(13,8,'2024-01-15','08:00','17:00','present'),(14,9,'2024-01-15','08:00','17:00','present'),(15,10,'2024-01-15','08:00','17:00','present');
INSERT INTO leave_requests VALUES (1,3,'annual','2024-01-15','2024-01-16','approved',6),(2,5,'sick','2024-01-20','2024-01-20','approved',6),(3,7,'annual','2024-02-01','2024-02-05','pending',NULL),(4,2,'sick','2024-01-18','2024-01-18','approved',6),(5,12,'annual','2024-01-10','2024-01-12','rejected',6),(6,13,'annual','2024-03-01','2024-03-03','pending',NULL),(7,1,'annual','2024-04-15','2024-04-16','approved',6),(8,4,'sick','2024-01-22','2024-01-22','approved',6);`,
    ecommerce: `CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT, phone TEXT, city TEXT, created_at TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, category TEXT, price REAL, stock INTEGER, is_active INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total_amount REAL, status TEXT, created_at TEXT, payment_method TEXT);
CREATE TABLE order_items (id INTEGER PRIMARY KEY, order_id INTEGER, product_id INTEGER, quantity INTEGER, unit_price REAL);
INSERT INTO customers VALUES (1,'Ahmad Fauzi','ahmad@email.com','081234567890','Jakarta','2023-01-10'),(2,'Bunga Citra','bunga@email.com','082345678901','Bandung','2023-02-15'),(3,'Charlie Brown','charlie@email.com','083456789012','Surabaya','2023-03-20'),(4,'Dewi Sartika','dewi@email.com','084567890123','Yogyakarta','2023-04-05'),(5,'Erik Susanto','erik@email.com','085678901234','Medan','2023-05-12'),(6,'Fitri Handayani','fitri@email.com','086789012345','Jakarta','2023-06-18'),(7,'Guntur Wibowo','guntur@email.com','087890123456','Semarang','2023-07-22'),(8,'Ahmad Fauzi','ahmad.f2@email.com','081234567891','Jakarta','2023-08-01'),(9,'null_user',NULL,'089012345678','Bali','2023-09-10'),(10,'Ira Pratiwi','ira@email.com','080123456789','Jakarta','2023-10-05');
INSERT INTO products VALUES (1,'Laptop ASUS','Electronics',8500000,15,1),(2,'iPhone 15','Electronics',15000000,8,1),(3,'Samsung TV 55"','Electronics',7500000,5,1),(4,'Kaos Polos','Fashion',120000,100,1),(5,'Celana Jeans','Fashion',250000,50,1),(6,'Buku Python','Books',150000,30,1),(7,'Headphones Sony','Electronics',750000,20,1),(8,'Tas Ransel','Fashion',350000,25,1),(9,'Keyboard Mechanical','Electronics',1200000,0,1),(10,'Produk Lama','Electronics',500000,0,0);
INSERT INTO orders VALUES (1,1,8500000,'completed','2024-01-10','transfer'),(2,1,15000000,'completed','2024-01-15','credit_card'),(3,2,370000,'completed','2024-01-12','transfer'),(4,3,8500000,'pending','2024-01-20','transfer'),(5,4,750000,'completed','2024-01-08','gopay'),(6,5,1350000,'cancelled','2024-01-18','transfer'),(7,6,250000,'completed','2024-01-22','ovo'),(8,7,15000000,'completed','2024-01-25','credit_card'),(9,2,8500000,'completed','2024-01-28','transfer'),(10,1,1200000,'pending','2024-02-01','transfer'),(11,8,750000,'completed','2024-02-03','gopay'),(12,9,250000,'completed','2024-02-05','transfer');
INSERT INTO order_items VALUES (1,1,1,1,8500000),(2,2,2,1,15000000),(3,3,4,2,120000),(4,3,5,1,250000),(5,4,1,1,8500000),(6,5,7,1,750000),(7,6,1,1,8500000),(8,6,6,2,150000),(9,7,5,1,250000),(10,8,2,1,15000000),(11,9,1,1,8500000),(12,10,9,1,1200000),(13,11,7,1,750000),(14,12,5,1,250000);`,
    banking: `CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, nik TEXT, email TEXT, phone TEXT, joined_at TEXT);
CREATE TABLE accounts (id INTEGER PRIMARY KEY, customer_id INTEGER, account_number TEXT, type TEXT, balance REAL, status TEXT);
CREATE TABLE transactions (id INTEGER PRIMARY KEY, account_id INTEGER, type TEXT, amount REAL, balance_after REAL, description TEXT, created_at TEXT);
CREATE TABLE loans (id INTEGER PRIMARY KEY, customer_id INTEGER, amount REAL, interest_rate REAL, status TEXT, due_date TEXT);
INSERT INTO customers VALUES (1,'Budi Hartono','3201010101010001','budi@bank.com','081111111111','2020-01-15'),(2,'Sari Dewi','3201010101010002','sari@bank.com','082222222222','2020-03-20'),(3,'Anto Wijaya','3201010101010003','anto@bank.com','083333333333','2021-05-10'),(4,'Maya Putri','3201010101010004','maya@bank.com','084444444444','2021-08-15'),(5,'Rudi Santoso','3201010101010005','rudi@bank.com','085555555555','2022-01-20'),(6,'Linda Sari','3201010101010001','linda@bank.com','086666666666','2022-04-10'),(7,'Doni Prasetyo','3201010101010007','doni@bank.com','087777777777','2023-01-05'),(8,'Eka Nugraha',NULL,'eka@bank.com','088888888888','2023-06-15');
INSERT INTO accounts VALUES (1,1,'1000000001','savings',15000000,'active'),(2,1,'1000000002','checking',5000000,'active'),(3,2,'1000000003','savings',25000000,'active'),(4,3,'1000000004','savings',3000000,'active'),(5,4,'1000000005','checking',8000000,'active'),(6,5,'1000000006','savings',1000000,'active'),(7,6,'1000000007','savings',12000000,'active'),(8,7,'1000000008','savings',500000,'active'),(9,8,'1000000009','savings',0,'inactive'),(10,1,'1000000010','savings',7000000,'active');
INSERT INTO transactions VALUES (1,1,'deposit',5000000,20000000,'Setoran tunai','2024-01-10 09:00:00'),(2,1,'withdrawal',2000000,18000000,'Tarik tunai ATM','2024-01-11 14:30:00'),(3,1,'transfer',3000000,15000000,'Transfer ke rek 1000000003','2024-01-12 10:00:00'),(4,3,'deposit',3000000,28000000,'Terima transfer','2024-01-12 10:01:00'),(5,2,'withdrawal',1000000,4000000,'Tarik ATM','2024-01-13 16:00:00'),(6,4,'deposit',1000000,4000000,'Setoran tunai','2024-01-15 08:30:00'),(7,5,'transfer',2000000,6000000,'Transfer gaji','2024-01-20 07:00:00'),(8,6,'withdrawal',500000,500000,'Tarik ATM','2024-01-21 12:00:00'),(9,9,'deposit',100000,100000,'Setoran pembukaan','2023-06-15 09:00:00'),(10,9,'withdrawal',100000,0,'Penutupan rekening','2023-07-01 14:00:00'),(11,1,'deposit',2000000,17000000,'Setoran gaji','2024-02-01 08:00:00'),(12,3,'withdrawal',5000000,23000000,'Tarik tunai','2024-02-05 11:00:00');
INSERT INTO loans VALUES (1,1,50000000,12.5,'active','2025-01-15'),(2,2,100000000,11.0,'active','2026-03-20'),(3,3,25000000,13.0,'active','2024-05-10'),(4,4,75000000,12.0,'closed','2023-08-15'),(5,5,30000000,14.0,'overdue','2023-12-20'),(6,7,20000000,13.5,'active','2025-06-05');`
  };
  return seeds[schemaKey] || '';
}

ipcMain.handle('run-sql', (_, { schema, query }) => {
  if (!SQL_LIB) return { error: 'SQL Lab belum siap, coba beberapa detik lagi', columns: [], rows: [] };
  try {
    // Get or create in-memory db for this schema
    if (!sqlLabDbs[schema]) {
      sqlLabDbs[schema] = new SQL_LIB.Database();
      const seed = getSeedSQL(schema);
      if (seed) {
        // Execute each statement
        const stmts = seed.split(';').map(s => s.trim()).filter(Boolean);
        for (const stmt of stmts) {
          try { sqlLabDbs[schema].run(stmt + ';'); } catch (e) { console.warn('Seed error:', e.message); }
        }
      }
    }
    const labDb = sqlLabDbs[schema];
    const results = labDb.exec(query);
    if (!results || results.length === 0) {
      return { columns: [], rows: [] };
    }
    const { columns, values } = results[0];
    const rows = values.map(row => {
      const obj = {};
      columns.forEach((col, i) => { obj[col] = row[i]; });
      return obj;
    });
    return { columns, rows };
  } catch (e) {
    return { error: e.message, columns: [], rows: [] };
  }
});

// Handler untuk dialog pilih JSON file (Allure)
ipcMain.handle('open-json-dialog', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'JSON Files', extensions: ['json'] }]
  });
  if (result.canceled || !result.filePaths.length) return null;
  // Return semua file sebagai array of text
  return result.filePaths.map(fp => ({
    name: path.basename(fp),
    content: fs.readFileSync(fp, 'utf-8'),
  }));
});

ipcMain.handle('open-file-dialog', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'CSV Files', extensions: ['csv'] }]
  });
  if (result.canceled) return null;
  return fs.readFileSync(result.filePaths[0], 'utf-8');
});

ipcMain.handle('save-file-dialog', async (_, { defaultName, content }) => {
  const result = await dialog.showSaveDialog({
    defaultPath: defaultName,
    filters: [{ name: 'CSV Files', extensions: ['csv'] }]
  });
  if (result.canceled) return { success: false };
  fs.writeFileSync(result.filePath, content, 'utf-8');
  return { success: true, filePath: result.filePath };
});

// ─── IPC: Export Allure JSON ──────────────────────────────────────────────────

// Mapping TestCase status → Allure status
function tcStatusToAllure(tcStatus) {
  const s = (tcStatus || '').toLowerCase();
  if (s === 'pass') return 'passed';
  if (s === 'fail') return 'failed';
  if (s === 'skip') return 'skipped';
  if (s === 'blocked') return 'broken';
  return 'unknown'; // Pending
}

// Konversi satu test case ke format Allure result JSON
function tcToAllureResult(tc) {
  const uuid = `${tc.id}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const labels = [];
  if (tc.module) labels.push({ name: 'suite', value: tc.module });
  if (tc.section) labels.push({ name: 'subSuite', value: tc.section });
  if (tc.note) labels.push({ name: 'story', value: tc.note });
  if (tc.no) labels.push({ name: 'testId', value: tc.no });
  labels.push({ name: 'framework', value: 'manual' });
  labels.push({ name: 'host', value: 'DiyahQA Hub' });

  // Parse scenario menjadi steps
  const steps = [];
  if (tc.scenario) {
    const lines = tc.scenario.split('\n').filter(l => l.trim());
    lines.forEach((line, i) => {
      const cleanLine = line.replace(/^\d+[\.\)]\s*/, '').trim();
      if (cleanLine) {
        steps.push({
          name: cleanLine,
          status: tcStatusToAllure(tc.status),
          stage: 'finished',
          start: Date.now() + i,
          stop: Date.now() + i + 1,
          steps: [],
          attachments: [],
          parameters: [],
        });
      }
    });
  }

  // Links dari evidence
  const links = [];
  if (tc.evidence && tc.evidence.trim()) {
    links.push({ name: 'Evidence', url: tc.evidence.trim(), type: 'tms' });
  }

  // Parameters dari test_data
  const parameters = [];
  if (tc.test_data) {
    parameters.push({ name: 'Test Data', value: tc.test_data });
  }

  return {
    uuid,
    historyId: `${tc.no || tc.id}-${tc.title}`,
    testCaseId: String(tc.id),
    fullName: tc.no ? `${tc.no} - ${tc.title}` : tc.title,
    name: tc.title,
    status: tcStatusToAllure(tc.status),
    stage: 'finished',
    description: tc.expected_result || '',
    start: tc.created_at ? new Date(tc.created_at).getTime() : Date.now(),
    stop: tc.updated_at ? new Date(tc.updated_at).getTime() : Date.now(),
    labels,
    links,
    parameters,
    steps,
    attachments: [],
  };
}

ipcMain.handle('export-allure-json', async (_, { projectId, testcaseIds }) => {
  if (!db) return { success: false, error: 'Database not ready' };

  let testcases;
  if (testcaseIds && testcaseIds.length > 0) {
    // Export hanya yang dipilih
    const placeholders = testcaseIds.map(() => '?').join(',');
    testcases = queryAll(
      `SELECT * FROM testcases WHERE id IN (${placeholders}) ORDER BY no ASC, created_at ASC`,
      testcaseIds
    );
  } else if (projectId) {
    testcases = queryAll(
      'SELECT * FROM testcases WHERE project_id = ? ORDER BY no ASC, created_at ASC',
      [projectId]
    );
  } else {
    return { success: false, error: 'Tidak ada data yang di-export' };
  }

  if (!testcases.length) return { success: false, error: 'Tidak ada test case ditemukan' };

  // Pilih folder tujuan
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
    message: 'Pilih folder untuk menyimpan file Allure JSON',
  });
  if (result.canceled) return { success: false, canceled: true };

  const outputDir = path.join(result.filePaths[0], 'allure-results');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  let exported = 0;
  for (const tc of testcases) {
    const allureResult = tcToAllureResult(tc);
    const filename = `${allureResult.uuid}-result.json`;
    fs.writeFileSync(path.join(outputDir, filename), JSON.stringify(allureResult, null, 2), 'utf-8');
    exported++;
  }

  // Juga buat satu file summary (array semua hasil)
  const summary = testcases.map(tc => tcToAllureResult(tc));
  fs.writeFileSync(
    path.join(result.filePaths[0], 'allure-results-summary.json'),
    JSON.stringify(summary, null, 2),
    'utf-8'
  );

  return {
    success: true,
    exported,
    outputDir,
    summaryFile: path.join(result.filePaths[0], 'allure-results-summary.json'),
  };
});

// ─── IPC: Import Bug Reports ─────────────────────────────────────────────────

// Helper: mapping priority Plane → priority bug report
function mapPlanePriority(planePriority) {
  const p = (planePriority || '').toLowerCase().trim();
  if (p === 'urgent') return 'High';
  if (p === 'high') return 'High';
  if (p === 'medium') return 'Medium';
  if (p === 'low') return 'Low';
  return 'Medium';
}

// Helper: mapping severity dari Plane Labels
function mapPlaneSeverity(labels) {
  const l = (labels || '').toLowerCase();
  if (l.includes('critical')) return 'Critical';
  if (l.includes('urgent')) return 'Critical';
  if (l.includes('high')) return 'High';
  if (l.includes('bug')) return 'High';
  if (l.includes('medium')) return 'Medium';
  if (l.includes('enhancement')) return 'Medium';
  if (l.includes('low')) return 'Low';
  return 'Medium';
}

// Helper: mapping status Plane → status bug report
function mapPlaneStatus(planeState) {
  const s = (planeState || '').toLowerCase().trim();
  if (s === 'done' || s === 'live in production') return 'Resolved';
  if (s === 'cancelled' || s === 'rejected' || s === 'reject') return "Won't Fix";
  if (s === 'backlog' || s === 'to do') return 'Open';
  if (s === 'on progress fe' || s === 'on progress be' || s === 'ready up production' || s === 'ready to test') return 'In Progress';
  if (s === 'in progress') return 'In Progress';
  return 'Open';
}

// Import CSV biasa (format standar bug report)
ipcMain.handle('import-bug-csv', (_, { projectId, csvText }) => {
  if (!db) return { imported: 0, skipped: 0, errors: ['Database not ready'] };
  const Papa = require('papaparse');
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });

  let imported = 0;
  let skipped = 0;
  const errors = [];

  for (const row of parsed.data) {
    const title = row['Title'] || row['title'] || row['TITLE'] || '';
    if (!title.trim()) { skipped++; continue; }

    const bugNumber = (row['Bug Number'] || row['bug_number'] || '').trim();
    const finalBugNumber = bugNumber || generateBugNumber(projectId);

    const VALID_SEVERITY = ['Critical', 'High', 'Medium', 'Low'];
    const VALID_STATUS = ['Open', 'In Progress', 'Resolved', 'Closed', "Won't Fix"];
    const VALID_PRIORITY = ['High', 'Medium', 'Low'];

    const severity = VALID_SEVERITY.includes(row['Severity']) ? row['Severity'] : 'Medium';
    const priority = VALID_PRIORITY.includes(row['Priority']) ? row['Priority'] : 'Medium';
    const status = VALID_STATUS.includes(row['Status']) ? row['Status'] : 'Open';

    try {
      db.run(
        `INSERT OR IGNORE INTO bug_reports (
          project_id, bug_number, title, description, steps_to_reproduce,
          severity, priority, status, environment, expected_behavior,
          actual_behavior, evidence_url, reporter, assignee, module,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
        [
          projectId,
          finalBugNumber,
          title.trim(),
          row['Description'] || row['description'] || '',
          row['Steps to Reproduce'] || row['steps_to_reproduce'] || '',
          severity,
          priority,
          status,
          row['Environment'] || row['environment'] || '',
          row['Expected Behavior'] || row['expected_behavior'] || '',
          row['Actual Behavior'] || row['actual_behavior'] || '',
          row['Evidence URL'] || row['evidence_url'] || '',
          row['Reporter'] || row['reporter'] || '',
          row['Assignee'] || row['assignee'] || '',
          row['Module'] || row['module'] || '',
        ]
      );
      imported++;
    } catch (err) {
      errors.push(`Row "${title}": ${err.message}`);
      skipped++;
    }
  }

  saveDB();
  return { imported, skipped, errors };
});

// Import dari Plane CSV export
ipcMain.handle('import-bug-plane', (_, { projectId, csvText }) => {
  if (!db) return { imported: 0, skipped: 0, errors: ['Database not ready'] };
  const Papa = require('papaparse');
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });

  let imported = 0;
  let skipped = 0;
  const errors = [];

  for (const row of parsed.data) {
    // Kolom Plane: ID, Project, Name, Description, State, Priority, Assignee, Created By, Labels, Module Name
    const title = (row['Name'] || '').trim();
    if (!title) { skipped++; continue; }

    const planeId = (row['ID'] || '').trim(); // e.g. HRMSS-35
    const description = (row['Description'] || '').trim();
    const state = row['State'] || '';
    const planePriority = row['Priority'] || '';
    const labels = row['Labels'] || '';
    const assignee = (row['Assignee'] || '').trim();
    const reporter = (row['Created By'] || '').trim();
    const moduleName = (row['Module Name'] || '').trim();

    const status = mapPlaneStatus(state);
    const priority = mapPlanePriority(planePriority);
    const severity = mapPlaneSeverity(labels);

    // Gunakan Plane ID sebagai bug_number (e.g. HRMSS-35)
    const bugNumber = planeId || generateBugNumber(projectId);

    try {
      db.run(
        `INSERT OR IGNORE INTO bug_reports (
          project_id, bug_number, title, description,
          severity, priority, status, reporter, assignee, module,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
        [
          projectId,
          bugNumber,
          title,
          description,
          severity,
          priority,
          status,
          reporter,
          assignee,
          moduleName,
        ]
      );
      imported++;
    } catch (err) {
      errors.push(`Row "${title}" (${planeId}): ${err.message}`);
      skipped++;
    }
  }

  saveDB();
  return { imported, skipped, errors };
});

// ─── IPC: API Lab — HTTP Request Executor ────────────────────────────────────
ipcMain.handle('api-request', async (_, { method, url, headers, body, timeout }) => {
  const https = require('https');
  const http  = require('http');
  const { URL } = require('url');

  return new Promise((resolve) => {
    const startTime = Date.now();
    let parsedUrl;

    try {
      parsedUrl = new URL(url);
    } catch {
      return resolve({ ok: false, error: `URL tidak valid: ${url}`, status: 0, headers: {}, body: '', duration: 0 });
    }

    const isHttps = parsedUrl.protocol === 'https:';
    const lib     = isHttps ? https : http;

    const reqHeaders = {};
    if (headers && typeof headers === 'object') {
      Object.entries(headers).forEach(([k, v]) => { if (k && v) reqHeaders[k] = v; });
    }

    let bodyStr = '';
    if (body && ['POST', 'PUT', 'PATCH'].includes((method || 'GET').toUpperCase())) {
      bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      if (!reqHeaders['Content-Type'] && !reqHeaders['content-type']) {
        reqHeaders['Content-Type'] = 'application/json';
      }
      reqHeaders['Content-Length'] = Buffer.byteLength(bodyStr);
    }

    const options = {
      hostname: parsedUrl.hostname,
      port:     parsedUrl.port || (isHttps ? 443 : 80),
      path:     parsedUrl.pathname + parsedUrl.search,
      method:   (method || 'GET').toUpperCase(),
      headers:  reqHeaders,
      timeout:  timeout || 30000,
      rejectUnauthorized: false, // allow self-signed certs di staging
    };

    const req = lib.request(options, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const duration = Date.now() - startTime;
        const rawBody  = Buffer.concat(chunks).toString('utf-8');
        resolve({
          ok:       res.statusCode >= 200 && res.statusCode < 300,
          status:   res.statusCode,
          statusText: res.statusMessage || '',
          headers:  res.headers,
          body:     rawBody,
          duration,
          size:     Buffer.byteLength(rawBody, 'utf-8'),
        });
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, error: `Timeout setelah ${timeout || 30000}ms`, status: 0, headers: {}, body: '', duration: Date.now() - startTime });
    });

    req.on('error', (err) => {
      resolve({ ok: false, error: err.message, status: 0, headers: {}, body: '', duration: Date.now() - startTime });
    });

    if (bodyStr) req.write(bodyStr);
    req.end();
  });
});

// ─── IPC: API Lab — Save File (Playwright export) ────────────────────────────
ipcMain.handle('save-text-file', async (_, { defaultName, content, filters }) => {
  const result = await dialog.showSaveDialog({
    defaultPath: defaultName || 'output.ts',
    filters: filters || [{ name: 'TypeScript', extensions: ['ts'] }, { name: 'All Files', extensions: ['*'] }],
  });
  if (result.canceled) return { success: false };
  fs.writeFileSync(result.filePath, content, 'utf-8');
  return { success: true, filePath: result.filePath };
});

// ─── IPC: Web Automation Lab ──────────────────────────────────────────────────
const { spawn, execSync } = require('child_process');
const os = require('os');

const PROJECTS_DIR = path.join(os.homedir(), 'DiyahQA-Projects');

// ── Resolve node full path
function resolveNode() {
  if (process.platform === 'win32') return 'node';
  const candidates = [
    '/usr/local/bin/node',     // Intel macOS / nvm default symlink
    '/opt/homebrew/bin/node',  // Apple Silicon homebrew
    '/usr/bin/node',
    path.join(os.homedir(), '.nvm/versions/node'),
  ];
  // Check ~/.nvm/versions/node/v*/bin/node (pick latest)
  const nvmDir = path.join(os.homedir(), '.nvm/versions/node');
  if (fs.existsSync(nvmDir)) {
    try {
      const versions = fs.readdirSync(nvmDir).sort().reverse();
      for (const v of versions) {
        const np = path.join(nvmDir, v, 'bin', 'node');
        if (fs.existsSync(np)) return np;
      }
    } catch {}
  }
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  try {
    const found = execSync('zsh -l -c "which node"', { timeout: 5000 }).toString().trim();
    if (found && fs.existsSync(found)) return found;
  } catch {}
  try {
    const found = execSync('bash -l -c "which node"', { timeout: 5000 }).toString().trim();
    if (found && fs.existsSync(found)) return found;
  } catch {}
  return 'node';
}

// ── Build enriched env for spawn (inject PATH so npx can find node)
function buildSpawnEnv() {
  const nodePath = resolveNode();
  const nodeDir = path.dirname(nodePath); // e.g. /usr/local/bin
  const existingPath = process.env.PATH || '';
  // Prepend common locations so npx / node / npm are always findable
  const extraPaths = [
    nodeDir,
    '/usr/local/bin',
    '/opt/homebrew/bin',
    '/usr/bin',
    '/bin',
  ];
  const merged = [...new Set([...extraPaths, ...existingPath.split(':')])].join(':');
  return { ...process.env, PATH: merged };
}

// ── Resolve npm full path (fix untuk Electron di macOS GUI — PATH terbatas)
function resolveNpm() {
  if (process.platform === 'win32') return 'npm.cmd';
  // Coba lokasi umum npm di macOS / Linux
  const candidates = [
    '/opt/homebrew/bin/npm',   // Apple Silicon homebrew
    '/usr/local/bin/npm',      // Intel homebrew / nvm default
    '/usr/bin/npm',
    path.join(os.homedir(), '.nvm/versions/node/node_modules/.bin/npm'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  // Fallback: cari via which di login shell agar PATH dari ~/.zshrc / ~/.bashrc terbaca
  try {
    const found = execSync('zsh -l -c "which npm"', { timeout: 5000 }).toString().trim();
    if (found && fs.existsSync(found)) return found;
  } catch {}
  try {
    const found = execSync('bash -l -c "which npm"', { timeout: 5000 }).toString().trim();
    if (found && fs.existsSync(found)) return found;
  } catch {}
  return 'npm'; // last resort
}

// ── Resolve npx full path
function resolveNpx() {
  if (process.platform === 'win32') return 'npx.cmd';
  const npmPath = resolveNpm();
  const npxPath = npmPath.replace(/npm$/, 'npx');
  if (fs.existsSync(npxPath)) return npxPath;
  // Coba lokasi umum
  const candidates = ['/opt/homebrew/bin/npx', '/usr/local/bin/npx', '/usr/bin/npx'];
  for (const c of candidates) { if (fs.existsSync(c)) return c; }
  try {
    const found = execSync('zsh -l -c "which npx"', { timeout: 5000 }).toString().trim();
    if (found && fs.existsSync(found)) return found;
  } catch {}
  return 'npx';
}

// Pastikan base folder ada
function ensureProjectsDir() {
  if (!fs.existsSync(PROJECTS_DIR)) fs.mkdirSync(PROJECTS_DIR, { recursive: true });
}

// Helper: kirim log realtime ke renderer
let automationWindow = null;
function setAutomationWindow(win) { automationWindow = win; }
function sendLog(channel, data) {
  if (automationWindow && !automationWindow.isDestroyed()) {
    automationWindow.webContents.send(channel, data);
  }
}

// ── List projects
ipcMain.handle('wa-list-projects', () => {
  ensureProjectsDir();
  try {
    return fs.readdirSync(PROJECTS_DIR)
      .filter(name => {
        const pkgPath = path.join(PROJECTS_DIR, name, 'package.json');
        return fs.existsSync(pkgPath);
      })
      .map(name => {
        const pkgPath = path.join(PROJECTS_DIR, name, 'package.json');
        const cfgPath = path.join(PROJECTS_DIR, name, 'playwright.config.ts');
        let pkg = {};
        try { pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')); } catch {}
        const testDir = path.join(PROJECTS_DIR, name, 'tests');
        let testCount = 0;
        if (fs.existsSync(testDir)) {
          testCount = fs.readdirSync(testDir).filter(f => f.endsWith('.spec.ts')).length;
        }
        return {
          name,
          path: path.join(PROJECTS_DIR, name),
          hasConfig: fs.existsSync(cfgPath),
          testCount,
          type: pkg.diyahqa_type || 'web',
        };
      });
  } catch (e) {
    return [];
  }
});

// ── Create project + npm install
ipcMain.handle('wa-create-project', async (event, { name, type, baseUrl }) => {
  ensureProjectsDir();
  const projDir = path.join(PROJECTS_DIR, name.replace(/[^a-zA-Z0-9-_]/g, '-'));

  if (fs.existsSync(projDir)) return { success: false, error: 'Project dengan nama ini sudah ada.' };

  fs.mkdirSync(projDir, { recursive: true });
  ['tests', 'pages', 'utils', 'data', 'fixtures'].forEach(d =>
    fs.mkdirSync(path.join(projDir, d), { recursive: true })
  );

  // package.json
  const pkg = {
    name: name.replace(/\s+/g, '-').toLowerCase(),
    version: '1.0.0',
    description: `${type === 'api' ? 'API' : 'Web'} automation project — ${name}`,
    diyahqa_type: type || 'web',
    scripts: {
      test:   'npx playwright test',
      debug:  'npx playwright test --debug',
      headed: 'npx playwright test --headed',
      report: 'npx playwright show-report',
      allure: 'npx allure generate allure-results -o allure-report --clean',
    },
    devDependencies: {
      '@playwright/test': '^1.44.0',
      'allure-playwright': '^2.9.0',
      'allure-commandline': '^2.24.0',
    },
  };
  fs.writeFileSync(path.join(projDir, 'package.json'), JSON.stringify(pkg, null, 2));

  // playwright.config.ts
  const baseUrlLine = baseUrl ? `\n  use: {\n    baseURL: '${baseUrl}',\n    screenshot: 'only-on-failure',\n    video: 'retain-on-failure',\n    trace: 'on-first-retry',\n  },` : `\n  use: {\n    screenshot: 'only-on-failure',\n    video: 'retain-on-failure',\n    trace: 'on-first-retry',\n  },`;
  const config = `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  reporter: [['allure-playwright'], ['html', { open: 'never' }], ['list']],${baseUrlLine}
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
`;
  fs.writeFileSync(path.join(projDir, 'playwright.config.ts'), config);

  // .gitignore
  fs.writeFileSync(path.join(projDir, '.gitignore'),
    'node_modules/\ntest-results/\nplaywright-report/\nallure-results/\nallure-report/\n.env\n');

  // fixtures/index.ts
  fs.writeFileSync(path.join(projDir, 'fixtures', 'index.ts'),
    `import { test as base } from '@playwright/test';\n\nexport const test = base.extend({});\nexport { expect } from '@playwright/test';\n`);

  // utils/helpers.ts
  fs.writeFileSync(path.join(projDir, 'utils', 'helpers.ts'),
    `// Utility functions\nexport function randomEmail() {\n  return \`test_\${Date.now()}@example.com\`;\n}\n`);

  // Contoh test
  if (type === 'api') {
    fs.writeFileSync(path.join(projDir, 'tests', 'sample-api.spec.ts'),
      `import { test, expect } from '@playwright/test';\n\ntest('sample API test', async ({ request }) => {\n  const response = await request.get('${baseUrl || 'https://jsonplaceholder.typicode.com'}/todos/1');\n  expect(response.status()).toBe(200);\n  const json = await response.json();\n  expect(json).toHaveProperty('id');\n});\n`);
  } else {
    fs.writeFileSync(path.join(projDir, 'tests', 'sample.spec.ts'),
      `import { test, expect } from '@playwright/test';\n\ntest('sample web test', async ({ page }) => {\n  await page.goto('${baseUrl || 'https://example.com'}');\n  await expect(page).toHaveTitle(/.+/);\n});\n`);
  }

  // Run npm install async dengan stream log
  return new Promise((resolve) => {
    const npmCmd = resolveNpm();
    const child = spawn(npmCmd, ['install'], { cwd: projDir, stdio: 'pipe', env: buildSpawnEnv() });

    child.stdout.on('data', d => sendLog('wa-setup-log', { type: 'info', text: d.toString() }));
    child.stderr.on('data', d => sendLog('wa-setup-log', { type: 'warn', text: d.toString() }));

    child.on('close', (code) => {
      if (code === 0) {
        // Install Playwright browsers
        const npxCmd = resolveNpx();
        const pw = spawn(npxCmd, ['playwright', 'install', '--with-deps', 'chromium'], { cwd: projDir, stdio: 'pipe', env: buildSpawnEnv() });
        pw.stdout.on('data', d => sendLog('wa-setup-log', { type: 'info', text: d.toString() }));
        pw.stderr.on('data', d => sendLog('wa-setup-log', { type: 'warn', text: d.toString() }));
        pw.on('close', (pwCode) => {
          sendLog('wa-setup-log', { type: pwCode === 0 ? 'success' : 'error', text: pwCode === 0 ? '✅ Setup selesai! Project siap digunakan.' : '⚠️ Browser install mungkin perlu dijalankan manual: npx playwright install chromium' });
          resolve({ success: true, path: projDir });
        });
      } else {
        sendLog('wa-setup-log', { type: 'error', text: `❌ npm install gagal (exit code ${code})` });
        resolve({ success: false, error: `npm install failed with code ${code}` });
      }
    });
  });
});

// ── Read/Write file di project
ipcMain.handle('wa-read-file', (_, { projPath, relPath }) => {
  const fullPath = path.join(projPath, relPath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, 'utf-8');
});

ipcMain.handle('wa-write-file', (_, { projPath, relPath, content }) => {
  const fullPath = path.join(projPath, relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf-8');
  return { success: true };
});

ipcMain.handle('wa-list-files', (_, { projPath, dir }) => {
  const target = path.join(projPath, dir || '');
  if (!fs.existsSync(target)) {
    // Buat folder dan file sample jika belum ada
    fs.mkdirSync(target, { recursive: true });
    if (dir === 'tests') {
      const sample = path.join(target, 'sample.spec.ts');
      if (!fs.existsSync(sample)) {
        const pkg = (() => { try { return JSON.parse(fs.readFileSync(path.join(projPath, 'package.json'), 'utf-8')); } catch { return {}; } })();
        const baseUrl = pkg.diyahqa_baseUrl || '';
        const isApi = pkg.diyahqa_type === 'api';
        fs.writeFileSync(sample, isApi
          ? `import { test, expect } from '@playwright/test';\n\ntest('sample API test', async ({ request }) => {\n  const response = await request.get('${baseUrl}/health');\n  expect(response.status()).toBe(200);\n});\n`
          : `import { test, expect } from '@playwright/test';\n\ntest('sample web test', async ({ page }) => {\n  await page.goto('${baseUrl || 'https://example.com'}');\n  await expect(page).toHaveTitle(/.+/);\n});\n`);
      }
    }
    return fs.readdirSync(target).map(name => {
      const stat = fs.statSync(path.join(target, name));
      return { name, isDir: stat.isDirectory(), size: stat.size };
    });
  }
  return fs.readdirSync(target).map(name => {
    const fullPath = path.join(target, name);
    const stat = fs.statSync(fullPath);
    return { name, isDir: stat.isDirectory(), size: stat.size };
  });
});

ipcMain.handle('wa-delete-file', (_, { projPath, relPath }) => {
  const fullPath = path.join(projPath, relPath);
  if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  return { success: true };
});

// ── Run Playwright (stream log)
let activeProcess = null;

ipcMain.handle('wa-run', (event, { projPath, mode, file, grep, headed }) => {
  if (activeProcess) { activeProcess.kill(); activeProcess = null; }

  const npxCmd = resolveNpx();
  let args = ['playwright', 'test'];

  if (mode === 'debug')   args = ['playwright', 'test', '--debug'];
  else if (mode === 'headed') args.push('--headed');
  else if (mode === 'codegen') args = ['playwright', 'codegen'];

  if (file)  args.push(file);
  if (grep)  args.push('--grep', grep);

  sendLog('wa-run-log', { type: 'info', text: `▶ npx ${args.join(' ')}\n` });
  sendLog('wa-run-log', { type: 'info', text: `Using npx: ${resolveNpx()}\n` });

  activeProcess = spawn(npxCmd, args, { cwd: projPath, stdio: 'pipe', env: buildSpawnEnv() });

  activeProcess.stdout.on('data', d => sendLog('wa-run-log', { type: 'info', text: d.toString() }));
  activeProcess.stderr.on('data', d => sendLog('wa-run-log', { type: d.toString().includes('error') ? 'error' : 'warn', text: d.toString() }));

  return new Promise((resolve) => {
    activeProcess.on('close', (code) => {
      activeProcess = null;
      const success = code === 0;
      sendLog('wa-run-log', { type: success ? 'success' : 'error', text: success ? '\n✅ All tests passed!' : `\n❌ Tests failed (exit code ${code})` });
      resolve({ success, code });
    });
  });
});

ipcMain.handle('wa-stop', () => {
  if (activeProcess) { activeProcess.kill(); activeProcess = null; }
  return { success: true };
});

// ── Generate Allure report
ipcMain.handle('wa-allure-report', async (_, { projPath }) => {
  const resultDir = path.join(projPath, 'allure-results');
  const reportDir = path.join(projPath, 'allure-report');

  if (!fs.existsSync(resultDir) || fs.readdirSync(resultDir).length === 0) {
    return { success: false, error: 'Tidak ada allure-results. Jalankan tests dulu.' };
  }

  return new Promise((resolve) => {
    const npxCmd = resolveNpx();
    const child = spawn(npxCmd, ['allure', 'generate', 'allure-results', '-o', 'allure-report', '--clean'], {
      cwd: projPath, stdio: 'pipe', env: buildSpawnEnv(),
    });
    child.stdout.on('data', d => sendLog('wa-run-log', { type: 'info', text: d.toString() }));
    child.stderr.on('data', d => sendLog('wa-run-log', { type: 'warn', text: d.toString() }));
    child.on('close', (code) => {
      resolve({ success: code === 0, reportPath: reportDir });
    });
  });
});

// ── Open Playwright report in browser
ipcMain.handle('wa-open-report', (_, { projPath }) => {
  const reportIndex = path.join(projPath, 'playwright-report', 'index.html');
  const allureIndex = path.join(projPath, 'allure-report', 'index.html');
  const target = fs.existsSync(allureIndex) ? allureIndex : reportIndex;
  if (fs.existsSync(target)) {
    require('electron').shell.openPath(target);
    return { success: true };
  }
  return { success: false, error: 'Report belum ada. Generate report dulu.' };
});

// ── Read test results JSON
ipcMain.handle('wa-read-results', (_, { projPath }) => {
  const jsonPath = path.join(projPath, 'test-results', '.last-run.json');
  const pwReport = path.join(projPath, 'playwright-report', 'data', 'results.json');
  for (const p of [jsonPath, pwReport]) {
    if (fs.existsSync(p)) {
      try { return JSON.parse(fs.readFileSync(p, 'utf-8')); } catch {}
    }
  }
  return null;
});

// ── Codegen (Record) — buka browser untuk record
ipcMain.handle('wa-codegen', (_, { projPath, url, outputFile }) => {
  const npxCmd = resolveNpx();
  const outPath = path.join(projPath, 'tests', outputFile || 'recorded.spec.ts');
  const args = ['playwright', 'codegen', '--output', outPath];
  if (url) args.push(url);

  const child = spawn(npxCmd, args, { cwd: projPath, stdio: 'pipe', detached: false, env: buildSpawnEnv() });
  child.stdout.on('data', d => sendLog('wa-run-log', { type: 'info', text: d.toString() }));
  child.stderr.on('data', d => sendLog('wa-run-log', { type: 'warn', text: d.toString() }));

  return new Promise((resolve) => {
    child.on('close', (code) => {
      const generated = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf-8') : '';
      resolve({ success: code === 0, generatedCode: generated, outputFile: outPath });
    });
  });
});

// Register window untuk log streaming (dipanggil setelah createWindow)
app.on('browser-window-created', (_, win) => { setAutomationWindow(win); });

// ─── IPC: Test Data Manager ───────────────────────────────────────────────────
ipcMain.handle('wa-read-data-files', (_, { projPath }) => {
  const dataDir = path.join(projPath, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    // Buat sample CSV
    fs.writeFileSync(path.join(dataDir, 'sample-data.csv'),
      'email,password,expectedStatus\nqa@test.com,password123,success\nwrong@test.com,wrongpass,error\n');
  }
  return fs.readdirSync(dataDir)
    .filter(f => ['.csv','.json','.xlsx','.ts'].some(ext => f.endsWith(ext)))
    .map(name => {
      const fullPath = path.join(dataDir, name);
      const stat = fs.statSync(fullPath);
      return { name, size: stat.size, ext: path.extname(name) };
    });
});

ipcMain.handle('wa-read-data-file', (_, { projPath, name }) => {
  const fullPath = path.join(projPath, 'data', name);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, 'utf-8');
});

ipcMain.handle('wa-write-data-file', (_, { projPath, name, content }) => {
  const dataDir = path.join(projPath, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, name), content, 'utf-8');
  return { success: true };
});

ipcMain.handle('wa-delete-data-file', (_, { projPath, name }) => {
  const fullPath = path.join(projPath, 'data', name);
  if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  return { success: true };
});

// ─── IPC: Run Configuration ───────────────────────────────────────────────────
ipcMain.handle('wa-read-run-config', (_, { projPath }) => {
  const cfgPath = path.join(projPath, '.diyahqa-run-config.json');
  if (!fs.existsSync(cfgPath)) return null;
  try { return JSON.parse(fs.readFileSync(cfgPath, 'utf-8')); } catch { return null; }
});

ipcMain.handle('wa-write-run-config', (_, { projPath, config }) => {
  const cfgPath = path.join(projPath, '.diyahqa-run-config.json');
  fs.writeFileSync(cfgPath, JSON.stringify(config, null, 2), 'utf-8');
  return { success: true };
});

// ─── IPC: Failure Center — read test-results ─────────────────────────────────
ipcMain.handle('wa-read-failures', (_, { projPath }) => {
  const resultsDir = path.join(projPath, 'test-results');
  if (!fs.existsSync(resultsDir)) return [];

  const failures = [];

  function scanDir(dir) {
    const entries = fs.readdirSync(dir);
    // Look for .png (screenshots), .webm (video), .zip (trace)
    const screenshots = entries.filter(e => e.endsWith('.png'));
    const videos      = entries.filter(e => e.endsWith('.webm') || e.endsWith('.mp4'));
    const traces      = entries.filter(e => e.endsWith('.zip'));

    if (screenshots.length || videos.length || traces.length) {
      const relDir = path.relative(resultsDir, dir);
      const parts  = relDir.split(path.sep);
      failures.push({
        id:          relDir,
        testName:    parts[0] || path.basename(dir),
        dir,
        screenshots: screenshots.map(s => path.join(dir, s)),
        videos:      videos.map(v => path.join(dir, v)),
        traces:      traces.map(t => path.join(dir, t)),
      });
    }

    entries.forEach(e => {
      const full = path.join(dir, e);
      if (fs.statSync(full).isDirectory()) scanDir(full);
    });
  }

  try { scanDir(resultsDir); } catch {}
  return failures;
});

// Read image as base64 for display
ipcMain.handle('wa-read-image', (_, { imagePath }) => {
  if (!fs.existsSync(imagePath)) return null;
  const data = fs.readFileSync(imagePath);
  const ext  = path.extname(imagePath).replace('.', '') || 'png';
  return `data:image/${ext};base64,${data.toString('base64')}`;
});

// Open trace in Playwright trace viewer
ipcMain.handle('wa-open-trace', (_, { projPath, tracePath }) => {
  const npxCmd = resolveNpx();
  const child = spawn(npxCmd, ['playwright', 'show-trace', tracePath], {
    cwd: projPath, stdio: 'ignore', detached: true, env: buildSpawnEnv(),
  });
  child.unref();
  return { success: true };
});

// ─── IPC: Locator Inspector ───────────────────────────────────────────────────
// Launches a Playwright script that opens the URL and enters inspector mode
ipcMain.handle('wa-locator-inspect', async (_, { projPath, url }) => {
  const npxCmd = resolveNpx();

  // Write a temp inspector script
  const tempScript = path.join(projPath, '.tmp-inspector.js');
  const scriptContent = `
const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('${url}');

  // Inject visual inspector overlay
  await page.evaluate(() => {
    let lastEl = null;
    const overlay = document.createElement('div');
    overlay.id = '__diyahqa_overlay__';
    overlay.style.cssText = 'position:fixed;top:0;right:0;z-index:999999;background:rgba(0,0,0,0.85);color:#22c55e;font-family:monospace;font-size:13px;padding:12px 16px;border-radius:0 0 0 10px;max-width:400px;word-break:break-all;pointer-events:none;';
    overlay.textContent = 'Hover elemen untuk inspect locator';
    document.body.appendChild(overlay);

    function getBestLocator(el) {
      if (el.getAttribute('data-testid')) return 'getByTestId("' + el.getAttribute('data-testid') + '")';
      if (el.getAttribute('aria-label')) return 'getByLabel("' + el.getAttribute('aria-label') + '")';
      if (el.getAttribute('placeholder')) return 'getByPlaceholder("' + el.getAttribute('placeholder') + '")';
      const role = el.getAttribute('role') || el.tagName.toLowerCase();
      const text = el.textContent?.trim().slice(0, 40);
      if (text && (role === 'button' || el.tagName === 'BUTTON')) return 'getByRole("button", { name: "' + text + '" })';
      if (el.tagName === 'A' && text) return 'getByRole("link", { name: "' + text + '" })';
      if (el.getAttribute('name')) return 'locator("[name=\\\\"' + el.getAttribute('name') + '\\\\"]")';
      if (el.id) return 'locator("#' + el.id + '")';
      const cls = [...el.classList].filter(c => !c.match(/^(hover|active|focus)/)).slice(0, 2).join('.');
      if (cls) return 'locator(".' + cls + '")';
      return 'locator("' + el.tagName.toLowerCase() + '")';
    }

    document.addEventListener('mouseover', e => {
      if (lastEl) lastEl.style.outline = '';
      lastEl = e.target;
      e.target.style.outline = '2px solid #8b5cf6';
      overlay.textContent = '🎯 ' + getBestLocator(e.target);
    });
  });

  // Keep alive until closed
  await new Promise(r => setTimeout(r, 5 * 60 * 1000));
  await browser.close();
})();
`;
  fs.writeFileSync(tempScript, scriptContent, 'utf-8');

  const nodeCmd = resolveNpm().replace('npm', 'node');
  const child = spawn(nodeCmd, [tempScript], { cwd: projPath, stdio: 'pipe', detached: true, env: buildSpawnEnv() });
  const locators = [];
  child.stdout.on('data', d => sendLog('wa-run-log', { type: 'info', text: d.toString() }));
  child.stderr.on('data', d => sendLog('wa-run-log', { type: 'warn', text: d.toString() }));
  child.unref();
  return { success: true };
});

// ─── IPC: Environment Manager ─────────────────────────────────────────────────
const crypto = require('crypto');
const ENCRYPT_KEY = crypto.createHash('sha256').update(require('os').hostname() + 'diyahqa').digest();

function encryptVal(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPT_KEY, iv);
  const enc = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return iv.toString('hex') + ':' + enc.toString('hex');
}
function decryptVal(text) {
  try {
    const [ivHex, encHex] = text.split(':');
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPT_KEY, Buffer.from(ivHex, 'hex'));
    return Buffer.concat([decipher.update(Buffer.from(encHex, 'hex')), decipher.final()]).toString('utf8');
  } catch { return ''; }
}

ipcMain.handle('get-environments', (_, projectId) => {
  if (!db) return [];
  const envs = projectId
    ? queryAll('SELECT * FROM environments WHERE project_id = ? ORDER BY name', [projectId])
    : queryAll('SELECT * FROM environments ORDER BY name');
  return envs.map(e => ({
    ...e,
    variables: queryAll('SELECT * FROM env_variables WHERE environment_id = ?', [e.id])
      .map(v => ({ ...v, value: v.is_secret ? '••••••' : decryptVal(v.value_encrypted) })),
  }));
});

ipcMain.handle('get-env-decrypted', (_, { envId, keyName }) => {
  if (!db) return null;
  const v = queryOne('SELECT * FROM env_variables WHERE environment_id = ? AND key_name = ?', [envId, keyName]);
  return v ? decryptVal(v.value_encrypted) : null;
});

ipcMain.handle('create-environment', (_, { projectId, name, type, baseUrl }) => {
  if (!db || !name?.trim()) return null;
  const id = run('INSERT INTO environments (project_id, name, type, base_url) VALUES (?,?,?,?)',
    [projectId || null, name.trim(), type || 'staging', baseUrl || '']);
  return queryOne('SELECT * FROM environments WHERE id = ?', [id]);
});

ipcMain.handle('update-environment', (_, { id, name, type, baseUrl }) => {
  if (!db) return null;
  run("UPDATE environments SET name=?, type=?, base_url=?, updated_at=datetime('now') WHERE id=?",
    [name, type, baseUrl || '', id]);
  return queryOne('SELECT * FROM environments WHERE id = ?', [id]);
});

ipcMain.handle('delete-environment', (_, id) => {
  if (!db) return { success: false };
  run('DELETE FROM env_variables WHERE environment_id = ?', [id]);
  run('DELETE FROM environments WHERE id = ?', [id]);
  return { success: true };
});

ipcMain.handle('upsert-env-variable', (_, { environmentId, keyName, value, description, isSecret }) => {
  if (!db) return null;
  const encrypted = encryptVal(value || '');
  const existing = queryOne('SELECT id FROM env_variables WHERE environment_id = ? AND key_name = ?', [environmentId, keyName]);
  if (existing) {
    run('UPDATE env_variables SET value_encrypted=?, description=?, is_secret=? WHERE id=?',
      [encrypted, description || '', isSecret ? 1 : 0, existing.id]);
    return queryOne('SELECT * FROM env_variables WHERE id = ?', [existing.id]);
  }
  const id = run('INSERT INTO env_variables (environment_id, key_name, value_encrypted, description, is_secret) VALUES (?,?,?,?,?)',
    [environmentId, keyName, encrypted, description || '', isSecret ? 1 : 0]);
  return queryOne('SELECT * FROM env_variables WHERE id = ?', [id]);
});

ipcMain.handle('delete-env-variable', (_, id) => {
  run('DELETE FROM env_variables WHERE id = ?', [id]);
  return { success: true };
});

// ─── IPC: Test Plans ──────────────────────────────────────────────────────────
ipcMain.handle('get-test-plans', (_, projectId) => {
  if (!db) return [];
  const plans = projectId
    ? queryAll('SELECT * FROM test_plans WHERE project_id = ? ORDER BY created_at DESC', [projectId])
    : queryAll('SELECT * FROM test_plans ORDER BY created_at DESC');
  return plans.map(p => {
    const items = queryAll('SELECT * FROM test_plan_items WHERE plan_id = ?', [p.id]);
    const total = items.length;
    const passed  = items.filter(i => i.status === 'Pass').length;
    const failed  = items.filter(i => i.status === 'Fail').length;
    const blocked = items.filter(i => i.status === 'Blocked').length;
    const skipped = items.filter(i => i.status === 'Skip').length;
    const notRun  = items.filter(i => i.status === 'Not Run').length;
    return { ...p, total, passed, failed, blocked, skipped, notRun };
  });
});

ipcMain.handle('get-test-plan-detail', (_, planId) => {
  if (!db) return null;
  const plan = queryOne('SELECT * FROM test_plans WHERE id = ?', [planId]);
  if (!plan) return null;
  const items = queryAll(`
    SELECT tpi.*, tc.title, tc.no, tc.module, tc.section, tc.scenario, tc.expected_result
    FROM test_plan_items tpi
    LEFT JOIN testcases tc ON tc.id = tpi.testcase_id
    WHERE tpi.plan_id = ?
    ORDER BY tpi.id
  `, [planId]);
  const total   = items.length;
  const passed  = items.filter(i => i.status === 'Pass').length;
  const failed  = items.filter(i => i.status === 'Fail').length;
  const blocked = items.filter(i => i.status === 'Blocked').length;
  const skipped = items.filter(i => i.status === 'Skip').length;
  const notRun  = items.filter(i => i.status === 'Not Run').length;
  return { ...plan, items, total, passed, failed, blocked, skipped, notRun };
});

ipcMain.handle('create-test-plan', (_, { projectId, name, description, environmentId, testcaseIds }) => {
  if (!db || !name?.trim()) return null;
  const planId = run(
    'INSERT INTO test_plans (project_id, name, description, environment_id) VALUES (?,?,?,?)',
    [projectId, name.trim(), description || '', environmentId || null]
  );
  (testcaseIds || []).forEach(tcId =>
    run('INSERT INTO test_plan_items (plan_id, testcase_id) VALUES (?,?)', [planId, tcId])
  );
  saveDB();
  return queryOne('SELECT * FROM test_plans WHERE id = ?', [planId]);
});

ipcMain.handle('update-plan-item', (_, { itemId, status, note, executedBy, evidence }) => {
  if (!db) return null;
  run(`UPDATE test_plan_items SET status=?, note=?, executed_by=?, evidence=?, executed_at=datetime('now') WHERE id=?`,
    [status, note || '', executedBy || '', evidence || '', itemId]);
  saveDB();
  return queryOne('SELECT * FROM test_plan_items WHERE id = ?', [itemId]);
});

ipcMain.handle('update-test-plan-status', (_, { planId, status }) => {
  if (!db) return null;
  const col = status === 'active' ? ", started_at=datetime('now')" : status === 'completed' ? ", completed_at=datetime('now')" : '';
  run(`UPDATE test_plans SET status=?${col} WHERE id=?`, [status, planId]);
  saveDB();
  return queryOne('SELECT * FROM test_plans WHERE id = ?', [planId]);
});

ipcMain.handle('delete-test-plan', (_, planId) => {
  run('DELETE FROM test_plan_items WHERE plan_id = ?', [planId]);
  run('DELETE FROM test_plans WHERE id = ?', [planId]);
  saveDB();
  return { success: true };
});

// ─── IPC: Requirements / Traceability ────────────────────────────────────────
ipcMain.handle('get-requirements', (_, projectId) => {
  if (!db) return [];
  const reqs = queryAll('SELECT * FROM requirements WHERE project_id = ? ORDER BY code', [projectId]);
  return reqs.map(r => {
    const links = queryAll(`
      SELECT rtl.testcase_id, tc.no, tc.title, tc.status
      FROM requirement_tc_links rtl
      LEFT JOIN testcases tc ON tc.id = rtl.testcase_id
      WHERE rtl.requirement_id = ?`, [r.id]);
    return { ...r, linkedTCs: links };
  });
});

ipcMain.handle('create-requirement', (_, { projectId, code, title, description, priority }) => {
  if (!db || !title?.trim()) return null;
  const id = run('INSERT INTO requirements (project_id, code, title, description, priority) VALUES (?,?,?,?,?)',
    [projectId, code || '', title.trim(), description || '', priority || 'Medium']);
  saveDB();
  return queryOne('SELECT * FROM requirements WHERE id = ?', [id]);
});

ipcMain.handle('update-requirement', (_, { id, code, title, description, priority, status }) => {
  if (!db) return null;
  run("UPDATE requirements SET code=?, title=?, description=?, priority=?, status=?, updated_at=datetime('now') WHERE id=?",
    [code || '', title, description || '', priority || 'Medium', status || 'Active', id]);
  saveDB();
  return queryOne('SELECT * FROM requirements WHERE id = ?', [id]);
});

ipcMain.handle('delete-requirement', (_, id) => {
  run('DELETE FROM requirement_tc_links WHERE requirement_id = ?', [id]);
  run('DELETE FROM requirements WHERE id = ?', [id]);
  saveDB();
  return { success: true };
});

ipcMain.handle('link-requirement-tc', (_, { requirementId, testcaseId }) => {
  if (!db) return null;
  try {
    run('INSERT OR IGNORE INTO requirement_tc_links (requirement_id, testcase_id) VALUES (?,?)',
      [requirementId, testcaseId]);
    saveDB();
  } catch {}
  return { success: true };
});

ipcMain.handle('unlink-requirement-tc', (_, { requirementId, testcaseId }) => {
  run('DELETE FROM requirement_tc_links WHERE requirement_id = ? AND testcase_id = ?', [requirementId, testcaseId]);
  saveDB();
  return { success: true };
});

ipcMain.handle('get-traceability-matrix', (_, projectId) => {
  if (!db) return [];
  const reqs = queryAll('SELECT * FROM requirements WHERE project_id = ? ORDER BY code', [projectId]);
  return reqs.map(r => {
    const links = queryAll(`
      SELECT tc.id, tc.no, tc.title, tc.status
      FROM requirement_tc_links rtl
      LEFT JOIN testcases tc ON tc.id = rtl.testcase_id
      WHERE rtl.requirement_id = ?`, [r.id]);
    const covered = links.length > 0;
    const allPassed = links.length > 0 && links.every(l => l.status === 'Pass');
    return { ...r, linkedTCs: links, covered, allPassed };
  });
});

// ─── IPC: TC Library ─────────────────────────────────────────────────────────
ipcMain.handle('get-tc-library', (_, { search, tag } = {}) => {
  if (!db) return [];
  let sql = 'SELECT * FROM tc_library';
  const params = [];
  const conditions = [];
  if (search) { conditions.push('(title LIKE ? OR module LIKE ?)'); params.push(`%${search}%`, `%${search}%`); }
  if (tag)    { conditions.push('tags LIKE ?'); params.push(`%"${tag}"%`); }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY usage_count DESC, title';
  return queryAll(sql, params);
});

ipcMain.handle('create-tc-library-item', (_, data) => {
  if (!db || !data.title?.trim()) return null;
  const id = run(
    'INSERT INTO tc_library (title, module, section, scenario, expected_result, tags) VALUES (?,?,?,?,?,?)',
    [data.title.trim(), data.module || '', data.section || '', data.scenario || '',
     data.expected_result || '', JSON.stringify(data.tags || [])]
  );
  saveDB();
  return queryOne('SELECT * FROM tc_library WHERE id = ?', [id]);
});

ipcMain.handle('update-tc-library-item', (_, data) => {
  if (!db) return null;
  run("UPDATE tc_library SET title=?, module=?, section=?, scenario=?, expected_result=?, tags=? WHERE id=?",
    [data.title, data.module || '', data.section || '', data.scenario || '',
     data.expected_result || '', JSON.stringify(data.tags || []), data.id]);
  saveDB();
  return queryOne('SELECT * FROM tc_library WHERE id = ?', [data.id]);
});

ipcMain.handle('delete-tc-library-item', (_, id) => {
  run('DELETE FROM tc_library WHERE id = ?', [id]);
  saveDB();
  return { success: true };
});

ipcMain.handle('import-from-library', (_, { projectId, libraryItemIds }) => {
  if (!db || !projectId || !libraryItemIds?.length) return [];
  const imported = [];
  for (const libId of libraryItemIds) {
    const item = queryOne('SELECT * FROM tc_library WHERE id = ?', [libId]);
    if (!item) continue;
    const tcId = run(
      `INSERT INTO testcases (project_id, library_ref_id, title, module, section, scenario, expected_result, status)
       VALUES (?,?,?,?,?,?,?,'Pending')`,
      [projectId, libId, item.title, item.module, item.section, item.scenario, item.expected_result]
    );
    run('UPDATE tc_library SET usage_count = usage_count + 1 WHERE id = ?', [libId]);
    imported.push(queryOne('SELECT * FROM testcases WHERE id = ?', [tcId]));
  }
  saveDB();
  return imported;
});

ipcMain.handle('get-library-tags', () => {
  if (!db) return [];
  const items = queryAll('SELECT tags FROM tc_library');
  const tagSet = new Set();
  items.forEach(i => {
    try { JSON.parse(i.tags || '[]').forEach(t => tagSet.add(t)); } catch {}
  });
  return [...tagSet].sort();
});

// ─── IPC: Documentation Lab ───────────────────────────────────────────────────
ipcMain.handle('get-documents', (_, { projectId, category } = {}) => {
  if (!db) return [];
  let sql = 'SELECT id, project_id, category, title, tags, version, updated_at FROM documents';
  const params = [];
  const conditions = [];
  if (projectId !== undefined) {
    conditions.push(projectId ? 'project_id = ?' : 'project_id IS NULL');
    if (projectId) params.push(projectId);
  }
  if (category) { conditions.push('category = ?'); params.push(category); }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY updated_at DESC';
  return queryAll(sql, params);
});

ipcMain.handle('get-document', (_, id) => {
  if (!db) return null;
  return queryOne('SELECT * FROM documents WHERE id = ?', [id]);
});

ipcMain.handle('create-document', (_, { projectId, category, title, content, tags }) => {
  if (!db || !title?.trim()) return null;
  const id = run(
    'INSERT INTO documents (project_id, category, title, content, tags) VALUES (?,?,?,?,?)',
    [projectId || null, category || 'general', title.trim(), content || '', tags || '']
  );
  saveDB();
  return queryOne('SELECT * FROM documents WHERE id = ?', [id]);
});

ipcMain.handle('update-document', (_, { id, title, content, category, tags }) => {
  if (!db) return null;
  // Save version snapshot first
  const current = queryOne('SELECT content, version FROM documents WHERE id = ?', [id]);
  if (current) {
    run('INSERT INTO document_versions (document_id, content_snapshot, version_number) VALUES (?,?,?)',
      [id, current.content, current.version]);
  }
  const newVersion = (current?.version || 0) + 1;
  run("UPDATE documents SET title=?, content=?, category=?, tags=?, version=?, updated_at=datetime('now') WHERE id=?",
    [title, content || '', category || 'general', tags || '', newVersion, id]);
  saveDB();
  return queryOne('SELECT * FROM documents WHERE id = ?', [id]);
});

ipcMain.handle('delete-document', (_, id) => {
  run('DELETE FROM document_versions WHERE document_id = ?', [id]);
  run('DELETE FROM documents WHERE id = ?', [id]);
  saveDB();
  return { success: true };
});

ipcMain.handle('get-document-versions', (_, documentId) => {
  if (!db) return [];
  return queryAll('SELECT * FROM document_versions WHERE document_id = ? ORDER BY version_number DESC', [documentId]);
});

ipcMain.handle('search-documents', (_, query) => {
  if (!db || !query) return [];
  return queryAll(
    "SELECT id, project_id, category, title, tags, version, updated_at FROM documents WHERE title LIKE ? OR content LIKE ? OR tags LIKE ? ORDER BY updated_at DESC",
    [`%${query}%`, `%${query}%`, `%${query}%`]
  );
});

// ─── IPC: Project Credentials ────────────────────────────────────────────────
ipcMain.handle('get-project-credentials', (_, projectId) => {
  if (!db) return null;
  const cred = queryOne('SELECT * FROM project_credentials WHERE project_id = ?', [projectId]);
  const envCreds = queryAll('SELECT * FROM project_env_credentials WHERE project_id = ?', [projectId]);
  return {
    ...(cred || { project_code: '', version: '', support_pin: '', remark: '' }),
    envCredentials: envCreds.map(e => ({
      ...e,
      username: e.username_encrypted ? decryptVal(e.username_encrypted) : '',
      password: e.password_encrypted ? decryptVal(e.password_encrypted) : '',
    })),
  };
});

ipcMain.handle('save-project-credentials', (_, { projectId, projectCode, version, supportPin, remark, envCredentials }) => {
  if (!db) return null;
  const existing = queryOne('SELECT id FROM project_credentials WHERE project_id = ?', [projectId]);
  if (existing) {
    run("UPDATE project_credentials SET project_code=?, version=?, support_pin=?, remark=?, updated_at=datetime('now') WHERE project_id=?",
      [projectCode || '', version || '', supportPin || '', remark || '', projectId]);
  } else {
    run('INSERT INTO project_credentials (project_id, project_code, version, support_pin, remark) VALUES (?,?,?,?,?)',
      [projectId, projectCode || '', version || '', supportPin || '', remark || '']);
  }
  // Upsert env credentials
  if (envCredentials && Array.isArray(envCredentials)) {
    for (const ec of envCredentials) {
      const existingEnv = queryOne('SELECT id FROM project_env_credentials WHERE project_id = ? AND env_name = ?', [projectId, ec.envName]);
      const usernameEnc = encryptVal(ec.username || '');
      const passwordEnc = encryptVal(ec.password || '');
      if (existingEnv) {
        run('UPDATE project_env_credentials SET site_url=?, username_encrypted=?, password_encrypted=? WHERE id=?',
          [ec.siteUrl || '', usernameEnc, passwordEnc, existingEnv.id]);
      } else {
        run('INSERT INTO project_env_credentials (project_id, env_name, site_url, username_encrypted, password_encrypted) VALUES (?,?,?,?,?)',
          [projectId, ec.envName, ec.siteUrl || '', usernameEnc, passwordEnc]);
      }
    }
  }
  saveDB();
  return { success: true };
});

// ─── IPC: Plane Integration ──────────────────────────────────────────────────

/**
 * getMemberIdByEmail — looks up a project member's user ID by email.
 * Returns the member ID string or null if not found/error.
 */
async function getMemberIdByEmail(apiKey, workspaceSlug, projectId, email, baseUrl) {
  try {
    const path = `/api/v1/workspaces/${workspaceSlug}/projects/${projectId}/members/`;
    const result = await planeRequest('GET', path, apiKey, null, 10000, baseUrl);
    if (!result.ok || !result.data) return null;
    const members = Array.isArray(result.data.results) ? result.data.results
                  : Array.isArray(result.data) ? result.data : [];
    const match = members.find(m =>
      m.member?.email === email ||
      m.email === email
    );
    return match ? (match.member?.id || match.id || null) : null;
  } catch { return null; }
}

// In-session cache for state name lookups (cleared on app restart)
const stateNameCache = {};

/**
 * getStateNameById — looks up a state's display name by its UUID.
 * Results are cached per project to avoid repeated API calls.
 */
async function getStateNameById(apiKey, workspaceSlug, projectId, stateId, baseUrl) {
  const cacheKey = `${workspaceSlug}:${projectId}`;
  if (!stateNameCache[cacheKey]) {
    try {
      const path = `/api/v1/workspaces/${workspaceSlug}/projects/${projectId}/states/`;
      const result = await planeRequest('GET', path, apiKey, null, 10000, baseUrl);
      if (result.ok && result.data) {
        const states = Array.isArray(result.data.results) ? result.data.results
                     : Array.isArray(result.data) ? result.data : [];
        stateNameCache[cacheKey] = {};
        for (const s of states) {
          if (s.id) stateNameCache[cacheKey][s.id] = s.name || s.display_name || null;
        }
      }
    } catch { return null; }
  }
  return stateNameCache[cacheKey]?.[stateId] || null;
}

/**
 * getPlaneConfigRaw — local helper (not an IPC handler).
 * Returns the full unmasked Plane config for use by other IPC handlers.
 * Returns null if no config row exists or decryption fails.
 */
function getPlaneConfigRaw() {
  const row = queryOne('SELECT * FROM plane_config WHERE id = 1');
  if (!row) return null;
  try {
    const apiKey = decryptVal(row.api_key_enc).replace(/[\r\n\t]/g, '').trim();
    return {
      apiKey,
      workspaceSlug: row.workspace_slug,
      projectId: row.project_id,
      baseUrl: row.base_url || 'https://api.plane.so',
      assigneeEmail: row.assignee_email || '',
      gchatWebhookUrl: row.gchat_webhook_url || '',
    };
  } catch { return null; }
}

/**
 * get-plane-config
 * Returns the Plane configuration with the API key masked (last 4 chars visible).
 * Requirements: 1.3, 5.7
 */
ipcMain.handle('get-plane-config', () => {
  try {
    const row = queryOne('SELECT * FROM plane_config WHERE id = 1');
    if (!row) return {};
    const decryptedKey = decryptVal(row.api_key_enc).replace(/[\r\n\t]/g, '').trim();
    const maskedKey = maskApiKey(decryptedKey);
    return {
      apiKey: maskedKey,
      workspaceSlug: row.workspace_slug,
      projectId: row.project_id,
      baseUrl: row.base_url || 'https://api.plane.so',
      assigneeEmail: row.assignee_email || '',
      gchatWebhookUrl: row.gchat_webhook_url || '',
    };
  } catch {
    return {};
  }
});

/**
 * save-plane-config
 * Validates, encrypts API key, and saves to plane_config (id=1, upsert).
 * Requirements: 1.2, 1.6, 1.7, 5.4
 */
ipcMain.handle('save-plane-config', async (_, { apiKey, workspaceSlug, projectId, baseUrl, assigneeEmail, gchatWebhookUrl }) => {
  try {
    if (!isConfigValid({ apiKey, workspaceSlug })) {
      return { success: false, error: 'API Key dan Workspace Slug wajib diisi' };
    }

    const apiKeyEnc = encryptVal(apiKey.replace(/[\r\n\t]/g, '').trim());
    const resolvedBaseUrl = (baseUrl && baseUrl.trim()) ? baseUrl.trim().replace(/\/$/, '') : 'https://api.plane.so';

    db.run(
      `INSERT OR REPLACE INTO plane_config (id, api_key_enc, workspace_slug, project_id, base_url, assignee_email, gchat_webhook_url, updated_at)
       VALUES (1, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      [apiKeyEnc, workspaceSlug, projectId || '', resolvedBaseUrl, assigneeEmail || '', gchatWebhookUrl || '']
    );
    saveDB();

    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

/**
 * transfer-bug-to-plane
 * Transfers a single bug report to Plane as an issue with Todo status.
 * Requirements: 2.2, 2.3, 2.4, 2.6, 2.7, 2.9, 5.5
 */
ipcMain.handle('transfer-bug-to-plane', async (_, { bugId, assigneeEmail }) => {
  try {
    const bug = queryOne('SELECT * FROM bug_reports WHERE id = ?', [bugId]);
    if (!bug) return { success: false, error: 'Bug not found' };

    const config = getPlaneConfigRaw();
    if (!config || !isConfigValid(config)) {
      return { success: false, error: 'Plane API belum dikonfigurasi' };
    }

    const todoState = await getTodoStateId(config.apiKey, config.workspaceSlug, config.projectId, config.baseUrl);
    if (!todoState) {
      return {
        success: false,
        error: 'Gagal mendapatkan initial state dari Plane. Pastikan konfigurasi workspace dan project ID benar.',
      };
    }

    // Lookup assignee member ID from email passed at call time
    let assigneeIds = [];
    const emailToUse = (assigneeEmail && assigneeEmail.trim()) ? assigneeEmail.trim() : (config.assigneeEmail || '');
    if (emailToUse) {
      const memberId = await getMemberIdByEmail(config.apiKey, config.workspaceSlug, config.projectId, emailToUse, config.baseUrl);
      if (memberId) assigneeIds = [memberId];
    }

    const payload = mapBugToPlanePayload(bug, todoState);
    if (assigneeIds.length > 0) payload.assignees = assigneeIds;

    const result = await planeRequest(
      'POST',
      `/api/v1/workspaces/${config.workspaceSlug}/projects/${config.projectId}/issues/`,
      config.apiKey,
      payload,
      10000,
      config.baseUrl
    );

    if (result.status !== 201) {
      return { success: false, error: result.error || `HTTP ${result.status}`, httpStatus: result.status };
    }

    const issueId = result.data?.id;
    const issueUrl = buildPlaneIssueUrl(config.workspaceSlug, config.projectId, issueId, config.baseUrl);
    const initialStatus = todoState.name || 'Backlog';

    db.run(
      'UPDATE bug_reports SET plane_issue_id=?, plane_issue_url=?, plane_status=? WHERE id=?',
      [issueId, issueUrl, initialStatus, bugId]
    );
    saveDB();

    // Send Google Chat notification (fire and forget)
    if (config.gchatWebhookUrl) {
      sendGoogleChatNotification(config.gchatWebhookUrl, bug, issueUrl, emailToUse).catch(() => {});
    }

    return { success: true, planeIssueId: issueId, planeIssueUrl: issueUrl, planeStatus: initialStatus };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

/**
 * transfer-bugs-bulk-to-plane
 * Transfers multiple bug reports to Plane sequentially.
 * Skips bugs that already have a plane_issue_id.
 * Requirements: 3.4, 3.7, 3.9
 */
ipcMain.handle('transfer-bugs-bulk-to-plane', async (_, { bugIds }) => {
  const results = [];
  try {
    const config = getPlaneConfigRaw();
    if (!config || !isConfigValid(config)) {
      return { success: false, error: 'Plane API belum dikonfigurasi', results: [] };
    }

    const todoState = await getTodoStateId(config.apiKey, config.workspaceSlug, config.projectId, config.baseUrl);
    if (!todoState) {
      return { success: false, error: 'Gagal mendapatkan initial state dari Plane', results: [] };
    }

    // Lookup assignee member ID from email if configured
    let assigneeIds = [];
    if (config.assigneeEmail) {
      const memberId = await getMemberIdByEmail(config.apiKey, config.workspaceSlug, config.projectId, config.assigneeEmail, config.baseUrl);
      if (memberId) assigneeIds = [memberId];
    }

    const initialStatus = todoState.name || 'Backlog';

    for (const bugId of (bugIds || [])) {
      try {
        const bug = queryOne('SELECT * FROM bug_reports WHERE id = ?', [bugId]);
        if (!bug) {
          results.push({ bugId, title: '', status: 'failed', error: 'Bug not found' });
          continue;
        }

        if (bug.plane_issue_id) {
          results.push({ bugId, title: bug.title, status: 'skipped', error: 'Sudah ada di Plane' });
          continue;
        }

        const payload = mapBugToPlanePayload(bug, todoState);
        if (assigneeIds.length > 0) payload.assignees = assigneeIds;

        const result = await planeRequest(
          'POST',
          `/api/v1/workspaces/${config.workspaceSlug}/projects/${config.projectId}/issues/`,
          config.apiKey,
          payload,
          10000,
          config.baseUrl
        );

        if (result.status === 201) {
          const issueId = result.data?.id;
          const issueUrl = buildPlaneIssueUrl(config.workspaceSlug, config.projectId, issueId, config.baseUrl);
          db.run(
            'UPDATE bug_reports SET plane_issue_id=?, plane_issue_url=?, plane_status=? WHERE id=?',
            [issueId, issueUrl, initialStatus, bugId]
          );
          // Send Google Chat notification (fire and forget)
          if (config.gchatWebhookUrl) {
            sendGoogleChatNotification(config.gchatWebhookUrl, bug, issueUrl, assigneeIds.length > 0 ? (config.assigneeEmail || '') : '').catch(() => {});
          }
          results.push({ bugId, title: bug.title, status: 'success' });
        } else {
          results.push({ bugId, title: bug.title, status: 'failed', error: result.error, httpStatus: result.status });
        }
      } catch (e) {
        results.push({ bugId, title: '', status: 'failed', error: e.message });
      }
    }

    saveDB();
    return { success: true, results };
  } catch (e) {
    return { success: false, error: e.message, results: [] };
  }
});

/**
 * sync-plane-status
 * Syncs Plane status for bugs that have been transferred.
 * If bugIds is empty/null, syncs all bugs with plane_issue_id.
 * Requirements: 4.9, 4.11, 4.12, 6.1
 */
ipcMain.handle('sync-plane-status', async (_, { bugIds } = {}) => {
  let updated = 0;
  let failed = 0;
  const errors = [];

  try {
    const config = getPlaneConfigRaw();
    if (!config || !isConfigValid(config)) {
      return { updated: 0, failed: 0, errors: [{ bugId: null, error: 'Plane API belum dikonfigurasi' }] };
    }

    let bugs;
    if (bugIds && bugIds.length > 0) {
      const placeholders = bugIds.map(() => '?').join(',');
      bugs = queryAll(
        `SELECT * FROM bug_reports WHERE id IN (${placeholders}) AND plane_issue_id IS NOT NULL`,
        bugIds
      );
    } else {
      bugs = queryAll('SELECT * FROM bug_reports WHERE plane_issue_id IS NOT NULL');
    }

    for (const bug of bugs) {
      try {
        const result = await planeRequest(
          'GET',
          `/api/v1/workspaces/${config.workspaceSlug}/projects/${config.projectId}/issues/${bug.plane_issue_id}/`,
          config.apiKey,
          null,
          10000,
          config.baseUrl
        );

        if (result.ok) {
          // Plane API returns state info in various shapes depending on version/config
          const data = result.data;
          let statusName =
            data?.state_detail?.name ||
            data?.state_detail?.display_name ||
            data?.state?.name ||
            data?.state?.display_name ||
            null;

          // If state is a UUID string (not an object), lookup the state name from the states list
          if (!statusName && typeof data?.state === 'string' && data.state.length > 10) {
            statusName = await getStateNameById(config.apiKey, config.workspaceSlug, config.projectId, data.state, config.baseUrl);
          }

          if (statusName) {
            db.run('UPDATE bug_reports SET plane_status=? WHERE id=?', [statusName, bug.id]);
            updated++;
          } else {
            console.warn('[Plane] sync: no state name found in response for bug', bug.id, JSON.stringify(data).slice(0, 300));
          }
        } else {
          failed++;
          errors.push({ bugId: bug.id, error: result.error });
        }
      } catch (e) {
        failed++;
        errors.push({ bugId: bug.id, error: e.message });
      }
    }

    saveDB();
    return { updated, failed, errors };
  } catch (e) {
    return { updated, failed, errors: [{ bugId: null, error: e.message }] };
  }
});
