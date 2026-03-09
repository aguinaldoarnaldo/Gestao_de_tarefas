import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  padding: 20px;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const Modal = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 900px;
  height: 90vh;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${slideUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    height: 95vh;
  }
`;

export const Header = styled.div`
  padding: 24px 32px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
`;

export const TitleWrapper = styled.div`
  flex: 1;
  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
  }
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #f1f5f9;
  border: none;
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

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr 300px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const MainContent = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Sidebar = styled.div`
  background: #f8fafc;
  border-left: 1px solid #f1f5f9;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 900px) {
    border-left: none;
    border-top: 1px solid #f1f5f9;
  }
`;

export const Section = styled.div`
  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-weight: 800;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }
`;

export const Description = styled.div`
  padding: 20px;
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  color: #334155;
  font-size: 0.95rem;
  line-height: 1.6;
  white-space: pre-wrap;
`;

export const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  span {
    font-size: 0.9rem;
    font-weight: 700;
    color: #1e293b;
  }
`;

export const SidebarActions = styled.div`
  margin-top: auto;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  border-radius: 16px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &.edit {
    background: #0d2137;
    color: white;
    border: none;
    &:hover { background: #1a3a5a; transform: translateY(-2px); }
  }

  &.ghost {
    background: transparent;
    border: 1px solid #e2e8f0;
    color: #64748b;
    &:hover { background: #f1f5f9; color: #0d2137; }
  }
`;
