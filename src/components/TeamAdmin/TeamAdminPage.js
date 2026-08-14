import React, { useState, useEffect } from 'react';
import { 
  Users, Shield, Key, Building2, Check, AlertTriangle, XCircle, 
  Search, Copy, Plus, MoreVertical, ShieldAlert, Trash2, X
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '../../lib/supabaseClient';
import FunctionAuthTab from './FunctionAuthTab';
import './TeamAdminPage.css';

export default function TeamAdminPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('roles');

  // Modal states for cross-tab sharing (simplified)
  const [modalType, setModalType] = useState(null); // 'addUser', 'generateKey', 'createWorkspace', 'deleteUser', 'revokeKey'
  const [modalData, setModalData] = useState(null);
  
  // Shared state updater to pass to tabs
  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data);
  };
  const closeModal = () => {
    setModalType(null);
    setModalData(null);
  };

  const tabs = [
    { id: 'roles', label: 'Roles & Members', icon: <Users size={16} /> },
    { id: 'auth', label: 'Function Auth', icon: <ShieldAlert size={16} /> },
    { id: 'audit', label: 'Audit Logs', icon: <Shield size={16} /> },
    { id: 'apikeys', label: 'API Keys', icon: <Key size={16} /> },
    { id: 'workspaces', label: 'Workspaces', icon: <Building2 size={16} /> },
  ];

  return (
    <div className="team-admin-container">
      <div className="team-admin-header">
        <h1>Teams & Administration</h1>
        <p>Manage roles, access controls, audit logs, and external API keys.</p>
      </div>

      <div className="team-admin-content">
        <div className="team-admin-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`admin-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="admin-nav-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="team-admin-main">
          {activeTab === 'roles' && <RolesTab openModal={openModal} />}
          {activeTab === 'auth' && <FunctionAuthTab />}
          {activeTab === 'audit' && <AuditLogsTab />}
          {activeTab === 'apikeys' && <APIKeysTab openModal={openModal} />}
          {activeTab === 'workspaces' && <WorkspacesTab openModal={openModal} />}
        </div>
      </div>

      {/* Modals */}
      {modalType && (
        <div className="modal-overlay" onClick={closeModal} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '12px', width: '400px', border: '1px solid var(--border)' }}>
            
            {/* Add User Modal */}
            {modalType === 'addUser' && (
              <form onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const name = fd.get('name');
                if (!name) return;
                if (window.api && window.api.addUser) {
                  await window.api.addUser({ name, email: fd.get('email'), role: fd.get('role') || 'tester' });
                  await window.api.addAuditLog({ user: 'Current Admin', action: `Added new user: ${name}`, status: 'success', timestamp: new Date().toLocaleString() });
                }
                closeModal();
                window.dispatchEvent(new Event('refresh-admin-data'));
              }}>
                <h3 style={{marginTop: 0}}>Add New Member</h3>
                <div style={{marginBottom: 12}}>
                  <label style={{display: 'block', fontSize: 12, marginBottom: 4}}>Name</label>
                  <input name="name" className="input" required autoFocus style={{width: '100%'}} />
                </div>
                <div style={{marginBottom: 12}}>
                  <label style={{display: 'block', fontSize: 12, marginBottom: 4}}>Email</label>
                  <input name="email" type="email" className="input" style={{width: '100%'}} />
                </div>
                <div style={{marginBottom: 16}}>
                  <label style={{display: 'block', fontSize: 12, marginBottom: 4}}>Role</label>
                  <select name="role" className="input" style={{width: '100%'}}>
                    <option value="tester">Tester</option>
                    <option value="qalead">QA Lead</option>
                    <option value="admin">Admin</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
                  <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add Member</button>
                </div>
              </form>
            )}

            {/* Delete User Modal */}
            {modalType === 'deleteUser' && (
              <div>
                <h3 style={{marginTop: 0, color: 'var(--danger, #ef4444)'}}>Remove Member</h3>
                <p>Are you sure you want to remove <strong>{modalData?.name}</strong>?</p>
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16}}>
                  <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                  <button type="button" className="btn btn-primary" style={{background: '#ef4444', borderColor: '#ef4444'}} onClick={async () => {
                    if (window.api && window.api.deleteUser) {
                      await window.api.deleteUser(modalData.id);
                      await window.api.addAuditLog({ user: 'Current Admin', action: `Removed user: ${modalData.name}`, status: 'warning', timestamp: new Date().toLocaleString() });
                    }
                    closeModal();
                    window.dispatchEvent(new Event('refresh-admin-data'));
                  }}>Remove</button>
                </div>
              </div>
            )}

            {/* Generate Key Modal */}
            {modalType === 'generateKey' && (
              <form onSubmit={async (e) => {
                e.preventDefault();
                const name = new FormData(e.target).get('name');
                if (!name) return;
                const rand = Math.random().toString(36).substring(2, 10);
                const mockKey = `dh_key_${rand}...${Math.random().toString(36).substring(2, 6)}`;
                if (window.api && window.api.createApiKey) {
                  await window.api.createApiKey({ name, key: mockKey, created: new Date().toLocaleDateString(), expires: 'Never' });
                }
                closeModal();
                window.dispatchEvent(new Event('refresh-admin-data'));
              }}>
                <h3 style={{marginTop: 0}}>Generate API Key</h3>
                <div style={{marginBottom: 16}}>
                  <label style={{display: 'block', fontSize: 12, marginBottom: 4}}>Integration Name</label>
                  <input name="name" className="input" required autoFocus style={{width: '100%'}} placeholder="e.g. Jenkins CI/CD" />
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
                  <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Generate</button>
                </div>
              </form>
            )}

            {/* Revoke Key Modal */}
            {modalType === 'revokeKey' && (
              <div>
                <h3 style={{marginTop: 0, color: 'var(--danger, #ef4444)'}}>Revoke API Key</h3>
                <p>Revoke this API Key? Any integrations using it will fail.</p>
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16}}>
                  <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                  <button type="button" className="btn btn-primary" style={{background: '#ef4444', borderColor: '#ef4444'}} onClick={async () => {
                    if (window.api && window.api.revokeApiKey) {
                      await window.api.revokeApiKey(modalData.id);
                    }
                    closeModal();
                    window.dispatchEvent(new Event('refresh-admin-data'));
                  }}>Revoke</button>
                </div>
              </div>
            )}

            {/* Create Workspace Modal */}
            {modalType === 'createWorkspace' && (
              <form onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const name = fd.get('name');
                if (!name) return;
                const { error } = await supabase
                  .from('workspaces')
                  .insert([{ name: name.trim() }]);
                if (error) {
                  alert('Gagal membuat workspace: ' + error.message);
                } else {
                  closeModal();
                  window.dispatchEvent(new Event('refresh-admin-data'));
                }
              }}>
                <h3 style={{marginTop: 0}}>Create Workspace</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Workspace baru akan memiliki data Projects, Test Cases, dan Bug Reports yang terpisah.</p>
                <div style={{marginBottom: 16}}>
                  <label style={{display: 'block', fontSize: 12, marginBottom: 4}}>Nama Workspace</label>
                  <input name="name" className="input" required autoFocus style={{width: '100%'}} placeholder="e.g. Client X, Tim Mobile, Sprint Q3" />
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
                  <button type="button" className="btn btn-ghost" onClick={closeModal}>Batal</button>
                  <button type="submit" className="btn btn-primary">Buat Workspace</button>
                </div>
              </form>
            )}

            {/* Invite Member Modal */}
            {modalType === 'inviteMember' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const email = fd.get('email');
                if (!email) return;
                const subject = encodeURIComponent("Undangan bergabung ke DiyahQA Hub");
                const body = encodeURIComponent(`Halo!\n\nAnda telah diundang untuk bergabung ke DiyahQA Hub.\nSilakan mendaftar di aplikasi menggunakan email ini.\n\nURL Aplikasi: ${window.location.origin}\n\nSetelah mendaftar, Admin akan mengatur akses (Role) Anda.`);
                window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                closeModal();
              }}>
                <h3 style={{marginTop: 0}}>Invite Member</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Undang anggota baru ke workspace ini. Ini akan membuka aplikasi email default Anda.</p>
                <div style={{marginBottom: 16}}>
                  <label style={{display: 'block', fontSize: 12, marginBottom: 4}}>Alamat Email</label>
                  <input name="email" type="email" className="input" required autoFocus style={{width: '100%'}} placeholder="email@perusahaan.com" />
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
                  <button type="button" className="btn btn-ghost" onClick={closeModal}>Batal</button>
                  <button type="submit" className="btn btn-primary">Buka Email</button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

