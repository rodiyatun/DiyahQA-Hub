import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Dashboard.css';

const STATUS_COLORS = {
  Pass: '#22c55e',
  Fail: '#ef4444',
  Pending: '#f59e0b',
  Skip: '#64748b',
  Blocked: '#a855f7',
};

const SEVERITY_COLORS_BUG = {
  Critical: '#ef4444',
  High: '#f97316',
  Medium: '#f59e0b',
  Low: '#6366f1',
};

export default function Dashboard({ projects, onSelectProject }) {
  const [stats, setStats] = useState(null);
  const [bugStats, setBugStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, [projects]);

  useEffect(() => {
    loadBugStats();
  }, []);

  async function loadStats() {
    const data = await window.api.getStats(null);
    setStats(data);
  }

  async function loadBugStats() {
    try {
      const data = await window.api.getBugStats(null);
      setBugStats(data);
    } catch (e) {
      setBugStats({ total: 0, bySeverity: [], byStatus: [] });
    }
  }

  const pieData = stats?.byStatus?.map(s => ({
    name: s.status,
    value: s.count,
    color: STATUS_COLORS[s.status] || '#6366f1',
  })) || [];

  const passRate = stats?.total
    ? Math.round(((stats.byStatus?.find(s => s.status === 'Pass')?.count || 0) / stats.total) * 100)
    : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview semua test case</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard label="Total Test Cases" value={stats?.total || 0} color="accent" icon="📋" />
        <StatCard
          label="Pass"
          value={stats?.byStatus?.find(s => s.status === 'Pass')?.count || 0}
          color="success" icon="✅"
        />
        <StatCard
          label="Fail"
          value={stats?.byStatus?.find(s => s.status === 'Fail')?.count || 0}
          color="danger" icon="❌"
        />
        <StatCard
          label="Pending"
          value={stats?.byStatus?.find(s => s.status === 'Pending')?.count || 0}
          color="warning" icon="⏳"
        />
        <StatCard label="Pass Rate" value={`${passRate}%`} color="info" icon="📈" />
        <StatCard label="Projects" value={projects.length} color="purple" icon="📁" />
      </div>

      <div className="dashboard-grid">
        {/* Pie Chart */}
        <div className="card chart-card">
          <h3 className="card-title">Status Distribution</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#f1f5f9' }}
                />
                <Legend formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart">Belum ada data</div>
          )}
        </div>

        {/* Recent History */}
        <div className="card history-card">
          <h3 className="card-title">Recent Activity</h3>
          {stats?.recentHistory?.length > 0 ? (
            <div className="history-list">
              {stats.recentHistory.map(h => (
                <div key={h.id} className="history-item">
                  <div className="history-info">
                    <span className="history-tc">TC #{h.testcase_id}</span>
                    <span className="history-change">
                      <StatusBadge status={h.old_status} /> → <StatusBadge status={h.new_status} />
                    </span>
                  </div>
                  <span className="history-time">{formatDate(h.changed_at)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-chart">Belum ada activity</div>
          )}
        </div>
      </div>

      {/* Bug Stats */}
      <div className="dashboard-grid">
        <div className="card chart-card">
          <h3 className="card-title">Bug Severity Distribution</h3>
          {(bugStats?.bySeverity?.length > 0) ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={bugStats.bySeverity.map(s => ({
                    name: s.severity,
                    value: s.count,
                    color: SEVERITY_COLORS_BUG[s.severity] || '#6366f1',
                  }))}
                  cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value"
                >
                  {bugStats.bySeverity.map((entry, i) => (
                    <Cell key={i} fill={SEVERITY_COLORS_BUG[entry.severity] || '#6366f1'} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#f1f5f9' }} />
                <Legend formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart">Belum ada data bug</div>
          )}
        </div>
        <div className="card">
          <h3 className="card-title">Bug Stats</h3>
          <div className="stats-grid" style={{ marginTop: 12 }}>
            <StatCard label="Total Bugs" value={bugStats?.total || 0} color="danger" icon="🐛" />
            {(bugStats?.byStatus || []).map(s => (
              <StatCard key={s.status} label={s.status} value={s.count} color="accent" icon="📌" />
            ))}
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: 16 }}>Projects</h3>
        {projects.length === 0 ? (
          <div className="empty-chart">Belum ada project. Buat project baru dari sidebar.</div>
        ) : (
          <div className="projects-grid">
            {projects.map(p => (
              <button key={p.id} className="project-card" onClick={() => onSelectProject(p)}>
                <span className="project-card-icon">📁</span>
                <div className="project-card-info">
                  <div className="project-card-name">{p.name}</div>
                  {p.description && (
                    <div className="project-card-desc">{p.description}</div>
                  )}
                </div>
                <span className="project-card-arrow">→</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <span className="stat-icon">{icon}</span>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cls = status?.toLowerCase();
  return <span className={`badge badge-${cls}`}>{status}</span>;
}

function formatDate(str) {
  if (!str) return '';
  return new Date(str).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
}
