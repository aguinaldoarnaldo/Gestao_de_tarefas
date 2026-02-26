import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
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
  const [showLoginLoader, setShowLoginLoader] = useState(false);
  const [loaderFadeOut, setLoaderFadeOut] = useState(false);

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
    // Mostra o loader bonito imediatamente para dar feedback visual instantâneo
    setShowLoginLoader(true);

    try {
      // 1. Faz login no banco de dados
      await login(formData.email, formData.senha);

      // 2. Aguarda um tempo mínimo para não ser brusco (premium feel)
      await new Promise(resolve => setTimeout(resolve, 800));

      // 3. Fade out suave
      setLoaderFadeOut(true);

      // 4. Aguarda a animação de fade e navega
      await new Promise(resolve => setTimeout(resolve, 400));
      navigate('/boards');

    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: error.message || 'Email ou senha incorretos' });
      setIsLoading(false);
      setShowLoginLoader(false);
      setLoaderFadeOut(false);
    }
  };

  // Mostra o loading screen durante o login após autenticação
  if (showLoginLoader) {
    return (
      <LoadingScreen
        fadeOut={loaderFadeOut}
        message="A entrar na sua conta..."
      />
    );
  }

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <LoginLogo to="/">
            <LoginLogoIcon>
              <CheckCircle size={22} />
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
              <Mail size={17} />
              <input
                type="email"
                name="email"
                placeholder="exemplo@email.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                autoComplete="email"
              />
            </InputWrapper>
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Senha</Label>
            <InputWrapper>
              <Lock size={17} />
              <input
                type="password"
                name="senha"
                placeholder="••••••••"
                value={formData.senha}
                onChange={handleChange}
                className={errors.senha ? 'error' : ''}
                autoComplete="current-password"
              />
            </InputWrapper>
            {errors.senha && <ErrorMessage>{errors.senha}</ErrorMessage>}
          </FormGroup>

          <FormOptions>
            <RememberMe>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Lembrar de mim
            </RememberMe>
            <ForgotPassword to="#">Esqueceu a senha?</ForgotPassword>
          </FormOptions>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 size={20} className="spinner" />
            ) : (
              <LogIn size={20} />
            )}
            {isLoading ? 'A verificar...' : 'Entrar na conta'}
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
