import React, { useState } from 'react';

// ─── Tutorial data per menu ───────────────────────────────────────────────────
const TUTORIALS = {
  dashboard: {
    title: 'Dashboard',
    icon: '📊',
    desc: 'Ringkasan semua project dan statistik test case.',
    steps: [
      { step: '1', text: 'Buat project baru dengan klik tombol "+" di sidebar bawah "PROJECTS".' },
      { step: '2', text: 'Klik nama project untuk membuka daftar test case project tersebut.' },
      { step: '3', text: 'Dashboard menampilkan total TC, distribusi status, dan riwayat perubahan status terbaru.' },
    ],
    tips: ['Gunakan tombol edit ✏️ di project untuk ubah nama atau deskripsi.', 'Data tersimpan lokal di mesinmu — tidak perlu internet.'],
  },
  testcases: {
    title: 'Test Cases',
    icon: '📋',
    desc: 'Kelola semua test case per project.',
    steps: [
      { step: '1', text: 'Pilih project di sidebar, lalu klik "+ Tambah TC" untuk buat test case baru.' },
      { step: '2', text: 'Isi kolom No, Title, Module, Section, Scenario (langkah), dan Expected Result.' },
      { step: '3', text: 'Ubah status TC langsung dari dropdown di tabel (Pending/Pass/Fail/Skip/Blocked).' },
      { step: '4', text: 'TC yang Fail bisa langsung dibuat Bug Report dengan klik ikon 🐛.' },
      { step: '5', text: 'Gunakan "🤖 AI Generate TC" untuk generate test case otomatis via OpenAI atau Gemini.' },
      { step: '6', text: 'Gunakan "🎭 Generate Playwright" untuk convert TC ke script .spec.ts otomatis.' },
    ],
    tips: ['Import CSV dari template untuk bulk upload.', 'Export ke Allure JSON untuk integrasi dengan Allure Report.', 'Tab Design & PRD di header untuk simpan link Figma dan PRD per project.'],
  },
  bugreports: {
    title: 'Bug Reports',
    icon: '🐛',
    desc: 'Manajemen bug report dengan integrasi Plane.',
    steps: [
      { step: '1', text: 'Klik "+ Tambah Bug" untuk buat bug report baru. Isi title, severity, priority, dan langkah reproduksi.' },
      { step: '2', text: 'Setup Plane integration via tombol "⚙️ Plane" — isi API Key, Workspace Slug, dan Base URL.' },
      { step: '3', text: 'Transfer bug ke Plane dengan klik ✈️ di setiap baris, atau bulk transfer beberapa bug sekaligus.' },
      { step: '4', text: 'Kolom "Plane Status" auto-sync setiap 60 detik. Klik 🔄 untuk sync manual.' },
      { step: '5', text: 'Bug dengan status "Ready to Release" di Plane akan muncul di panel hijau — klik Broadcast untuk notif Google Chat.' },
    ],
    tips: ['Import dari Plane CSV export untuk sinkronisasi data awal.', 'Kolom Tipe (FE/BE/CI-CD) terisi otomatis berdasarkan analisis deskripsi bug.'],
  },
  sqllab: {
    title: 'SQL Lab',
    icon: '🗄️',
    desc: 'Latihan query SQL dengan database in-memory.',
    steps: [
      { step: '1', text: 'Pilih schema: HR, E-Commerce, atau Banking dari dropdown di atas.' },
      { step: '2', text: 'Ketik query SQL di editor dan klik "▶ Run" atau tekan Ctrl+Enter.' },
      { step: '3', text: 'Lihat hasil query di tabel bawah dengan info jumlah row dan waktu eksekusi.' },
      { step: '4', text: 'Coba tab "Challenges" untuk latihan SQL dengan soal bertingkat Easy → Expert.' },
    ],
    tips: ['Data di-reset setiap sesi — tidak tersimpan permanen.', 'Semua operasi SQL (SELECT, JOIN, GROUP BY, dll) didukung.'],
  },
  securitylab: {
    title: 'Security Lab',
    icon: '🔒',
    desc: 'Materi dan simulasi OWASP Top 10 untuk QA.',
    steps: [
      { step: '1', text: 'Baca materi di tab "Learning" untuk memahami konsep keamanan.' },
      { step: '2', text: 'Gunakan tab "Simulator" untuk coba skenario SQL Injection, XSS, CSRF, dll.' },
      { step: '3', text: 'Tab "Checklist" berisi daftar security test yang harus dilakukan QA.' },
    ],
    tips: ['Semua simulasi berjalan lokal — aman dan tidak menyerang server nyata.', 'Gunakan materi ini sebagai referensi saat menulis test case security.'],
  },
  performancelab: {
    title: 'Performance Lab',
    icon: '📊',
    desc: 'Tools dan materi performance testing.',
    steps: [
      { step: '1', text: 'Tab "Metrics" — pelajari metrik performa: LCP, FID, CLS, TTFB.' },
      { step: '2', text: 'Tab "Calculator" — hitung latency dan throughput berdasarkan target SLA.' },
      { step: '3', text: 'Tab "Checklist" — daftar item yang harus dicek saat performance testing.' },
      { step: '4', text: 'Tab "Load Test" — panduan cara setup load test dengan k6 atau JMeter.' },
    ],
    tips: ['Gunakan sebagai referensi saat mendefinisikan acceptance criteria performa.'],
  },
  cicdlab: {
    title: 'CI/CD Lab',
    icon: '⚙️',
    desc: 'Pipeline builder, simulator, dan tools CI/CD.',
    steps: [
      { step: '1', text: '📚 Academy — baca materi tentang GitHub Actions, GitLab CI, Jenkins.' },
      { step: '2', text: '⚙️ Pipeline Builder — pilih platform, konfigurasi, klik "Generate YAML".' },
      { step: '3', text: '▶️ Runner — simulasikan jalannya pipeline dengan animasi step-by-step.' },
      { step: '4', text: '🛡️ Readiness Gate — cek versi FE/BE/BFF sebelum trigger test, dengan retry otomatis.' },
      { step: '5', text: '🚀 Trigger & Classify — trigger GitHub Actions/GitLab/Jenkins langsung dari app.' },
    ],
    tips: ['Readiness Gate perlu endpoint /health atau /version di setiap service.', 'YAML yang di-generate bisa langsung di-copy ke repo.'],
  },
  apilab: {
    title: 'API Lab',
    icon: '🔌',
    desc: 'HTTP request builder dan API testing tools.',
    steps: [
      { step: '1', text: '🔧 Manual Testing — ketik URL, pilih method, set headers/body, klik Send.' },
      { step: '2', text: 'Tambahkan assertions (status code, JSON path, header) sebelum Send untuk validasi otomatis.' },
      { step: '3', text: '📁 Collections — simpan request ke collection dengan klik "💾 Save".' },
      { step: '4', text: 'Import Postman Collection v2.0/v2.1 via tombol "📬 Import".' },
      { step: '5', text: '🌐 Environments — set variabel seperti {{BASE_URL}} untuk dipakai di URL dan body.' },
      { step: '6', text: '📋 OpenAPI Import — paste Swagger/OpenAPI JSON untuk browse semua endpoint.' },
    ],
    tips: ['Gunakan {{variableName}} di URL dan body untuk inject nilai dari Environment.', '"🤖 Generate" menghasilkan Playwright API test dari request yang aktif.'],
  },
  automationlab: {
    title: 'Automation Lab',
    icon: '🤖',
    desc: 'Playwright automation project manager.',
    steps: [
      { step: '1', text: 'Klik "+ New Project" untuk buat project Playwright baru — otomatis install dependencies.' },
      { step: '2', text: '🔴 Recorder — klik "Start Recording", browser terbuka, lakukan aksi, tutup browser.' },
      { step: '3', text: '📝 Script Editor — edit file .spec.ts langsung di app, Ctrl+S untuk save.' },
      { step: '4', text: '▶️ Execution — pilih mode (Headless/Headed/Debug), pilih file, klik Run.' },
      { step: '5', text: '🔥 Failure Center — lihat screenshot dan video dari test yang gagal.' },
      { step: '6', text: '🤖 AI Generator — generate Playwright script dari requirement atau URL.' },
    ],
    tips: ['Project tersimpan di ~/DiyahQA-Projects/ di mesinmu.', 'Gunakan tab "Settings" untuk set OpenAI API key untuk AI Generator yang lebih cerdas.'],
  },
  environments: {
    title: 'Environment Manager',
    icon: '🌐',
    desc: 'Kelola URL dan credentials per environment.',
    steps: [
      { step: '1', text: 'Klik "+ New Environment", isi nama (Staging/UAT/Production) dan Base URL.' },
      { step: '2', text: 'Klik environment di list kiri untuk membuka detail variabel.' },
      { step: '3', text: 'Klik "+ Add Variable" untuk tambah variabel (API token, password, dll) — tersimpan terenkripsi.' },
      { step: '4', text: 'Di API Lab, gunakan nama variabel dengan {{NAMA_VAR}} di URL atau body.' },
    ],
    tips: ['Semua credentials dienkripsi AES-256 — aman disimpan.', 'Gunakan untuk membedakan URL staging vs production.'],
  },
  testplans: {
    title: 'Test Plans',
    icon: '📅',
    desc: 'Buat dan jalankan test plan dari test case yang ada.',
    steps: [
      { step: '1', text: 'Klik "+ New Test Plan", beri nama dan pilih test case yang akan dijalankan.' },
      { step: '2', text: 'Klik "Start" untuk mulai eksekusi, lalu update status setiap TC (Pass/Fail/Skip).' },
      { step: '3', text: 'Progress bar menampilkan persentase TC yang sudah dieksekusi.' },
      { step: '4', text: 'Klik "Complete" setelah semua TC selesai dieksekusi.' },
    ],
    tips: ['Test plan bisa dipakai untuk sprint testing atau regression testing.', 'Hasil tersimpan dan bisa dilihat kembali kapan saja.'],
  },
  requirements: {
    title: 'Requirements',
    icon: '📝',
    desc: 'Kelola requirements dan traceability matrix.',
    steps: [
      { step: '1', text: 'Klik "+ Add Requirement" untuk tambah requirement baru dengan kode dan title.' },
      { step: '2', text: 'Link test case ke requirement dengan klik "Link TC" di detail requirement.' },
      { step: '3', text: 'Tab "Traceability Matrix" — lihat coverage setiap requirement oleh test case.' },
    ],
    tips: ['Coverage hijau = semua TC linked pass. Merah = ada TC fail atau belum ada TC.', 'Gunakan untuk bukti bahwa semua requirement sudah ter-cover test case.'],
  },
  tclibrary: {
    title: 'TC Library',
    icon: '📚',
    desc: 'Template test case reusable lintas project.',
    steps: [
      { step: '1', text: 'Klik "+ Add to Library" untuk simpan test case ke library sebagai template.' },
      { step: '2', text: 'Beri tag untuk memudahkan pencarian (login, form, api, dll).' },
      { step: '3', text: 'Dari halaman Test Cases, klik "Import from Library" untuk reuse template.' },
    ],
    tips: ['Bagus untuk test case yang sering dipakai ulang seperti login, logout, validasi form.', 'Usage count menunjukkan berapa kali template dipakai.'],
  },
  doclab: {
    title: 'Doc Lab',
    icon: '📄',
    desc: 'Documentation editor dengan version history.',
    steps: [
      { step: '1', text: 'Klik "+ New Document" untuk buat dokumen baru — pilih kategori (general, test-plan, dll).' },
      { step: '2', text: 'Edit konten di editor markdown-like, klik "Save" untuk simpan.' },
      { step: '3', text: 'Setiap save otomatis membuat versi baru — klik "Versions" untuk lihat history.' },
      { step: '4', text: 'Gunakan search bar untuk cari dokumen berdasarkan judul atau isi.' },
    ],
    tips: ['Cocok untuk simpan test strategy, test summary report, atau panduan internal.', 'Tag dokumen untuk memudahkan filter.'],
  },
  designprd: {
    title: 'Design & PRD',
    icon: '📐',
    desc: 'Simpan link Figma dan PRD per fitur di project.',
    steps: [
      { step: '1', text: 'Klik "+ Tambah Link" untuk tambah referensi baru.' },
      { step: '2', text: 'Isi Label (nama fitur), Link PRD (URL issue Plane dari browser), dan Link Figma.' },
      { step: '3', text: 'Klik "💾 Simpan" — link langsung tampil sebagai card.' },
      { step: '4', text: 'Klik "👁️ Preview" untuk embed Figma fullscreen di dalam app.' },
      { step: '5', text: 'Klik link PRD 🔗 untuk buka issue Plane langsung di browser.' },
    ],
    tips: ['File Figma harus di-set "Anyone with the link can view" agar bisa di-preview.', 'Data tersimpan per project — tidak akan hilang saat app restart.'],
  },
};

