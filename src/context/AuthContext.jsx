/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { validateAccessCode, fetchOrganization } from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearSession = useCallback(() => {
    setSession(null);
    sessionStorage.removeItem('neurasync_session');
  }, []);

  const restoreSession = useCallback(() => {
    try {
      const stored = sessionStorage.getItem('neurasync_session');

      if (!stored) {
        setIsLoading(false);
        return;
      }

      const parsed = JSON.parse(stored);

      if (!parsed.expiresAt || new Date(parsed.expiresAt) <= new Date()) {
        clearSession();
        setIsLoading(false);
        return;
      }

      const sessionData = {
        organizationId: parsed.organizationId,
        organizationName: parsed.organizationName || 'Client Workspace',
        codeLabel: parsed.codeLabel,
        accessCode: parsed.accessCode,
        expiresAt: parsed.expiresAt,
        authenticatedAt: parsed.authenticatedAt || new Date().toISOString(),
      };

      setSession(sessionData);
    } catch {
      clearSession();
    } finally {
      setIsLoading(false);
    }
  }, [clearSession]);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const login = useCallback(async (code) => {
    setError(null);
    setIsLoading(true);

    try {
      const trimmedCode = code.trim();

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

      const org = await fetchOrganization(codeResult.organization_id, trimmedCode);

      const sessionData = {
        organizationId: codeResult.organization_id,
        organizationName: org?.name || 'Client Workspace',
        codeLabel: codeResult.label,
        accessCode: trimmedCode,
        expiresAt: codeResult.expires_at,
        authenticatedAt: new Date().toISOString(),
      };

      setSession(sessionData);
      sessionStorage.setItem('neurasync_session', JSON.stringify(sessionData));
      setIsLoading(false);
      return true;

    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Login error:', err);
      }
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setError(null);
  }, [clearSession]);

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
      accessCode: session?.accessCode,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
