import styled from 'styled-components';

export const KanbanBoard = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  min-height: calc(100vh - 98px - 52px); /* SubNav + FilterBar */
  background: ${props => props.$bg ? `linear-gradient(rgba(13,33,55,0.1), rgba(13,33,55,0.4)), url(${props.$bg})` : '#f1f5f9'};
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  align-items: flex-start;

  &::-webkit-scrollbar { height: 6px; }
  &::-webkit-scrollbar-track { background: #e2e8f0; border-radius: 10px; }
  &::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    height: auto;
    overflow-x: hidden;
  }
`;

export const KanbanColumn = styled.div`
  flex: 0 0 320px;
  width: 320px;
  display: flex;
  flex-direction: column;
  max-height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex: 1 0 auto;
  }
`;

export const ColumnContent = styled.div`
  background: ${props => props.$hasBg ? 'rgba(255, 255, 255, 0.75)' : '#e2e8f0'};
  backdrop-filter: ${props => props.$hasBg ? 'blur(10px)' : 'none'};
  border-radius: 16px;
  border: ${props => props.$hasBg ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #cbd5e1'};
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  box-shadow: ${props => props.$hasBg ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'};
  max-height: calc(100vh - 250px);
`;

export const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
`;

export const ColumnTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  h2 {
    font-size: 0.75rem;
    font-weight: 800;
    color: #475569;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
`;

export const TaskCount = styled.span`
  background: #f1f5f9;
  color: #64748b;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
`;

export const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  overflow-y: auto;
  padding: 0.5rem;
  min-height: 50px;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
`;

export const AddTaskButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  margin-top: 0.5rem;
  width: 100%;
  border: 1px dashed #cbd5e1;
  background: ${props => props.$hasBg ? 'transparent' : 'rgba(255, 255, 255, 0.5)'};
  border-radius: 10px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 0.82rem;

  &:hover {
    background: #f8fafc;
    color: #0d2137;
    border-color: #0d2137;
    border-style: solid;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  padding: 0 2rem;
  height: 52px;
  gap: 1.5rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  top: 0; /* Sticky to the top of PageContent, which is just below headers */
  z-index: 900;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);

  @media (max-width: 768px) {
    padding: 0 1rem;
    height: auto;
    min-height: 52px;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  label {
    font-size: 0.7rem;
    font-weight: 800;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const FilterSelect = styled.select`
  padding: 4px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.8rem;
  color: #1e293b;
  background: #f8fafc;
  cursor: pointer;
  font-weight: 600;
  outline: none;

  &:focus {
    border-color: #0d2137;
    background: #fff;
  }
`;

export const BoardTitleDisplay = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: #0d2137;
  font-size: 0.85rem;
  padding: 4px 12px;
  background: #eff6ff;
  border-radius: 8px;
  border: 1px solid #dbeafe;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
    color: #0d2137;
    border-color: #0d2137;
  }
`;

export const LoadingTasks = styled.div`
  padding: 2rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
`;
