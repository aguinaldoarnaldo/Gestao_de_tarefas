import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import apiService from '../../services/api';
import TaskModal from '../../components/TaskModal/TaskModal';
import {
  CalendarWrapper,
  CalendarContainer,
  CalendarMain,
  CalendarHeader,
  CalendarTitle,
  MonthSelector,
  DropdownButton,
  NavigationButton,
  WeekDaysHeader,
  DayHeader,
  CalendarGrid,
  DayCell,
  DayNumber,
  TaskBadges,
  TaskBadge,
  StatusDot,
  SidePanel,
  SidePanelTitle,
  TasksList,
  TaskCard,
  TaskTitle,
  TaskStatus,
  TaskMeta,
  EmptyMessage
} from './Calendar.styles';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDay = (day) => {
    if (!day) return [];
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      .toISOString()
      .split('T')[0];
    
    return tasks.filter(task => {
      if (task.data_vencimento) {
        return task.data_vencimento.split('T')[0] === dateStr;
      }
      return false;
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCreateTaskForDay = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
    setSelectedTask(null);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluída':
        return '#10b981';
      case 'Em Andamento':
        return '#0061ff';
      case 'Pendente':
        return '#f59e0b';
      default:
        return '#94a3b8';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'Concluída':
        return 'Concluída';
      case 'Em Andamento':
        return 'Em Andamento';
      case 'Pendente':
        return 'Pendente';
      default:
        return status;
    }
  };

  const monthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Preencher dias vazios do mês anterior
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Adicionar dias do mês atual
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const weekDayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <CalendarWrapper>
      <CalendarMain>
        <CalendarHeader>
          <CalendarTitle>Calendar</CalendarTitle>
          <MonthSelector>
            <DropdownButton>Monthly ▼</DropdownButton>
            <NavigationButton onClick={handlePrevMonth}>
              <ChevronLeft size={18} />
            </NavigationButton>
            <NavigationButton onClick={handleNextMonth}>
              <ChevronRight size={18} />
            </NavigationButton>
          </MonthSelector>
        </CalendarHeader>

        <CalendarContainer>
          <WeekDaysHeader>
            {weekDayLabels.map((day) => (
              <DayHeader key={day}>{day}</DayHeader>
            ))}
          </WeekDaysHeader>

          <CalendarGrid>
            {days.map((day, index) => {
              const dayTasks = day ? getTasksForDay(day) : [];
              const isToday =
                day &&
                new Date().getDate() === day &&
                new Date().getMonth() === currentDate.getMonth() &&
                new Date().getFullYear() === currentDate.getFullYear();

              return (
                <DayCell
                  key={index}
                  isEmpty={!day}
                  isToday={isToday}
                  onClick={() => day && handleCreateTaskForDay(day)}
                >
                  {day && (
                    <>
                      <DayNumber isToday={isToday}>{day}</DayNumber>
                      <TaskBadges>
                        {dayTasks.slice(0, 3).map((task, idx) => (
                          <TaskBadge
                            key={task.id}
                            color={getStatusColor(task.status)}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTaskClick(task);
                            }}
                            title={task.titulo}
                          >
                            <StatusDot color={getStatusColor(task.status)} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
                              {task.titulo}
                            </span>
                          </TaskBadge>
                        ))}
                        {dayTasks.length > 3 && (
                          <div style={{ fontSize: '0.55rem', color: '#94a3b8', paddingLeft: '0.2rem' }}>
                            +{dayTasks.length - 3}
                          </div>
                        )}
                      </TaskBadges>
                    </>
                  )}
                </DayCell>
              );
            })}
          </CalendarGrid>
        </CalendarContainer>
      </CalendarMain>

      <SidePanel>
        <SidePanelTitle>Tasks</SidePanelTitle>
        <TasksList>
          {loading ? (
            <EmptyMessage>Carregando...</EmptyMessage>
          ) : tasks.length === 0 ? (
            <EmptyMessage>Nenhuma tarefa</EmptyMessage>
          ) : (
            tasks.slice(0, 5).map((task) => (
              <TaskCard
                key={task.id}
                onClick={() => handleTaskClick(task)}
              >
                <TaskTitle>{task.titulo}</TaskTitle>
                <TaskStatus color={getStatusColor(task.status)}>
                  {getStatusLabel(task.status)}
                </TaskStatus>
                <TaskMeta>
                  📎 <span>13</span>
                  💬 <span>8</span>
                </TaskMeta>
              </TaskCard>
            ))
          )}
        </TasksList>
      </SidePanel>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDate(null);
        }}
        task={selectedTask}
        onSave={handleSaveTask}
        onDelete={selectedTask ? () => handleDeleteTask(selectedTask.id) : undefined}
        initialDate={selectedDate}
      />
    </CalendarWrapper>
  );
};

export default Calendar;
