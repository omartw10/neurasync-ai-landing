/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { validateAccessCode, fetchOrganization } from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restore session from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('neurasync_session');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Check if the session is still valid (not expired)
        if (parsed.expiresAt && new Date(parsed.expiresAt) > new Date()) {
          setSession(parsed);
        } else {
          sessionStorage.removeItem('neurasync_session');
        }
      } catch {
        sessionStorage.removeItem('neurasync_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (code) => {
    setError(null);
    setIsLoading(true);

    try {
      const trimmedCode = code.trim();

      // ── Hardcoded code for NeuraSyncAI's own dashboard ──
      const HARDCODED_CODE = 'neurasyncaidb';
      if (trimmedCode === HARDCODED_CODE) {
        const sessionData = {
          organizationId: '7b51ae33-5a31-4795-8b60-8a566f48d955',
          organizationName: 'NeuraSyncAI',
          codeLabel: 'NeuraSyncAI Internal Dashboard',
          expiresAt: '2099-12-31T23:59:59Z',
          authenticatedAt: new Date().toISOString(),
        };
        setSession(sessionData);
        sessionStorage.setItem('neurasync_session', JSON.stringify(sessionData));
        setIsLoading(false);
        return true;
      }

      // ── Supabase-based validation for other clients ──
      const codeResult = await validateAccessCode(trimmedCode);
      
      if (!codeResult) {
        setError('Invalid access code. Please check and try again.');
        setIsLoading(false);
        return false;
      }

      if (!codeResult.is_active) {
        setError('This access code has been deactivated.');
        setIsLoading(false);
        return false;
      }

      if (new Date(codeResult.expires_at) <= new Date()) {
        setError('This access code has expired. Please contact NeuraSyncAI for a new code.');
        setIsLoading(false);
        return false;
      }

      // Fetch organization info
      const org = await fetchOrganization(codeResult.organization_id);

      const sessionData = {
        organizationId: codeResult.organization_id,
        organizationName: org?.name || 'Client Workspace',
        codeLabel: codeResult.label,
        expiresAt: codeResult.expires_at,
        authenticatedAt: new Date().toISOString(),
      };

      setSession(sessionData);
      sessionStorage.setItem('neurasync_session', JSON.stringify(sessionData));
      setIsLoading(false);
      return true;

    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    setError(null);
    sessionStorage.removeItem('neurasync_session');
  }, []);

  const isAuthenticated = !!session && new Date(session.expiresAt) > new Date();

  return (
    <AuthContext.Provider value={{ 
      session, 
      isAuthenticated, 
      isLoading, 
      error, 
      login, 
      logout,
      organizationId: session?.organizationId,
      organizationName: session?.organizationName,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
