import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const AnalyticsContainer = styled.div`
  padding: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeIn} 0.8s ease-out;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  padding: 1.5rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const StatIcon = styled.div`
  width: 54px;
  height: 54px;
  background: ${props => props.$color || '#0061ff'};
  color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 800;
    color: white;
    margin: 0;
  }
`;

export const RecentActivity = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    font-size: 1.25rem;
    font-weight: 800;
    color: white;
    margin-bottom: 1.5rem;
  }
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);

  &:last-child {
    border-bottom: none;
  }

  .activity-icon {
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #60a5fa;
  }

  .activity-text {
    flex: 1;
    font-size: 0.95rem;
    
    strong {
      color: white;
    }
  }

  .activity-time {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.4);
  }
`;
