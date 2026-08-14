import { supabase } from './supabaseClient';

const LICENSE_KEY = 'diyahqa_license';

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

export async function verifyLicenseKey(key) {
  const cleaned = key.trim().toUpperCase();

  const { data, error } = await supabase
    .from('licenses')
    .select('*')
    .eq('license_key', cleaned)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    return { valid: false, message: 'License key tidak ditemukan atau tidak aktif.' };
  }

  // Cek expiry
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return { valid: false, message: 'License key sudah kadaluarsa.' };
  }

  // Simpan ke localStorage
  storeLicense({
    key: cleaned,
    plan: data.plan,
    email: data.email,
    company: data.company,
    max_users: data.max_users,
    expires_at: data.expires_at,
    activated_at: new Date().toISOString(),
  });

  // Update activated_at di Supabase (best effort)
  await supabase
    .from('licenses')
    .update({ activated_at: new Date().toISOString() })
    .eq('license_key', cleaned);

  return { valid: true, data };
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
