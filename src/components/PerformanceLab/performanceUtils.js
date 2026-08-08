// ─── Rule-based Report Analyzer ───────────────────────────────────────────────

export function analyzeK6Report(metrics) {
  const findings = [];
  const { p95, p99, avg, errorRate, rps, vus } = metrics;

  // ── Response Time Analysis ──
  if (p95 !== undefined) {
    if (p95 < 200) {
      findings.push({ level: 'pass', category: 'Response Time', title: 'p95 Excellent', message: `p95 ${p95}ms sangat baik. Sistem merespons cepat untuk 95% pengguna.`, recommendation: null });
    } else if (p95 < 500) {
      findings.push({ level: 'pass', category: 'Response Time', title: 'p95 Good', message: `p95 ${p95}ms masih dalam batas baik (< 500ms). Cocok untuk aplikasi web umum.`, recommendation: 'Pertahankan dan monitor tren.' });
    } else if (p95 < 1000) {
      findings.push({ level: 'warn', category: 'Response Time', title: 'p95 Acceptable', message: `p95 ${p95}ms terasa lambat bagi sebagian pengguna. Google merekomendasikan < 500ms untuk kepuasan pengguna optimal.`, recommendation: 'Investigasi query DB, tambahkan caching, atau scale resource.' });
    } else if (p95 < 3000) {
      findings.push({ level: 'fail', category: 'Response Time', title: 'p95 Slow', message: `p95 ${p95}ms melewati ambang batas 1s. Ini akan berdampak signifikan pada konversi dan user experience.`, recommendation: 'Profiling application diperlukan. Cek: N+1 query, missing index, koneksi DB pool habis.' });
    } else {
      findings.push({ level: 'fail', category: 'Response Time', title: 'p95 Critical', message: `p95 ${p95}ms sangat tinggi. Sistem hampir tidak dapat digunakan di bawah beban ini.`, recommendation: 'BLOCKER. Jangan rilis. Butuh investigasi mendalam dan kemungkinan perubahan arsitektur.' });
    }
  }

  // ── p99 vs p95 Gap Analysis ──
  if (p95 !== undefined && p99 !== undefined) {
    const gap = p99 - p95;
    const ratio = p99 / p95;
    if (ratio > 3) {
      findings.push({ level: 'warn', category: 'Outlier Detection', title: 'Gap p95→p99 Terlalu Besar', message: `p95: ${p95}ms → p99: ${p99}ms (${ratio.toFixed(1)}x lipat). Ada request yang jauh lebih lambat dari mayoritas.`, recommendation: 'Cek GC pause (Java/Node.js), database lock contention, cold start, atau request yang mengakses data besar.' });
    } else if (ratio > 2) {
      findings.push({ level: 'warn', category: 'Outlier Detection', title: 'Gap p95→p99 Perlu Perhatian', message: `Ratio p99/p95 = ${ratio.toFixed(1)}x. Ada variabilitas response time yang cukup tinggi.`, recommendation: 'Monitor lebih lanjut. Cek apakah ada pola spesifik (endpoint tertentu, waktu tertentu).' });
    }
  }

  // ── Error Rate Analysis ──
  if (errorRate !== undefined) {
    const errPct = (errorRate * 100).toFixed(2);
    if (errorRate === 0) {
      findings.push({ level: 'pass', category: 'Reliability', title: 'Error Rate Perfect', message: 'Tidak ada error selama pengujian.', recommendation: 'Pastikan checks sudah memvalidasi response body, bukan hanya status code.' });
    } else if (errorRate < 0.001) {
      findings.push({ level: 'pass', category: 'Reliability', title: `Error Rate ${errPct}% (Excellent)`, message: 'Error rate sangat rendah. Sistem sangat reliable.', recommendation: 'Investigasi error yang ada meskipun sedikit — terutama untuk sistem payment/kritis.' });
    } else if (errorRate < 0.01) {
      findings.push({ level: 'warn', category: 'Reliability', title: `Error Rate ${errPct}% (Perlu Perhatian)`, message: 'Error rate di bawah 1% tapi perlu diinvestigasi.', recommendation: 'Analisis jenis error (4xx vs 5xx). 4xx = masalah script/data. 5xx = masalah server.' });
    } else if (errorRate < 0.05) {
      findings.push({ level: 'fail', category: 'Reliability', title: `Error Rate ${errPct}% (Tinggi)`, message: 'Error rate > 1% tidak dapat diterima untuk sistem production.', recommendation: 'FAIL. Cek server logs untuk pola error. Kemungkinan: connection pool exhausted, timeout, OOM.' });
    } else {
      findings.push({ level: 'fail', category: 'Reliability', title: `Error Rate ${errPct}% (Critical)`, message: `${errPct}% request gagal — sistem tidak stabil sama sekali di beban ini.`, recommendation: 'BLOCKER. Sistem tidak siap rilis. Turunkan VU target atau scale up infrastruktur.' });
    }
  }

  // ── Throughput Analysis ──
  if (rps !== undefined && vus !== undefined) {
    const rpsPerVU = rps / vus;
    if (rpsPerVU < 0.1) {
      findings.push({ level: 'warn', category: 'Throughput', title: 'RPS per VU Rendah', message: `${rps} RPS dari ${vus} VU = ${rpsPerVU.toFixed(2)} RPS/VU. Throughput rendah relatif terhadap VU.`, recommendation: 'Kemungkinan think time terlalu tinggi di script, atau response time sangat lambat sehingga VU antri.' });
    }
    if (rps < 10) {
      findings.push({ level: 'warn', category: 'Throughput', title: 'Throughput Rendah', message: `Hanya ${rps} RPS. Untuk kebanyakan aplikasi web ini sangat rendah.`, recommendation: 'Cek apakah VU sudah cukup, think time tidak terlalu panjang, dan koneksi tidak di-throttle.' });
    }
  }

  // ── avg vs p95 Analysis ──
  if (avg !== undefined && p95 !== undefined) {
    const ratio = p95 / avg;
    if (ratio > 5) {
      findings.push({ level: 'warn', category: 'Distribution', title: 'Distribusi Response Time Tidak Merata', message: `avg: ${avg}ms tapi p95: ${p95}ms (${ratio.toFixed(1)}x lipat). Rata-rata menyembunyikan banyak outlier lambat.`, recommendation: 'Selalu gunakan p95/p99 sebagai SLA metric, bukan rata-rata. Rata-rata bisa menyesatkan.' });
    }
  }

  // ── Overall Score ──
  const fails = findings.filter(f => f.level === 'fail').length;
  const warns = findings.filter(f => f.level === 'warn').length;
  let verdict, verdictClass;
  if (fails === 0 && warns === 0) { verdict = 'EXCELLENT'; verdictClass = 'verdict-excellent'; }
  else if (fails === 0 && warns <= 2) { verdict = 'PASS'; verdictClass = 'verdict-pass'; }
  else if (fails === 0) { verdict = 'PASS WITH CONCERNS'; verdictClass = 'verdict-warn'; }
  else { verdict = 'FAIL'; verdictClass = 'verdict-fail'; }

  return { findings, verdict, verdictClass };
}

