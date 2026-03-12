import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  CheckCircle,
  Layout,
  Calendar,
  Settings,
  LogOut,
  Search,
  Menu,
  X,
  User as UserIcon,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutContainer,
  TopNav,
  SubNav,
  NavLogo,
  NavLogoIcon,
  NavItems,
  NavItem,
  NavSearch,
  NavRight,
  UserBtn,
  UserAvatar,
  UserName,
  UserDropdown,
  DropdownItem,
  DropdownDivider,
  MobileMenuBtn,
  MobileDrawer,
  MobileNavItem,
  MobileOverlay,
  PageContent
} from './MainLayout.styles';

import apiService from '../../services/api';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const menuItems = [
  { icon: <Layout size={16} />, label: 'Meus Quadros', path: '/boards' },
  { icon: <Calendar size={16} />, label: 'Calendário', path: '/calendar' },
  { icon: <Settings size={16} />, label: 'Configurações', path: '/settings' },
];

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    setIsLoggingOut(true);
    
    // Simulate a brief loading sequence before actually logging out
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 1500);
  };

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  const userAvatarUrl = apiService.getImageUrl(user?.avatar);

  return (
    <LayoutContainer>
      {isLoggingOut && <LoadingScreen message="A terminar sessão..." />}
      {/* ══ HEADER — Logo + Search + User ═══════════════════════ */}
      <TopNav>
        <MobileMenuBtn onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </MobileMenuBtn>

        <NavLogo onClick={() => navigate('/boards')}>
          <NavLogoIcon>
            <CheckCircle size={17} />
          </NavLogoIcon>
          TaskFlow
        </NavLogo>

        <div style={{ flex: 1 }} />

        <NavSearch>
          <Search size={15} />
          <input type="text" placeholder="Pesquisar tarefas..." />
        </NavSearch>

        <NavRight>
          <UserBtn 
            ref={dropdownRef} 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            title="Menu do utilizador"
          >
            <UserAvatar>
              {userAvatarUrl ? (
                <img src={userAvatarUrl} alt={user?.nome} />
              ) : (
                user?.nome ? user.nome.substring(0, 1).toUpperCase() : 'U'
              )}
            </UserAvatar>
            <UserName>
              {user?.nome || 'Utilizador'}
              <ChevronDown size={14} style={{ opacity: 0.7, marginLeft: 2 }} />
            </UserName>

            <UserDropdown $show={dropdownOpen}>
              <DropdownItem onClick={() => handleNav('/profile')}>
                <UserIcon size={16} /> Meu Perfil
              </DropdownItem>
              <DropdownItem onClick={() => handleNav('/settings')}>
                <Settings size={16} /> Configurações
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem className="danger" onClick={() => {
                setDropdownOpen(false);
                setShowLogoutConfirm(true);
              }}>
                <LogOut size={16} /> Sair
              </DropdownItem>
            </UserDropdown>
          </UserBtn>
        </NavRight>
      </TopNav>

      {/* ══ SUB-NAV — Menu centrado ══════════════════════════════ */}
      <SubNav>
        <NavItems>
          {menuItems.map(item => (
            <NavItem
              key={item.path}
              className={location.pathname === item.path ? 'active' : ''}
              onClick={() => handleNav(item.path)}
            >
              {item.icon}
              {item.label}
            </NavItem>
          ))}
        </NavItems>
      </SubNav>

      {/* ══ MOBILE DRAWER ════════════════════════════════════════ */}
      <MobileOverlay $show={mobileOpen} onClick={() => setMobileOpen(false)} />
      <MobileDrawer $open={mobileOpen}>
        {menuItems.map(item => (
          <MobileNavItem
            key={item.path}
            className={location.pathname === item.path ? 'active' : ''}
            onClick={() => handleNav(item.path)}
          >
            {item.icon}
            {item.label}
          </MobileNavItem>
        ))}
        <MobileNavItem
          onClick={() => setShowLogoutConfirm(true)}
          style={{ color: '#fca5a5', marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem' }}
        >
          <LogOut size={16} />
          Sair
        </MobileNavItem>
      </MobileDrawer>

      {/* ── LOGOUT CONFIRMATION MODAL ── */}
      {showLogoutConfirm && (
        <div 
          onClick={() => setShowLogoutConfirm(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(13, 33, 55, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5000,
            padding: '20px'
          }}
        >
          <div 
            onClick={e => e.stopPropagation()}
            style={{
              background: '#ffffff',
              padding: '2rem',
              borderRadius: '24px',
              maxWidth: '380px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              background: '#fee2e2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#ef4444'
            }}>
              <LogOut size={30} />
            </div>
            <h3 style={{ margin: '0 0 0.5rem', color: '#0d2137', fontWeight: 800 }}>Deseja mesmo sair?</h3>
            <p style={{ margin: '0 0 2rem', color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Terá de iniciar sessão novamente para aceder às suas tarefas.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  color: '#64748b',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button 
                onClick={confirmLogout}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#0d2137',
                  color: '#ffffff',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Sim, sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ CONTEÚDO DA PÁGINA ═══════════════════════════════════ */}
      <PageContent>
        {children || <Outlet />}
      </PageContent>
    </LayoutContainer>
  );
};

export default MainLayout;
