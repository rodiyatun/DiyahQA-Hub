import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AgentProvider } from './contexts/AgentContext';
import { AuthProvider } from './contexts/AuthContext';
import { WorkspaceProvider } from './contexts/WorkspaceContext';
import { ErrorBoundary } from './ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <WorkspaceProvider>
          <AgentProvider>
            <App />
          </AgentProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
