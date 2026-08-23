import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const WorkspaceContext = createContext();

export function WorkspaceProvider({ children }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkspaces();
  }, []);

  async function loadWorkspaces() {
    setLoading(true);
    const { data, error } = await supabase
      .from('workspaces')
      .select('*');

    if (error) {
      console.error('Error fetching workspaces:', error);
      alert('Gagal mengambil data workspace dari database: ' + error.message);
    }

    if (!error && data && data.length > 0) {
      setWorkspaces(data);

      // Cek apakah ada workspace yang disimpan di localStorage
      const savedId = localStorage.getItem('active_workspace_id');
      const found = data.find(w => String(w.id) === String(savedId));

      if (found) {
        setActiveWorkspaceId(found.id);
      } else {
        // Default ke workspace pertama
        setActiveWorkspaceId(data[0].id);
        localStorage.setItem('active_workspace_id', data[0].id);
      }
    }
    setLoading(false);
  }

  function switchWorkspace(id) {
    setActiveWorkspaceId(id);
    localStorage.setItem('active_workspace_id', id);
    window.location.reload();
  }

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId);

  return (
    <WorkspaceContext.Provider value={{
      workspaces,
      activeWorkspaceId,
      activeWorkspace,
      switchWorkspace,
      loading,
      reload: loadWorkspaces,
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export const useWorkspace = () => useContext(WorkspaceContext);
