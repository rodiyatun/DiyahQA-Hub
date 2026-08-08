// ─── OWASP Top 10 & Security Data ─────────────────────────────────────────────

export const OWASP_TOP10 = [
  {
    id: 'A01',
    rank: 'A01:2021',
    title: 'Broken Access Control',
    severity: 'critical',
    desc: 'Kontrol akses yang lemah memungkinkan pengguna mengakses data/fungsi di luar izin mereka.',
    detail: 'Terjadi ketika aplikasi tidak memvalidasi apakah pengguna memiliki izin untuk melakukan aksi atau mengakses resource tertentu.',
    example: `// Vulnerable: mengakses data user lain
GET /api/users/123/profile   (padahal user login adalah id=456)
GET /api/admin/users         (tanpa validasi role admin)

// URL Manipulation
https://app.com/user?id=1  → ganti jadi id=2 untuk akses data orang lain`,
    prevention: [
      'Implementasi deny by default — tolak semua akses kecuali yang diizinkan eksplisit',
      'Validasi kepemilikan resource di setiap request (bukan hanya di frontend)',
      'Gunakan RBAC (Role-Based Access Control) yang konsisten',
      'Log semua percobaan akses yang gagal',
      'Jangan expose object ID langsung di URL — gunakan token acak',
    ],
    testCases: [
      { type: 'negative', text: 'Akses endpoint admin sebagai regular user → harus 403 Forbidden' },
      { type: 'negative', text: 'Ubah ID di URL ke ID milik user lain → harus 403 atau 404' },
      { type: 'positive', text: 'Akses resource milik sendiri dengan token valid → harus 200 OK' },
      { type: 'negative', text: 'Hapus header Authorization → harus 401 Unauthorized' },
    ],
  },
  {
    id: 'A02',
    rank: 'A02:2021',
    title: 'Cryptographic Failures',
    severity: 'critical',
    desc: 'Data sensitif tidak dienkripsi atau menggunakan algoritma enkripsi yang lemah.',
    detail: 'Data sensitif seperti password, kartu kredit, dan informasi pribadi harus dilindungi dengan enkripsi yang kuat.',
    example: `// Bad: Password di-hash dengan MD5 (mudah di-crack)
md5("password123") = "482c811da5d5b4bc6d497ffa98491e38"

// Bad: Data sensitif di URL
GET /login?user=admin&password=secret123

// Bad: HTTP instead of HTTPS untuk transmisi data sensitif`,
    prevention: [
      'Gunakan bcrypt/argon2 untuk hash password (bukan MD5/SHA1)',
      'Enkripsi data sensitif at-rest dengan AES-256',
      'Selalu gunakan HTTPS/TLS untuk transmisi data',
      'Jangan simpan data sensitif yang tidak perlu',
      'Gunakan HSTS header untuk paksa HTTPS',
    ],
    testCases: [
      { type: 'negative', text: 'Coba akses aplikasi via HTTP → harus redirect ke HTTPS' },
      { type: 'negative', text: 'Periksa response API — password tidak boleh ada di response JSON' },
      { type: 'negative', text: 'Cek cookie — harus ada flag Secure dan HttpOnly' },
      { type: 'positive', text: 'Login dengan kredensial benar → token JWT valid diterima' },
    ],
  },
  {
    id: 'A03',
    rank: 'A03:2021',
    title: 'Injection',
    severity: 'critical',
    desc: 'Input pengguna yang tidak divalidasi dieksekusi sebagai perintah SQL, OS, atau kode lainnya.',
    detail: 'SQL Injection, XSS, dan Command Injection adalah bentuk paling umum. Terjadi ketika data tidak dipercaya dikirim ke interpreter.',
    example: `// SQL Injection
Input: username = ' OR '1'='1
Query: SELECT * FROM users WHERE username='' OR '1'='1'
Result: Bypass login!

// XSS (Cross-Site Scripting)
Input: <script>alert(document.cookie)</script>
Result: Script dieksekusi di browser korban`,
    prevention: [
      'Gunakan parameterized queries / prepared statements',
      'Validasi dan sanitize semua input di server-side',
      'Encode output sebelum ditampilkan (HTML encoding)',
      'Gunakan Content Security Policy (CSP)',
      'Hindari eval(), innerHTML dengan data tidak terpercaya',
    ],
    testCases: [
      { type: 'negative', text: "Input ' OR '1'='1 di field login → harus error validasi, bukan bypass" },
      { type: 'negative', text: 'Input <script>alert(1)</script> di form → tidak boleh dieksekusi' },
      { type: 'negative', text: "Input '; DROP TABLE users; -- → tidak boleh ada error SQL di response" },
      { type: 'positive', text: 'Input normal tanpa karakter khusus → diterima dan diproses normal' },
    ],
  },
  {
    id: 'A04',
    rank: 'A04:2021',
    title: 'Insecure Design',
    severity: 'high',
    desc: 'Kelemahan pada desain arsitektur dan pola keamanan yang tidak ada sejak awal.',
    detail: 'Berbeda dengan implementasi yang buruk — ini tentang tidak adanya kontrol keamanan yang seharusnya ada sejak fase desain.',
    example: `// Bad Design: Reset password hanya menggunakan pertanyaan keamanan
// Bad Design: Tidak ada rate limiting di endpoint login
// Bad Design: OTP dikirim di response API (seharusnya hanya via SMS/email)

GET /api/forgot-password?email=victim@email.com
Response: {"otp": "123456"}  // OTP tidak boleh di response!`,
    prevention: [
      'Lakukan threat modeling di fase desain',
      'Implementasi rate limiting di semua endpoint sensitif',
      'Gunakan multi-factor authentication untuk aksi kritis',
      'Pisahkan tenant data secara logis',
      'Prinsip least privilege: berikan akses minimum yang diperlukan',
    ],
    testCases: [
      { type: 'negative', text: 'Kirim 100 request login gagal dalam 1 menit → harus ada rate limiting/lockout' },
      { type: 'negative', text: 'OTP tidak boleh muncul di response API atau log yang bisa diakses user' },
      { type: 'negative', text: 'Reset password link harus expired setelah digunakan atau timeout' },
    ],
  },
  {
    id: 'A05',
    rank: 'A05:2021',
    title: 'Security Misconfiguration',
    severity: 'high',
    desc: 'Konfigurasi keamanan yang salah atau tidak lengkap pada server, database, dan framework.',
    detail: 'Error messages yang terlalu detail, default credentials, unnecessary features enabled, missing security headers.',
    example: `// Exposed stack trace di production
{"error": "SQLException at line 42 in /app/models/User.java..."}

// Default credentials masih aktif
admin:admin, admin:password, root:root

// Unnecessary HTTP methods enabled
TRACE, OPTIONS, DELETE tersedia di endpoint yang tidak perlu`,
    prevention: [
      'Hapus fitur, dokumentasi, dan akun default yang tidak diperlukan',
      'Terapkan hardened configuration di semua layer',
      'Pesan error generic untuk user, detail hanya di log server',
      'Aktifkan security headers: X-Frame-Options, CSP, HSTS, dll.',
      'Review konfigurasi secara berkala',
    ],
    testCases: [
      { type: 'negative', text: 'Error 500 tidak boleh menampilkan stack trace ke user' },
      { type: 'negative', text: 'Endpoint /phpinfo.php, /.git, /admin tidak boleh accessible di production' },
      { type: 'negative', text: 'Response header tidak boleh mengekspos versi server (Server: Apache/2.4.x)' },
    ],
  },
  {
    id: 'A06',
    rank: 'A06:2021',
    title: 'Vulnerable Components',
    severity: 'medium',
    desc: 'Menggunakan library, framework, atau komponen dengan kerentanan yang diketahui.',
    detail: 'Dependency yang outdated atau unpatched bisa menjadi attack vector meski kode aplikasi sudah aman.',
    example: `// npm audit menunjukkan:
lodash@4.17.15 - Prototype Pollution (High)
axios@0.18.0 - SSRF (Critical)
jquery@1.12.4 - XSS (Medium)

// Check dengan:
npm audit
yarn audit
OWASP Dependency-Check`,
    prevention: [
      'Jalankan npm audit / yarn audit secara rutin',
      'Update dependency secara berkala',
      'Gunakan tools seperti Snyk, Dependabot',
      'Hapus dependency yang tidak digunakan',
      'Monitor CVE database untuk komponen yang digunakan',
    ],
    testCases: [
      { type: 'negative', text: 'Jalankan npm audit → tidak boleh ada vulnerability Critical atau High' },
      { type: 'negative', text: 'Periksa package.json — tidak boleh ada versi yang sangat outdated' },
    ],
  },
  {
    id: 'A07',
    rank: 'A07:2021',
    title: 'Auth & Session Failures',
    severity: 'critical',
    desc: 'Implementasi autentikasi dan manajemen session yang lemah.',
    detail: 'Termasuk brute force attack, session fixation, session tidak expire, credential exposure.',
    example: `// Bad: Session ID di URL
GET /dashboard?sessionId=abc123

// Bad: Session tidak expire
Token JWT dengan exp: never

// Bad: Weak password policy
Password min 4 karakter, tidak ada validasi kompleksitas`,
    prevention: [
      'Implementasi brute force protection (lockout, rate limiting, CAPTCHA)',
      'Session harus expire setelah idle dan setelah logout',
      'Jangan simpan session ID di URL',
      'Gunakan secure, HttpOnly cookie untuk session',
      'Invalidate semua session saat logout',
    ],
    testCases: [
      { type: 'negative', text: 'Login dengan password salah 10x → harus ada lockout atau delay' },
      { type: 'negative', text: 'Setelah logout, session token lama tidak boleh bisa digunakan' },
      { type: 'negative', text: 'JWT token tanpa expiry tidak boleh diterima' },
      { type: 'positive', text: 'Login sukses → session token baru, session sebelumnya invalidated' },
    ],
  },
  {
    id: 'A08',
    rank: 'A08:2021',
    title: 'Software & Data Integrity',
    severity: 'high',
    desc: 'Kode dan infrastruktur tidak memvalidasi integritas software dan data update.',
    detail: 'Supply chain attack, insecure deserialization, CDN tanpa integrity check.',
    example: `// Bad: CDN tanpa SRI (Subresource Integrity)
<script src="https://cdn.example.com/jquery.js"></script>

// Good: Dengan SRI
<script 
  src="https://cdn.example.com/jquery.js"
  integrity="sha384-..."
  crossorigin="anonymous">

// Bad: Deserialize untrusted data
Object.fromJSON(userInputData)`,
    prevention: [
      'Gunakan Subresource Integrity (SRI) untuk CDN resources',
      'Verifikasi tanda tangan digital pada software update',
      'Jangan deserialize data dari sumber tidak terpercaya',
      'Gunakan CI/CD pipeline yang aman dengan code signing',
    ],
    testCases: [
      { type: 'negative', text: 'Script dari CDN harus punya atribut integrity (SRI)' },
      { type: 'negative', text: 'API tidak boleh menerima serialized object dari user input' },
    ],
  },
  {
    id: 'A09',
    rank: 'A09:2021',
    title: 'Security Logging & Monitoring',
    severity: 'medium',
    desc: 'Tidak adanya logging yang memadai menyebabkan breach tidak terdeteksi.',
    detail: 'Tanpa log yang baik, serangan berjalan tanpa diketahui. OWASP merekomendasikan logging semua event keamanan.',
    example: `// Yang harus di-log:
- Semua login (sukses dan gagal)
- Percobaan akses unauthorized
- Perubahan data sensitif
- Semua API error
- Input validation failures

// Yang TIDAK boleh di-log:
- Password
- Full credit card number
- Token/session ID`,
    prevention: [
      'Log semua login attempt, API errors, dan akses unauthorized',
      'Jangan log data sensitif (password, token, PII)',
      'Gunakan centralized logging (ELK, Splunk)',
      'Set alert untuk anomali (banyak login gagal, dll.)',
      'Simpan log minimal 30 hari',
    ],
    testCases: [
      { type: 'positive', text: 'Login gagal harus tercatat di log dengan timestamp dan IP' },
      { type: 'negative', text: 'Log tidak boleh berisi password atau token dalam plaintext' },
      { type: 'positive', text: 'Akses endpoint yang diproteksi tanpa auth harus tercatat' },
    ],
  },
  {
    id: 'A10',
    rank: 'A10:2021',
    title: 'SSRF',
    severity: 'high',
    desc: 'Server-Side Request Forgery: server melakukan request ke URL yang dikontrol attacker.',
    detail: 'Terjadi ketika server mengambil resource dari URL yang diberikan user tanpa validasi.',
    example: `// Vulnerable: URL dari user langsung digunakan server
POST /api/fetch-image
{"url": "http://internal-server/admin/users"}
// Server fetch internal resource!

// Worse: Cloud metadata
{"url": "http://169.254.169.254/latest/meta-data/"}
// Expose AWS credentials!`,
    prevention: [
      'Whitelist domain/IP yang boleh di-fetch oleh server',
      'Blokir akses ke internal network, localhost, dan metadata endpoints',
      'Disable HTTP redirect di server-side fetch',
      'Validasi dan sanitasi semua URL input',
      'Gunakan DNS resolution saat validasi, bukan saat request',
    ],
    testCases: [
      { type: 'negative', text: 'Input URL dengan http://localhost → harus ditolak' },
      { type: 'negative', text: 'Input URL 169.254.169.254 (AWS metadata) → harus ditolak' },
      { type: 'negative', text: 'Input URL internal IP (192.168.x.x) → harus ditolak' },
      { type: 'positive', text: 'Input URL domain publik yang valid → diproses normal' },
    ],
  },
];

