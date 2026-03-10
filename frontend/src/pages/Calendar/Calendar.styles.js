import styled from 'styled-components';

export const CalendarPage = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  background: #f8fafc;
  min-height: calc(100vh - 98px);
  box-sizing: border-box;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const MainContent = styled.main`
  flex: 2;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
  padding: 1.5rem;
  min-width: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: #0d2137;
  letter-spacing: -0.025em;
  margin: 0;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8fafc;
  padding: 0.35rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fff;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  
  label {
    font-size: 0.75rem;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const BoardSelect = styled.select`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 0.85rem;
  font-weight: 600;
  color: #0d2137;
  background: #f8fafc;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #2a7de1;
    background: #fff;
  }
`;

export const ControlButton = styled.button`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    color: #0d2137;
    border-color: #0d2137;
  }
`;

export const MonthDisplay = styled.span`
  font-weight: 700;
  color: #0d2137;
  min-width: 140px;
  text-align: center;
  font-size: 0.95rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #e2e8f0;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
`;

export const DayLabel = styled.div`
  text-align: center;
  font-weight: 800;
  color: #94a3b8;
  font-size: 0.7rem;
  padding: 10px 0;
  background: #fff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const DayCell = styled.div`
  min-height: 110px;
  background: ${props => props.$isToday ? '#eff6ff' : props.$isOtherMonth ? '#f9fafb' : '#fff'};
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: #f8fafc;
    z-index: 2;
    box-shadow: inset 0 0 0 1px #0d2137;
  }
`;

export const DayNumber = styled.div`
  font-weight: 800;
  font-size: 0.85rem;
  color: ${props => props.$isToday ? '#2a7de1' : props.$isOtherMonth ? '#cbd5e1' : '#475569'};
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: ${props => props.$isToday ? '#e8f0fe' : 'transparent'};
`;

export const TaskBadge = styled.div`
  font-size: 0.65rem;
  padding: 2px 6px;
  border-radius: 4px;
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
  
  background: ${props => {
    switch(props.$status) {
      case 'Concluída': return '#ecfdf5';
      case 'Em Andamento': return '#eff6ff';
      default: return '#fef2f2';
    }
  }};
  
  color: ${props => {
    switch(props.$status) {
      case 'Concluída': return '#059669';
      case 'Em Andamento': return '#2a7de1';
      default: return '#dc2626';
    }
  }};

  border: 1px solid ${props => {
    switch(props.$status) {
      case 'Concluída': return '#a7f3d0';
      case 'Em Andamento': return '#bfdbfe';
      default: return '#fecaca';
    }
  }};
`;

export const Sidebar = styled.aside`
  flex: 0 0 320px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const SidebarTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 800;
  color: #0d2137;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TaskCard = styled.div`
  padding: 1rem;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #cbd5e1;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  }
`;

export const TaskCardTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
`;

export const TaskCardMeta = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
`;

export const StatusIndicator = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => {
    switch(props.$status) {
      case 'Concluída': return '#10b981';
      case 'Em Andamento': return '#2a7de1';
      default: return '#ef4444';
    }
  }};
`;
