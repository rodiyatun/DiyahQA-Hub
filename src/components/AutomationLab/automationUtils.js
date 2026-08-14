// ─── Rule-based AI Script Generator ──────────────────────────────────────────
import React from 'react';
import { Clock, Target, Globe, CheckCircle, Lock, Map, Dices, Search } from 'lucide-react';

export function generateFromRequirement(req) {
  const { url, title, steps, expectedResult, type, pageName } = req;
  const name = pageName || 'Page';
  const testTitle = title || 'Generated Test';
  const safeUrl = url || 'https://example.com';

  if (type === 'api') {
    return generateAPITest(req);
  }

  // Parse steps
  const stepLines = (steps || '').split('\n').map(s => s.trim()).filter(Boolean);
  const actions = stepLines.map(step => parseStep(step)).filter(Boolean);

  const actionCode = actions.length
    ? actions.map(a => '  ' + a).join('\n')
    : `  await page.goto('${safeUrl}');\n  // TODO: tambahkan langkah test`;

  return `import { test, expect } from '@playwright/test';

test('${testTitle}', async ({ page }) => {
  await page.goto('${safeUrl}');

${actionCode}

${expectedResult ? `  // Expected: ${expectedResult}\n  await expect(page).toHaveURL(/${safeUrl.split('/').pop() || 'expected'}/);` : ''}
});
`;
}

function parseStep(step) {
  const s = step.toLowerCase();

  if (s.includes('klik') || s.includes('click')) {
    const match = step.match(/["'](.*?)["']/);
    const label = match ? match[1] : 'button';
    return `await page.getByRole('button', { name: '${label}' }).click();`;
  }
  if (s.includes('input') || s.includes('isi') || s.includes('ketik') || s.includes('type')) {
    const match = step.match(/["'](.*?)["']/);
    if (match) return `await page.getByLabel('${match[1]}').fill('test value');`;
    return `await page.getByPlaceholder('...').fill('test value');`;
  }
  if (s.includes('navigate') || s.includes('buka') || s.includes('goto') || s.includes('halaman')) {
    const urlMatch = step.match(/https?:\/\/\S+/);
    if (urlMatch) return `await page.goto('${urlMatch[0]}');`;
  }
  if (s.includes('submit') || s.includes('kirim')) {
    return `await page.getByRole('button', { name: /submit|kirim|simpan/i }).click();`;
  }
  if (s.includes('pilih') || s.includes('select') || s.includes('dropdown')) {
    const match = step.match(/["'](.*?)["']/);
    return `await page.selectOption('select', '${match ? match[1] : 'value'}');`;
  }
  if (s.includes('verify') || s.includes('verifikasi') || s.includes('tampil') || s.includes('visible')) {
    const match = step.match(/["'](.*?)["']/);
    if (match) return `await expect(page.getByText('${match[1]}')).toBeVisible();`;
    return `await expect(page.locator('.result')).toBeVisible();`;
  }
  if (s.includes('screenshot')) {
    return `await page.screenshot({ path: 'screenshots/screenshot.png' });`;
  }
  if (s.includes('wait') || s.includes('tunggu')) {
    return `await page.waitForLoadState('networkidle');`;
  }
  if (s.includes('scroll')) {
    return `await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));`;
  }

  // Generic comment
  return `// ${step}`;
}

function generateAPITest(req) {
  const { url, title, method, body, expectedStatus } = req;
  const m = (method || 'GET').toLowerCase();
  const bodyStr = body ? `, { data: ${body} }` : '';

  return `import { test, expect } from '@playwright/test';

test('${title || 'API Test'}', async ({ request }) => {
  const response = await request.${m}('${url}'${bodyStr});

  expect(response.status()).toBe(${expectedStatus || 200});
  const json = await response.json();
  console.log(json);
  // TODO: tambahkan assertion sesuai response schema
});
`;
}

// ─── Generate Page Object Model ───────────────────────────────────────────────

