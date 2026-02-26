import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Plus, 
  Calendar as CalendarIcon,
  MoreHorizontal,
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
  const { user, isAdmin } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);
  
  // Filters
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get boardId from URL
  const query = new URLSearchParams(location.search);
  const boardId = query.get('boardId');

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    if (!boardId) {
      navigate('/boards');
    }
  }, [boardId, navigate]);

  useEffect(() => {
    if (boardId) {
      fetchTasks();
    }
  }, [boardId]);

  const fetchBoards = async () => {
    try {
      const data = await apiService.getBoards();
      setBoards(data);
      if (boardId) {
        const board = data.find(b => b.id === parseInt(boardId));
        setCurrentBoard(board);
      }
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      let data;
      if (boardId) {
        data = await apiService.getTasksByBoard(boardId);
      } else {
        data = await apiService.getTasks();
      }
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
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
      // Use boardId from URL if present (creating in a board), 
      // otherwise use the one from taskData (keeping existing board or choosing in modal)
      const payload = { 
        ...taskData, 
        quadro_id: boardId || taskData.quadro_id || null 
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
    { id: 'Pendente', title: 'Pendente', icon: <Circle size={18} color="rgba(255,255,255,0.7)" /> },
    { id: 'Em Andamento', title: 'Em Andamento', icon: <RotateCcw size={18} color="rgba(255,255,255,0.7)" /> },
    { id: 'Concluída', title: 'Concluída', icon: <CheckCheck size={18} color="rgba(255,255,255,0.7)" /> },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesPriority = filterPriority === 'all' || task.prioridade === filterPriority;
    const titulo = task.titulo || '';
    const descricao = task.descricao || '';
    const matchesSearch = titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         descricao.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (filterDate === 'today') {
      const today = new Date().toISOString().slice(0, 10);
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
            <Filter size={18} color="white" />
            <label>Priority:</label>
            <FilterSelect value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
                <option value="all">All</option>
                <option value="Alta">High</option>
                <option value="Média">Medium</option>
                <option value="Baixa">Low</option>
            </FilterSelect>
        </FilterGroup>

        <FilterGroup>
            <CalendarIcon size={18} color="white" />
            <label>Due Date:</label>
            <FilterSelect value={filterDate} onChange={e => setFilterDate(e.target.value)}>
                <option value="all">Anytime</option>
                <option value="today">Today</option>
                <option value="overdue">Overdue</option>
            </FilterSelect>
        </FilterGroup>
        
        {currentBoard && (
            <div style={{ 
                fontWeight: 800, 
                color: 'white', 
                background: 'rgba(255,255,255,0.2)', 
                padding: '0.6rem 1.25rem', 
                borderRadius: '12px', 
                fontSize: '0.85rem',
                backdropFilter: 'blur(10px)',
                marginLeft: 'auto'
            }}>
                Project: {currentBoard.nome}
            </div>
        )}
      </FilterBar>

      <KanbanBoard>
        {columns.map((col, idx) => (
          <KanbanColumn key={idx}>
            <ColumnContent>
              <ColumnHeader>
                <ColumnTitle>
                  {col.icon}
                  <h2>{col.title}</h2>
                  <TaskCount>
                    {filteredTasks.filter(t => t.status === col.id).length}
                  </TaskCount>
                </ColumnTitle>
                <ActionButton style={{ border: 'none', background: 'transparent' }}>
                  <MoreHorizontal size={18} />
                </ActionButton>
              </ColumnHeader>

              <TaskListContainer>
                {loading ? (
                  <LoadingTasks>Loading tasks...</LoadingTasks>
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
                        canEdit={true}
                      />
                    ))
                )}
                
                <AddTaskButton onClick={handleCreateTask}>
                  <Plus size={18} />
                  Add task
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
