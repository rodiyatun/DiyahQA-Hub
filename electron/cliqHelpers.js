// ─────────────────────────────────────────────────────────────────────────────
// Zoho Cliq notification helpers
// Dipakai oleh electron/main.js. Tidak bergantung pada Electron agar bisa diuji.
// ─────────────────────────────────────────────────────────────────────────────

const SEVERITY = {
  critical: { emoji: '🔴', label: 'CRITICAL' },
  high:     { emoji: '🟠', label: 'HIGH' },
  medium:   { emoji: '🟡', label: 'MEDIUM' },
  low:      { emoji: '🟢', label: 'LOW' },
};

const CLIQ_TEXT_LIMIT = 800;
const CLIQ_SHORT_LIMIT = 400;

const dash = (v) => {
  const s = v === null || v === undefined ? '' : String(v).trim();
  return s ? s : '—';
};

const clip = (v, max = CLIQ_TEXT_LIMIT) => {
  const s = dash(v);
  return s.length > max ? s.slice(0, max) + '…' : s;
};

const CLIQ_URL_HINT =
  'URL webhook Cliq tidak valid. Gunakan URL Incoming Webhook dari Cliq, ' +
  'formatnya https://cliq.zoho.com/api/v2/channelsbyname/.../message?zapikey=...';

/**
 * Webhook Cliq harus HTTPS, host cliq.zoho.<tld>, dan path /api/v2/.
 */
function isValidCliqWebhook(url) {
  try {
    const u = new URL(String(url || '').trim());
    return (
      u.protocol === 'https:' &&
      /^cliq\.zoho\.(com|eu|in|com\.au|com\.cn|jp|ca|sa)$/i.test(u.hostname) &&
      u.pathname.startsWith('/api/v2/')
    );
  } catch {
    return false;
  }
}

/**
 * Membangun payload pesan bug baru untuk Cliq.
 * @param {object} bug          - Baris bug_reports (nama field sama dengan form)
 * @param {string} projectName  - Nama project (bukan ID)
 */
function buildCliqPayload(bug, projectName = '') {
  const sevKey = String(bug.severity ?? '').toLowerCase();
  const sev = SEVERITY[sevKey] ?? { emoji: '⚪', label: 'UNSET' };
  const bugNo = dash(bug.bug_number);
  const project = dash(projectName);

  return {
    text: `${sev.emoji} *[${sev.label}] Bug baru* · ${bugNo} · ${project}`,
    card: {
      title: dash(bug.title),
      subtitle: `${dash(bug.module)} · ${dash(bug.environment)} · ${formatWib(bug.created_at)}`,
      theme: 'modern-inline',
    },
    slides: [
      {
        type: 'fields',
        title: 'Informasi Bug',
        data: [
          { title: 'Bug Number', value: bugNo },
          { title: 'Project', value: project },
          { title: 'Severity', value: sev.label },
          { title: 'Priority', value: dash(bug.priority) },
          { title: 'Status', value: dash(bug.status) },
          { title: 'Module', value: dash(bug.module) },
          { title: 'Environment', value: dash(bug.environment) },
          { title: 'Reporter', value: dash(bug.reporter) },
          { title: 'Assignee', value: dash(bug.assignee) },
          { title: 'Linked Test Case', value: bug.linked_testcase_id ? `#${bug.linked_testcase_id}` : '—' },
        ],
      },
      { type: 'text', title: 'Description', data: clip(bug.description) },
      { type: 'text', title: 'Steps to Reproduce', data: clip(bug.steps_to_reproduce) },
      {
        type: 'text',
        title: 'Expected vs Actual',
        data:
          `*Expected:* ${clip(bug.expected_behavior, CLIQ_SHORT_LIMIT)}\n` +
          `*Actual:* ${clip(bug.actual_behavior, CLIQ_SHORT_LIMIT)}`,
      },
      { type: 'text', title: 'Evidence', data: dash(bug.evidence_url) },
    ],
    buttons: [
      bug.evidence_url && isHttpUrl(bug.evidence_url) && {
        label: '▶ Buka bukti',
        type: '+',
        action: { type: 'open.url', data: { web: String(bug.evidence_url).trim() } },
      },
    ].filter(Boolean),
  };
}

/** Pesan uji coba untuk memastikan webhook berfungsi. */
function buildCliqTestPayload(channelName) {
  return {
    text: `✅ *Tes koneksi DiyahQA Hub* ke channel *${dash(channelName)}* berhasil.`,
  };
}

function isHttpUrl(v) {
  try {
    const u = new URL(String(v).trim());
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Mengirim payload ke webhook Cliq. Tidak pernah melempar error:
 * hasilnya selalu { ok, status?, error? } agar kegagalan satu channel tidak menghentikan yang lain.
 */
function postToCliq(webhookUrl, payload, timeoutMs = 10000) {
  return new Promise((resolve) => {
    if (!isValidCliqWebhook(webhookUrl)) {
      return resolve({ ok: false, error: 'URL webhook Cliq tidak valid' });
    }

    let url;
    try {
      url = new URL(String(webhookUrl).trim());
    } catch {
      return resolve({ ok: false, error: 'URL webhook Cliq tidak valid' });
    }

    const body = Buffer.from(JSON.stringify(payload));
    const req = require('https').request(
      {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': body.length,
        },
        timeout: timeoutMs,
      },
      (res) => {
        res.resume();
        const status = res.statusCode || 0;
        resolve(status >= 200 && status < 300
          ? { ok: true, status }
          : { ok: false, status, error: `Cliq menolak pesan: HTTP ${status}` });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, error: 'Timeout saat menghubungi Cliq' });
    });
    req.on('error', (e) => resolve({ ok: false, error: e.message }));
    req.write(body);
    req.end();
  });
}

module.exports = {
  isValidCliqWebhook,
  buildCliqPayload,
  buildCliqTestPayload,
  postToCliq,
};
