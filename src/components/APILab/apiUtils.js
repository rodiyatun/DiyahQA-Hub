// ─── JSON Path evaluator (simple) ────────────────────────────────────────────

export function evalJsonPath(obj, path) {
  try {
    // Support: $.key, $.key.sub, $.arr[0], $.arr[*].id
    const parts = path.replace(/^\$\.?/, '').split(/[\.\[\]]+/).filter(Boolean);
    let curr = obj;
    for (const part of parts) {
      if (part === '*') {
        if (Array.isArray(curr)) return curr;
        return undefined;
      }
      if (curr === null || curr === undefined) return undefined;
      curr = curr[isNaN(part) ? part : Number(part)];
    }
    return curr;
  } catch {
    return undefined;
  }
}

// ─── Run assertions against a response ───────────────────────────────────────

export function runAssertions(assertions, response) {
  const results = [];
  let parsedBody = null;
  try { parsedBody = JSON.parse(response.body); } catch { /* not json */ }

  for (const a of assertions) {
    let passed = false;
    let actual = '';
    let message = '';

    try {
      if (a.type === 'status') {
        actual = String(response.status);
        passed = a.operator === '==' ? actual === String(a.value) : actual !== String(a.value);
        message = `Status ${actual} ${a.operator} ${a.value}`;
      } else if (a.type === 'body') {
        actual = response.body || '';
        passed = a.operator === 'contains'
          ? actual.toLowerCase().includes(String(a.value).toLowerCase())
          : !actual.toLowerCase().includes(String(a.value).toLowerCase());
        message = `Body ${a.operator} "${a.value}"`;
      } else if (a.type === 'jsonpath') {
        const val = parsedBody ? evalJsonPath(parsedBody, a.path) : undefined;
        actual = JSON.stringify(val);
        if (a.operator === 'exists') {
          passed = val !== undefined;
          message = `${a.path} exists: ${passed}`;
        } else if (a.operator === 'length') {
          const len = Array.isArray(val) ? val.length : (typeof val === 'string' ? val.length : -1);
          passed = a.value ? len === Number(a.value) : len >= 0;
          message = `${a.path} length = ${len}`;
          actual = String(len);
        } else {
          passed = a.operator === '==' ? String(val) === String(a.value) : String(val) !== String(a.value);
          message = `${a.path} = ${actual} ${a.operator} ${a.value}`;
        }
      } else if (a.type === 'header') {
        const headerVal = response.headers ? (response.headers[a.key.toLowerCase()] || '') : '';
        actual = headerVal;
        passed = a.operator === 'contains'
          ? headerVal.toLowerCase().includes(String(a.value).toLowerCase())
          : headerVal.toLowerCase() === String(a.value).toLowerCase();
        message = `Header ${a.key} ${a.operator} "${a.value}"`;
      } else if (a.type === 'duration') {
        actual = String(response.duration || 0);
        passed = a.operator === '<'
          ? (response.duration || 0) < Number(a.value)
          : (response.duration || 0) > Number(a.value);
        message = `Duration ${actual}ms ${a.operator} ${a.value}ms`;
      }
    } catch (e) {
      message = `Error: ${e.message}`;
    }

    results.push({ ...a, passed, actual, message });
  }
  return results;
}

// ─── Playwright API Test Generator ───────────────────────────────────────────

export function generatePlaywrightTest(request, assertions = [], options = {}) {
  const { testName, baseUrl, envName } = options;
  const name = testName || request.name || `${request.method} ${request.url}`;
  const urlExpr = baseUrl
    ? `\`\${BASE_URL}${request.url.replace(baseUrl, '')}\``
    : `'${request.url}'`;

  const headersObj = (request.headers || [])
    .filter(h => h.key && h.value && h.key.toLowerCase() !== 'authorization')
    .reduce((acc, h) => { acc[h.key] = h.value; return acc; }, {});

  const headersStr = Object.keys(headersObj).length
    ? `\n      headers: ${JSON.stringify(headersObj, null, 8).replace(/\n/g, '\n      ')},`
    : '';

  const authHeader = (request.headers || []).find(h => h.key.toLowerCase() === 'authorization');
  const authStr = authHeader
    ? `\n      headers: { 'Authorization': process.env.API_TOKEN || '${authHeader.value}' },`
    : '';

  let bodyStr = '';
  if (request.body && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
    try {
      const parsed = JSON.parse(request.body);
      bodyStr = `\n      data: ${JSON.stringify(parsed, null, 8).replace(/\n/g, '\n      ')},`;
    } catch {
      bodyStr = `\n      data: '${request.body}',`;
    }
  }

  const assertLines = assertions.map(a => {
    if (a.type === 'status') return `  expect(response.status()).toBe(${a.value});`;
    if (a.type === 'body' && a.operator === 'contains') return `  expect(await response.text()).toContain('${a.value}');`;
    if (a.type === 'jsonpath' && a.operator === '==') {
      return `  const json = await response.json();\n  expect(json${a.path.replace('$', '').replace(/\[(\d+)\]/g, '[$1]').replace(/\.(\w+)/g, '.$1')}).toBe(${isNaN(a.value) ? `'${a.value}'` : a.value});`;
    }
    if (a.type === 'jsonpath' && a.operator === 'exists') {
      return `  const json = await response.json();\n  expect(json${a.path.replace('$', '')}).toBeDefined();`;
    }
    if (a.type === 'duration') return `  expect(response.timing().responseEnd).toBeLessThan(${a.value});`;
    if (a.type === 'header') return `  expect(response.headers()['${a.key}']).toContain('${a.value}');`;
    return '';
  }).filter(Boolean);

  const method = request.method.toLowerCase();
  const methodCall = method === 'get' || method === 'delete' || method === 'head'
    ? `request.${method}(${urlExpr}, {${authStr}${headersStr}\n  })`
    : `request.${method}(${urlExpr}, {${authStr}${headersStr}${bodyStr}\n  })`;

  return `import { test, expect } from '@playwright/test';

${baseUrl ? `const BASE_URL = process.env.BASE_URL || '${baseUrl}';` : ''}

test('${name}', async ({ request }) => {
  const response = await ${methodCall};

${assertLines.length ? assertLines.join('\n') : `  expect(response.status()).toBe(200);`}
});
`;
}

