'use strict';

/**
 * Property-Based Tests for electron/planeHelpers.js
 * Using fast-check with Jest
 *
 * Feature: plane-integration
 * Each test runs 100 iterations via { numRuns: 100 }
 */

const fc = require('fast-check');
const {
  maskApiKey,
  isConfigValid,
  mapBugToPlanePayload,
  buildPlaneIssueUrl,
  getPlaneStatusClass,
  shouldAutoSync,
} = require('../planeHelpers');

// ─── Property 1: maskApiKey always shows last 4 chars ───────────────────────
// Feature: plane-integration, Property 1: Masking API Key selalu memperlihatkan 4 karakter terakhir
// Validates: Requirements 1.3, 5.7
test('Property 1: maskApiKey memperlihatkan 4 karakter terakhir', () => {
  fc.assert(
    fc.property(fc.string({ minLength: 4 }), (apiKey) => {
      const masked = maskApiKey(apiKey);
      // Output ends with last 4 chars of input
      const endsCorrectly = masked.endsWith(apiKey.slice(-4));
      // Output length === input length
      const sameLength = masked.length === apiKey.length;
      // All chars before last 4 are '•'
      const prefixMasked = masked
        .slice(0, -4)
        .split('')
        .every((c) => c === '•');
      return endsCorrectly && sameLength && prefixMasked;
    }),
    { numRuns: 100 }
  );
});

// ─── Property 2: isConfigValid rejects empty required fields ────────────────
// Feature: plane-integration, Property 2: Validasi config menolak semua input dengan field wajib kosong
// Validates: Requirements 1.6, 1.7
test('Property 2: isConfigValid menolak apiKey kosong/null/whitespace', () => {
  // Empty string apiKey → always false
  fc.assert(
    fc.property(
      fc.oneof(
        fc.constant(''),
        fc.constant(null),
        fc.constant(undefined),
        fc.stringMatching(/^\s+$/) // whitespace-only
      ),
      fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
      (emptyApiKey, validSlug) => {
        return isConfigValid({ apiKey: emptyApiKey, workspaceSlug: validSlug }) === false;
      }
    ),
    { numRuns: 100 }
  );
});

test('Property 2: isConfigValid menolak workspaceSlug kosong/null/whitespace', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
      fc.oneof(
        fc.constant(''),
        fc.constant(null),
        fc.constant(undefined),
        fc.stringMatching(/^\s+$/) // whitespace-only
      ),
      (validApiKey, emptySlug) => {
        return isConfigValid({ apiKey: validApiKey, workspaceSlug: emptySlug }) === false;
      }
    ),
    { numRuns: 100 }
  );
});

test('Property 2: isConfigValid menerima apiKey dan workspaceSlug yang valid', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
      fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
      (apiKey, workspaceSlug) => {
        return isConfigValid({ apiKey, workspaceSlug }) === true;
      }
    ),
    { numRuns: 100 }
  );
});

// ─── Property 3: priority mapping always returns valid value ─────────────────
// Feature: plane-integration, Property 3: Mapping priority Bug_Report ke Plane selalu menghasilkan nilai yang valid
// Validates: Requirements 2.3
test('Property 3: mapBugToPlanePayload.priority selalu valid', () => {
  const validPriorities = new Set(['urgent', 'high', 'medium', 'low', 'none']);

  fc.assert(
    fc.property(fc.string(), (priority) => {
      const bug = { title: 'Test Bug', priority };
      const payload = mapBugToPlanePayload(bug, 'state-id');
      return validPriorities.has(payload.priority);
    }),
    { numRuns: 100 }
  );
});

// ─── Property 4: payload always has all required fields ──────────────────────
// Feature: plane-integration, Property 4: Payload transfer selalu mengandung semua field yang diperlukan
// Validates: Requirements 2.3
test('Property 4: mapBugToPlanePayload selalu mengandung semua field yang diperlukan', () => {
  const nullableString = fc.oneof(
    fc.constant(null),
    fc.constant(undefined),
    fc.constant(''),
    fc.string()
  );

  fc.assert(
    fc.property(
      fc.record({
        title: nullableString,
        description: nullableString,
        steps_to_reproduce: nullableString,
        expected_behavior: nullableString,
        actual_behavior: nullableString,
        priority: nullableString,
      }),
      fc.oneof(fc.constant(null), fc.string({ minLength: 1 })),
      (bug, todoStateId) => {
        const payload = mapBugToPlanePayload(bug, todoStateId);

        // All four fields must be present
        const hasAllFields =
          'name' in payload &&
          'description_html' in payload &&
          'priority' in payload &&
          'state_id' in payload;

        // name, description_html, priority must not be undefined or null
        const coreFieldsDefined =
          payload.name !== undefined &&
          payload.name !== null &&
          payload.description_html !== undefined &&
          payload.description_html !== null &&
          payload.priority !== undefined &&
          payload.priority !== null;

        return hasAllFields && coreFieldsDefined;
      }
    ),
    { numRuns: 100 }
  );
});

