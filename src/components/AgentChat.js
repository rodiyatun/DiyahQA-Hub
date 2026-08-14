import React, { useState, useEffect } from 'react';
import { useAgent } from '../contexts/AgentContext';
import './AgentChat.css';

export default function AgentChat({ onNavigate }) {
  const { enabled } = useAgent();
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSchedules, setActiveSchedules] = useState([]);

  useEffect(() => {
    if (enabled && isOpen) {
      loadSchedules();
    }
  }, [enabled, isOpen]);

  async function loadSchedules() {
    try {
      if (window.api && window.api.getActiveSchedules) {
        const schedules = await window.api.getActiveSchedules();
        setActiveSchedules(schedules || []);
      }
    } catch (e) {
      console.error('Gagal memuat jadwal', e);
    }
  }

  // Untuk tracking pembatalan
  const abortControllerRef = React.useRef(null);

  if (!enabled) return null;

  async function handleSend(e) {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMsg = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMsg]);
    setPrompt('');
    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await window.api.scheduleAITask(userMsg.content);
      
      if (controller.signal.aborted) return; // Hentikan jika dibatalkan

      let sysContent = '';
      if (response.success) {
        if (response.data.action === 'schedule_test') {
          sysContent = `Tugas berhasil dijadwalkan!\nAction: ${response.data.action}\nJadwal: ${response.data.schedule}\nSkenario: ${response.data.test_scenario || '-'}`;
        } else if (response.data.action === 'cancel_schedule') {
          sysContent = response.data.message;
        } else if (response.data.action === 'run_test_now') {
          sysContent = response.data.reply_text || 'Sedang menjalankan test di background...';
        } else if (response.data.action === 'navigate') {
          sysContent = `Membuka menu: ${response.data.target_menu || 'dashboard'}`;
          if (onNavigate && response.data.target_menu) {
            onNavigate(response.data.target_menu);
          }
        } else if (response.data.action === 'general_qa') {
          sysContent = response.data.reply_text || 'Hmm, saya kurang yakin bagaimana menjawabnya.';
        } else {
          sysContent = 'Aksi berhasil dieksekusi.';
        }
        loadSchedules();
      } else {
        sysContent = response.error;
      }
      setMessages(prev => [...prev, { role: 'ai', content: sysContent }]);
    } catch (e) {
      if (!controller.signal.aborted) {
        setMessages(prev => [...prev, { role: 'ai', content: `Error: ${e.message}` }]);
      }
    } finally {
      if (abortControllerRef.current === controller) {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <button 
        className="btn btn-primary agent-chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Agentic QA Assistant"
      >
        🤖 AI QA
      </button>

      {isOpen && (
        <div className="agent-chat-panel">
          <div className="agent-chat-header">
            <h4>QA Agentic Assistant</h4>
            <button className="btn btn-ghost btn-sm" onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="agent-chat-body">
            {messages.length === 0 && (
              <div className="agent-chat-empty">
                Halo! Anda bisa meminta saya menjadwalkan test otomatis.<br/>
                <em>Contoh: "setiap jam 07 pagi test register dan jika ada gagal report ke bug report"</em>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`agent-chat-bubble ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="agent-chat-bubble ai loading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <span>Memproses...</span>
                <button 
                  className="btn btn-ghost btn-sm" 
                  style={{ color: '#ef4444', padding: '0 4px' }}
                  onClick={() => {
                    if (abortControllerRef.current) {
                      abortControllerRef.current.abort();
                    }
                    setIsLoading(false);
                    setMessages(prev => [...prev, { role: 'ai', content: 'Dibatalkan oleh pengguna.' }]);
                  }}
                >
                  Batal
                </button>
              </div>
            )}

            {activeSchedules.length > 0 && (
              <div className="agent-chat-schedules">
                <h5>Jadwal Aktif</h5>
                <ul>
                  {activeSchedules.map((sch, idx) => (
                    <li key={idx}>🕒 {sch.schedule} - {sch.test_scenario}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <form className="agent-chat-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ketik instruksi AI..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className="btn btn-primary btn-sm" disabled={isLoading || !prompt.trim()}>
              Kirim
            </button>
          </form>
        </div>
      )}
    </>
  );
}
