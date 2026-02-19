import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, CheckCircle, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  LoginContainer,
  LoginCard,
  LoginHeader,
  LoginLogo,
  LoginLogoIcon,
  LoginForm,
  FormGroup,
  Label,
  InputWrapper,
  ErrorMessage,
  ErrorBox,
  FormOptions,
  RememberMe,
  ForgotPassword,
  LoginButton,
  LoginFooter
} from './Login.styles';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
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
    if (!formData.email) newErrors.email = 'E-mail é obrigatório';
    if (!formData.senha) newErrors.senha = 'Senha é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.senha);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: error.message || 'Credenciais inválidas' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <LoginLogo to="/">
            <LoginLogoIcon>
              <CheckCircle size={24} />
            </LoginLogoIcon>
            TaskFlow
          </LoginLogo>
          <h2>Bem-vindo de volta</h2>
          <p>Gerencie suas tarefas com eficiência.</p>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit}>
          {errors.submit && (
            <ErrorBox>
              <AlertCircle size={18} /> {errors.submit}
            </ErrorBox>
          )}

          <FormGroup>
            <Label>Endereço de E-mail</Label>
            <InputWrapper>
              <Mail size={18} />
              <input
                type="email"
                name="email"
                placeholder="exemplo@email.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
            </InputWrapper>
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Sua Senha</Label>
            <InputWrapper>
              <Lock size={18} />
              <input
                type="password"
                name="senha"
                placeholder="••••••••"
                value={formData.senha}
                onChange={handleChange}
                className={errors.senha ? 'error' : ''}
              />
            </InputWrapper>
            {errors.senha && <ErrorMessage>{errors.senha}</ErrorMessage>}
          </FormGroup>

          <FormOptions>
            <RememberMe>
              <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
              Lembrar de mim
            </RememberMe>
            <ForgotPassword to="#">Esqueceu a senha?</ForgotPassword>
          </FormOptions>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="spinner" size={20} /> : <LogIn size={20} />}
            {isLoading ? 'Entrando...' : 'Entrar na conta'}
          </LoginButton>
        </LoginForm>

        <LoginFooter>
          <p>
            Não tem uma conta? <Link to="/registro">Criar uma agora</Link>
          </p>
        </LoginFooter>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
