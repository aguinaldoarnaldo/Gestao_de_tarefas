import React, { useState, useEffect } from 'react';
import { X, Calendar, AlertCircle, Users, UserPlus, Flag, Search, Loader2 } from 'lucide-react';
import AttachmentManager from '../AttachmentManager/AttachmentManager';
import apiService from '../../services/api';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  ModalForm,
  ErrorBanner,
  FormGroup,
  FormRow,
  InputIcon,
  ErrorMsg,
  ModalActions,
  Button,
  MemberSelectorContainer,
  MemberList,
  MemberBadge,
  UserItem
} from './TaskModal.styles';

const TaskModal = ({ isOpen, onClose, task = null, onSave, defaultDate = null, defaultBoardId = null }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    status: 'Pendente',
    prioridade: 'Média',
    data_vencimento: '',
    quadro_id: defaultBoardId || ''
  });
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        titulo: task?.titulo || '',
        descricao: task?.descricao || '',
        status: task?.status || 'Pendente',
        prioridade: task?.prioridade || 'Média',
        data_vencimento: task?.data_vencimento ? task.data_vencimento.slice(0, 10) : (defaultDate ? defaultDate.toISOString().slice(0, 10) : ''),
        quadro_id: task?.quadro_id || defaultBoardId || ''
      });
      fetchUsers();
      if (task) {
        fetchTaskMembers();
      }
    }
  }, [isOpen, task, defaultBoardId]);

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

  const fetchUsers = async () => {
    // We don't fetch all users anymore, we fetch on search
    setAvailableUsers([]);
  };


  const fetchTaskMembers = async () => {
    try {
      const members = await apiService.getTaskMembers(task.id);
      setSelectedMembers(members);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleMember = (user) => {
    setSelectedMembers(prev => {
      const exists = prev.find(m => m.id === user.id);
      if (exists) {
        return prev.filter(m => m.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const taskData = {
        ...formData,
        membros: selectedMembers.map(m => m.id)
      };
      await onSave(taskData);
      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>{task ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <ModalForm onSubmit={handleSubmit}>
          {errors.submit && (
            <ErrorBanner>
              <AlertCircle size={18} />
              {errors.submit}
            </ErrorBanner>
          )}

          <FormGroup $error={!!errors.titulo}>
            <label>Título *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Digite o título da tarefa"
            />
            {errors.titulo && <ErrorMsg>{errors.titulo}</ErrorMsg>}
          </FormGroup>

          <FormGroup>
            <label>Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Descreva a tarefa..."
              rows={4}
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Pendente">Pendente</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluída">Concluída</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Prioridade</label>
              <InputIcon>
                <Flag size={18} color={formData.prioridade === 'Alta' ? '#ef4444' : formData.prioridade === 'Média' ? '#f59e0b' : '#10b981'} />
                <select name="prioridade" value={formData.prioridade} onChange={handleChange}>
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </InputIcon>
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup $error={!!errors.data_vencimento}>
              <label>Data de Vencimento</label>
              <InputIcon>
                <Calendar size={18} />
                <input
                  type="date"
                  name="data_vencimento"
                  value={formData.data_vencimento}
                  onChange={handleChange}
                />
              </InputIcon>
              {errors.data_vencimento && <ErrorMsg>{errors.data_vencimento}</ErrorMsg>}
            </FormGroup>

          </FormRow>

          <MemberSelectorContainer>
            <label style={{ fontWeight: 600, fontSize: '0.875rem', color: '#374151' }}>Equipe / Membros</label>
            <MemberList>
              {selectedMembers.map(m => (
                <MemberBadge key={m.id}>
                  {m.nome}
                  <X size={12} style={{ cursor: 'pointer' }} onClick={() => toggleMember(m)} />
                </MemberBadge>
              ))}
              <Button type="button" $variant="secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => setShowUserList(!showUserList)}>
                <UserPlus size={14} /> Adicionar
              </Button>
            </MemberList>
            
            {showUserList && (
              <div style={{ marginTop: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.75rem', background: '#f8fafc' }}>
                <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                  <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    type="text" 
                    placeholder="Pesquisar utilizador..." 
                    value={searchQuery}
                    onChange={(e) => handleSearchUsers(e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem 0.75rem 0.5rem 2.5rem', 
                      borderRadius: '8px', 
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem'
                    }}
                    autoFocus
                  />
                  {isSearching && <Loader2 size={14} className="spinner" style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#3b82f6' }} />}
                </div>

                <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                  {availableUsers.length > 0 ? (
                    availableUsers.map(u => (
                      <UserItem key={u.id} onClick={() => {
                        toggleMember(u);
                        setSearchQuery('');
                        setAvailableUsers([]);
                      }}>
                        <input type="checkbox" checked={selectedMembers.some(m => m.id === u.id)} readOnly style={{ width: 'auto' }} />
                        <span style={{ fontSize: '0.875rem' }}>{u.nome} ({u.email})</span>
                      </UserItem>
                    ))
                  ) : (
                    <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#64748b' }}>
                      {searchQuery.length > 0 ? (
                        !isSearching && <span>Nenhum utilizador encontrado.</span>
                      ) : (
                        <span>Digite o nome para pesquisar.</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </MemberSelectorContainer>

          {task && (
            <FormGroup style={{ marginTop: '1.5rem' }}>
              <label>Anexos</label>
              <AttachmentManager taskId={task.id} />
            </FormGroup>
          )}

          <ModalActions>
            <Button type="button" $variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" $variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : task ? 'Salvar Alterações' : 'Criar Tarefa'}
            </Button>
          </ModalActions>
        </ModalForm>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default TaskModal;
