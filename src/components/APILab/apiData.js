// ─── API Learning Data ────────────────────────────────────────────────────────

export const API_LESSONS = [
  {
    id: 'rest-basics',
    category: 'REST API',
    title: 'Apa itu REST API?',
    content: `REST (Representational State Transfer) adalah arsitektur komunikasi yang menggunakan HTTP untuk bertukar data antara client dan server. REST API adalah cara paling umum untuk sistem bertukar data di era modern.

Sebagai QA Engineer, kamu akan menguji REST API setiap hari — memastikan endpoint mengembalikan data yang benar, status code yang sesuai, dan error handling yang baik.`,
    keyPoints: [
      'Client mengirim HTTP request → Server memproses → Server mengembalikan response',
      'Data biasanya dalam format JSON (JavaScript Object Notation)',
      'Setiap resource memiliki URL unik (endpoint)',
      'Stateless: setiap request berdiri sendiri, server tidak menyimpan state client',
      'RESTful API menggunakan HTTP method yang tepat untuk setiap operasi',
    ],
    example: `// Contoh interaksi REST API:

// Client Request:
GET /api/users/123
Authorization: Bearer eyJhbGci...

// Server Response:
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "name": "Diyah",
  "email": "diyah@example.com",
  "role": "QA Engineer"
}`,
  },
  {
    id: 'http-methods',
    category: 'HTTP Methods',
    title: 'HTTP Methods (CRUD)',
    content: `HTTP methods menentukan operasi apa yang dilakukan terhadap resource. Memahami ini penting untuk QA karena kamu harus memastikan setiap method diimplementasikan dengan benar.`,
    keyPoints: null,
    table: [
      { method: 'GET',    operasi: 'Baca data',        idempoten: '✅ Ya',  body: '❌ Tidak', contoh: 'GET /users' },
      { method: 'POST',   operasi: 'Buat data baru',   idempoten: '❌ Tidak', body: '✅ Ya',  contoh: 'POST /users' },
      { method: 'PUT',    operasi: 'Update data penuh', idempoten: '✅ Ya', body: '✅ Ya',  contoh: 'PUT /users/1' },
      { method: 'PATCH',  operasi: 'Update sebagian',  idempoten: '✅ Ya',  body: '✅ Ya',  contoh: 'PATCH /users/1' },
      { method: 'DELETE', operasi: 'Hapus data',       idempoten: '✅ Ya',  body: '❌ Opsional', contoh: 'DELETE /users/1' },
    ],
    example: `// POST - Buat user baru
POST /api/users
Content-Type: application/json

{ "name": "Diyah", "email": "diyah@test.com" }

// Expected: 201 Created
// Response: { "id": 123, "name": "Diyah", ... }

// DELETE - Hapus user
DELETE /api/users/123

// Expected: 204 No Content (atau 200 OK)`,
  },
  {
    id: 'status-codes',
    category: 'Status Codes',
    title: 'HTTP Status Codes',
    content: `Status code adalah 3 digit angka yang menunjukkan hasil dari request. Sebagai QA, kamu harus memvalidasi status code di setiap test case — bukan hanya response body.`,
    keyPoints: null,
    table: [
      { range: '2xx', arti: 'Sukses', contoh: '200 OK, 201 Created, 204 No Content' },
      { range: '3xx', arti: 'Redirect', contoh: '301 Moved Permanently, 304 Not Modified' },
      { range: '4xx', arti: 'Client Error', contoh: '400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable' },
      { range: '5xx', arti: 'Server Error', contoh: '500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable' },
    ],
    example: `// QA Test Cases berdasarkan status code:

// ✅ Happy path
GET /api/users/1  → 200 OK
POST /api/users   → 201 Created

// ❌ Error cases yang wajib ditest:
GET /api/users/999  → 404 Not Found
POST /api/users {}  → 400 Bad Request (validasi)
GET /api/admin      → 401/403 (auth)
POST /api/users (data valid tapi conflict) → 409 Conflict`,
  },
  {
    id: 'authentication',
    category: 'Authentication',
    title: 'Autentikasi API',
    content: `Authentication memverifikasi identitas client. Sebagai QA, kamu harus test semua skenario auth: sukses, token expired, token salah, akses tanpa token.`,
    keyPoints: [
      'Bearer Token (JWT): paling umum untuk REST API modern',
      'API Key: dikirim via header X-API-Key atau query param',
      'Basic Auth: username:password di-encode Base64 (tidak aman tanpa HTTPS)',
      'OAuth2: delegasi akses via token flow (Google, GitHub login)',
      'Token JWT berisi 3 bagian: header.payload.signature (decode di jwt.io)',
    ],
    example: `// Bearer Token (JWT):
GET /api/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// API Key via header:
GET /api/data
X-API-Key: sk-prod-abc123xyz

// Basic Auth:
GET /api/internal
Authorization: Basic dXNlcjpwYXNzd29yZA==
// (base64 dari "user:password")

// QA Test Scenarios:
// 1. Tanpa token → 401 Unauthorized
// 2. Token expired → 401 atau 403
// 3. Token salah → 401
// 4. Token valid, akses resource orang lain → 403
// 5. Token valid, akses resource sendiri → 200`,
  },
  {
    id: 'headers-params',
    category: 'Headers & Parameters',
    title: 'Headers, Query Params & Path Params',
    content: `Headers membawa metadata request. Parameters menentukan resource spesifik atau opsi filtering yang diinginkan.`,
    keyPoints: [
      'Request headers: Authorization, Content-Type, Accept, X-Request-ID',
      'Response headers: Content-Type, Cache-Control, X-RateLimit-*',
      'Path params: bagian dari URL → /users/{id} → /users/123',
      'Query params: setelah ? → /users?page=1&limit=10&sort=name',
      'Body params: data dikirim dalam request body (POST/PUT/PATCH)',
    ],
    example: `// Path Parameter:
GET /api/orders/ORD-001/items
// "ORD-001" adalah path parameter

// Query Parameters (filtering & pagination):
GET /api/products?category=electronics&min_price=100&page=2&limit=20

// Headers penting untuk QA:
Content-Type: application/json   // Format body yang dikirim
Accept: application/json         // Format response yang diinginkan
Authorization: Bearer <token>    // Auth
X-Correlation-ID: req-abc-123   // Tracing (berguna untuk debug)

// Multipart (file upload):
Content-Type: multipart/form-data; boundary=----FormBoundary`,
  },
];

