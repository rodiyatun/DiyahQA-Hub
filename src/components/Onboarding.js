import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  CheckCircle, ArrowRight, ArrowLeft, X,
  FlaskConical, Bug, LayoutDashboard, Users,
  Zap, Shield, Activity, Code2, FolderPlus,
  Sparkles, ChevronRight, FileText, Lock, UserCircle
} from 'lucide-react';
import './Onboarding.css';

const EULA_TEXT = `PERJANJIAN LISENSI PENGGUNA AKHIR (EULA)
DiyahQA Hub — Versi 1.1.2
Berlaku sejak: 15 Agustus 2026

Dengan menggunakan aplikasi ini, Anda menyetujui syarat dan ketentuan berikut:

1. LISENSI PENGGUNAAN
   DiyahQA Hub diberikan lisensi terbatas, non-eksklusif, dan tidak dapat dipindahtangankan kepada Anda untuk digunakan sesuai dengan perjanjian ini.

2. PEMBATASAN
   Anda tidak diperbolehkan untuk: (a) mendistribusikan ulang atau menjual kembali aplikasi, (b) merekayasa balik kode sumber, (c) menghapus pemberitahuan hak cipta.

3. DATA PENGGUNA
   Data yang Anda masukkan ke dalam aplikasi adalah milik Anda. Kami menyimpan data di Supabase Cloud dengan enkripsi standar industri.

4. PEMBARUAN
   Kami berhak memperbarui aplikasi secara berkala. Pembaruan penting akan diberitahukan melalui notifikasi dalam aplikasi.

5. PENGHENTIAN
   Lisensi ini berlaku hingga dihentikan. Lisensi akan berakhir secara otomatis jika Anda melanggar perjanjian ini.

6. PENAFIAN GARANSI
   Aplikasi diberikan "APA ADANYA" tanpa garansi apa pun, tersurat maupun tersirat.

7. BATASAN TANGGUNG JAWAB
   Dalam situasi apa pun, DiyahQA Hub tidak bertanggung jawab atas kerugian tidak langsung atau kerusakan yang timbul dari penggunaan aplikasi.

8. HUKUM YANG BERLAKU
   Perjanjian ini diatur berdasarkan hukum Republik Indonesia.`;

const PP_TEXT = `KEBIJAKAN PRIVASI
DiyahQA Hub — Versi 1.1.2
Berlaku sejak: 15 Agustus 2026

1. INFORMASI YANG KAMI KUMPULKAN
   • Data akun: email, nama, dan role pengguna.
   • Data kerja: project, test case, dan bug report yang Anda buat.
   • Data teknis: log error anonim untuk perbaikan aplikasi.

2. CARA KAMI MENGGUNAKAN DATA
   • Menyediakan layanan aplikasi kepada Anda.
   • Menyinkronkan data antar perangkat via Supabase.
   • Meningkatkan kualitas dan performa aplikasi.

3. BERBAGI DATA
   Kami TIDAK menjual atau menyewakan data pribadi Anda kepada pihak ketiga mana pun.

4. KEAMANAN DATA
   Data Anda dilindungi dengan enkripsi TLS/SSL dan Row Level Security (RLS) di Supabase.

5. HAK ANDA
   Anda berhak untuk: mengakses, memperbarui, mengunduh, atau menghapus data Anda kapan saja.

6. RETENSI DATA
   Data disimpan selama akun Anda aktif. Penghapusan akun akan menghapus semua data Anda dalam 30 hari.

7. HUBUNGI KAMI
   Pertanyaan privasi: support@diyahqa.com`;

