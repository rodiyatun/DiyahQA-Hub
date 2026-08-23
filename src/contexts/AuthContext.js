import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recoveryMode, setRecoveryMode] = useState(false);
  
  // Available roles: 'admin', 'editor', 'viewer'
  // Temporarily default to 'admin' for authenticated users until role fetching is fully implemented
  const [role, setRole] = useState('admin');

  // Helper to fetch role from user_roles based on workspace
  const refreshRole = async (userId, workspaceId = null) => {
    if (!userId) {
      setRole('viewer');
      return;
    }
    
    let query = supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);
      
    if (workspaceId) {
      query = query.eq('workspace_id', workspaceId);
    } else {
      query = query.is('workspace_id', null);
    }
    
    const { data, error } = await query.single();
    
    if (!error && data) {
      setRole(data.role);
    } else {
      setRole('viewer'); 
    }
  };

  useEffect(() => {
    // ── Handle deep link tokens (from Electron custom protocol) ──────────────
    // When app opens via diyahqahub://auth#access_token=... or
    // when App.js sets window.location.hash from a deep link
    const trySetSessionFromHash = async () => {
      const hash = window.location.hash;
      if (!hash) return;

      // Parse params from hash like: #access_token=xxx&refresh_token=yyy&type=recovery
      const params = new URLSearchParams(hash.replace('#', ''));
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      const type = params.get('type'); // 'recovery' | 'signup' | 'magiclink'

      if (accessToken) {
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || ''
        });
        if (!error && data.session) {
          setSession(data.session);
          setUser(data.session.user);
          if (type === 'recovery') {
            setRecoveryMode(true);
          }
          // Clear hash from URL after reading
          window.location.hash = '';
        }
      }
    };

    trySetSessionFromHash();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        refreshRole(session.user.id, localStorage.getItem('active_workspace_id')).then(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setRecoveryMode(true);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        refreshRole(session.user.id, localStorage.getItem('active_workspace_id')).then(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Session Timeout Logic (30 minutes)
    const TIMEOUT_MS = 30 * 60 * 1000;
    let timeoutId;

    const resetTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (supabase.auth.getSession()) {
          supabase.auth.signOut();
          alert('Sesi Anda telah berakhir karena tidak ada aktivitas.');
        }
      }, TIMEOUT_MS);
    };

    // Listen to activity to reset timer
    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach(event => window.addEventListener(event, resetTimeout));
    resetTimeout(); // Init

    return () => {
      subscription.unsubscribe();
      events.forEach(event => window.removeEventListener(event, resetTimeout));
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, role, setRole, logout, loading, recoveryMode, setRecoveryMode }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
