// ─── Playwright Academy Data ──────────────────────────────────────────────────
import React from 'react';
import { MonitorPlay, Target, CheckCircle, Rocket, Lightbulb } from 'lucide-react';

export const PLAYWRIGHT_MODULES = [
  {
    id: 'intro',
    title: 'Pengenalan Playwright',
    icon: <MonitorPlay size={24}/>,
    lessons: [
      {
        id: 'what-is',
        title: 'Apa itu Playwright?',
        content: `Playwright adalah framework automation testing modern dari Microsoft yang mendukung Chromium, Firefox, dan WebKit dalam satu API. Playwright dirancang untuk menguji aplikasi web modern yang kompleks, termasuk Single Page App (SPA), aplikasi dengan banyak iframe, popup, dan autentikasi.

Playwright unggul karena:
• Auto-wait: menunggu elemen siap sebelum berinteraksi, bukan mengandalkan sleep()
• Network interception: mock API response untuk testing yang lebih cepat dan reliable
• Trace viewer: replay eksekusi test secara visual untuk debugging
• Parallel execution: jalankan ratusan test secara bersamaan`,
        keyPoints: [
          'Cross-browser: Chromium (Chrome/Edge), Firefox, WebKit (Safari) dari satu script',
          'Auto-wait bawaan: tidak perlu waitForSelector() manual di setiap step',
          'TypeScript-first: type safety untuk locator, assertion, dan konfigurasi',
          'Built-in reporter: HTML, JSON, JUnit, Allure — pilih sesuai kebutuhan',
          'Cocok untuk Web dan API testing dalam satu framework',
        ],
        example: `// Instalasi
npm init playwright@latest

// Script dasar
import { test, expect } from '@playwright/test';

test('halaman utama tampil', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
  await expect(page.getByRole('heading')).toBeVisible();
});`,
      },
      {
        id: 'architecture',
        title: 'Arsitektur Playwright',
        content: `Playwright berkomunikasi dengan browser menggunakan protokol CDP (Chrome DevTools Protocol) untuk Chromium, dan protokol custom untuk Firefox dan WebKit. Ini membuatnya lebih cepat dan reliable dibanding Selenium WebDriver yang menggunakan W3C WebDriver protocol.`,
        keyPoints: [
          'Browser Process: instance browser yang sebenarnya',
          'Browser Context: seperti incognito window — isolated, tanpa shared cookies/storage',
          'Page: satu tab browser dengan full API akses',
          'Frame: iframe atau popup di dalam page',
          'Worker: service worker yang bisa diinspect',
        ],
        example: `// Browser → Context → Page hierarchy
const browser = await chromium.launch();
const context = await browser.newContext({
  baseURL: 'https://app.example.com',
  storageState: 'auth.json', // Login state tersimpan
  viewport: { width: 1280, height: 720 },
  locale: 'id-ID',
});
const page = await context.newPage();

// Setiap test.describe bisa punya context sendiri
// → tests terisolasi, tidak saling pengaruhi`,
      },
    ],
  },
  {
    id: 'locators',
    title: 'Locator Strategies',
    icon: <Target size={24}/>,
    lessons: [
      {
        id: 'locator-types',
        title: 'Jenis-Jenis Locator',
        content: `Locator adalah cara Playwright menemukan elemen di halaman. Memilih locator yang tepat sangat penting untuk test yang stabil — locator yang buruk adalah penyebab utama flaky test.

Urutan prioritas locator (dari paling direkomendasikan):`,
        keyPoints: null,
        table: [
          { prioritas: '1 ⭐⭐⭐', locator: 'getByRole()', keterangan: 'Semantic HTML — paling stabil dan accessible', contoh: 'getByRole("button", { name: "Login" })' },
          { prioritas: '2 ⭐⭐⭐', locator: 'getByLabel()', keterangan: 'Input via label teks', contoh: 'getByLabel("Email")' },
          { prioritas: '3 ⭐⭐⭐', locator: 'getByPlaceholder()', keterangan: 'Input via placeholder', contoh: 'getByPlaceholder("email@example.com")' },
          { prioritas: '4 ⭐⭐⭐', locator: 'getByTestId()', keterangan: 'data-testid attribute', contoh: 'getByTestId("submit-btn")' },
          { prioritas: '5 ⭐⭐', locator: 'getByText()', keterangan: 'Teks visible', contoh: 'getByText("Berhasil login")' },
          { prioritas: '6 ⭐', locator: 'locator("#id")', keterangan: 'CSS selector — bisa berubah', contoh: 'locator("#login-form")' },
          { prioritas: '7 ⚠️', locator: 'locator("xpath=...")', keterangan: 'XPath — hindari jika bisa', contoh: 'locator("xpath=//button[1]")' },
        ],
        example: `// ✅ Baik: semantic, stabil
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByLabel('Password').fill('secret');
await page.getByPlaceholder('Search...').fill('test');

// ✅ Baik: chaining untuk scope
await page.locator('.login-form').getByLabel('Email').fill('qa@test.com');

// ⚠️ Hindari: mudah berubah, tidak semantic
await page.locator('div.css-12xr6g8 > button:nth-child(2)').click();`,
      },
      {
        id: 'locator-actions',
        title: 'Aksi pada Locator',
        content: `Setelah mendapatkan locator, kamu bisa melakukan berbagai aksi. Playwright auto-wait untuk setiap aksi — menunggu elemen visible, enabled, dan stabil.`,
        example: `// Klik dan ketik
await page.getByRole('button', { name: 'Login' }).click();
await page.getByLabel('Email').fill('qa@test.com');
await page.getByLabel('Email').type('qa@test.com'); // karakter per karakter

// Form
await page.getByLabel('Country').selectOption('Indonesia');
await page.getByLabel('Remember me').check();
await page.getByLabel('Newsletter').uncheck();

// Keyboard
await page.keyboard.press('Enter');
await page.keyboard.press('Control+A'); // select all

// Hover & drag
await page.getByText('Menu').hover();
await page.getByText('Item').dragTo(page.getByText('Target'));

// Upload file
await page.getByLabel('Upload').setInputFiles('tests/fixtures/document.pdf');

// Screenshot lokasi spesifik
await page.getByRole('dialog').screenshot({ path: 'dialog.png' });`,
      },
    ],
  },
  {
    id: 'assertions',
    title: 'Assertions',
    icon: <CheckCircle size={24}/>,
    lessons: [
      {
        id: 'expect',
        title: 'expect() — Assertion API',
        content: `Playwright menggunakan expect() dari Jest, tapi dengan versi async yang auto-retry. Ini penting: assertions Playwright akan retry sampai kondisi terpenuhi atau timeout tercapai — bukan langsung fail jika kondisi belum terpenuhi.`,
        keyPoints: [
          'expect(locator) — async, auto-retry sampai timeout',
          'expect(value) — sync, langsung evaluate',
          'soft assertions: kumpulkan semua failure, tidak stop test',
          'Custom timeout: expect(el, { timeout: 10000 })',
        ],
        example: `// Page assertions
await expect(page).toHaveTitle('Dashboard');
await expect(page).toHaveURL('/dashboard');
await expect(page).toHaveURL(/dashboard/);

// Element visibility
await expect(page.getByText('Welcome')).toBeVisible();
await expect(page.getByRole('alert')).toBeHidden();
await expect(page.getByRole('button')).toBeEnabled();
await expect(page.getByRole('button')).toBeDisabled();

// Text content
await expect(page.getByRole('heading')).toHaveText('Dashboard');
await expect(page.getByRole('heading')).toContainText('Dash');
await expect(page.locator('.count')).toHaveText('42');

// Form state
await expect(page.getByLabel('Email')).toHaveValue('qa@test.com');
await expect(page.getByLabel('Newsletter')).toBeChecked();

// Jumlah elemen
await expect(page.locator('.item')).toHaveCount(5);

// Soft assertions (lanjut meski gagal)
await expect.soft(page.getByText('Logo')).toBeVisible();
await expect.soft(page.getByText('Footer')).toBeVisible();
// Semua soft assertion failures dilaporkan di akhir test`,
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Teknik Lanjutan',
    icon: <Rocket size={24}/>,
    lessons: [
      {
        id: 'network',
        title: 'Network Interception',
        content: `Playwright bisa intercept, mock, dan modify HTTP request/response. Ini sangat berguna untuk testing state tertentu tanpa bergantung pada data backend yang bisa berubah.`,
        example: `// Mock API response
await page.route('/api/users', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{ id: 1, name: 'QA Tester' }]),
  });
});

// Abort request (simulate no network)
await page.route('**/*.png', route => route.abort());

// Modify request
await page.route('/api/login', async route => {
  const response = await route.fetch();
  const json = await response.json();
  json.token = 'test-token'; // inject token
  await route.fulfill({ response, json });
});

// Wait for specific request
const [request] = await Promise.all([
  page.waitForRequest(req => req.url().includes('/api/login')),
  page.getByRole('button', { name: 'Login' }).click(),
]);
console.log(request.postDataJSON()); // { email: '...', password: '...' }`,
      },
      {
        id: 'fixtures',
        title: 'Fixtures & Reusable Setup',
        content: `Fixtures adalah cara Playwright untuk berbagi setup/teardown antar test. Mirip dependency injection — test menerima fixture yang sudah siap dipakai.`,
        example: `// fixtures/index.ts
import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type Fixtures = {
  loginPage: LoginPage;
  loggedInPage: Page;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await use(lp);
  },

  loggedInPage: async ({ page }, use) => {
    // Login sekali, reuse di semua test yang butuh
    await page.goto('/login');
    await page.getByLabel('Email').fill('qa@test.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('/dashboard');
    await use(page);
    // Cleanup: tidak perlu — browser context di-reset otomatis
  },
});

// tests/dashboard.spec.ts
import { test, expect } from '../fixtures';

test('dashboard tampil setelah login', async ({ loggedInPage }) => {
  // Sudah login — langsung test dashboard
  await expect(loggedInPage.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});`,
      },
      {
        id: 'storage-state',
        title: 'Storage State (Login Once)',
        content: `Daripada login di setiap test, simpan session state sekali lalu reuse. Ini membuat test suite jauh lebih cepat.`,
        example: `// global-setup.ts — dijalankan sekali sebelum semua test
import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://app.example.com/login');
  await page.getByLabel('Email').fill('qa@test.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('/dashboard');

  // Simpan cookies + localStorage
  await page.context().storageState({ path: 'tests/fixtures/auth.json' });
  await browser.close();
}

export default globalSetup;

// playwright.config.ts
export default defineConfig({
  globalSetup: './global-setup.ts',
  use: {
    storageState: 'tests/fixtures/auth.json', // semua test pakai session ini
  },
});

// Sekarang semua test sudah dalam kondisi login!
test('profile page', async ({ page }) => {
  await page.goto('/profile'); // langsung tanpa login dulu
  await expect(page.getByText('QA Tester')).toBeVisible();
});`,
      },
      {
        id: 'parallel',
        title: 'Parallel & Sharding',
        content: `Playwright menjalankan test files secara paralel by default. Setiap file dijalankan di browser context terpisah, sehingga aman untuk paralel.`,
        example: `// playwright.config.ts
export default defineConfig({
  // Jumlah worker parallel
  workers: process.env.CI ? 2 : '50%', // 50% CPU di lokal

  // Test isolation
  use: {
    // Setiap test punya context baru
    // Tidak perlu manual cleanup
  },

  // Retry flaky tests
  retries: process.env.CI ? 2 : 0,

  // Sharding untuk CI
  // npx playwright test --shard=1/4  (25% tests di worker 1)
  // npx playwright test --shard=2/4  (25% tests di worker 2)
  // ... dst, jalankan paralel di 4 CI machines
});

// Test berjalan paralel antar file
// Tests DALAM satu file berjalan berurutan (default)
// Untuk paralel dalam file:
test.describe.configure({ mode: 'parallel' });`,
      },
      {
        id: 'trace',
        title: 'Trace Viewer',
        content: `Trace Viewer adalah fitur killer Playwright — merekam setiap langkah test (screenshot, network, console log) dan memungkinkan kamu "replay" test yang gagal secara visual.`,
        example: `// playwright.config.ts — aktifkan trace
use: {
  trace: 'on-first-retry', // record trace saat retry
  // atau: 'on' (selalu), 'off', 'retain-on-failure'
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},

// Buka trace dari command line:
npx playwright show-trace test-results/my-test/trace.zip

// Atau dari dalam test:
await context.tracing.start({ screenshots: true, snapshots: true });
// ... jalankan test ...
await context.tracing.stop({ path: 'trace.zip' });

// Trace viewer menampilkan:
// - Timeline setiap action (click, fill, navigate)
// - Screenshot sebelum/sesudah setiap action
// - Network requests yang terjadi
// - Console log
// - DOM snapshot yang bisa di-inspect`,
      },
    ],
  },
  {
    id: 'best-practices',
    title: 'Best Practices',
    icon: <Lightbulb size={24}/>,
    lessons: [
      {
        id: 'pom',
        title: 'Page Object Model (POM)',
        content: `Page Object Model adalah design pattern di mana setiap halaman web direpresentasikan sebagai sebuah class. Locator dan aksi dikumpulkan dalam class tersebut, bukan tersebar di test files.`,
        example: `// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  // Locators sebagai getter
  get emailInput()   { return this.page.getByLabel('Email'); }
  get passwordInput(){ return this.page.getByLabel('Password'); }
  get loginButton()  { return this.page.getByRole('button', { name: 'Login' }); }
  get errorMsg()     { return this.page.getByRole('alert'); }

  // Actions
  async goto() { await this.page.goto('/login'); }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Assertions
  async expectError(msg: string) {
    await expect(this.errorMsg).toContainText(msg);
  }
}

// tests/login.spec.ts — bersih, readable
test('login gagal', async ({ page }) => {
  const lp = new LoginPage(page);
  await lp.goto();
  await lp.login('bad@email.com', 'wrong');
  await lp.expectError('Invalid credentials');
});`,
      },
      {
        id: 'anti-patterns',
        title: 'Anti-Patterns yang Harus Dihindari',
        content: `Ini adalah kesalahan umum yang membuat test tidak stabil, lambat, atau susah di-maintain.`,
        keyPoints: null,
        table: [
          { antiPattern: 'await page.waitForTimeout(3000)', masalah: 'Sleep statis — lambat dan flaky', solusi: 'await page.waitForLoadState() atau expect(el).toBeVisible()' },
          { antiPattern: 'locator("div:nth-child(3)")', masalah: 'Selector berbasis posisi — rapuh', solusi: 'getByRole() atau getByTestId()' },
          { antiPattern: 'Test saling bergantung', masalah: 'Test B gagal karena state dari Test A', solusi: 'Setiap test independen, setup sendiri' },
          { antiPattern: 'Logic bisnis di test', masalah: 'Test jadi rumit dan sulit dibaca', solusi: 'Pindahkan ke Page Object atau helper function' },
          { antiPattern: 'Tidak ada assertion', masalah: 'Test selalu pass meski app rusak', solusi: 'Selalu assert outcome yang diharapkan' },
          { antiPattern: 'Hardcode credential di test', masalah: 'Security risk, susah di-maintain', solusi: 'Gunakan env variable atau fixtures' },
        ],
      },
    ],
  },
];