// ─── Assertion Templates ──────────────────────────────────────────────────────

export const ASSERTION_TEMPLATES = [
  { id: 'status', label: 'Status Code', type: 'status', operator: '==', value: '200' },
  { id: 'body-contains', label: 'Body contains text', type: 'body', operator: 'contains', value: '' },
  { id: 'json-path', label: 'JSON path equals', type: 'jsonpath', path: '$.data.id', operator: '==', value: '' },
  { id: 'json-exists', label: 'JSON path exists', type: 'jsonpath', path: '$.data', operator: 'exists', value: '' },
  { id: 'header', label: 'Header value', type: 'header', key: 'content-type', operator: 'contains', value: 'application/json' },
  { id: 'response-time', label: 'Response time < N ms', type: 'duration', operator: '<', value: '2000' },
  { id: 'array-length', label: 'Array length', type: 'jsonpath', path: '$.data', operator: 'length', value: '' },
];

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'];

export const COMMON_HEADERS = [
  'Authorization',
  'Content-Type',
  'Accept',
  'X-API-Key',
  'X-Correlation-ID',
  'X-Request-ID',
  'Cache-Control',
  'User-Agent',
];

export const STATUS_CODE_MAP = {
  200: 'OK', 201: 'Created', 204: 'No Content',
  400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden',
  404: 'Not Found', 409: 'Conflict', 422: 'Unprocessable Entity',
  429: 'Too Many Requests', 500: 'Internal Server Error',
  502: 'Bad Gateway', 503: 'Service Unavailable',
};