const STEPS = [
  {
    id: 'eula',
    title: 'Syarat & Ketentuan',
    subtitle: 'Harap baca dan setujui sebelum melanjutkan.',
    type: 'eula',
  },
  {
    id: 'welcome',
    title: 'Selamat Datang di DiyahQA Hub! 🎉',
    subtitle: 'Platform QA terpadu untuk tim Anda. Mari kita kenalkan fitur-fitur utamanya.',
    illustration: '🔬',
    type: 'welcome',
  },
  {
    id: 'profile',
    title: 'Siapa Anda?',
    subtitle: 'Bantu kami menyesuaikan pengalaman Anda.',
    type: 'profile',
  },
  {
    id: 'features',
    title: 'Apa Saja yang Bisa Dilakukan?',
    subtitle: 'DiyahQA Hub hadir dengan fitur lengkap untuk seluruh siklus QA Anda.',
    type: 'features',
    features: [
      { icon: <LayoutDashboard size={20} />, color: '#6366f1', title: 'Dashboard Analytics', desc: 'Pantau pass rate, bug stats, dan tren kualitas secara real-time.' },
      { icon: <CheckCircle size={20} />, color: '#22c55e', title: 'Test Case Management', desc: 'Buat, kelola, dan update status test case dengan mudah.' },
      { icon: <Bug size={20} />, color: '#ef4444', title: 'Bug Reports', desc: 'Catat, triage, dan tracking bug dari temuan hingga selesai.' },
      { icon: <Zap size={20} />, color: '#f59e0b', title: 'Automation Lab', desc: 'Jalankan skrip Playwright & Selenium langsung dari aplikasi.' },
      { icon: <Activity size={20} />, color: '#06b6d4', title: 'Performance Lab', desc: 'Load testing dengan JMeter & k6 untuk ukur kapasitas sistem.' },
      { icon: <Shield size={20} />, color: '#8b5cf6', title: 'Security Lab', desc: 'Scan kerentanan OWASP dan analisis keamanan API.' },
      { icon: <Code2 size={20} />, color: '#ec4899', title: 'API Lab', desc: 'Testing REST API langsung dengan response viewer.' },
      { icon: <Users size={20} />, color: '#14b8a6', title: 'Teams & Admin', desc: 'Kelola anggota tim dengan role Admin, Editor, atau Viewer.' },
    ]
  },
  {
    id: 'project',
    title: 'Buat Project Pertama Anda',
    subtitle: 'Project adalah wadah untuk menyimpan semua test case dan bug report Anda.',
    type: 'create_project',
  },
  {
    id: 'done',
    title: 'Semua Siap! 🚀',
    subtitle: 'Anda sudah siap menggunakan DiyahQA Hub. Selamat bekerja!',
    type: 'done',
  }
];

const ROLES = [
  { id: 'qa_engineer', label: 'QA Engineer', emoji: '🧪', desc: 'Menjalankan test & melaporkan bug' },
  { id: 'qa_lead', label: 'QA Lead / Manager', emoji: '👑', desc: 'Memimpin tim QA & review laporan' },
  { id: 'developer', label: 'Developer', emoji: '💻', desc: 'Developer yang juga menangani QA' },
  { id: 'project_manager', label: 'Project Manager', emoji: '📋', desc: 'Memonitor kualitas dari dashboard' },
];

