// ─── Tutorial Data ────────────────────────────────────────────────────────────
import React from 'react';
import { Rocket, Video, Bot, Layout, BarChart, RefreshCw } from 'lucide-react';

export const TUTORIALS = [
  {
    id: 'getting-started',
    title: 'Mulai dari Awal',
    icon: <Rocket size={24}/>,
    duration: '5 menit',
    level: 'beginner',
    description: 'Buat project pertama dan jalankan test pertamamu.',
    steps: [
      {
        title: 'Buat Project Baru',
        content: 'Klik tab "🤖 Projects" lalu klik tombol "+ New Project".',
        detail: `Pilih tipe project:
• Web Automation → untuk test browser (klik, input, navigasi)
• API Automation → untuk test REST API (request/response)

Isi nama project (contoh: "my-first-project") dan Base URL website yang mau ditest.
Klik 🚀 Buat Project dan tunggu setup selesai (2-5 menit pertama kali).`,
        tip: 'Pastikan Node.js sudah terinstall. Cek dengan: node --version di Terminal.',
        code: null,
      },
      {
        title: 'Rekam Test Pertama',
        content: 'Buka project → tab 🔴 Recorder → klik Start Recording.',
        detail: `Browser Chromium akan terbuka secara otomatis.
Sekarang lakukan aksi di browser:
1. Navigasi ke halaman yang mau ditest
2. Klik elemen, isi form, submit
3. Semua aksi otomatis direkam

Tutup browser → script Playwright tersimpan otomatis.`,
        tip: 'Beri nama output file yang deskriptif, contoh: "login-test.spec.ts"',
        code: null,
      },
      {
        title: 'Jalankan Test',
        content: 'Tab ▶️ Execution → pilih mode Run → klik ▶ Run.',
        detail: `Mode yang tersedia:
• ▶ Run (Headless) → paling cepat, tanpa tampilkan browser
• 🪟 Headed → browser terlihat, bagus untuk verifikasi awal
• 🐛 Debug → step-by-step, untuk investigasi masalah

Log eksekusi tampil real-time. Tunggu hasil akhir.`,
        tip: 'Gunakan mode Headed dulu untuk memastikan test berjalan benar sebelum headless.',
        code: null,
      },
      {
        title: 'Lihat Report',
        content: 'Tab 📈 Report → klik "Generate Allure Report" → Buka di Browser.',
        detail: `Report Allure menampilkan:
• Ringkasan total passed/failed/skipped
• Detail setiap test case dengan durasi
• Screenshot untuk test yang gagal
• Video replay eksekusi

Report dibuka di browser default Mac kamu.`,
        tip: 'Jalankan test dulu sebelum generate report, agar ada data allure-results.',
        code: null,
      },
    ],
  },
  {
    id: 'record-and-fix',
    title: 'Record & Fix Test',
    icon: <Video size={24}/>,
    duration: '10 menit',
    level: 'beginner',
    description: 'Cara merekam test, memperbaiki script, dan menjalankannya.',
    steps: [
      {
        title: 'Record Skenario Login',
        content: 'Rekam alur login lengkap dengan Record tab.',
        detail: 'Buka tab 🔴 Recorder, isi URL halaman login, set output file "login.spec.ts", klik Start Recording.\n\nLakukan aksi:\n1. Klik field email\n2. Ketik email test\n3. Klik field password\n4. Ketik password\n5. Klik tombol Login\n6. Tunggu halaman dashboard muncul\n7. Tutup browser',
        tip: 'Lakukan aksi pelan-pelan — Codegen butuh waktu merekam setiap event.',
        code: null,
      },
      {
        title: 'Review dan Edit Script',
        content: 'Buka tab 📝 Script Editor → pilih file login.spec.ts.',
        detail: 'Script hasil rekaman biasanya sudah cukup baik, tapi perlu ditambahkan assertion:\n\n• Verifikasi halaman berhasil berpindah ke /dashboard\n• Verifikasi teks "Welcome" atau nama user tampil\n• Verifikasi elemen tertentu visible',
        tip: 'Gunakan Cmd+S untuk save file setelah edit.',
        code: `// Tambahkan assertion setelah login berhasil:
await expect(page).toHaveURL(/dashboard/);
await expect(page.getByText('Welcome')).toBeVisible();
await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();`,
      },
      {
        title: 'Test Gagal? Gunakan Failure Center',
        content: 'Kalau test gagal, buka tab 🔥 Failure Center.',
        detail: 'Setelah run, jika ada kegagalan:\n1. Klik nama failure di list kiri\n2. Lihat screenshot — tampilkan state halaman saat error\n3. Klik "Buka Trace" untuk replay lengkap di Playwright Trace Viewer\n4. Paste error log ke AI Analyzer untuk dapat solusi',
        tip: 'Trace Viewer sangat powerful — bisa lihat setiap step, network request, dan DOM snapshot.',
        code: null,
      },
      {
        title: 'Perbaiki Selector yang Gagal',
        content: 'Gunakan tab 🎯 Locator Inspector untuk selector yang tepat.',
        detail: '1. Buka tab Locator Inspector\n2. Isi URL halaman\n3. Klik Start Inspector\n4. Hover elemen di browser\n5. Lihat locator terbaik di overlay pojok kanan atas\n6. Copy locator ke script kamu',
        tip: 'Prioritaskan getByRole dan getByTestId — paling stabil saat UI berubah.',
        code: `// Contoh locator yang stabil vs rapuh:

// ✅ Stabil — tidak berubah saat styling diupdate
await page.getByRole('button', { name: 'Login' }).click();
await page.getByLabel('Email').fill('qa@test.com');
await page.getByTestId('submit-btn').click();

// ⚠️ Rapuh — berubah saat class CSS diupdate
await page.locator('.css-12xr6g8 > button:nth-child(2)').click();`,
      },
    ],
  },
  {
    id: 'ai-generator',
    title: 'Generate Test dengan AI',
    icon: <Bot size={24}/>,
    duration: '8 menit',
    level: 'intermediate',
    description: 'Generate Playwright script dari requirement atau deskripsi natural language.',
    steps: [
      {
        title: 'Generate dari Requirement (Offline)',
        content: 'Tab 🤖 AI Generator → pilih "📝 Requirement".',
        detail: 'Isi form dengan detail skenario:\n• URL halaman target\n• Nama test yang deskriptif\n• Langkah-langkah dalam bahasa Indonesia (satu per baris)\n• Expected result\n\nKlik ⚡ Generate → script muncul di kanan.',
        tip: 'Makin detail langkah-langkah yang kamu isi, makin baik script yang dihasilkan.',
        code: `// Contoh input langkah:
Buka halaman login
Isi field email dengan 'qa@test.com'
Isi field password dengan 'password123'
Klik tombol Login
Verifikasi dashboard tampil
Verifikasi teks 'Selamat Datang' muncul`,
      },
      {
        title: 'Generate Page Object Model',
        content: 'AI Generator → pilih "🏗️ Page Object".',
        detail: 'Page Object Model (POM) adalah cara terbaik mengorganisir test.\n\nIsi:\n• URL halaman\n• Nama page (misal: LoginPage)\n• Daftar elemen di halaman (satu per baris)\n\nHasilnya adalah class TypeScript yang siap dipakai.',
        tip: 'POM sangat berguna jika kamu punya banyak test yang menggunakan halaman yang sama.',
        code: `// Contoh elemen yang diisi:
Email Input
Password Input
Login Button
Error Message
Remember Me Checkbox

// Hasil generate:
export class LoginPage {
  get emailInput()  { return this.page.getByLabel('Email Input'); }
  get loginButton() { return this.page.getByRole('button', { name: 'Login Button' }); }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    // ...
  }
}`,
      },
      {
        title: 'Generate dengan OpenAI (Opsional)',
        content: 'AI Generator → pilih "🤖 OpenAI" — butuh API key.',
        detail: '1. Pergi ke tab ⚙️ Run Config → Settings tab\n2. Set OpenAI API key (dapatkan di platform.openai.com)\n3. Kembali ke AI Generator → tab OpenAI\n4. Tulis prompt dalam bahasa natural\n5. Klik Generate\n\nHasil lebih cerdas — bisa memahami konteks kompleks, generate assertion yang lebih tepat, dan handle edge cases.',
        tip: 'Gunakan model gpt-4o-mini untuk hemat biaya dengan kualitas yang tetap baik.',
        code: `// Contoh prompt yang baik:
Buat Playwright TypeScript test untuk checkout di e-commerce:
- Base URL: https://shop.example.com
- Login sebagai qa@test.com / password123
- Tambahkan produk "iPhone 15" ke cart
- Proses checkout dengan kartu test 4111111111111111
- Verifikasi halaman konfirmasi order tampil
- Verifikasi order number muncul
- Include assertion untuk response time < 3 detik`,
      },
      {
        title: 'Simpan dan Jalankan',
        content: 'Klik 💾 Simpan ke Project → pergi ke Execution → Run.',
        detail: 'Script tersimpan otomatis ke folder tests/ di project kamu.\n\nLangkah selanjutnya:\n1. Buka Script Editor untuk review dan edit jika perlu\n2. Pergi ke Execution → Run untuk test\n3. Jika gagal → cek Failure Center\n4. Jika pass → Generate Report',
        tip: 'Selalu review script sebelum run — AI mungkin menggunakan placeholder yang perlu diupdate.',
        code: null,
      },
    ],
  },
  {
    id: 'page-object-workflow',
    title: 'Workflow Page Object Model',
    icon: <Layout size={24}/>,
    duration: '15 menit',
    level: 'intermediate',
    description: 'Cara membuat dan menggunakan Page Object Model untuk test yang maintainable.',
    steps: [
      {
        title: 'Mengapa Page Object Model?',
        content: 'POM membuat test lebih mudah di-maintain ketika UI berubah.',
        detail: 'Tanpa POM:\n• Selector tersebar di banyak file test\n• Kalau button Login berubah class → update 10 file\n• Test sulit dibaca\n\nDengan POM:\n• Semua selector di 1 class (LoginPage.ts)\n• Kalau berubah → update 1 file saja\n• Test jadi self-documenting: loginPage.login(email, pass)',
        tip: 'Mulai dengan POM dari awal project — lebih mudah daripada refactor belakangan.',
        code: null,
      },
      {
        title: 'Buat Page Object',
        content: 'AI Generator → "🏗️ Page Object" → generate → simpan ke pages/',
        detail: 'Contoh untuk halaman Login:\n\n1. Nama Page: LoginPage\n2. Elemen:\n   - Email Input\n   - Password Input\n   - Login Button\n   - Error Message\n3. Klik Generate\n4. Simpan ke project\n5. Pindahkan file dari tests/ ke pages/ via Script Editor',
        tip: 'Buat satu file POM per halaman: LoginPage, DashboardPage, CheckoutPage, dll.',
        code: `// pages/LoginPage.ts (hasil generate + enhancement manual)
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput    = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton   = page.getByRole('button', { name: /login/i });
    this.errorMessage  = page.getByRole('alert');
  }

  async goto()  { await this.page.goto('/login'); }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectError(msg: string) {
    await expect(this.errorMessage).toContainText(msg);
  }
}`,
      },
      {
        title: 'Buat Test yang Menggunakan POM',
        content: 'Script Editor → buat file test baru → import LoginPage.',
        detail: 'Test yang menggunakan POM jauh lebih bersih dan mudah dibaca.',
        tip: 'Selalu buat test positif (happy path) dan negatif (error case) untuk setiap fitur.',
        code: `// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature', () => {

  test('TC-001 | Login valid → redirect ke dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('qa@test.com', 'password123');

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByText(/welcome/i)).toBeVisible();
  });

  test('TC-002 | Password salah → tampil error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('qa@test.com', 'wrongpassword');

    await loginPage.expectError('Invalid credentials');
    await expect(page).toHaveURL(/login/); // masih di login page
  });

  test('TC-003 | Email kosong → validasi HTML5', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginButton.click();

    // Form tidak tersubmit karena validasi HTML5
    await expect(page).toHaveURL(/login/);
  });

});`,
      },
      {
        title: 'Jalankan dan Verifikasi',
        content: 'Execution → pilih login.spec.ts → Run.',
        detail: 'Kalau semua pass, kamu punya:\n• Test yang maintainable\n• Coverage untuk happy path dan error case\n• POM yang bisa dipakai ulang di test lain\n\nSelanjutnya buat POM untuk halaman lain: DashboardPage, ProfilePage, dll.',
        tip: 'Gunakan test.describe untuk mengelompokkan test yang berkaitan.',
        code: null,
      },
    ],
  },
  {
    id: 'data-driven',
    title: 'Data Driven Testing',
    icon: <BarChart size={24}/>,
    duration: '10 menit',
    level: 'intermediate',
    description: 'Jalankan test yang sama dengan banyak kombinasi data dari CSV atau JSON.',
    steps: [
      {
        title: 'Buat File Data',
        content: 'Tab 📊 Test Data → klik "+" → buat file CSV.',
        detail: 'Buat file "login-data.csv" dengan format:\n\nBaris pertama = nama kolom (header)\nBaris berikutnya = data test\n\nKolom "expectedStatus" opsional untuk assertion otomatis.',
        tip: 'Gunakan CSV untuk data sederhana, JSON untuk data yang nested.',
        code: `// login-data.csv
email,password,expectedStatus,description
qa@test.com,correct123,success,Valid credentials
wrong@test.com,wrongpass,error,Wrong password
admin@test.com,admin123,success,Admin login
locked@test.com,pass123,locked,Locked account`,
      },
      {
        title: 'Buat Script Data Driven',
        content: 'Script Editor → buat file baru "login-data-driven.spec.ts".',
        detail: 'Script ini akan membaca CSV dan menjalankan test untuk setiap baris data.',
        tip: 'Data driven test sangat efisien untuk test login, form validation, dan API endpoint.',
        code: `// tests/login-data-driven.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as fs from 'fs';
import * as path from 'path';

// Parse CSV
function parseCSV(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, h, i) => ({ ...obj, [h.trim()]: values[i]?.trim() }), {} as Record<string, string>);
  });
}

const testData = parseCSV(path.join(__dirname, '../data/login-data.csv'));

for (const data of testData) {
  test(\`Login: \${data.description || data.email}\`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(data.email, data.password);

    if (data.expectedStatus === 'success') {
      await expect(page).toHaveURL(/dashboard/);
    } else if (data.expectedStatus === 'error') {
      await expect(loginPage.errorMessage).toBeVisible();
    }
  });
}`,
      },
      {
        title: 'Edit Data Tanpa Ubah Script',
        content: 'Tambah atau ubah data di CSV → jalankan ulang → test otomatis update.',
        detail: 'Keunggulan data driven:\n• Tambah 10 skenario baru → cukup tambah 10 baris di CSV\n• Script tidak perlu diubah\n• QA non-programmer bisa kontribusi data test\n• Mudah review coverage di satu file',
        tip: 'Simpan CSV di folder data/ — sudah disediakan saat buat project.',
        code: null,
      },
    ],
  },
  {
    id: 'cicd-integration',
    title: 'Integrasi CI/CD',
    icon: <RefreshCw size={24}/>,
    duration: '12 menit',
    level: 'advanced',
    description: 'Otomatiskan test di pipeline GitHub Actions setiap ada perubahan kode.',
    steps: [
      {
        title: 'Konfigurasi Run Config',
        content: 'Tab ⚙️ Run Config → set konfigurasi untuk CI environment.',
        detail: 'Setting yang penting untuk CI:\n• Workers: 2 (jangan terlalu banyak di CI)\n• Retries: 2 (handle flaky tests)\n• Timeout: 60000 (CI lebih lambat dari lokal)\n• Headed: false (CI tidak ada display)\n• Base URL: gunakan environment variable',
        tip: 'Run Config disimpan di .diyahqa-run-config.json di project folder.',
        code: null,
      },
      {
        title: 'Export playwright.config.ts',
        content: 'Preview config di bagian bawah Run Config → copy ke project.',
        detail: 'Config yang di-generate sudah include:\n• Reporter Allure untuk report\n• Screenshot on failure\n• Video retain on failure\n• Trace on first retry\n• Retries dan workers yang optimal',
        tip: 'Replace file playwright.config.ts di project dengan config yang di-generate.',
        code: `// playwright.config.ts hasil generate
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 2,
  workers: 2,
  reporter: [['allure-playwright'], ['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env.BASE_URL || 'https://staging.example.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});`,
      },
      {
        title: 'Buat GitHub Actions Workflow',
        content: 'Buat file .github/workflows/playwright.yml di project kamu.',
        detail: 'Workflow ini akan otomatis jalankan test setiap ada push atau pull request.',
        tip: 'Simpan BASE_URL sebagai GitHub Secret: Settings → Secrets → New repository secret.',
        code: `# .github/workflows/playwright.yml
name: Playwright E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 30

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run tests
        run: npx playwright test
        env:
          BASE_URL: \${{ secrets.STAGING_URL }}

      - name: Upload Allure results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: allure-results
          path: allure-results/
          retention-days: 30`,
      },
      {
        title: 'Monitor Test di CI',
        content: 'Cek hasil di GitHub Actions tab setelah push.',
        detail: 'Di GitHub Actions kamu bisa:\n• Lihat log real-time setiap step\n• Download artifact (allure-results, screenshots)\n• Set branch protection: merge only if tests pass\n• Notifikasi ke Slack/email jika gagal\n\nAllure artifact bisa di-download dan dibuka lokal menggunakan tab Report di Automation Lab.',
        tip: 'Aktifkan branch protection rules di GitHub repo untuk mencegah merge kode yang breakingtest.',
        code: null,
      },
    ],
  },
];
