import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SCHEMAS } from './sqlSchemas';
import { SEED_SQL } from './sqlSeedData';
import { CHALLENGES } from './sqlChallenges';
import './SQLLab.css';

// ─── SQL execution using sql.js in renderer via IPC ──────────────────────────
// We use window.api.runSQL which will be added to preload

function formatValue(val) {
  if (val === null || val === undefined) return <span className="result-null">NULL</span>;
  return String(val);
}

function ResultTable({ result }) {
  if (!result) return <div className="result-empty">Jalankan query untuk melihat hasil</div>;
  if (result.error) return <div className="result-error">❌ {result.error}</div>;
  if (!result.columns?.length) return <div className="result-empty">✅ Query berhasil (0 baris dikembalikan)</div>;
  return (
    <table className="result-table">
      <thead>
        <tr>{result.columns.map(c => <th key={c}>{c}</th>)}</tr>
      </thead>
      <tbody>
        {result.rows.map((row, i) => (
          <tr key={i}>
            {result.columns.map(c => <td key={c}>{formatValue(row[c])}</td>)}
          </tr>
        ))}
        {result.rows.length === 0 && (
          <tr><td colSpan={result.columns.length} className="result-empty">0 baris ditemukan</td></tr>
        )}
      </tbody>
    </table>
  );
}

