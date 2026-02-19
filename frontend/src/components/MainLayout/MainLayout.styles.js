import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: radial-gradient(circle at top right, #f8fafc, #f1f5f9);
  color: #1a202c;
  width: 100%;
  overflow-x: hidden;
`;

export const Sidebar = styled.aside`
  width: 260px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(226, 232, 240, 0.8);
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  position: fixed;
  height: 100vh;
  z-index: 1000;   
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.02);

  &.collapsed {
    width: 80px;
  }

  @media (max-width: 768px) {
    left: ${props => props.isOpen ? '0' : '-100%'};
    width: 280px;
    box-shadow: 20px 0 50px rgba(0, 0, 0, 0.1);
  }
`;

export const SidebarToggle = styled.button`
  position: absolute;
  right: -12px;
  top: 32px;
  width: 24px;
  height: 24px;
  background: #0061ff;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 97, 255, 0.3);
  z-index: 1001;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: #0052d9;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SidebarLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Outfit', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 2.5rem;
  padding: 0 0.75rem;
  overflow: hidden;
  white-space: nowrap;

  span {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
    visibility: visible;
  }

  ${Sidebar}.collapsed & {
    padding: 0;
    justify-content: center;
  }

  ${Sidebar}.collapsed & span {
    opacity: 0;
    visibility: hidden;
    width: 0;
    transform: translateX(-10px);
    pointer-events: none;
  }
`;

export const LogoIconSmall = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #0061ff 0%, #8b5cf6 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 97, 255, 0.2);
`;

export const SidebarNav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: #64748b;
  position: relative;
  overflow: hidden;

  svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  span {
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    opacity: 1;
    visibility: visible;
  }

  &:hover {
    background: #f1f5f9;
    color: #0061ff;
  }

  &.active {
    background: #0061ff;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 97, 255, 0.2);
    
    &:hover {
      background: #0052d9;
    }
  }

  ${Sidebar}.collapsed & {
    justify-content: center;
    padding: 0.85rem;
    gap: 0;
  }

  ${Sidebar}.collapsed & span {
    opacity: 0;
    visibility: hidden;
    width: 0;
    margin-left: 0;
    transform: translateX(-10px);
  }
`;

export const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(226, 232, 240, 0.5);
`;

export const MobileOverlay = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 999;
`;

export const MainContent = styled.main`
  flex: 1;
  margin-left: ${props => props.sidebarCollapsed ? '80px' : '260px'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 100vh;
  width: 100%;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 70px;
  }
`;

export const Header = styled.header`
  padding: 1.25rem 2.5rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 50;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    right: 0;
    padding: 0.75rem 1.25rem;
  }
`;

export const Hamburger = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    color: #1e293b;
    cursor: pointer;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const UserTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.4rem 0.5rem 0.4rem 0.4rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }

  @media (max-width: 768px) {
    .user-info { display: none; }
  }
`;

export const UserAvatar = styled.div`
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, #0061ff 0%, #8b5cf6 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  color: #64748b;

  &:hover {
    background: #f1f5f9;
    color: #0061ff;
    border-color: #0061ff;
  }
`;
