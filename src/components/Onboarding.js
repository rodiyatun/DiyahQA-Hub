import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  CheckCircle, ArrowRight, ArrowLeft, X,
  FlaskConical, Bug, LayoutDashboard, Users,
  Zap, Shield, Activity, Code2, FolderPlus,
  Sparkles, ChevronRight
} from 'lucide-react';
import './Onboarding.css';

const STEPS = [
  {
    id: 'welcome',
    title: 'Selamat Datang di DiyahQA Hub! 🎉',
    subtitle: 'Platform QA terpadu untuk tim Anda. Mari kita kenalkan fitur-fitur utamanya.',
    illustration: '🔬',
    type: 'welcome',
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
    id: 'ai',
    title: 'AI QA Assistant Siap Membantu!',
    subtitle: 'DiyahQA Hub dilengkapi AI Agentic yang bisa membantu pekerjaan QA Anda.',
    type: 'ai_intro',
    tips: [
      { emoji: '🤖', text: 'Ketik "buka bug report" untuk navigasi otomatis' },
      { emoji: '📊', text: 'Minta AI menganalisis tren bug dan prediksi risiko' },
      { emoji: '⚡', text: 'Jadwalkan test otomatis dengan perintah bahasa natural' },
      { emoji: '✍️', text: 'Generate test case dari deskripsi fitur secara otomatis' },
    ]
  },
  {
    id: 'done',
    title: 'Semua Siap! 🚀',
    subtitle: 'Anda sudah siap menggunakan DiyahQA Hub. Selamat bekerja!',
    type: 'done',
  }
];

export default function Onboarding({ onComplete, onCreateProject }) {
  const [step, setStep] = useState(0);
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

  function handleSkipProject() {
    goNext();
  }

  function handleFinish() {
    localStorage.setItem('onboarding_completed', 'true');
    if (onComplete) onComplete();
  }

  return (
    <div className="onboarding-overlay">
      <div className={`onboarding-modal ${animating ? 'fade-out' : 'fade-in'}`}>

        {/* Close Button */}
        <button className="onboarding-close" onClick={handleFinish} title="Lewati onboarding">
          <X size={18} />
        </button>

        {/* Progress Dots */}
        <div className="onboarding-progress">
          {STEPS.map((_, i) => (
            <div key={i} className={`onboarding-dot ${i === step ? 'active' : i < step ? 'done' : ''}`} />
          ))}
        </div>

        {/* Content */}
        <div className="onboarding-content">

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
                  <button className="ob-btn-skip" onClick={handleSkipProject}>
                    Lewati, buat nanti
                  </button>
                </div>
              )}
            </div>
          )}

          {/* AI INTRO */}
          {currentStep.type === 'ai_intro' && (
            <div className="onboarding-ai">
              <div className="ob-ai-avatar">🤖</div>
              <h2>{currentStep.title}</h2>
              <p className="ob-subtitle">{currentStep.subtitle}</p>
              <div className="ob-ai-tips">
                {currentStep.tips.map((tip, i) => (
                  <div className="ob-ai-tip" key={i}>
                    <span className="ob-ai-tip-emoji">{tip.emoji}</span>
                    <span>{tip.text}</span>
                  </div>
                ))}
              </div>
              <div className="ob-ai-hint">
                💡 Aktifkan <strong>AI Mode</strong> dari toggle di pojok kanan atas Dashboard, lalu klik tombol <strong>🤖 AI QA</strong> di sudut kanan bawah.
              </div>
            </div>
          )}

          {/* DONE */}
          {currentStep.type === 'done' && (
            <div className="onboarding-done">
              <div className="ob-done-animation">🚀</div>
              <h1>{currentStep.title}</h1>
              <p>{currentStep.subtitle}</p>
              <div className="ob-checklist">
                <div className="ob-check-item"><CheckCircle size={16} color="#22c55e" /> Dashboard Analytics</div>
                <div className="ob-check-item"><CheckCircle size={16} color="#22c55e" /> Test Case Management</div>
                <div className="ob-check-item"><CheckCircle size={16} color="#22c55e" /> Bug Reports</div>
                <div className="ob-check-item"><CheckCircle size={16} color="#22c55e" /> AI QA Assistant</div>
                <div className="ob-check-item"><CheckCircle size={16} color="#22c55e" /> Cloud Sync (Supabase)</div>
              </div>
              <button className="ob-btn-primary ob-btn-finish" onClick={handleFinish}>
                Mulai Gunakan DiyahQA Hub <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        {currentStep.type !== 'done' && currentStep.type !== 'create_project' && (
          <div className="onboarding-nav">
            {!isFirst && (
              <button className="ob-btn-back" onClick={goPrev}>
                <ArrowLeft size={16} /> Kembali
              </button>
            )}
            <div style={{ flex: 1 }} />
            <button className="ob-btn-next" onClick={goNext}>
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
