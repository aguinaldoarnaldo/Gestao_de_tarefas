import React, { useState } from 'react';
import { X, User, Mail, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import './UserModal.css';

const UserModal = ({ isOpen, onClose, user = null, onSave }) => {
  const [formData, setFormData] = useState({
    nome: user?.nome || '',
    email: user?.email || '',
    senha: '',
    tipo: user?.tipo || 'membro'
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
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!user && !formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    }
    if (formData.senha && formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter no mínimo 6 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const dataToSend = { ...formData };
      // Remove senha vazia se estiver editando
      if (user && !dataToSend.senha) {
        delete dataToSend.senha;
      }
      await onSave(dataToSend);
      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="user-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{user ? 'Editar Utilizador' : 'Novo Utilizador'}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {errors.submit && (
            <div className="error-banner">
              <AlertCircle size={18} />
              {errors.submit}
            </div>
          )}

          <div className="form-group">
            <label>Nome Completo *</label>
            <div className="input-icon">
              <User size={18} />
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome do utilizador"
                className={errors.nome ? 'error' : ''}
              />
            </div>
            {errors.nome && <span className="error-msg">{errors.nome}</span>}
          </div>

          <div className="form-group">
            <label>Email *</label>
            <div className="input-icon">
              <Mail size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemplo@email.com"
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Senha {user ? '(deixe em branco para manter)' : '*'}</label>
            <div className="input-icon">
              <Lock size={18} />
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                placeholder={user ? 'Nova senha (opcional)' : 'Mínimo 6 caracteres'}
                className={errors.senha ? 'error' : ''}
              />
            </div>
            {errors.senha && <span className="error-msg">{errors.senha}</span>}
          </div>

          <div className="form-group">
            <label>Tipo de Utilizador *</label>
            <div className="input-icon">
              <ShieldCheck size={18} />
              <select name="tipo" value={formData.tipo} onChange={handleChange}>
                <option value="membro">Membro</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : user ? 'Salvar Alterações' : 'Criar Utilizador'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
