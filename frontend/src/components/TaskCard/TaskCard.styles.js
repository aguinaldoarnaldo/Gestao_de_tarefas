import styled from 'styled-components';

export const TaskCardContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const CardTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  line-height: 1.4;
  flex: 1;
  margin-right: 8px;
`;

export const CardMenu = styled.div`
  position: relative;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #64748b;
  transition: background-color 0.2s;

  &:hover {
    background: #f1f5f9;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 150px;
  margin-top: 4px;
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
  transition: background-color 0.2s;

  &:hover {
    background: #f9fafb;
  }

  &.delete {
    color: #dc2626;

    &:hover {
      background: #fef2f2;
    }
  }
`;

export const CardDesc = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 12px 0;
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
  font-size: 0.75rem;
  color: #64748b;
`;

export const CardAttachments = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  &.overdue {
    color: #dc2626;
    font-weight: 500;
  }
`;

export const CardStatusIndicator = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  border-radius: 8px 0 0 8px;
  background-color: ${props => props.color || '#94a3b8'};
`;

export const TaskDetailsOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const TaskDetailsModal = styled.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;

  h2 {
    margin: 0;
    color: #1e293b;
    font-size: 1.25rem;
  }
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background: #f1f5f9;
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
  max-height: calc(90vh - 80px);
  overflow-y: auto;
`;

export const TaskInfo = styled.div`
  margin-bottom: 24px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;

  label {
    font-weight: 600;
    color: #374151;
    min-width: 120px;
    font-size: 0.875rem;
  }

  span {
    color: #1e293b;
    font-size: 0.875rem;

    &.overdue {
      color: #dc2626;
      font-weight: 500;
    }
  }

  p {
    margin: 0;
    color: #1e293b;
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => props.color || '#94a3b8'};
`;
