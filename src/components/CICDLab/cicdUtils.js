// ─── Pipeline Generator ───────────────────────────────────────────────────────

export function generatePipeline(config) {
  const {
    platform, name, branch, nodeVersion, browsers,
    retries, uploadArtifact, notifySlack, timeout,
  } = config;

  const browsersStr = (browsers || ['chromium']).join(' ');
  const retriesStr = retries ? ` --retries=${retries}` : '';
  const nodeVer = nodeVersion || '20';
  const branchVal = branch || 'main';
  const timeoutVal = timeout || 30;
  const nameVal = name || 'Playwright E2E Tests';

  const artifactStep = uploadArtifact ? `
      - name: Upload Playwright Report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30` : '';

  const notifyStep = notifySlack ? `
      - name: Notify Slack on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          channel-id: 'qa-alerts'
          slack-message: '❌ Pipeline \${{ github.workflow }} gagal di \${{ github.ref }}'
        env:
          SLACK_BOT_TOKEN: \${{ secrets.SLACK_BOT_TOKEN }}` : '';

  if (platform === 'github-actions') {
    return `name: ${nameVal}

on:
  push:
    branches: [${branchVal}]
  pull_request:
    branches: [${branchVal}]

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: ${timeoutVal}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '${nodeVer}'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps ${browsersStr}

      - name: Run Playwright tests
        run: npx playwright test${retriesStr}
        env:
          BASE_URL: \${{ secrets.BASE_URL }}
          CI: true
${artifactStep}${notifyStep}
`;
  }

  if (platform === 'gitlab-ci') {
    return `image: mcr.microsoft.com/playwright:v1.44.0-jammy

stages:
  - test

variables:
  npm_config_cache: "$CI_PROJECT_DIR/.npm"

cache:
  key: $CI_COMMIT_REF_SLUG
  paths:
    - .npm/
    - node_modules/

playwright-test:
  stage: test
  script:
    - npm ci
    - npx playwright install --with-deps ${browsersStr}
    - npx playwright test${retriesStr}
  artifacts:
    when: always
    paths:
      - playwright-report/
    expire_in: 30 days
  only:
    - ${branchVal}
    - merge_requests
`;
  }

  if (platform === 'jenkins') {
    return `pipeline {
    agent { label 'nodejs' }

    environment {
        CI = 'true'
        BASE_URL = credentials('base-url-staging')
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps ${browsersStr}'
            }
        }

        stage('E2E Test') {
            steps {
                sh 'npx playwright test${retriesStr}'
            }
            post {
                always {
                    publishHTML(target: [
                        allowMissing: false,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Report'
                    ])
                }
            }
        }
    }

    post {
        failure {
            echo 'Pipeline gagal! Cek laporan Playwright.'
        }
    }
}
`;
  }

  return '# Platform tidak didukung';
}

// ─── YAML Validator ───────────────────────────────────────────────────────────

