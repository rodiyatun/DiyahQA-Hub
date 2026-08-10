# 🔍 DiyahQA Hub

**QA Tools all-in-one** — Test Case Management, Bug Reports, API Lab, Automation Lab, CI/CD Lab, dan banyak lagi. Dibangun dengan Electron, berjalan offline di macOS dan Windows.

---

## 📥 Download & Install

### macOS
1. Download **`DiyahQA-Hub-x.x.x-arm64.dmg`** dari [Releases](https://github.com/rodiyatun/DiyahQA-Hub/releases/latest)
2. Buka file `.dmg` → drag **DiyahQA Hub** ke folder Applications
3. Pertama kali buka: klik kanan → **Open** → Open (bypass Gatekeeper)

### Windows
1. Download **`DiyahQA-Hub-Setup-x.x.x.exe`** dari [Releases](https://github.com/rodiyatun/DiyahQA-Hub/releases/latest)
2. Jalankan installer → ikuti wizard → klik Finish
3. Buka dari Start Menu atau Desktop shortcut

> Tidak perlu install Node.js, Python, atau dependencies lain. Semua sudah terbundle.

---

## ✨ Fitur Utama

### 📋 Test Case Management
- Buat, edit, filter, dan export test case per project
- Import dari CSV dan Allure JSON
- Status tracking: Pending / Pass / Fail / Skip / Blocked
- **🤖 AI Generate TC** — generate test case otomatis via OpenAI atau Gemini
- **🎭 Generate Playwright** — convert TC manual jadi `.spec.ts` otomatis

### � Bug Report
- Manajemen bug report lengkap (severity, priority, status)
- **Auto klasifikasi FE/BE/CI-CD** dari judul dan deskripsi bug
- Transfer ke **Plane** project management (single & bulk)
- Notifikasi **Google Chat** saat bug ditransfer
- Import dari CSV dan Plane export

### � API Lab
- HTTP request builder (seperti Postman)
- **Import Postman Collection** v2.0 & v2.1
- Assertion builder (status, body, JSON path, header, duration)
- Environment variables dengan placeholder `{{variable}}`
- Generate Playwright API test suite otomatis
- OpenAPI / Swagger importer

### 🤖 Automation Lab
- Playwright project manager (`~/DiyahQA-Projects/`)
- Script editor, recorder (codegen), execution runner
- AI Generator: rule-based + OpenAI
- Failure Center, Locator Inspector, Allure Report

### ⚙️ CI/CD Lab
- Pipeline builder (GitHub Actions, GitLab CI, Jenkins)
- Pipeline simulator & visualizer
- YAML validator
- **🛡️ Deployment Readiness Gate** — polling versi FE/BE/BFF sebelum test, auto retry, notif Google Chat
- **🚀 Trigger Pipeline** — trigger GitHub Actions, GitLab, Jenkins, atau webhook custom

### 🗄️ SQL Lab
- SQL editor dengan 3 schema (HR, E-commerce, Banking)
- Tantangan SQL bertingkat (Easy → Expert)

### 🔒 Security Lab
- Materi OWASP Top 10 + ASVS
- SQL Injection, XSS, CSRF, Auth bypass simulator

### 📊 Performance Lab
- Checklist performa, latency calculator, load testing guide

### � Environment Manager
- Kelola environment (Staging, UAT, Production) per project
- Variabel terenkripsi AES-256

### 📁 TC Library, Test Plans, Requirements, Doc Lab
- Reusable test case library
- Test run execution dengan tracking status
- Traceability matrix (Requirement → TC)
- Documentation editor dengan version history

---

## 🔐 Keamanan Data

Semua data disimpan **lokal di mesin kamu**:
- Database SQLite: `~/Library/Application Support/testcase-management/` (Mac) atau `%APPDATA%\testcase-management\` (Windows)
- Credentials (password, API key, env variables) dienkripsi **AES-256-CBC**
- Tidak ada data yang dikirim ke server eksternal (kecuali integrasi Plane/Google Chat yang kamu konfigurasi sendiri)

---

## 🛠️ Untuk Developer

### Requirement
- Node.js 20+
- npm

### Setup & Run
```bash
git clone https://github.com/rodiyatun/DiyahQA-Hub.git
cd DiyahQA-Hub
npm install
npm run dev          # development mode (React + Electron)
```

### Build
```bash
npm run package      # build untuk OS saat ini (Mac/Windows/Linux)
```

### Build via GitHub Actions
Push tag untuk trigger auto-build Mac + Windows:
```bash
git tag v1.0.1
git push origin v1.0.1
```

---

## 🧰 Tech Stack

| Layer | Tech |
|---|---|
| UI | React 18, Recharts |
| Desktop | Electron 29 |
| Database | sql.js (SQLite in-memory + file) |
| Automation | Playwright |
| Build | electron-builder, react-scripts |
| CI/CD | GitHub Actions |

---

## 📄 Lisensi

MIT License — bebas digunakan dan dimodifikasi.

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/rodiyatun">rodiyatun</a>
</div>
