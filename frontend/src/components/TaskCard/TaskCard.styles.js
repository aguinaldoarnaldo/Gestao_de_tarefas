import styled from 'styled-components';

export const TaskCardContainer = styled.div`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 16px 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  width: 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.6);
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  line-height: 1.4;
  flex: 1;
`;

export const CardMenu = styled.div`
  position: relative;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 180px;
  margin-top: 8px;
  overflow: hidden;
  border: 1px solid #f1f5f9;
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  color: #1e293b;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
    color: #0061ff;
  }

  &.delete {
    color: #ef4444;
    &:hover { background: #fff1f2; }
  }
`;

export const CardDesc = styled.p`
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 8px 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 12px;
`;

export const CardAttachments = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #475569;
  background: rgba(255, 255, 255, 0.3);

  &.overdue {
    background: #fee2e2;
    color: #ef4444;
  }
`;

export const CardStatusIndicator = styled.div`
  display: none;
`;

// TASK DETAILS MODAL IMPROVEMENTS
export const TaskDetailsOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`;

export const TaskDetailsModal = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-radius: 40px;
  width: 100%;
  max-width: 850px;
  height: auto;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 40px 120px -20px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.5);
  animation: modalEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes modalEnter {
    from { opacity: 0; transform: scale(0.9) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  @media (max-width: 768px) {
    border-radius: 24px;
    max-height: 98vh;
  }
`;

export const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 48px;
  background: rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(0,0,0,0.05);

  h2 {
    margin: 0;
    color: #0f172a;
    font-size: 1.75rem;
    font-weight: 850;
    letter-spacing: -0.02em;
  }

  @media (max-width: 768px) {
    padding: 24px;
    h2 { font-size: 1.4rem; }
  }
`;

export const ModalCloseButton = styled.button`
  background: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #64748b;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  &:hover {
    background: #ef4444;
    color: white;
    transform: scale(1.1) rotate(90deg);
  }
`;

export const ModalBody = styled.div`
  padding: 40px 48px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 40px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #dfe1e6;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 24px;
    gap: 30px;
  }
`;

export const MainContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const SideContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  background: rgba(0, 0, 0, 0.02);
  padding: 24px;
  border-radius: 24px;
  height: fit-content;
`;

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InfoItem = styled.div`
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 12px;
  }

  span {
    color: #1e293b;
    font-size: 1rem;
    font-weight: 600;

    &.overdue {
      color: #ef4444;
    }
  }

  p {
    margin: 0;
    color: #334155;
    font-size: 1.05rem;
    line-height: 1.8;
    background: white;
    padding: 24px;
    border-radius: 20px;
    border: 1px solid #f1f5f9;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  }
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 12px;
  color: white;
  font-size: 0.85rem;
  font-weight: 750;
  background-color: ${props => props.color || '#94a3b8'};
  box-shadow: 0 4px 12px ${props => props.color + '40' || 'rgba(0,0,0,0.1)'};
`;
