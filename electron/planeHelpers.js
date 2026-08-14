'use strict';

/**
 * planeHelpers.js
 *
 * Helper functions for Plane.so integration.
 * This file is intentionally free of Electron-specific imports so it can be
 * imported from both main.js (Electron environment) and unit/property test
 * files (plain Node.js environment).
 *
 * Requirements: 1.3, 1.6, 2.3, 2.4, 4.3–4.8, 5.5, 6.1, 6.6
 */

const https = require('https');

const PLANE_DEFAULT_API_BASE_URL = 'https://api.plane.so';
const PLANE_DEFAULT_APP_BASE_URL = 'https://app.plane.so';
const DEFAULT_TIMEOUT_MS = 10000;

// ─── Priority mapping ─────────────────────────────────────────────────────────
// Use Object.create(null) to avoid inheriting Object.prototype properties.
const PRIORITY_MAP = Object.assign(Object.create(null), {
  critical: 'urgent',
  high:     'high',
  medium:   'medium',
  low:      'low',
});

// ─── Status → CSS class mapping ───────────────────────────────────────────────
// Use Object.create(null) to avoid inheriting Object.prototype properties
// (e.g. 'valueOf', 'toString') which would pass a truthy check and bypass the
// fallback to 'light-grey'.
const STATUS_CLASS_MAP = Object.assign(Object.create(null), {
  'Todo':        'grey',
  'Backlog':     'grey',
  'In Progress': 'blue',
  'On Progress': 'blue',
  'Done':        'green',
  'Cancelled':   'red',
  'Rejected':    'red',
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. planeRequest
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Performs an HTTP request to the Plane API using Node.js built-in `https`.
 *
 * @param {string} method      - HTTP method (GET, POST, PATCH, …)
 * @param {string} path        - API path, e.g. '/api/v1/workspaces/…'
 * @param {string} apiKey      - Plane API key (sent as X-API-Key header)
 * @param {object|null} body   - Request body (JSON-serialisable) or null
 * @param {number} timeoutMs   - Request timeout in milliseconds (default 10 000)
 * @param {string} baseUrl     - Base URL for Plane API (default: https://api.plane.so)
 * @returns {Promise<{ ok: boolean, status: number, data: object|null, error?: string }>}
 */
async function planeRequest(method, path, apiKey, body = null, timeoutMs = DEFAULT_TIMEOUT_MS, baseUrl = PLANE_DEFAULT_API_BASE_URL) {
  return new Promise((resolve) => {
    const resolvedBase = (baseUrl && baseUrl.trim()) ? baseUrl.trim().replace(/\/$/, '') : PLANE_DEFAULT_API_BASE_URL;
    const url = new URL(path, resolvedBase);
    const bodyStr = body ? JSON.stringify(body) : null;

    const options = {
      hostname: url.hostname,
      port:     url.port || 443,
      path:     url.pathname + url.search,
      method:   method.toUpperCase(),
      headers: {
        'X-API-Key':     apiKey.replace(/[\r\n\t]/g, '').trim(),
        'Content-Type':  'application/json',
        'Accept':        'application/json',
      },
    };

    if (bodyStr) {
      options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }

    let timedOut = false;

    const req = https.request(options, (res) => {
      let rawData = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        if (timedOut) return;

        let parsed = null;
        if (rawData) {
          try {
            parsed = JSON.parse(rawData);
          } catch {
            // non-JSON body — keep parsed as null
          }
        }

        const ok = res.statusCode >= 200 && res.statusCode < 300;
        if (ok) {
          resolve({ ok: true, status: res.statusCode, data: parsed });
        } else {
          const apiMessage =
            parsed?.detail ||
            parsed?.message ||
            parsed?.error ||
            (typeof parsed === 'string' ? parsed : null) ||
            `HTTP ${res.statusCode}`;
          resolve({
            ok:     false,
            status: res.statusCode,
            data:   parsed,
            error:  `HTTP ${res.statusCode}: ${apiMessage}`,
          });
        }
      });
    });

    // Timeout handling
    const timer = setTimeout(() => {
      timedOut = true;
      req.destroy();
      resolve({ ok: false, status: 0, data: null, error: 'Koneksi timeout' });
    }, timeoutMs);

    req.on('error', (err) => {
      if (timedOut) return;
      clearTimeout(timer);
      resolve({ ok: false, status: 0, data: null, error: err.message });
    });

    req.on('response', () => clearTimeout(timer));

    if (bodyStr) {
      req.write(bodyStr);
    }
    req.end();
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. getTodoStateId
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Fetches the list of states for a Plane project and returns an object
 * { id, name } for the first "initial" state (backlog/unstarted/todo).
 * Returns null if not found or on error.
 *
 * @param {string} apiKey
 * @param {string} workspaceSlug
 * @param {string} projectId
 * @param {string} baseUrl
 * @returns {Promise<{ id: string, name: string }|null>}
 */
async function getTodoStateId(apiKey, workspaceSlug, projectId, baseUrl = PLANE_DEFAULT_API_BASE_URL) {
  const path = `/api/v1/workspaces/${workspaceSlug}/projects/${projectId}/states/`;
  const result = await planeRequest('GET', path, apiKey, null, DEFAULT_TIMEOUT_MS, baseUrl);

  if (!result.ok || !result.data) return null;

  // Plane returns states under `results` array
  const states = Array.isArray(result.data.results)
    ? result.data.results
    : Array.isArray(result.data)
    ? result.data
    : [];

  const todo = states.find(
    (s) =>
      s.group === 'unstarted' ||
      s.group === 'backlog' ||
      (typeof s.name === 'string' && (
        s.name.toLowerCase().includes('todo') ||
        s.name.toLowerCase().includes('backlog') ||
        s.name.toLowerCase().includes('to do')
      ))
  );

  if (!todo) return null;
  const id = todo.id || todo.state_id || null;
  if (!id) return null;
  return { id, name: todo.name || 'Backlog' };
}

// ─────────────────────────────────────────────────────────────────────────────
// 2a. Fetch Plane Labels, Modules, Cycles
// ─────────────────────────────────────────────────────────────────────────────
async function getPlaneLabels(apiKey, workspaceSlug, projectId, baseUrl = PLANE_DEFAULT_API_BASE_URL) {
  const path = `/api/v1/workspaces/${workspaceSlug}/projects/${projectId}/labels/?per_page=100`;
  const result = await planeRequest('GET', path, apiKey, null, DEFAULT_TIMEOUT_MS, baseUrl);
  if (!result.ok || !result.data) {
    console.error(`[Plane] Failed to fetch labels: HTTP ${result.status} - ${result.error}`);
    return [];
  }
  return Array.isArray(result.data.results) ? result.data.results : (Array.isArray(result.data) ? result.data : []);
}

async function getPlaneModules(apiKey, workspaceSlug, projectId, baseUrl = PLANE_DEFAULT_API_BASE_URL) {
  const path = `/api/v1/workspaces/${workspaceSlug}/projects/${projectId}/modules/?per_page=100`;
  const result = await planeRequest('GET', path, apiKey, null, DEFAULT_TIMEOUT_MS, baseUrl);
  if (!result.ok || !result.data) {
    console.error(`[Plane] Failed to fetch modules: HTTP ${result.status} - ${result.error}`);
    return [];
  }
  return Array.isArray(result.data.results) ? result.data.results : (Array.isArray(result.data) ? result.data : []);
}

async function getPlaneCycles(apiKey, workspaceSlug, projectId, baseUrl = PLANE_DEFAULT_API_BASE_URL) {
  const path = `/api/v1/workspaces/${workspaceSlug}/projects/${projectId}/cycles/?per_page=100`;
  const result = await planeRequest('GET', path, apiKey, null, DEFAULT_TIMEOUT_MS, baseUrl);
  if (!result.ok || !result.data) {
    console.error(`[Plane] Failed to fetch cycles: HTTP ${result.status} - ${result.error}`);
    return [];
  }
  return Array.isArray(result.data.results) ? result.data.results : (Array.isArray(result.data) ? result.data : []);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. mapBugToPlanePayload
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Maps a Bug_Report record to a Plane Issue creation payload.
 *
 * @param {{ title: string, description?: string, steps_to_reproduce?: string,
 *           expected_behavior?: string, actual_behavior?: string,
 *           priority?: string }} bug
 * @param {string|null} todoStateId
 * @returns {{ name: string, description_html: string, priority: string, state_id: string|null }}
 */
function mapBugToPlanePayload(bug, todoState, additionalData = {}) {
  const safe = (v) => (v && String(v).trim() ? String(v) : '-');

  // todoState can be { id, name } object (new) or a string state_id (legacy)
  const stateId = (todoState && typeof todoState === 'object') ? todoState.id : todoState;

  const description_html =
    `<p><strong>Reporter:</strong> ${safe(bug.reporter)}</p>` +
    (bug.assignee && String(bug.assignee).trim()
      ? `<p><strong>Assignee (DiyahQA):</strong> ${safe(bug.assignee)}</p>` : '') +
    `<p><strong>Severity:</strong> ${safe(bug.severity)}</p>` +
    `<p><strong>Priority:</strong> ${safe(bug.priority)}</p>` +
    `<p><strong>Status (DiyahQA):</strong> ${safe(bug.status)}</p>` +
    (bug.module && String(bug.module).trim()
      ? `<p><strong>Module:</strong> ${safe(bug.module)}</p>` : '') +
    (bug.environment && String(bug.environment).trim()
      ? `<p><strong>Environment:</strong> ${safe(bug.environment)}</p>` : '') +
    `<hr/>` +
    `<p><strong>Description:</strong><br/>${safe(bug.description)}</p>` +
    `<p><strong>Steps to Reproduce:</strong><br/>${safe(bug.steps_to_reproduce)}</p>` +
    `<p><strong>Expected Behavior:</strong><br/>${safe(bug.expected_behavior)}</p>` +
    `<p><strong>Actual Behavior:</strong><br/>${safe(bug.actual_behavior)}</p>` +
    (bug.evidence_url && String(bug.evidence_url).trim()
      ? `<p><strong>Evidence:</strong><br/><a href="${String(bug.evidence_url).trim()}">${String(bug.evidence_url).trim()}</a></p>`
      : '');

  const priorityKey = bug.priority ? String(bug.priority).toLowerCase() : '';
  const priority = PRIORITY_MAP[priorityKey] || 'none';

  const payload = {
    name:             String(bug.title || ''),
    description_html: description_html,
    priority:         priority,
    state_id:         stateId || null,
  };

  if (additionalData.labelIds && additionalData.labelIds.length > 0) {
    payload.label_ids = additionalData.labelIds;
    payload.labels = additionalData.labelIds;
  }
  if (additionalData.moduleIds && additionalData.moduleIds.length > 0) {
    payload.module_ids = additionalData.moduleIds;
    payload.modules = additionalData.moduleIds;
  }
  if (additionalData.cycleId) {
    payload.cycle_id = additionalData.cycleId;
    payload.cycle = additionalData.cycleId;
  }

  return payload;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. buildPlaneIssueUrl
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Builds the direct URL to a Plane issue in the web app.
 *
 * @param {string} workspaceSlug
 * @param {string} projectId
 * @param {string} issueId
 * @param {string} appBaseUrl - Base URL of the Plane web app (default: https://app.plane.so)
 * @returns {string}
 */
function buildPlaneIssueUrl(workspaceSlug, projectId, issueId, appBaseUrl = PLANE_DEFAULT_APP_BASE_URL) {
  const base = (appBaseUrl && appBaseUrl.trim()) ? appBaseUrl.trim().replace(/\/$/, '') : PLANE_DEFAULT_APP_BASE_URL;
  return `${base}/${workspaceSlug}/projects/${projectId}/issues/${issueId}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. maskApiKey
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Masks an API key so only the last 4 characters are visible.
 * - Input length < 4  → all characters replaced with '•'
 * - Input length >= 4 → first (n-4) characters replaced with '•', last 4 kept
 * Output length always equals input length.
 *
 * @param {string} apiKey
 * @returns {string}
 */
function maskApiKey(apiKey) {
  if (!apiKey || typeof apiKey !== 'string') return '';
  if (apiKey.length < 4) {
    return '•'.repeat(apiKey.length);
  }
  return '•'.repeat(apiKey.length - 4) + apiKey.slice(-4);
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. getPlaneStatusClass
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Maps a Plane_Status string to a CSS class suffix used for badge colouring.
 *
 * Known mappings: Todo→grey, In Progress→blue, Done→green, Cancelled→red
 * Everything else (including null/undefined) → light-grey
 *
 * @param {string|null|undefined} status
 * @returns {'grey'|'blue'|'green'|'red'|'light-grey'}
 */
function getPlaneStatusClass(status) {
  return STATUS_CLASS_MAP[status] || 'light-grey';
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. isConfigValid
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Returns true only when both apiKey and workspaceSlug are present and not
 * purely whitespace.
 *
 * @param {{ apiKey?: string|null, workspaceSlug?: string|null }} config
 * @returns {boolean}
 */
function isConfigValid(config) {
  if (!config) return false;
  const keyOk  = config.apiKey       != null && String(config.apiKey).trim().length > 0;
  const slugOk = config.workspaceSlug != null && String(config.workspaceSlug).trim().length > 0;
  return keyOk && slugOk;
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. shouldAutoSync
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Returns true if an automatic Plane status sync should be triggered.
 *
 * @param {number|null|undefined} lastSyncAt - Timestamp (ms since epoch) of
 *   the last sync, or null/undefined if sync has never run.
 * @returns {boolean}
 */
function shouldAutoSync(lastSyncAt) {
  if (lastSyncAt == null) return true;
  return Date.now() - lastSyncAt >= 60000;
}

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// 9. sendGoogleChatNotification
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Sends a notification to a Google Chat space via Incoming Webhook.
 *
 * @param {string} webhookUrl  - Google Chat Incoming Webhook URL
 * @param {object} bug         - Bug report object
 * @param {string} issueUrl    - Plane issue URL
 * @param {string} assigneeEmail - Email of the assignee (may be empty)
 * @returns {Promise<void>}
 */
async function sendGoogleChatNotification(webhookUrl, bug, issueUrl, assigneeEmail) {
  if (!webhookUrl || !webhookUrl.trim()) return;

  try {
    const url = new URL(webhookUrl.trim());
    const safe = (v) => (v && String(v).trim() ? String(v).trim() : '-');

    const text =
      `🐛 *QA menemukan bug pada ${safe(bug.module)}* dengan detail sebagai berikut:\n\n` +
      `*Bug ID:* ${safe(bug.bug_number)}\n` +
      `*Module:* ${safe(bug.module)}\n` +
      `*Environment:* ${safe(bug.environment)}\n` +
      `*Severity:* ${safe(bug.severity)}\n` +
      `*Summary:* ${safe(bug.title)}\n` +
      `*Impact:* ${safe(bug.description)}\n` +
      `*Status:* ${safe(bug.status)}\n` +
      `*Assign To:* ${assigneeEmail && assigneeEmail.trim() ? assigneeEmail.trim() : safe(bug.assignee)}\n` +
      `*Workspace:* ${issueUrl || '-'}\n` +
      `*Reporter:* ${safe(bug.reporter)}\n\n` +
      `Mohon untuk sementara menghindari penggunaan fitur tersebut apabila bug berdampak pada operasional. ` +
      `Kami akan memberikan update kembali setelah proses perbaikan selesai dan telah lolos proses retesting.\n\n` +
      `Terima kasih.`;

    const body = JSON.stringify({ text });

    await new Promise((resolve) => {
      const postData = Buffer.from(body);
      const options = {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': postData.length,
        },
      };

      const req = require('https').request(options, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => resolve()); // fire and forget — don't block transfer
      req.write(postData);
      req.end();
    });
  } catch (e) {
    console.warn('[GChat] Notification failed:', e.message);
    // Never throw — notification failure must not block transfer
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────────────────────
module.exports = {
  planeRequest,
  getTodoStateId,
  mapBugToPlanePayload,
  buildPlaneIssueUrl,
  maskApiKey,
  getPlaneStatusClass,
  isConfigValid,
  shouldAutoSync,
  sendGoogleChatNotification,
  getPlaneLabels,
  getPlaneModules,
  getPlaneCycles,
};
