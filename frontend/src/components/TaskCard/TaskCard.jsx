import React, { useState } from 'react';
import { Clock, Paperclip, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import AttachmentManager from '../AttachmentManager/AttachmentManager';
import {
  TaskCardContainer,
  CardHeader,
  CardTitle,
  CardMenu,
  MenuButton,
  DropdownMenu,
  MenuItem,
  CardDesc,
  CardFooter,
  CardAttachments,
  CardDate,
  CardStatusIndicator,
  TaskDetailsOverlay,
  TaskDetailsModal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  TaskInfo,
  InfoItem,
  StatusBadge
} from './TaskCard.styles';

const TaskCard = ({ task, onEdit, onDelete, canEdit = true }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendente': return '#94a3b8';
      case 'Em Andamento': return '#0061ff';
      case 'Concluída': return '#10b981';
      default: return '#94a3b8';
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && task.status !== 'Concluída';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <>
      <TaskCardContainer>
        <CardHeader>
          <CardTitle>{task.titulo}</CardTitle>
          <CardMenu>
            <MenuButton onClick={() => setShowMenu(!showMenu)}>
              <MoreHorizontal size={16} />
            </MenuButton>
            
            {showMenu && (
              <DropdownMenu>
                <MenuItem onClick={() => {
                  setShowDetails(!showDetails);
                  setShowMenu(false);
                }}>
                  <Eye size={14} />
                  Ver detalhes
                </MenuItem>
                {canEdit && (
                  <>
                    <MenuItem onClick={() => {
                      onEdit(task);
                      setShowMenu(false);
                    }}>
                      <Edit size={14} />
                      Editar
                    </MenuItem>
                    <MenuItem 
                      className="delete"
                      onClick={() => {
                        onDelete(task.id);
                        setShowMenu(false);
                      }}
                    >
                      <Trash2 size={14} />
                      Excluir
                    </MenuItem>
                  </>
                )}
              </DropdownMenu>
            )}
          </CardMenu>
        </CardHeader>
        
        <CardDesc>{task.descricao}</CardDesc>
        
        <CardFooter>
          <CardAttachments>
            <Paperclip size={14} />
            <span>{task.attachments || 0}</span>
          </CardAttachments>
          <CardDate className={isOverdue(task.data_vencimento) ? 'overdue' : ''}>
            <Clock size={14} />
            <span>{formatDate(task.data_vencimento)}</span>
          </CardDate>
        </CardFooter>
        
        <CardStatusIndicator color={getStatusColor(task.status)} />
      </TaskCardContainer>

      {/* Task Details Modal */}
      {showDetails && (
        <TaskDetailsOverlay>
          <TaskDetailsModal>
            <ModalHeader>
              <h2>{task.titulo}</h2>
              <ModalCloseButton onClick={() => setShowDetails(false)}>
                ×
              </ModalCloseButton>
            </ModalHeader>
            
            <ModalBody>
              <TaskInfo>
                <InfoItem>
                  <label>Status:</label>
                  <StatusBadge color={getStatusColor(task.status)}>
                    {task.status}
                  </StatusBadge>
                </InfoItem>
                
                <InfoItem>
                  <label>Data de Vencimento:</label>
                  <span className={isOverdue(task.data_vencimento) ? 'overdue' : ''}>
                    {formatDate(task.data_vencimento)}
                  </span>
                </InfoItem>
                
                <InfoItem>
                  <label>Descrição:</label>
                  <p>{task.descricao}</p>
                </InfoItem>
              </TaskInfo>
              
              {/* Attachments Section */}
              <AttachmentManager 
                taskId={task.id}
                userId={task.utilizador_id}
                canEdit={canEdit}
              />
            </ModalBody>
          </TaskDetailsModal>
        </TaskDetailsOverlay>
      )}
    </>
  );
};

export default TaskCard;
