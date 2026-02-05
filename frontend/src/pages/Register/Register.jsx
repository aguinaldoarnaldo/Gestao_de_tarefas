import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
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
    
    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Nome deve ter no mínimo 3 caracteres';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.username) {
      newErrors.username = 'Username é obrigatório';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username deve ter no mínimo 3 caracteres';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username deve conter apenas letras, números e underscore';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter no mínimo 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Senha deve conter letras maiúsculas, minúsculas e números';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos de uso';
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
      navigate('/login', { 
        state: { message: 'Conta criada com sucesso! Faça login para continuar.' }
      });
    } catch (error) {
      setErrors({ submit: 'Erro ao criar conta. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-background">
        <div className="register-shape register-shape-1"></div>
        <div className="register-shape register-shape-2"></div>
        <div className="register-shape register-shape-3"></div>
      </div>

      <div className="register-content">
        <div className="register-card">
          <div className="register-header">
            <div className="register-logo">
              <div className="register-logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </div>
              <h1>Gestão de Tarefas</h1>
            </div>
            <h2>Criar nova conta</h2>
            <p>Preencha os dados abaixo para começar</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {errors.submit && (
              <div className="register-alert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.submit}
              </div>
            )}

            <div className="register-form-group">
              <label htmlFor="name">Nome Completo</label>
              <div className="register-input-wrapper">
                <svg className="register-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="João Silva"
                  className={errors.name ? 'register-input-error' : ''}
                />
              </div>
              {errors.name && <span className="register-error-message">{errors.name}</span>}
            </div>

            <div className="register-form-row">
              <div className="register-form-group">
                <label htmlFor="email">Email</label>
                <div className="register-input-wrapper">
                  <svg className="register-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                    className={errors.email ? 'register-input-error' : ''}
                  />
                </div>
                {errors.email && <span className="register-error-message">{errors.email}</span>}
              </div>

              <div className="register-form-group">
                <label htmlFor="username">Username</label>
                <div className="register-input-wrapper">
                  <svg className="register-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="joaosilva"
                    className={errors.username ? 'register-input-error' : ''}
                  />
                </div>
                {errors.username && <span className="register-error-message">{errors.username}</span>}
              </div>
            </div>

            <div className="register-form-row">
              <div className="register-form-group">
                <label htmlFor="password">Senha</label>
                <div className="register-input-wrapper">
                  <svg className="register-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                    className={errors.password ? 'register-input-error' : ''}
                  />
                </div>
                {errors.password && <span className="register-error-message">{errors.password}</span>}
              </div>

              <div className="register-form-group">
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <div className="register-input-wrapper">
                  <svg className="register-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={errors.confirmPassword ? 'register-input-error' : ''}
                  />
                </div>
                {errors.confirmPassword && <span className="register-error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="register-form-group">
              <label className="register-checkbox-label">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                />
                <span>
                  Aceito os{' '}
                  <Link to="/termos" className="register-link">
                    termos de uso
                  </Link>{' '}
                  e{' '}
                  <Link to="/privacidade" className="register-link">
                    política de privacidade
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && <span className="register-error-message">{errors.acceptTerms}</span>}
            </div>

            <button type="submit" className="register-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="register-spinner"></span>
                  Criando conta...
                </>
              ) : (
                'Criar conta'
              )}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Já tem uma conta?{' '}
              <Link to="/login" className="register-link">
                Fazer login
              </Link>
            </p>
          </div>
        </div>

        <div className="register-info">
          <div className="register-info-content">
            <h3>Comece a organizar suas tarefas hoje</h3>
            <ul className="register-feature-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Gratuito para começar</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Interface intuitiva e fácil de usar</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Suporte dedicado</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
