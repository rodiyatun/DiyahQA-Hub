import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Mail, Lock, LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the login link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin
      });
      if (error) throw error;
      setResetSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span style={{ fontSize: 28 }}>🔬</span>
          </div>
          <h1>DiyahQA Hub</h1>
          <p>Welcome back! Please enter your details.</p>
        </div>

        {error && (
          <div className="login-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {isForgotPassword ? (
          resetSent ? (
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <CheckCircle size={48} color="#22c55e" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ marginBottom: 8 }}>Check your inbox</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <button type="button" className="btn-link" onClick={() => {setIsForgotPassword(false); setResetSent(false);}}>
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="login-form">
              <div className="input-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <Mail size={16} className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-login" disabled={loading || !email}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <p className="login-footer" style={{ marginTop: 16 }}>
                <button type="button" className="btn-link" onClick={() => setIsForgotPassword(false)}>
                  Back to Login
                </button>
              </p>
            </form>
          )
        ) : (
          <form onSubmit={handleEmailAuth} className="login-form">
            <div className="input-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div style={{ marginBottom: 8 }}>
                <label style={{ marginBottom: 0 }}>Password</label>
              </div>
              <div className="input-wrapper">
                <Lock size={16} className="input-icon" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            
            {!isSignUp && (
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <button type="button" className="btn-link" onClick={() => setIsForgotPassword(true)}>
                  Forgot your password?
                </button>
              </div>
            )}
          </form>
        )}

        {!isForgotPassword && (
          <p className="login-footer">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button type="button" className="btn-link" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
