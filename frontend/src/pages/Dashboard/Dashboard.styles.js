import styled from 'styled-components';

export const KanbanBoard = styled.div`
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  min-height: calc(100vh - 120px);
  background: transparent;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 100px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 2rem;
    height: auto;
    overflow-x: hidden;
  }
`;

export const KanbanColumn = styled.div`
  flex: 0 0 320px;
  width: 320px;
  height: fit-content;
  max-height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 1 0 auto;
    width: 100%;
    max-width: 100%;
  }
`;

export const ColumnContent = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  flex-direction: column;
  padding: 8px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
`;

export const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px 12px;
`;

export const ColumnTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  h2 {
    font-size: 1.1rem;
    font-weight: 700;
    color: white;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

export const TaskCount = styled.span`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding: 8px;
  max-height: calc(100vh - 280px);

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 100px;
  }

  @media (max-width: 768px) {
    max-height: none;
    overflow-y: visible;
  }
`;

export const AddTaskButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 12px 16px;
  margin-top: 8px;
  width: 100%;
  border: none;
  background: transparent;
  border-radius: 16px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 0.9rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

export const LoadingTasks = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

export const FilterBar = styled.div`
  display: flex;
  padding: 1rem 2.5rem;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    gap: 0.75rem;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  label {
    font-size: 0.75rem;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const FilterSelect = styled.select`
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 0.875rem;
  color: white;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  font-weight: 500;
  backdrop-filter: blur(10px);
  
  option {
    background: #1e293b;
    color: white;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  &:focus {
    outline: none;
    border-color: #0061ff;
    background: rgba(255, 255, 255, 0.1);
  }
`;