export const SECURITY_CHECKLISTS = {
  login: {
    label: '🔐 Login / Auth',
    items: [
      { id: 'l1', text: 'Rate limiting pada endpoint login (max N attempts)', detail: 'Lockout atau delay setelah gagal beberapa kali', risk: 'critical' },
      { id: 'l2', text: 'Password tidak terlihat di network request (HTTPS)', detail: 'Cek di browser DevTools → Network tab', risk: 'critical' },
      { id: 'l3', text: 'Password tidak muncul di log atau response', detail: 'Cek server log dan response body', risk: 'critical' },
      { id: 'l4', text: 'Session token baru setelah login sukses', detail: 'Session fixation prevention', risk: 'high' },
      { id: 'l5', text: 'Session expire setelah idle timeout', detail: 'Default: 30 menit idle', risk: 'high' },
      { id: 'l6', text: 'Logout invalidate semua session token', detail: 'Token lama tidak bisa dipakai setelah logout', risk: 'high' },
      { id: 'l7', text: 'Password policy yang kuat (min 8 char, mix)', detail: 'Upper, lower, number, special char', risk: 'medium' },
      { id: 'l8', text: 'Error message tidak mengekspos informasi (user vs password salah)', detail: 'Generic: "Invalid credentials"', risk: 'medium' },
      { id: 'l9', text: 'CAPTCHA atau challenge setelah beberapa gagal login', detail: 'Mencegah automated brute force', risk: 'medium' },
      { id: 'l10', text: 'Multi-factor authentication tersedia', detail: 'OTP via email/SMS/authenticator app', risk: 'medium' },
    ],
  },
  upload: {
    label: '📁 File Upload',
    items: [
      { id: 'u1', text: 'Validasi tipe file di server-side (bukan hanya frontend)', detail: 'Cek MIME type dan ekstensi file', risk: 'critical' },
      { id: 'u2', text: 'Scan malware pada file yang diupload', detail: 'Menggunakan antivirus engine', risk: 'critical' },
      { id: 'u3', text: 'File disimpan di luar web root', detail: 'Tidak bisa diakses langsung via URL', risk: 'critical' },
      { id: 'u4', text: 'Nama file dirandom/di-hash saat disimpan', detail: 'Hindari path traversal dan overwrite', risk: 'high' },
      { id: 'u5', text: 'Batas ukuran file yang ketat', detail: 'Prevent DoS via large file upload', risk: 'high' },
      { id: 'u6', text: 'Tidak ada executable file yang bisa diupload (.php, .exe, .js)', detail: 'Whitelist tipe file yang diizinkan', risk: 'critical' },
      { id: 'u7', text: 'Content-Type header divalidasi', detail: 'Jangan percaya Content-Type dari request', risk: 'medium' },
      { id: 'u8', text: 'File yang didownload memiliki Content-Disposition: attachment', detail: 'Mencegah XSS via file execution', risk: 'medium' },
    ],
  },
  payment: {
    label: '💳 Payment',
    items: [
      { id: 'p1', text: 'Tidak menyimpan CVV setelah transaksi', detail: 'PCI DSS compliance', risk: 'critical' },
      { id: 'p2', text: 'Nomor kartu di-mask di UI dan log', detail: 'Tampilkan hanya 4 digit terakhir', risk: 'critical' },
      { id: 'p3', text: 'Validasi amount di server-side', detail: 'Jangan percaya amount dari request client', risk: 'critical' },
      { id: 'p4', text: 'Idempotency key untuk mencegah double charge', detail: 'Setiap transaksi punya unique key', risk: 'critical' },
      { id: 'p5', text: 'HTTPS wajib untuk semua halaman payment', detail: 'Tidak ada mixed content', risk: 'critical' },
      { id: 'p6', text: 'Validasi callback/webhook dari payment gateway', detail: 'Verify signature dari Midtrans/Xendit/dll.', risk: 'high' },
      { id: 'p7', text: 'Rate limiting pada payment attempt', detail: 'Prevent card testing attack', risk: 'high' },
      { id: 'p8', text: 'Log semua transaksi untuk audit trail', detail: 'Minimal 90 hari', risk: 'high' },
    ],
  },
  api: {
    label: '🔌 API Security',
    items: [
      { id: 'a1', text: 'Semua endpoint membutuhkan autentikasi (kecuali public)', detail: 'Bearer token atau API key', risk: 'critical' },
      { id: 'a2', text: 'Rate limiting di semua endpoint', detail: 'Header X-RateLimit-* di response', risk: 'high' },
      { id: 'a3', text: 'CORS dikonfigurasi dengan benar', detail: 'Jangan Access-Control-Allow-Origin: *', risk: 'high' },
      { id: 'a4', text: 'Input validation untuk semua parameter', detail: 'Type, format, length, range', risk: 'high' },
      { id: 'a5', text: 'Response tidak mengekspos data berlebih', detail: 'API hanya return field yang diperlukan', risk: 'medium' },
      { id: 'a6', text: 'HTTP method yang tidak diperlukan disabled', detail: 'TRACE, OPTIONS hanya jika perlu', risk: 'medium' },
      { id: 'a7', text: 'Versioning API yang jelas', detail: '/api/v1/, /api/v2/', risk: 'low' },
      { id: 'a8', text: 'Security headers di semua response', detail: 'X-Content-Type-Options, X-Frame-Options', risk: 'medium' },
    ],
  },
  register: {
    label: '📝 Registration',
    items: [
      { id: 'r1', text: 'Email verification sebelum akun aktif', detail: 'Prevent fake account creation', risk: 'high' },
      { id: 'r2', text: 'Validasi format email yang ketat', detail: 'Cek format valid dan domain exist', risk: 'medium' },
      { id: 'r3', text: 'Tidak ada enumeration username/email', detail: 'Response sama untuk email exist/tidak', risk: 'medium' },
      { id: 'r4', text: 'Tidak ada mass registration (rate limiting)', detail: 'CAPTCHA atau rate limit per IP', risk: 'medium' },
      { id: 'r5', text: 'Data PII dienkripsi di database', detail: 'NIK, nomor HP, tanggal lahir', risk: 'high' },
      { id: 'r6', text: 'Tidak menerima HTML/script di nama dan bio', detail: 'Sanitasi semua input teks', risk: 'high' },
    ],
  },
};
