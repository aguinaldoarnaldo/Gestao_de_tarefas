import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Email ou senha incorretos' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-shape login-shape-1"></div>
        <div className="login-shape login-shape-2"></div>
        <div className="login-shape login-shape-3"></div>
      </div>

      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <div className="login-logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </div>
              <h1>Gestão de Tarefas</h1>
            </div>
            <h2>Bem-vindo de volta!</h2>
            <p>Entre com suas credenciais para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {errors.submit && (
              <div className="login-alert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.submit}
              </div>
            )}

            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <div className="login-input-wrapper">
                <svg className="login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className={errors.email ? 'login-input-error' : ''}
                />
              </div>
              {errors.email && <span className="login-error-message">{errors.email}</span>}
            </div>

            <div className="login-form-group">
              <label htmlFor="password">Senha</label>
              <div className="login-input-wrapper">
                <svg className="login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={errors.password ? 'login-input-error' : ''}
                />
              </div>
              {errors.password && <span className="login-error-message">{errors.password}</span>}
            </div>

            <div className="login-form-options">
              <label className="login-checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Lembrar-me</span>
              </label>
              <Link to="/recuperar-senha" className="login-forgot-password">
                Esqueceu a senha?
              </Link>
            </div>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="login-spinner"></span>
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Não tem uma conta?{' '}
              <Link to="/registro" className="login-link">
                Criar conta
              </Link>
            </p>
          </div>
        </div>

        <div className="login-info">
          <div className="login-info-content">
            <h3>Gerencie suas tarefas com eficiência</h3>
            <ul className="login-feature-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Organize projetos e tarefas</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Colabore com sua equipe</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Acompanhe o progresso em tempo real</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
