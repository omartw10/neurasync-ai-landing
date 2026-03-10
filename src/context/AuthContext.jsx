/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

// Create a simulated multi-client Auth Context
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // Simulate an authenticated user from a database
  const [user] = useState({
    id: 'usr_1',
    name: 'Sarah Connor',
    client_id: 'client_789',
    company_name: 'Acme Corp',
    licensed_products: ['inboxpilot', 'leadsync'], // Currently licensed SaaS modules
    plan: 'Pro Plan'
  });

  const [isLoading] = useState(false);

  // In a real app, you would fetch the user session here via Supabase/Firebase
  
  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