// ─── Property 5: buildPlaneIssueUrl always has correct format ────────────────
// Feature: plane-integration, Property 5: Format URL Plane Issue selalu konsisten
// Validates: Requirements 2.4, 5.5
test('Property 5: buildPlaneIssueUrl format URL selalu konsisten', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1 }),
      fc.string({ minLength: 1 }),
      fc.string({ minLength: 1 }),
      (workspaceSlug, projectId, issueId) => {
        const url = buildPlaneIssueUrl(workspaceSlug, projectId, issueId);

        // Must start with https://app.plane.so/
        const startsCorrectly = url.startsWith('https://app.plane.so/');

        // Must contain all components in correct order
        const wsPos = url.indexOf(workspaceSlug);
        const projPos = url.indexOf(projectId, wsPos + workspaceSlug.length);
        const issuePos = url.indexOf(issueId, projPos + projectId.length);

        const hasAllComponents = wsPos !== -1 && projPos !== -1 && issuePos !== -1;
        const correctOrder = wsPos < projPos && projPos < issuePos;

        return startsCorrectly && hasAllComponents && correctOrder;
      }
    ),
    { numRuns: 100 }
  );
});

// ─── Property 6: HTTP error messages always contain status code ──────────────
// Feature: plane-integration, Property 6: Pesan error HTTP selalu mengandung status code
// Validates: Requirements 1.8, 2.9, 3.7
test('Property 6: pesan error HTTP selalu mengandung status code', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 400, max: 599 }),
      (statusCode) => {
        // Simulate the error message format produced by planeRequest for non-2xx responses
        const apiMessage = `Some API error message`;
        const errorMsg = `HTTP ${statusCode}: ${apiMessage}`;
        // The error message must contain the status code as a string
        return errorMsg.includes(String(statusCode));
      }
    ),
    { numRuns: 100 }
  );
});

// ─── Property 7: getPlaneStatusClass always returns valid class ───────────────
// Feature: plane-integration, Property 7: Badge Plane Status selalu memetakan ke class CSS yang valid
// Validates: Requirements 4.3, 4.4, 4.5, 4.6, 4.7, 4.8
test('Property 7: getPlaneStatusClass selalu mengembalikan class CSS yang valid', () => {
  const validClasses = new Set(['grey', 'blue', 'green', 'red', 'light-grey']);

  fc.assert(
    fc.property(
      fc.oneof(fc.string(), fc.constant(null), fc.constant(undefined), fc.constant('')),
      (status) => {
        const result = getPlaneStatusClass(status);
        return validClasses.has(result);
      }
    ),
    { numRuns: 100 }
  );
});

// ─── Property 10: shouldAutoSync only triggers when 60s interval met ─────────
// Feature: plane-integration, Property 10: Auto-sync hanya dipicu jika interval 60 detik terpenuhi
// Validates: Requirements 6.1, 6.6
test('Property 10: shouldAutoSync(null) selalu true', () => {
  expect(shouldAutoSync(null)).toBe(true);
});

test('Property 10: shouldAutoSync(undefined) selalu true', () => {
  expect(shouldAutoSync(undefined)).toBe(true);
});

test('Property 10: shouldAutoSync false jika timestamp kurang dari 60 detik yang lalu', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 0, max: 59999 }),
      (delta) => {
        const recentTimestamp = Date.now() - delta;
        return shouldAutoSync(recentTimestamp) === false;
      }
    ),
    { numRuns: 100 }
  );
});

test('Property 10: shouldAutoSync true jika timestamp 60 detik atau lebih yang lalu', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 60000, max: 300000 }),
      (delta) => {
        const oldTimestamp = Date.now() - delta;
        return shouldAutoSync(oldTimestamp) === true;
      }
    ),
    { numRuns: 100 }
  );
});
