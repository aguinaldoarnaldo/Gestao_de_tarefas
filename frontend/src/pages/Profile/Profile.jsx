import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Save, CheckCircle, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome || '',
        email: user.email || ''
      });
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const tasks = await apiService.getTasks();
      setStats({
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.status === 'Concluída').length,
        pendingTasks: tasks.filter(t => t.status === 'Pendente').length,
        inProgressTasks: tasks.filter(t => t.status === 'Em Andamento').length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await apiService.updateUserProfile(formData);
      setSuccess('Perfil atualizado com sucesso!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <div className="loading-profile">Carregando...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar-large">
          {user.nome.substring(0, 2).toUpperCase()}
        </div>
        <div>
          <h2 style={{ color: 'white', margin: 0 }}>{user.nome}</h2>
          <p className="profile-role">Utilizador</p>
        </div>
      </div>

      {success && (
        <div className="success-banner">
          <CheckCircle size={18} />
          {success}
        </div>
      )}

      <div className="profile-grid">
        <div className="profile-section stats-section">
          <h2>
            <BarChart3 size={20} />
            Estatísticas
          </h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.totalTasks}</div>
              <div className="stat-label">Total de Tarefas</div>
            </div>
            <div className="stat-card">
              <div className="stat-value stat-completed">{stats.completedTasks}</div>
              <div className="stat-label">Concluídas</div>
            </div>
            <div className="stat-card">
              <div className="stat-value stat-progress">{stats.inProgressTasks}</div>
              <div className="stat-label">Em Andamento</div>
            </div>
            <div className="stat-card">
              <div className="stat-value stat-pending">{stats.pendingTasks}</div>
              <div className="stat-label">Pendentes</div>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>
            <User size={20} />
            Informações do Perfil
          </h2>
          <form onSubmit={handleProfileSubmit}>
            {errors.submit && (
              <div className="error-banner">{errors.submit}</div>
            )}
            
            <div className="form-group">
              <label>Nome Completo</label>
              <div className="input-icon">
                <User size={18} />
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleProfileChange}
                  className={errors.nome ? 'error' : ''}
                />
              </div>
              {errors.nome && <span className="error-msg">{errors.nome}</span>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-icon">
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleProfileChange}
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              <Save size={18} />
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