// ─── Generate full test suite ─────────────────────────────────────────────────

export function generateTestSuite(collection, envVars = {}) {
  const baseUrl = envVars['BASE_URL'] || envVars['base_url'] || '';
  const requests = collection.requests || [];

  const tests = requests.map(req => {
    const urlExpr = baseUrl && req.url.startsWith(baseUrl)
      ? `\`\${BASE_URL}${req.url.slice(baseUrl.length)}\``
      : `'${req.url}'`;
    const method = req.method.toLowerCase();
    const bodyPart = req.body && ['post','put','patch'].includes(method)
      ? `, { data: ${req.body} }` : '';
    const assertions = (req.assertions || []).map(a => {
      if (a.type === 'status') return `    expect(r.status()).toBe(${a.value});`;
      if (a.type === 'body') return `    expect(await r.text()).toContain('${a.value}');`;
      return '';
    }).filter(Boolean);

    return `  test('${req.name || req.method + ' ' + req.url}', async ({ request }) => {
    const r = await request.${method}(${urlExpr}${bodyPart});
${assertions.length ? assertions.join('\n') : '    expect(r.status()).toBe(200);'}
  });`;
  }).join('\n\n');

  return `import { test, expect } from '@playwright/test';
// Collection: ${collection.name || 'API Tests'}
// Generated by DiyahQA Hub

${baseUrl ? `// Base URL from environment\nconst BASE_URL = process.env.BASE_URL || '${baseUrl}';` : ''}

test.describe('${collection.name || 'API Tests'}', () => {

${tests}

});
`;
}

// ─── Data Driven Test Generator ──────────────────────────────────────────────

export function generateDataDrivenTest(request, dataRows, options = {}) {
  const { testName, baseUrl } = options;
  const name = testName || request.name || 'Data Driven Test';
  const method = request.method.toLowerCase();

  const rowsJson = JSON.stringify(dataRows, null, 4);

  return `import { test, expect } from '@playwright/test';

${baseUrl ? `const BASE_URL = process.env.BASE_URL || '${baseUrl}';` : ''}

const testData = ${rowsJson};

for (const data of testData) {
  test(\`${name} — \${data[Object.keys(data)[0]] || ''}\`, async ({ request }) => {
    // Replace placeholders in URL and body using data row
    const url = \`${baseUrl || ''}${request.url.replace(baseUrl || '', '')}\`.replace(
      /\\{(\\w+)\\}/g, (_, k) => data[k] || ''
    );

    const response = await request.${method}(url, {
      data: data,
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': \`Bearer \${process.env.API_TOKEN}\`,
      },
    });

    // Assert using expected values from data row
    if (data.expectedStatus) {
      expect(response.status()).toBe(Number(data.expectedStatus));
    } else {
      expect(response.status()).toBeLessThan(400);
    }

    if (data.expectedField && data.expectedValue) {
      const json = await response.json();
      expect(json[data.expectedField]).toBe(data.expectedValue);
    }
  });
}
`;
}

// ─── OpenAPI/Swagger Parser ───────────────────────────────────────────────────

export function parseOpenAPI(spec) {
  try {
    const parsed = typeof spec === 'string' ? JSON.parse(spec) : spec;
    const baseUrl = parsed.servers?.[0]?.url || parsed.host
      ? `${parsed.schemes?.[0] || 'https'}://${parsed.host}${parsed.basePath || ''}`
      : '';

    const endpoints = [];
    const paths = parsed.paths || {};

    for (const [path, methods] of Object.entries(paths)) {
      for (const [method, details] of Object.entries(methods)) {
        if (['get','post','put','patch','delete','options','head'].includes(method)) {
          const params = details.parameters || [];
          const queryParams = params.filter(p => p.in === 'query').map(p => ({ key: p.name, value: '', required: p.required }));
          const headers = params.filter(p => p.in === 'header').map(p => ({ key: p.name, value: '' }));

          let bodyExample = '';
          const bodySchema = details.requestBody?.content?.['application/json']?.schema
            || details.parameters?.find(p => p.in === 'body')?.schema;
          if (bodySchema?.example) bodyExample = JSON.stringify(bodySchema.example, null, 2);
          else if (bodySchema?.properties) {
            const ex = {};
            Object.entries(bodySchema.properties).forEach(([k, v]) => {
              ex[k] = v.example !== undefined ? v.example : (v.type === 'string' ? '' : v.type === 'integer' ? 0 : null);
            });
            bodyExample = JSON.stringify(ex, null, 2);
          }

          endpoints.push({
            id: `${method}-${path}`,
            method: method.toUpperCase(),
            path,
            url: `${baseUrl}${path}`,
            name: details.summary || `${method.toUpperCase()} ${path}`,
            description: details.description || '',
            tags: details.tags || [],
            queryParams,
            headers,
            body: bodyExample,
            responses: Object.entries(details.responses || {}).map(([code, res]) => ({
              code, description: res.description || '',
            })),
          });
        }
      }
    }

    return { ok: true, baseUrl, title: parsed.info?.title || 'API', version: parsed.info?.version || '', endpoints };
  } catch (e) {
    return { ok: false, error: e.message, endpoints: [] };
  }
}

// ─── Postman Collection Parser (v2.0 & v2.1) ─────────────────────────────────

export function parsePostmanCollection(jsonText) {
  try {
    const data = typeof jsonText === 'string' ? JSON.parse(jsonText) : jsonText;

    // Detect format
    const isV2 = data.info && data.item;
    if (!isV2) return { ok: false, error: 'Format tidak dikenali. Pastikan ini Postman Collection v2.0 atau v2.1.' };

    const collectionName = data.info?.name || 'Imported Collection';
    const requests = [];

    // Recursive flatten items (supports folders)
    function flattenItems(items, folderName = '') {
      for (const item of items || []) {
        if (item.item) {
          // Folder — recurse
          flattenItems(item.item, item.name || folderName);
        } else if (item.request) {
          const req = item.request;
          const method = (typeof req.method === 'string' ? req.method : 'GET').toUpperCase();

          // Build URL
          let url = '';
          if (typeof req.url === 'string') {
            url = req.url;
          } else if (req.url?.raw) {
            url = req.url.raw;
          } else if (req.url?.host) {
            const protocol = (req.url.protocol || 'https') + '://';
            const host = Array.isArray(req.url.host) ? req.url.host.join('.') : req.url.host;
            const pathArr = Array.isArray(req.url.path) ? req.url.path.join('/') : (req.url.path || '');
            url = `${protocol}${host}/${pathArr}`;
          }

          // Replace Postman {{vars}} with DiyahQA {{vars}} — same syntax, compatible
          url = url || '';

          // Headers
          const headers = (req.header || [])
            .filter(h => !h.disabled)
            .map(h => ({ key: h.key || '', value: h.value || '' }));

          // Query params from URL object
          const params = (req.url?.query || [])
            .filter(q => !q.disabled)
            .map(q => ({ key: q.key || '', value: q.value || '' }));

          // Body
          let body = '';
          if (req.body) {
            if (req.body.mode === 'raw') {
              body = req.body.raw || '';
            } else if (req.body.mode === 'formdata') {
              // Convert formdata to JSON for display
              const obj = {};
              (req.body.formdata || []).forEach(f => { if (!f.disabled) obj[f.key] = f.value; });
              body = JSON.stringify(obj, null, 2);
            } else if (req.body.mode === 'urlencoded') {
              body = (req.body.urlencoded || [])
                .filter(f => !f.disabled)
                .map(f => `${f.key}=${f.value}`)
                .join('&');
            }
          }

          // Default assertion: status 200
          const assertions = [{ id: Date.now() + Math.random(), type: 'status', operator: '==', value: '200', path: '' }];

          requests.push({
            id: Date.now() + Math.random(),
            name: item.name || `${method} ${url}`,
            folder: folderName || '',
            method,
            url,
            params,
            headers,
            body,
            assertions,
          });
        }
      }
    }

    flattenItems(data.item);

    if (requests.length === 0) {
      return { ok: false, error: 'Tidak ada request ditemukan dalam collection ini.' };
    }

    return {
      ok: true,
      id: Date.now(),
      name: collectionName,
      source: 'postman',
      requests,
      importedAt: new Date().toISOString(),
    };
  } catch (e) {
    return { ok: false, error: `Parse error: ${e.message}` };
  }
}

// ─── Format helpers ───────────────────────────────────────────────────────────

export function formatSize(bytes) {
  if (!bytes) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatJson(str) {
  try { return JSON.stringify(JSON.parse(str), null, 2); } catch { return str; }
}

export function statusClass(code) {
  if (!code) return 'status-unknown';
  if (code < 300) return 'status-2xx';
  if (code < 400) return 'status-3xx';
  if (code < 500) return 'status-4xx';
  return 'status-5xx';
}
