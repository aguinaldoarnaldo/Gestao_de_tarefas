import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Trash2, Mail, Shield, ShieldCheck, Loader2, X, Plus, Search } from 'lucide-react';
import apiService from '../../services/api';
import './Teams.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newTeam, setNewTeam] = useState({ nome: '', descricao: '' });
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const teamsData = await apiService.getTeams();
      
      // Get members for each team
      const teamsWithMembers = await Promise.all(teamsData.map(async team => {
        const members = await apiService.getTeamMembers(team.id);
        return { ...team, members };
      }));

      setTeams(teamsWithMembers);
    } catch (error) {
      console.error('Error fetching team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchUsers = async (query) => {
    setSearchQuery(query);
    if (query.trim().length === 0) {
      setAvailableUsers([]);
      return;
    }

    setIsSearching(true);
    try {
      const users = await apiService.getAllUsers(query);
      setAvailableUsers(users);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const [feedback, setFeedback] = useState({ show: false, message: '', type: '' });

  const showFeedback = (message, type = 'success') => {
    setFeedback({ show: true, message, type });
    setTimeout(() => setFeedback({ show: false, message: '', type: '' }), 4000);
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await apiService.createTeam(newTeam);
      showFeedback('Equipa criada com sucesso!');
      setIsModalOpen(false);
      setNewTeam({ nome: '', descricao: '' });
      fetchData();
    } catch (error) {
      showFeedback('Erro ao criar equipa', 'error');
    }
  };

  const handleSendInvite = async (teamId, userId) => {
    try {
      await apiService.sendTeamInvite(teamId, userId);
      showFeedback('Convite enviado com sucesso!');
    } catch (error) {
      showFeedback(error.message || 'Erro ao enviar convite', 'error');
    }
  };

  const handleRemoveMember = async (teamId, userId) => {
    if (!confirm('Remover este membro da equipa?')) return;
    try {
      await apiService.removeMemberFromTeam(teamId, userId);
      showFeedback('Membro removido');
      fetchData();
    } catch (error) {
      showFeedback('Erro ao remover membro', 'error');
    }
  };

  const handleDeleteTeam = async (id) => {
    if (!confirm('Eliminar esta equipa permanentemente?')) return;
    try {
      await apiService.deleteTeam(id);
      showFeedback('Equipa eliminada');
      fetchData();
    } catch (error) {
      showFeedback('Erro ao excluir equipa', 'error');
    }
  };

  return (
    <div className="teams-page">
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
      <div className="teams-header">
        <div>
          <h1>Gestão de Equipas</h1>
          <p>Organize seus colaboradores em grupos de trabalho.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Nova Equipa
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <Loader2 className="spinner" />
          <span>Carregando equipas...</span>
        </div>
      ) : (
      <div className="teams-grid">
        {teams.map(team => (
          <div key={team.id} className="team-card">
            <div className="team-card-header">
              <div className="team-info">
                <div className="team-icon">
                  <Users size={24} />
                </div>
                <div className="team-titles">
                  <h3>{team.nome}</h3>
                  <p>{team.descricao || 'Sem descrição.'}</p>
                </div>
              </div>
              <div className="team-actions">
                <button className="btn-icon-secondary" onClick={() => {
                  setSelectedTeam(team);
                  setIsAddMemberOpen(true);
                }} title="Adicionar Membro">
                  <UserPlus size={18} />
                </button>
                <button className="btn-icon-danger" onClick={() => handleDeleteTeam(team.id)} title="Eliminar Equipa">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="members-section">
              <div className="section-header">
                <span>{team.members?.length || 0} Membros</span>
              </div>
              <div className="members-list-mini">
                {team.members && team.members.map(member => (
                  <div key={member.id} className="member-row">
                    <div className="member-avatar-mini">
                      {member.nome.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="member-info-mini">
                      <span className="member-name-mini">{member.nome}</span>
                      {member.id === team.lider_id && (
                        <ShieldCheck size={12} className="leader-icon" />
                      )}
                    </div>
                    <button className="btn-remove-mini" onClick={() => handleRemoveMember(team.id, member.id)}>
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {(!team.members || team.members.length === 0) && (
                  <div className="empty-members">
                    <p>Equipa sem membros ativos.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {teams.length === 0 && !loading && (
          <div className="empty-teams-state">
            <Users size={64} />
            <h3>Nenhuma equipa registada</h3>
            <p>Comece por criar uma nova equipa para organizar o seu trabalho.</p>
            <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setIsModalOpen(true)}>
              <Plus size={20} /> Nova Equipa
            </button>
          </div>
        )}
      </div>
      )}

      {/* New Team Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Criar Nova Equipa</h2>
            <form onSubmit={handleCreateTeam}>
              <div className="form-group">
                <label>Nome da Equipa</label>
                <input 
                  type="text" 
                  value={newTeam.nome}
                  onChange={e => setNewTeam({...newTeam, nome: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea 
                  value={newTeam.descricao}
                  onChange={e => setNewTeam({...newTeam, descricao: e.target.value})}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Criar Equipa</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {isAddMemberOpen && (
        <div className="modal-overlay" onClick={() => setIsAddMemberOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header-with-close">
              <h2>Adicionar Membro a {selectedTeam?.nome}</h2>
              <button className="close-btn" onClick={() => setIsAddMemberOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Pesquisar por nome..." 
                value={searchQuery}
                onChange={(e) => handleSearchUsers(e.target.value)}
                autoFocus
              />
              {isSearching && <Loader2 size={16} className="spinner" />}
            </div>

            <div className="user-picker-list">
              {availableUsers.length > 0 ? (
                availableUsers
                  .filter(u => !selectedTeam?.members.some(m => m.id === u.id))
                  .map(user => (
                    <div key={user.id} className="user-picker-item" onClick={() => {
                      handleSendInvite(selectedTeam.id, user.id);
                      setIsAddMemberOpen(false);
                      setSearchQuery('');
                      setAvailableUsers([]);
                    }}>
                      <div className="user-picker-avatar">{user.nome[0].toUpperCase()}</div>
                      <div className="user-picker-info">
                        <span className="name">{user.nome}</span>
                        <span className="email">{user.email}</span>
                      </div>
                      <Plus size={18} />
                    </div>
                  ))
              ) : (
                <div className="search-placeholder">
                  {searchQuery.length > 0 ? (
                    !isSearching && <span>Nenhum usuário encontrado.</span>
                  ) : (
                    <span>Digite o nome do usuário para pesquisar.</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
