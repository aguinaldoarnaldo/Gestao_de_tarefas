import React, { useState, useEffect } from 'react';
import { Users as UsersIcon, Plus, Search, Edit2, Trash2, Shield, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import UserModal from '../../components/UserModal/UserModal';
import apiService from '../../services/api';
import './Users.css';

const Users = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    try {
      await apiService.deleteUser(userId);
      await fetchUsers();
    } catch (error) {
      alert('Erro ao excluir usuário: ' + error.message);
    }
  };

  const handleSaveUser = async (userData) => {
    try {
      if (selectedUser) {
        await apiService.updateUser(selectedUser.id, userData);
      } else {
        await apiService.createUser(userData);
      }
      await fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || user.tipo === filterType;
    return matchesSearch && matchesType;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (!isAdmin()) {
    return (
      <div className="access-denied">
        <Shield size={48} />
        <h2>Acesso Negado</h2>
        <p>Você não tem permissão para acessar esta página.</p>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="users-header-actions">
        <div>
          <p>{users.length} utilizadores registados</p>
        </div>
        <button className="btn-primary" onClick={handleCreateUser}>
          <Plus size={20} />
          Novo Utilizador
        </button>
      </div>

      <div className="users-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Procurar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Todos os Tipos</option>
          <option value="admin">Administradores</option>
          <option value="membro">Membros</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-state">Carregando utilizadores...</div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Data de Criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {user.nome.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="user-name">{user.nome}</span>
                    </div>
                  </td>
                  <td>
                    <div className="email-cell">
                      <Mail size={14} />
                      {user.email}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${user.tipo}`}>
                      {user.tipo === 'admin' ? 'Administrador' : 'Membro'}
                    </span>
                  </td>
                  <td>
                    <div className="date-cell">
                      <Calendar size={14} />
                      {formatDate(user.data_criacao)}
                    </div>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button
                        className="btn-icon"
                        onClick={() => handleEditUser(user)}
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="btn-icon btn-delete"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="empty-state">
              <UsersIcon size={48} />
              <p>Nenhum utilizador encontrado</p>
            </div>
          )}
        </div>
      )}

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default Users;
