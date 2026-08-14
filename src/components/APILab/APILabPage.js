import React, { useState, useEffect } from 'react';
import { API_LESSONS, HTTP_METHODS, STATUS_CODE_MAP } from './apiData';
import { runAssertions, generatePlaywrightTest, generateTestSuite, generateDataDrivenTest, parseOpenAPI, formatJson, formatSize, statusClass, parsePostmanCollection } from './apiUtils';
import TutorialPanel from '../TutorialPanel';
import { isWeb } from '../../utils/platform';
import { Globe } from 'lucide-react';
import './APILab.css';

// ─── Shared: JSON Viewer ──────────────────────────────────────────────────────
function JsonViewer({ value }) {
  if (!value) return null;
  let parsed;
  try { parsed = JSON.parse(value); } catch { return <div className="json-viewer" style={{ color: '#94a3b8' }}>{value}</div>; }

  function render(val, depth = 0) {
    const indent = '  '.repeat(depth);
    if (val === null)    return <span className="json-null">null</span>;
    if (val === true || val === false) return <span className="json-bool">{String(val)}</span>;
    if (typeof val === 'number') return <span className="json-number">{val}</span>;
    if (typeof val === 'string') return <span className="json-string">"{val}"</span>;
    if (Array.isArray(val)) {
      if (val.length === 0) return <span>{'[]'}</span>;
      return (
        <span>
          {'[\n'}
          {val.map((item, i) => (
            <span key={i}>{indent}  {render(item, depth + 1)}{i < val.length - 1 ? ',' : ''}{'\n'}</span>
          ))}
          {indent}{']'}
        </span>
      );
    }
    if (typeof val === 'object') {
      const keys = Object.keys(val);
      if (keys.length === 0) return <span>{'{}'}</span>;
      return (
        <span>
          {'{\n'}
          {keys.map((k, i) => (
            <span key={k}>{indent}  <span className="json-key">"{k}"</span>: {render(val[k], depth + 1)}{i < keys.length - 1 ? ',' : ''}{'\n'}</span>
          ))}
          {indent}{'}'}
        </span>
      );
    }
    return <span>{String(val)}</span>;
  }

  return <div className="json-viewer">{render(parsed)}</div>;
}

