import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Plus, 
  Calendar as CalendarIcon,
  RotateCcw,
  CheckCheck,
  Circle,
  Filter
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import TaskCard from '../../components/TaskCard/TaskCard';
import TaskModal from '../../components/TaskModal/TaskModal';
import TaskDetails from '../../components/TaskDetails/TaskDetails';
import apiService from '../../services/api';
import {
  KanbanBoard,
  KanbanColumn,
  ColumnContent,
  ColumnHeader,
  ColumnTitle,
  TaskCount,
  TaskListContainer,
  AddTaskButton,
  ActionButton,
  LoadingTasks,
  FilterBar,
  FilterGroup,
  FilterSelect
} from './Dashboard.styles';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [activeMenuTaskId, setActiveMenuTaskId] = useState(null);
  
  // Filters
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get boardId from URL
  const query = new URLSearchParams(location.search);
  const boardId = query.get('boardId');

  const isMounted = React.useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    if (!boardId) {
      navigate('/boards');
      return;
    }

    const loadInitialData = async () => {
      if (isMounted.current) setLoading(true);
      try {
        const [board, tasksData] = await Promise.all([
          apiService.getBoardById(boardId),
          apiService.getTasksByBoard(boardId)
        ]);
        
        if (isMounted.current) {
          setCurrentBoard(board);
          setTasks(Array.isArray(tasksData) ? tasksData : []);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    };

    loadInitialData();
  }, [boardId, navigate]);

  const fetchTasks = async () => {
    try {
      const data = await apiService.getTasksByBoard(boardId);
      if (isMounted.current) {
        setTasks(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error refreshing tasks:', error);
    }
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  };

  const [feedback, setFeedback] = useState({ show: false, message: '', type: '' });

  const showFeedback = (message, type = 'success') => {
    setFeedback({ show: true, message, type });
    setTimeout(() => setFeedback({ show: false, message: '', type: '' }), 4000);
  };

  const handleSaveTask = async (taskData) => {
    try {
      const payload = { 
        ...taskData, 
        quadro_id: boardId 
      };

      if (selectedTask) {
        await apiService.updateTask(selectedTask.id, payload);
        showFeedback('Tarefa atualizada com sucesso!');
      } else {
        await apiService.createTask(payload);
        showFeedback('Tarefa criada com sucesso!');
      }
      await fetchTasks();
      setIsModalOpen(false);
    } catch (error) {
      showFeedback(error.message || 'Erro ao processar tarefa', 'error');
      throw error;
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    try {
      await apiService.deleteTask(taskId);
      showFeedback('Tarefa excluída com sucesso!');
      await fetchTasks();
    } catch (error) {
      showFeedback(error.message || 'Erro ao excluir tarefa', 'error');
    }
  };

  const columns = [
    { id: 'Pendente', title: 'Pendente', icon: <Circle size={14} color="#b0c0d8" /> },
    { id: 'Em Andamento', title: 'Em Andamento', icon: <RotateCcw size={14} color="#2a7de1" /> },
    { id: 'Concluída', title: 'Concluída', icon: <CheckCheck size={14} color="#10b981" /> },
  ];

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await apiService.updateTask(taskId, { status: newStatus });
      showFeedback(`Status alterado para "${newStatus}"!`);
      await fetchTasks();
    } catch (error) {
      showFeedback(error.message || 'Erro ao atualizar status', 'error');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesPriority = filterPriority === 'all' || task.prioridade === filterPriority;
    const matchesSearch = (task.titulo || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (task.descricao || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (filterDate === 'today') {
      const now = new Date();
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      matchesDate = task.data_vencimento && task.data_vencimento.slice(0, 10) === today;
    } else if (filterDate === 'overdue') {
      matchesDate = new Date(task.data_vencimento) < new Date() && task.status !== 'Concluída';
    }

    return matchesPriority && matchesSearch && matchesDate;
  });

  return (
    <>
      {feedback.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 3000,
          background: feedback.type === 'error' ? '#fee2e2' : '#dcfce7',
          color: feedback.type === 'error' ? '#ef4444' : '#16a34a',
          padding: '12px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: `1px solid ${feedback.type === 'error' ? '#fecaca' : '#bbf7d0'}`,
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'slideInRight 0.3s ease-out'
        }}>
          {feedback.message}
        </div>
      )}
      <FilterBar>
        <FilterGroup>
            <Filter size={16} color="#b0c0d8" />
            <label>Prioridade:</label>
            <FilterSelect value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
                <option value="all">Todas</option>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
            </FilterSelect>
        </FilterGroup>

        <FilterGroup>
            <CalendarIcon size={18} color="white" />
            <label>Vencimento:</label>
            <FilterSelect value={filterDate} onChange={e => setFilterDate(e.target.value)}>
                <option value="all">Qualquer data</option>
                <option value="today">Hoje</option>
                <option value="overdue">Atrasadas</option>
            </FilterSelect>
        </FilterGroup>
        
        {currentBoard && (
            <div style={{ 
                fontWeight: 700, 
                color: '#2a7de1', 
                background: '#e8f0fe', 
                padding: '0.35rem 0.9rem', 
                borderRadius: '8px', 
                fontSize: '0.8rem',
                border: '1px solid #b8d4f8',
                marginLeft: 'auto'
            }}>
                📄 {currentBoard.nome}
            </div>
        )}
      </FilterBar>

      <KanbanBoard $hasBg={!!currentBoard?.foto_fundo} $bg={currentBoard?.foto_fundo ? `http://localhost:5000/${currentBoard.foto_fundo}` : null}>
        {columns.map((col, idx) => (
          <KanbanColumn key={idx} $hasBg={!!currentBoard?.foto_fundo}>
            <ColumnContent $hasBg={!!currentBoard?.foto_fundo}>
              <ColumnHeader>
                <ColumnTitle>
                  {col.icon}
                  <h2>{col.title}</h2>
                  <TaskCount>
                    {filteredTasks.filter(t => t.status === col.id).length}
                  </TaskCount>
                </ColumnTitle>
              </ColumnHeader>

              <TaskListContainer>
                {loading ? (
                  <LoadingTasks>Carregando tarefas...</LoadingTasks>
                ) : (
                  filteredTasks
                    .filter(task => task.status === col.id)
                    .map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        onViewDetails={handleViewDetails}
                        onStatusChange={handleStatusChange}
                        canEdit={true}
                        hasBoardBg={!!currentBoard?.foto_fundo}
                        isMenuOpen={activeMenuTaskId === task.id}
                        onMenuToggle={(isOpen) => setActiveMenuTaskId(isOpen ? task.id : null)}
                      />
                    ))
                )}
                
                <AddTaskButton $hasBg={!!currentBoard?.foto_fundo} onClick={handleCreateTask}>
                  <Plus size={18} />
                  Nova Tarefa
                </AddTaskButton>
              </TaskListContainer>
            </ColumnContent>
          </KanbanColumn>
        ))}
      </KanbanBoard>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onSave={handleSaveTask}
        defaultBoardId={boardId}
      />

      <TaskDetails 
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        task={selectedTask}
        onEdit={handleEditTask}
      />
    </>
  );
};

export default Dashboard;