export function validateGithubActionsYAML(yamlText) {
  const issues = [];
  const lines = yamlText.split('\n');

  // Check 'on' trigger
  if (!yamlText.includes('\non:') && !yamlText.startsWith('on:')) {
    issues.push({ level: 'error', line: null, message: 'Missing "on:" trigger — pipeline tidak akan pernah berjalan.' });
  }

  // Check jobs
  if (!yamlText.includes('jobs:')) {
    issues.push({ level: 'error', line: null, message: 'Missing "jobs:" — pipeline butuh minimal satu job.' });
  }

  // Check runs-on
  if (!yamlText.includes('runs-on:')) {
    issues.push({ level: 'error', line: null, message: 'Missing "runs-on:" — setiap job harus menentukan runner.' });
  }

  // Check steps
  if (!yamlText.includes('steps:')) {
    issues.push({ level: 'error', line: null, message: 'Missing "steps:" — job tidak memiliki langkah yang dijalankan.' });
  }

  // Check indentation issues
  lines.forEach((line, idx) => {
    if (line.includes('\t')) {
      issues.push({ level: 'error', line: idx + 1, message: `Baris ${idx + 1}: Gunakan spasi, bukan tab. YAML tidak mengizinkan tab.` });
    }
  });

  // Check uses without @version
  const usesLines = lines.filter(l => l.trim().startsWith('uses:'));
  usesLines.forEach(l => {
    const action = l.replace('uses:', '').trim();
    if (!action.includes('@')) {
      issues.push({ level: 'warn', line: null, message: `Action "${action}" tidak memiliki versi (@v4). Gunakan versi spesifik untuk reproducibility.` });
    }
    if (action.includes('@main') || action.includes('@master')) {
      issues.push({ level: 'warn', line: null, message: `Action "${action}" menggunakan @main/@master — tidak stabil. Gunakan tag versi spesifik seperti @v4.` });
    }
  });

  // Check npm install vs npm ci
  if (yamlText.includes('npm install') && !yamlText.includes('npm ci')) {
    issues.push({ level: 'warn', line: null, message: 'Gunakan "npm ci" (bukan "npm install") di CI untuk reproducible install.' });
  }

  // Check missing artifact upload if playwright mentioned
  if (yamlText.toLowerCase().includes('playwright') && !yamlText.includes('upload-artifact')) {
    issues.push({ level: 'warn', line: null, message: 'Playwright test terdeteksi tapi tidak ada "upload-artifact" — laporan test tidak akan tersimpan.' });
  }

  // Check if: always() on artifact
  if (yamlText.includes('upload-artifact') && !yamlText.includes('if: always()')) {
    issues.push({ level: 'warn', line: null, message: 'Tambahkan "if: always()" pada step upload-artifact agar laporan diupload meski tests gagal.' });
  }

  if (issues.length === 0) {
    issues.push({ level: 'pass', line: null, message: 'Tidak ada masalah terdeteksi. Pipeline terlihat valid!' });
  }

  return issues;
}

// ─── Pipeline Simulator ───────────────────────────────────────────────────────

export function buildPipelineSteps(config) {
  const browsers = config.browsers || ['chromium'];
  return [
    { id: 'checkout', name: '📥 Checkout', duration: 800,  status: 'pending', log: 'Cloning repository...\nChecked out commit abc1234\nRepository cloned successfully' },
    { id: 'setup',    name: '🔧 Setup Node',  duration: 1200, status: 'pending', log: `Downloading Node.js ${config.nodeVersion || 20}...\nInstalled Node.js v${config.nodeVersion || 20}.0.0\nnpm version 10.0.0` },
    { id: 'install',  name: '📦 npm ci',      duration: 2500, status: 'pending', log: 'npm warn idealTree:...\nadded 1024 packages in 2.4s\nnode_modules installed successfully' },
    { id: 'browsers', name: '🌐 Install Browsers', duration: 3000, status: 'pending', log: `Installing ${browsers.join(', ')}...\nPlaywright browsers downloaded\nBrowsers ready` },
    { id: 'test',     name: '🧪 Run Tests',   duration: 4000, status: 'pending',
      log: `Running Playwright tests...
npx playwright test

  ✓ tests/login.spec.ts (1.2s)
  ✓ tests/dashboard.spec.ts (2.1s)
  ✓ tests/checkout.spec.ts (3.4s)
  ${config.forceFailure ? '✗ tests/payment.spec.ts - TimeoutError: locator not found' : '✓ tests/payment.spec.ts (1.8s)'}

  ${config.forceFailure ? '3 passed, 1 failed' : '4 passed (8.5s)'}`,
      shouldFail: config.forceFailure,
    },
    ...(config.uploadArtifact ? [{
      id: 'upload', name: '📤 Upload Report', duration: 800, status: 'pending',
      log: 'Uploading playwright-report/\nArtifact uploaded: playwright-report (2.4MB)\nArtifact URL: https://github.com/.../actions/runs/...',
    }] : []),
  ];
}
