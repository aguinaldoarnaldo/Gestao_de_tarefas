import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => sessionStorage.getItem('token'));

  useEffect(() => {
    if (token && !user) {
      // Só chama loadUser se tiver token e ainda não tiver user
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const userData = await apiService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.warn('Erro ao verificar sessão:', error.message);
      // Só limpa a sessão se for erro de autenticação (token inválido/expirado)
      const isAuthError = error.message && (
        error.message.includes('401') ||
        error.message.includes('400') ||
        error.message.includes('Token') ||
        error.message.includes('Acesso') ||
        error.message.includes('inválido')
      );
      if (isAuthError) {
        sessionStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, senha) => {
    const response = await apiService.login(email, senha);
    const { token: newToken, user: userData } = response;
    
    // Guarda token e user imediatamente — sem esperar por loadUser
    sessionStorage.setItem('token', newToken);
    setUser(userData);
    setLoading(false);
    setToken(newToken);
    
    return response;
  };

  const register = async (nome, email, senha) => {
    const response = await apiService.register(nome, email, senha);
    return response;
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isAdmin = () => {
    return user?.tipo === 'admin';
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAdmin,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