function RolesTab({ openModal }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    loadUsers(); 
  }, []);

  async function loadUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  }

  async function handleRoleChange(userId, newRole) {
    // Get current logged-in user
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (currentUser && currentUser.id === userId) {
      alert('Anda tidak dapat mengubah role Anda sendiri.');
      return;
    }
    const { error } = await supabase
      .from('user_roles')
      .update({ role: newRole })
      .eq('id', userId);
    
    if (!error) {
      loadUsers();
    } else {
      alert('Gagal mengubah role. Pastikan Anda adalah Admin.');
    }
  }

  return (
    <div>
      <div className="tab-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h2>Members & Roles</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Users appear here automatically after they sign up.</p>
          </div>
          <button className="btn btn-primary" onClick={() => openModal('inviteMember')}>
            + Invite Member
          </button>
        </div>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>Loading users...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>User Email</th>
                <th>Role (RBAC)</th>
                <th>Joined At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                const roleColor = { admin: '#6366f1', editor: '#22c55e', viewer: '#64748b' }[user.role] || '#64748b';
                return (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info-cell">
                        <div className="user-avatar" style={{ textTransform: 'uppercase', background: roleColor + '33', color: roleColor, border: `1px solid ${roleColor}55` }}>
                          {user.email.charAt(0)}
                        </div>
                        <div className="user-details">
                          <span className="user-name">{user.email.split('@')[0]}</span>
                          <span className="user-email">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <select 
                        value={user.role} 
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        style={{ 
                          background: roleColor + '22', 
                          color: roleColor, 
                          border: `1px solid ${roleColor}55`, 
                          padding: '4px 8px', 
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: 12
                        }}
                      >
                        <option value="admin">👑 Administrator</option>
                        <option value="editor">✏️ Editor</option>
                        <option value="viewer">👁️ Viewer</option>
                      </select>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{new Date(user.created_at).toLocaleDateString('id-ID')}</td>
                    <td>
                      <button className="btn btn-ghost btn-icon btn-sm" disabled title="Remove via Supabase Dashboard">
                        <Trash2 size={14} color="var(--text-muted)" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '24px' }}>No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function AuditLogsTab() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { loadLogs(); }, []);

  async function loadLogs() {
    setLoading(true);
    const { data, error } = await supabase
      .from('status_history')
      .select(`
        id,
        old_status,
        new_status,
        changed_at,
        note,
        testcase_id,
        testcases ( no, title, project_id, projects ( name ) )
      `)
      .order('changed_at', { ascending: false })
      .limit(100);

    if (!error && data) setLogs(data);
    setLoading(false);
  }

  const filtered = logs.filter(log => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      log.testcases?.title?.toLowerCase().includes(q) ||
      log.testcases?.no?.toLowerCase().includes(q) ||
      log.testcases?.projects?.name?.toLowerCase().includes(q) ||
      log.new_status?.toLowerCase().includes(q) ||
      log.old_status?.toLowerCase().includes(q)
    );
  });

  const statusColor = { Pass: '#22c55e', Fail: '#ef4444', Pending: '#f59e0b', Skip: '#64748b', Blocked: '#8b5cf6' };

  return (
    <div>
      <div className="tab-header">
        <div>
          <h2>Audit Logs — Riwayat Perubahan Status</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
            Setiap perubahan status test case tercatat otomatis di sini.
          </p>
        </div>
        <div className="search-box">
          <Search size={14} />
          <input
            type="text"
            placeholder="Cari test case, project, status..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>Memuat audit logs...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
            <Shield size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
            <p>Belum ada riwayat perubahan status.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Test Case</th>
                <th>Project</th>
                <th>Perubahan Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(log => (
                <tr key={log.id}>
                  <td style={{ color: 'var(--text-muted)', fontSize: 12, whiteSpace: 'nowrap' }}>
                    {new Date(log.changed_at).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>
                      {log.testcases?.no ? `${log.testcases.no} — ` : ''}{log.testcases?.title || `TC #${log.testcase_id}`}
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {log.testcases?.projects?.name || '—'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                      <span style={{ background: (statusColor[log.old_status] || '#64748b') + '22', color: statusColor[log.old_status] || '#64748b', padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>
                        {log.old_status || '—'}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>→</span>
                      <span style={{ background: (statusColor[log.new_status] || '#64748b') + '22', color: statusColor[log.new_status] || '#64748b', padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>
                        {log.new_status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function APIKeysTab({ openModal }) {
  const [keys, setKeys] = useState([]);

  useEffect(() => { 
    loadKeys(); 
    const handleRefresh = () => loadKeys();
    window.addEventListener('refresh-admin-data', handleRefresh);
    return () => window.removeEventListener('refresh-admin-data', handleRefresh);
  }, []);

  async function loadKeys() {
    if (window.api && window.api.getApiKeys) {
      const data = await window.api.getApiKeys();
      setKeys(data);
    }
  }

  return (
    <div>
      <div className="tab-header">
        <h2>API Keys & Tokens</h2>
        <button className="btn btn-primary btn-sm" onClick={() => openModal('generateKey')} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Key size={14} /> Generate New Key
        </button>
      </div>
      
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14px' }}>
        These keys allow external applications to programmatically access your Workspaces. 
        Keep them secret.
      </p>

      <div className="admin-card-grid">
        {keys.map(key => (
          <div className="admin-card" key={key.id}>
            <div className="admin-card-header">
              <div>
                <h3 className="admin-card-title">{key.name}</h3>
                <p className="admin-card-subtitle">Expires: {key.expires}</p>
              </div>
              <div className="admin-card-icon"><Key size={16} /></div>
            </div>
            <div className="admin-card-content">
              <div className="api-key-value">
                {key.key}
                <button className="btn btn-ghost btn-icon" title="Copy to clipboard" style={{ padding: '4px', height: 'auto', minHeight: 'auto' }}>
                  <Copy size={12} />
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Created: {key.created}</span>
                <button className="btn btn-ghost btn-sm" onClick={() => openModal('revokeKey', {id: key.id})} style={{ color: '#ef4444', padding: '4px 8px' }}>Revoke</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkspacesTab({ openModal }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeWs, setActiveWs] = useState(() => localStorage.getItem('active_workspace_id'));

  useEffect(() => { loadWorkspaces(); }, []);

  async function loadWorkspaces() {
    setLoading(true);
    const { data, error } = await supabase
      .from('workspaces')
      .select('*')
      .order('created_at', { ascending: true });
    if (!error && data) setWorkspaces(data);
    setLoading(false);
  }

  async function handleSwitch(id) {
    localStorage.setItem('active_workspace_id', id);
    setActiveWs(String(id));
    // Reload page agar semua data refresh berdasarkan workspace baru
    window.location.reload();
  }

  return (
    <div>
      <div className="tab-header">
        <div>
          <h2>Multi-tenant Workspaces</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
            Setiap Workspace menyimpan data (Projects, Test Cases, Bug Reports) secara terpisah.
          </p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => openModal('createWorkspace')} style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
          <Building2 size={14} /> Create Workspace
        </button>
      </div>

      {loading ? (
        <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>Loading workspaces...</div>
      ) : workspaces.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
          <Building2 size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
          <p>Belum ada workspace. Klik "Create Workspace" untuk memulai.</p>
        </div>
      ) : (
        <div className="admin-card-grid">
          {workspaces.map(ws => {
            const isActive = String(ws.id) === String(activeWs);
            return (
              <div className="admin-card" key={ws.id} style={isActive ? { borderColor: '#6366f1', background: 'rgba(99,102,241,0.05)' } : {}}>
                <div className="admin-card-header">
                  <div>
                    <h3 className="admin-card-title">
                      {ws.name}
                      {isActive && <span style={{ marginLeft: 8, fontSize: 11, background: '#6366f1', color: 'white', padding: '2px 8px', borderRadius: 12 }}>Active</span>}
                    </h3>
                    <p className="admin-card-subtitle">ID: {ws.id} · Dibuat: {new Date(ws.created_at).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div className="admin-card-icon" style={isActive ? { background: '#6366f1', color: 'white' } : {}}>
                    {isActive ? <Check size={16} /> : <Building2 size={16} />}
                  </div>
                </div>
                <div style={{ marginTop: 16 }}>
                  {isActive ? (
                    <div style={{ fontSize: 12, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Check size={13} /> Workspace aktif saat ini
                    </div>
                  ) : (
                    <button className="btn btn-ghost btn-sm" onClick={() => handleSwitch(ws.id)} style={{ width: '100%' }}>
                      Switch ke Workspace Ini
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
