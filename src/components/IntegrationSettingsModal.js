import React, { useState, useEffect } from 'react';
import { Plug, X, Save } from 'lucide-react';

export default function IntegrationSettingsModal({ onClose }) {
  const [slackWebhook, setSlackWebhook] = useState('');
  const [jiraDomain, setJiraDomain] = useState('');
  const [jiraEmail, setJiraEmail] = useState('');
  const [jiraToken, setJiraToken] = useState('');
  const [s3AccessKey, setS3AccessKey] = useState('');
  const [s3SecretKey, setS3SecretKey] = useState('');
  const [s3Bucket, setS3Bucket] = useState('');
  const [s3Region, setS3Region] = useState('');

  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await window.api.readVaultSecret('diyahqa/integrations/config');
        if (res.success && res.data) {
          setSlackWebhook(res.data.slackWebhook || '');
          setJiraDomain(res.data.jiraDomain || '');
          setJiraEmail(res.data.jiraEmail || '');
          setJiraToken(res.data.jiraToken || '');
          setS3AccessKey(res.data.s3AccessKey || '');
          setS3SecretKey(res.data.s3SecretKey || '');
          setS3Bucket(res.data.s3Bucket || '');
          setS3Region(res.data.s3Region || '');
        }
      } catch (e) {
        console.warn('Vault not active or no config found', e);
      }
    }
    loadConfig();
  }, []);

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    try {
      const data = {
        slackWebhook,
        jiraDomain,
        jiraEmail,
        jiraToken,
        s3AccessKey,
        s3SecretKey,
        s3Bucket,
        s3Region
      };
      const res = await window.api.writeVaultSecret('diyahqa/integrations/config', data);
      if (!res.success) throw new Error(res.error);
      
      setStatus({ type: 'success', message: 'Integrations config saved to Vault successfully!' });
    } catch (e) {
      setStatus({ type: 'error', message: `Failed to save: ${e.message}. Ensure Vault is configured and active.` });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 600, width: '90vw', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Plug size={20} /> Enterprise Integrations</h2>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              Konfigurasi Jira, Slack, dan S3. Disimpan terenkripsi di dalam HashiCorp Vault.
            </div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={18} /></button>
        </div>

        <div style={{ paddingRight: 2, display: 'flex', flexDirection: 'column', gap: 15 }}>
          
          <div className="builder-card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 14, margin: '0 0 12px 0' }}>Slack Integration</h3>
            <div className="form-group">
              <label>Slack Webhook URL</label>
              <input 
                value={slackWebhook} 
                onChange={e => setSlackWebhook(e.target.value)}
                placeholder="https://hooks.slack.com/services/TXXXXXXXX/BXXXXXXXX/contoh-webhook-url" 
              />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Menerima notifikasi saat tiket Bug Report dibuat.</span>
            </div>
          </div>

          <div className="builder-card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 14, margin: '0 0 12px 0' }}>Jira Integration</h3>
            <div className="form-group">
              <label>Jira Domain</label>
              <input 
                value={jiraDomain} 
                onChange={e => setJiraDomain(e.target.value)}
                placeholder="https://yourdomain.atlassian.net" 
              />
            </div>
            <div className="form-group">
              <label>Jira Email</label>
              <input 
                value={jiraEmail} 
                onChange={e => setJiraEmail(e.target.value)}
                placeholder="qa@yourdomain.com" 
              />
            </div>
            <div className="form-group">
              <label>Jira API Token</label>
              <input 
                type="password"
                value={jiraToken} 
                onChange={e => setJiraToken(e.target.value)}
                placeholder="ATATT3xFfGF0..." 
              />
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Otomatis membuat Issue (Bug) di Jira ketika Bug Report dibuat di DiyahQA.</span>
          </div>

          <div className="builder-card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 14, margin: '0 0 12px 0' }}>S3 (Object Storage)</h3>
            <div className="form-group">
              <label>Access Key</label>
              <input value={s3AccessKey} onChange={e => setS3AccessKey(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Secret Key</label>
              <input type="password" value={s3SecretKey} onChange={e => setS3SecretKey(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label>Bucket Name</label>
                <input value={s3Bucket} onChange={e => setS3Bucket(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Region</label>
                <input value={s3Region} onChange={e => setS3Region(e.target.value)} placeholder="ap-southeast-1" />
              </div>
            </div>
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
            <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Save size={16}/> {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
