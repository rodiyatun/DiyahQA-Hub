// ─── Auto Klasifikasi Bug: FE / BE / CI-CD ───────────────────────────────────
//
// Menganalisis judul, deskripsi, module, steps, error output test runner
// dan mengklasifikasikan bug ke dalam kategori: Frontend / Backend / CI-CD / Unknown
//
// Pola keyword berbasis pattern matching dari output test runner nyata
// (Playwright, Jest, Pytest, JUnit, Cypress, GitHub Actions, dll.)

const CATEGORY_RULES = [
  // ── CI-CD ────────────────────────────────────────────────────────────────
  {
    category: 'CI-CD',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.1)',
    icon: '⚙️',
    patterns: [
      /pipeline/i, /workflow/i, /github.actions/i, /gitlab.ci/i, /jenkins/i,
      /build.fail/i, /npm.ci/i, /npm.install/i, /docker/i, /container/i,
      /artifact/i, /deploy/i, /deployment/i, /release/i, /ci\/cd/i,
      /environment.variable/i, /secret.not.found/i, /\.env/i,
      /playwright.install/i, /chromium.not.found/i, /browser.not.installed/i,
      /timeout.minutes/i, /runner/i, /action.*fail/i, /step.*fail/i,
      /exit.code.[^0]/i, /process.exit/i, /non-zero.exit/i,
      /webhook/i, /trigger/i, /scheduled.run/i, /cron/i,
    ],
  },
  // ── Frontend ────────────────────────────────────────────────────────────
  {
    category: 'Frontend',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.1)',
    icon: '🖥️',
    patterns: [
      /locator.*not.found/i, /element.*not.visible/i, /timeout.*selector/i,
      /strict.mode.violation/i, /selector.*ambiguous/i, /multiple.elements/i,
      /toBeVisible/i, /toHaveText/i, /toHaveValue/i, /assertion.*fail/i,
      /screenshot/i, /visual.regression/i, /layout/i, /responsive/i,
      /css/i, /style/i, /render/i, /display/i, /overflow/i, /z-index/i,
      /click.*fail/i, /cannot.click/i, /element.not.clickable/i,
      /navigation.fail/i, /page.*load/i, /spa/i, /react/i, /vue/i, /angular/i,
      /dom/i, /html/i, /javascript.error/i, /uncaught.exception/i,
      /consoleerror/i, /console.*error/i, /type.*error.*undefined/i,
      /getBy/i, /waitFor/i, /page\./i, /playwright/i,
      /ui/i, /interface/i, /button/i, /form.*validation/i, /modal/i,
      /infinite.scroll/i, /pagination.*wrong/i, /broken.link/i,
    ],
  },
  // ── Backend ──────────────────────────────────────────────────────────────
  {
    category: 'Backend',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.1)',
    icon: '🔧',
    patterns: [
      /\b4[0-9]{2}\b/, /\b5[0-9]{2}\b/, // HTTP 4xx, 5xx
      /api.error/i, /api.*fail/i, /endpoint/i, /http.error/i,
      /status.*code/i, /response.*fail/i, /request.*fail/i,
      /unauthorized/i, /forbidden/i, /authentication.fail/i,
      /token.*invalid/i, /token.*expired/i, /jwt/i, /session.*expired/i,
      /database/i, /db.error/i, /query.fail/i, /sql.error/i,
      /connection.refused/i, /econnrefused/i, /econnreset/i,
      /timeout.*server/i, /gateway.timeout/i, /service.unavailable/i,
      /null.pointer/i, /nullpointerexception/i, /internal.server.error/i,
      /server.error/i, /500/i, /503/i, /502/i,
      /data.*mismatch/i, /response.*body/i, /json.*parse.error/i,
      /microservice/i, /grpc/i, /rest.api/i, /graphql/i,
      /validation.*backend/i, /business.logic/i, /rule.*violation/i,
      /data.not.saved/i, /record.not.found/i, /duplicate.entry/i,
    ],
  },
];

// Keyword berbasis module/section name
const MODULE_RULES = [
  { category: 'Frontend',  patterns: [/ui/i, /frontend/i, /fe\b/i, /view/i, /page/i, /screen/i, /component/i, /web/i] },
  { category: 'Backend',   patterns: [/api/i, /backend/i, /be\b/i, /service/i, /controller/i, /handler/i, /database/i, /db\b/i, /server/i] },
  { category: 'CI-CD',     patterns: [/ci\b/i, /cd\b/i, /cicd/i, /pipeline/i, /deploy/i, /build/i, /release/i, /devops/i, /infra/i] },
];

/**
 * classifyBug(bug) → { category, icon, color, bg, confidence, reasons }
 *
 * bug: { title, description, steps_to_reproduce, module, actual_behavior, environment }
 */
