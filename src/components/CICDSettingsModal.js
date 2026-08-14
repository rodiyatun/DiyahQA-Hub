import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';

export default function CICDSettingsModal({ onClose }) {
  const [jenkinsUrl, setJenkinsUrl] = useState('');
  const [jenkinsUser, setJenkinsUser] = useState('');
  const [jenkinsToken, setJenkinsToken] = useState('');
  const [jenkinsJobName, setJenkinsJobName] = useState('');
  
  const [argoUrl, setArgoUrl] = useState('');
  const [argoToken, setArgoToken] = useState('');
  const [argoAppName, setArgoAppName] = useState('');

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    // Load config on mount
    window.api.readVaultSecret('secret/data/cicd-config').then(res => {
      if (res.success && res.data) {
        setJenkinsUrl(res.data.jenkinsUrl || '');
        setJenkinsUser(res.data.jenkinsUser || '');
        setJenkinsToken(res.data.jenkinsToken || '');
        setJenkinsJobName(res.data.jenkinsJobName || '');
        setArgoUrl(res.data.argoUrl || '');
        setArgoToken(res.data.argoToken || '');
        setArgoAppName(res.data.argoAppName || '');
      }
    }).catch(err => console.error('Gagal memuat konfigurasi CI/CD dari Vault:', err));
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const dataToSave = {
        jenkinsUrl, jenkinsUser, jenkinsToken, jenkinsJobName,
        argoUrl, argoToken, argoAppName
      };
      
      const res = await window.api.writeVaultSecret('secret/data/cicd-config', dataToSave);
      if (res.success) {
        setMsg({ type: 'success', text: 'Konfigurasi CI/CD berhasil disimpan ke Vault!' });
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
        <h2 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><Settings size={20} /> Pengaturan CI/CD & Vault</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
          Simpan kredensial Jenkins dan ArgoCD dengan aman ke dalam HashiCorp Vault. Kredensial akan digunakan oleh DevSecOps Agent saat Anda me-run pipeline.
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
            <h3 style={{ fontSize: 15, marginBottom: 15, color: '#3b82f6' }}>Jenkins Configuration</h3>
            <div className="form-group">
              <label>Jenkins URL (contoh: https://jenkins.domain.com)</label>
              <input type="text" className="input" value={jenkinsUrl} onChange={e => setJenkinsUrl(e.target.value)} placeholder="https://jenkins.domain.com" />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Username</label>
                <input type="text" className="input" value={jenkinsUser} onChange={e => setJenkinsUser(e.target.value)} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Job Name</label>
                <input type="text" className="input" value={jenkinsJobName} onChange={e => setJenkinsJobName(e.target.value)} placeholder="my-job-name" />
              </div>
            </div>
            <div className="form-group">
              <label>API Token</label>
              <input type="password" className="input" value={jenkinsToken} onChange={e => setJenkinsToken(e.target.value)} />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, marginBottom: 15, color: '#f59e0b' }}>ArgoCD GitOps Configuration</h3>
            <div className="form-group">
              <label>ArgoCD URL (contoh: https://argocd.domain.com)</label>
              <input type="text" className="input" value={argoUrl} onChange={e => setArgoUrl(e.target.value)} placeholder="https://argocd.domain.com" />
            </div>
            <div className="form-group">
              <label>App Name</label>
              <input type="text" className="input" value={argoAppName} onChange={e => setArgoAppName(e.target.value)} placeholder="my-app" />
            </div>
            <div className="form-group">
              <label>API Token (Bearer)</label>
              <input type="password" className="input" value={argoToken} onChange={e => setArgoToken(e.target.value)} />
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
