import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#64748b'
      }}>
        Carregando...
      </div>
    );
  }

  // Se o usuário já estiver autenticado, redireciona para o dashboard/boards
  if (user) {
    return <Navigate to="/boards" replace />;
  }

  return children;
};

export default PublicRoute;
