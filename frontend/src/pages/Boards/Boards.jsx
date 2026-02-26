import React, { useState, useEffect } from 'react';
import { Layout, Plus, Search, MoreVertical, Trash2, Edit2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/api';
import './Boards.css';

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoard, setNewBoard] = useState({ nome: '', descricao: '' });
  const [feedback, setFeedback] = useState({ show: false, message: '', type: '' });
  
  // Member management state
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boardMembers, setBoardMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableUsers, setAvailableUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();

  const showFeedback = (message, type = 'success') => {
    setFeedback({ show: true, message, type });
    setTimeout(() => setFeedback({ show: false, message: '', type: '' }), 4000);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const data = await apiService.getBoards();
      setBoards(data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    try {
      await apiService.createBoard(newBoard);
      showFeedback('Quadro criado com sucesso!');
      setIsModalOpen(false);
      setNewBoard({ nome: '', descricao: '' });
      fetchBoards();
    } catch (error) {
      showFeedback('Erro ao criar quadro: ' + error.message, 'error');
    }
  };

  const handleDeleteBoard = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Tem certeza que deseja excluir este quadro? Todas as tarefas associadas serão removidas.')) return;
    try {
      await apiService.deleteBoard(id);
      showFeedback('Quadro excluído com sucesso!');
      fetchBoards();
    } catch (error) {
      showFeedback('Erro ao excluir quadro: ' + error.message, 'error');
    }
  };

  const handleManageMembers = async (board, e) => {
    e.stopPropagation();
    setSelectedBoard(board);
    setIsMembersModalOpen(true);
    try {
      const members = await apiService.getBoardMembers(board.id);
      setBoardMembers(members);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleSearchUsers = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
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

  const handleAddMember = async (userId) => {
    try {
      await apiService.addMemberToBoard(selectedBoard.id, userId);
      showFeedback('Membro adicionado!');
      const members = await apiService.getBoardMembers(selectedBoard.id);
      setBoardMembers(members);
      setSearchQuery('');
      setAvailableUsers([]);
    } catch (error) {
      showFeedback('Erro ao adicionar membro', 'error');
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      await apiService.removeMemberFromBoard(selectedBoard.id, userId);
      showFeedback('Membro removido');
      const members = await apiService.getBoardMembers(selectedBoard.id);
      setBoardMembers(members);
    } catch (error) {
      showFeedback('Erro ao remover membro', 'error');
    }
  };

  return (
    <div className="boards-page">
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
      <div className="boards-header">
        <div>
          <h1>Meus Quadros</h1>
          <p>Gerencie seus espaços de trabalho e projetos.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Novo Quadro
        </button>
      </div>

      {loading ? (
        <div className="loading-state">Carregando quadros...</div>
      ) : (
        <div className="boards-grid">
          {boards.map(board => (
            <div 
              key={board.id} 
              className="board-card"
              onClick={() => navigate(`/dashboard?boardId=${board.id}`)}
            >
              <div className="board-card-header">
                <div className="board-icon">
                  <Layout size={24} color="#0061ff" />
                </div>
                <div className="board-actions-btns">
                  <button className="action-btn-members" onClick={(e) => handleManageMembers(board, e)} title="Membros">
                    <Users size={18} />
                  </button>
                  <button className="delete-btn" onClick={(e) => handleDeleteBoard(board.id, e)} title="Excluir">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <h3>{board.nome}</h3>
              <p>{board.descricao || 'Sem descrição'}</p>
              <div className="board-card-footer">
                <span>Criado por {board.criador_nome}</span>
              </div>
            </div>
          ))}

          {boards.length === 0 && (
            <div className="empty-boards">
              <Layout size={48} />
              <p>Você ainda não tem quadros. Crie um para começar!</p>
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Criar Novo Quadro</h2>
            <form onSubmit={handleCreateBoard}>
              <div className="form-group">
                <label>Nome do Quadro</label>
                <input 
                   type="text" 
                  value={newBoard.nome}
                  onChange={e => setNewBoard({...newBoard, nome: e.target.value})}
                  required
                  placeholder="Ex: Projeto Android, Marketing..."
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea 
                  value={newBoard.descricao}
                  onChange={e => setNewBoard({...newBoard, descricao: e.target.value})}
                  placeholder="Sobre o que é este quadro?"
                  rows={3}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Criar Quadro</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isMembersModalOpen && (
        <div className="modal-overlay" onClick={() => setIsMembersModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h2>Membros do Quadro: {selectedBoard?.nome}</h2>
            
            <div className="search-members">
              <input 
                type="text" 
                placeholder="Pesquisar utilizador..." 
                value={searchQuery}
                onChange={(e) => handleSearchUsers(e.target.value)}
              />
              {isSearching && <small>Pesquisando...</small>}
              
              {availableUsers.length > 0 && (
                <div className="user-results">
                  {availableUsers
                    .filter(u => !boardMembers.some(m => m.id === u.id))
                    .map(u => (
                    <div key={u.id} className="user-result-item" onClick={() => handleAddMember(u.id)}>
                      <span>{u.nome} ({u.email})</span>
                      <Plus size={16} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="current-members">
              <h3>Membros Atuais</h3>
              <div className="members-list">
                {boardMembers.map(member => (
                  <div key={member.id} className="member-item">
                    <span>{member.nome}</span>
                    <button onClick={() => handleRemoveMember(member.id)}>Remover</button>
                  </div>
                ))}
                {boardMembers.length === 0 && <p>Apenas você tem acesso a este quadro.</p>}
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setIsMembersModalOpen(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Boards;
