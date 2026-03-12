import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import styled from 'styled-components';
import apiService from '../../services/api';

// Styled Components (Reusing styles from Login for consistency)
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Logo = styled(Link)`
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

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #0061ff 0%, #8b5cf6 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Form = styled.form`
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
  }
`;

const SuccessBox = styled.div`
  background: #f0fdf4;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #166534;
  font-size: 0.875rem;
  border: 1px solid #bbf7d0;
  margin-bottom: 1rem;
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
  border: 1px solid #fecdd3;
`;

const SubmitButton = styled.button`
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
`;

const BackToLogin = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 1.5rem;
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    color: #0061ff;
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [debug, setDebug] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, insira seu e-mail.');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');
    setDebug('');

    try {
      const response = await apiService.forgotPassword(email);
      setMessage(response.message);
      if (response.debug) {
        setDebug(response.debug);
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Header>
          <Logo to="/">
            <LogoIcon>
              <CheckCircle size={22} />
            </LogoIcon>
            TaskFlow
          </Logo>
          <h2>Recuperar Senha</h2>
          <p>Enviaremos instruções para o seu e-mail.</p>
        </Header>

        {!message ? (
          <Form onSubmit={handleSubmit}>
            {error && (
              <ErrorBox>
                <AlertCircle size={18} /> {error}
              </ErrorBox>
            )}

            <FormGroup>
              <Label>Endereço de E-mail</Label>
              <InputWrapper>
                <Mail size={17} />
                <input
                  type="email"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </InputWrapper>
            </FormGroup>

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : null}
              {isLoading ? 'A processar...' : 'Enviar link de recuperação'}
            </SubmitButton>
          </Form>
        ) : (
          <SuccessBox>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <CheckCircle size={20} />
              <strong>Sucesso!</strong>
            </div>
            <p>{message}</p>
            {debug && (
              <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#15803d', fontStyle: 'italic' }}>
                Nota: {debug}
              </div>
            )}
          </SuccessBox>
        )}

        <BackToLogin to="/login">
          <ArrowLeft size={16} />
          Voltar para o Login
        </BackToLogin>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
