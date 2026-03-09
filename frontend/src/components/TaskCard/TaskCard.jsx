import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Clock,
  Paperclip,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Circle,
  RotateCcw,
  CheckCheck,
  ChevronLeft,
  Layout,
  ArrowLeft
} from 'lucide-react';
import {
  TaskCardContainer,
  CardHeader,
  CardTitle,
  CardMenu,
  MenuButton,
  DropdownMenu,
  MenuItem,
  MenuHeader,
  CardDesc,
  CardFooter,
  CardDate
} from './TaskCard.styles';

const TaskCard = ({ task, onEdit, onDelete, onViewDetails, onStatusChange, canEdit = true, hasBoardBg, isMenuOpen, onMenuToggle }) => {
  const [menuView, setMenuView] = useState('main'); // 'main' or 'status'
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  // Close menu on scroll, resize or click anywhere else
  useEffect(() => {
    if (isMenuOpen) {
      const handleClose = (e) => {
        // If clicking inside the portal menu, don't close
        if (e.target.closest('.bp-dropdown-portal')) return;
        onMenuToggle(false);
      };
      
      // Use capture for scroll to catch it from children
      window.addEventListener('scroll', handleClose, true);
      window.addEventListener('resize', handleClose);
      
      // Delay click listener to avoid catching the click that opens it
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClose);
      }, 0);

      return () => {
        window.removeEventListener('scroll', handleClose, true);
        window.removeEventListener('resize', handleClose);
        document.removeEventListener('mousedown', handleClose);
        clearTimeout(timer);
      };
    }
  }, [isMenuOpen, onMenuToggle]);

  const handleToggleMenu = (e) => {
    e.stopPropagation();
    if (!isMenuOpen) {
      const rect = e.currentTarget.getBoundingClientRect();
      // Calculate best position
      let top = rect.bottom + 8;
      // If menu (approx 220px) would go off bottom, show it above the button
      if (top + 220 > window.innerHeight) {
        top = rect.top - 225;
      }
      setMenuPos({ top, left: Math.max(10, rect.right - 180) });
    }
    onMenuToggle(!isMenuOpen);
    setMenuView('main');
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

  const handleStatusUpdate = (newStatus) => {
    if (onStatusChange && newStatus !== task.status) {
      onStatusChange(task.id, newStatus);
    }
    onMenuToggle(false);
    setMenuView('main');
  };

  return (
    <TaskCardContainer
      onClick={() => onViewDetails && onViewDetails(task)}
      $hasBoardBg={hasBoardBg}
      $isMenuOpen={isMenuOpen}
    >
      <CardHeader>
        <CardTitle>{task.titulo}</CardTitle>
        <CardMenu onClick={(e) => e.stopPropagation()}>
          <MenuButton onClick={handleToggleMenu}>
            <MoreHorizontal size={16} />
          </MenuButton>

          {isMenuOpen && createPortal(
            <DropdownMenu
              $top={menuPos.top}
              $left={menuPos.left}
              className="bp-dropdown-portal"
              onClick={(e) => e.stopPropagation()}
            >
              {menuView === 'main' ? (
                <>
                  <MenuItem onClick={() => {
                    onViewDetails && onViewDetails(task);
                    onMenuToggle(false);
                  }}>
                    <Eye size={14} />
                    Ver detalhes
                  </MenuItem>
                  {canEdit && (
                    <>
                      <MenuItem onClick={() => {
                        onEdit(task);
                        onMenuToggle(false);
                      }}>
                        <Edit size={14} />
                        Editar
                      </MenuItem>

                      <MenuItem
                        onClick={() => setMenuView('status')}
                        style={{ color: '#2a7de1', fontWeight: 'bold' }}
                      >
                        <Layout size={14} />
                        Alterar Status
                        <ChevronLeft size={14} style={{ marginLeft: 'auto', transform: 'rotate(180deg)' }} />
                      </MenuItem>

                      <MenuItem
                        className="delete"
                        onClick={() => {
                          onDelete(task.id);
                          onMenuToggle(false);
                        }}
                      >
                        <Trash2 size={14} />
                        Excluir
                      </MenuItem>
                    </>
                  )}
                </>
              ) : (
                <>
                  <MenuHeader>
                    <button onClick={() => setMenuView('main')}>
                      <ArrowLeft size={14} />
                    </button>
                    Status
                  </MenuHeader>
                  <MenuItem
                    disabled={task.status === 'Pendente'}
                    style={{ opacity: task.status === 'Pendente' ? 0.5 : 1 }}
                    onClick={() => handleStatusUpdate('Pendente')}
                  >
                    <Circle size={14} color="#64748b" />
                    Pendente
                  </MenuItem>
                  <MenuItem
                    disabled={task.status === 'Em Andamento'}
                    style={{ opacity: task.status === 'Em Andamento' ? 0.5 : 1 }}
                    onClick={() => handleStatusUpdate('Em Andamento')}
                  >
                    <RotateCcw size={14} color="#2a7de1" />
                    Em Andamento
                  </MenuItem>
                  <MenuItem
                    disabled={task.status === 'Concluída'}
                    style={{ opacity: task.status === 'Concluída' ? 0.5 : 1 }}
                    onClick={() => handleStatusUpdate('Concluída')}
                  >
                    <CheckCheck size={14} color="#10b981" />
                    Concluído
                  </MenuItem>
                </>
              )}
            </DropdownMenu>,
            document.body
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
            fontWeight: 700, 
            padding: '2px 8px', 
            borderRadius: '6px',
            background: task.prioridade === 'Alta' ? '#fef2f2' : task.prioridade === 'Média' ? '#fff7ed' : '#f0fdf4',
            color: task.prioridade === 'Alta' ? '#ef4444' : task.prioridade === 'Média' ? '#f97316' : '#22c55e'
          }}>
            {task.prioridade}
          </div>
          {task.total_anexos > 0 && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              fontSize: '0.7rem', 
              fontWeight: 700, 
              color: '#64748b',
              background: '#f1f5f9',
              padding: '2px 8px',
              borderRadius: '6px'
            }}>
              <Paperclip size={12} />
              {task.total_anexos}
            </div>
          )}
        </div>
        
      </CardFooter>
    </TaskCardContainer>
  );
};

export default TaskCard;
