import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PublicRoute from './components/PublicRoute/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import Profile from './pages/Profile/Profile';
import Calendar from './pages/Calendar/Calendar';
import Settings from './pages/Settings/Settings';
import Boards from './pages/Boards/Boards';
import Teams from './pages/Teams/Teams';
import Analytics from './pages/Analytics/Analytics';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import MainLayout from './components/MainLayout/MainLayout';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 400); // Fade duration
    }, 800); // Fast initial load

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-root">
      {isLoading && <LoadingScreen fadeOut={fadeOut} />}
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Home />} />
            
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            
            <Route 
              path="/registro" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            
            {/* Rotas Protegidas (Requer Autenticação) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout title="Gestão de Tarefas">
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route path="/home" element={<Navigate to="/boards" replace />} />
            
            <Route
              path="/boards"
              element={
                <ProtectedRoute>
                  <MainLayout title="Os meus Quadros">
                    <Boards />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout title="O meu Perfil">
                    <Profile />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Rotas Admin Only */}
            <Route
              path="/users"
              element={
                <ProtectedRoute adminOnly={true}>
                  <MainLayout title="Gestão de Utilizadores">
                    <Users />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            {/* Outras Rotas Internas */}
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <MainLayout title="Calendário">
                    <Calendar />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/teams"
              element={
                <ProtectedRoute>
                  <MainLayout title="Gestão de Equipas">
                    <Teams />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <MainLayout title="Análises de Performance">
                    <Analytics />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <MainLayout title="Configurações">
                    <Settings />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
