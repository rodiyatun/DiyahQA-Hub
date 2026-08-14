import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';

export default function SecuritySettingsModal({ onClose }) {
  const [sonarUrl, setSonarUrl] = useState('');
  const [sonarToken, setSonarToken] = useState('');
  const [sonarProject, setSonarProject] = useState('');
  
  const [zapUrl, setZapUrl] = useState('');
  const [zapToken, setZapToken] = useState('');
  const [zapTarget, setZapTarget] = useState('');

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    // Load config on mount
    window.api.readVaultSecret('secret/data/security-config').then(res => {
      if (res.success && res.data) {
        setSonarUrl(res.data.sonarUrl || '');
        setSonarToken(res.data.sonarToken || '');
        setSonarProject(res.data.sonarProject || '');
        setZapUrl(res.data.zapUrl || '');
        setZapToken(res.data.zapToken || '');
        setZapTarget(res.data.zapTarget || '');
      }
    }).catch(err => console.error('Gagal memuat konfigurasi Keamanan dari Vault:', err));
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const dataToSave = {
        sonarUrl, sonarToken, sonarProject,
        zapUrl, zapToken, zapTarget
      };
      
      const res = await window.api.writeVaultSecret('secret/data/security-config', dataToSave);
      if (res.success) {
        setMsg({ type: 'success', text: 'Konfigurasi DevSecOps berhasil disimpan ke Vault!' });
        setTimeout(() => onClose(), 1500);
      } else {
        setMsg({ type: 'error', text: res.error || 'Gagal menyimpan konfigurasi.' });
      }
    } catch (e) {
      setMsg({ type: 'error', text: e.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal" style={{ width: 600, maxHeight: '90vh', overflowY: 'auto' }}>
        <h2 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><Settings size={20} /> Pengaturan DevSecOps & Vault</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
          Simpan kredensial SonarQube dan OWASP ZAP dengan aman ke dalam HashiCorp Vault. Kredensial akan digunakan oleh DevSecOps Agent saat Anda menjalankan pemindaian (Scan).
        </p>

        {msg && (
          <div style={{
            padding: 12, marginBottom: 20, borderRadius: 6, fontSize: 13,
            background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
            color: msg.type === 'success' ? '#10b981' : '#ef4444',
            border: `1px solid ${msg.type === 'success' ? '#10b981' : '#ef4444'}`
          }}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, marginBottom: 15, color: '#3b82f6' }}>SonarQube (SCA & SAST)</h3>
            <div className="form-group">
              <label>SonarQube URL</label>
              <input type="text" className="input" placeholder="http://sonarqube.local:9000" value={sonarUrl} onChange={e => setSonarUrl(e.target.value)} />
            </div>
            <div className="form-group">
              <label>User Token (API Token)</label>
              <input type="password" className="input" placeholder="squ_xxxxxxxxxxxxxxxxxx" value={sonarToken} onChange={e => setSonarToken(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Project Key</label>
              <input type="text" className="input" placeholder="my-app-backend" value={sonarProject} onChange={e => setSonarProject(e.target.value)} />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, marginBottom: 15, color: '#f59e0b' }}>OWASP ZAP (DAST)</h3>
            <div className="form-group">
              <label>ZAP API URL</label>
              <input type="text" className="input" placeholder="http://zap.local:8080" value={zapUrl} onChange={e => setZapUrl(e.target.value)} />
            </div>
            <div className="form-group">
              <label>ZAP API Key</label>
              <input type="password" className="input" placeholder="Masukkan ZAP API Key" value={zapToken} onChange={e => setZapToken(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Target Base URL (App to test)</label>
              <input type="text" className="input" placeholder="https://staging.myapp.com" value={zapTarget} onChange={e => setZapTarget(e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 30 }}>
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={saving}>Batal</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan ke Vault'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