export function classifyBug(bug) {
  const haystack = [
    bug.title || '',
    bug.description || '',
    bug.steps_to_reproduce || '',
    bug.actual_behavior || '',
    bug.module || '',
    bug.section || '',
    bug.environment || '',
  ].join(' ');

  const scores = { Frontend: 0, Backend: 0, 'CI-CD': 0 };
  const reasons = { Frontend: [], Backend: [], 'CI-CD': [] };

  // Check pattern rules
  for (const rule of CATEGORY_RULES) {
    for (const pattern of rule.patterns) {
      const match = haystack.match(pattern);
      if (match) {
        scores[rule.category] += 1;
        if (reasons[rule.category].length < 2) {
          reasons[rule.category].push(match[0].slice(0, 40));
        }
      }
    }
  }

  // Check module-based hints (lower weight)
  for (const rule of MODULE_RULES) {
    const moduleText = (bug.module || '') + ' ' + (bug.section || '');
    for (const pattern of rule.patterns) {
      if (pattern.test(moduleText)) {
        scores[rule.category] += 0.5;
      }
    }
  }

  // Find winner
  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) {
    return {
      category: 'Unknown',
      icon: '❓',
      color: '#64748b',
      bg: 'rgba(100,116,139,0.1)',
      confidence: 0,
      reasons: [],
    };
  }

  const winnerKey = Object.keys(scores).find(k => scores[k] === maxScore);
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = Math.round((maxScore / total) * 100);
  const winnerRule = CATEGORY_RULES.find(r => r.category === winnerKey);

  return {
    category: winnerKey,
    icon: winnerRule?.icon || '❓',
    color: winnerRule?.color || '#64748b',
    bg: winnerRule?.bg || 'rgba(100,116,139,0.1)',
    confidence,
    reasons: reasons[winnerKey] || [],
  };
}

/**
 * classifyBugsFromTestOutput(rawOutput) → array of classified issues
 *
 * rawOutput: string dari stdout/stderr Playwright/Jest/Pytest test runner
 */
export function classifyBugsFromTestOutput(rawOutput) {
  if (!rawOutput || typeof rawOutput !== 'string') return [];

  const lines = rawOutput.split('\n');
  const issues = [];

  // Playwright/Jest patterns
  const FAILURE_PATTERNS = [
    // Playwright: ✗ tests/login.spec.ts:23:5 › Login › should fail with invalid creds
    { re: /[✗×✕]\s*([\w./\\-]+\.spec\.\w+(?::\d+)*)\s*›\s*(.+)/, type: 'spec-failure' },
    // Jest: FAIL src/tests/auth.test.js
    { re: /^FAIL\s+(.+\.test\.\w+)/, type: 'jest-file-fail' },
    // Jest: ● Auth › login › should reject invalid password
    { re: /^●\s+(.+)/, type: 'jest-test-fail' },
    // Pytest: FAILED tests/test_auth.py::test_login_invalid - AssertionError
    { re: /^FAILED\s+([\w./\\-]+\.py)::([\w_]+)\s*[-–]\s*(.*)/, type: 'pytest-fail' },
    // Generic error lines
    { re: /Error:\s+(.+)/i, type: 'error-line' },
    { re: /TimeoutError:\s*(.+)/i, type: 'timeout' },
    { re: /AssertionError:\s*(.+)/i, type: 'assertion' },
  ];

  let currentSuite = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    for (const { re, type } of FAILURE_PATTERNS) {
      const m = trimmed.match(re);
      if (m) {
        let title = '';
        let rawText = trimmed;

        if (type === 'spec-failure')  { title = m[2]?.trim() || m[1]; }
        if (type === 'jest-file-fail') { currentSuite = m[1]; continue; }
        if (type === 'jest-test-fail') { title = m[1]?.trim(); }
        if (type === 'pytest-fail')   { title = `${m[2]} — ${m[3]?.trim()}`; }
        if (type === 'error-line' || type === 'timeout' || type === 'assertion') {
          title = trimmed.slice(0, 80);
        }

        if (!title) continue;

        // Classify this failure
        const fakeBug = {
          title,
          description: rawText,
          steps_to_reproduce: rawText,
          module: currentSuite,
          actual_behavior: rawText,
        };
        const classification = classifyBug(fakeBug);

        issues.push({
          title,
          raw: rawText,
          suite: currentSuite,
          ...classification,
        });
        break;
      }
    }
  }

  // Deduplicate by title
  const seen = new Set();
  return issues.filter(i => {
    if (seen.has(i.title)) return false;
    seen.add(i.title);
    return true;
  });
}

/**
 * BugCategoryBadge — React component untuk menampilkan badge klasifikasi
 */
export function BugCategoryBadge({ bug, style = {} }) {
  const result = classifyBug(bug);
  if (result.category === 'Unknown') return null;

  return (
    <span
      title={`Auto-klasifikasi: ${result.category} (${result.confidence}% confidence)${result.reasons.length ? ' — ' + result.reasons.join(', ') : ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
        padding: '1px 7px',
        borderRadius: 10,
        fontSize: 10,
        fontWeight: 600,
        background: result.bg,
        color: result.color,
        border: `1px solid ${result.color}40`,
        cursor: 'default',
        ...style,
      }}
    >
      {result.icon} {result.category}
    </span>
  );
}
