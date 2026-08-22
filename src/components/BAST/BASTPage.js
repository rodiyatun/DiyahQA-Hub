import React, { useState, useEffect } from 'react';
import { Plus, Search, FileText, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import './BASTPage.css';

export default function BASTPage({ projects }) {
  const [basts, setBasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ project_id: '', bast_number: '', document_date: '', signed_by: '', notes: '', status: 'Menunggu TTD' });

  useEffect(() => {
    loadBasts();
  }, []);

  async function loadBasts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bast_documents')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setBasts(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      let bastNum = formData.bast_number;
      if (!bastNum && formData.project_id) {
        // Auto generate if empty
        const { count } = await supabase.from('bast_documents').select('*', { count: 'exact', head: true }).eq('project_id', formData.project_id);
        const year = new Date().getFullYear();
        bastNum = `BAST-${year}-${String((count || 0) + 1).padStart(3, '0')}`;
      }

      const { error } = await supabase.from('bast_documents').insert([{
        ...formData,
        bast_number: bastNum,
        document_date: formData.document_date || new Date().toISOString().split('T')[0]
      }]);
      if (error) throw error;
      
      setShowModal(false);
      setFormData({ project_id: '', bast_number: '', document_date: '', signed_by: '', notes: '', status: 'Menunggu TTD' });
      loadBasts();
    } catch (err) {
      alert('Gagal menyimpan BAST: ' + err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Hapus dokumen BAST ini?')) return;
    try {
      const { error } = await supabase.from('bast_documents').delete().eq('id', id);
      if (error) throw error;
      loadBasts();
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  }

  const filtered = basts.filter(b => 
    b.bast_number?.toLowerCase().includes(search.toLowerCase()) || 
    projects.find(p => p.id === b.project_id)?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bast-page">
      <div className="bast-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Berita Acara Serah Terima (BAST)</h1>
          <p className="page-subtitle">Kelola dokumen serah terima hasil pengujian aplikasi.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Buat BAST
        </button>
      </div>

      <div className="card">
        <div className="search-bar" style={{ marginBottom: 16 }}>
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Cari nomor BAST atau project..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="empty-chart">Memuat data...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-chart">Tidak ada data BAST ditemukan.</div>
        ) : (
          <table className="table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>No BAST</th>
                <th style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>Project</th>
                <th style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>Tanggal</th>
                <th style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>Ditandatangani Oleh</th>
                <th style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>Status</th>
                <th style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => {
                const proj = projects.find(p => p.id === b.project_id);
                return (
                  <tr key={b.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 600 }}>{b.bast_number}</td>
                    <td style={{ padding: '12px 8px' }}>{proj ? proj.name : 'Unknown Project'}</td>
                    <td style={{ padding: '12px 8px' }}>{b.document_date ? new Date(b.document_date).toLocaleDateString('id-ID') : '-'}</td>
                    <td style={{ padding: '12px 8px' }}>{b.signed_by || '-'}</td>
                    <td style={{ padding: '12px 8px' }}>
                      {b.status === 'Selesai' ? (
                        <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content' }}>
                          <CheckCircle size={12} /> Selesai
                        </span>
                      ) : (
                        <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content' }}>
                          <Clock size={12} /> Menunggu TTD
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-ghost btn-icon btn-sm" title="Lihat PDF">
                          <FileText size={14} />
                        </button>
                        <button className="btn btn-ghost btn-icon btn-sm" title="Hapus" onClick={() => handleDelete(b.id)} style={{ color: 'var(--danger)' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <h2>Buat BAST Baru</h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave} className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label>Project *</label>
                <select 
                  className="input" 
                  required
                  value={formData.project_id}
                  onChange={e => setFormData({...formData, project_id: e.target.value})}
                >
                  <option value="">Pilih Project...</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>No BAST (Opsional, otomatis jika kosong)</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Contoh: BAST-2026-001"
                  value={formData.bast_number}
                  onChange={e => setFormData({...formData, bast_number: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Tanggal Dokumen *</label>
                <input 
                  type="date" 
                  className="input" 
                  required
                  value={formData.document_date}
                  onChange={e => setFormData({...formData, document_date: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Ditandatangani Oleh</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Nama Klien / Product Owner"
                  value={formData.signed_by}
                  onChange={e => setFormData({...formData, signed_by: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  className="input" 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Menunggu TTD">Menunggu TTD</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
              <div className="modal-footer" style={{ marginTop: 8 }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan BAST</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
