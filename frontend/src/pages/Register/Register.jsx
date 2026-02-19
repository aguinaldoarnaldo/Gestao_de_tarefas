import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, CheckCircle, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
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
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email) newErrors.email = 'E-mail é obrigatório';
    if (!formData.senha) newErrors.senha = 'Senha é obrigatória';
    if (formData.senha.length < 6) newErrors.senha = 'Senha deve ter no mínimo 6 caracteres';
    if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = 'As senhas não coincidem';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Aceite os termos';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    
    try {
      await register(formData.nome, formData.email, formData.senha);
      navigate('/login');
    } catch (error) {
      console.error('Registration Error:', error);
      setErrors({ submit: error.message || 'Erro ao criar conta' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <Link to="/" className="register-logo">
            <div className="register-logo-icon">
              <CheckCircle size={24} />
            </div>
            TaskFlow
          </Link>
          <h2>Criar sua conta</h2>
          <p>Junte-se a milhares de usuários organizados.</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {errors.submit && (
            <div className="error-banner">{errors.submit}</div>
          )}

          <div className="form-group">
            <label>Nome Completo</label>
            <div className="input-wrapper">
              <User size={18} />
              <input
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={formData.nome}
                onChange={handleChange}
                className={errors.nome ? 'error' : ''}
              />
            </div>
            {errors.nome && <span className="error-msg">{errors.nome}</span>}
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input
                type="email"
                name="email"
                placeholder="exemplo@email.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Senha</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input
                type="password"
                name="senha"
                placeholder="No mínimo 6 caracteres"
                value={formData.senha}
                onChange={handleChange}
                className={errors.senha ? 'error' : ''}
              />
            </div>
            {errors.senha && <span className="error-msg">{errors.senha}</span>}
          </div>

          <div className="form-group">
            <label>Confirmar Senha</label>
            <div className="input-wrapper">
              <ShieldCheck size={18} />
              <input
                type="password"
                name="confirmarSenha"
                placeholder="Repita sua senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className={errors.confirmarSenha ? 'error' : ''}
              />
            </div>
            {errors.confirmarSenha && <span className="error-msg">{errors.confirmarSenha}</span>}
          </div>

          <label className="remember-me" style={{ fontSize: '0.85rem' }}>
            <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} />
            Concordo com os Termos e Privacidade
          </label>
          {errors.acceptTerms && <span className="error-msg">{errors.acceptTerms}</span>}

          <button type="submit" className="register-btn" disabled={isLoading}>
            {isLoading ? <Loader2 className="spinner" size={20} /> : <UserPlus size={20} />}
            {isLoading ? 'Criando conta...' : 'Registrar agora'}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Já tem uma conta? <Link to="/login">Fazer login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
