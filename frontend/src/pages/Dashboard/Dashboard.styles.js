import styled from 'styled-components';

export const KanbanBoard = styled.div`
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  min-height: calc(100vh - 100px);

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
  }
`;

export const KanbanColumn = styled.div`
  flex: 1;
  min-width: 320px;
  max-width: 400px;
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
`;

export const ColumnTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  h2 {
    font-size: 0.9rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }
`;

export const TaskCount = styled.span`
  background: #f1f5f9;
  color: #64748b;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AddTaskButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  width: 100%;
  border: 2px dashed #e2e8f0;
  background: transparent;
  border-radius: 12px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  font-size: 0.9rem;

  &:hover {
    border-color: #0061ff;
    color: #0061ff;
    background: #f0f7ff;
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
  border-radius: 8px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    color: #475569;
  }
`;

export const LoadingTasks = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #94a3b8;
  font-size: 0.9rem;
`;