export function generatePageObject(req) {
  const { url, pageName, elements } = req;
  const name = (pageName || 'MyPage').replace(/\s+/g, '');
  const elems = (elements || '').split('\n').map(e => e.trim()).filter(Boolean);

  const props = elems.map(e => {
    const safe = e.replace(/[^a-zA-Z0-9]/g, '_').replace(/^_+/, '').toLowerCase();
    return `  get ${safe}() { return this.page.getByLabel('${e}'); }`;
  }).join('\n');

  const methods = elems.length
    ? `  async fill${name}Form(data: Record<string, string>) {\n${elems.map(e => {
        const safe = e.replace(/[^a-zA-Z0-9]/g, '_').replace(/^_+/, '').toLowerCase();
        return `    if (data['${e}']) await this.${safe}.fill(data['${e}']);`;
      }).join('\n')}\n  }`
    : `  async navigate() { await this.page.goto('${url || '/'}'); }`;

  return `import { Page, Locator } from '@playwright/test';

export class ${name}Page {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('${url || '/'}');
  }

${props}

${methods}
}
`;
}

// ─── AI Error Analyzer (rule-based) ──────────────────────────────────────────

export function analyzePlaywrightError(errorLog) {
  const log = errorLog.toLowerCase();
  const suggestions = [];

  if (log.includes('timeout') && log.includes('locator')) {
    suggestions.push({ icon: <Clock size={20}/>, title: 'Timeout pada Locator', desc: 'Elemen tidak ditemukan dalam waktu yang ditentukan.', fix: 'Tambahkan waitForSelector() atau gunakan locator yang lebih spesifik. Cek apakah elemen benar-benar ada di halaman.' });
  }
  if (log.includes('strict mode violation')) {
    suggestions.push({ icon: <Target size={20}/>, title: 'Selector Ambigu', desc: 'Locator menemukan lebih dari satu elemen.', fix: 'Gunakan selector yang lebih spesifik: getByRole(), getByTestId(), atau tambahkan .first() / .nth(0).' });
  }
  if (log.includes('net::err_connection_refused') || log.includes('econnrefused')) {
    suggestions.push({ icon: <Globe size={20}/>, title: 'Koneksi Ditolak', desc: 'Server tidak bisa diakses.', fix: 'Pastikan aplikasi berjalan di URL yang benar. Cek baseURL di playwright.config.ts.' });
  }
  if (log.includes('expect(received).tobe(expected)') || log.includes('tobehavetext') || log.includes('received') && log.includes('expected')) {
    suggestions.push({ icon: <CheckCircle size={20}/>, title: 'Assertion Gagal', desc: 'Nilai yang diterima tidak sesuai ekspektasi.', fix: 'Cek apakah data test sudah benar. Gunakan toHaveText() dengan exact: false untuk partial match.' });
  }
  if (log.includes('401') || log.includes('403') || log.includes('unauthorized')) {
    suggestions.push({ icon: <Lock size={20}/>, title: 'Auth Error', desc: 'Request tidak terotorisasi.', fix: 'Pastikan token/cookie valid. Gunakan storageState di playwright.config.ts untuk menyimpan session.' });
  }
  if (log.includes('navigation failed') || log.includes('net::err_name_not_resolved')) {
    suggestions.push({ icon: <Map size={20}/>, title: 'URL Tidak Valid', desc: 'Gagal navigasi ke URL yang diberikan.', fix: 'Periksa URL di test atau baseURL di config. Pastikan DNS bisa resolve domain.' });
  }
  if (log.includes('browsertype.launch') || log.includes('executable doesn')) {
    suggestions.push({ icon: <Globe size={20}/>, title: 'Browser Tidak Terinstall', desc: 'Playwright tidak menemukan browser executable.', fix: 'Jalankan: npx playwright install chromium' });
  }
  if (log.includes('flaky') || (log.includes('passed') && log.includes('retry'))) {
    suggestions.push({ icon: <Dices size={20}/>, title: 'Flaky Test', desc: 'Test tidak stabil — kadang lulus kadang gagal.', fix: 'Tambahkan waitForLoadState("networkidle") atau waitFor condition spesifik. Hindari sleep() statis.' });
  }

  if (suggestions.length === 0) {
    suggestions.push({ icon: <Search size={20}/>, title: 'Error Tidak Dikenali', desc: 'Tidak ada pattern yang cocok.', fix: 'Cek baris error utama di log. Buka Playwright trace dengan: npx playwright show-trace trace.zip' });
  }

  return suggestions;
}

// ─── OpenAI Generator ────────────────────────────────────────────────────────

export async function generateWithOpenAI(apiKey, prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Kamu adalah expert QA automation engineer. Generate Playwright TypeScript test code yang bersih, maintainable, dan menggunakan best practices. Selalu include proper assertions. Response hanya berupa kode TypeScript, tanpa penjelasan.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || 'OpenAI API error');
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}
