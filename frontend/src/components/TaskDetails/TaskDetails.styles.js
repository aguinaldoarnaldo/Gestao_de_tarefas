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
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const Modal = styled.div`
  background: rgba(255, 255, 255, 0.98);
  width: 100%;
  max-width: 900px;
  height: 90vh;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.3);
  animation: ${slideUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.5);

  @media (max-width: 768px) {
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
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
    font-size: 1.75rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;

    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
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
  min-width: 0; 
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
  padding: 24px;
  background: #f8fafc;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  color: #334155;
  font-size: 0.95rem;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
  max-width: 100%;
  box-sizing: border-box;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.01);
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
    background: linear-gradient(135deg, #0061ff 0%, #60a5fa 100%);
    color: white;
    border: none;
    box-shadow: 0 8px 16px rgba(0, 97, 255, 0.2);
    &:hover { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(0, 97, 255, 0.3); }
  }

  &.ghost {
    background: transparent;
    border: 1px solid #e2e8f0;
    color: #475569;
    &:hover { background: #f1f5f9; color: #0f172a; }
  }
`;
