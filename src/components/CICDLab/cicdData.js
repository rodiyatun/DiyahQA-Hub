// ─── CI/CD Academy Data ───────────────────────────────────────────────────────
import React from 'react';
import { GitBranch, RefreshCw, Github, PlaySquare } from 'lucide-react';

export const CICD_ROADMAP = [
  {
    id: 'git',
    title: 'Git Fundamentals',
    icon: <GitBranch size={16} />,
    lessons: [
      {
        id: 'git-branch',
        title: 'Branch, Commit, Merge',
        content: `Git adalah fondasi dari semua pipeline CI/CD. Sebelum memahami automation, kamu harus paham bagaimana kode bergerak dari developer ke production.

Branch adalah "cabang" kode yang independen. Setiap fitur atau bugfix dibuat di branch tersendiri agar tidak mengganggu kode utama (main/master).`,
        keyPoints: [
          'main/master: branch utama yang selalu dalam kondisi stabil',
          'feature branch: tempat mengerjakan fitur baru',
          'Commit adalah "snapshot" perubahan kode di satu titik waktu',
          'Merge menggabungkan perubahan dari satu branch ke branch lain',
          'Conflict terjadi ketika dua orang mengubah baris yang sama',
        ],
        example: `# Buat dan pindah ke branch baru
git checkout -b feature/login-automation

# Tambahkan perubahan ke staging
git add tests/login.spec.ts

# Commit dengan pesan yang deskriptif
git commit -m "feat: add login automation test"

# Push ke remote repository
git push origin feature/login-automation

# Merge ke main (biasanya via Pull Request)
git checkout main
git merge feature/login-automation`,
      },
      {
        id: 'git-pr',
        title: 'Pull Request & Code Review',
        content: `Pull Request (PR) atau Merge Request (MR) adalah mekanisme untuk mengusulkan perubahan kode ke branch utama. Di sinilah CI/CD pipeline pertama kali terpicu — setiap PR biasanya menjalankan automated tests sebelum boleh di-merge.

Sebagai QA Engineer, kamu harus memahami bahwa pipeline pada PR adalah "gate" pertama untuk kualitas kode.`,
        keyPoints: [
          'PR memberi kesempatan review kode sebelum masuk ke main',
          'CI pipeline otomatis berjalan saat PR dibuat/diupdate',
          'Status checks (green/red) menentukan apakah PR bisa di-merge',
          'Branch protection rules mencegah merge jika tests gagal',
          'QA berperan memastikan test di pipeline comprehensive',
        ],
        example: `# Alur Pull Request:
# 1. Developer push branch
# 2. Buat Pull Request di GitHub/GitLab
# 3. CI pipeline otomatis trigger:
#    - Linting
#    - Unit tests
#    - Integration tests  
#    - E2E tests (Playwright/Cypress)
# 4. Reviewer review kode + hasil tests
# 5. Jika semua hijau → merge ke main
# 6. Pipeline main → deploy ke staging`,
      },
    ],
  },
  {
    id: 'cicd-concepts',
    title: 'Konsep CI/CD',
    icon: <RefreshCw size={16} />,
    lessons: [
      {
        id: 'what-cicd',
        title: 'Apa itu CI/CD?',
        content: `CI (Continuous Integration) adalah praktik menggabungkan perubahan kode ke branch utama sesering mungkin, dengan automated tests yang berjalan setiap kali ada perubahan.

CD (Continuous Delivery/Deployment) adalah ekstensi dari CI — setelah tests hijau, kode otomatis di-deploy ke environment tertentu.

Untuk QA, CI/CD adalah cara memastikan automation tests berjalan secara konsisten tanpa ketergantungan pada "jangan lupa run tests dulu".`,
        keyPoints: [
          'CI: otomatisasi testing setiap ada perubahan kode',
          'CD Delivery: kode siap deploy kapan saja (manual approval)',
          'CD Deployment: kode otomatis deploy tanpa approval manual',
          'Pipeline: rangkaian steps yang dijalankan secara berurutan',
          'Artifact: hasil build (binary, laporan test, screenshot) yang disimpan',
          'Environment: dev → staging → production',
        ],
        example: null,
      },
      {
        id: 'pipeline-stages',
        title: 'Stage Pipeline yang Umum',
        content: `Pipeline CI/CD untuk QA biasanya terdiri dari beberapa stage. Setiap stage memiliki tujuan spesifik dan biasanya berjalan berurutan (stage berikutnya hanya jalan jika stage sebelumnya berhasil).`,
        keyPoints: null,
        table: [
          { stage: 'Checkout', tujuan: 'Clone repository ke runner/agent', durasi: '< 30 detik' },
          { stage: 'Install', tujuan: 'Install dependencies (npm install)', durasi: '1-3 menit' },
          { stage: 'Lint', tujuan: 'Cek kualitas dan style kode', durasi: '< 1 menit' },
          { stage: 'Unit Test', tujuan: 'Test fungsi dan komponen secara terisolasi', durasi: '1-5 menit' },
          { stage: 'Build', tujuan: 'Compile/bundle aplikasi', durasi: '2-10 menit' },
          { stage: 'E2E Test', tujuan: 'Test skenario user end-to-end (Playwright)', durasi: '5-30 menit' },
          { stage: 'Report', tujuan: 'Generate dan publish laporan test (Allure)', durasi: '< 1 menit' },
          { stage: 'Deploy', tujuan: 'Deploy ke staging/production', durasi: '1-10 menit' },
        ],
      },
    ],
  },
  {
    id: 'github-actions',
    title: 'GitHub Actions',
    icon: <Github size={16} />,
    lessons: [
      {
        id: 'gha-structure',
        title: 'Struktur Workflow GitHub Actions',
        content: `GitHub Actions menggunakan file YAML di folder .github/workflows/. Setiap file adalah satu workflow yang bisa memiliki beberapa jobs, dan setiap job memiliki beberapa steps.`,
        keyPoints: [
          'Workflow: satu file YAML = satu workflow',
          'Trigger (on): event yang memicu workflow (push, pull_request, schedule)',
          'Job: kumpulan steps yang berjalan di satu runner',
          'Step: satu perintah atau action yang dijalankan',
          'Runner: mesin virtual tempat job berjalan (ubuntu-latest, windows, macos)',
          'Action: reusable step dari GitHub Marketplace (actions/checkout, etc.)',
          'Secret: variabel sensitif yang disimpan aman di GitHub Settings',
        ],
        example: `name: Playwright E2E Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium
        
      - name: Run Playwright tests
        run: npx playwright test
        
      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/`,
      },
      {
        id: 'gha-matrix',
        title: 'Matrix Strategy (Multi-browser)',
        content: `Matrix strategy memungkinkan menjalankan job yang sama dengan konfigurasi berbeda secara paralel. Untuk QA, ini sangat berguna untuk cross-browser testing.`,
        keyPoints: [
          'Matrix mengalikan kombinasi variabel menjadi beberapa jobs paralel',
          'Ideal untuk cross-browser: chromium, firefox, webkit sekaligus',
          'Bisa kombinasikan multiple dimensions: browser × OS × node version',
          'fail-fast: false memastikan semua kombinasi tetap berjalan meski satu gagal',
        ],
        example: `jobs:
  test:
    strategy:
      fail-fast: false
      matrix:
        browser: [chromium, firefox, webkit]
        os: [ubuntu-latest, windows-latest]
    
    runs-on: \${{ matrix.os }}
    
    steps:
      - name: Run tests on \${{ matrix.browser }}
        run: npx playwright test --project=\${{ matrix.browser }}`,
      },
    ],
  },
  {
    id: 'playwright-pipeline',
    title: 'Pipeline untuk Playwright',
    icon: <PlaySquare size={16} />,
    lessons: [
      {
        id: 'playwright-full',
        title: 'Pipeline Playwright Lengkap',
        content: `Pipeline Playwright yang baik harus mencakup: install browser, jalankan tests, upload artifact laporan, dan publish Allure report. Ini adalah pipeline yang biasa digunakan di tim QA profesional.`,
        keyPoints: [
          'Selalu gunakan npm ci (bukan npm install) di CI untuk reproducible build',
          'Cache node_modules dan browsers untuk mempercepat pipeline',
          'if: always() pada upload artifact memastikan laporan diupload meski tests gagal',
          'Gunakan sharding untuk parallel execution di banyak runner',
          'Simpan screenshot dan video sebagai artifact untuk debugging',
        ],
        example: `name: E2E Tests with Allure Report

on: [push, pull_request]

jobs:
  e2e-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - run: npm ci
      
      - name: Install Playwright + browsers
        run: npx playwright install --with-deps
        
      - name: Run tests
        run: npx playwright test
        env:
          BASE_URL: \${{ secrets.STAGING_URL }}
          
      - name: Generate Allure report
        if: always()
        run: |
          npm install -g allure-commandline
          allure generate allure-results -o allure-report
          
      - name: Upload Allure report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: allure-report-\${{ github.run_number }}
          path: allure-report/
          retention-days: 30
          
      - name: Upload test videos (on failure)
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: test-videos
          path: test-results/`,
      },
      {
        id: 'debugging-pipeline',
        title: 'Debugging Pipeline yang Gagal',
        content: `Pipeline gagal adalah hal normal. Yang membedakan QA profesional adalah kemampuan mendiagnosis kegagalan dengan cepat dari log dan artifact.`,
        keyPoints: [
          'Baca log dari atas ke bawah — error biasanya ada di bagian akhir step yang gagal',
          'Exit code 1 = command gagal; Exit code 127 = command not found',
          'Download artifact (screenshot, video, trace) untuk lihat apa yang terjadi di UI',
          'Timeout biasanya karena selector salah atau network lambat di CI',
          'Flaky test: gunakan --retries=2 di playwright.config.ts',
          'Environment variable tidak ter-set: cek Secrets di repo settings',
        ],
        example: `# Tips debugging flaky tests:

# 1. Tambahkan retry di playwright.config.ts
export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  reporter: [['allure-playwright'], ['list']],
});

# 2. Lihat trace viewer untuk debug UI step-by-step
npx playwright show-trace trace.zip

# 3. Jalankan ulang hanya tests yang gagal
npx playwright test --last-failed

# 4. Screenshot on failure otomatis
screenshot: 'only-on-failure',
video: 'retain-on-failure',`,
      },
    ],
  },
];

