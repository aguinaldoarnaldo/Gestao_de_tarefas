import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const ManagerContainer = styled.div`
  width: 100%;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 1rem;
  color: #64748b;
  font-size: 0.875rem;
`;

export const UploadArea = styled.div`
  border: 2px dashed ${props => props.dragActive ? '#0061ff' : '#cbd5e1'};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s;
  background: ${props => props.dragActive ? 'rgba(0, 97, 255, 0.05)' : '#f8fafc'};
`;

export const UploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #64748b;

  &:hover {
    color: #0061ff;
  }

  svg {
    color: #94a3b8;
  }

  span {
    font-size: 0.875rem;
    font-weight: 500;
  }

  small {
    font-size: 0.75rem;
    color: #94a3b8;
  }
`;

export const Spinner = styled.div`
  animation: ${spin} 1s linear infinite;
`;

export const AttachmentsList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AttachmentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

export const AttachmentIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border-radius: 8px;
  color: #64748b;
  flex-shrink: 0;
`;

export const AttachmentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const AttachmentName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AttachmentSize = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.125rem;
`;

export const AttachmentActions = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    color: #0061ff;
  }

  &.delete:hover {
    background: #fef2f2;
    color: #ef4444;
  }
`;
