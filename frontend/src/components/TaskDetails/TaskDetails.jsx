import React from 'react';
import { 
  Paperclip, 
  Edit, 
  AlignLeft,
  Calendar,
  Flag,
  CheckCircle2,
  User as UserIcon
} from 'lucide-react';
import AttachmentManager from '../AttachmentManager/AttachmentManager';
import {
  TaskDetailsOverlay,
  TaskDetailsModal,
  DetailsHeader,
  ModalCloseButton,
  ModalBody,
  MainContentArea,
  SideContentArea,
  TaskInfo,
  InfoItem,
  StatusBadge
} from '../TaskCard/TaskCard.styles';

const TaskDetails = ({ task, isOpen, onClose, onEdit }) => {
  if (!isOpen || !task) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendente': return '#eab308';
      case 'Em Andamento': return '#3b82f6';
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
    <TaskDetailsOverlay onClick={onClose}>
      <TaskDetailsModal onClick={(e) => e.stopPropagation()}>
        <DetailsHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle2 color={getStatusColor(task.status)} size={28} />
            <h2>{task.titulo}</h2>
          </div>
          <ModalCloseButton onClick={onClose}>
            ×
          </ModalCloseButton>
        </DetailsHeader>
        
        <ModalBody>
          <MainContentArea>
            <TaskInfo>
              <InfoItem>
                <label><AlignLeft size={16} /> Descrição</label>
                <p>{task.descricao || 'Nenhuma descrição fornecida.'}</p>
              </InfoItem>

              <InfoItem>
                <label><Paperclip size={16} /> Anexos</label>
                <AttachmentManager taskId={task.id} />
              </InfoItem>
            </TaskInfo>
          </MainContentArea>

          <SideContentArea>
            <InfoItem>
              <label><CheckCircle2 size={14} /> Status</label>
              <StatusBadge color={getStatusColor(task.status)}>
                {task.status}
              </StatusBadge>
            </InfoItem>

            <InfoItem>
              <label><Calendar size={14} /> Vencimento</label>
              <span className={isOverdue(task.data_vencimento) ? 'overdue' : ''} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                 {formatDate(task.data_vencimento)}
                 {isOverdue(task.data_vencimento) && <small style={{ background: '#ef4444', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>ATRASADA</small>}
              </span>
            </InfoItem>

            <InfoItem>
              <label><Flag size={14} /> Prioridade</label>
              <div style={{ 
                fontWeight: 700, 
                color: task.prioridade === 'Alta' ? '#ef4444' : task.prioridade === 'Média' ? '#d97706' : '#16a34a',
                fontSize: '0.9rem'
              }}>
                {task.prioridade}
              </div>
            </InfoItem>

            {task.membros && task.membros.length > 0 && (
              <InfoItem>
                <label><UserIcon size={14} /> Membros</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                  {task.membros.map(m => (
                    <div key={m.id} style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px', 
                      background: 'white', 
                      borderRadius: '12px', 
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      border: '1px solid #f1f5f9'
                    }}>
                      <div style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        background: `hsl(${m.id * 137.5 % 360}, 60%, 65%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.7rem'
                      }}>
                        {m.nome.substring(0, 1).toUpperCase()}
                      </div>
                      {m.nome}
                    </div>
                  ))}
                </div>
              </InfoItem>
            )}

            <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
               <button onClick={() => { onEdit(task); onClose(); }} style={{ 
                 flex: 1, 
                 padding: '12px', 
                 borderRadius: '16px', 
                 border: '1px solid #e2e8f0', 
                 background: 'white',
                 fontWeight: '700',
                 cursor: 'pointer',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 gap: '8px',
                 boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
               }}>
                 <Edit size={16} /> Editar Tarefa
               </button>
            </div>
          </SideContentArea>
        </ModalBody>
      </TaskDetailsModal>
    </TaskDetailsOverlay>
  );
};

export default TaskDetails;