// ─── Pipeline Templates ───────────────────────────────────────────────────────

export const PIPELINE_TEMPLATES = {
  'github-actions': {
    label: 'GitHub Actions',
    icon: '🐙',
    playwright: `name: {name}

on:
  push:
    branches: [{branch}]
  pull_request:
    branches: [{branch}]

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: {timeout}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '{nodeVersion}'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps {browsers}

      - name: Run Playwright tests
        run: npx playwright test{retries}
        env:
          BASE_URL: \${{ secrets.BASE_URL }}
          CI: true
{artifactStep}{notifyStep}`,
  },
  'gitlab-ci': {
    label: 'GitLab CI',
    icon: '🦊',
    playwright: `image: mcr.microsoft.com/playwright:{nodeVersion}-jammy

stages:
  - test
  - report

variables:
  npm_config_cache: "\$CI_PROJECT_DIR/.npm"

cache:
  key: \$CI_COMMIT_REF_SLUG
  paths:
    - .npm/
    - node_modules/

playwright-test:
  stage: test
  script:
    - npm ci
    - npx playwright install --with-deps {browsers}
    - npx playwright test{retries}
  artifacts:
    when: always
    paths:
      - playwright-report/
      - allure-results/
    expire_in: 30 days
  only:
    - {branch}
    - merge_requests`,
  },
  'jenkins': {
    label: 'Jenkins',
    icon: '⚙️',
    playwright: `pipeline {{
    agent any
    
    tools {{
        nodejs '{nodeVersion}'
    }}
    
    environment {{
        BASE_URL = credentials('base-url')
        CI = 'true'
    }}
    
    stages {{
        stage('Checkout') {{
            steps {{
                checkout scm
            }}
        }}
        
        stage('Install') {{
            steps {{
                sh 'npm ci'
                sh 'npx playwright install --with-deps {browsers}'
            }}
        }}
        
        stage('Test') {{
            steps {{
                sh 'npx playwright test{retries}'
            }}
            post {{
                always {{
                    publishHTML([
                        allowMissing: false,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Report'
                    ])
                }}
            }}
        }}
    }}
}}`,
  },
};

