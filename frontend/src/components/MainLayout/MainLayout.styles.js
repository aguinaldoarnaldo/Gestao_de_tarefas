import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2564&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #1a202c;
  width: 100%;
  overflow-x: hidden;
  height: 100vh;
`;

export const Sidebar = styled.aside`
  width: 260px;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
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
    left: ${props => props.$isOpen ? '0' : '-100%'};
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
  display: ${props => props.$show ? 'block' : 'none'};
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
  margin-left: ${props => props.$sidebarCollapsed ? '80px' : '260px'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 100vh;
  width: 100%;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 64px;
    width: 100vw;
  }
`;

export const Header = styled.header`
  padding: 1rem 2.5rem;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    position: fixed;
    height: 64px;
    left: 0;
    right: 0;
    padding: 0 1rem;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
  }
`;

export const Hamburger = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    color: #1e293b;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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
      font-size: 1.1rem;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
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
    padding: 0.3rem;
    border-radius: 10px;
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
  position: relative;

  &:hover {
    background: #f1f5f9;
    color: #0061ff;
    border-color: #0061ff;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ef4444;
  color: white;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 20px;
  border: 2px solid white;
  min-width: 18px;
`;

export const NotificationDropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  width: 350px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid #f1f5f9;
  z-index: 2000;
  padding: 1.5rem;
  display: ${props => props.$show ? 'block' : 'none'};
  animation: ${slideDown} 0.3s ease-out;

  @media (max-width: 480px) {
    width: 280px;
    right: -50px;
  }
`;

export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h4 { margin: 0; font-size: 1.1rem; color: #1e293b; }
  button { 
    background: transparent; border: none; font-size: 0.8rem; 
    color: #0061ff; font-weight: 600; cursor: pointer;
  }
`;

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 5px;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
`;

export const NotificationItem = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 14px;
  background: ${props => props.$unread ? '#f1f5f9' : 'transparent'};
  transition: all 0.2s;
  cursor: pointer;

  &:hover { background: #f8fafc; }

  .icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: ${props => props.$type === 'convite' ? '#eff6ff' : '#f8fafc'};
    color: ${props => props.$type === 'convite' ? '#0061ff' : '#64748b'};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    .title { font-weight: 700; color: #1e293b; font-size: 0.9rem; }
    .msg { font-size: 0.8rem; color: #64748b; line-height: 1.4; }
    .time { font-size: 0.7rem; color: #94a3b8; margin-top: 4px; }
  }
`;

export const InviteActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;

  button {
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
  }

  .btn-accept {
    background: #10b981;
    color: white;
    &:hover { background: #059669; }
  }

  .btn-reject {
    background: #f1f5f9;
    color: #64748b;
    &:hover { background: #e2e8f0; }
  }
`;
