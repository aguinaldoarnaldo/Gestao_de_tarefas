import React from 'react';
import { 
  Paperclip, 
  Edit, 
  AlignLeft,
  Calendar,
  Flag,
  CheckCircle2,
  X,
  Clock,
  Layout,
  ChevronRight
} from 'lucide-react';
import AttachmentManager from '../AttachmentManager/AttachmentManager';
import {
  Overlay,
  Modal,
  Header,
  TitleWrapper,
  CloseButton,
  Body,
  MainContent,
  Sidebar,
  Section,
  Description,
  Badge,
  SidebarActions,
  ActionButton
} from './TaskDetails.styles';

const TaskDetails = ({ task, isOpen, onClose, onEdit }) => {
  if (!isOpen || !task) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendente': return '#94a3b8';
      case 'Em Andamento': return '#2a7de1';
      case 'Concluída': return '#10b981';
      default: return '#94a3b8';
    }
  };

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'Alta': return { color: '#ef4444', label: 'Alta Prioridade' };
      case 'Média': return { color: '#f59e0b', label: 'Média Prioridade' };
      default: return { color: '#10b981', label: 'Baixa Prioridade' };
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && task.status !== 'Concluída';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const priority = getPriorityInfo(task.prioridade);

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '12px', 
            background: `${getStatusColor(task.status)}15`, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <CheckCircle2 color={getStatusColor(task.status)} size={24} />
          </div>
          <TitleWrapper>
            <h2>{task.titulo}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Em</span>
              <span style={{ 
                fontSize: '0.75rem', 
                color: '#2a7de1', 
                fontWeight: 700, 
                background: '#e8f0fe', 
                padding: '2px 8px', 
                borderRadius: '6px' 
              }}>
                Painel Principal
              </span>
            </div>
          </TitleWrapper>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>
        
        <Body>
          <MainContent>
            <Section>
              <h3><AlignLeft size={16} /> Descrição</h3>
              <Description>
                {task.descricao || 'Adicione uma descrição detalhada para esta tarefa...'}
              </Description>
            </Section>

            <Section>
              <h3><Paperclip size={16} /> Anexos e Arquivos</h3>
              <AttachmentManager taskId={task.id} />
            </Section>
          </MainContent>

          <Sidebar>
            <Section>
              <h3><Layout size={14} /> Status Atual</h3>
              <Badge>
                <div className="dot" style={{ background: getStatusColor(task.status) }} />
                <span>{task.status}</span>
                <ChevronRight size={14} style={{ marginLeft: 'auto', color: '#cbd5e1' }} />
              </Badge>
            </Section>

            <Section>
              <h3><Clock size={14} /> Prazo Final</h3>
              <Badge style={{ borderColor: isOverdue(task.data_vencimento) ? '#fee2e2' : '#e2e8f0' }}>
                <Calendar size={16} color={isOverdue(task.data_vencimento) ? '#ef4444' : '#64748b'} />
                <span style={{ color: isOverdue(task.data_vencimento) ? '#ef4444' : '#1e293b' }}>
                  {formatDate(task.data_vencimento)}
                </span>
              </Badge>
              {isOverdue(task.data_vencimento) && (
                <small style={{ 
                  color: '#ef4444', 
                  fontWeight: 800, 
                  fontSize: '0.65rem', 
                  marginTop: '8px', 
                  display: 'block',
                  textAlign: 'right'
                }}>
                  ⚠️ ATENÇÃO: TAREFA ATRASADA
                </small>
              )}
            </Section>

            <Section>
              <h3><Flag size={14} /> Prioridade</h3>
              <Badge>
                <div className="dot" style={{ background: priority.color }} />
                <span>{priority.label}</span>
              </Badge>
            </Section>

            <SidebarActions>
              <ActionButton className="edit" onClick={() => { onEdit(task); onClose(); }}>
                <Edit size={18} /> Editar Detalhes
              </ActionButton>
              <ActionButton className="ghost" onClick={onClose}>
                Fechar Janela
              </ActionButton>
            </SidebarActions>
          </Sidebar>
        </Body>
      </Modal>
    </Overlay>
  );
};

export default TaskDetails;