// ─── Playground Tab ───────────────────────────────────────────────────────────
function PlaygroundTab({ activeSchema, onSchemaChange }) {
  const [query, setQuery] = useState('SELECT * FROM employees LIMIT 10;');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [execTime, setExecTime] = useState(null);
  const [explainResult, setExplainResult] = useState(null);
  const schema = SCHEMAS[activeSchema];

  const runQuery = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    const start = performance.now();
    try {
      const res = await window.api.runSQL({ schema: activeSchema, query });
      setExecTime(Math.round(performance.now() - start));
      setResult(res);
      setExplainResult(null);
    } catch (e) {
      setResult({ error: e.message });
    }
    setLoading(false);
  }, [query, activeSchema]);

  const runExplain = async () => {
    const q = query.trim().toUpperCase();
    if (!q.startsWith('SELECT')) return alert('EXPLAIN hanya untuk SELECT query');
    const explainQuery = 'EXPLAIN QUERY PLAN ' + query;
    const res = await window.api.runSQL({ schema: activeSchema, query: explainQuery });
    setExplainResult(res);
  };

  const insertTemplate = (tpl) => setQuery(q => q + (q.endsWith('\n') || !q ? '' : '\n') + tpl);

  useEffect(() => {
    setResult(null);
    setExplainResult(null);
    const tbl = Object.keys(SCHEMAS[activeSchema].tables)[0];
    setQuery(`SELECT * FROM ${tbl} LIMIT 10;`);
  }, [activeSchema]);

  const perf = result && !result.error ? getPerfTips(query) : null;

  return (
    <div className="playground-layout">
      {/* Schema Panel */}
      <div className="schema-panel">
        <h4>📋 {schema.label}</h4>
        {Object.entries(schema.tables).map(([tblName, tbl]) => (
          <div key={tblName} className="schema-table-item">
            <div className="schema-table-name" onClick={() => insertTemplate(`SELECT * FROM ${tblName} LIMIT 10;`)}>
              📁 {tblName}
            </div>
            <div className="schema-col-list">
              {tbl.columns.map(col => (
                <div key={col.name} className="schema-col-item">
                  {col.pk && <span className="schema-col-pk">🔑</span>}
                  <span>{col.name}</span>
                  <span className="schema-col-type">{col.type}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Editor + Result */}
      <div className="editor-area">
        <div className="sql-editor-wrapper">
          <textarea
            className="sql-editor"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); runQuery(); } }}
            placeholder="Tulis SQL query di sini..."
            spellCheck={false}
          />
          <div className="editor-toolbar">
            <button className="btn btn-primary btn-sm" onClick={runQuery} disabled={loading}>
              {loading ? '⏳ Running...' : '▶ Run (⌘+Enter)'}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={runExplain}>🔍 Explain</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setQuery('')}>Clear</button>
            <span className="editor-hint">⌘+Enter untuk run</span>
          </div>
        </div>

        <div className="result-panel">
          <div className="result-header">
            <span className="result-title">📊 Result</span>
            <span className="result-count">
              {result && !result.error && `${result.rows?.length || 0} baris`}
              {execTime !== null && ` · ${execTime}ms`}
            </span>
          </div>
          <ResultTable result={result} />
          {perf && <div className="perf-tip">💡 {perf}</div>}
          {explainResult && !explainResult.error && (
            <div className="perf-explain">
              <strong>EXPLAIN QUERY PLAN:</strong><br />
              {explainResult.rows?.map((r, i) => <div key={i}>{JSON.stringify(r)}</div>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getPerfTips(query) {
  const q = query.toUpperCase();
  if (q.includes('SELECT *')) return 'Tip: Hindari SELECT * di production — pilih kolom yang diperlukan saja untuk performa lebih baik.';
  if (!q.includes('WHERE') && (q.includes('JOIN') || q.includes('FROM'))) return 'Tip: Query tanpa WHERE clause akan scan semua data. Tambahkan filter jika memungkinkan.';
  if (q.includes('LIKE') && q.includes("'%")) return 'Tip: LIKE dengan % di awal (wildcard prefix) tidak bisa menggunakan index. Pertimbangkan full-text search.';
  if (q.split('JOIN').length > 3) return 'Tip: Banyak JOIN dalam satu query bisa lambat. Pertimbangkan untuk memecah query atau menggunakan index.';
  return null;
}

// ─── Challenges Tab ───────────────────────────────────────────────────────────
function ChallengesTab({ activeSchema, onSchemaChange, progress, onSolve }) {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [compareResult, setCompareResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const filtered = CHALLENGES.filter(c => c.schema === activeSchema);
  const selected = CHALLENGES.find(c => c.id === selectedId);

  const selectChallenge = (c) => {
    setSelectedId(c.id);
    setQuery('');
    setResult(null);
    setCompareResult(null);
    setShowSolution(false);
    if (c.schema !== activeSchema) onSchemaChange(c.schema);
  };

  const runAndValidate = async () => {
    if (!query.trim() || !selected) return;
    setLoading(true);
    try {
      const res = await window.api.runSQL({ schema: selected.schema, query });
      const expectedRes = await window.api.runSQL({ schema: selected.schema, query: selected.solution });
      setResult(res);
      setCompareResult(expectedRes);

      // Validate
      const isCorrect = !res.error &&
        res.rows?.length === expectedRes.rows?.length &&
        JSON.stringify(res.columns?.sort()) === JSON.stringify(expectedRes.columns?.sort());

      if (isCorrect || (selected.validate && selected.validate(res.rows || []))) {
        if (!progress.solved.includes(selectedId)) {
          onSolve(selectedId, query, true);
          alert('🎉 Benar! Challenge berhasil diselesaikan!');
        }
      } else {
        onSolve(selectedId, query, false);
      }
    } catch (e) {
      setResult({ error: e.message });
    }
    setLoading(false);
  };

  const diffCount = { easy: 0, medium: 0, hard: 0 };
  filtered.forEach(c => diffCount[c.difficulty]++);
  const solvedCount = filtered.filter(c => progress.solved.includes(c.id)).length;

  return (
    <div className="challenge-layout">
      {/* Challenge List */}
      <div className="challenge-list-panel">
        <div className="challenge-list-header">
          <span>Challenges ({filtered.length})</span>
          <span>{solvedCount}/{filtered.length} ✅</span>
        </div>
        {filtered.map(c => (
          <div
            key={c.id}
            className={`challenge-item ${selectedId === c.id ? 'active' : ''} ${progress.solved.includes(c.id) ? 'solved' : ''}`}
            onClick={() => selectChallenge(c)}
          >
            <div className="challenge-item-title">
              {progress.solved.includes(c.id) ? '✅ ' : '🔲 '}{c.title}
            </div>
            <div className="challenge-meta">
              <span className={`challenge-diff diff-${c.difficulty}`}>{c.difficulty}</span>
              <span className="challenge-category">{c.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Challenge Detail */}
      <div className="challenge-detail-panel">
        {!selected ? (
          <div className="result-empty" style={{ padding: 40 }}>
            Pilih challenge dari daftar di kiri untuk memulai
          </div>
        ) : (
          <>
            <div className="challenge-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="challenge-title">{selected.title}</div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <span className={`challenge-diff diff-${selected.difficulty}`}>{selected.difficulty}</span>
                    <span className="challenge-category">📁 {selected.category}</span>
                  </div>
                </div>
                {progress.solved.includes(selected.id) && <span style={{ fontSize: 24 }}>✅</span>}
              </div>
              <div className="challenge-desc">{selected.description}</div>
              <div className="challenge-hint">💡 Hint: {selected.hint}</div>
            </div>

            <div className="sql-editor-wrapper">
              <textarea
                className="sql-editor"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); runAndValidate(); } }}
                placeholder="Tulis SQL query kamu di sini..."
                spellCheck={false}
              />
              <div className="editor-toolbar">
                <button className="btn btn-primary btn-sm" onClick={runAndValidate} disabled={loading || !query.trim()}>
                  {loading ? '⏳' : '▶ Submit'}
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => setShowSolution(s => !s)}>
                  {showSolution ? '🙈 Hide' : '👁 Show Solution'}
                </button>
              </div>
            </div>

            {showSolution && (
              <div className="result-panel">
                <div className="result-header"><span className="result-title">📖 Solution</span></div>
                <div style={{ padding: 12, fontFamily: 'monospace', fontSize: 12, color: '#22c55e' }}>
                  {selected.solution}
                </div>
              </div>
            )}

            {result && (
              <div className="challenge-result-compare">
                <div className="compare-panel">
                  <div className="compare-panel-title actual">Your Result ({result.rows?.length || 0} rows)</div>
                  <div style={{ maxHeight: 200, overflow: 'auto' }}><ResultTable result={result} /></div>
                </div>
                <div className="compare-panel">
                  <div className="compare-panel-title expected">Expected ({compareResult?.rows?.length || 0} rows)</div>
                  <div style={{ maxHeight: 200, overflow: 'auto' }}><ResultTable result={compareResult} /></div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Progress Tab ─────────────────────────────────────────────────────────────
function ProgressTab({ progress }) {
  const solved = CHALLENGES.filter(c => progress.solved.includes(c.id));
  const byDiff = { easy: 0, medium: 0, hard: 0 };
  solved.forEach(c => byDiff[c.difficulty]++);
  const pct = Math.round((solved.length / CHALLENGES.length) * 100);

  return (
    <div className="sqllab-container" style={{ padding: 0 }}>
      <div className="progress-stats">
        <div className="card stat-card stat-accent">
          <span className="stat-icon">🎯</span>
          <div><div className="stat-value">{solved.length}/{CHALLENGES.length}</div><div className="stat-label">Solved</div></div>
        </div>
        <div className="card stat-card stat-success">
          <span className="stat-icon">✅</span>
          <div><div className="stat-value">{pct}%</div><div className="stat-label">Completion</div></div>
        </div>
        <div className="card stat-card stat-warning">
          <span className="stat-icon">📝</span>
          <div><div className="stat-value">{progress.history?.length || 0}</div><div className="stat-label">Attempts</div></div>
        </div>
        <div className="card stat-card stat-danger">
          <span className="stat-icon">🔥</span>
          <div><div className="stat-value">{byDiff.hard}</div><div className="stat-label">Hard Solved</div></div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 14, marginBottom: 12, color: 'var(--text-secondary)' }}>📜 Query History</h3>
        <div className="progress-history">
          {(!progress.history || progress.history.length === 0) ? (
            <div className="result-empty">Belum ada history. Coba jalankan query atau selesaikan challenge!</div>
          ) : (
            [...progress.history].reverse().map((h, i) => (
              <div key={i} className="history-row">
                <span className={`history-status-badge ${h.correct ? 'status-correct' : h.correct === false ? 'status-wrong' : 'status-run'}`}>
                  {h.correct ? '✅' : h.correct === false ? '❌' : '▶'}
                </span>
                <span className="history-query">{h.query}</span>
                <span className="history-time">{new Date(h.ts).toLocaleTimeString('id-ID')}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main SQLLabPage ──────────────────────────────────────────────────────────
export default function SQLLabPage() {
  const [activeTab, setActiveTab] = useState('playground');
  const [activeSchema, setActiveSchema] = useState('hr');
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sqllab_progress') || '{"solved":[],"history":[]}');
    } catch { return { solved: [], history: [] }; }
  });

  const saveProgress = (p) => {
    setProgress(p);
    localStorage.setItem('sqllab_progress', JSON.stringify(p));
  };

  const handleSolve = (id, query, correct) => {
    const newProgress = {
      ...progress,
      solved: correct && !progress.solved.includes(id) ? [...progress.solved, id] : progress.solved,
      history: [...(progress.history || []), { id, query, correct, ts: Date.now() }].slice(-100),
    };
    saveProgress(newProgress);
  };

  return (
    <div className="sqllab-container">
      <div className="sqllab-header">
        <div>
          <h1 className="page-title">🧪 QA SQL Lab</h1>
          <p className="page-subtitle">Interactive SQL playground & challenges untuk QA Engineer</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--text-muted)' }}>
          {progress.solved.length}/{CHALLENGES.length} challenges selesai
        </div>
      </div>

      {/* Schema Selector */}
      <div className="schema-selector">
        {Object.entries({ hr: '👥 HR System', ecommerce: '🛒 E-Commerce', banking: '🏦 Banking' }).map(([key, label]) => (
          <button
            key={key}
            className={`schema-btn ${activeSchema === key ? 'active' : ''}`}
            onClick={() => setActiveSchema(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="sqllab-tabs">
        {[
          { key: 'playground', label: '▶ Playground' },
          { key: 'challenges', label: `🎯 Challenges (${progress.solved.length}/${CHALLENGES.length})` },
          { key: 'progress', label: '📈 Progress' },
        ].map(t => (
          <button key={t.key} className={`sqllab-tab ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {activeTab === 'playground' && <PlaygroundTab activeSchema={activeSchema} onSchemaChange={setActiveSchema} />}
        {activeTab === 'challenges' && <ChallengesTab activeSchema={activeSchema} onSchemaChange={setActiveSchema} progress={progress} onSolve={handleSolve} />}
        {activeTab === 'progress' && <ProgressTab progress={progress} />}
      </div>
    </div>
  );
}
