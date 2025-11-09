import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <Login />;
}

export default App;