import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  ClipboardList, CheckCircle, XCircle, Clock, TrendingUp, Folder, 
  Bot, Bug, Pin, ArrowRight, Cpu, RefreshCw, Zap, X
} from 'lucide-react';
import { useAgent } from '../contexts/AgentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabaseClient';
import { requireDesktop } from '../utils/platform';
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
  const { enabled: aiEnabled, setEnabled: setAiEnabled } = useAgent();
  const { t } = useLanguage();
  const [prediction, setPrediction] = useState('');
  const [predicting, setPredicting] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(true);

  useEffect(() => {
    loadStats();
  }, [projects]);

  useEffect(() => {
    loadBugStats();
  }, []);

  async function loadStats() {
    try {
      const { data, error } = await supabase.from('testcases').select('status');
      if (error) throw error;
      
      const tc = data || [];
      const total = tc.length;
      let pass = 0, fail = 0, pending = 0;
      const counts = {};
      
      tc.forEach(t => {
        counts[t.status] = (counts[t.status] || 0) + 1;
        if (t.status === 'Pass') pass++;
        else if (t.status === 'Fail') fail++;
        else if (t.status === 'Pending') pending++;
      });
      
      const byStatus = Object.keys(counts).map(k => ({ name: k, value: counts[k] }));
      const passRate = total > 0 ? Math.round((pass / total) * 100) : 0;
      
      const { data: historyData } = await supabase
        .from('status_history')
        .select('*')
        .order('changed_at', { ascending: false })
        .limit(10);
      
      setStats({ total, passRate, byStatus, pass, fail, pending, recentHistory: historyData || [] });
    } catch (e) {
      console.error(e);
      setStats({ total: 0, passRate: 0, byStatus: [], pass: 0, fail: 0, pending: 0, recentHistory: [] });
    }
  }

  async function loadBugStats() {
    try {
      const { data, error } = await supabase.from('bug_reports').select('status, severity');
      if (error) throw error;
      
      const bugs = data || [];
      const total = bugs.length;
      const statusCounts = {};
      const severityCounts = {};
      
      bugs.forEach(b => {
        statusCounts[b.status] = (statusCounts[b.status] || 0) + 1;
        severityCounts[b.severity] = (severityCounts[b.severity] || 0) + 1;
      });
      
      const byStatus = Object.keys(statusCounts).map(k => ({ name: k, value: statusCounts[k] }));
      const bySeverity = Object.keys(severityCounts).map(k => ({ name: k, value: severityCounts[k] }));
      
      setBugStats({ total, byStatus, bySeverity });
    } catch (e) {
      console.error(e);
      setBugStats({ total: 0, bySeverity: [], byStatus: [] });
    }
  }

  const pieData = stats?.byStatus?.map(s => ({
    name: s.name,
    value: s.value,
    color: STATUS_COLORS[s.name] || '#6366f1',
  })) || [];

  const passRate = stats?.total
    ? Math.round(((stats.byStatus?.find(s => s.name === 'Pass')?.value || 0) / stats.total) * 100)
    : 0;

  async function handlePredictBugs() {
    setPredicting(true);
    setPrediction('🤖 Menganalisis riwayat bug dan memprediksi risiko...');
    try {
      if (!requireDesktop('Insight Generator AI')) {
        setPredicting(false);
        return;
      }
      const { data: testcases } = await supabase.from('testcases').select('title, status');
      const { data: bugReports } = await supabase.from('bug_reports').select('title, status, severity');
      
      const allTCs = testcases || [];
      const allBugs = bugReports || [];

      const promptText = `Anda adalah AI QA Engineer. Berikut adalah data ${allTCs.length} test cases dan ${allBugs.length} bug. Sebagai QA Manager AI, berikan insight singkat (1 paragraf) dari data test case dan bug di atas. Fokus pada area yang paling berisiko dan apa saran Anda? (Gunakan bahasa Indonesia).`;
      const res = await window.api.askAntigravity(promptText);
      setPrediction(res);
    } catch(err) {
      setPrediction('❌ Gagal menganalisis prediksi bug: ' + err.message);
    } finally {
      setPredicting(false);
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">{t('dashboard.title')}</h1>
          <p className="page-subtitle">{t('dashboard.subtitle')}</p>
        </div>
        
        <div className="card" style={{ padding: '12px 16px', margin: 0, minWidth: 300 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
              <Bot size={18} style={{ color: 'var(--accent)' }} /> {t('dashboard.mode')}
              {aiEnabled && <span className="badge badge-success">Aktif</span>}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: !aiEnabled ? 'var(--text-bright)' : 'var(--text-muted)' }}>Manual</span>
              <label className="switch" style={{ margin: 0 }}>
                <input 
                  type="checkbox" 
                  checked={aiEnabled} 
                  onChange={(e) => setAiEnabled(e.target.checked)} 
                />
                <span className="slider round"></span>
              </label>
              <span style={{ fontSize: 12, fontWeight: 500, color: aiEnabled ? 'var(--primary)' : 'var(--text-muted)' }}>Agent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard label="Total Test Cases" value={stats?.total || 0} color="accent" icon={<ClipboardList size={22} />} />
        <StatCard
          label="Pass"
          value={stats?.byStatus?.find(s => s.name === 'Pass')?.value || 0}
          color="success" icon={<CheckCircle size={22} />}
        />
        <StatCard
          label="Fail"
          value={stats?.byStatus?.find(s => s.name === 'Fail')?.value || 0}
          color="danger" icon={<XCircle size={22} />}
        />
        <StatCard
          label="Pending"
          value={stats?.byStatus?.find(s => s.name === 'Pending')?.value || 0}
          color="warning" icon={<Clock size={22} />}
        />
        <StatCard label="Pass Rate" value={`${passRate}%`} color="info" icon={<TrendingUp size={22} />} />
        <StatCard label="Projects" value={projects.length} color="purple" icon={<Folder size={22} />} />
      </div>

      {/* AI Predictive Analysis Panel */}
      {isAiPanelOpen && (
      <div className="card" style={{ marginBottom: 24, border: '1px solid rgba(139, 92, 246, 0.3)', background: 'linear-gradient(to right, rgba(15, 23, 42, 1), rgba(139, 92, 246, 0.05))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0, color: '#c4b5fd' }}>
            <Cpu size={18} /> {t('dashboard.aiPredictive')}
          </h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              className="btn btn-primary btn-sm" 
              onClick={handlePredictBugs} 
              disabled={predicting} 
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              {predicting ? <RefreshCw size={14} className="spin" /> : <Zap size={14} />} 
              {t('dashboard.runPrediction')}
            </button>
            <button 
              className="btn btn-ghost btn-sm" 
              onClick={() => setIsAiPanelOpen(false)}
              style={{ padding: 4 }}
              title="Tutup Panel AI"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
          {t('dashboard.predictDesc')}
        </div>
        {prediction && (
          <div style={{ padding: 16, background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: 8, fontSize: 13, color: '#e2e8f0', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
            {prediction}
          </div>
        )}
      </div>
      )}

      <div className="dashboard-grid">
        {/* Pie Chart */}
        <div className="card chart-card">
          <h3 className="card-title">{t('dashboard.statusDist')}</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart">{t('dashboard.noData')}</div>
          )}
        </div>

        {/* Recent History */}
        <div className="card history-card">
          <h3 className="card-title">{t('dashboard.recentActivity')}</h3>
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
            <div className="empty-chart">{t('dashboard.noActivity')}</div>
          )}
        </div>
      </div>

      {/* Bug Stats */}
      <div className="dashboard-grid">
        <div className="card chart-card">
          <h3 className="card-title">{t('dashboard.bugSeverity')}</h3>
          {(bugStats?.bySeverity?.length > 0) ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={bugStats.bySeverity.map(s => ({
                    name: s.name,
                    value: s.value,
                    color: SEVERITY_COLORS_BUG[s.name] || '#6366f1',
                  }))}
                  cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value"
                >
                  {bugStats.bySeverity.map((entry, i) => (
                    <Cell key={i} fill={SEVERITY_COLORS_BUG[entry.name] || '#6366f1'} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }} 
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart">{t('dashboard.noData')}</div>
          )}
        </div>
        <div className="card">
          <h3 className="card-title">{t('dashboard.bugStats')}</h3>
          <div className="stats-grid" style={{ marginTop: 12 }}>
            <StatCard label={t('dashboard.totalBugs')} value={bugStats?.total || 0} color="danger" icon={<Bug size={22} />} />
            {(bugStats?.byStatus || []).map(s => (
              <StatCard key={s.name} label={s.name} value={s.value} color="accent" icon={<Pin size={22} />} />
            ))}
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="card">
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Folder size={18} /> {t('dashboard.projects')}
        </h3>
        {projects.length === 0 ? (
          <div className="empty-chart">Belum ada project. Buat project baru dari sidebar.</div>
        ) : (
          <div className="projects-grid">
            {projects.map(p => (
              <button key={p.id} className="project-card" onClick={() => onSelectProject(p)}>
                <span className="project-card-icon" style={{ color: 'var(--text-muted)' }}><Folder size={24} /></span>
                <div className="project-card-info">
                  <div className="project-card-name">{p.name}</div>
                  {p.description && (
                    <div className="project-card-desc">{p.description}</div>
                  )}
                </div>
                <span className="project-card-arrow" style={{ color: 'var(--text-muted)' }}><ArrowRight size={16} /></span>
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
