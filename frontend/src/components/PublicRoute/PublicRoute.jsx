import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    // Se o user apareceu de repente (ex: logo após o login/registo bem sucedido),
    // ativamos um ecrã de carregamento temporário antes de o redirecionar de facto.
    if (user && !loading) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [user, loading]);

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

  // Se estiver numa fase de transição (logo após login/registo)
  if (isTransitioning) {
    return <LoadingScreen message="A preparar o seu espaço de trabalho..." />;
  }

  // Se o usuário já estiver autenticado e a transição já passou, redireciona para o boards
  if (user && !isTransitioning) {
    return <Navigate to="/boards" replace />;
  }

  return children;
};

export default PublicRoute;
