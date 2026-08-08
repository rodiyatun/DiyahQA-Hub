import React, { useEffect, useState } from 'react';
import './TestCaseDetailModal.css';

const SEVERITY_COLORS = {
  Critical: '#ef4444',
  High:     '#f97316',
  Medium:   '#f59e0b',
  Low:      '#6366f1',
};

const STATUS_COLORS = {
  'Open':        '#ef4444',
  'In Progress': '#f97316',
  'Resolved':    '#22c55e',
  'Closed':      '#9ca3af',
  "Won't Fix":   '#64748b',
};

function formatDate(str) {
  if (!str) return '—';
  return new Date(str).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
}

function SeverityBadge({ severity }) {
  const color = SEVERITY_COLORS[severity] || '#9ca3af';
  return (
    <span
      style={{
        background: color,
        color: '#fff',
        borderRadius: 12,
        padding: '2px 10px',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
      }}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || '#9ca3af';
  return (
    <span
      style={{
        background: color,
        color: '#fff',
        borderRadius: 12,
        padding: '2px 10px',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
      }}
    >
      {status}
    </span>
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

export default function BugReportDetailModal({ bug, onClose, onEdit }) {
  const [linkedTestCase, setLinkedTestCase] = useState(null);
  const [tcLoaded, setTcLoaded] = useState(false);

  useEffect(() => {
    if (bug.linked_testcase_id && bug.project_id) {
      window.api.getTestcases(bug.project_id).then(testcases => {
        const found = testcases.find(tc => tc.id === bug.linked_testcase_id);
        setLinkedTestCase(found || null);
        setTcLoaded(true);
      }).catch(() => {
        setLinkedTestCase(null);
        setTcLoaded(true);
      });
    } else {
      setTcLoaded(true);
    }
  }, [bug.linked_testcase_id, bug.project_id]);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal detail-modal">
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="detail-no">{bug.bug_number || '—'}</div>
            <h2 className="modal-title" style={{ marginTop: 4 }}>{bug.title}</h2>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {bug.severity && <SeverityBadge severity={bug.severity} />}
            {bug.status && <StatusBadge status={bug.status} />}
            <button className="btn btn-secondary btn-sm" onClick={onEdit}>✏️ Edit</button>
            <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Meta tags */}
        <div className="detail-meta">
          {bug.module      && <MetaTag label="Module"      value={bug.module} />}
          {bug.reporter    && <MetaTag label="Reporter"    value={bug.reporter} />}
          {bug.assignee    && <MetaTag label="Assignee"    value={bug.assignee} />}
          {bug.environment && <MetaTag label="Environment" value={bug.environment} />}
          {bug.priority    && <MetaTag label="Priority"    value={bug.priority} highlight />}
          {bug.created_at  && <MetaTag label="Created"     value={formatDate(bug.created_at)} />}
          {bug.updated_at  && <MetaTag label="Updated"     value={formatDate(bug.updated_at)} />}
        </div>

        {/* Detail sections */}
        <div className="detail-sections">
          {bug.description && (
            <DetailSection title="Description" content={bug.description} />
          )}
          {bug.steps_to_reproduce && (
            <DetailSection title="Steps to Reproduce" content={bug.steps_to_reproduce} preformatted />
          )}
          {bug.expected_behavior && (
            <DetailSection title="Expected Behavior" content={bug.expected_behavior} />
          )}
          {bug.actual_behavior && (
            <DetailSection title="Actual Behavior" content={bug.actual_behavior} />
          )}
          {bug.evidence_url && (
            <div className="detail-section">
              <div className="detail-section-title">Evidence URL</div>
              <p className="detail-content">
                <a
                  href={bug.evidence_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent)', wordBreak: 'break-all' }}
                >
                  {bug.evidence_url}
                </a>
              </p>
            </div>
          )}
          {bug.linked_testcase_id && tcLoaded && (
            <div className="detail-section">
              <div className="detail-section-title">Linked Test Case</div>
              <p className="detail-content">
                {linkedTestCase
                  ? `${linkedTestCase.no ? linkedTestCase.no + ' — ' : ''}${linkedTestCase.title}`
                  : '(deleted)'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