// ─── Tutorial Panel Component ─────────────────────────────────────────────────
export default function TutorialPanel({ menuKey }) {
  const [open, setOpen] = useState(false);
  const tutorial = TUTORIALS[menuKey];
  if (!tutorial) return null;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        title="Cara pakai fitur ini"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '3px 10px', borderRadius: 20, border: '1px solid var(--border)',
          background: 'var(--bg-secondary)', color: 'var(--text-muted)',
          fontSize: 11, cursor: 'pointer', fontWeight: 500, flexShrink: 0,
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.color = '#818cf8'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
      >
        ❓ Cara Pakai
      </button>

      {/* Panel overlay */}
      {open && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={e => e.target === e.currentTarget && setOpen(false)}
        >
          <div style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 28, maxWidth: 520, width: '100%', maxHeight: '85vh', overflowY: 'auto', border: '1px solid var(--border)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 32, flexShrink: 0 }}>{tutorial.icon}</span>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {tutorial.title}
                </h2>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '4px 0 0' }}>
                  {tutorial.desc}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: 'var(--text-muted)', flexShrink: 0, padding: 2 }}
              >✕</button>
            </div>

            {/* Steps */}
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
              📋 Langkah-langkah
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {tutorial.steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', background: 'rgba(99,102,241,0.15)',
                    color: '#818cf8', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0, marginTop: 1,
                  }}>
                    {s.step}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                    {s.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Tips */}
            {tutorial.tips?.length > 0 && (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                  💡 Tips
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {tutorial.tips.map((tip, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 8, padding: '8px 12px',
                      background: 'rgba(245,158,11,0.06)', borderLeft: '3px solid #f59e0b',
                      borderRadius: '0 8px 8px 0', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5,
                    }}>
                      <span style={{ flexShrink: 0 }}>→</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <button
              onClick={() => setOpen(false)}
              className="btn btn-primary"
              style={{ marginTop: 20, width: '100%' }}
            >
              ✅ Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}
