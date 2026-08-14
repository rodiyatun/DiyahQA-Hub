import React, { createContext, useContext, useState, useEffect } from 'react';

const AgentContext = createContext();

export function useAgent() {
  return useContext(AgentContext);
}

export function AgentProvider({ children }) {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem('agent_enabled') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('agent_enabled', enabled);
  }, [enabled]);

  return (
    <AgentContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </AgentContext.Provider>
  );
}
