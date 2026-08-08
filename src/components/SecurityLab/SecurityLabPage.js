import React, { useState } from 'react';
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

          <h4>💡 Contoh Serangan</h4>
          <div className="example-block">{selected.example}</div>

          <h4>🛡️ Cara Pencegahan</h4>
          <ul className="prevention-list">
            {selected.prevention.map((p, i) => <li key={i}>{p}</li>)}
          </ul>

          <h4>🧪 Test Cases</h4>
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
              {checked[item.id] && '✓'}
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
            🔍 Analisis Header
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleLoadExample}>
            📋 Muat Contoh
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setRaw(''); setResults(null); }}>
            🗑️ Clear
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
                {r.status === 'pass' ? '✅' : '❌'}
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

// ── Main Page ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'owasp',     label: '🔴 OWASP Top 10' },
  { id: 'checklist', label: '✅ Security Checklist' },
  { id: 'headers',   label: '🔍 Header Analyzer' },
];

export default function SecurityLabPage() {
  const [tab, setTab] = useState('owasp');

  return (
    <div className="seclab-container">
      {/* Header */}
      <div className="seclab-header">
        <div>
          <h1 className="page-title">Security Lab</h1>
          <p className="page-subtitle">OWASP Top 10, security checklist, dan HTTP header analyzer</p>
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
        {tab === 'owasp'     && <OWASPTab />}
        {tab === 'checklist' && <ChecklistTab />}
        {tab === 'headers'   && <HeaderAnalyzerTab />}
      </div>
    </div>
  );
}
