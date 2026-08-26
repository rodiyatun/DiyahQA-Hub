const CDP = require('chrome-remote-interface');
const { spawn } = require('child_process');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Mengatur *path* biner ffmpeg agar fluent-ffmpeg tahu lokasinya
ffmpeg.setFfmpegPath(ffmpegPath);

let chromeProcess = null;
let cdpClient = null;
let networkLogs = [];

/**
 * Meluncurkan Chrome dengan remote debugging diaktifkan
 */
function launchChrome(url = 'https://www.google.com') {
  return new Promise((resolve, reject) => {
    try {
      const isMac = process.platform === 'darwin';
      // Path Chrome standar untuk Mac dan Windows
      const chromePath = isMac 
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

      chromeProcess = spawn(chromePath, [
        `--remote-debugging-port=9222`,
        `--user-data-dir=${path.join(process.cwd(), 'temp_chrome_profile')}`,
        url
      ]);

      // Beri waktu sejenak agar Chrome terbuka sepenuhnya
      setTimeout(() => {
        resolve();
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Menghubungkan ke CDP dan mulai merekam lalu lintas jaringan
 */
async function startNetworkLog() {
  try {
    networkLogs = [];
    cdpClient = await CDP({ port: 9222 });
    const { Network } = cdpClient;

    await Network.enable();

    Network.requestWillBeSent((params) => {
      networkLogs.push({
        type: 'request',
        url: params.request.url,
        method: params.request.method,
        timestamp: params.timestamp,
        // Catatan: Header disembunyikan agar token otentikasi tidak bocor
      });
    });

    Network.responseReceived(async (params) => {
      let responseBody = undefined;
      
      // Ambil isi (body) response hanya untuk API (XHR/Fetch/JSON) agar tidak terlalu berat
      if (params.type === 'XHR' || params.type === 'Fetch' || (params.response.mimeType && params.response.mimeType.includes('application/json'))) {
        try {
          const result = await Network.getResponseBody({ requestId: params.requestId });
          responseBody = result.body;
        } catch (e) {
          // Abaikan error jika body tidak bisa diambil (misal: redirect, CORS, atau sudah dihapus Chrome)
        }
      }

      networkLogs.push({
        type: 'response',
        url: params.response.url,
        status: params.response.status,
        mimeType: params.response.mimeType,
        timestamp: params.timestamp,
        response_body: responseBody
      });
    });

    return true;
  } catch (err) {
    console.error('CDP Connection failed:', err);
    throw err;
  }
}

/**
 * Menghentikan penyadapan CDP, menutup Chrome, dan mengembalikan data Log
 */
async function stopNetworkLog() {
  if (cdpClient) {
    await cdpClient.close();
    cdpClient = null;
  }
  if (chromeProcess) {
    chromeProcess.kill();
    chromeProcess = null;
  }
  return networkLogs;
}

/**
 * Kompresi Video WebM ke MP4 menggunakan FFmpeg
 */
function compressVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoCodec('libx264')
      .outputOptions([
        '-crf 28', // Compress ratio (lebih rendah = lebih bagus, lebih tinggi = lebih kecil ukurannya)
        '-preset fast'
      ])
      .save(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err));
  });
}

/**
 * Unggah ke Supabase Storage
 */
async function uploadToB2(fileBuffer, fileName, mimeType = 'video/mp4', supabaseUrlParam, supabaseKeyParam) {
  const supabaseUrl = supabaseUrlParam || process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = supabaseKeyParam || process.env.REACT_APP_SUPABASE_ANON_KEY;
  const bucketName = 'bug-evidences';

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL atau Key tidak ditemukan di environment variables.');
  }

  const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucketName}/${fileName}`;

  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
        'Content-Type': mimeType,
      },
      body: fileBuffer,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload gagal: ${response.status} ${errorText}`);
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${fileName}`;
    return publicUrl;
  } catch (err) {
    console.error('Supabase Upload Error:', err);
    throw err;
  }
}

module.exports = {
  launchChrome,
  startNetworkLog,
  stopNetworkLog,
  compressVideo,
  uploadToB2
};
