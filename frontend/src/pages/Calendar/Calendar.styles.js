import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f0f4f8 0%, #e8ecf2 100%);
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    gap: 1rem;
    padding: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const CalendarMain = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  min-width: 0;
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 8px;
  }
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CalendarTitle = styled.h1`
  margin: 0;
  font-size: 1.75rem;
  color: #1e293b;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export const MonthSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const DropdownButton = styled.button`
  background: white;
  border: 1px solid #cbd5e1;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #f8fafc;
    border-color: #94a3b8;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

export const NavigationButton = styled.button`
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    color: #1e293b;
  }

  @media (max-width: 480px) {
    min-width: 32px;
    height: 32px;
  }
`;

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  box-sizing: border-box;
`;

export const WeekDaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 0;
  width: 100%;
`;

export const DayHeader = styled.div`
  text-align: center;
  font-weight: 600;
  color: #475569;
  padding: 0.75rem 0.25rem;
  font-size: 0.75rem;
  border-right: 1px solid #e2e8f0;
  word-break: break-word;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.1rem;
    font-size: 0.65rem;
  }

  @media (max-width: 480px) {
    font-size: 0.55rem;
    padding: 0.4rem 0;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0;
  border: 1px solid #e2e8f0;
  width: 100%;
`;

export const DayCell = styled.div`
  aspect-ratio: 1;
  border-right: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.5rem;
  background: ${props => (props.isToday ? '#eff6ff' : '#fff')};
  cursor: ${props => (props.isEmpty ? 'default' : 'pointer')};
  opacity: ${props => (props.isEmpty ? '0.4' : '1')};
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
  position: relative;
  min-height: 100px;
  overflow: hidden;
  box-sizing: border-box;

  &:hover {
    ${props => !props.isEmpty && `
      background: #f8fafc;
    `}
  }

  &:nth-child(7n) {
    border-right: none;
  }

  @media (max-width: 1024px) {
    min-height: 85px;
    padding: 0.4rem;
  }

  @media (max-width: 768px) {
    min-height: 75px;
    padding: 0.35rem;
    aspect-ratio: auto;
  }

  @media (max-width: 480px) {
    min-height: 60px;
    padding: 0.25rem;
  }
`;

export const DayNumber = styled.div`
  font-weight: 600;
  color: ${props => (props.isToday ? '#0061ff' : '#1e293b')};
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-bottom: 0.2rem;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
    margin-bottom: 0.1rem;
  }
`;

export const TaskBadges = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow: hidden;
  flex: 1;
  width: 100%;
  min-width: 0;
`;

export const TaskBadge = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.4rem;
  background: ${props => {
        if (props.color === '#10b981') return '#ecfdf5';
        if (props.color === '#0061ff') return '#eff6ff';
        if (props.color === '#f59e0b') return '#fffbeb';
        return '#f1f5f9';
    }};
  border-left: 2px solid ${props => props.color};
  border: none;
  border-radius: 2px;
  font-size: 0.6rem;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  min-width: 0;
  flex-shrink: 1;

  &:hover {
    background: ${props => {
        if (props.color === '#10b981') return '#d1fae5';
        if (props.color === '#0061ff') return '#dbeafe';
        if (props.color === '#f59e0b') return '#fef3c7';
        return '#e2e8f0';
    }};
  }

  @media (max-width: 768px) {
    padding: 0.2rem 0.3rem;
    font-size: 0.55rem;
    gap: 0.2rem;
  }

  @media (max-width: 480px) {
    padding: 0.15rem 0.2rem;
    font-size: 0.5rem;
  }
`;

export const StatusDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${props => props.color};
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 3px;
    height: 3px;
  }
`;

export const SidePanel = styled.div`
  width: 260px;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  max-height: calc(100vh - 3rem);
  overflow-y: auto;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    width: 220px;
    padding: 1rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-height: 400px;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    max-height: 300px;
  }
`;

export const SidePanelTitle = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  color: #1e293b;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
`;

export const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TaskCard = styled.div`
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid #cbd5e1;
  min-width: 0;

  &:hover {
    background: #f1f5f9;
    border-left-color: #0061ff;
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    border-radius: 4px;
  }
`;

export const TaskTitle = styled.h3`
  margin: 0 0 0.4rem 0;
  font-size: 0.85rem;
  color: #1e293b;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-bottom: 0.3rem;
  }
`;

export const TaskStatus = styled.p`
  margin: 0.2rem 0;
  font-size: 0.7rem;
  color: ${props => props.color};
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

export const TaskMeta = styled.div`
  margin-top: 0.4rem;
  font-size: 0.65rem;
  color: #94a3b8;
  display: flex;
  gap: 0.4rem;

  span {
    color: #475569;
    font-weight: 500;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    gap: 0.3rem;
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #94a3b8;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.8rem;
  }
`;