// ─── Failure Scenarios untuk Failure Analyzer ─────────────────────────────────

export const FAILURE_SCENARIOS = [
  {
    id: 'missing-env',
    title: 'Login Test Gagal di CI',
    difficulty: 'easy',
    log: `Run npx playwright test
[chromium] › tests/login.spec.ts:12:5 › Login › should login with valid credentials

  Error: page.fill: Error: strict mode violation: locator('#email') resolved to 2 elements
    at tests/login.spec.ts:14
    
  1 failed, 0 passed (8.2s)
  
  Error: Process completed with exit code 1.`,
    options: [
      'Selector "#email" tidak unik — ada 2 elemen yang match',
      'Email yang digunakan salah',
      'Browser tidak terinstall',
      'Node.js version terlalu lama',
    ],
    answer: 0,
    explanation: 'Error "strict mode violation: resolved to 2 elements" artinya selector #email menemukan lebih dari satu elemen di halaman. Playwright strict mode (default) menolak ini. Fix: gunakan selector yang lebih spesifik seperti input[name="email"] atau tambahkan .first().',
    fix: `// Sebelum (ambigu):
await page.fill('#email', email);

// Sesudah (spesifik):
await page.fill('form#login-form input[name="email"]', email);
// atau
await page.locator('#email').first().fill(email);`,
  },
  {
    id: 'timeout',
    title: 'Checkout Test Timeout di CI',
    difficulty: 'medium',
    log: `Run npx playwright test tests/checkout.spec.ts
[chromium] › tests/checkout.spec.ts:45:7 › Checkout › should complete payment

  TimeoutError: page.waitForSelector: Timeout 30000ms exceeded.
  =========================== logs ===========================
  waiting for locator('.payment-success-modal')
  ============================================================

  FAILED tests/checkout.spec.ts › Checkout › should complete payment (34.2s)

  Error: Process completed with exit code 1.`,
    options: [
      'Test berjalan terlalu lama dari batas waktu timeout',
      'Modal .payment-success-modal tidak muncul karena payment gateway lambat atau gagal di environment CI',
      'Browser crash',
      'Network tidak ada di CI',
    ],
    answer: 1,
    explanation: 'Timeout terjadi karena elemen yang ditunggu (.payment-success-modal) tidak pernah muncul dalam 30 detik. Penyebab paling umum: payment gateway di environment CI belum dikonfigurasi atau menggunakan credential yang salah. Cek environment variable BASE_URL dan payment API key di CI secrets.',
    fix: `// 1. Pastikan environment variable ter-set di CI:
// GitHub Actions:
env:
  PAYMENT_API_KEY: \${{ secrets.PAYMENT_API_KEY_STAGING }}

// 2. Mock payment gateway di tests CI:
// playwright.config.ts
use: {
  // Override untuk CI
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
}

// 3. Atau gunakan mock untuk payment di test:
await page.route('**/api/payment', route => {
  route.fulfill({ status: 200, body: JSON.stringify({ status: 'success' }) });
});`,
  },
  {
    id: 'missing-secret',
    title: 'API Test Gagal dengan 401',
    difficulty: 'medium',
    log: `Run npx playwright test tests/api.spec.ts

  Error: expect(received).toBe(expected)
  Expected: 200
  Received: 401

  Call log:
  - GET https://api.staging.example.com/users → 401 Unauthorized
  
  Response body: {"error": "Missing or invalid Authorization header"}
  
  1 failed (3.1s)
  Error: Process completed with exit code 1.`,
    options: [
      'User tidak memiliki akses ke endpoint /users',
      'Secret API_TOKEN tidak di-set di GitHub Actions secrets, sehingga env variable kosong',
      'Endpoint /users sudah dihapus',
      'Staging server sedang down',
    ],
    answer: 1,
    explanation: 'Response 401 dengan pesan "Missing Authorization header" adalah tanda jelas bahwa token tidak terkirim. Di CI, ini hampir selalu berarti secret belum di-set atau nama variable tidak cocok. Cek: Settings → Secrets → Actions di repository GitHub.',
    fix: `# Di GitHub repository:
# Settings → Secrets and variables → Actions → New repository secret
# Nama: API_TOKEN
# Value: <token_staging_kamu>

# Di workflow YAML:
- name: Run API tests
  run: npx playwright test tests/api.spec.ts
  env:
    API_TOKEN: \${{ secrets.API_TOKEN }}
    
# Di test file:
const token = process.env.API_TOKEN;
const response = await request.get('/users', {
  headers: { 'Authorization': \`Bearer \${token}\` }
});`,
  },
  {
    id: 'flaky-animation',
    title: 'Test Intermittent Gagal (Flaky)',
    difficulty: 'hard',
    log: `Run npx playwright test (attempt 1/3)
[chromium] › tests/dashboard.spec.ts:89 › Dashboard › should show chart data

  Error: expect(received).toHaveText(expected)
  Expected string: "1,234"
  Received string: ""
  
  Element: <span class="chart-value">

(attempt 2/3 - PASSED)
(attempt 3/3 - PASSED)

1 flaky (2 passed after retry)`,
    options: [
      'Data chart memang tidak ada',
      'Race condition: chart data di-render asynchronously dan test tidak menunggu data selesai loading',
      'Font tidak ter-load sehingga teks tidak terlihat',
      'Test berjalan di resolusi yang salah',
    ],
    answer: 1,
    explanation: 'Flaky test yang kadang gagal kadang berhasil adalah tanda race condition. Chart merender loading state dulu, lalu fetch data async. Test langsung cek value sebelum data datang. Fix: waitFor kondisi spesifik bahwa chart sudah selesai render, bukan hanya selector-nya ada.',
    fix: `// Sebelum (race condition):
await expect(page.locator('.chart-value')).toHaveText('1,234');

// Sesudah (tunggu loading selesai):
// Tunggu elemen tidak dalam loading state
await page.waitForSelector('.chart-value:not(.loading)');
await expect(page.locator('.chart-value')).toHaveText('1,234');

// Atau tunggu network idle
await page.waitForLoadState('networkidle');
await expect(page.locator('.chart-value')).toHaveText('1,234');

// playwright.config.ts - aktifkan retry untuk flaky tests:
retries: process.env.CI ? 2 : 0,`,
  },
];
