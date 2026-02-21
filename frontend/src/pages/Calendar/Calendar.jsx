import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import TaskModal from '../../components/TaskModal/TaskModal';
import apiService from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import './Calendar.styles.js';

// Gera matriz de dias do mês para exibição
function generateCalendarMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const matrix = [];
  let week = [];
  let dayOfWeek = firstDay.getDay();
  // Preenche dias do mês anterior
  for (let i = 0; i < dayOfWeek; i++) week.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    week.push(new Date(year, month, d));
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }
  // Preenche dias do próximo mês
  if (week.length) {
    while (week.length < 7) week.push(null);
    matrix.push(week);
  }
  return matrix;
}



const Calendar = () => {
  const today = new Date();
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const matrix = generateCalendarMatrix(currentYear, currentMonth);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [currentMonth, currentYear]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await apiService.getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (e) {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Busca tarefas do mês
  const getTasksForDay = (date) => {
    if (!date) return [];
    const dStr = date.toISOString().slice(0, 10);
    return tasks.filter(t => t.data_vencimento && t.data_vencimento.slice(0, 10) === dStr);
  };

  const monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  // Modal handlers
  const openModal = (date) => {
    setModalDate(date);
    setSelectedTask(null);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleSaveTask = async (formData) => {
    // formData: { titulo, descricao, status, data_vencimento }
    try {
      await apiService.createTask({
        ...formData,
        data_vencimento: modalDate.toISOString().slice(0, 10),
      });
      await fetchTasks();
    } catch (e) {
      throw e;
    }
  };

  return (
    <div style={{ display: 'flex', gap: 32, padding: 32, background: '#f6fafd', minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif' }}>
      {/* Sidebar (simples) */}
      <aside style={{ width: 60, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 12 }}>
        <div style={{ width: 36, height: 36, background: '#e0e7ef', borderRadius: '50%', margin: '16px 0' }} />
        <div style={{ flex: 1 }} />
        <div style={{ width: 24, height: 24, background: '#e0e7ef', borderRadius: '50%', margin: '16px 0' }} />
      </aside>

      {/* Conteúdo principal */}
      <main style={{ flex: 2, background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32, minWidth: 600 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#2d3748', margin: 0, flex: 1 }}>Calendário</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => setCurrentMonth(m => m === 0 ? 11 : m - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', borderRadius: 6, padding: 4, transition: 'background 0.2s' }}><ChevronLeft /></button>
            <span style={{ fontWeight: 600 }}>{monthNames[currentMonth]} {currentYear}</span>
            <button onClick={() => setCurrentMonth(m => m === 11 ? 0 : m + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', borderRadius: 6, padding: 4, transition: 'background 0.2s' }}><ChevronRight /></button>
          </div>
          <div style={{ marginLeft: 24, background: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', padding: '4px 12px', boxShadow: '0 1px 2px #e2e8f0' }}>
            <Search size={18} style={{ color: '#64748b', marginRight: 6 }} />
            <input placeholder="Buscar" style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 15 }} />
          </div>
        </div>
        {/* Calendário */}
        <div style={{ background: '#f7fafc', borderRadius: 12, border: '1px solid #e2e8f0', padding: 18, boxShadow: '0 2px 8px #f1f5f9' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {weekDays.map(day => (
                  <th key={day} style={{ color: '#64748b', fontWeight: 600, padding: 6, textAlign: 'center', fontSize: 15 }}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((week, i) => (
                <tr key={i}>
                  {week.map((date, j) => (
                    <td key={j} style={{
                      minWidth: 60,
                      height: 64,
                      background: date && date.toDateString() === today.toDateString() ? '#e0e7ef' : 'transparent',
                      borderRadius: 10,
                      verticalAlign: 'top',
                      padding: 4,
                      position: 'relative',
                      border: '1px solid #f1f5f9',
                      cursor: date ? 'pointer' : 'default',
                      transition: 'background 0.15s',
                    }}
                    onClick={() => date && openModal(date)}
                    >
                      <div style={{ fontWeight: 600, color: '#334155', fontSize: 15, display: 'flex', alignItems: 'center', gap: 4 }}>
                        {date ? date.getDate() : ''}
                        {date && <PlusCircle size={14} style={{ color: '#38bdf8', marginLeft: 2, opacity: 0.7 }} />}
                      </div>
                      <div style={{ marginTop: 2 }}>
                        {getTasksForDay(date).map(task => (
                          <div key={task.id} style={{ fontSize: 11, color: task.status === 'Concluída' ? '#10b981' : task.status === 'Em Andamento' ? '#0ea5e9' : '#e11d48', background: '#fff', borderRadius: 6, padding: '1px 6px', marginBottom: 2, boxShadow: '0 1px 2px #e2e8f0', fontWeight: 500 }}>{task.titulo}</div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de cadastro de tarefa estilizado */}
        {modalOpen && (
          <TaskModal
            isOpen={modalOpen}
            onClose={closeModal}
            onSave={handleSaveTask}
            task={null}
            defaultDate={modalDate}
          />
        )}
      </main>

      {/* Painel lateral de tarefas */}
      <aside style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #e2e8f0', padding: 24, minWidth: 260 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#2d3748', marginBottom: 18 }}>Tarefas</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 520, overflowY: 'auto' }}>
          {loading ? (
            <div style={{ color: '#64748b', textAlign: 'center', marginTop: 32 }}>Carregando...</div>
          ) : tasks.length === 0 ? (
            <div style={{ color: '#64748b', textAlign: 'center', marginTop: 32 }}>Nenhuma tarefa encontrada.</div>
          ) : tasks.map(task => (
            <div key={task.id} style={{ background: '#f7fafc', borderRadius: 8, padding: 12, boxShadow: '0 1px 2px #e2e8f0', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ fontWeight: 600, color: '#334155', fontSize: 15 }}>{task.titulo}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>{task.status} - {task.data_vencimento && task.data_vencimento.slice(0, 10)}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Calendar;
