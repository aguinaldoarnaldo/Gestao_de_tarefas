import styled from 'styled-components';

/*
  Layout: Trello-style TOP NAV
  Dark blue bar at top, white content below.
*/

// ─── Root Container ──────────────────────────────────────────
export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7fafc;
  background-image: radial-gradient(rgba(0, 0, 0, 0.12) 1px, transparent 0);
  background-size: 20px 20px;
  background-attachment: fixed;
  color: #0d2137;
`;

// ─── Top Navigation Bar (Header) ───────────────────────────
export const TopNav = styled.header`
  height: 54px;
  background: #0d2137;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  gap: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 1001;
  box-shadow: 0 1px 0 rgba(255,255,255,0.06);
  flex-shrink: 0;
`;

// ─── Logo ─────────────────────────────────────────────────────
export const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 1.15rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.02em;
  margin-right: 1rem;
  cursor: pointer;
  padding: 0 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255,255,255,0.08);
  }
`;

export const NavLogoIcon = styled.div`
  width: 30px;
  height: 30px;
  background: #2a7de1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

// ─── Divider ──────────────────────────────────────────────────
export const NavDivider = styled.div`
  width: 1px;
  height: 24px;
  background: rgba(255,255,255,0.15);
  margin: 0 0.5rem;
  flex-shrink: 0;
`;

// ─── Sub Navigation Bar (Menu) ─────────────────────────────
export const SubNav = styled.nav`
  background: #0d2137;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0 1.5rem;
  height: 44px;
  margin-bottom: 0;
  position: sticky;
  top: 54px;
  z-index: 1000;
  flex-shrink: 0;

  @media (max-width: 640px) {
    display: none;
  }
`;

// ─── Nav Items ────────────────────────────────────────────────
export const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 0.15rem;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0.4rem 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.18s ease;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;

  svg {
    flex-shrink: 0;
    opacity: 0.75;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
    svg { opacity: 1; }
  }

  &.active {
    background: rgba(42, 125, 225, 0.25);
    color: #ffffff;
    font-weight: 700;
    border-bottom: 2px solid #2a7de1;
    border-radius: 0;
    svg { opacity: 1; }
  }
`;

// ─── Search Bar ───────────────────────────────────────────────
export const NavSearch = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 0.75rem;

  svg {
    position: absolute;
    left: 10px;
    color: rgba(255,255,255,0.4);
    pointer-events: none;
  }

  input {
    width: 200px;
    padding: 6px 12px 6px 34px;
    border-radius: 8px;
    border: 1.5px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.1);
    color: white;
    font-size: 0.84rem;
    outline: none;
    transition: all 0.2s;

    &::placeholder { color: rgba(255,255,255,0.4); }

    &:focus {
      background: rgba(255,255,255,0.18);
      border-color: rgba(255,255,255,0.35);
      width: 240px;
    }
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

// ─── Right Side ───────────────────────────────────────────────
export const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-left: auto;
`;

export const NavIconBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  color: rgba(255,255,255,0.7);

  &:hover {
    background: rgba(255,255,255,0.15);
    color: white;
  }
`;

export const UserBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.3rem 0.65rem 0.3rem 0.3rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.07);
  margin-left: 0.25rem;
  position: relative;

  &:hover {
    background: rgba(255,255,255,0.14);
    border-color: rgba(255,255,255,0.25);
  }
`;

export const UserAvatar = styled.div`
  width: 30px;
  height: 30px;
  background: #2a7de1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 0.82rem;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserName = styled.span`
  font-size: 0.84rem;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const UserDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 200px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  border: 1px solid #e2e8f0;
  padding: 0.5rem;
  display: ${props => props.$show ? 'flex' : 'none'};
  flex-direction: column;
  z-index: 2000;
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  color: #1e293b;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  svg {
    color: #64748b;
    transition: color 0.2s;
  }

  &:hover {
    background: #f1f5f9;
    color: #0d2137;
    svg { color: #0d2137; }
  }

  &.danger {
    color: #ef4444;
    svg { color: #ef4444; }
    &:hover { background: #fef2f2; }
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: #f1f5f9;
  margin: 0.4rem 0.5rem;
`;

// ─── Mobile Menu ─────────────────────────────────────────────
export const MobileMenuBtn = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  margin-right: 0.5rem;

  @media (max-width: 640px) {
    display: flex;
  }
`;

export const MobileDrawer = styled.div`
  display: ${props => props.$open ? 'flex' : 'none'};
  flex-direction: column;
  position: fixed;
  top: 98px;
  left: 0;
  right: 0;
  background: #0d2137;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  z-index: 999;
  padding: 0.75rem;
  gap: 0.25rem;
  box-shadow: 0 8px 20px rgba(13,33,55,0.35);
`;

export const MobileNavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.15s;

  &:hover, &.active {
    background: #2a7de1;
    color: white;
    font-weight: 700;
  }
`;

export const MobileOverlay = styled.div`
  display: ${props => props.$show ? 'block' : 'none'};
  position: fixed;
  top: 98px; left: 0; right: 0; bottom: 0;
  background: rgba(13,33,55,0.4);
  z-index: 998;
`;

// ─── Page Content ─────────────────────────────────────────────
export const PageContent = styled.main`
  flex: 1;
  overflow-y: auto;
  background: transparent;
  min-height: calc(100vh - 98px);
`;

// ─── Legacy exports (used by other components) ────────────────
export const Sidebar = styled.div`display:none;`;
export const SidebarToggle = styled.div`display:none;`;
export const SidebarLogo = styled.div`display:none;`;
export const LogoIconSmall = styled.div`display:none;`;
export const SidebarNav = styled.div`display:none;`;
export const SidebarFooter = styled.div`display:none;`;
export const MainContent = styled.div`flex:1;`;
export const Header = styled.div`display:none;`;
export const Hamburger = styled.button`display:none;`;
export const HeaderLeft = styled.div`display:none;`;
export const HeaderRight = styled.div`display:none;`;
export const ActionButton = styled.button`display:none;`;
export const UserTag = styled.div`display:none;`;
export const NotificationBadge = styled.span`display:none;`;
export const NotificationDropdown = styled.div`display:none;`;
export const NotificationHeader = styled.div`display:none;`;
export const NotificationList = styled.div`display:none;`;
export const NotificationItem = styled.div`display:none;`;
export const InviteActions = styled.div`display:none;`;
