import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import styled from 'styled-components';

// Styled Components
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 2rem;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  text-decoration: none;
  margin-bottom: 1rem;
  justify-content: center;
`;

const LoginLogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #0061ff 0%, #8b5cf6 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 12px;
    color: #9ca3af;
    z-index: 1;
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 0.875rem;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: #0061ff;
      box-shadow: 0 0 0 3px rgba(0, 97, 255, 0.1);
    }

    &.error {
      border-color: #ef4444;
    }

    &::placeholder {
      color: #9ca3af;
    }
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const ErrorBox = styled.div`
  background: #fff1f2;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: #ef4444;
  font-size: 0.875rem;
`;

const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
`;

const RememberMe = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  cursor: pointer;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #0061ff;
  }
`;

const ForgotPassword = styled(Link)`
  color: #0061ff;
  text-decoration: none;
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #0061ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #0052d9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const LoginFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;

  p {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0;

    a {
      color: #0061ff;
      text-decoration: none;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

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

      // "Lembrar de mim" — guarda o token em localStorage para persistir entre sessões
      if (formData.rememberMe) {
        const token = sessionStorage.getItem('token');
        if (token) {
          localStorage.setItem('token', token);
        }
      }

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
            <ForgotPassword to="/recuperar-senha">Esqueceu a senha?</ForgotPassword>
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
