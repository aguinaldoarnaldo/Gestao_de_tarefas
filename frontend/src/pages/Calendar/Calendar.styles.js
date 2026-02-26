import styled from 'styled-components';

export const CalendarPage = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: #f8fafc;
  min-height: calc(100vh - 64px);
  font-family: 'Inter', sans-serif;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const MainContent = styled.main`
  flex: 2;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  min-width: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f1f5f9;
  padding: 0.5rem;
  border-radius: 12px;
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
    background: #f8fafc;
    color: #3b82f6;
    border-color: #3b82f6;
  }
`;

export const MonthDisplay = styled.span`
  font-weight: 600;
  color: #334155;
  min-width: 150px;
  text-align: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  background: #f1f5f9;
  padding: 8px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
`;

export const DayLabel = styled.div`
  text-align: center;
  font-weight: 600;
  color: #64748b;
  font-size: 0.875rem;
  padding-bottom: 8px;
`;

export const DayCell = styled.div`
  min-height: 100px;
  background: ${props => props.$isToday ? '#eff6ff' : props.$isOtherMonth ? '#f8fafc' : '#fff'};
  border-radius: 12px;
  padding: 8px;
  border: 1px solid ${props => props.$isToday ? '#bfdbfe' : '#e2e8f0'};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-color: #3b82f6;
  }
`;

export const DayNumber = styled.div`
  font-weight: 700;
  font-size: 0.9rem;
  color: ${props => props.$isToday ? '#2563eb' : '#475569'};
  margin-bottom: 4px;
`;

export const TaskBadge = styled.div`
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  
  background: ${props => {
    switch(props.$status) {
      case 'Concluída': return '#dcfce7';
      case 'Em Andamento': return '#e0f2fe';
      default: return '#fee2e2';
    }
  }};
  
  color: ${props => {
    switch(props.$status) {
      case 'Concluída': return '#166534';
      case 'Em Andamento': return '#075985';
      default: return '#991b1b';
    }
  }};
`;

export const Sidebar = styled.aside`
  flex: 1;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  min-width: 300px;
`;

export const SidebarTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TaskCard = styled.div`
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;

  &:hover {
    border-color: #cbd5e1;
    background: #f1f5f9;
  }
`;

export const TaskCardTitle = styled.div`
  font-weight: 600;
  color: #334155;
  margin-bottom: 4px;
`;

export const TaskCardMeta = styled.div`
  font-size: 0.8rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StatusIndicator = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => {
    switch(props.$status) {
      case 'Concluída': return '#22c55e';
      case 'Em Andamento': return '#0ea5e9';
      default: return '#ef4444';
    }
  }};
`;