export default function Onboarding({ onComplete, onCreateProject }) {
  const [step, setStep] = useState(0);
  const [eulaAccepted, setEulaAccepted] = useState(false);
  const [ppAccepted, setPpAccepted] = useState(false);
  const [showEulaText, setShowEulaText] = useState(false);
  const [showPpText, setShowPpText] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [creating, setCreating] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);
  const [animating, setAnimating] = useState(false);

  const currentStep = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  function goNext() {
    setAnimating(true);
    setTimeout(() => {
      setStep(s => Math.min(s + 1, STEPS.length - 1));
      setAnimating(false);
    }, 200);
  }

  function goPrev() {
    setAnimating(true);
    setTimeout(() => {
      setStep(s => Math.max(s - 1, 0));
      setAnimating(false);
    }, 200);
  }

  async function handleCreateProject() {
    if (!projectName.trim()) return;
    setCreating(true);
    try {
      const { error } = await supabase.from('projects').insert([{
        name: projectName.trim(),
        description: projectDesc.trim()
      }]);
      if (error) throw error;
      setProjectCreated(true);
      if (onCreateProject) onCreateProject();
    } catch (err) {
      alert('Gagal membuat project: ' + err.message);
    } finally {
      setCreating(false);
    }
  }

  function handleFinish() {
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('eula_accepted', 'true');
    localStorage.setItem('user_role', selectedRole);
    if (onComplete) onComplete();
  }

  const canProceedEula = eulaAccepted && ppAccepted;

  return (
    <div className="onboarding-overlay">
      <div className={`onboarding-modal ${animating ? 'fade-out' : 'fade-in'}`}>

        {/* Close Button */}
        {currentStep.type !== 'eula' && (
          <button className="onboarding-close" onClick={handleFinish} title="Lewati onboarding">
            <X size={18} />
          </button>
        )}

        {/* Progress Bar */}
        <div className="onboarding-progress-bar">
          <div
            className="onboarding-progress-fill"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step Counter */}
        <div className="onboarding-step-counter">
          {step + 1} / {STEPS.length}
        </div>

        {/* Progress Dots */}
        <div className="onboarding-progress">
          {STEPS.map((_, i) => (
            <div key={i} className={`onboarding-dot ${i === step ? 'active' : i < step ? 'done' : ''}`} />
          ))}
        </div>

        {/* Content */}
        <div className="onboarding-content">

          {/* EULA STEP */}
          {currentStep.type === 'eula' && (
            <div className="onboarding-eula">
              <div className="ob-eula-header">
                <div className="ob-eula-icon"><FileText size={32} color="#6366f1" /></div>
                <h2>{currentStep.title}</h2>
                <p className="ob-subtitle">{currentStep.subtitle}</p>
              </div>

              <div className="ob-eula-checks">
                {/* EULA */}
                <div className="ob-eula-item">
                  <label className="ob-eula-label">
                    <input
                      type="checkbox"
                      checked={eulaAccepted}
                      onChange={e => setEulaAccepted(e.target.checked)}
                    />
                    <span>
                      Saya setuju dengan{' '}
                      <button className="ob-link" onClick={() => setShowEulaText(v => !v)}>
                        Perjanjian Lisensi Pengguna (EULA)
                      </button>
                    </span>
                  </label>
                  {showEulaText && (
                    <div className="ob-legal-text">
                      <pre>{EULA_TEXT}</pre>
                    </div>
                  )}
                </div>

                {/* Privacy Policy */}
                <div className="ob-eula-item">
                  <label className="ob-eula-label">
                    <input
                      type="checkbox"
                      checked={ppAccepted}
                      onChange={e => setPpAccepted(e.target.checked)}
                    />
                    <span>
                      Saya menyetujui{' '}
                      <button className="ob-link" onClick={() => setShowPpText(v => !v)}>
                        Kebijakan Privasi
                      </button>
                      {' '}termasuk pengolahan data pribadi saya.
                    </span>
                  </label>
                  {showPpText && (
                    <div className="ob-legal-text">
                      <pre>{PP_TEXT}</pre>
                    </div>
                  )}
                </div>
              </div>

              <div className="ob-eula-info">
                <Lock size={13} />
                <span>Data Anda aman. Kami tidak menjual data ke pihak ketiga.</span>
              </div>

              <button
                className="ob-btn-primary"
                onClick={goNext}
                disabled={!canProceedEula}
                style={{ marginTop: 16, width: '100%' }}
              >
                Setuju & Lanjutkan <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* WELCOME */}
          {currentStep.type === 'welcome' && (
            <div className="onboarding-welcome">
              <div className="onboarding-illustration">
                <span>{currentStep.illustration}</span>
                <div className="onboarding-glow" />
              </div>
              <h1>{currentStep.title}</h1>
              <p>{currentStep.subtitle}</p>
              <div className="onboarding-badges">
                <span className="ob-badge"><FlaskConical size={13} /> Desktop App</span>
                <span className="ob-badge"><Sparkles size={13} /> AI Powered</span>
                <span className="ob-badge"><Shield size={13} /> Cloud Sync</span>
              </div>
            </div>
          )}

          {/* PROFILE */}
          {currentStep.type === 'profile' && (
            <div className="onboarding-profile">
              <div className="ob-profile-icon"><UserCircle size={36} color="#6366f1" /></div>
              <h2>{currentStep.title}</h2>
              <p className="ob-subtitle">{currentStep.subtitle}</p>
              <div className="ob-roles-grid">
                {ROLES.map(role => (
                  <button
                    key={role.id}
                    className={`ob-role-card ${selectedRole === role.id ? 'selected' : ''}`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <span className="ob-role-emoji">{role.emoji}</span>
                    <div className="ob-role-label">{role.label}</div>
                    <div className="ob-role-desc">{role.desc}</div>
                    {selectedRole === role.id && <CheckCircle size={16} color="#6366f1" className="ob-role-check" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FEATURES */}
          {currentStep.type === 'features' && (
            <div className="onboarding-features">
              <h2>{currentStep.title}</h2>
              <p className="ob-subtitle">{currentStep.subtitle}</p>
              <div className="ob-features-grid">
                {currentStep.features.map((f, i) => (
                  <div className="ob-feature-card" key={i}>
                    <span className="ob-feature-icon" style={{ background: f.color + '22', color: f.color }}>
                      {f.icon}
                    </span>
                    <div>
                      <div className="ob-feature-title">{f.title}</div>
                      <div className="ob-feature-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CREATE PROJECT */}
          {currentStep.type === 'create_project' && (
            <div className="onboarding-project">
              <div className="ob-project-icon">
                <FolderPlus size={36} color="#6366f1" />
              </div>
              <h2>{currentStep.title}</h2>
              <p className="ob-subtitle">{currentStep.subtitle}</p>

              {projectCreated ? (
                <div className="ob-project-success">
                  <CheckCircle size={40} color="#22c55e" />
                  <h3>Project "{projectName}" berhasil dibuat!</h3>
                  <p>Anda bisa langsung mulai menambahkan test case.</p>
                </div>
              ) : (
                <div className="ob-project-form">
                  <div className="ob-input-group">
                    <label>Nama Project *</label>
                    <input
                      type="text"
                      placeholder="Contoh: Website Tokopedia, Mobile Banking App"
                      value={projectName}
                      onChange={e => setProjectName(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="ob-input-group">
                    <label>Deskripsi (opsional)</label>
                    <input
                      type="text"
                      placeholder="Deskripsi singkat project Anda..."
                      value={projectDesc}
                      onChange={e => setProjectDesc(e.target.value)}
                    />
                  </div>
                  <button
                    className="ob-btn-primary"
                    onClick={handleCreateProject}
                    disabled={!projectName.trim() || creating}
                  >
                    {creating ? 'Membuat...' : '+ Buat Project Sekarang'}
                  </button>
                  <button className="ob-btn-skip" onClick={goNext}>
                    Lewati, buat nanti
                  </button>
                </div>
              )}
            </div>
          )}

          {/* DONE */}
          {currentStep.type === 'done' && (
            <div className="onboarding-done">
              <div className="ob-done-animation">🚀</div>
              <h1>{currentStep.title}</h1>
              <p>{currentStep.subtitle}</p>
              <div className="ob-checklist">
                <div className="ob-check-item"><CheckCircle size={16} color="#22c55e" /> EULA & Privacy Policy disetujui</div>
                <div className="ob-check-item"><CheckCircle size={16} color="#22c55e" /> Dashboard Analytics</div>
                <div className="ob-check-item"><CheckCircle size={16} color="#22c55e" /> Test Case Management</div>
                <div className="ob-check-item"><CheckCircle size={16} color="#22c55e" /> Bug Reports</div>
                <div className="ob-check-item"><CheckCircle size={16} color="#22c55e" /> Cloud Sync (Supabase)</div>
              </div>
              <button className="ob-btn-primary ob-btn-finish" onClick={handleFinish}>
                Mulai Gunakan DiyahQA Hub <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        {currentStep.type !== 'done' && currentStep.type !== 'create_project' && currentStep.type !== 'eula' && (
          <div className="onboarding-nav">
            {!isFirst && (
              <button className="ob-btn-back" onClick={goPrev}>
                <ArrowLeft size={16} /> Kembali
              </button>
            )}
            <div style={{ flex: 1 }} />
            <button
              className="ob-btn-next"
              onClick={goNext}
              disabled={currentStep.type === 'profile' && !selectedRole}
            >
              {isLast ? 'Selesai' : 'Selanjutnya'} <ArrowRight size={16} />
            </button>
          </div>
        )}

        {currentStep.type === 'create_project' && (
          <div className="onboarding-nav">
            <button className="ob-btn-back" onClick={goPrev}>
              <ArrowLeft size={16} /> Kembali
            </button>
            <div style={{ flex: 1 }} />
            {projectCreated && (
              <button className="ob-btn-next" onClick={goNext}>
                Lanjut <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
