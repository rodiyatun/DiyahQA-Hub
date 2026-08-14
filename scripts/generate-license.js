#!/usr/bin/env node
/**
 * DiyahQA Hub — License Key Generator
 * 
 * Usage:
 *   node scripts/generate-license.js
 *   node scripts/generate-license.js --email client@company.com --company "PT ABC" --plan pro --users 10 --months 12
 * 
 * Hasil key otomatis dimasukkan ke Supabase.
 * Pastikan SUPABASE_URL dan SUPABASE_SERVICE_KEY ada di environment atau di-edit langsung di sini.
 */

const https = require('https');
const crypto = require('crypto');

// ─── CONFIG — isi ini ────────────────────────────────────────────
const SUPABASE_URL = 'https://mdstuycsypszfeswwngw.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'ISI_SERVICE_ROLE_KEY_KAMU_DI_SINI';
// ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
function getArg(name, def) {
  const i = args.indexOf('--' + name);
  return i >= 0 ? args[i + 1] : def;
}

const email   = getArg('email',   '');
const company = getArg('company', '');
const plan    = getArg('plan',    'standard'); // standard | pro | enterprise
const users   = parseInt(getArg('users', '5'));
const months  = parseInt(getArg('months', '12'));

// Generate key format: DQHB-XXXX-XXXX-XXXX
function generateKey() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous chars
  const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `DQHB-${seg()}-${seg()}-${seg()}`;
}

const key = generateKey();
const now = new Date();
const expires = new Date(now);
expires.setMonth(expires.getMonth() + months);

const payload = JSON.stringify({
  license_key: key,
  email,
  company,
  plan,
  max_users: users,
  expires_at: expires.toISOString(),
  is_active: true,
});

console.log('\n🔑 Generated License Key:');
console.log('─'.repeat(40));
console.log(`  Key      : ${key}`);
console.log(`  Email    : ${email || '(tidak diisi)'}`);
console.log(`  Company  : ${company || '(tidak diisi)'}`);
console.log(`  Plan     : ${plan}`);
console.log(`  Max Users: ${users}`);
console.log(`  Expires  : ${expires.toLocaleDateString('id-ID')}`);
console.log('─'.repeat(40));

if (SUPABASE_SERVICE_KEY === 'ISI_SERVICE_ROLE_KEY_KAMU_DI_SINI') {
  console.log('\n⚠️  SUPABASE_SERVICE_KEY belum diisi.');
  console.log('   Masukkan key ini manual ke Supabase Table Editor di tabel "licenses".');
  console.log('\nData untuk di-insert:');
  console.log(JSON.stringify(JSON.parse(payload), null, 2));
  process.exit(0);
}

// Insert ke Supabase
const url = new URL(`${SUPABASE_URL}/rest/v1/licenses`);
const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    'Prefer': 'return=representation',
    'Content-Length': Buffer.byteLength(payload),
  },
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    if (res.statusCode === 201) {
      console.log('\n✅ License key berhasil disimpan ke Supabase!');
      console.log(`\n📧 Kirim key ini ke pembeli:\n\n   ${key}\n`);
    } else {
      console.error('\n❌ Gagal simpan ke Supabase:', res.statusCode, body);
    }
  });
});

req.on('error', e => console.error('❌ Error:', e.message));
req.write(payload);
req.end();
