import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users as UsersIcon, 
  LogOut, 
  Settings, 
  Bell,
  Calendar,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  UserCircle2,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutContainer,
  Sidebar,
  SidebarToggle,
  SidebarLogo,
  LogoIconSmall,
  SidebarNav,
  NavItem,
  SidebarFooter,
  MobileOverlay,
  MainContent,
  Header,
  Hamburger,
  HeaderLeft,
  HeaderRight,
  UserTag,
  UserAvatar,
  ActionButton
} from './MainLayout.styles';

const MainLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: <LayoutDashboard />, label: 'Quadro', path: '/dashboard' },
    { icon: <UserCircle2 />, label: 'Perfil', path: '/profile' },
  ];

  if (isAdmin()) {
    menuItems.push({ icon: <UsersIcon />, label: 'Utilizadores', path: '/users' });
  }

  menuItems.push({ icon: <Calendar />, label: 'Calendário', path: '/calendar' });

  return (
    <LayoutContainer>
      <MobileOverlay show={isMobileMenuOpen} onClick={toggleMobileMenu} />

      <Sidebar className={isSidebarCollapsed ? 'collapsed' : ''} isOpen={isMobileMenuOpen}>
        <SidebarToggle onClick={toggleSidebar}>
          {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </SidebarToggle>

        <SidebarLogo onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <LogoIconSmall>
            <CheckCircle size={24} />
          </LogoIconSmall>
          <span>TaskFlow</span>
        </SidebarLogo>

        <SidebarNav>
          {menuItems.map((item, index) => (
            <NavItem 
              key={index}
              className={location.pathname === item.path ? 'active' : ''}
              onClick={() => {
                if (item.path !== '#') navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavItem>
          ))}
        </SidebarNav>

        <SidebarFooter>
          <NavItem onClick={() => navigate('#')}>
            <Settings />
            <span>Configurações</span>
          </NavItem>
          <NavItem style={{ color: '#ef4444' }} onClick={handleLogout}>
            <LogOut />
            <span>Sair</span>
          </NavItem>
        </SidebarFooter>
      </Sidebar>

      <MainContent sidebarCollapsed={isSidebarCollapsed}>
        <Header>
          <HeaderLeft>
            <Hamburger onClick={toggleMobileMenu}>
              <MoreHorizontal size={24} />
            </Hamburger>
            <h1>{title || 'Dashboard'} 🔥</h1>
          </HeaderLeft>

          <HeaderRight>
            <div className="search-desktop" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
               {/* Search placeholder */}
            </div>
            
            <ActionButton as="button">
              <Bell size={20} />
            </ActionButton>

            <UserTag onClick={() => navigate('/profile')}>
              <UserAvatar>
                {user?.nome ? user.nome.substring(0, 2).toUpperCase() : 'U'}
              </UserAvatar>
              <div className="user-info" style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                  {user?.nome || 'Utilizador'}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {user?.tipo === 'admin' ? 'Administrador' : 'Membro'}
                </span>
              </div>
            </UserTag>
          </HeaderRight>
        </Header>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default MainLayout;
