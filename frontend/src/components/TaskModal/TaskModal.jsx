import React, { useState } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';
import AttachmentManager from '../AttachmentManager/AttachmentManager';
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
  Button
} from './TaskModal.styles';

const TaskModal = ({ isOpen, onClose, task = null, onSave }) => {
  const [formData, setFormData] = useState({
    titulo: task?.titulo || '',
    descricao: task?.descricao || '',
    status: task?.status || 'Pendente',
    data_vencimento: task?.data_vencimento || ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (formData.data_vencimento) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dueDate = new Date(formData.data_vencimento);
      if (dueDate < today) {
        newErrors.data_vencimento = 'Data deve ser futura';
      }
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

          <FormGroup error={!!errors.titulo}>
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

            <FormGroup error={!!errors.data_vencimento}>
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
            <FormGroup>
              <label>Anexos</label>
              <AttachmentManager taskId={task.id} />
            </FormGroup>
          )}

          <ModalActions>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : task ? 'Salvar Alterações' : 'Criar Tarefa'}
            </Button>
          </ModalActions>
        </ModalForm>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default TaskModal;
