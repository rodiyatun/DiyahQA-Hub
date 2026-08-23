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

export default function Dashboard({ projects, onSelectProject, selectedProject }) {
  const [stats, setStats] = useState(null);
  const [bugStats, setBugStats] = useState(null);
  const [bastStats, setBastStats] = useState({ total: 0, waiting: 0, done: 0, recent: [] });
  const { enabled: aiEnabled, setEnabled: setAiEnabled } = useAgent();
  const { t } = useLanguage();
  const [prediction, setPrediction] = useState('');
  const [predicting, setPredicting] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(true);
  const [projectStats, setProjectStats] = useState([]);

  useEffect(() => {
    loadStats();
    loadProjectStats();
    loadBugStats();
    loadBastStats();
  }, [projects]);

  async function loadStats() {
    try {
      if (!projects || projects.length === 0) {
        setStats({ total: 0, passRate: 0, byStatus: [], pass: 0, fail: 0, pending: 0, recentHistory: [] });
        return;
      }
      const projectIds = projects.map(p => p.id);

      // Fetch ALL testcases with pagination (Supabase default limit = 1000)
      let allData = [];
      let from = 0;
      const pageSize = 1000;
      while (true) {
        const { data, error } = await supabase
          .from('testcases')
          .select('status, project_id')
          .in('project_id', projectIds)
          .range(from, from + pageSize - 1);
        if (error) throw error;
        if (!data || data.length === 0) break;
        allData = [...allData, ...data];
        if (data.length < pageSize) break;
        from += pageSize;
      }

      const tc = allData;
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
        .select('*, testcases!inner(project_id)')
        .in('testcases.project_id', projectIds)
        .order('changed_at', { ascending: false })
        .limit(10);

      setStats({ total, passRate, byStatus, pass, fail, pending, recentHistory: historyData || [] });
    } catch (e) {
      console.error(e);
      setStats({ total: 0, passRate: 0, byStatus: [], pass: 0, fail: 0, pending: 0, recentHistory: [] });
    }
  }

  async function loadProjectStats() {
    try {
      if (!projects || projects.length === 0) {
        setProjectStats([]);
        return;
      }
      const projectIds = projects.map(p => p.id);

      // Paginate to get all testcases
      let allData = [];
      let from = 0;
      const pageSize = 1000;
      while (true) {
        const { data, error } = await supabase
          .from('testcases')
          .select('project_id, status')
          .in('project_id', projectIds)
          .range(from, from + pageSize - 1);
        if (error) break;
        if (!data || data.length === 0) break;
        allData = [...allData, ...data];
        if (data.length < pageSize) break;
        from += pageSize;
      }

      // Fetch all open/in progress bugs to get "sisa bug"
      const { data: activeBugs } = await supabase
        .from('bug_reports')
        .select('project_id')
        .in('project_id', projectIds)
        .in('status', ['Open', 'In Progress']);

      const bugCounts = {};
      (activeBugs || []).forEach(b => {
        bugCounts[b.project_id] = (bugCounts[b.project_id] || 0) + 1;
      });

      // Build per-project count map
      const map = {};
      allData.forEach(tc => {
        if (!map[tc.project_id]) map[tc.project_id] = { total: 0, pass: 0, fail: 0, pending: 0, skip: 0 };
        map[tc.project_id].total++;
        if (tc.status === 'Pass') map[tc.project_id].pass++;
        else if (tc.status === 'Fail') map[tc.project_id].fail++;
        else if (tc.status === 'Pending') map[tc.project_id].pending++;
        else if (tc.status === 'Skip') map[tc.project_id].skip++;
      });

      const result = projects.map(p => ({
        ...p,
        tcTotal: map[p.id]?.total || 0,
        tcPass: map[p.id]?.pass || 0,
        tcFail: map[p.id]?.fail || 0,
        tcPending: map[p.id]?.pending || 0,
        tcSkip: map[p.id]?.skip || 0,
        bugRemaining: bugCounts[p.id] || 0,
      }));
      setProjectStats(result);
    } catch (e) {
      console.error(e);
    }
  }

  async function loadBugStats() {
    try {
      if (!projects || projects.length === 0) {
        setBugStats(null);
        return;
      }
      const projectIds = projects.map(p => p.id);

      const { data, error } = await supabase
        .from('bug_reports')
        .select('status, severity')
        .in('project_id', projectIds);
        
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

  async function loadBastStats() {
    try {
      const { data, error } = await supabase
        .from('bast_documents')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      
      const basts = data || [];
      const waiting = basts.filter(b => b.status === 'Menunggu TTD').length;
      const done = basts.filter(b => b.status === 'Selesai').length;
      
      setBastStats({
        total: basts.length,
        waiting,
        done,
        recent: basts.slice(0, 5) // top 5
      });
    } catch (e) {
      console.error('Error loading bast:', e);
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
    setPrediction('🤖 Memanggil Antigravity AI... (Proses ini bisa memakan waktu 10-20 detik karena memuat model dan menganalisis seluruh data)');
    try {
      if (!requireDesktop('Insight Generator AI')) {
        setPredicting(false);
        return;
      }
      
      const projectIds = projects?.map(p => p.id) || [];
      if (projectIds.length === 0) {
        setPrediction('Tidak ada project di workspace ini untuk dianalisis.');
        return;
      }

      const { data: testcases } = await supabase.from('testcases').select('title, status').in('project_id', projectIds);
      const { data: bugReports } = await supabase.from('bug_reports').select('title, status, severity').in('project_id', projectIds);
      
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

      {/* Ringkasan per project */}
      <div style={{ marginTop: 16 }}>
        <h3 className="card-title" style={{ fontSize: 18, marginBottom: 16 }}>Ringkasan per project</h3>
        {projectStats.length === 0 ? (
          <div className="empty-chart">Belum ada project. Buat project baru dari sidebar.</div>
        ) : (
          <div className="projects-grid">
            {projectStats.map(p => {
              const total = p.tcTotal || 0;
              const passPct = total > 0 ? Math.round((p.tcPass / total) * 100) : 0;
              const failPct = total > 0 ? Math.round((p.tcFail / total) * 100) : 0;
              const pendingPct = total > 0 ? Math.round((p.tcPending / total) * 100) : 0;
              const skipPct = total > 0 ? Math.round((p.tcSkip / total) * 100) : 0;
              
              return (
                <div key={p.id} className="project-summary-card" onClick={() => onSelectProject(p)}>
                  <div className="project-summary-header">
                    <div className="project-summary-title">
                      <Folder size={18} style={{ color: 'var(--text-muted)' }} /> {p.name}
                    </div>
                    {p.bugRemaining > 0 && (
                      <div className="project-summary-badge">
                        <Bug size={12} /> {p.bugRemaining} bug sisa
                      </div>
                    )}
                  </div>
                  <div className="project-summary-subtitle">{total} total test case</div>
                  
                  <div className="progress-bar-container">
                    {passPct > 0 && <div className="progress-segment pass" style={{ width: `${passPct}%` }}></div>}
                    {failPct > 0 && <div className="progress-segment fail" style={{ width: `${failPct}%` }}></div>}
                    {pendingPct > 0 && <div className="progress-segment pending" style={{ width: `${pendingPct}%` }}></div>}
                    {skipPct > 0 && <div className="progress-segment skip" style={{ width: `${skipPct}%` }}></div>}
                  </div>
                  
                  <div className="progress-text">
                    {passPct}% pass &bull; {failPct}% fail &bull; {pendingPct}% pending &bull; {skipPct}% skip
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* BAST Section */}
      <div style={{ marginTop: 24, marginBottom: 32 }}>
        <h3 className="card-title" style={{ fontSize: 18, marginBottom: 16 }}>BAST terbaru</h3>
        <div className="bast-summary-grid">
          <div className="bast-summary-box total">
            <span className="bast-box-label">Total BAST</span>
            <span className="bast-box-value">{bastStats.total}</span>
          </div>
          <div className="bast-summary-box waiting">
            <span className="bast-box-label">Menunggu TTD</span>
            <span className="bast-box-value">{bastStats.waiting}</span>
          </div>
          <div className="bast-summary-box done">
            <span className="bast-box-label">Selesai</span>
            <span className="bast-box-value">{bastStats.done}</span>
          </div>
        </div>

        <div className="bast-list">
          {bastStats.recent.length === 0 ? (
            <div className="empty-chart" style={{ padding: '20px 0' }}>Belum ada dokumen BAST.</div>
          ) : (
            bastStats.recent.map(b => {
              const proj = projects.find(p => p.id === b.project_id);
              const isDone = b.status === 'Selesai';
              return (
                <div key={b.id} className="bast-list-item">
                  <div className="bast-item-info">
                    <span className="bast-item-title">{b.bast_number}</span>
                    <span className="bast-item-subtitle">{proj ? proj.name : 'Unknown'} &bull; {b.document_date ? new Date(b.document_date).toLocaleDateString('id-ID') : '-'}</span>
                  </div>
                  <span className="badge" style={{ 
                    background: isDone ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)', 
                    color: isDone ? '#22c55e' : '#f59e0b', 
                    border: `1px solid ${isDone ? 'rgba(34, 197, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'}` 
                  }}>
                    {b.status}
                  </span>
                </div>
              );
            })
          )}
        </div>
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
