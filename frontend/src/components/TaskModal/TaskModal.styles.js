import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2500;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  width: 100%;
  max-width: 650px;
  max-height: 90vh;
  border-radius: 32px;
  overflow-y: auto;
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  animation: modalEnter 0.3s ease-out;

  @media (max-width: 768px) {
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  @keyframes modalEnter {
    from { opacity: 0; transform: scale(0.95) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #dfe1e6;
    border-radius: 10px;
  }
`;

export const ModalHeader = styled.div`
  padding: 2rem 2.5rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  position: sticky;
  top: 0;
  z-index: 10;

  h2 {
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.02em;

    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }
`;

export const CloseButton = styled.button`
  background: #f8fafc;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #fee2e2;
    color: #ef4444;
    transform: rotate(90deg);
  }
`;

export const ModalForm = styled.form`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 600px) {
    padding: 1.5rem;
    gap: 1.25rem;
  }
`;

export const ErrorBanner = styled.div`
  background: #fee2e2;
  color: #ef4444;
  padding: 1rem;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(239, 68, 68, 0.2);
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.75rem;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  ${props => props.$error && `
    input, textarea, select {
      border-color: #ef4444;
      background: #fef2f2;
    }
  `}

  input, textarea, select {
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    font-size: 0.95rem;
    background: #fdfdfd;
    outline: none;
    transition: all 0.2s;

    &:focus {
      border-color: #0061ff;
      background: white;
      box-shadow: 0 0 0 4px rgba(0, 97, 255, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const InputIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 14px;
    pointer-events: none;
  }

  input, select {
    padding-left: 44px;
    width: 100%;
  }
`;

export const ErrorMsg = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 4px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #f1f5f9;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    
    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const Button = styled.button`
  padding: 12px 24px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s;
  display: flex;
  align-items: center;
  gap: 8px;

  ${props => props.$variant === 'primary' ? `
    background: linear-gradient(135deg, #0061ff 0%, #60a5fa 100%);
    color: white;
    border: none;
    box-shadow: 0 8px 16px rgba(0, 97, 255, 0.2);
    &:hover { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(0, 97, 255, 0.3); }
  ` : `
    background: #f1f5f9;
    color: #475569;
    border: none;
    &:hover { background: #e2e8f0; color: #0f172a; }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const MemberSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const MemberList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

export const MemberBadge = styled.div`
  background: #eff6ff;
  color: #1d4ed8;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #dbeafe;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
  }
`;
