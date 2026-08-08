import React, { useState, useEffect } from 'react';

const STATUS_OPTIONS = ['Pending', 'Pass', 'Fail', 'Skip', 'Blocked'];

const emptyForm = {
  no: '', title: '', website: '', module: '', section: '',
  test_data: '', scenario: '', expected_result: '',
  status: 'Pending', evidence: '', note: ''
};

export default function TestCaseModal({ testcase, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (testcase) setForm({ ...emptyForm, ...testcase });
    else setForm(emptyForm);
  }, [testcase]);

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return alert('Title wajib diisi');
    onSave(form);
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{testcase ? 'Edit Test Case' : 'Tambah Test Case'}</h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>No TC</label>
              <input placeholder="CNA-001" value={form.no} onChange={e => set('no', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}>
                {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Title *</label>
            <input placeholder="Nama test case" value={form.title} onChange={e => set('title', e.target.value)} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Website</label>
              <input placeholder="ATS V6 / Careersite" value={form.website} onChange={e => set('website', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Module</label>
              <input placeholder="Nama module" value={form.module} onChange={e => set('module', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>Section</label>
            <input placeholder="Section / sub-module" value={form.section} onChange={e => set('section', e.target.value)} />
          </div>

          <div className="form-group">
            <label>Test Data</label>
            <textarea placeholder="Data yang digunakan untuk testing" value={form.test_data} onChange={e => set('test_data', e.target.value)} />
          </div>

          <div className="form-group">
            <label>Scenario (Steps)</label>
            <textarea
              rows={4}
              placeholder="1. Login ke sistem&#10;2. Buka menu...&#10;3. Klik tombol..."
              value={form.scenario}
              onChange={e => set('scenario', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Expected Result</label>
            <textarea placeholder="Hasil yang diharapkan" value={form.expected_result} onChange={e => set('expected_result', e.target.value)} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Evidence (URL / path)</label>
              <input placeholder="Link screenshot / video" value={form.evidence} onChange={e => set('evidence', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Note</label>
              <input placeholder="Positive Case / Negative Case / Edge Case" value={form.note} onChange={e => set('note', e.target.value)} />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
            <button type="submit" className="btn btn-primary">
              {testcase ? 'Update' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
