import React, { useState, useRef, useEffect } from 'react';
import { Monitor, Chrome, Camera, Video, CheckCircle, X } from 'lucide-react';
import './AdvancedRecorderModal.css';

const AdvancedRecorderModal = ({ isOpen, onClose, onSave }) => {
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [logs, setLogs] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [fileNameInput, setFileNameInput] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [evidenceData, setEvidenceData] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const videoRef = useRef(null);

  // Reset semua state saat modal ditutup agar saat dibuka kembali mulai dari awal
  useEffect(() => {
    if (!isOpen) {
      setSources([]);
      setSelectedSource(null);
      setRecording(false);
      setVideoUrl(null);
      setLogs([]);
      setProcessing(false);
      setFileNameInput('');
      setUploadedUrl(null);
      setEvidenceData(null);
      chunksRef.current = [];
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFetchSources = async () => {
    if (!window.api?.getDesktopSources) {
      alert("Fitur ini hanya tersedia di aplikasi Desktop.");
      return;
    }
    try {
      const availableSources = await window.api.getDesktopSources();
      setSources(availableSources);
      if (availableSources.length === 0) {
        alert("Tidak ada layar/window yang terdeteksi. Pastikan Anda telah memberikan izin 'Screen Recording' di MacOS System Preferences.");
      }
    } catch (e) {
      console.error(e);
      alert("Gagal mengambil daftar layar: " + e.message);
    }
  };

  const handleStartRecording = async () => {
    if (!selectedSource) {
      alert("Pilih window/layar terlebih dahulu.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: selectedSource.id,
          }
        }
      });

      const options = { mimeType: 'video/webm; codecs=vp9' };
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);

        if (window.api?.stopNetworkLog) {
          try {
            const res = await window.api.stopNetworkLog();
            if (res && res.success) {
              setLogs(res.logs || []);
            } else if (res && res.logs) {
              setLogs(res.logs);
            }
          } catch (e) {
            console.error("Failed to stop network log", e);
          }
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);

      if (window.api?.startNetworkLog) {
        try {
          await window.api.startNetworkLog();
        } catch (cdpErr) {
          console.warn('Network Log (CDP) gagal dimulai:', cdpErr);
          alert('Peringatan: Gagal menyadap jaringan CDP. Pastikan Anda sudah menekan "Launch Chrome Debug Mode".\n\nRekaman layar tetap berjalan tanpa log jaringan.');
        }
      }

    } catch (err) {
      console.error('Recording Error:', err);
      setRecording(false);
      
      if (err.name === 'NotAllowedError' || err.message.includes('Permission')) {
        alert('Gagal memulai rekaman: Izin merekam layar (Screen Recording) tidak diberikan oleh sistem operasi.');
      } else {
        alert('Gagal memulai rekaman: ' + err.message);
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
    setRecording(false);
  };

  const handleUpload = async () => {
    if (!videoUrl || chunksRef.current.length === 0) return;
    setProcessing(true);
    try {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const buffer = await blob.arrayBuffer();
      
      const safeName = fileNameInput.trim().replace(/[^a-zA-Z0-9_-]/g, '_');
      const finalFileName = safeName ? `${safeName}.webm` : `evidence_${Date.now()}.webm`;
      
      const res = await window.api.uploadB2({ 
        fileBuffer: buffer, 
        fileName: finalFileName, 
        mimeType: 'video/webm',
        supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
        supabaseKey: process.env.REACT_APP_SUPABASE_ANON_KEY
      });
      
      if (!res.success) {
        throw new Error(res.error || "Gagal mengunggah video ke Supabase.");
      }
      
      setEvidenceData({ 
        video_evidence: res.url, 
        network_logs: JSON.stringify(logs) 
      });
      
      setUploadedUrl(res.url);
    } catch (e) {
      alert("Error Upload: " + e.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleTakeScreenshot = async () => {
    if (!selectedSource) {
      alert("Pilih window/layar terlebih dahulu.");
      return;
    }
    setProcessing(true);
    try {
      const availableSources = await window.api.getDesktopSources();
      const freshSource = availableSources.find(s => s.id === selectedSource.id);
      if (!freshSource) throw new Error("Window tidak lagi ditemukan.");

      const response = await fetch(freshSource.thumbnail);
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();

      const safeName = fileNameInput.trim().replace(/[^a-zA-Z0-9_-]/g, '_');
      const finalFileName = safeName ? `${safeName}.png` : `screenshot_${Date.now()}.png`;

      const res = await window.api.uploadB2({
        fileBuffer: buffer,
        fileName: finalFileName,
        mimeType: 'image/png',
        supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
        supabaseKey: process.env.REACT_APP_SUPABASE_ANON_KEY
      });

      if (!res.success) throw new Error(res.error || "Gagal mengunggah screenshot.");

      setEvidenceData({ video_evidence: res.url, network_logs: '[]' });
      setUploadedUrl(res.url);
    } catch (err) {
      console.error(err);
      alert('Gagal mengambil screenshot: ' + err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal advanced-recorder-modal" style={{ width: 700, maxWidth: '90vw' }}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Advanced Bug Recorder</h2>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
              Rekam layar Chrome + Sadap Log Jaringan (CDP)
            </div>
          </div>
          <button 
            onClick={onClose} 
            disabled={recording || processing}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-muted)', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '6px', 
              borderRadius: '8px', 
              transition: 'all 0.2s' 
            }} 
            onMouseOver={e => { e.currentTarget.style.background = 'var(--bg-lighter)'; e.currentTarget.style.color = 'var(--text-primary)'; }} 
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <X size={22} />
          </button>
        </div>

        <div className="modal-body">
          {!videoUrl && !recording && !uploadedUrl && (
            <div className="source-selection" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>
                  1. Nama File Evidence <span style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>(Opsional)</span>
                </label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Contoh: bug-login-error" 
                  value={fileNameInput}
                  onChange={e => setFileNameInput(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-lighter)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '10px 14px', borderRadius: 8, fontSize: 14 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>
                  2. Pilih Sumber Layar
                </label>
                
                {sources.length === 0 ? (
                  <div style={{ padding: '40px 20px', border: '2px dashed var(--border-color)', borderRadius: 12, textAlign: 'center', background: 'var(--bg-secondary)' }}>
                    <Monitor size={48} color="var(--text-muted)" style={{ marginBottom: 15 }} />
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>Belum Ada Layar Terpilih</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>
                      Izinkan aplikasi untuk mengakses daftar layar atau window yang sedang aktif.
                    </p>
                    <button className="btn btn-primary" onClick={handleFetchSources} style={{ padding: '10px 24px', borderRadius: 8, fontSize: 14 }}>
                      <Monitor size={18} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} />
                      Minta Akses Layar
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="sources-grid" style={{ marginTop: 10, maxHeight: '350px', overflowY: 'auto', paddingRight: '5px' }}>
                      {sources.map(src => (
                        <div 
                          key={src.id} 
                          className={`source-card ${selectedSource?.id === src.id ? 'selected' : ''}`}
                          onClick={() => setSelectedSource(src)}
                        >
                          <img src={src.thumbnail} alt={src.name} />
                          <p>{src.name}</p>
                        </div>
                      ))}
                    </div>
                    
                    {selectedSource && (
                      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                        <button className="btn btn-primary start-btn" onClick={handleStartRecording} disabled={processing} style={{ flex: 1, padding: '12px' }}>
                          <Video size={18} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} />
                          Mulai Rekam + Log Jaringan
                        </button>
                        <button className="btn btn-secondary" onClick={handleTakeScreenshot} disabled={processing} style={{ padding: '12px 20px' }}>
                          <Camera size={18} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} />
                          Ambil Screenshot
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {sources.length === 0 && (
                <div style={{ marginTop: 10, paddingTop: 20, borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    Ingin menyadap Network Log Chrome?
                  </div>
                  <button className="btn btn-secondary" onClick={async () => {
                    if (window.api?.launchChromeCdp) {
                      try {
                        await window.api.launchChromeCdp('https://www.google.com');
                      } catch (e) {
                        alert("Gagal meluncurkan Chrome: " + e.message);
                      }
                    } else {
                      alert("Fitur launchChromeCdp belum tersedia.");
                    }
                  }} style={{ fontSize: 13, padding: '6px 12px' }}>
                    <Chrome size={14} style={{ marginRight: 6, verticalAlign: 'text-bottom' }} />
                    Buka Chrome Debug Mode
                  </button>
                </div>
              )}
            </div>
          )}

          {recording && (
            <div className="recording-status">
              <div className="pulse-dot"></div>
              <h3 style={{ color: 'var(--text-primary)' }}>Sedang Merekam...</h3>
              <button className="btn btn-danger" onClick={handleStopRecording} style={{ marginTop: 15 }}>Berhenti Rekam</button>
            </div>
          )}

          {videoUrl && !uploadedUrl && (
            <div className="preview-container">
              <h3 style={{ color: 'var(--text-primary)', marginBottom: 10 }}>Preview Rekaman</h3>
              <video src={videoUrl} controls ref={videoRef} style={{ width: '100%', borderRadius: 8, background: '#000' }}></video>
              
              <div style={{ marginTop: 15, color: 'var(--text-muted)' }}>
                <code>Total {logs.length} Network Logs Tertangkap.</code>
              </div>
              
              <div style={{ marginTop: 15 }}>
                <label style={{ display: 'block', marginBottom: 5, fontSize: 13, color: 'var(--text-muted)' }}>
                  Ubah Nama File (Opsional):
                </label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Contoh: bug-login-error" 
                  value={fileNameInput}
                  onChange={e => setFileNameInput(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-lighter)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '8px 12px', borderRadius: 6 }}
                />
              </div>

              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button className="btn btn-secondary" onClick={() => {
                  setVideoUrl(null);
                  setLogs([]);
                  chunksRef.current = [];
                }} disabled={processing}>
                  Ulangi
                </button>
                <button className="btn btn-primary" onClick={handleUpload} disabled={processing}>
                  {processing ? 'Memproses & Mengunggah...' : 'Simpan Evidence'}
                </button>
              </div>
            </div>
          )}

          {uploadedUrl && (
            <div className="success-container" style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                <CheckCircle size={64} color="#10b981" />
              </div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: 10, fontSize: 24 }}>Upload Berhasil!</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 30, fontSize: 15 }}>Evidence Anda telah tersimpan dan siap dilampirkan.</p>
              
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-lighter)', padding: '10px 15px', borderRadius: 8, border: '1px solid var(--border-color)', marginBottom: 20 }}>
                <input 
                  type="text" 
                  readOnly 
                  value={uploadedUrl} 
                  style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
                />
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '6px 12px', marginLeft: 10 }}
                  onClick={() => {
                    navigator.clipboard.writeText(uploadedUrl);
                    alert('Link berhasil disalin ke clipboard!');
                  }}
                >
                  Copy Link
                </button>
              </div>

              <button className="btn btn-primary" onClick={() => onSave(evidenceData)} style={{ width: '100%', padding: '10px' }}>
                Lanjut ke Form Laporan Bug
              </button>
              
              <button className="btn btn-secondary" onClick={onClose} style={{ width: '100%', padding: '10px', marginTop: 10 }}>
                Selesai
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedRecorderModal;
