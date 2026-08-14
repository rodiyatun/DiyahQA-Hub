import TutorialPanel from '../TutorialPanel';
import React, { useState } from 'react';
import { isWeb } from '../../utils/platform';
import { 
  Lightbulb, ShieldCheck, FlaskConical, Search, ClipboardList, Trash2,
  CheckCircle, XCircle, Key, Package, FileText, Globe, Settings,
  BookOpen, AlertOctagon, CheckSquare, Check, Shield
} from 'lucide-react';
import SecuritySettingsModal from '../SecuritySettingsModal';
import { OWASP_TOP10, SECURITY_CHECKLISTS } from './securityData';
import './SecurityLab.css';

// ── Tab: OWASP Top 10 ──────────────────────────────────────────────────────────
function OWASPTab() {
  const [selected, setSelected] = useState(OWASP_TOP10[0]);

  return (
    <div style={{ display: 'flex', gap: 20, minHeight: 0 }}>
      {/* Left: card list — scrollable */}
      <div style={{ width: 300, flexShrink: 0, overflowY: 'auto', maxHeight: 'calc(100vh - 220px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {OWASP_TOP10.map(item => (
            <div
              key={item.id}
              className={`owasp-card ${selected?.id === item.id ? 'active' : ''}`}
              onClick={() => setSelected(item)}
            >
              <div className="owasp-rank">{item.rank}</div>
              <div className="owasp-title">{item.title}</div>
              <div className="owasp-desc">{item.desc}</div>
              <span className={`owasp-severity severity-${item.severity}`}>
                {item.severity.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: detail panel — scrollable */}
      {selected && (
        <div className="owasp-detail" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 220px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span className={`owasp-severity severity-${selected.severity}`}>
              {selected.severity.toUpperCase()}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selected.rank}</span>
          </div>
          <h3>{selected.title}</h3>
          <p>{selected.detail}</p>

          <h4><Lightbulb size={16} style={{marginRight: 6}} />Contoh Serangan</h4>
          <div className="example-block">{selected.example}</div>

          <h4><ShieldCheck size={16} style={{marginRight: 6}} />Cara Pencegahan</h4>
          <ul className="prevention-list">
            {selected.prevention.map((p, i) => <li key={i}>{p}</li>)}
          </ul>

          <h4><FlaskConical size={16} style={{marginRight: 6}} />Test Cases</h4>
          <div className="test-case-list">
            {selected.testCases.map((tc, i) => (
              <div key={i} className="test-case-item">
                <span className={`tc-badge ${tc.type === 'positive' ? 'tc-positive' : 'tc-negative'}`}>
                  {tc.type === 'positive' ? 'POSITIVE' : 'NEGATIVE'}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{tc.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Tab: Security Checklist ────────────────────────────────────────────────────
function ChecklistTab() {
  const categories = Object.entries(SECURITY_CHECKLISTS);
  const [activeCategory, setActiveCategory] = useState(categories[0][0]);
  const [checked, setChecked] = useState({});

  const currentItems = SECURITY_CHECKLISTS[activeCategory]?.items || [];
  const checkedCount = currentItems.filter(item => checked[item.id]).length;
  const progress = currentItems.length > 0 ? Math.round((checkedCount / currentItems.length) * 100) : 0;

  function toggleItem(id) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function resetCategory() {
    const ids = currentItems.map(i => i.id);
    setChecked(prev => {
      const next = { ...prev };
      ids.forEach(id => { delete next[id]; });
      return next;
    });
  }

  const riskColor = {
    critical: '#ef4444',
    high: '#f97316',
    medium: '#f59e0b',
    low: '#6366f1',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Category tabs */}
      <div className="checklist-categories">
        {categories.map(([key, cat]) => {
          const items = cat.items;
          const done = items.filter(i => checked[i.id]).length;
          return (
            <button
              key={key}
              className={`checklist-cat-btn ${activeCategory === key ? 'active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              {cat.label}
              <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.8 }}>
                {done}/{items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="checklist-progress" style={{ flex: 1 }}>
          <div className="checklist-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', minWidth: 60 }}>
          {checkedCount}/{currentItems.length} ({progress}%)
        </span>
        <button className="btn btn-secondary btn-sm" onClick={resetCategory}>Reset</button>
      </div>

      {/* Items */}
      <div className="checklist-grid">
        {currentItems.map(item => (
          <div
            key={item.id}
            className={`checklist-item ${checked[item.id] ? 'checked' : ''}`}
            onClick={() => toggleItem(item.id)}
          >
            <div className="checklist-checkbox">
              {checked[item.id] && <Check size={14} />}
            </div>
            <div className="checklist-content">
              <div className="checklist-text">{item.text}</div>
              <div className="checklist-detail">{item.detail}</div>
            </div>
            <span
              className="checklist-risk"
              style={{
                background: `${riskColor[item.risk]}22`,
                color: riskColor[item.risk],
              }}
            >
              {item.risk.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab: HTTP Header Analyzer ──────────────────────────────────────────────────
const SECURITY_HEADERS = [
  {
    name: 'Strict-Transport-Security',
    aliases: ['strict-transport-security', 'hsts'],
    desc: 'Memaksa browser gunakan HTTPS untuk semua request.',
    recommendation: 'max-age=31536000; includeSubDomains',
  },
  {
    name: 'Content-Security-Policy',
    aliases: ['content-security-policy', 'csp'],
    desc: 'Mencegah XSS dan injeksi konten dengan whitelist sumber yang diizinkan.',
    recommendation: "default-src 'self'; script-src 'self'",
  },
  {
    name: 'X-Frame-Options',
    aliases: ['x-frame-options'],
    desc: 'Mencegah clickjacking dengan melarang halaman di-embed dalam iframe.',
    recommendation: 'DENY atau SAMEORIGIN',
  },
  {
    name: 'X-Content-Type-Options',
    aliases: ['x-content-type-options'],
    desc: 'Mencegah MIME sniffing yang bisa menyebabkan XSS.',
    recommendation: 'nosniff',
  },
  {
    name: 'Referrer-Policy',
    aliases: ['referrer-policy'],
    desc: 'Mengontrol informasi referrer yang dikirim ke situs lain.',
    recommendation: 'strict-origin-when-cross-origin',
  },
  {
    name: 'Permissions-Policy',
    aliases: ['permissions-policy', 'feature-policy'],
    desc: 'Mengontrol fitur browser yang diizinkan (kamera, mikrofon, GPS).',
    recommendation: 'camera=(), microphone=(), geolocation=()',
  },
  {
    name: 'X-XSS-Protection',
    aliases: ['x-xss-protection'],
    desc: 'Filter XSS bawaan browser (legacy, lebih baik gunakan CSP).',
    recommendation: '1; mode=block',
  },
  {
    name: 'Cache-Control',
    aliases: ['cache-control'],
    desc: 'Mencegah caching data sensitif di browser.',
    recommendation: 'no-store untuk halaman sensitif',
  },
];

function parseHeaders(raw) {
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  const parsed = {};
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const val = line.slice(idx + 1).trim();
    parsed[key] = val;
  }
  return parsed;
}

function analyzeHeaders(parsed) {
  return SECURITY_HEADERS.map(header => {
    const found = header.aliases.find(alias => parsed[alias]);
    const value = found ? parsed[found] : null;
    return {
      name: header.name,
      desc: header.desc,
      recommendation: header.recommendation,
      status: value ? 'pass' : 'fail',
      value,
    };
  });
}

function calcScore(results) {
  const passed = results.filter(r => r.status === 'pass').length;
  const pct = Math.round((passed / results.length) * 100);
  if (pct >= 90) return { grade: 'A', pct, cls: 'score-a' };
  if (pct >= 75) return { grade: 'B', pct, cls: 'score-b' };
  if (pct >= 60) return { grade: 'C', pct, cls: 'score-c' };
  if (pct >= 40) return { grade: 'D', pct, cls: 'score-d' };
  return { grade: 'F', pct, cls: 'score-f' };
}

const EXAMPLE_HEADERS = `HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin`;

function HeaderAnalyzerTab() {
  const [raw, setRaw] = useState('');
  const [results, setResults] = useState(null);

  function handleAnalyze() {
    if (!raw.trim()) return;
    const parsed = parseHeaders(raw);
    setResults(analyzeHeaders(parsed));
  }

  function handleLoadExample() {
    setRaw(EXAMPLE_HEADERS);
    setResults(null);
  }

  const score = results ? calcScore(results) : null;

  return (
    <div className="header-analyzer">
      <div className="header-input-area">
        <textarea
          placeholder={'Paste HTTP response headers di sini...\n\nContoh:\nContent-Type: text/html\nStrict-Transport-Security: max-age=31536000\nX-Frame-Options: DENY'}
          value={raw}
          onChange={e => { setRaw(e.target.value); setResults(null); }}
          spellCheck={false}
        />
        <div className="header-toolbar">
          <button className="btn btn-primary btn-sm" onClick={handleAnalyze} disabled={!raw.trim()}>
            <Search size={14} /> Analisis Header
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleLoadExample}>
            <ClipboardList size={14} /> Muat Contoh
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setRaw(''); setResults(null); }}>
            <Trash2 size={14} /> Clear
          </button>
          {score && (
            <span className={`score-badge ${score.cls}`} style={{ marginLeft: 'auto' }}>
              Grade {score.grade} — {score.pct}%
            </span>
          )}
        </div>
      </div>

      {results && (
        <div className="header-results">
          {results.map(r => (
            <div key={r.name} className={`header-result-item ${r.status}`}>
              <span className="header-result-icon">
                {r.status === 'pass' ? <CheckCircle size={16} color="var(--success)" /> : <XCircle size={16} color="var(--danger)" />}
              </span>
              <div className="header-result-content">
                <div className="header-result-title">{r.name}</div>
                <div className="header-result-desc">{r.desc}</div>
                {r.value
                  ? <div className="header-result-value">Value: {r.value}</div>
                  : <div className="header-result-value" style={{ color: '#ef4444' }}>
                      Missing — Rekomendasi: {r.recommendation}
                    </div>
                }
              </div>
            </div>
          ))}
        </div>
      )}

      {!results && (
        <div style={{
          padding: '40px 20px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: 13,
          border: '1px dashed var(--border)',
          borderRadius: 12,
        }}>
          Paste HTTP response headers di atas lalu klik <strong>Analisis Header</strong>.<br />
          Kamu bisa copy dari browser DevTools → Network tab → Response Headers.
        </div>
      )}
    </div>
  );
}

// ── Tab: DevSecOps Dashboard ────────────────────────────────────────────────────
function DevSecOpsDashboardTab() {
  const [runningPhase, setRunningPhase] = useState(null); // 'secret', 'sca', 'sast', 'dast'
  const [results, setResults] = useState({});

  async function runPhase(phase, handler, payload) {
    setRunningPhase(phase);
    try {
      const res = await window.api[handler](payload);
      setResults(p => ({ ...p, [phase]: res }));
    } catch (e) {
      console.error(e);
      setResults(p => ({ ...p, [phase]: { success: false, error: e.message } }));
    } finally {
      setRunningPhase(null);
    }
  }

  const stages = [
    { id: 'secret', name: 'Secret Scanning', icon: <Key size={18} />, desc: 'Mencegah kebocoran kredensial di kode.', action: () => runPhase('secret', 'runSecretScan') },
    { id: 'sca', name: 'SCA (Composition Analysis)', icon: <Package size={18} />, desc: 'Cek CVE pada dependensi/library.', action: () => runPhase('sca', 'runScaScan') },
    { id: 'sast', name: 'SAST (Static Analysis)', icon: <FileText size={18} />, desc: 'Analisis kelemahan kode secara statis.', action: () => runPhase('sast', 'runSastScan') },
    { id: 'dast', name: 'DAST (Dynamic Analysis)', icon: <Globe size={18} />, desc: 'Simulasi serangan pada aplikasi berjalan.', action: () => runPhase('dast', 'runDastScan', { url: 'https://staging.app.com' }) },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 15, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
        <ShieldCheck size={20} /> DevSecOps Pipeline
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
        Jalankan pemindaian keamanan berjenjang dari kode hingga runtime.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 15 }}>
        {stages.map(stage => {
          const res = results[stage.id];
          const isRunning = runningPhase === stage.id;
          return (
            <div key={stage.id} style={{ 
              background: 'var(--bg-secondary)', padding: 20, borderRadius: 10, 
              border: `1px solid ${res ? (res.success && res.issuesFound === 0 ? '#10b981' : '#f59e0b') : 'var(--border)'}` 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <h3 style={{ margin: 0, fontSize: 15 }}>{stage.icon} {stage.name}</h3>
                <button 
                  className="btn btn-outline btn-sm" 
                  onClick={stage.action}
                  disabled={runningPhase !== null}
                >
                  {isRunning ? 'Scanning...' : 'Run Scan'}
                </button>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 15 }}>{stage.desc}</p>
              
              {res && (
                <div style={{ marginTop: 15, paddingTop: 15, borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 10, color: res.issuesFound === 0 ? '#10b981' : '#ef4444' }}>
                    {res.issuesFound === 0 ? '✅ No issues found.' : `⚠️ Found ${res.issuesFound} issues.`}
                  </div>
                  {res.details && Array.isArray(res.details) ? (
                    <ul style={{ paddingLeft: 20, fontSize: 12, color: 'var(--text-primary)', margin: 0 }}>
                      {res.details.map((d, i) => (
                        <li key={i} style={{ marginBottom: 5 }}>
                          <span style={{ 
                            background: d.severity === 'HIGH' ? '#ef4444' : d.severity === 'MEDIUM' ? '#f59e0b' : '#3b82f6',
                            color: '#fff', padding: '2px 6px', borderRadius: 4, fontSize: 10, marginRight: 6
                          }}>{d.severity}</span>
                          {d.cve || d.type} {d.package ? `(${d.package})` : ''} {d.file ? `in ${d.file}` : ''} {d.url ? `at ${d.url}` : ''}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{res.details}</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'devsecops', label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}><ShieldCheck size={16} /> DevSecOps Pipeline</span> },
  { id: 'guide',     label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}><BookOpen size={16} /> Panduan DevSecOps</span> },
  { id: 'owasp',     label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}><AlertOctagon size={16} /> OWASP Top 10</span> },
  { id: 'checklist', label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}><CheckSquare size={16} /> Security Checklist</span> },
  { id: 'headers',   label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}><Search size={16} /> Header Analyzer</span> },
];

const DEVSECOPS_GUIDE_MD = `
# Panduan & Pengertian DevSecOps Pipeline

Dokumen ini adalah panduan lengkap untuk memahami apa itu DevSecOps, serta definisi dari masing-masing metode pengujian keamanan (SCA, SAST, DAST, dan Secret Scanning) yang ada di aplikasi DiyahQA Hub.

---

## 1. Apa itu DevSecOps?
**DevSecOps** merupakan singkatan dari *Development, Security, dan Operations*. Ini adalah pendekatan budaya, praktik, dan alat yang mengintegrasikan keamanan (Security) secara otomatis ke setiap fase dari siklus hidup pengembangan perangkat lunak (SDLC).

Konsep utamanya adalah **"Shift-Left Security"**, yang berarti pengujian keamanan dilakukan sedini mungkin (bergeser ke kiri di alur kerja) mulai dari saat kode ditulis, bukan menunda pengujian keamanan hingga aplikasi selesai dan akan dirilis ke tahap *Production*.

---

## 2. Empat Pilar Pemindaian Keamanan di DiyahQA Hub

Aplikasi DiyahQA Hub menyediakan *dashboard* untuk memantau 4 tipe pemeriksaan keamanan:

### 🔑 A. Secret Scanning
* **Pengertian:** Pemindaian kode sumber (source code) untuk menemukan informasi rahasia yang tertinggal atau di-_hardcode_ secara tidak sengaja oleh developer.
* **Apa yang dicari:** API Keys, Token (seperti AWS atau GitHub token), _Passwords_ database, dan kunci enkripsi / sertifikat (_Private Keys_).
* **Kapan dilakukan:** Biasanya berjalan setiap kali developer melakukan *commit* atau *push* kode ke repositori (contoh: melalui pre-commit hooks atau di awal pipeline GitLab/GitHub).
* **Kenapa penting:** Jika *secret* bocor ke *public repository*, *hacker* bisa langsung menggunakan token tersebut untuk meretas server, yang sangat fatal.
* **Tools Populer:** GitGuardian, TruffleHog, Gitleaks.

### 📦 B. SCA (Software Composition Analysis)
* **Pengertian:** Analisis komposisi perangkat lunak untuk mengidentifikasi dan mendata seluruh _library_, _package_, atau dependensi pihak ketiga (Open Source) yang digunakan oleh aplikasi, lalu mengecek apakah komponen tersebut memiliki kerentanan yang diketahui publik.
* **Apa yang dicari:** Kerentanan keamanan (CVE - *Common Vulnerabilities and Exposures*) yang sudah dipublikasikan pada _package_ eksternal (misal: versi \`axios\` atau \`lodash\` yang sudah usang dan rentan diretas).
* **Kapan dilakukan:** Saat tahap instalasi dependensi atau proses _build_ (\`npm install\`, \`pip install\`, dll).
* **Kenapa penting:** Sekitar 80% kode aplikasi modern menggunakan _library open-source_. Meskipun kode buatan kita aman, kerentanan dari _library_ pihak ketiga tetap bisa menjadi pintu masuk *hacker*.
* **Tools Populer:** SonarQube, Trivy, Snyk, OWASP Dependency-Check.

### 📝 C. SAST (Static Application Security Testing)
* **Pengertian:** Metode pengujian keamanan aplikasi *white-box* (dari dalam) di mana sistem akan memeriksa *source code* (kode sumber) aplikasi tanpa perlu menjalankannya (*static*).
* **Apa yang dicari:** Pola koding yang buruk, potensi injeksi (seperti SQL Injection, Command Injection), *buffer overflow*, _Cross-Site Scripting (XSS)_ yang tertulis langsung pada logika kode (misal kurang sanitasi atau validasi input).
* **Kapan dilakukan:** Bersamaan dengan proses _build_ CI (*Continuous Integration*) saat aplikasi dikompilasi atau diuji otomatis (Unit Test).
* **Kenapa penting:** SAST membantu mengidentifikasi akar penyebab kelemahan secara pasti sampai ke baris kode yang salah, sehingga _developer_ tahu pasti di mana harus memperbaiki (seperti baris ke-45 di \`Login.js\`).
* **Tools Populer:** SonarQube, Checkmarx, Fortify, Semgrep.

### 🌐 D. DAST (Dynamic Application Security Testing)
* **Pengertian:** Metode pengujian keamanan aplikasi *black-box* (dari luar). DAST akan menyimulasikan serangan siber layaknya *hacker* nyata dengan cara mengirimkan *request* berbahaya ke aplikasi web **yang sedang berjalan** (*runtime*).
* **Apa yang dicari:** Kerentanan *runtime* seperti *Reflected/Stored XSS*, konfigurasi *Security Headers* yang hilang, autentikasi yang dapat di-_bypass_, hingga kerentanan infrastruktur.
* **Kapan dilakukan:** Di akhir siklus _Deployment_ (CD), biasanya ketika aplikasi baru saja di-_deploy_ ke server _Staging_ (UAT) sebelum rilis ke _Production_.
* **Kenapa penting:** DAST menangkap kesalahan konfigurasi (*misconfigurations*) dan masalah yang hanya muncul saat aplikasi berinteraksi dengan *database*, *web server*, atau saat *runtime* yang tidak bisa dilihat oleh SAST.
* **Tools Populer:** OWASP ZAP, Burp Suite, Acunetix, Nessus.

---

## 3. Alur Kerja DevSecOps yang Ideal (Best Practice)

1. **Commit (Secret Scanning):** Developer melakukan "git push". Sistem otomatis mengecek apakah ada _password_ yang tidak sengaja tertulis.
2. **Build (SCA & SAST):** CI Tool (seperti Jenkins) mengunduh _library_ (SCA jalan: "Apakah ada versi yang rentan?") lalu mengecek *source code* (SAST jalan: "Adakah pola koding yang tidak aman?").
3. **Deploy to Staging:** Kode yang berhasil dan aman akan di-_deploy_ oleh ArgoCD ke server Staging.
4. **Testing (DAST):** Setelah aplikasi hidup, OWASP ZAP "menyerang" aplikasi Staging tersebut untuk memastikan tidak ada celah *runtime*.
5. **Release to Production:** Jika keempat pemindaian tadi aman atau menghasilkan isu di bawah _threshold_ kritis, barulah aplikasi dirilis ke _Production_ (Live).

> **Cara Menggunakan Fitur Ini di DiyahQA Hub:**
> Anda tidak perlu membuka halaman _tools_ eksternal satu-persatu. Cukup gunakan menu **⚙️ Pengaturan DevSecOps** pada DiyahQA Hub untuk menyimpan koneksi ke ZAP dan SonarQube secara aman menggunakan Vault. Setelah terhubung, klik **"Run Scan"** untuk menjalankan pengujian keamanan langsung dari _dashboard_ Anda!
`;

function DevSecOpsGuideTab() {
  const renderMarkdown = (text) =>
    text
      .replace(/^### (.+)$/gm, '<h3 style="color:var(--text-primary);margin:12px 0 6px;font-size:16px">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 style="color:var(--primary-color);margin:20px 0 8px;font-size:18px;border-bottom:1px solid var(--border-color);padding-bottom:4px">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 style="color:var(--text-primary);margin:20px 0 10px;font-size:24px">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code style="background:#0f172a;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:13px;color:#38bdf8">$1</code>')
      .replace(/^- (.+)$/gm, '<li style="margin:6px 0;color:var(--text-secondary)">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li style="margin:6px 0;color:var(--text-secondary)">$2</li>')
      .replace(/^> (.+)$/gm, '<blockquote style="border-left:4px solid var(--primary-color);padding-left:12px;margin:16px 0;color:var(--text-secondary);background:rgba(59, 130, 246, 0.1);padding:12px;border-radius:0 8px 8px 0">$1</blockquote>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto', fontSize: 14, lineHeight: 1.8, color: 'var(--text-color)' }}
         dangerouslySetInnerHTML={{ __html: renderMarkdown(DEVSECOPS_GUIDE_MD) }} />
  );
}

export default function SecurityLabPage() {
  const [tab, setTab] = useState('devsecops');
  const [showSettings, setShowSettings] = useState(false);
  
  if (isWeb()) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-primary)' }}>
        <Shield size={48} style={{ color: 'var(--text-muted)', marginBottom: 20 }} />
        <h2>Fitur Eksklusif Desktop</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '16px auto', lineHeight: '1.6' }}>
          Security Lab membutuhkan interaksi langsung dengan tools seperti OWASP ZAP, Nmap, dan Vault CLI di sistem lokal Anda.
          Karena keterbatasan keamanan Web Browser, fitur ini <strong>hanya tersedia di DiyahQA Hub versi Desktop</strong>.
        </p>
        <div style={{ padding: 16, background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--accent)', borderRadius: 8, display: 'inline-block' }}>
          💡 <strong>Tips:</strong> Untuk menjalankan *security scan* via Web, integrasikan *scanner* ke dalam *pipeline* CI/CD Anda.
        </div>
      </div>
    );
  }



  return (
    <div className="seclab-container">
      {/* Header */}
      <div className="seclab-header">
        <div>
          <h1 className="page-title">Security Lab</h1>
          <p className="page-subtitle">DevSecOps Pipeline, OWASP Top 10, security checklist, dan HTTP header analyzer</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            onClick={() => setShowSettings(true)}
            style={{ padding: '6px 12px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 4, cursor: 'pointer', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
          >
            <Settings size={14} /> Pengaturan DevSecOps
          </button>
          <TutorialPanel menuKey="securitylab" />
        </div>
      </div>

      {/* Tabs */}
      <div className="seclab-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`seclab-tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
        {tab === 'devsecops' && <DevSecOpsDashboardTab />}
        {tab === 'guide'     && <DevSecOpsGuideTab />}
        {tab === 'owasp'     && <OWASPTab />}
        {tab === 'checklist' && <ChecklistTab />}
        {tab === 'headers'   && <HeaderAnalyzerTab />}
      </div>
      
      {showSettings && <SecuritySettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
