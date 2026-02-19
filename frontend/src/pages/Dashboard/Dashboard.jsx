import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckCircle, 
  Users as UsersIcon, 
  LogOut, 
  Settings, 
  Plus, 
  Search, 
  Bell,
  Calendar,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  CheckCheck,
  Circle,
  UserCircle2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import TaskCard from '../../components/TaskCard/TaskCard';
import TaskModal from '../../components/TaskModal/TaskModal';
import apiService from '../../services/api';
import {
  KanbanBoard,
  KanbanColumn,
  ColumnHeader,
  ColumnTitle,
  TaskCount,
  TaskListContainer,
  AddTaskButton,
  ActionButton,
  LoadingTasks
} from './Dashboard.styles';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await apiService.getTasks();
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

  const handleSaveTask = async (taskData) => {
    try {
      if (selectedTask) {
        await apiService.updateTask(selectedTask.id, taskData);
      } else {
        await apiService.createTask(taskData);
      }
      await fetchTasks();
      setIsModalOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    
    try {
      await apiService.deleteTask(taskId);
      await fetchTasks();
    } catch (error) {
      alert(error.message || 'Erro ao excluir tarefa');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const columns = [
    { title: 'Pendente', icon: <Circle size={18} color="#94a3b8" /> },
    { title: 'Em Andamento', icon: <RotateCcw size={18} color="#0061ff" /> },
    { title: 'Concluída', icon: <CheckCheck size={18} color="#10b981" /> },
  ];

  return (
    <>
      <KanbanBoard>
        {columns.map((col, idx) => (
          <KanbanColumn key={idx}>
            <ColumnHeader>
              <ColumnTitle>
                {col.icon}
                <h2>{col.title}</h2>
                <TaskCount>
                  {tasks.filter(t => t.status === col.title).length}
                </TaskCount>
              </ColumnTitle>
              <ActionButton style={{ border: 'none', background: 'transparent', width: '30px' }}>
                <MoreHorizontal size={18} />
              </ActionButton>
            </ColumnHeader>

            <TaskListContainer>
              {loading ? (
                <LoadingTasks>Carregando tarefas...</LoadingTasks>
              ) : (
                tasks
                  .filter(task => task.status === col.title)
                  .map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      canEdit={true}
                    />
                  ))
              )}
              
              <AddTaskButton onClick={handleCreateTask}>
                <Plus size={18} />
                Adicionar cartão
              </AddTaskButton>
            </TaskListContainer>
          </KanbanColumn>
        ))}
      </KanbanBoard>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onSave={handleSaveTask}
      />
    </>
  );
};

export default Dashboard;
