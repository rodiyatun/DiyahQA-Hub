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

  useEffect(() => {
    // Helper to fetch role from user_roles
    const fetchRole = async (userId) => {
      if (!userId) return;
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (!error && data) {
        setRole(data.role);
      } else {
        // Fallback or handle error
        setRole('viewer'); 
      }
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRole(session.user.id).then(() => setLoading(false));
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
        fetchRole(session.user.id).then(() => setLoading(false));
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
