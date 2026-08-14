const LICENSE_KEY = 'diyahqa_license';

const SUPABASE_URL = 'https://mdstuycsypszfeswwngw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kc3R1eWNzeXBzemZlc3d3bmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2MjY4NjcsImV4cCI6MjEwMjIwMjg2N30.Vq0-KXxMbS5QVSESvt3E-A5CSuoWPhQfrfLBH6vXcFY';

export function getStoredLicense() {
  try {
    const raw = localStorage.getItem(LICENSE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function storeLicense(data) {
  localStorage.setItem(LICENSE_KEY, JSON.stringify(data));
}

export function clearLicense() {
  localStorage.removeItem(LICENSE_KEY);
}

export function isLicenseValid() {
  const license = getStoredLicense();
  if (!license) return false;
  if (license.expires_at && new Date(license.expires_at) < new Date()) {
    clearLicense();
    return false;
  }
  return true;
}

export async function verifyLicenseKey(key) {
  const cleaned = key.trim().toUpperCase().replace(/\s/g, '');
  console.log('[License] Verifying:', cleaned);

  try {
    const url = `${SUPABASE_URL}/rest/v1/licenses?license_key=eq.${encodeURIComponent(cleaned)}&is_active=eq.true&select=*&limit=1`;
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('[License] HTTP status:', res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error('[License] HTTP error:', text);
      return { valid: false, message: 'Gagal verifikasi (HTTP ' + res.status + ')' };
    }

    const rows = await res.json();
    console.log('[License] Rows found:', rows.length, rows);

    if (!rows || rows.length === 0) {
      return { valid: false, message: 'License key tidak ditemukan atau tidak aktif.' };
    }

    const data = rows[0];

    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return { valid: false, message: 'License key sudah kadaluarsa.' };
    }

    storeLicense({
      key: cleaned,
      plan: data.plan,
      email: data.email,
      company: data.company,
      max_users: data.max_users,
      expires_at: data.expires_at,
      activated_at: new Date().toISOString(),
    });

    // Update activated_at (fire and forget)
    fetch(`${SUPABASE_URL}/rest/v1/licenses?license_key=eq.${encodeURIComponent(cleaned)}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activated_at: new Date().toISOString() })
    }).catch(() => {});

    return { valid: true, data };
  } catch (err) {
    console.error('[License] Exception:', err);
    return { valid: false, message: 'Error: ' + (err.message || String(err)) };
  }
}
