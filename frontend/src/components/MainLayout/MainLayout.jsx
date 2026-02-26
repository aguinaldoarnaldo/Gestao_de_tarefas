import React, { useState, useEffect } from 'react';
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
  CheckCircle,
  PieChart,
  Layout,
  Users,
  Search,
  Briefcase
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
  ActionButton,
  NotificationBadge,
  NotificationDropdown,
  NotificationHeader,
  NotificationList,
  NotificationItem,
  InviteActions
} from './MainLayout.styles';
import apiService from '../../services/api';

const MainLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchNotifications = async () => {
    try {
      const data = await apiService.getMyNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleNotificationAction = async (id, action, inviteId = null) => {
    try {
      if (inviteId) {
        await apiService.respondToInvite(inviteId, action === 'accept');
      }
      await apiService.markNotificationAsRead(id);
      fetchNotifications();
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: <Layout size={20} />, label: 'Meus Quadros', path: '/boards' },
    { icon: <Users size={20} />, label: 'Equipa', path: '/teams' },
    { icon: <PieChart size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <Calendar size={20} />, label: 'Calendar', path: '/calendar' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  if (isAdmin()) {
    menuItems.push({ icon: <UsersIcon size={20} />, label: 'Users Admin', path: '/users' });
  }

  return (
    <LayoutContainer>
      <MobileOverlay $show={isMobileMenuOpen} onClick={toggleMobileMenu} />

      <Sidebar className={isSidebarCollapsed ? 'collapsed' : ''} $isOpen={isMobileMenuOpen}>
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
          <NavItem style={{ color: '#ef4444' }} onClick={handleLogout}>
            <LogOut size={20} />
            <span>Sair</span>
          </NavItem>
        </SidebarFooter>
      </Sidebar>

      <MainContent $sidebarCollapsed={isSidebarCollapsed}>
        <Header>
          <HeaderLeft>
            <Hamburger onClick={toggleMobileMenu}>
              <MoreHorizontal size={24} />
            </Hamburger>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>{title || 'TaskFlow'}</h1>
          </HeaderLeft>

          <div className="header-search-container" style={{ 
            flex: 1, 
            maxWidth: '400px', 
            margin: '0 1.5rem', 
            position: 'relative',
            display: window.innerWidth < 640 ? 'none' : 'flex',
            alignItems: 'center'
          }}>
            <Search size={18} style={{ 
              position: 'absolute', 
              left: '12px', 
              color: '#94a3b8',
              zIndex: 1
            }} />
            <input 
              type="text" 
              placeholder="Search..." 
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                fontSize: '0.85rem',
                outline: 'none',
                transition: 'all 0.3s'
              }}
            />
          </div>

          <HeaderRight>
            <div style={{ position: 'relative' }}>
              <ActionButton onClick={() => setShowNotifications(!showNotifications)} style={{ border: 'none', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}>
                <Bell size={20} />
                {notifications.filter(n => !n.lido).length > 0 && (
                  <NotificationBadge>{notifications.filter(n => !n.lido).length}</NotificationBadge>
                )}
              </ActionButton>

              <NotificationDropdown $show={showNotifications}>
                <NotificationHeader>
                  <h4>Notificações</h4>
                  <button onClick={async () => { await apiService.markAllNotificationsAsRead(); fetchNotifications(); }}>Limpar Tudo</button>
                </NotificationHeader>

                <NotificationList>
                  {notifications.length > 0 ? (
                    notifications.map(notif => (
                      <NotificationItem 
                        key={notif.id} 
                        $unread={!notif.lido} 
                        $type={notif.tipo}
                        onClick={() => {
                          if (notif.link) navigate(notif.link);
                          setShowNotifications(false);
                          if (!notif.lido) handleNotificationAction(notif.id, 'read');
                        }}
                      >
                        <div className="icon">
                          <Bell size={18} />
                        </div>
                        <div className="content">
                          <span className="title">{notif.titulo}</span>
                          <span className="msg">{notif.mensagem}</span>
                          {notif.tipo === 'convite' && !notif.lido && (
                            <InviteActions>
                              <button className="btn-accept" onClick={() => handleNotificationAction(notif.id, 'accept', notif.referencia_id)}>Aceitar</button>
                              <button className="btn-reject" onClick={() => handleNotificationAction(notif.id, 'reject', notif.referencia_id)}>Recusar</button>
                            </InviteActions>
                          )}
                          <span className="time">{new Date(notif.criado_em).toLocaleString()}</span>
                        </div>
                      </NotificationItem>
                    ))
                  ) : (
                    <div style={{ textAlign: 'center', padding: '1rem', color: '#94a3b8' }}>
                      Sem novas notificações
                    </div>
                  )}
                </NotificationList>
              </NotificationDropdown>
            </div>

            <UserTag onClick={() => navigate('/profile')} style={{ border: 'none', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}>
              <UserAvatar>
                {user?.nome ? user.nome.substring(0, 1).toUpperCase() : 'U'}
              </UserAvatar>
              <div className="user-info" style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>
                  {user?.nome || 'Utilizador'}
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
