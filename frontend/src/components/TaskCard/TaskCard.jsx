import React, { useState } from 'react';
import { 
  Clock, 
  Paperclip, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Users as UsersIcon 
} from 'lucide-react';
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
  CardDate
} from './TaskCard.styles';

const TaskCard = ({ task, onEdit, onDelete, onViewDetails, canEdit = true }) => {
  const [showMenu, setShowMenu] = useState(false);

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
    <TaskCardContainer onClick={() => onViewDetails && onViewDetails(task)}>
      <CardHeader>
        <CardTitle>{task.titulo}</CardTitle>
        <CardMenu onClick={(e) => e.stopPropagation()}>
          <MenuButton onClick={() => setShowMenu(!showMenu)}>
            <MoreHorizontal size={16} />
          </MenuButton>
          
          {showMenu && (
            <DropdownMenu>
              <MenuItem onClick={() => {
                onViewDetails && onViewDetails(task);
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
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <CardDate className={isOverdue(task.data_vencimento) ? 'overdue' : ''}>
            <Clock size={14} />
            <span>{formatDate(task.data_vencimento)}</span>
          </CardDate>
          <div style={{ 
            fontSize: '0.7rem', 
            fontWeight: 800, 
            padding: '2px 8px', 
            borderRadius: '6px',
            background: task.prioridade === 'Alta' ? '#fee2e2' : task.prioridade === 'Média' ? '#fef3c7' : '#dcfce7',
            color: task.prioridade === 'Alta' ? '#ef4444' : task.prioridade === 'Média' ? '#d97706' : '#16a34a'
          }}>
            {task.prioridade}
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          {task.membros && task.membros.length > 0 && (
            <div style={{ display: 'flex', position: 'relative', height: '24px' }}>
              {task.membros.slice(0, 3).map((m, i) => (
                <div key={m.id} title={m.nome} style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: `hsl(${m.id * 137.5 % 360}, 60%, 60%)`,
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6rem',
                  color: 'white',
                  fontWeight: 'bold',
                  marginLeft: i === 0 ? '0' : '-8px',
                  zIndex: 3 - i
                }}>
                  {m.nome.substring(0, 1).toUpperCase()}
                </div>
              ))}
              {task.membros.length > 3 && (
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#e2e8f0',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6rem',
                  color: '#64748b',
                  fontWeight: 'bold',
                  marginLeft: '-8px',
                  zIndex: 0
                }}>
                  +{task.membros.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </CardFooter>
    </TaskCardContainer>
  );
};

export default TaskCard;
