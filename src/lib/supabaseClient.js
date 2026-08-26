import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://mdstuycsypszfeswwngw.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kc3R1eWNzeXBzemZlc3d3bmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2MjY4NjcsImV4cCI6MjEwMjIwMjg2N30.Vq0-KXxMbS5QVSESvt3E-A5CSuoWPhQfrfLBH6vXcFY';

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


