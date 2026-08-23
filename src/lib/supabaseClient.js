import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Detect environment
const isElectronApp = window.navigator.userAgent.includes('Electron');
const isDevMode    = window.location.href.startsWith('http://localhost');

// Redirect URL logic:
// 1. Electron packaged → custom deep link protocol
// 2. Dev mode (npm start) → localhost
// 3. Web (Vercel) → use current origin (auto-detect Vercel domain)
export const AUTH_REDIRECT_URL = isElectronApp && !isDevMode
  ? 'diyahqahub://auth'
  : window.location.origin;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  }
});


