import React, { useEffect, useState } from 'react';
import GeneratePlaywrightModal from './GeneratePlaywrightModal';
import { Bug, Code2, Edit3, X } from 'lucide-react';
import './TestCaseDetailModal.css';

export default function TestCaseDetailModal({ testcase: tc, onClose, onEdit, onCreateBugFromTC }) {
  const [history, setHistory] = useState([]);
  const [showPlaywright, setShowPlaywright] = useState(false);

  useEffect(() => {
    window.api.getStatusHistory(tc.id).then(setHistory);
  }, [tc.id]);

  const statusCls = tc.status?.toLowerCase();

  return (
    <>
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal detail-modal">
        <div className="modal-header">
          <div>
            <div className="detail-no">{tc.no || '—'}</div>
            <h2 className="modal-title" style={{ marginTop: 4 }}>{tc.title}</h2>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className={`badge badge-${statusCls}`}>{tc.status}</span>
            {tc.status === 'Fail' && onCreateBugFromTC && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => { onCreateBugFromTC(tc); onClose(); }}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              ><Bug size={14} /> Buat Bug Report</button>
            )}
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowPlaywright(true)}
              title="Generate Playwright script dari test case ini"
              style={{ background: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.4)', color: '#a78bfa', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Code2 size={14} /> Generate Playwright
            </button>
            <button className="btn btn-secondary btn-sm" onClick={onEdit} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Edit3 size={14} /> Edit</button>
            <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={18} /></button>
          </div>
        </div>

        <div className="detail-meta">
          {tc.website && <MetaTag label="Website" value={tc.website} />}
          {tc.module && <MetaTag label="Module" value={tc.module} />}
          {tc.section && <MetaTag label="Section" value={tc.section} />}
          {tc.note && <MetaTag label="Note" value={tc.note} highlight />}
        </div>

        <div className="detail-sections">
          {tc.test_data && (
            <DetailSection title="Test Data" content={tc.test_data} />
          )}
          {tc.scenario && (
            <DetailSection title="Scenario" content={tc.scenario} preformatted />
          )}
          {tc.expected_result && (
            <DetailSection title="Expected Result" content={tc.expected_result} />
          )}
          {tc.evidence && (
            <DetailSection title="Evidence" content={tc.evidence} />
          )}
        </div>

        {history.length > 0 && (
          <div className="detail-history">
            <div className="detail-section-title">Status History</div>
            <div className="history-list">
              {history.map(h => (
                <div key={h.id} className="history-item">
                  <div className="history-change">
                    <span className={`badge badge-${h.old_status?.toLowerCase()}`}>{h.old_status}</span>
                    <span style={{ color: 'var(--text-muted)', margin: '0 4px' }}>→</span>
                    <span className={`badge badge-${h.new_status?.toLowerCase()}`}>{h.new_status}</span>
                  </div>
                  <span className="history-time">{formatDate(h.changed_at)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    {showPlaywright && (
      <GeneratePlaywrightModal
        testcase={tc}
        onClose={() => setShowPlaywright(false)}
      />
    )}
  </>
  );
}

function MetaTag({ label, value, highlight }) {
  return (
    <div className={`meta-tag ${highlight ? 'meta-highlight' : ''}`}>
      <span className="meta-label">{label}</span>
      <span className="meta-value">{value}</span>
    </div>
  );
}

function DetailSection({ title, content, preformatted }) {
  return (
    <div className="detail-section">
      <div className="detail-section-title">{title}</div>
      {preformatted
        ? <pre className="detail-content">{content}</pre>
        : <p className="detail-content">{content}</p>
      }
    </div>
  );
}

function formatDate(str) {
  if (!str) return '';
  return new Date(str).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
}