// ─── k6 Script Generator ──────────────────────────────────────────────────────

export function generateK6Script(scenario) {
  const {
    name, baseUrl, endpoints, testType,
    vus, duration, rampUp, rampDown,
    thresholdP95, thresholdErrorRate,
    headers, authType, authToken,
    thinkTime,
  } = scenario;

  const authHeader = authType === 'bearer'
    ? `\n  'Authorization': 'Bearer ${authToken || '<YOUR_TOKEN>'}',`
    : authType === 'basic'
    ? `\n  'Authorization': 'Basic ${authToken || btoa('<user>:<pass>')}',`
    : '';

  const stagesBlock = testType === 'load'
    ? `  stages: [
    { duration: '${rampUp || '2m'}', target: ${vus} },
    { duration: '${duration || '5m'}', target: ${vus} },
    { duration: '${rampDown || '1m'}', target: 0 },
  ],`
    : testType === 'stress'
    ? `  stages: [
    { duration: '2m', target: ${Math.round(vus * 0.5)} },
    { duration: '3m', target: ${vus} },
    { duration: '3m', target: ${vus * 2} },
    { duration: '3m', target: ${vus * 3} },
    { duration: '2m', target: 0 },
  ],`
    : testType === 'spike'
    ? `  stages: [
    { duration: '1m', target: 5 },
    { duration: '30s', target: ${vus} },
    { duration: '1m', target: ${vus} },
    { duration: '30s', target: 5 },
    { duration: '1m', target: 5 },
  ],`
    : testType === 'soak'
    ? `  stages: [
    { duration: '5m', target: ${vus} },
    { duration: '${duration || '2h'}', target: ${vus} },
    { duration: '5m', target: 0 },
  ],`
    : `  vus: ${vus},\n  duration: '${duration || '5m'}',`;

  const endpointCalls = (endpoints || []).map((ep, i) => {
    const method = (ep.method || 'GET').toLowerCase();
    const url = `\`${baseUrl}${ep.path}\``;
    const hasBody = ['post', 'put', 'patch'].includes(method);
    const bodyStr = hasBody ? `, JSON.stringify(${ep.body || '{}'}), { headers: { ...defaultHeaders, \'Content-Type\': \'application/json\' } })` : `, { headers: defaultHeaders })`;

    return `
  // ${ep.name || `Request ${i + 1}`}
  const res${i + 1} = http.${method}(${url}${bodyStr};
  check(res${i + 1}, {
    '${ep.name || `req${i + 1}`} status 200': (r) => r.status === 200,
    '${ep.name || `req${i + 1}`} duration < ${thresholdP95 || 1000}ms': (r) => r.timings.duration < ${thresholdP95 || 1000},
  });
  sleep(${thinkTime || 1});`;
  }).join('\n');

  return `import http from 'k6/http';
import { check, sleep } from 'k6';

// ── Test: ${name || 'Performance Test'} ──────────────────────────────────────
export const options = {
  ${stagesBlock}
  thresholds: {
    http_req_duration: ['p(95)<${thresholdP95 || 1000}'],
    http_req_failed: ['rate<${thresholdErrorRate || 0.01}'],
  },
};

const BASE_URL = '${baseUrl || 'https://api.example.com'}';

const defaultHeaders = {
  'Content-Type': 'application/json',${authHeader}
};

export default function () {
${endpointCalls || `
  const res = http.get(\`\${BASE_URL}/\`, { headers: defaultHeaders });
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(${thinkTime || 1});`}
}
`;
}

// ─── Trend Comparison ─────────────────────────────────────────────────────────

export function compareTrends(runs) {
  if (runs.length < 2) return null;
  const latest = runs[runs.length - 1];
  const previous = runs[runs.length - 2];

  return {
    p95: {
      current: latest.p95,
      previous: previous.p95,
      diff: latest.p95 - previous.p95,
      pct: previous.p95 ? (((latest.p95 - previous.p95) / previous.p95) * 100).toFixed(1) : null,
      regression: latest.p95 > previous.p95 * 1.1,
    },
    errorRate: {
      current: latest.errorRate,
      previous: previous.errorRate,
      diff: latest.errorRate - previous.errorRate,
      regression: latest.errorRate > previous.errorRate * 1.5,
    },
    rps: {
      current: latest.rps,
      previous: previous.rps,
      diff: latest.rps - previous.rps,
      regression: latest.rps < previous.rps * 0.9,
    },
  };
}
