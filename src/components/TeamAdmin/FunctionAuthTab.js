import React, { useState } from 'react';
import { Shield, Plus, Edit2, ArrowLeft, Save, Trash2, CheckCircle, XCircle } from 'lucide-react';

const MODULES_DEF = [
  {
    module: 'QA Hub',
    subModules: ['Dashboard', 'Bug Reports', 'Teams & Admin']
  },
  {
    module: 'Testing Labs',
    subModules: [
      'Performance Lab', 
      'API Lab', 
      'Automation Lab', 
      'CI/CD Lab', 
      'Security Lab', 
      'SQL Lab', 
      'Doc Lab'
    ]
  },
  {
    module: 'QA Management',
    subModules: ['Environments', 'Test Plans', 'Requirements', 'TC Library']
  }
];

// Initial mock data
const INITIAL_ROLES = [
  { id: 'r1', group: 'Admin (Built-in)', type: 'Admin', status: 'Active', permissions: {} },
  { id: 'r2', group: 'QA Tester', type: 'Employee', status: 'Active', permissions: {} },
  { id: 'r3', group: 'Viewer Only', type: 'Guest', status: 'Active', permissions: {} }
];

export default function FunctionAuthTab() {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [view, setView] = useState('list'); // 'list' | 'form'
  const [editingRole, setEditingRole] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    group: '',
    type: 'Employee',
    status: 'Active',
    permissions: {} // { 'Dashboard': { view: true, create: false, ... } }
  });

  const handleAddNew = () => {
    setFormData({ group: '', type: 'Employee', status: 'Active', permissions: {} });
    setEditingRole(null);
    setView('form');
  };

  const handleEdit = (role) => {
    setFormData(JSON.parse(JSON.stringify(role)));
    setEditingRole(role.id);
    setView('form');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this role authorization?')) {
      setRoles(roles.filter(r => r.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.group) return alert('Role name is required');
    if (editingRole) {
      setRoles(roles.map(r => r.id === editingRole ? { ...formData, id: editingRole } : r));
    } else {
      setRoles([...roles, { ...formData, id: 'r' + Date.now() }]);
    }
    setView('list');
  };

  const togglePermission = (subModule, action) => {
    setFormData(prev => {
      const perms = { ...prev.permissions };
      if (!perms[subModule]) perms[subModule] = { view: false, create: false, update: false, delete: false };
      perms[subModule][action] = !perms[subModule][action];
      return { ...prev, permissions: perms };
    });
  };

  const toggleModuleAll = (subModule) => {
    setFormData(prev => {
      const perms = { ...prev.permissions };
      const current = perms[subModule] || {};
      const isAllChecked = current.view && current.create && current.update && current.delete;
      perms[subModule] = {
        view: !isAllChecked,
        create: !isAllChecked,
        update: !isAllChecked,
        delete: !isAllChecked
      };
      return { ...prev, permissions: perms };
    });
  };

  if (view === 'form') {
    return (
      <div className="function-auth-form">
        <div className="tab-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="btn btn-ghost btn-icon" onClick={() => setView('list')}><ArrowLeft size={16} /></button>
            <h2>{editingRole ? 'Edit Function Authorization' : 'Add New Function Authorization'}</h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Save size={14} /> Save Authorization
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>User Group (Role Name)</label>
            <input className="input" value={formData.group} onChange={e => setFormData({...formData, group: e.target.value})} placeholder="e.g. QA Manager" />
          </div>
          <div className="form-group" style={{ width: 200 }}>
            <label>User Type</label>
            <select className="input" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option>Employee</option>
              <option>Admin</option>
              <option>Guest</option>
              <option>Contractor</option>
            </select>
          </div>
          <div className="form-group" style={{ width: 150 }}>
            <label>Status</label>
            <select className="input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="admin-table-container" style={{ background: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border)', overflowX: 'auto' }}>
          <table className="admin-table" style={{ width: '100%', tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '13.75%' }} />
              <col style={{ width: '13.75%' }} />
              <col style={{ width: '13.75%' }} />
              <col style={{ width: '13.75%' }} />
            </colgroup>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
                <th>Module Name</th>
                <th>Sub Module Name</th>
                <th style={{ textAlign: 'center' }}>View</th>
                <th style={{ textAlign: 'center' }}>Create</th>
                <th style={{ textAlign: 'center' }}>Update</th>
                <th style={{ textAlign: 'center' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {MODULES_DEF.map((mod, modIdx) => (
                <React.Fragment key={mod.module}>
                  {mod.subModules.map((sub, subIdx) => {
                    const p = formData.permissions[sub] || {};
                    return (
                      <tr key={sub} style={{ borderTop: subIdx === 0 && modIdx !== 0 ? '1px solid var(--border)' : 'none' }}>
                        <td style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                          {subIdx === 0 ? mod.module : ''}
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 12 }}>
                            <input type="checkbox" checked={p.view && p.create && p.update && p.delete} onChange={() => toggleModuleAll(sub)} />
                            <span>{sub}</span>
                          </div>
                        </td>
                        <td style={{ textAlign: 'center' }}><input type="checkbox" checked={p.view || false} onChange={() => togglePermission(sub, 'view')} /></td>
                        <td style={{ textAlign: 'center' }}><input type="checkbox" checked={p.create || false} onChange={() => togglePermission(sub, 'create')} /></td>
                        <td style={{ textAlign: 'center' }}><input type="checkbox" checked={p.update || false} onChange={() => togglePermission(sub, 'update')} /></td>
                        <td style={{ textAlign: 'center' }}><input type="checkbox" checked={p.delete || false} onChange={() => togglePermission(sub, 'delete')} /></td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="tab-header">
        <div>
          <h2>Function Authorization</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Manage function access permissions based on user roles.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleAddNew} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Plus size={14} /> Add New Function Authorization
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User Group</th>
              <th>User Type</th>
              <th>Status</th>
              <th style={{ width: 100, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.id}>
                <td style={{ fontWeight: 500 }}>{role.group}</td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: role.type === 'Admin' ? '#3b82f6' : '#a855f7' }} />
                    {role.type}
                  </span>
                </td>
                <td>
                  <span style={{ color: role.status === 'Active' ? '#22c55e' : '#ef4444', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {role.status === 'Active' ? <CheckCircle size={14} /> : <XCircle size={14} />} {role.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-ghost btn-icon btn-sm" onClick={() => handleEdit(role)} title="Edit"><Edit2 size={14} /></button>
                  <button className="btn btn-ghost btn-icon btn-sm" onClick={() => handleDelete(role.id)} title="Delete" style={{ color: 'var(--danger)' }}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
