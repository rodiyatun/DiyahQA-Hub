import React, { useState, useEffect, useCallback } from 'react';
import TestCaseModal from './TestCaseModal';
import TestCaseDetailModal from './TestCaseDetailModal';
import AITestCaseGenerator from './AITestCaseGenerator';
import GeneratePlaywrightModal from './GeneratePlaywrightModal';
import DesignPRDPanel from './DesignPRDPanel';
import TutorialPanel from './TutorialPanel';
import Papa from 'papaparse';
import { useAuth } from '../contexts/AuthContext';
import { useWorkspace } from '../contexts/WorkspaceContext';
import { BugCategoryBadge } from './BugClassifier';
import { supabase } from '../lib/supabaseClient';
import { exportToPDF } from '../utils/pdfExport';
import { isDesktop } from '../utils/platform';
import './TestCaseList.css';

const STATUS_OPTIONS = ['Pending', 'Pass', 'Fail', 'Skip', 'Blocked'];

export default function TestCaseList({ project, onCreateBugFromTC }) {
  const [testcases, setTestcases] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterModule, setFilterModule] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTC, setEditingTC] = useState(null);
  const [detailTC, setDetailTC] = useState(null);
  const [selected, setSelected] = useState([]);
  const [sortField, setSortField] = useState('no');
  const [sortDir, setSortDir] = useState('asc');
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [playwrightTC, setPlaywrightTC] = useState(null);
  const [activeTab, setActiveTab] = useState('testcases'); // testcases | design
  const [showColMenu, setShowColMenu] = useState(false);
  const [visibleCols, setVisibleCols] = useState({
    no: true, title: true, module: true, section: false,
    status: true, note: false, actions: true
  });
  function toggleCol(col) { setVisibleCols(p => ({ ...p, [col]: !p[col] })); }
  const COL_LABELS = { no: 'No', title: 'Title', module: 'Module', section: 'Section', status: 'Status', note: 'Note', actions: 'Actions' };

  const { role, user } = useAuth();
  const { activeWorkspaceId } = useWorkspace();

  useEffect(() => { loadTestcases(); }, [project]);

  useEffect(() => {
    let result = [...testcases];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(tc =>
        tc.title?.toLowerCase().includes(q) ||
        tc.no?.toLowerCase().includes(q) ||
        tc.module?.toLowerCase().includes(q) ||
        tc.section?.toLowerCase().includes(q)
      );
    }
    if (filterStatus) result = result.filter(tc => tc.status === filterStatus);
    if (filterModule) result = result.filter(tc => tc.module === filterModule);
    result.sort((a, b) => {
      const av = String(a[sortField] || '');
      const bv = String(b[sortField] || '');
      // Use numeric sorting so that TC-2 comes before TC-10
      return sortDir === 'asc' 
        ? av.localeCompare(bv, undefined, { numeric: true, sensitivity: 'base' }) 
        : bv.localeCompare(av, undefined, { numeric: true, sensitivity: 'base' });
    });
    setFiltered(result);
  }, [testcases, search, filterStatus, filterModule, sortField, sortDir]);

  async function loadTestcases() {
    try {
      // Paginate to bypass Supabase 1000-row default limit
      let allData = [];
      let from = 0;
      const pageSize = 1000;
      while (true) {
        let query = supabase
          .from('testcases')
          .select('*')
          .eq('project_id', project.id)
          .order('created_at', { ascending: false })
          .order('id', { ascending: true }) // Deterministic sort for pagination
          .range(from, from + pageSize - 1);

        if (activeWorkspaceId) {
          query = query.or(`workspace_id.eq.${activeWorkspaceId},workspace_id.is.null`);
        }

        const { data, error } = await query;
        if (error) throw error;
        if (!data || data.length === 0) break;
        allData = [...allData, ...data];
        if (data.length < pageSize) break;
        from += pageSize;
      }

      setTestcases(allData);
      setSelected([]);
    } catch (err) {
      console.error(err);
      setTestcases([]);
    }
  }

  async function handleSave(data) {
    try {
      if (editingTC) {
        const { error } = await supabase.from('testcases').update(data).eq('id', editingTC.id);
        if (error) throw error;
      } else {
        const insertData = {
          ...data,
          project_id: project.id,
          workspace_id: activeWorkspaceId || null,
          created_by: user?.id || null,
        };
        const { error } = await supabase.from('testcases').insert([insertData]);
        if (error) throw error;
      }
      await loadTestcases();
      setShowModal(false);
      setEditingTC(null);
    } catch (err) {
      alert("Error saving test case: " + err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Hapus test case ini?')) return;
    try {
      const { error } = await supabase.from('testcases').delete().eq('id', id);
      if (error) throw error;
      await loadTestcases();
    } catch (err) {
      alert("Error deleting test case: " + err.message);
    }
  }

  async function handleBulkDelete() {
    if (!window.confirm(`Hapus ${selected.length} test case?`)) return;
    try {
      for (const id of selected) {
        await supabase.from('testcases').delete().eq('id', id);
      }
      await loadTestcases();
    } catch (err) {
      alert("Error deleting test cases: " + err.message);
    }
  }

  async function handleStatusChange(tc, newStatus) {
    try {
      const { error } = await supabase.from('testcases').update({ status: newStatus }).eq('id', tc.id);
      if (error) throw error;
      await loadTestcases();
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  }

  async function handleImport() {
    const csv = await window.api.openFileDialog();
    if (!csv) return;
    const result = await window.api.importCSV({ projectId: project.id, csvText: csv });
    await loadTestcases();
    alert(`✅ Berhasil import ${result.imported} test case`);
  }

  async function handleImportAllure() {
    const files = await window.api.openJsonDialog();
    if (!files || !files.length) return;

    let totalImported = 0;
    let totalSkipped = 0;
    const allErrors = [];

    for (const file of files) {
      const result = await window.api.importAllure({
        projectId: project.id,
        jsonText: file.content,
      });
      totalImported += result.imported || 0;
      totalSkipped += result.skipped || 0;
      if (result.errors?.length) {
        allErrors.push(`[${file.name}] ${result.errors.slice(0, 3).join(', ')}`);
      }
    }

    await loadTestcases();
    const msg = `✅ Import Allure selesai:\n${totalImported} test case berhasil, ${totalSkipped} dilewati.` +
      (allErrors.length ? `\n\nError:\n${allErrors.join('\n')}` : '');
    alert(msg);
  }

  async function handleExportAllure() {
    // Export semua yang terfilter, atau yang dipilih (jika ada selection)
    const idsToExport = selected.length > 0 ? selected : null;
    const result = await window.api.exportAllureJson({
      projectId: project.id,
      testcaseIds: idsToExport,
    });

    if (result?.canceled) return;
    if (!result?.success) {
      alert('❌ Export gagal: ' + (result?.error || 'Unknown error'));
      return;
    }
    alert(
      `✅ Export Allure selesai!\n` +
      `${result.exported} test case di-export ke:\n` +
      `${result.outputDir}\n\n` +
      `File summary: allure-results-summary.json\n\n` +
      `Untuk generate report:\nallure serve ${result.outputDir}`
    );
  }

  async function handleExportCSV() {
    const data = filtered.map(tc => ({
      No: tc.no, Title: tc.title, Website: tc.website, Module: tc.module,
      Section: tc.section, 'Test Data': tc.test_data, Scenario: tc.scenario,
      'Expected Result': tc.expected_result, Status: tc.status,
      Evidence: tc.evidence, Note: tc.note
    }));
    const csv = Papa.unparse(data);
    await window.api.saveFileDialog({
      defaultName: `${project.name}-testcases.csv`,
      content: csv
    });
  }

  async function handleExportPDF() {
    const headers = ['No', 'Module', 'Title', 'Scenario', 'Status'];
    const body = filtered.map(tc => [
      tc.no || '-',
      tc.module || '-',
      tc.title || '-',
      tc.scenario || '-',
      tc.status || '-'
    ]);
    exportToPDF(`${project.name} - Test Cases Report`, headers, body, `${project.name}-testcases.pdf`);
  }

  async function handleAIGeneratorInsert(generatedTCs) {
    let count = 0;
    for (const tc of generatedTCs) {
      await window.api.createTestcase({
        project_id: project.id,
        no: '',
        title: tc.title || '',
        module: tc.module || '',
        section: tc.section || '',
        scenario: tc.scenario || '',
        expected_result: tc.expected_result || '',
        test_data: tc.test_data || '',
        note: tc.note || '',
        status: 'Pending',
        website: '',
        evidence: '',
      });
      count++;
    }
    await loadTestcases();
    setShowAIGenerator(false);
    alert(`✅ ${count} test case berhasil di-generate dan ditambahkan ke project!`);
  }

  function toggleSelect(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }

  function toggleSelectAll() {
    setSelected(prev => prev.length === filtered.length ? [] : filtered.map(tc => tc.id));
  }

  const modules = [...new Set(testcases.map(tc => tc.module).filter(Boolean))];

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = testcases.filter(tc => tc.status === s).length;
    return acc;
  }, {});

  return (
    <div className="tc-container">
      {/* Header */}
      <div className="tc-header">
        <div>
          <h1 className="page-title">{project.name}</h1>
          {project.description && (
            <p className="page-subtitle">{project.description}</p>
          )}
        </div>
        <div className="tc-header-actions">
          {/* Tab switcher */}
          <div style={{ display: 'flex', gap: 4, marginRight: 8, border: '1px solid var(--border)', borderRadius: 8, padding: 2 }}>
            {[
              { id: 'testcases', label: '📋 Test Cases' },
              { id: 'design',    label: '📐 Design & PRD' },
            ].map(t => (
              <button key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '4px 12px', borderRadius: 6, border: 'none', fontSize: 11, cursor: 'pointer', fontWeight: activeTab === t.id ? 600 : 400,
                  background: activeTab === t.id ? 'var(--accent)' : 'none',
                  color: activeTab === t.id ? '#fff' : 'var(--text-muted)',
                  transition: 'all 0.15s',
                }}>
                {t.label}
              </button>
            ))}
          </div>
          <TutorialPanel menuKey={activeTab === 'design' ? 'designprd' : 'testcases'} />
          {activeTab === 'testcases' && (<>
          {isDesktop() && (
            <>
              <button className="btn btn-secondary btn-sm" onClick={handleImport}>
                📥 Import CSV
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleImportAllure}>
                🧪 Import Allure
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleExportCSV}>
                📤 Export CSV
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleExportPDF}>
                📄 Export PDF
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleExportAllure}>
                🧪 Export Allure
              </button>
            </>
          )}
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowAIGenerator(true)}
            style={{ background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.4)', color: '#818cf8' }}
          >
            🤖 AI Generate TC
          </button>
          {role !== 'viewer' && (
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            + Tambah TC
          </button>
          )}
          </>)}
        </div>
      </div>

      {/* Design & PRD Tab */}
      {activeTab === 'design' && (
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          <DesignPRDPanel project={project} />
        </div>
      )}

      {/* Test Cases Tab */}
      {activeTab === 'testcases' && (
      <React.Fragment>

      {/* Status Summary Bar */}
      <div className="status-bar">
        <div className="status-bar-item">
          <span className="status-bar-num">{testcases.length}</span>
          <span className="status-bar-label">Total</span>
        </div>
        {STATUS_OPTIONS.map(s => (
          <div key={s} className={`status-bar-item status-bar-${s.toLowerCase()}`}>
            <span className="status-bar-num">{counts[s] || 0}</span>
            <span className="status-bar-label">{s}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="tc-filters">
        <input
          className="search-input"
          placeholder="🔍  Search No, Title, Module, Section..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filterModule} onChange={e => setFilterModule(e.target.value)}>
          <option value="">All Module</option>
          {modules.map(m => <option key={m}>{m}</option>)}
        </select>
        {selected.length > 0 && role === 'admin' && (
          <button className="btn btn-danger btn-sm" onClick={handleBulkDelete}>
            🗑️ Delete ({selected.length})
          </button>
        )}
        <span className="tc-count">{filtered.length} TC</span>

        {/* Column toggle */}
        <div style={{ marginLeft: 'auto', position: 'relative' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowColMenu(v => !v)}
            title="Show/Hide columns"
          >⊞ Kolom</button>
          {showColMenu && (
            <div style={{
              position: 'absolute', top: '110%', right: 0, background: 'var(--bg-secondary, #1e293b)',
              border: '1px solid var(--border)', borderRadius: 8, padding: '8px 0',
              zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,0.4)', minWidth: 150
            }}>
              {Object.keys(COL_LABELS).map(col => (
                <label key={col} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 16px', cursor: 'pointer', fontSize: 13,
                  color: 'var(--text-primary)'
                }}>
                  <input
                    type="checkbox" checked={visibleCols[col]}
                    onChange={() => toggleCol(col)}
                    style={{ width: 'auto', accentColor: '#6366f1' }}
                  />
                  {COL_LABELS[col]}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="tc-table-wrapper">
        <table className="tc-table">
          <thead>
            <tr>
              <th style={{ width: 32 }}>
                <input
                  type="checkbox"
                  checked={selected.length === filtered.length && filtered.length > 0}
                  onChange={toggleSelectAll}
                  style={{ width: 'auto', cursor: 'pointer' }}
                />
              </th>
              {visibleCols.no      && <th style={{ width: 70 }}>No</th>}
              {visibleCols.title   && <th>Title</th>}
              {visibleCols.module  && <th style={{ width: 110 }}>Module</th>}
              {visibleCols.section && <th style={{ width: 120 }}>Section</th>}
              {visibleCols.status  && <th style={{ width: 110 }}>Status</th>}
              {visibleCols.note    && <th style={{ width: 100 }}>Note</th>}
              {visibleCols.actions && <th style={{ width: 80 }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="empty-row">
                  {testcases.length === 0
                    ? 'Belum ada test case. Klik "Tambah TC" atau Import CSV.'
                    : 'Tidak ada hasil yang cocok dengan filter.'}
                </td>
              </tr>
            )}
            {filtered.map(tc => (
              <tr
                key={tc.id}
                className={selected.includes(tc.id) ? 'selected' : ''}
                onClick={() => setDetailTC(tc)}
              >
                <td onClick={e => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selected.includes(tc.id)}
                    onChange={() => toggleSelect(tc.id)}
                    style={{ width: 'auto', cursor: 'pointer' }}
                  />
                </td>
                {visibleCols.no      && <td className="tc-no">{tc.no || '—'}</td>}
                {visibleCols.title   && <td className="tc-title">{tc.title}</td>}
                {visibleCols.module  && <td className="tc-module">{tc.module || '—'}</td>}
                {visibleCols.section && <td className="tc-section">{tc.section || '—'}</td>}
                {visibleCols.status  && (
                  <td onClick={e => e.stopPropagation()}>
                    <select
                      className={`status-select status-${tc.status?.toLowerCase()}`}
                      value={tc.status}
                      onChange={e => handleStatusChange(tc, e.target.value)}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                )}
                {visibleCols.note    && <td className="tc-note">{tc.note || '—'}</td>}
                {visibleCols.actions && (
                  <td onClick={e => e.stopPropagation()}>
                    <div className="tc-actions">
                      {tc.status === 'Fail' && onCreateBugFromTC && (
                        <button
                          className="btn btn-ghost btn-icon btn-sm"
                          onClick={(e) => { e.stopPropagation(); onCreateBugFromTC(tc); }}
                          title="Buat Bug Report"
                          style={{ color: '#ef4444' }}
                        >🐛</button>
                      )}
                      <button
                        className="btn btn-ghost btn-icon btn-sm"
                        onClick={(e) => { e.stopPropagation(); setPlaywrightTC(tc); }}
                        title="Generate Playwright script"
                        style={{ color: '#a78bfa' }}
                      >🎭</button>
                      {role !== 'viewer' && (
                      <button
                        className="btn btn-ghost btn-icon btn-sm"
                        onClick={() => { setEditingTC(tc); setShowModal(true); }}
                        title="Edit"
                      >✏️</button>
                      )}
                      {role === 'admin' && (
                      <button
                        className="btn btn-ghost btn-icon btn-sm"
                        onClick={() => handleDelete(tc.id)}
                        title="Delete"
                        style={{ color: 'var(--danger)' }}
                      >🗑️</button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <TestCaseModal
          testcase={editingTC}
          projectId={project.id}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingTC(null); }}
        />
      )}
      {detailTC && (
        <TestCaseDetailModal
          testcase={detailTC}
          onClose={() => setDetailTC(null)}
          onEdit={() => { setEditingTC(detailTC); setDetailTC(null); setShowModal(true); }}
          onCreateBugFromTC={onCreateBugFromTC}
        />
      )}
      {showAIGenerator && (
        <AITestCaseGenerator
          project={project}
          onInsert={handleAIGeneratorInsert}
          onClose={() => setShowAIGenerator(false)}
        />
      )}
      {playwrightTC && (
        <GeneratePlaywrightModal
          testcase={playwrightTC}
          onClose={() => setPlaywrightTC(null)}
        />
      )}
      </React.Fragment>)}
    </div>
  );
}
