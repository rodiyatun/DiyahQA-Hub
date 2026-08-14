import React, { useState } from 'react';
import { verifyLicenseKey } from '../lib/license';

export default function LicenseActivation({ onActivated }) {
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleActivate(e) {
    e.preventDefault();
    if (!key.trim()) return;
    setLoading(true);
    setError('');
    const result = await verifyLicenseKey(key);
    setLoading(false);
    if (result.valid) {
      onActivated(result.data);
    } else {
      setError(result.message);
    }
  }

  function formatKey(val) {
    // Auto format: XXXX-XXXX-XXXX-XXXX
    const raw = val.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 16);
    return raw.match(/.{1,4}/g)?.join('-') || raw;
  }

  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{
        background: '#1e293b', border: '1px solid #334155', borderRadius: 16,
        padding: '40px 36px', width: '100%', maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
          <h1 style={{ color: '#60a5fa', fontSize: 22, fontWeight: 700, margin: 0 }}>DiyahQA Hub</h1>
          <p style={{ color: '#64748b', fontSize: 13, margin: '6px 0 0' }}>Aktivasi License Key</p>
        </div>

        <form onSubmit={handleActivate}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8, fontWeight: 500 }}>
              License Key
            </label>
            <input
              type="text"
              value={key}
              onChange={e => { setKey(formatKey(e.target.value)); setError(''); }}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              autoFocus
              spellCheck={false}
              style={{
                width: '100%', background: '#0f172a', border: `1px solid ${error ? '#ef4444' : '#334155'}`,
                borderRadius: 8, padding: '12px 14px', color: '#e2e8f0', fontSize: 16,
                fontFamily: 'monospace', letterSpacing: 2, boxSizing: 'border-box',
                outline: 'none', transition: 'border 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#60a5fa'}
              onBlur={e => e.target.style.borderColor = error ? '#ef4444' : '#334155'}
            />
            {error && (
              <p style={{ color: '#ef4444', fontSize: 12, margin: '8px 0 0' }}>❌ {error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || key.length < 19}
            style={{
              width: '100%', padding: '12px', borderRadius: 8, border: 'none',
              background: loading || key.length < 19
                ? '#334155'
                : 'linear-gradient(135deg, #1d4ed8, #2563eb)',
              color: loading || key.length < 19 ? '#64748b' : '#fff',
              fontWeight: 700, fontSize: 15, cursor: loading || key.length < 19 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {loading ? '⏳ Memverifikasi...' : '✅ Aktifkan'}
          </button>
        </form>

        <div style={{ marginTop: 24, padding: '14px', background: 'rgba(99,102,241,0.08)', borderRadius: 8, border: '1px solid rgba(99,102,241,0.2)' }}>
          <p style={{ color: '#94a3b8', fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            💡 Belum punya license key? Hubungi tim DiyahQA Hub untuk mendapatkan akses.
          </p>
        </div>

        <p style={{ color: '#475569', fontSize: 11, textAlign: 'center', marginTop: 20, marginBottom: 0 }}>
          v1.1.0 · DiyahQA Hub © 2026
        </p>
      </div>
    </div>
  );
}