// ─── Tab: API Learning ────────────────────────────────────────────────────────
function LearningTab() {
  const categories = [...new Set(API_LESSONS.map(l => l.category))];
  const [activeCat, setActiveCat] = useState(categories[0]);
  const [activeLesson, setActiveLesson] = useState(API_LESSONS[0].id);
  const lesson = API_LESSONS.find(l => l.id === activeLesson);

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      {/* Sidebar */}
      <div style={{ width: 200, flexShrink: 0 }}>
        {categories.map(cat => (
          <div key={cat}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '8px 8px 4px', letterSpacing: '0.05em' }}>{cat}</div>
            {API_LESSONS.filter(l => l.category === cat).map(l => (
              <button key={l.id}
                style={{ width: '100%', textAlign: 'left', padding: '7px 12px', borderRadius: 8, border: 'none', background: activeLesson === l.id ? 'rgba(6,182,212,0.1)' : 'none', color: activeLesson === l.id ? '#06b6d4' : 'var(--text-secondary)', fontSize: 12, cursor: 'pointer', fontWeight: activeLesson === l.id ? 600 : 400 }}
                onClick={() => setActiveLesson(l.id)}>
                {l.title}
              </button>
            ))}
          </div>
        ))}
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', maxHeight: 'calc(100vh - 220px)' }}>
        {lesson && (
          <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 24 }}>
            <h2 style={{ fontSize: 18, color: 'var(--text-primary)', marginBottom: 16 }}>{lesson.title}</h2>
            {lesson.content && <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: 16 }}>{lesson.content}</p>}
            {lesson.keyPoints && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Key Points</div>
                {lesson.keyPoints.map((p, i) => (
                  <div key={i} style={{ padding: '7px 12px', background: 'rgba(6,182,212,0.05)', borderLeft: '3px solid #06b6d4', borderRadius: '0 6px 6px 0', fontSize: 12, color: 'var(--text-secondary)' }}>→ {p}</div>
                ))}
              </div>
            )}
            {lesson.table && (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginBottom: 16 }}>
                <thead>
                  <tr>{Object.keys(lesson.table[0]).map(k => <th key={k} style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', padding: '8px 12px', textAlign: 'left', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k}</th>)}</tr>
                </thead>
                <tbody>
                  {lesson.table.map((row, i) => (
                    <tr key={i}>{Object.values(row).map((v, j) => <td key={j} style={{ padding: '8px 12px', borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{v}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            )}
            {lesson.example && (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Contoh</div>
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, padding: 16, fontFamily: 'monospace', fontSize: 12, color: '#94a3b8', whiteSpace: 'pre', overflowX: 'auto' }}>{lesson.example}</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Storage helpers ──────────────────────────────────────────────────────────
const COLLECTION_KEY = 'apilab_collections';
const ENV_KEY        = 'apilab_environments';

function loadCollections() { try { return JSON.parse(localStorage.getItem(COLLECTION_KEY) || '[]'); } catch { return []; } }
function saveCollections(c) { localStorage.setItem(COLLECTION_KEY, JSON.stringify(c)); }
function loadEnvs() { try { return JSON.parse(localStorage.getItem(ENV_KEY) || JSON.stringify([{ id: 'default', name: 'Default', vars: [] }])); } catch { return [{ id: 'default', name: 'Default', vars: [] }]; } }
function saveEnvs(e) { localStorage.setItem(ENV_KEY, JSON.stringify(e)); }

function applyEnvVars(str, vars) {
  if (!str || !vars || !vars.length) return str;
  let result = str;
  vars.forEach(v => { if (v.key && v.value) result = result.replaceAll(`{{${v.key}}}`, v.value); });
  return result;
}

// ─── KV Editor (headers/params) ──────────────────────────────────────────────
function KVEditor({ rows, onChange, placeholder = 'key' }) {
  function update(i, field, val) {
    const next = rows.map((r, idx) => idx === i ? { ...r, [field]: val } : r);
    onChange(next);
  }
  function remove(i) { onChange(rows.filter((_, idx) => idx !== i)); }
  function add()     { onChange([...rows, { key: '', value: '' }]); }

  return (
    <div>
      {rows.map((r, i) => (
        <div key={i} className="kv-row">
          <input placeholder={placeholder} value={r.key}   onChange={e => update(i, 'key', e.target.value)} />
          <input placeholder="value"       value={r.value} onChange={e => update(i, 'value', e.target.value)} />
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => remove(i)} style={{ color: 'var(--danger)', flexShrink: 0 }}>✕</button>
        </div>
      ))}
      <button className="btn btn-secondary btn-sm" onClick={add}>+ Tambah</button>
    </div>
  );
}

// ─── Tab: Request Builder (Manual Testing) ───────────────────────────────────
function RequestBuilderTab({ envVars, initialRequest, onRequestLoaded }) {
  const [method, setMethod]       = useState('GET');
  const [url, setUrl]             = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [reqTab, setReqTab]       = useState('params');
  const [params, setParams]       = useState([]);
  const [headers, setHeaders]     = useState([{ key: 'Content-Type', value: 'application/json' }]);
  const [body, setBody]           = useState('');
  const [assertions, setAssertions] = useState([{ id: 1, type: 'status', operator: '==', value: '200', path: '' }]);
  const [response, setResponse]   = useState(null);
  const [loading, setLoading]     = useState(false);
  const [assertResults, setAssertResults] = useState([]);
  const [resTab, setResTab]       = useState('body');
  const [collections, setCollections] = useState(loadCollections);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [saveTarget, setSaveTarget] = useState({ collection: '', name: '' });

  // Load request from collection when initialRequest changes
  useEffect(() => {
    if (initialRequest) {
      setMethod(initialRequest.method || 'GET');
      setUrl(initialRequest.url || '');
      setParams(initialRequest.params || []);
      setHeaders(initialRequest.headers?.length ? initialRequest.headers : [{ key: 'Content-Type', value: 'application/json' }]);
      setBody(initialRequest.body || '');
      setAssertions(initialRequest.assertions?.length ? initialRequest.assertions : [{ id: Date.now(), type: 'status', operator: '==', value: '200', path: '' }]);
      setResponse(null);
      setAssertResults([]);
      if (onRequestLoaded) onRequestLoaded();
    }
  }, [initialRequest]); // eslint-disable-line react-hooks/exhaustive-deps

  function buildFinalUrl() {
    const base = applyEnvVars(url, envVars);
    if (!params.filter(p => p.key).length) return base;
    const qs = params.filter(p => p.key).map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(applyEnvVars(p.value, envVars))}`).join('&');
    return `${base}${base.includes('?') ? '&' : '?'}${qs}`;
  }

  async function sendRequest() {
    setLoading(true);
    setResponse(null);
    setAssertResults([]);
    try {
      const finalUrl   = buildFinalUrl();
      const finalHeaders = headers.filter(h => h.key).reduce((acc, h) => { acc[applyEnvVars(h.key, envVars)] = applyEnvVars(h.value, envVars); return acc; }, {});
      const finalBody  = body ? applyEnvVars(body, envVars) : undefined;
      const res = await window.api.apiRequest({ method, url: finalUrl, headers: finalHeaders, body: finalBody });
      setResponse(res);
      if (assertions.length) {
        setAssertResults(runAssertions(assertions, res));
      }
      setResTab('body');
    } catch (e) {
      setResponse({ ok: false, error: e.message, status: 0, body: '', headers: {}, duration: 0 });
    } finally {
      setLoading(false);
    }
  }

  function saveToCollection() {
    const colls = loadCollections();
    let targetColl = colls.find(c => c.name === saveTarget.collection);
    if (!targetColl) {
      targetColl = { id: Date.now(), name: saveTarget.collection || 'My Collection', requests: [] };
      colls.push(targetColl);
    }
    targetColl.requests = targetColl.requests || [];
    targetColl.requests.push({ id: Date.now(), name: saveTarget.name || `${method} ${url}`, method, url, params, headers, body, assertions });
    saveCollections(colls);
    setCollections(colls);
    setSaveModalOpen(false);
  }

  function handleGenerateTest() {
    const code = generatePlaywrightTest({ method, url, headers, body }, assertions, { baseUrl: url.split('/').slice(0, 3).join('/') });
    window.api.saveTextFile({ defaultName: 'api.spec.ts', content: code });
  }

  const statusCode = response?.status;

  return (
    <div className="request-builder">
      {/* URL Bar */}
      <div className="url-bar">
        <select value={method} onChange={e => setMethod(e.target.value)}>
          {HTTP_METHODS.map(m => <option key={m}>{m}</option>)}
        </select>
        <input value={url} onChange={e => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          onKeyDown={e => e.key === 'Enter' && sendRequest()} />
        <button className="btn btn-primary" onClick={sendRequest} disabled={loading} style={{ flexShrink: 0 }}>
          {loading ? <span className="spinning">⟳</span> : '▶ Send'}
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => setSaveModalOpen(true)} style={{ flexShrink: 0 }}>💾 Save</button>
        <button className="btn btn-secondary btn-sm" onClick={handleGenerateTest} style={{ flexShrink: 0 }}>🤖 Generate</button>
      </div>

      {/* Request Config Tabs */}
      <div style={{ border: '1px solid var(--border)', borderRadius: 10, background: 'var(--bg-card)', overflow: 'hidden' }}>
        <div className="req-tabs" style={{ padding: '0 12px', background: 'var(--bg-secondary)' }}>
          {['params', 'headers', 'body', 'assertions'].map(t => (
            <button key={t} className={`req-tab ${reqTab === t ? 'active' : ''}`} onClick={() => setReqTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
              {t === 'assertions' && assertions.length > 0 && <span style={{ marginLeft: 4, fontSize: 10, background: 'var(--accent)', color: '#fff', borderRadius: 8, padding: '1px 5px' }}>{assertions.length}</span>}
            </button>
          ))}
        </div>
        <div style={{ padding: 14 }}>
          {reqTab === 'params' && <KVEditor rows={params} onChange={setParams} placeholder="param name" />}
          {reqTab === 'headers' && <KVEditor rows={headers} onChange={setHeaders} />}
          {reqTab === 'body' && (
            <textarea value={body} onChange={e => setBody(e.target.value)} rows={6}
              style={{ width: '100%', fontFamily: 'monospace', fontSize: 12, background: '#0f172a', color: '#94a3b8', border: '1px solid #1e293b', borderRadius: 8, padding: 12, resize: 'vertical' }}
              placeholder='{"key": "value"}' />
          )}
          {reqTab === 'assertions' && (
            <AssertionBuilder assertions={assertions} onChange={setAssertions} />
          )}
        </div>
      </div>

      {/* Response */}
      {response && (
        <div className="response-panel">
          <div className="response-header">
            {response.error
              ? <span style={{ color: '#ef4444' }}>❌ {response.error}</span>
              : <>
                  <span className={statusClass(statusCode)} style={{ fontSize: 14 }}>
                    {statusCode} {STATUS_CODE_MAP[statusCode] || response.statusText}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>⏱ {response.duration}ms</span>
                  <span style={{ color: 'var(--text-muted)' }}>📦 {formatSize(response.size)}</span>
                  {assertResults.length > 0 && (
                    <span>
                      {assertResults.filter(a => a.passed).length}/{assertResults.length} assertions passed
                    </span>
                  )}
                </>
            }
          </div>
          {!response.error && (
            <>
              <div className="req-tabs" style={{ padding: '0 12px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                {['body', 'headers', 'assertions'].map(t => (
                  <button key={t} className={`req-tab ${resTab === t ? 'active' : ''}`} onClick={() => setResTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
                ))}
              </div>
              <div style={{ padding: 16, background: '#0f172a', maxHeight: 320, overflow: 'auto' }}>
                {resTab === 'body' && <JsonViewer value={response.body} />}
                {resTab === 'headers' && (
                  <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#94a3b8' }}>
                    {Object.entries(response.headers || {}).map(([k, v]) => (
                      <div key={k}><span style={{ color: '#60a5fa' }}>{k}</span>: {v}</div>
                    ))}
                  </div>
                )}
                {resTab === 'assertions' && assertResults.map((a, i) => (
                  <div key={i} className={`assertion-result ${a.passed ? 'assertion-pass' : 'assertion-fail'}`}>
                    <span>{a.passed ? '✅' : '❌'}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{a.message}</span>
                    {!a.passed && a.actual !== undefined && <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>actual: {a.actual}</span>}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Save Modal */}
      {saveModalOpen && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setSaveModalOpen(false)}>
          <div className="modal" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 className="modal-title">Simpan ke Collection</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setSaveModalOpen(false)}>✕</button>
            </div>
            <div className="form-group"><label>Collection</label>
              <input value={saveTarget.collection} onChange={e => setSaveTarget(p => ({ ...p, collection: e.target.value }))} placeholder="Nama collection (baru atau existing)" list="coll-list" />
              <datalist id="coll-list">{collections.map(c => <option key={c.id} value={c.name} />)}</datalist>
            </div>
            <div className="form-group"><label>Nama Request</label>
              <input value={saveTarget.name} onChange={e => setSaveTarget(p => ({ ...p, name: e.target.value }))} placeholder={`${method} ${url}`} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSaveModalOpen(false)}>Batal</button>
              <button className="btn btn-primary" onClick={saveToCollection}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Assertion Builder ────────────────────────────────────────────────────────
function AssertionBuilder({ assertions, onChange }) {
  function add() {
    onChange([...assertions, { id: Date.now(), type: 'status', operator: '==', value: '200', path: '', key: '' }]);
  }
  function remove(id) { onChange(assertions.filter(a => a.id !== id)); }
  function update(id, field, val) { onChange(assertions.map(a => a.id === id ? { ...a, [field]: val } : a)); }

  return (
    <div>
      {assertions.map(a => (
        <div key={a.id} className="assertion-row">
          <select value={a.type} onChange={e => update(a.id, 'type', e.target.value)} style={{ width: 110 }}>
            <option value="status">Status Code</option>
            <option value="body">Body Text</option>
            <option value="jsonpath">JSON Path</option>
            <option value="header">Header</option>
            <option value="duration">Duration</option>
          </select>
          {a.type === 'jsonpath' && <input placeholder="$.data.id" value={a.path} onChange={e => update(a.id, 'path', e.target.value)} style={{ width: 110 }} />}
          {a.type === 'header' && <input placeholder="content-type" value={a.key || ''} onChange={e => update(a.id, 'key', e.target.value)} style={{ width: 110 }} />}
          <select value={a.operator} onChange={e => update(a.id, 'operator', e.target.value)} style={{ width: 90 }}>
            <option value="==">equals</option>
            <option value="!=">not equals</option>
            <option value="contains">contains</option>
            <option value="exists">exists</option>
            <option value="length">length</option>
            <option value="<">less than</option>
            <option value=">">greater than</option>
          </select>
          {a.operator !== 'exists' && (
            <input placeholder="expected value" value={a.value} onChange={e => update(a.id, 'value', e.target.value)} style={{ flex: 1 }} />
          )}
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => remove(a.id)} style={{ color: 'var(--danger)' }}>✕</button>
        </div>
      ))}
      <button className="btn btn-secondary btn-sm" onClick={add}>+ Add Assertion</button>
    </div>
  );
}

// ─── Tab: Collection Manager ──────────────────────────────────────────────────
function CollectionTab({ onLoadRequest }) {
  const [collections, setCollections] = useState(loadCollections);
  const [expandedColl, setExpandedColl] = useState(null);
  const [importing, setImporting]     = useState(false);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');

  async function handleImportPostman() {
    setImporting(true);
    setImportError('');
    setImportSuccess('');
    try {
      const text = await window.api.openJsonDialog();
      if (!text || !text.length) { setImporting(false); return; }

      let totalImported = 0;
      const errors = [];

      for (const file of text) {
        const result = parsePostmanCollection(file.content);
        if (!result.ok) {
          errors.push(`${file.name}: ${result.error}`);
          continue;
        }
        // Merge atau tambah collection
        const existing = loadCollections();
        const alreadyExists = existing.findIndex(c => c.name === result.name);
        if (alreadyExists >= 0) {
          // Merge requests
          const merged = [...existing];
          merged[alreadyExists] = {
            ...merged[alreadyExists],
            requests: [...(merged[alreadyExists].requests || []), ...result.requests],
          };
          saveCollections(merged);
          setCollections(merged);
        } else {
          const updated = [...existing, result];
          saveCollections(updated);
          setCollections(updated);
        }
        totalImported += result.requests.length;
      }

      if (totalImported > 0) {
        setImportSuccess(`✅ ${totalImported} request berhasil diimport dari ${text.length} file.`);
      }
      if (errors.length) {
        setImportError(errors.join('\n'));
      }
    } catch (e) {
      setImportError(e.message);
    } finally {
      setImporting(false);
    }
  }

  async function handleImportJson() {
    setImportError('');
    setImportSuccess('');
    try {
      const text = await window.api.openJsonDialog();
      if (!text || !text.length) return;
      for (const file of text) {
        try {
          const data = JSON.parse(file.content);
          // DiyahQA native format (array or single collection object)
          const colls = Array.isArray(data) ? data : [data];
          const existing = loadCollections();
          const merged = [...existing];
          for (const c of colls) {
            if (!c.name || !Array.isArray(c.requests)) continue;
            const idx = merged.findIndex(x => x.name === c.name);
            if (idx >= 0) {
              merged[idx] = { ...merged[idx], requests: [...(merged[idx].requests || []), ...(c.requests || [])] };
            } else {
              merged.push({ ...c, id: c.id || Date.now() });
            }
          }
          saveCollections(merged);
          setCollections(merged);
          setImportSuccess(`✅ Collection "${colls.map(c => c.name).join(', ')}" berhasil diimport.`);
        } catch (e) {
          setImportError(`${file.name}: ${e.message}`);
        }
      }
    } catch (e) {
      setImportError(e.message);
    }
  }

  function deleteCollection(id) {
    const updated = loadCollections().filter(c => c.id !== id);
    saveCollections(updated);
    setCollections(updated);
  }

  function deleteRequest(collId, reqId) {
    const updated = loadCollections().map(c => c.id === collId
      ? { ...c, requests: c.requests.filter(r => r.id !== reqId) } : c);
    saveCollections(updated);
    setCollections(updated);
  }

  function exportCollection(coll) {
    const content = JSON.stringify(coll, null, 2);
    window.api.saveTextFile({ defaultName: `${coll.name}.json`, content, filters: [{ name: 'JSON', extensions: ['json'] }] });
  }

  function generateSuite(coll) {
    const code = generateTestSuite(coll);
    window.api.saveTextFile({ defaultName: `${coll.name.replace(/\s+/g, '-')}.spec.ts`, content: code });
  }

  // Group requests by folder
  function groupByFolder(requests) {
    const grouped = {};
    for (const req of requests || []) {
      const folder = req.folder || '';
      if (!grouped[folder]) grouped[folder] = [];
      grouped[folder].push(req);
    }
    return grouped;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Import toolbar */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', padding: '10px 14px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>📥 Import Collection</span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={handleImportPostman}
          disabled={importing}
          style={{ display: 'flex', alignItems: 'center', gap: 5 }}
        >
          {importing ? '⏳' : '📬'} Postman Collection (.json)
        </button>
        <button className="btn btn-secondary btn-sm" onClick={handleImportJson}>
          📄 DiyahQA Collection (.json)
        </button>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 }}>
          Mendukung Postman Collection v2.0 & v2.1
        </span>
      </div>

      {importSuccess && (
        <div style={{ padding: '8px 12px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, fontSize: 12, color: '#22c55e' }}>
          {importSuccess}
        </div>
      )}
      {importError && (
        <div style={{ padding: '8px 12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, fontSize: 12, color: '#ef4444', whiteSpace: 'pre-wrap' }}>
          ❌ {importError}
        </div>
      )}

      {collections.length === 0 && (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, border: '1px dashed var(--border)', borderRadius: 12 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
          <div>Belum ada collection.</div>
          <div style={{ fontSize: 11, marginTop: 4 }}>Import dari Postman atau simpan request dari tab Manual Testing → klik "Save".</div>
        </div>
      )}

      {collections.map(coll => {
        const grouped = groupByFolder(coll.requests);
        const folders = Object.keys(grouped);
        return (
          <div key={coll.id} style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', overflow: 'hidden' }}>
            {/* Collection header */}
            <div style={{ padding: '12px 16px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, cursor: 'pointer', flex: 1, textAlign: 'left' }}
                onClick={() => setExpandedColl(expandedColl === coll.id ? null : coll.id)}
              >
                {expandedColl === coll.id ? '▼' : '▶'} 📁 {coll.name}
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400, marginLeft: 6 }}>
                  ({(coll.requests || []).length} requests)
                </span>
                {coll.source === 'postman' && (
                  <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 10, background: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)', marginLeft: 8 }}>
                    Postman
                  </span>
                )}
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => generateSuite(coll)}>🤖 Generate Suite</button>
              <button className="btn btn-secondary btn-sm" onClick={() => exportCollection(coll)}>📤 Export</button>
              <button className="btn btn-ghost btn-icon btn-sm" onClick={() => deleteCollection(coll.id)} style={{ color: 'var(--danger)' }}>🗑️</button>
            </div>

            {/* Requests (with folder grouping) */}
            {expandedColl === coll.id && (
              <div>
                {folders.map(folder => (
                  <div key={folder}>
                    {folder && (
                      <div style={{ padding: '5px 16px 3px 24px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', background: 'rgba(0,0,0,0.1)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        📂 {folder}
                      </div>
                    )}
                    {grouped[folder].map(req => (
                      <div key={req.id} className="collection-item" style={{ paddingLeft: folder ? 32 : 16 }}
                        onClick={() => onLoadRequest && onLoadRequest(req)}>
                        <span className={`method-badge method-${req.method}`}>{req.method}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="collection-name">{req.name}</div>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {req.url}
                          </div>
                        </div>
                        <button className="btn btn-ghost btn-icon btn-sm"
                          onClick={e => { e.stopPropagation(); deleteRequest(coll.id, req.id); }}
                          style={{ color: 'var(--danger)', flexShrink: 0 }}>🗑️</button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Tab: Environment Variables ───────────────────────────────────────────────
function EnvironmentTab({ onEnvChange }) {
  const [envs, setEnvs]         = useState(loadEnvs);
  const [activeEnv, setActiveEnv] = useState(envs[0]?.id || '');
  const [newEnvName, setNewEnvName] = useState('');

  const currentEnv = envs.find(e => e.id === activeEnv) || envs[0];

  function updateVars(vars) {
    const updated = envs.map(e => e.id === activeEnv ? { ...e, vars } : e);
    setEnvs(updated);
    saveEnvs(updated);
    if (onEnvChange) onEnvChange(vars);
  }

  function addEnv() {
    if (!newEnvName.trim()) return;
    const env = { id: Date.now().toString(), name: newEnvName.trim(), vars: [] };
    const updated = [...envs, env];
    setEnvs(updated);
    saveEnvs(updated);
    setActiveEnv(env.id);
    setNewEnvName('');
  }

  function deleteEnv(id) {
    const updated = envs.filter(e => e.id !== id);
    setEnvs(updated);
    saveEnvs(updated);
    if (activeEnv === id) setActiveEnv(updated[0]?.id || '');
  }

  useEffect(() => {
    if (onEnvChange && currentEnv) onEnvChange(currentEnv.vars);
  }, [activeEnv]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Env tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {envs.map(e => (
          <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button className={`env-tab-btn ${activeEnv === e.id ? 'active' : ''}`} onClick={() => setActiveEnv(e.id)}>{e.name}</button>
            {envs.length > 1 && <button className="btn btn-ghost btn-icon btn-sm" onClick={() => deleteEnv(e.id)} style={{ color: 'var(--danger)', fontSize: 10 }}>✕</button>}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
          <input value={newEnvName} onChange={e => setNewEnvName(e.target.value)} placeholder="Nama environment baru" style={{ fontSize: 12 }}
            onKeyDown={e => e.key === 'Enter' && addEnv()} />
          <button className="btn btn-secondary btn-sm" onClick={addEnv}>+ Tambah</button>
        </div>
      </div>

      {currentEnv && (
        <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
            Variables — {currentEnv.name}
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400, marginLeft: 8 }}>Gunakan {'{{variableName}}'} di URL, headers, atau body</span>
          </div>
          <KVEditor rows={currentEnv.vars} onChange={updateVars} placeholder="variableName" />
          <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: 8, fontSize: 12, color: 'var(--text-muted)' }}>
            Contoh: set <code>BASE_URL</code> = <code>https://api.staging.example.com</code>, lalu gunakan <code>{'{{BASE_URL}}'}/users</code> di URL
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: OpenAPI / Swagger Import ───────────────────────────────────────────
function OpenAPITab() {
  const [input, setInput]       = useState('');
  const [parsed, setParsed]     = useState(null);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter]     = useState('');
  const [error, setError]       = useState('');

  function handleParse() {
    setError('');
    const result = parseOpenAPI(input);
    if (!result.ok) { setError(result.error); return; }
    setParsed(result);
    setSelected(null);
  }

  async function handleUpload() {
    const text = await window.api.openFileDialog();
    if (text) { setInput(text); setError(''); }
  }

  function loadToBuilder(ep) {
    // Copy endpoint to clipboard as curl for now
    const headers = ep.headers.map(h => `-H "${h.key}: ${h.value}"`).join(' ');
    const qs = ep.queryParams.filter(p => p.key).map(p => `${p.key}=${p.value}`).join('&');
    const curl = `curl -X ${ep.method} "${ep.url}${qs ? '?' + qs : ''}" ${headers}`.trim();
    navigator.clipboard.writeText(curl);
    alert('✅ cURL command disalin ke clipboard! Kamu bisa paste ke terminal.');
  }

  const endpoints = parsed?.endpoints || [];
  const filtered  = filter ? endpoints.filter(e => e.path.toLowerCase().includes(filter.toLowerCase()) || e.name.toLowerCase().includes(filter.toLowerCase())) : endpoints;
  const tags = [...new Set(endpoints.flatMap(e => e.tags))];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {!parsed && (
        <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 14, color: 'var(--text-primary)' }}>📋 Import OpenAPI / Swagger JSON</h3>
            <button className="btn btn-secondary btn-sm" onClick={handleUpload}>📂 Upload File</button>
          </div>
          <textarea value={input} onChange={e => { setInput(e.target.value); setError(''); }}
            style={{ width: '100%', minHeight: 180, fontFamily: 'monospace', fontSize: 12, background: '#0f172a', color: '#e2e8f0', border: '1px solid #1e293b', borderRadius: 8, padding: 12, resize: 'vertical' }}
            placeholder={'Paste OpenAPI 3.0 atau Swagger 2.0 JSON di sini...\n\n{\n  "openapi": "3.0.0",\n  "info": { "title": "My API" },\n  "paths": { ... }\n}'} />
          {error && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>⚠️ {error}</div>}
          <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }} onClick={handleParse} disabled={!input.trim()}>🔍 Parse Spec</button>
        </div>
      )}

      {parsed && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{parsed.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>v{parsed.version} · {parsed.baseUrl} · {endpoints.length} endpoints</div>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => { setParsed(null); setSelected(null); setInput(''); }}>← Upload lain</button>
          </div>
          <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="🔍 Filter endpoint..." style={{ fontSize: 13 }} />
          <div style={{ display: 'flex', gap: 16, minHeight: 0 }}>
            <div style={{ width: 320, flexShrink: 0, overflow: 'auto', maxHeight: 'calc(100vh - 300px)' }}>
              {filtered.map(ep => (
                <div key={ep.id} className="openapi-endpoint" style={{ border: selected?.id === ep.id ? '1px solid #06b6d4' : undefined }}
                  onClick={() => setSelected(ep)}>
                  <span className={`method-badge method-${ep.method}`}>{ep.method}</span>
                  <div>
                    <div className="openapi-path">{ep.path}</div>
                    <div className="openapi-summary">{ep.name}</div>
                  </div>
                </div>
              ))}
            </div>
            {selected && (
              <div style={{ flex: 1, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: 20, overflow: 'auto', maxHeight: 'calc(100vh - 300px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <span className={`method-badge method-${selected.method}`} style={{ fontSize: 12, padding: '3px 10px' }}>{selected.method}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: 14, color: 'var(--text-primary)', marginLeft: 8 }}>{selected.path}</span>
                  </div>
                  <button className="btn btn-secondary btn-sm" onClick={() => loadToBuilder(selected)}>📋 Copy cURL</button>
                </div>
                {selected.description && <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>{selected.description}</p>}
                {selected.queryParams.length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Query Parameters</div>
                    {selected.queryParams.map(p => (
                      <div key={p.key} style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '4px 0', display: 'flex', gap: 8 }}>
                        <code style={{ color: '#60a5fa' }}>{p.key}</code>
                        {p.required && <span style={{ fontSize: 10, color: '#ef4444', fontWeight: 700 }}>REQUIRED</span>}
                      </div>
                    ))}
                  </div>
                )}
                {selected.body && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Request Body Example</div>
                    <div style={{ background: '#0f172a', borderRadius: 8, padding: 12, fontFamily: 'monospace', fontSize: 12, color: '#94a3b8', whiteSpace: 'pre', overflowX: 'auto' }}>{selected.body}</div>
                  </div>
                )}
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Responses</div>
                  {selected.responses.map(r => (
                    <div key={r.code} style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '3px 0', display: 'flex', gap: 8 }}>
                      <span className={statusClass(Number(r.code))}>{r.code}</span>
                      <span>{r.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Tab: API Automation ──────────────────────────────────────────────────────
function AutomationTab() {
  const [reqTab, setReqTab] = useState('single');
  const [method, setMethod] = useState('POST');
  const [url, setUrl] = useState('https://api.example.com/login');
  const [body, setBody] = useState('{\n  "email": "qa@test.com",\n  "password": "password123"\n}');
  const [headers, setHeaders] = useState([{ key: 'Content-Type', value: 'application/json' }]);
  const [assertions, setAssertions] = useState([
    { id: 1, type: 'status', operator: '==', value: '200', path: '' },
    { id: 2, type: 'jsonpath', operator: 'exists', path: '$.token', value: '', key: '' },
  ]);
  const [testName, setTestName] = useState('Login API');
  const [baseUrl, setBaseUrl] = useState('https://api.example.com');
  const [generatedCode, setGeneratedCode] = useState('');

  // Data driven
  const [csvData, setCsvData] = useState('email,password,expectedStatus\nqa@test.com,password123,200\nwrong@test.com,wrongpass,401');
  const [ddCode, setDdCode] = useState('');

  function generate() {
    const code = generatePlaywrightTest({ method, url, headers, body }, assertions, { testName, baseUrl });
    setGeneratedCode(code);
  }

  function generateDD() {
    const rows = [];
    const lines = csvData.trim().split('\n');
    if (lines.length < 2) return;
    const keys = lines[0].split(',').map(k => k.trim());
    lines.slice(1).forEach(line => {
      const vals = line.split(',').map(v => v.trim());
      const row = {};
      keys.forEach((k, i) => { row[k] = vals[i] || ''; });
      rows.push(row);
    });
    const code = generateDataDrivenTest({ method, url, headers, body }, rows, { testName, baseUrl });
    setDdCode(code);
  }

  async function exportCode(code, filename) {
    await window.api.saveTextFile({ defaultName: filename, content: code });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {['single', 'datadriven'].map(t => (
          <button key={t} className={`env-tab-btn ${reqTab === t ? 'active' : ''}`} onClick={() => setReqTab(t)}>
            {t === 'single' ? '🧪 Single Test' : '📊 Data Driven'}
          </button>
        ))}
      </div>

      <div className="automation-layout">
        {/* Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card-section">
            <h3>⚙️ Request Config</h3>
            <div className="form-group"><label>Test Name</label>
              <input value={testName} onChange={e => setTestName(e.target.value)} placeholder="Login API" />
            </div>
            <div className="form-group"><label>Base URL</label>
              <input value={baseUrl} onChange={e => setBaseUrl(e.target.value)} placeholder="https://api.example.com" />
            </div>
            <div className="form-row">
              <div className="form-group" style={{ flex: '0 0 100px' }}><label>Method</label>
                <select value={method} onChange={e => setMethod(e.target.value)}>
                  {HTTP_METHODS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Endpoint Path</label>
                <input value={url.replace(baseUrl, '') || url} onChange={e => setUrl(baseUrl + e.target.value)} placeholder="/login" />
              </div>
            </div>
            <div className="form-group"><label>Headers</label>
              <KVEditor rows={headers} onChange={setHeaders} />
            </div>
            {['POST','PUT','PATCH'].includes(method) && (
              <div className="form-group"><label>Request Body</label>
                <textarea rows={4} value={body} onChange={e => setBody(e.target.value)} style={{ fontFamily: 'monospace', fontSize: 12 }} />
              </div>
            )}
          </div>

          <div className="card-section">
            <h3>✅ Assertions</h3>
            <AssertionBuilder assertions={assertions} onChange={setAssertions} />
          </div>

          {reqTab === 'datadriven' && (
            <div className="card-section">
              <h3>📊 Test Data (CSV)</h3>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
                Baris pertama = nama kolom. Tambahkan kolom <code>expectedStatus</code> untuk validasi otomatis.
              </div>
              <textarea rows={6} value={csvData} onChange={e => setCsvData(e.target.value)}
                style={{ width: '100%', fontFamily: 'monospace', fontSize: 12, resize: 'vertical' }} />
            </div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" onClick={reqTab === 'single' ? generate : generateDD}>
              ⚡ Generate Test
            </button>
            {(generatedCode || ddCode) && (
              <button className="btn btn-secondary" onClick={() => exportCode(reqTab === 'single' ? generatedCode : ddCode, `${testName.replace(/\s+/g,'-')}.spec.ts`)}>
                📤 Export .spec.ts
              </button>
            )}
          </div>
        </div>

        {/* Output */}
        <div className="card-section">
          <h3>📄 Generated Playwright Test</h3>
          {(generatedCode || ddCode) ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => navigator.clipboard.writeText(reqTab === 'single' ? generatedCode : ddCode)}>📋 Copy</button>
              </div>
              <div className="code-output">{reqTab === 'single' ? generatedCode : ddCode}</div>
            </>
          ) : (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, border: '1px dashed var(--border)', borderRadius: 8 }}>
              Konfigurasi request di sebelah kiri lalu klik ⚡ Generate Test
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'learning',    label: '📚 API Learning' },
  { id: 'builder',     label: '🔧 Manual Testing' },
  { id: 'collection',  label: '📁 Collections' },
  { id: 'environment', label: '🌐 Environments' },
  { id: 'openapi',     label: '📋 OpenAPI Import' },
  { id: 'automation',  label: '⭐ Automation' },
];

export default function APILabPage() {
  const [tab, setTab]       = useState('learning');
  const [envVars, setEnvVars] = useState(() => {
    try {
      const envs = JSON.parse(localStorage.getItem(ENV_KEY) || '[]');
      return envs[0]?.vars || [];
    } catch { return []; }
  });
  const [loadedRequest, setLoadedRequest] = useState(null);

  if (isWeb()) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-primary)' }}>
        <Globe size={48} style={{ color: 'var(--text-muted)', marginBottom: 20 }} />
        <h2>Fitur Eksklusif Desktop</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '16px auto', lineHeight: '1.6' }}>
          API Lab membutuhkan interaksi langsung dengan Newman (Postman CLI) dan akses *network* tanpa batasan CORS di sistem lokal Anda.
          Karena keterbatasan keamanan Web Browser, fitur ini <strong>hanya tersedia di DiyahQA Hub versi Desktop</strong>.
        </p>
      </div>
    );
  }

  function handleLoadRequest(req) {
    setLoadedRequest(req);
    setTab('builder');
  }

  return (
    <div className="apilab-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">API Lab</h1>
          <p className="page-subtitle">Belajar, test manual, collection manager, OpenAPI, dan generate Playwright API automation</p>
        </div>
        <TutorialPanel menuKey="apilab" />
      </div>

      <div className="apilab-tabs">
        {TABS.map(t => (
          <button key={t.id} className={`apilab-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="apilab-content">
        {tab === 'learning'    && <LearningTab />}
        {tab === 'builder'     && <RequestBuilderTab envVars={envVars} initialRequest={loadedRequest} onRequestLoaded={() => setLoadedRequest(null)} />}
        {tab === 'collection'  && <CollectionTab onLoadRequest={handleLoadRequest} />}
        {tab === 'environment' && <EnvironmentTab onEnvChange={setEnvVars} />}
        {tab === 'openapi'     && <OpenAPITab />}
        {tab === 'automation'  && <AutomationTab />}
      </div>
    </div>
  );
}
