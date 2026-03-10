import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Plus, Filter as FilterIcon } from 'lucide-react';
import TaskModal from '../../components/TaskModal/TaskModal';
import apiService from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import * as S from './Calendar.styles';

const Calendar = () => {
  const today = new Date();
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [tasks, setTasks] = useState([]);
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const data = await apiService.getBoards();
      setBoards(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Error fetching boards:', e);
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await apiService.getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Error fetching tasks:', e);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    
    // Previous month days to fill the first week
    const firstDayIndex = date.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex; i > 0; i--) {
      days.push({
        day: prevMonthLastDay - i + 1,
        month: month - 1,
        year: month === 0 ? year - 1 : year,
        isOtherMonth: true
      });
    }

    // Current month days
    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
      days.push({
        day: i,
        month: month,
        year: year,
        isOtherMonth: false
      });
    }

    // Next month days to fill the last week
    const remainingDays = 42 - days.length; // 6 weeks
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        month: month + 1,
        year: month === 11 ? year + 1 : year,
        isOtherMonth: true
      });
    }

    return days;
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const days = getDaysInMonth(currentYear, currentMonth);

  const getTasksForDay = (dayObj) => {
    const dStr = `${dayObj.year}-${String(dayObj.month + 1).padStart(2, '0')}-${String(dayObj.day).padStart(2, '0')}`;
    return tasks.filter(t => {
      const dateMatch = t.data_vencimento && t.data_vencimento.slice(0, 10) === dStr;
      const boardMatch = selectedBoardId === 'all' || String(t.quadro_id) === String(selectedBoardId);
      return dateMatch && boardMatch;
    });
  };

  const filteredTasks = tasks.filter(t => 
    selectedBoardId === 'all' || String(t.quadro_id) === String(selectedBoardId)
  );

  const isToday = (dayObj) => {
    return (
      dayObj.day === today.getDate() &&
      dayObj.month === today.getMonth() &&
      dayObj.year === today.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const openModal = (dayObj) => {
    // Manually format date to YYYY-MM-DD to avoid timezone shifts from toISOString()
    const year = dayObj.year;
    const month = String(dayObj.month + 1).padStart(2, '0');
    const day = String(dayObj.day).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    setModalDate(dateStr);
    setModalOpen(true);
  };

  const handleSaveTask = async (formData) => {
    try {
      await apiService.createTask(formData);
      await fetchTasks();
      setModalOpen(false);
    } catch (e) {
      console.error('Error saving task:', e);
    }
  };

  return (
    <S.CalendarPage>
      <S.MainContent>
        <S.Header>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <S.Title>Calendário</S.Title>
            
            <S.FilterContainer>
              <FilterIcon size={16} color="#64748b" />
              <label>Filtrar Quadro:</label>
              <S.BoardSelect 
                value={selectedBoardId} 
                onChange={(e) => setSelectedBoardId(e.target.value)}
              >
                <option value="all">Todos os Quadros</option>
                <option value="null">Sem Quadro</option>
                {boards.map(board => (
                  <option key={board.id} value={board.id}>{board.nome}</option>
                ))}
              </S.BoardSelect>
            </S.FilterContainer>
          </div>

          <S.Controls>
            <S.ControlButton onClick={handlePrevMonth}><ChevronLeft size={20} /></S.ControlButton>
            <S.MonthDisplay>{monthNames[currentMonth]} {currentYear}</S.MonthDisplay>
            <S.ControlButton onClick={handleNextMonth}><ChevronRight size={20} /></S.ControlButton>
          </S.Controls>
        </S.Header>

        <S.Grid>
          {weekDays.map(day => (
            <S.DayLabel key={day}>{day}</S.DayLabel>
          ))}
          {days.map((dayObj, index) => {
            const dayTasks = getTasksForDay(dayObj);
            return (
              <S.DayCell 
                key={index} 
                $isToday={isToday(dayObj)}
                $isOtherMonth={dayObj.isOtherMonth}
                onClick={() => openModal(dayObj)}
              >
                <S.DayNumber $isToday={isToday(dayObj)}>{dayObj.day}</S.DayNumber>
                {dayTasks.map(task => (
                  <S.TaskBadge key={task.id} $status={task.status}>
                    {task.titulo}
                  </S.TaskBadge>
                ))}
              </S.DayCell>
            );
          })}
        </S.Grid>
      </S.MainContent>

      <S.Sidebar>
        <S.SidebarTitle>
          <CalendarIcon size={20} /> Todas as Tarefas
        </S.SidebarTitle>
        <S.TaskList>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Carregando...</div>
          ) : filteredTasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Nenhuma tarefa encontrada.</div>
          ) : (
            filteredTasks.slice(0, 10).map(task => (
              <S.TaskCard key={task.id}>
                <S.TaskCardTitle>{task.titulo}</S.TaskCardTitle>
                <S.TaskCardMeta>
                  <S.StatusIndicator $status={task.status} />
                  {task.status} • <Clock size={12} /> {task.data_vencimento ? task.data_vencimento.slice(0, 10) : 'Sem data'}
                </S.TaskCardMeta>
              </S.TaskCard>
            ))
          )}
        </S.TaskList>
      </S.Sidebar>

      {modalOpen && (
        <TaskModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveTask}
          task={null}
          defaultDate={modalDate}
          defaultBoardId={selectedBoardId !== 'all' && selectedBoardId !== 'null' ? selectedBoardId : null}
          isFromCalendar={true}
        />
      )}
    </S.CalendarPage>
  );
};

export default Calendar;
