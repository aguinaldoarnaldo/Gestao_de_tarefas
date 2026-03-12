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
  const [token, setToken] = useState(() => {
    // Tenta primeiro na sessão atual
    let savedToken = sessionStorage.getItem('token');
    
    // Se não houver, verifica no localStorage (Lembrar de mim)
    if (!savedToken) {
      savedToken = localStorage.getItem('token');
      // Se encontrou no localStorage, copia para a sessão atual para que o apiService o encontre
      if (savedToken) {
        sessionStorage.setItem('token', savedToken);
      }
    }
    
    return savedToken;
  });

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    // Safety timeout: if anything hangs, force loading=false after 5s
    const safetyTimer = setTimeout(() => {
      console.warn('Auth load timed out, forcing loading=false');
      setLoading(false);
    }, 5000);

    try {
      const userData = await apiService.getUserProfile();
      setUser(userData);
    } catch (error) {
      console.warn('Erro ao verificar sessão:', error.message);
      
      // Se for erro de autenticação (401 ou 403), limpa a sessão
      if (error.message.includes('401') || error.message.includes('403') || error.message.includes('Unauthorized')) {
        sessionStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } finally {
      clearTimeout(safetyTimer);
      setLoading(false);
    }
  };

  const login = async (email, senha) => {
    try {
      const response = await apiService.login(email, senha);
      const { token: newToken, user: userData } = response;
      
      sessionStorage.setItem('token', newToken);
      setUser(userData);
      setToken(newToken);
      setLoading(false);
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (nome, email, senha) => {
    try {
      const response = await apiService.register(nome, email, senha);
      const { token: newToken, user: userData } = response;
      
      if (newToken && userData) {
        sessionStorage.setItem('token', newToken);
        setUser(userData);
        setToken(newToken);
        setLoading(false);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    setUser,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
