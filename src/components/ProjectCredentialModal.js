import React, { useState, useEffect } from 'react';

// Environment rows yang ditampilkan di tabel (sesuai spreadsheet)
const ENV_ROWS = [
  { key: 'development', label: 'Development' },
  { key: 'production',  label: 'Production' },
  { key: 'staging',     label: 'Staging' },
  { key: 'uat',         label: 'UAT' },
  { key: 'hrms_dev',    label: 'HRMS Dev' },
  { key: 'hrms_prod',   label: 'HRMS Production' },
];

const emptyEnvRow = (key) => ({ envName: key, siteUrl: '', username: '', password: '' });

export default function ProjectCredentialModal({ project, onClose }) {
  const [form, setForm] = useState({
    projectCode: '',
    version: '',
    supportPin: '',
    remark: '',
  });
  const [envCreds, setEnvCreds] = useState(ENV_ROWS.map(e => emptyEnvRow(e.key)));
  const [revealed, setRevealed] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    load();
  }, [project.id]);

  async function load() {
    const data = await window.api.getProjectCredentials(project.id);
    if (data) {
      setForm({
        projectCode: data.project_code || '',
        version:     data.version || '',
        supportPin:  data.support_pin || '',
        remark:      data.remark || '',
      });
      // Merge loaded data with default rows
      const merged = ENV_ROWS.map(e => {
        const loaded = (data.envCredentials || []).find(ec => ec.env_name === e.key);
        return loaded
          ? { envName: e.key, siteUrl: loaded.site_url || '', username: loaded.username || '', password: loaded.password || '' }
          : emptyEnvRow(e.key);
      });
      setEnvCreds(merged);
    }
  }

  function setEnv(key, field, value) {
    setEnvCreds(p => p.map(e => e.envName === key ? { ...e, [field]: value } : e));
  }

  async function handleSave() {
    setSaving(true);
    await window.api.saveProjectCredentials({
      projectId:      project.id,
      projectCode:    form.projectCode,
      version:        form.version,
      supportPin:     form.supportPin,
      remark:         form.remark,
      envCredentials: envCreds,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const thStyle = {
    padding: '8px 10px',
    background: 'var(--bg-secondary)',
    color: 'var(--text-muted)',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid var(--border)',
  };
  const tdStyle = {
    padding: '6px 8px',
    borderBottom: '1px solid var(--border)',
    verticalAlign: 'middle',
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 900, width: '95vw' }}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">🔑 Project Credentials</h2>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              {project.name} — URL, username & password per environment
            </div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>

        <div style={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: 2 }}>
          {/* Info dasar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            <div className="form-group">
              <label>Project Code</label>
              <input value={form.projectCode} onChange={e => setForm(p => ({ ...p, projectCode: e.target.value }))}
                placeholder="DRCA" style={{ fontFamily: 'monospace' }} />
            </div>
            <div className="form-group">
              <label>Version</label>
              <input value={form.version} onChange={e => setForm(p => ({ ...p, version: e.target.value }))}
                placeholder="2.8.5" />
            </div>
            <div className="form-group">
              <label>Support PIN</label>
              <input value={form.supportPin} onChange={e => setForm(p => ({ ...p, supportPin: e.target.value }))}
                placeholder="12345678" type="password" />
            </div>
            <div className="form-group">
              <label>Remark</label>
              <input value={form.remark} onChange={e => setForm(p => ({ ...p, remark: e.target.value }))}
                placeholder="Catatan tambahan" />
            </div>
          </div>

          {/* Tabel credentials per environment */}
          <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: 130 }}>Environment</th>
                  <th style={thStyle}>Site URL</th>
                  <th style={{ ...thStyle, width: 170 }}>Username</th>
                  <th style={{ ...thStyle, width: 180 }}>Password</th>
                </tr>
              </thead>
              <tbody>
                {ENV_ROWS.map(envDef => {
                  const row = envCreds.find(e => e.envName === envDef.key) || emptyEnvRow(envDef.key);
                  const isRevealed = revealed[envDef.key];
                  return (
                    <tr key={envDef.key}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary)', fontSize: 12 }}>
                        {envDef.label}
                      </td>
                      <td style={tdStyle}>
                        <input
                          value={row.siteUrl}
                          onChange={e => setEnv(envDef.key, 'siteUrl', e.target.value)}
                          placeholder="https://..."
                          style={{ width: '100%', fontSize: 12, fontFamily: 'monospace' }}
                        />
                      </td>
                      <td style={tdStyle}>
                        <input
                          value={row.username}
                          onChange={e => setEnv(envDef.key, 'username', e.target.value)}
                          placeholder="username"
                          style={{ width: '100%', fontSize: 12 }}
                        />
                      </td>
                      <td style={{ ...tdStyle }}>
                        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                          <input
                            type={isRevealed ? 'text' : 'password'}
                            value={row.password}
                            onChange={e => setEnv(envDef.key, 'password', e.target.value)}
                            placeholder="••••••••"
                            style={{ flex: 1, fontSize: 12, fontFamily: 'monospace' }}
                          />
                          <button
                            className="btn btn-ghost btn-sm"
                            style={{ fontSize: 11, padding: '2px 6px', flexShrink: 0 }}
                            onClick={() => setRevealed(p => ({ ...p, [envDef.key]: !p[envDef.key] }))}
                            title={isRevealed ? 'Hide' : 'Show'}
                          >
                            {isRevealed ? '🙈' : '👁️'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
            🔒 Password dienkripsi sebelum disimpan ke database.
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Tutup</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? '⟳ Menyimpan...' : saved ? '✅ Tersimpan!' : '💾 Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
}
