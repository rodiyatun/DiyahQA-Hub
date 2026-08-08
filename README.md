# Test Case Manager - Desktop App

Aplikasi desktop testcase management untuk macOS menggunakan Electron + React.

## ✨ Fitur

### ✅ Sudah diimplementasi:
- ✅ **Dashboard** — Overview total TC, pass rate, pie chart status distribution
- ✅ **Project Management** — Buat, edit, hapus project
- ✅ **CRUD Test Case** — Tambah, edit, hapus, search, filter test case
- ✅ **Status Tracking** — Status: Pending, Pass, Fail, Skip, Blocked
- ✅ **History** — Track perubahan status tiap test case
- ✅ **Import CSV** — Import test case dari file CSV
- ✅ **Export CSV** — Export test case ke CSV
- ✅ **Dark Theme** — UI modern dengan dark theme
- ✅ **SQLite Database** — Data tersimpan lokal di macOS

### 📝 Catatan:
- Export Excel/PDF sudah diinclude library (`xlsx`, `jspdf`) tapi belum diimplementasi di UI — bisa dikembangkan sendiri nanti

## 🚀 Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Development mode
npm run dev

# Build distributable app
npm run package
```

## 📂 Struktur File

```
testcase-app/
├── electron/
│   ├── main.js          # Electron main process + SQLite DB handler
│   └── preload.js       # IPC bridge
├── src/
│   ├── components/
│   │   ├── Sidebar.js           # Sidebar dengan project list
│   │   ├── Dashboard.js         # Dashboard stats + pie chart
│   │   ├── TestCaseList.js      # Tabel test case + filter/search
│   │   ├── TestCaseModal.js     # Form tambah/edit TC
│   │   ├── TestCaseDetailModal.js  # Detail TC + history
│   │   └── ProjectModal.js      # Form buat/edit project
│   ├── App.js
│   ├── index.js
│   └── index.css
├── public/
│   └── index.html
└── package.json
```

## 🗄️ Database Schema

### `projects`
- id, name, description, created_at, updated_at

### `testcases`
- id, project_id, no, title, website, module, section, test_data, scenario, expected_result, status, evidence, note, created_at, updated_at

### `status_history`
- id, testcase_id, old_status, new_status, changed_at, note

## 📥 Import CSV Format

File CSV yang sudah kamu buat bisa langsung diimport. Format kolom:

```
No,Title,Website,Module,Section,Test Data,Scenario,Expected Result,Status,Evidence,Note
```

Contoh:
```csv
No,Title,Website,Module,Section,Test Data,Scenario,Expected Result,Status,Evidence,Note
CNA-001,Test Login,ATS V6,Auth,Login Page,"email: test@mail.com","1. Buka login page\n2. Isi email dan password\n3. Klik login",User berhasil login,,Positive Case
```

## 🎨 Customization

- **Theme colors** — edit `src/index.css` bagian `:root {}`
- **Status options** — edit array `STATUS_OPTIONS` di `TestCaseList.js` dan `TestCaseModal.js`
- **Columns tabel** — edit `TestCaseList.js` di bagian `<thead>`

## 🐞 Troubleshooting

**npm install timeout:**
- Coba: `npm install --legacy-peer-deps`
- Atau: Hapus `node_modules` dan `package-lock.json`, lalu `npm install` lagi

**Electron tidak bisa dibuka:**
- Pastikan Xcode Command Line Tools sudah terinstall: `xcode-select --install`

**Database tidak muncul:**
- Database tersimpan di: `~/Library/Application Support/testcase-management/testcases.db`

## 📝 Next Steps (jika ingin dikembangkan)

1. **Export Excel** — sudah ada library `xlsx`, tinggal implement fungsi export di `TestCaseList.js`
2. **Export PDF** — sudah ada `jspdf` + `jspdf-autotable`, tinggal implement
3. **Attachment file** — untuk evidence, bisa implement upload file dan simpan di folder lokal
4. **Team collaboration** — sync data ke cloud (Firebase, Supabase, dll)
5. **Tags / Labels** — untuk kategorisasi test case lebih fleksibel

## 🙋 Support

Aplikasi ini sudah siap dipakai untuk manage test case secara lokal di macOS. Database SQLite disimpan di user folder, jadi tidak akan hilang saat close app.

Build dengan ❤️ menggunakan Electron + React + SQLite.
