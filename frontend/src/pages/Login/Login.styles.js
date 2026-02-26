import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 50%, #e8f0fe 100%);
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const LoginCard = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 440px;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  border: 1px solid #e2e8f0;
  animation: ${fadeInUp} 0.4s ease-out;
`;

export const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.4rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 0.4rem 0;
  }

  p {
    color: #6b7280;
    font-size: 0.9rem;
    margin: 0;
  }
`;

export const LoginLogo = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 1.6rem;
  color: #0f172a;
  text-decoration: none;
  margin-bottom: 1.25rem;
`;

export const LoginLogoIcon = styled.div`
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #0061ff, #8b5cf6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 97, 255, 0.3);
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-size: 0.82rem;
  font-weight: 700;
  color: #374151;
  letter-spacing: 0.01em;
`;

export const InputWrapper = styled.div`
  position: relative;

  & > svg {
    position: absolute;
    left: 11px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    pointer-events: none;
    width: 17px;
    height: 17px;
    display: block;
  }

  input {
    display: block;
    width: 100%;
    height: 44px;
    padding: 0 14px 0 38px !important;
    border: 1.5px solid #d1d5db !important;
    border-radius: 10px;
    font-size: 0.92rem;
    font-family: inherit;
    color: #111827 !important;
    background: #ffffff !important;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
    -webkit-appearance: none;
    appearance: none;

    &::placeholder {
      color: #9ca3af !important;
      opacity: 1;
    }

    &:focus {
      border-color: #0061ff !important;
      box-shadow: 0 0 0 3px rgba(0, 97, 255, 0.12);
      background: #ffffff !important;
    }

    &.error {
      border-color: #ef4444 !important;
    }

    &.error:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
    }
  }
`;

export const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.78rem;
  font-weight: 600;
  margin-top: 2px;
`;

export const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
`;

export const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
`;

export const RememberMe = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 0.85rem;
  cursor: pointer;
  user-select: none;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #0061ff;
    cursor: pointer;
    flex-shrink: 0;
  }
`;

export const ForgotPassword = styled(Link)`
  color: #0061ff;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 46px;
  background: #0061ff;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 0.97rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;

  &:hover:not(:disabled) {
    background: #004ecc;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 97, 255, 0.28);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .spinner {
    animation: ${spin} 1s linear infinite;
  }
`;

export const LoginFooter = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;

  p {
    color: #6b7280;
    font-size: 0.88rem;
    margin: 0;

    a {
      color: #0061ff;
      font-weight: 700;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
