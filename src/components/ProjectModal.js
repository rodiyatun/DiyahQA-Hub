import React, { useState, useEffect } from 'react';

export default function ProjectModal({ project, onSave, onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (project) {
      setName(project.name || '');
      setDescription(project.description || '');
    }
  }, [project]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return alert('Nama project wajib diisi');
    onSave(project ? { id: project.id, name, description } : { name, description });
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 480 }}>
        <div className="modal-header">
          <h2 className="modal-title">{project ? 'Edit Project' : 'Buat Project Baru'}</h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama Project *</label>
            <input
              placeholder="Contoh: CNA Module, Register Flow"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="form-group">
            <label>Deskripsi (opsional)</label>
            <textarea
              placeholder="Deskripsi singkat project ini..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
            <button type="submit" className="btn btn-primary">
              {project ? 'Update' : 'Buat Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
