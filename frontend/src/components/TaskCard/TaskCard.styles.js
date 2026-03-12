import styled from 'styled-components';

export const TaskCardContainer = styled.div`
  background: ${props => props.$hasBoardBg ? 'rgba(255, 255, 255, 0.82)' : '#ffffff'};
  backdrop-filter: ${props => props.$hasBoardBg ? 'blur(4px)' : 'none'};
  border-radius: 12px;
  padding: 12px;
  border: ${props => props.$hasBoardBg ? '1px solid rgba(226, 232, 240, 0.5)' : '1px solid #e2e8f0'};
  box-shadow: ${props => props.$hasBoardBg ? '0 1px 3px rgba(0,0,0,0.02)' : '0 2px 4px rgba(0,0,0,0.05)'};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  width: 100%;
  box-sizing: border-box;
  z-index: ${props => props.$isMenuOpen ? 1000 : 1};

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    border-color: #cbd5e1;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
`;

export const CardTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  line-height: 1.4;
  flex: 1;
`;

export const CardDesc = styled.p`
  color: #64748b;
  font-size: 0.75rem;
  line-height: 1.5;
  margin: 4px 0 10px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #f1f5f9;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 700;
  color: #64748b;
  background: #f1f5f9;

  &.overdue {
    background: #fef2f2;
    color: #ef4444;
  }
`;

export const CardAttachments = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #94a3b8;
  font-size: 0.7rem;
  font-weight: 600;
`;

export const StatusBadge = styled.span`
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${props => props.color || '#f1f5f9'};
  color: #fff;
`;

// ─── Modal Details Redesign ──────────────────────────────────
export const TaskDetailsOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`;

export const TaskDetailsModal = styled.div`
  background: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    max-height: 95vh;
  }
`;

export const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f1f5f9;

  h2 {
    margin: 0;
    color: #0f172a;
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
`;

export const ModalCloseButton = styled.button`
  background: #f1f5f9;
  border: none;
  cursor: pointer;
  color: #64748b;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #fee2e2;
    color: #ef4444;
  }
`;

export const ModalBody = styled.div`
  padding: 2rem;
  overflow-y: auto;
  
  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
`;

export const MainContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
`;

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  label {
    display: block;
    font-size: 0.7rem;
    font-weight: 800;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0;
    color: #334155;
    font-size: 0.9rem;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
    overflow-wrap: anywhere;
    max-width: 100%;
    box-sizing: border-box;
  }
`;

export const SideContentArea = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: #f8fafc;
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  height: fit-content;
`;

export const InfoItem = styled.div`
  span {
    font-size: 0.85rem;
    font-weight: 600;
    color: #1e293b;
  }
`;

export const CardMenu = styled.div`
  position: relative;
  z-index: 10;
`;

export const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f1f5f9;
    color: #0d2137;
  }
`;

export const DropdownMenu = styled.div`
  position: fixed;
  top: ${props => props.$top || 0}px;
  left: ${props => props.$left || 0}px;
  width: 180px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.1);
  border: 1px solid #cbd5e1;
  padding: 0.5rem;
  z-index: 10000;
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  font-size: 0.75rem;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 4px;

  button {
    background: transparent;
    border: none;
    color: #64748b;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
    &:hover { color: #0d2137; }
  }
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;

  svg { opacity: 0.7; }

  &:hover {
    background: #f8fafc;
    color: #0d2137;
    svg { opacity: 1; }
  }

  &.delete {
    color: #ef4444;
    &:hover { background: #fef2f2; }
  }
`;
