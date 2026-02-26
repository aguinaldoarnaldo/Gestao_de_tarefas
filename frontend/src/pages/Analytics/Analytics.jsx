import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Target, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Activity,
  Calendar
} from 'lucide-react';
import apiService from '../../services/api';
import {
  AnalyticsContainer,
  StatsGrid,
  StatCard,
  StatIcon,
  StatInfo,
  RecentActivity,
  ActivityItem
} from './Analytics.styles';

const Analytics = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const tasksData = await apiService.getTasks();
      setTasks(Array.isArray(tasksData) ? tasksData : []);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Concluída').length;
  const inProgressTasks = tasks.filter(t => t.status === 'Em Andamento').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pendente').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const overdueTasks = tasks.filter(t => t.data_vencimento && new Date(t.data_vencimento) < new Date() && t.status !== 'Concluída').length;

  if (loading) {
    return (
      <AnalyticsContainer>
        <div style={{ color: 'white', textAlign: 'center', padding: '5rem' }}>
          Gerando o seu relatório de performance...
        </div>
      </AnalyticsContainer>
    );
  }

  return (
    <AnalyticsContainer>
      <StatsGrid>
        <StatCard>
          <StatIcon $color="#0061ff"><Target size={24} /></StatIcon>
          <StatInfo><span>Total Tarefas</span><h2>{totalTasks}</h2></StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon $color="#10b981"><Trophy size={24} /></StatIcon>
          <StatInfo><span>Concluídas</span><h2>{completedTasks}</h2></StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon $color="#8b5cf6"><Activity size={24} /></StatIcon>
          <StatInfo><span>Eficiência</span><h2>{completionRate}%</h2></StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon $color="#ef4444"><AlertCircle size={24} /></StatIcon>
          <StatInfo><span>Em Atraso</span><h2>{overdueTasks}</h2></StatInfo>
        </StatCard>
      </StatsGrid>

      <RecentActivity>
        <h3>Atividade Recente</h3>
        {tasks.slice(0, 10).map((task, idx) => (
          <ActivityItem key={idx}>
            <div className="activity-icon">
              {task.status === 'Concluída' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
            </div>
            <div className="activity-text">
              A tarefa <strong>{task.titulo}</strong> está em estado <strong>{task.status}</strong>.
            </div>
            <div className="activity-time">
              {task.data_vencimento ? new Date(task.data_vencimento).toLocaleDateString() : 'Sem prazo'}
            </div>
          </ActivityItem>
        ))}
      </RecentActivity>
    </AnalyticsContainer>
  );
};

export default Analytics;
