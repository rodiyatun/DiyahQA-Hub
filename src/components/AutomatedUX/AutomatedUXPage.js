import React, { useState, useEffect } from 'react';
import { Figma, Monitor, Play, CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import './AutomatedUXPage.css';

import { fetchFigmaNode, extractFigmaSpecs } from '../../lib/figmaApi';

export default function AutomatedUXPage() {
  const [figmaUrl, setFigmaUrl] = useState('');
  const [figmaToken, setFigmaToken] = useState(() => localStorage.getItem('figma_token') || '');
  const [targetUrl, setTargetUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    localStorage.setItem('figma_token', figmaToken);
  }, [figmaToken]);

  const handleRunInspection = async () => {
    if (!figmaUrl || !targetUrl || !figmaToken) {
      alert("Harap isi URL Figma, Token Figma, dan URL Target");
      return;
    }

    setLoading(true);
    try {
      // 1. Fetch Figma Specs
      const figmaNode = await fetchFigmaNode(figmaToken, figmaUrl);
      const figmaSpecs = extractFigmaSpecs(figmaNode);
      
      // 2. Extract Live Site Specs
      const liveResponse = await window.api.extractLiveStyles(targetUrl);
      if (!liveResponse.success) {
        throw new Error(liveResponse.error);
      }
      const liveSpecs = liveResponse.data;

      // 3. Comparison Engine
      const discrepancies = [];
      
      // Bandingkan Colors (Top 10)
      figmaSpecs.colors.forEach(fc => {
        // Toleransi: Anggap pass jika warna Figma ada di 10 warna dominan Live Site
        const isMatch = liveSpecs.colors.includes(fc.hex);
        discrepancies.push({
          type: 'Color',
          element: fc.elementName,
          figma: fc.hex,
          live: isMatch ? fc.hex : (liveSpecs.colors[0] || 'N/A'),
          status: isMatch ? 'pass' : 'fail'
        });
      });

      // Bandingkan Typography
      figmaSpecs.typography.forEach(ft => {
        // Ambil nama font dasar
        const fFamily = ft.fontFamily.split(',')[0].replace(/['"]/g, '').trim();
        const isMatch = liveSpecs.typography.some(lt => {
          const lFamily = lt.split(',')[0].replace(/['"]/g, '').trim();
          return lFamily.toLowerCase() === fFamily.toLowerCase();
        });
        
        discrepancies.push({
          type: 'Typography',
          element: ft.elementName,
          figma: fFamily,
          live: isMatch ? fFamily : (liveSpecs.typography[0] || 'N/A'),
          status: isMatch ? 'pass' : 'fail'
        });
      });

      // Jika kosong (karena design tidak ada warnanya/teksnya)
      if (discrepancies.length === 0) {
        discrepancies.push({ type: 'General', element: 'Design', figma: 'N/A', live: 'N/A', status: 'pass' });
      }
      
      setResults({
        summary: {
          totalElements: discrepancies.length,
          pass: discrepancies.filter(d => d.status === 'pass').length,
          fail: discrepancies.filter(d => d.status === 'fail').length
        },
        discrepancies
      });

    } catch (err) {
      alert("Gagal melakukan inspeksi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="automated-ux-container">
      <div className="ux-header">
        <h1><Figma size={28} /> Automated UI/UX Testing</h1>
        <p>Bandingkan spesifikasi desain Figma dengan implementasi asli di website secara otomatis.</p>
      </div>

      <div className="ux-config-card">
        <div className="ux-form-grid">
          <div className="ux-input-group" style={{ gridColumn: '1 / -1' }}>
            <label><Figma size={14} /> Figma Personal Access Token</label>
            <input 
              type="password" 
              className="ux-input" 
              placeholder="figd_..." 
              value={figmaToken}
              onChange={(e) => setFigmaToken(e.target.value)}
            />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Didapat dari Figma Settings &gt; Personal Access Tokens</span>
          </div>

          <div className="ux-input-group">
            <label><Figma size={14} /> Figma Frame URL</label>
            <input 
              type="text" 
              className="ux-input" 
              placeholder="https://www.figma.com/file/..." 
              value={figmaUrl}
              onChange={(e) => setFigmaUrl(e.target.value)}
            />
          </div>

          <div className="ux-input-group">
            <label><Monitor size={14} /> Target Application URL</label>
            <input 
              type="text" 
              className="ux-input" 
              placeholder="http://localhost:3000 atau https://..." 
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
            />
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '12px', fontSize: 14, display: 'flex', justifyContent: 'center', gap: 8 }}
          onClick={handleRunInspection}
          disabled={loading}
        >
          {loading ? <RefreshCw className="spin" size={18} /> : <Play size={18} />}
          {loading ? 'Menjalankan Inspeksi...' : 'Run Inspection'}
        </button>
      </div>

      {results && (
        <div className="ux-results-section">
          <h3>Hasil Inspeksi</h3>
          <div className="ux-dashboard">
            {/* FIGMA PANEL */}
            <div className="ux-panel">
              <div className="ux-panel-header">
                <Figma size={16} /> Spesifikasi Figma
              </div>
              <div className="ux-panel-content">
                <table className="ux-results-table">
                  <thead>
                    <tr>
                      <th>Elemen</th>
                      <th>Properti Desain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.discrepancies.map((d, i) => (
                      <tr key={i}>
                        <td><strong>{d.element}</strong><br/><span style={{fontSize: 11, color: 'var(--text-muted)'}}>{d.type}</span></td>
                        <td>
                          {d.type === 'Color' && <span className="color-swatch" style={{ background: d.figma }}></span>}
                          {d.figma}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* LIVE SITE PANEL */}
            <div className="ux-panel">
              <div className="ux-panel-header">
                <Monitor size={16} /> Implementasi Live Site
              </div>
              <div className="ux-panel-content">
                <table className="ux-results-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Properti Aktual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.discrepancies.map((d, i) => (
                      <tr key={i} style={d.status === 'fail' ? { background: 'rgba(239, 68, 68, 0.05)' } : {}}>
                        <td>
                          <span className={`status-badge ${d.status}`}>
                            {d.status === 'pass' ? <CheckCircle2 size={12} style={{display: 'inline', verticalAlign: 'middle', marginRight: 4}} /> : <XCircle size={12} style={{display: 'inline', verticalAlign: 'middle', marginRight: 4}} />}
                            {d.status}
                          </span>
                        </td>
                        <td>
                          {d.type === 'Color' && <span className="color-swatch" style={{ background: d.live }}></span>}
                          <span style={d.status === 'fail' ? { color: '#ef4444', fontWeight: 600 } : {}}>{d.live}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary">
              Simpan sebagai Test Run
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
