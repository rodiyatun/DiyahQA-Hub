import React, { useState, useEffect } from 'react';
import { Lock, X } from 'lucide-react';

export default function VaultSettingsModal({ onClose }) {
  const [address, setAddress] = useState('http://127.0.0.1:8200');
  const [token, setToken] = useState('');
  const [enginePath, setEnginePath] = useState('secret');
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      const config = await window.api.getVaultConfig();
      if (config) {
        setAddress(config.address || 'http://127.0.0.1:8200');
        setToken(config.token || '');
        setEnginePath(config.engine_path || 'secret');
        setIsActive(config.is_active === 1);
      }
    }
    loadConfig();
  }, []);

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    try {
      await window.api.setVaultConfig({
        address,
        token,
        engine_path: enginePath,
        is_active: isActive
      });
      setStatus({ type: 'success', message: 'Konfigurasi Vault berhasil disimpan.' });
    } catch (e) {
      setStatus({ type: 'error', message: `Gagal menyimpan: ${e.message}` });
    } finally {
      setSaving(false);
    }
  }

  async function testConnection() {
    setStatus(null);
    try {
      // Test by writing a dummy secret and reading it back
      const writeRes = await window.api.writeVaultSecret('diyahqa-test-ping', { ping: 'pong' });
      if (!writeRes.success) throw new Error(writeRes.error);
      
      const readRes = await window.api.readVaultSecret('diyahqa-test-ping');
      if (!readRes.success) throw new Error(readRes.error);

      if (readRes.data && readRes.data.ping === 'pong') {
        setStatus({ type: 'success', message: 'Koneksi ke Vault berhasil! Read/Write OK.' });
      } else {
        throw new Error('Data test mismatch');
      }
    } catch (e) {
      setStatus({ type: 'error', message: `Gagal terhubung ke Vault: ${e.message}` });
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 500, width: '90vw' }}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Lock size={20} /> HashiCorp Vault Settings</h2>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              Sentralisasi penyimpanan password dan keys agar tidak tersimpan di SQLite lokal.
            </div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={18} /></button>
        </div>

        <div style={{ paddingRight: 2, display: 'flex', flexDirection: 'column', gap: 15 }}>
          <div className="form-group">
            <label>Vault Address</label>
            <input 
              value={address} 
              onChange={e => setAddress(e.target.value)}
              placeholder="http://127.0.0.1:8200" 
            />
          </div>
          <div className="form-group">
            <label>Vault Token (Root / Access Token)</label>
            <input 
              value={token} 
              onChange={e => setToken(e.target.value)}
              type="password"
              placeholder="hvs.xxxxxx" 
            />
          </div>
          <div className="form-group">
            <label>KV v2 Engine Path</label>
            <input 
              value={enginePath} 
              onChange={e => setEnginePath(e.target.value)}
              placeholder="secret" 
            />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input 
              type="checkbox" 
              checked={isActive} 
              onChange={e => setIsActive(e.target.checked)} 
              id="vault-active-checkbox"
            />
            <label htmlFor="vault-active-checkbox" style={{ margin: 0, cursor: 'pointer' }}>Aktifkan Integrasi Vault</label>
          </div>

          {status && (
            <div style={{ 
              padding: 10, 
              borderRadius: 6, 
              fontSize: 12,
              background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: status.type === 'success' ? '#10b981' : '#ef4444',
              border: `1px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}`
            }}>
              {status.message}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
            <button className="btn btn-ghost" onClick={testConnection} disabled={!isActive || !token}>
              Test Connection
            </button>
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
