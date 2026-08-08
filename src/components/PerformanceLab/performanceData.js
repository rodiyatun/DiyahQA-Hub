// ─── Performance Lab Data ─────────────────────────────────────────────────────

export const ACADEMY_MODULES = [
  {
    id: 'basics',
    title: 'Dasar Performance Testing',
    icon: '📚',
    lessons: [
      {
        id: 'what-is',
        title: 'Apa itu Performance Testing?',
        content: `Performance testing adalah proses mengevaluasi kecepatan, skalabilitas, dan stabilitas sebuah sistem di bawah beban tertentu. Tujuannya bukan hanya memastikan aplikasi "berjalan", tetapi memastikan ia berjalan dengan baik ketika digunakan oleh banyak pengguna secara bersamaan.

Tanpa performance testing, kamu tidak akan tahu apakah sistem kamu akan crash saat ramai pengguna, seberapa lambat response time saat load tinggi, atau di titik mana server mulai kewalahan.`,
        keyPoints: [
          'Bukan hanya "apakah berjalan?" tapi "seberapa baik berjalan?"',
          'Dilakukan sebelum rilis ke production untuk mencegah insiden',
          'Memberikan data kuantitatif: angka, bukan asumsi',
          'Membantu tim engineering membuat keputusan kapasitas',
        ],
        example: null,
      },
      {
        id: 'types',
        title: 'Jenis-Jenis Performance Test',
        content: `Ada beberapa jenis performance test, masing-masing dengan tujuan berbeda. Memilih jenis yang tepat sangat penting agar kamu mendapatkan insight yang relevan.`,
        keyPoints: null,
        table: [
          { type: 'Load Test', goal: 'Validasi performa di beban normal/peak', when: 'Sebelum rilis, setelah perubahan besar' },
          { type: 'Stress Test', goal: 'Temukan titik batas sistem', when: 'Capacity planning, disaster preparedness' },
          { type: 'Spike Test', goal: 'Lihat reaksi sistem saat lonjakan tiba-tiba', when: 'Event flash sale, viral traffic' },
          { type: 'Soak Test', goal: 'Deteksi memory leak dan degradasi waktu', when: 'Sistem yang berjalan 24/7' },
          { type: 'Baseline Test', goal: 'Rekam performa awal sebagai referensi', when: 'Awal proyek, sebelum optimasi' },
        ],
      },
      {
        id: 'metrics',
        title: 'Metrik Penting yang Harus Dipahami',
        content: `Metrik adalah "bahasa" performance testing. Tanpa memahami artinya, hasil pengujian hanya sekumpulan angka.`,
        keyPoints: null,
        metrics: [
          { name: 'Response Time', desc: 'Waktu dari request dikirim sampai response diterima', good: '< 200ms', ok: '200ms – 1s', bad: '> 1s', tip: 'Selalu ukur p95/p99, bukan hanya rata-rata' },
          { name: 'Throughput (RPS)', desc: 'Jumlah request yang diproses server per detik', good: 'Sesuai target SLA', ok: '80% target', bad: '< 50% target', tip: 'Throughput yang turun saat VU naik = bottleneck' },
          { name: 'Error Rate', desc: 'Persentase request yang gagal (4xx/5xx)', good: '< 0.1%', ok: '0.1% – 1%', bad: '> 1%', tip: 'Error rate 0% bukan selalu bagus — cek apakah ada silent failure' },
          { name: 'p95 / p99', desc: '95% atau 99% request selesai dalam waktu ini', good: 'p95 < 1s', ok: 'p95 1–3s', bad: 'p95 > 3s', tip: 'p99 menggambarkan pengalaman pengguna terburuk' },
          { name: 'Concurrency (VU)', desc: 'Jumlah virtual user aktif bersamaan', good: 'Sesuai kapasitas', ok: '-', bad: 'Melebihi kapasitas server', tip: 'Naikkan VU secara bertahap, bukan langsung spike' },
          { name: 'Apdex Score', desc: 'Skor kepuasan pengguna 0.0–1.0 berdasarkan response time', good: '> 0.94', ok: '0.85–0.94', bad: '< 0.85', tip: 'Threshold default: satisfied < 0.5s, tolerating < 2s' },
        ],
      },
      {
        id: 'k6-intro',
        title: 'Pengenalan k6',
        content: `k6 adalah tool performance testing modern yang ditulis dalam Go, menggunakan JavaScript untuk scripting. Dibuat oleh Grafana Labs, open-source, dan sangat developer-friendly.

k6 cocok untuk:
- API testing dengan load simulasi
- Integration dalam CI/CD pipeline
- Testing microservices
- Performance regression testing`,
        keyPoints: [
          'Script ditulis dalam JavaScript (ES6+)',
          'Output berupa metrik terstruktur: p50, p95, p99, RPS, error rate',
          'Bisa dijalankan lokal atau di cloud (Grafana Cloud)',
          'Mendukung threshold untuk pass/fail otomatis',
          'Dapat diintegrasikan dengan Grafana, InfluxDB, Datadog',
        ],
        example: `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,        // 10 virtual users
  duration: '30s', // selama 30 detik
};

export default function () {
  const res = http.get('https://api.example.com/users');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}`,
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Teknik Lanjutan',
    icon: '🚀',
    lessons: [
      {
        id: 'thresholds',
        title: 'Menggunakan Thresholds',
        content: `Threshold adalah batas pass/fail otomatis dalam k6. Dengan threshold, pengujian bisa diintegrasikan ke CI/CD — jika threshold dilanggar, pipeline gagal otomatis.`,
        keyPoints: [
          'Threshold di-define di object options.thresholds',
          'Mendukung kondisi: avg, min, max, med, p(90), p(95), p(99)',
          'k6 akan exit dengan kode error jika threshold dilanggar',
          'Bisa dikombinasikan: beberapa threshold untuk satu metrik',
        ],
        example: `export const options = {
  thresholds: {
    // 95% request harus < 500ms
    http_req_duration: ['p(95)<500'],
    
    // Error rate harus < 1%
    http_req_failed: ['rate<0.01'],
    
    // Custom metric
    'http_req_duration{type:API}': ['avg<200', 'p(99)<1000'],
  },
};`,
      },
      {
        id: 'stages',
        title: 'Load Stages (Ramp Up/Down)',
        content: `Stages memungkinkan kamu mensimulasikan pola traffic yang realistis: mulai dari sedikit user, naik ke peak, lalu turun. Ini jauh lebih realistis daripada langsung set VU ke angka tinggi.`,
        keyPoints: [
          'Ramp up: naikkan VU bertahap untuk melihat titik degradasi',
          'Steady state: pertahankan VU di level tertentu untuk soak test',
          'Ramp down: turunkan VU untuk lihat apakah sistem recover',
          'Bisa kombinasi unlimited stage untuk skenario kompleks',
        ],
        example: `export const options = {
  stages: [
    { duration: '2m', target: 10 },  // ramp up ke 10 VU
    { duration: '5m', target: 10 },  // steady di 10 VU
    { duration: '2m', target: 50 },  // ramp up ke 50 VU (stress)
    { duration: '5m', target: 50 },  // steady di 50 VU
    { duration: '2m', target: 0 },   // ramp down
  ],
};`,
      },
      {
        id: 'checks',
        title: 'Checks dan Custom Metrics',
        content: `Checks adalah assertions dalam k6 — memverifikasi response sesuai ekspektasi. Custom metrics memungkinkan kamu track metrik bisnis spesifik, bukan hanya HTTP metrics standar.`,
        keyPoints: [
          'check() tidak menghentikan test — hanya merekam pass/fail',
          'Kombinasikan dengan fail() jika ingin stop test saat check gagal',
          'Custom metrics: Counter, Gauge, Rate, Trend',
          'Tag metrik untuk filtering hasil per endpoint',
        ],
        example: `import { check } from 'k6';
import { Counter, Trend } from 'k6/metrics';

const loginErrors = new Counter('login_errors');
const checkoutTime = new Trend('checkout_duration');

export default function () {
  const loginRes = http.post('/api/login', payload);
  
  const loginOk = check(loginRes, {
    'login success': (r) => r.status === 200,
    'token received': (r) => r.json('token') !== undefined,
  });
  
  if (!loginOk) loginErrors.add(1);
  
  const start = Date.now();
  http.post('/api/checkout', cartData);
  checkoutTime.add(Date.now() - start);
}`,
      },
    ],
  },
  {
    id: 'analysis',
    title: 'Analisis & Troubleshooting',
    icon: '🔍',
    lessons: [
      {
        id: 'bottleneck',
        title: 'Mendeteksi Bottleneck',
        content: `Bottleneck adalah titik sempit dalam sistem yang membatasi keseluruhan performa. Identifikasi bottleneck adalah skill terpenting dalam performance engineering.`,
        keyPoints: [
          'Response time naik tajam = server kewalahan memproses',
          'Error rate naik = server mulai reject request (connection refused, timeout)',
          'Throughput mendatar meski VU naik = bottleneck tercapai',
          'CPU > 80% = compute bottleneck',
          'Memory > 85% = memory pressure / potential GC pauses',
          'DB query time dominan = database bottleneck',
        ],
        table: [
          { symptom: 'p99 >> p50', cause: 'Outlier request (cold start, GC pause, lock contention)', fix: 'Profiling, connection pooling, caching' },
          { symptom: 'Throughput plateau', cause: 'Thread pool exhausted, connection limit', fix: 'Scale out, tune pool size' },
          { symptom: 'Error rate naik tiba-tiba', cause: 'Circuit breaker, rate limiter, OOM', fix: 'Cek logs, increase resources' },
          { symptom: 'Performa bagus awal, degradasi lama', cause: 'Memory leak, connection leak, disk full', fix: 'Profiling memory, soak test' },
        ],
      },
      {
        id: 'sla',
        title: 'Memahami SLA dan SLO',
        content: `SLA (Service Level Agreement) adalah komitmen formal tentang performa sistem. SLO (Service Level Objective) adalah target internal yang lebih ketat dari SLA.

Sebagai QA engineer, kamu bertanggung jawab memverifikasi sistem memenuhi SLA sebelum rilis.`,
        keyPoints: [
          'SLA: komitmen ke customer (eksternal)',
          'SLO: target internal tim engineering',
          'SLI: metrik aktual yang diukur',
          'Error budget: toleransi kegagalan dalam periode tertentu',
          'Typical web SLA: p95 < 500ms, availability 99.9%, error rate < 0.1%',
        ],
        example: `// Contoh SLA E-commerce:
// - Halaman produk: p95 < 300ms
// - Proses checkout: p95 < 2000ms  
// - API search: p95 < 500ms
// - Availability: 99.95% (downtime max 4.38 jam/tahun)
// - Error rate: < 0.5%

// Dalam k6 threshold:
export const options = {
  thresholds: {
    'http_req_duration{page:product}': ['p(95)<300'],
    'http_req_duration{page:checkout}': ['p(95)<2000'],
    'http_req_failed': ['rate<0.005'],
  },
};`,
      },
    ],
  },
];

export const PERFORMANCE_CHECKLIST = [
  {
    category: 'environment',
    label: '🌐 Environment',
    items: [
      { id: 'env1', text: 'Environment test terpisah dari production', detail: 'Jangan load test ke production langsung', risk: 'critical' },
      { id: 'env2', text: 'Environment test memiliki spesifikasi serupa production', detail: 'Minimal 70% dari kapasitas production', risk: 'high' },
      { id: 'env3', text: 'External services di-mock atau di-stub', detail: 'Payment gateway, email service, dll.', risk: 'high' },
      { id: 'env4', text: 'Monitoring aktif (CPU, Memory, DB connections)', detail: 'Grafana, DataDog, atau minimal server logs', risk: 'high' },
      { id: 'env5', text: 'Database pre-populated dengan data realistis', detail: 'Volume data mirip production', risk: 'medium' },
    ],
  },
  {
    category: 'scenario',
    label: '📋 Skenario',
    items: [
      { id: 'sc1', text: 'Target VU / RPS sudah ditentukan berdasarkan data traffic', detail: 'Lihat Google Analytics, Datadog, atau estimasi bisnis', risk: 'critical' },
      { id: 'sc2', text: 'SLA / threshold sudah didefinisikan sebelum test', detail: 'p95, error rate, availability target', risk: 'critical' },
      { id: 'sc3', text: 'Skenario mencakup user journey, bukan hanya satu endpoint', detail: 'Login → Browse → Add to Cart → Checkout', risk: 'high' },
      { id: 'sc4', text: 'Think time / sleep antar request sudah disesuaikan', detail: 'User nyata tidak request setiap milidetik', risk: 'medium' },
      { id: 'sc5', text: 'Test data (user, produk, dll.) sudah disiapkan', detail: 'Jangan test dengan hanya 1 akun user', risk: 'high' },
    ],
  },
  {
    category: 'script',
    label: '📝 Script',
    items: [
      { id: 'sk1', text: 'Script sudah di-test dengan 1 VU sebelum full load', detail: 'Pastikan tidak ada error di script itu sendiri', risk: 'critical' },
      { id: 'sk2', text: 'Checks / assertions sudah diimplementasi', detail: 'Validasi status code dan response body', risk: 'high' },
      { id: 'sk3', text: 'Authentication ditangani dengan benar', detail: 'Token refresh, session management', risk: 'high' },
      { id: 'sk4', text: 'Dynamic data di-parameterisasi', detail: 'ID produk, user ID menggunakan data dari file/array', risk: 'medium' },
      { id: 'sk5', text: 'Correlation sudah diimplementasi', detail: 'Token dari response login dipakai di request berikutnya', risk: 'high' },
    ],
  },
  {
    category: 'execution',
    label: '▶️ Eksekusi',
    items: [
      { id: 'ex1', text: 'Ada rencana stop test jika error rate > threshold darurat', detail: 'Jangan terus jalankan test yang merusak environment', risk: 'critical' },
      { id: 'ex2', text: 'Tim dev / ops sudah dinotifikasi sebelum test', detail: 'Mereka perlu monitor dari sisi server', risk: 'high' },
      { id: 'ex3', text: 'Baseline test sudah dijalankan sebelumnya', detail: 'Untuk perbandingan hasil', risk: 'medium' },
      { id: 'ex4', text: 'Hasil test akan disimpan / diarsipkan', detail: 'Untuk trend analysis', risk: 'medium' },
      { id: 'ex5', text: 'Waktu eksekusi sesuai (bukan jam sibuk production)', detail: 'Jalankan di luar jam kerja jika memakai environment shared', risk: 'low' },
    ],
  },
];

export const PERFORMANCE_CHALLENGES = [
  {
    id: 'ch1',
    title: 'E-Commerce Flash Sale',
    difficulty: 'easy',
    scenario: 'Tim sedang mempersiapkan flash sale. Target: 500 concurrent users, SLA p95 < 2s, error rate < 1%.',
    metrics: {
      vus: 500,
      duration: '10m',
      http_req_duration: { avg: 450, med: 380, p90: 890, p95: 1850, p99: 4200, min: 45, max: 8900 },
      http_req_failed: { rate: 0.008 },
      http_reqs: { rate: 312 },
    },
    sla: { p95: 2000, errorRate: 0.01 },
    questions: [
      {
        q: 'Apakah sistem memenuhi SLA p95?',
        options: ['Ya, p95 1850ms < 2000ms', 'Tidak, p95 terlalu tinggi', 'Tidak bisa ditentukan'],
        answer: 0,
        explanation: 'p95 = 1850ms masih di bawah threshold 2000ms. Sistem PASS untuk SLA ini, tapi sangat mepet — perlu investigasi lebih lanjut.',
      },
      {
        q: 'Apakah error rate memenuhi SLA?',
        options: ['Ya, 0.8% < 1%', 'Tidak, 0.8% terlalu tinggi', 'Perlu data lebih'],
        answer: 0,
        explanation: '0.8% (0.008 rate) masih di bawah threshold 1%. PASS, tapi perlu diinvestigasi error apa yang terjadi.',
      },
      {
        q: 'Apa yang menarik perhatian dari gap p95 (1850ms) vs p99 (4200ms)?',
        options: ['Normal, selalu ada gap', 'Gap terlalu besar — ada outlier request yang sangat lambat', 'p99 tidak perlu diperhatikan'],
        answer: 1,
        explanation: 'Gap p95 ke p99 yang besar (1850ms → 4200ms) mengindikasikan ada sebagian kecil request yang jauh lebih lambat. Ini bisa memory GC pause, database lock, atau cold start. Perlu ditelusuri lebih lanjut.',
      },
    ],
  },
  {
    id: 'ch2',
    title: 'API Payment Gateway',
    difficulty: 'medium',
    scenario: 'Tim fintech menguji API payment. Target: 100 RPS, SLA p95 < 500ms, error rate < 0.1%.',
    metrics: {
      vus: 200,
      duration: '5m',
      http_req_duration: { avg: 280, med: 210, p90: 520, p95: 780, p99: 1200, min: 80, max: 3400 },
      http_req_failed: { rate: 0.0005 },
      http_reqs: { rate: 87 },
    },
    sla: { p95: 500, errorRate: 0.001 },
    questions: [
      {
        q: 'Apakah sistem memenuhi SLA p95?',
        options: ['Ya, masih di bawah 500ms', 'Tidak, p95 780ms > 500ms SLA', 'Butuh lebih banyak data'],
        answer: 1,
        explanation: 'p95 = 780ms melewati SLA 500ms. FAIL. Sistem tidak siap rilis untuk beban ini.',
      },
      {
        q: 'Throughput aktual 87 RPS, target 100 RPS. Apa artinya?',
        options: [
          'Sistem sudah mencapai maksimum kapasitasnya',
          'Script k6 ada bug',
          'Bisa jadi think time terlalu tinggi atau VU tidak cukup',
        ],
        answer: 0,
        explanation: 'Throughput yang tidak mencapai target di beban VU yang ada biasanya berarti server sudah kewalahan dan mulai membatasi throughput. Kombinasikan dengan p95 yang tinggi — ini konfirmasi bottleneck.',
      },
      {
        q: 'Error rate 0.05% sangat bagus. Tapi apakah ini benar-benar aman untuk payment?',
        options: [
          'Ya, 0.05% jauh di bawah threshold 0.1%',
          'Perlu investigasi — 0.05% error dalam payment bisa berarti transaksi gagal yang nyata',
          'Error rate payment tidak penting selama < 1%',
        ],
        answer: 1,
        explanation: 'Untuk sistem payment, SETIAP error harus diinvestigasi. 0.05% dari 100 RPS = 0.05 transaksi gagal/detik = 3 transaksi gagal/menit. Ini bisa berarti kerugian nyata. Selalu analisis error log, jangan hanya lihat angka persentase.',
      },
    ],
  },
  {
    id: 'ch3',
    title: 'Memory Leak Detection',
    difficulty: 'hard',
    scenario: 'Tim melakukan soak test selama 2 jam dengan 50 VU konstan. Sistem ini adalah aplikasi Node.js.',
    metrics: {
      vus: 50,
      duration: '2h',
      http_req_duration: {
        avg_0min: 120, avg_30min: 145, avg_60min: 210, avg_90min: 380, avg_120min: 890,
        p95_0min: 280, p95_30min: 340, p95_60min: 580, p95_90min: 1200, p95_120min: 3400,
      },
      http_req_failed: { rate: 0.002 },
      http_reqs: { rate: 145 },
      memory_mb: { t0: 380, t30: 520, t60: 720, t90: 950, t120: 1380 },
    },
    sla: { p95: 1000, errorRate: 0.01 },
    questions: [
      {
        q: 'Apa pola yang kamu lihat dari data avg response time dari menit 0 hingga 120?',
        options: [
          'Stabil — normal',
          'Naik perlahan — kemungkinan memory leak atau resource accumulation',
          'Fluktuatif — bukan masalah',
        ],
        answer: 1,
        explanation: '120ms → 890ms dalam 2 jam dengan VU konstan adalah tanda klasik degradasi performa akibat akumulasi resource. Dikombinasikan dengan data memori yang terus naik (380MB → 1380MB), ini sangat kuat menunjukkan memory leak.',
      },
      {
        q: 'Memory naik dari 380MB ke 1380MB dalam 2 jam. Apa kesimpulanmu?',
        options: [
          'Normal — aplikasi membutuhkan lebih banyak memory saat load',
          'Memory leak — memory terus naik tanpa pernah turun (tidak ada GC yang efektif)',
          'Server kehabisan disk',
        ],
        answer: 1,
        explanation: 'Memory yang naik terus-menerus secara linear tanpa GC (garbage collection) yang membersihkannya kembali adalah definisi memory leak. Dalam Node.js ini bisa disebabkan oleh event listener yang tidak dihapus, closure yang menyimpan reference, atau global variable yang terus bertambah.',
      },
      {
        q: 'Sistem masih PASS SLA (p95 < 1000ms) hingga menit ke 90. Apakah boleh dirilis?',
        options: [
          'Ya, saat ini masih memenuhi SLA',
          'Tidak — tren jelas akan melewati SLA. Sistem tidak stabil untuk production jangka panjang',
          'Tergantung durasi pemakaian di production',
        ],
        answer: 1,
        explanation: 'Keputusan rilis tidak boleh hanya berdasarkan snapshot saat ini. Tren yang jelas menuju kegagalan harus diselesaikan dulu. Di production, sistem berjalan 24/7 — dalam hitungan jam sistem ini akan melewati SLA dan akhirnya crash (OOM). Ini adalah blocker release.',
      },
    ],
  },
];
