import React, { useState, useEffect } from 'react';
import { X, Calendar, AlertCircle, Flag } from 'lucide-react';
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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    }
  }, [isOpen, task, defaultBoardId]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
      await onSave(formData);
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
