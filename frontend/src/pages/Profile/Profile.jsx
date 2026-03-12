import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, MapPin, AlignLeft, Save, CheckCircle, Camera, Loader2, Edit2, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useAuth();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    biografia: '',
    localizacao: ''
  });
  
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    if (user) {
      const data = {
        nome: user.nome || '',
        email: user.email || '',
        telefone: user.telefone || '',
        biografia: user.biografia || '',
        localizacao: user.localizacao || ''
      };
      setFormData(data);
      setOriginalData(data);
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(originalData);
    setAvatarPreview(null);
    setAvatarFile(null);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome.trim()) return setErrors({ nome: 'Nome é obrigatório' });
    if (!formData.email.trim()) return setErrors({ email: 'Email é obrigatório' });

    setIsSubmitting(true);
    try {
      const updateData = new FormData();
      Object.keys(formData).forEach(key => updateData.append(key, formData[key]));
      if (avatarFile) updateData.append('avatar', avatarFile);

      const response = await apiService.updateUserProfile(updateData);
      if (setUser && response.user) setUser(response.user);
      
      setSuccess('Perfil atualizado!');
      setAvatarFile(null);
      setIsEditing(false);
      const saved = { ...formData };
      setOriginalData(saved);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return <div className="profile-simple-loading"><Loader2 className="spin" /></div>;

  return (
    <div className="profile-simple-container">
      <div className="profile-simple-card">
        <div className="profile-simple-header">
          <div className="simple-avatar-section">
            <div className="simple-avatar-circle">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" />
              ) : user.avatar ? (
                <img src={apiService.getImageUrl(user.avatar)} alt={user.nome} />
              ) : (
                user.nome.substring(0, 1).toUpperCase()
              )}
            </div>
        {/* Botão de mudar foto só aparece em modo de edição */}
            {isEditing && (
              <>
                <button className="simple-avatar-btn" onClick={() => fileInputRef.current.click()}>
                  <Camera size={16} /> Mudar foto
                </button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
              </>
            )}
          </div>
          
          <div className="simple-title-section">
            <h1>Meu Perfil</h1>
            <p>Gerencie suas informações de conta</p>
          </div>

          {/* Botão de Editar - visível apenas quando NÃO está a editar */}
          {!isEditing && (
            <button type="button" className="simple-btn-edit" onClick={handleEdit}>
              <Edit2 size={16} /> Editar Perfil
            </button>
          )}
        </div>

        {success && (
          <div className="simple-success-msg">
            <CheckCircle size={18} /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="simple-form">
          {errors.submit && <div className="simple-error-msg">{errors.submit}</div>}

          <div className="simple-field">
            <label><User size={15} /> Nome</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} className={errors.nome ? 'error' : ''} readOnly={!isEditing} />
            {errors.nome && <span className="field-err">{errors.nome}</span>}
          </div>

          <div className="simple-field">
            <label><Mail size={15} /> Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} readOnly={!isEditing} />
            {errors.email && <span className="field-err">{errors.email}</span>}
          </div>

          <div className="simple-row">
            <div className="simple-field">
              <label><Phone size={15} /> Telefone</label>
              <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Opcional" readOnly={!isEditing} />
            </div>
            <div className="simple-field">
              <label><MapPin size={15} /> Localização</label>
              <input type="text" name="localizacao" value={formData.localizacao} onChange={handleChange} placeholder="Opcional" readOnly={!isEditing} />
            </div>
          </div>

          <div className="simple-field">
            <label><AlignLeft size={15} /> Sobre mim</label>
            <textarea name="biografia" value={formData.biografia} onChange={handleChange} rows={3} placeholder="Conte um pouco sobre você..." readOnly={!isEditing} />
          </div>

          {/* Botões de ação — só visíveis em modo de edição */}
          {isEditing && (
            <div className="simple-actions">
              <button type="button" className="simple-btn-cancel" onClick={handleCancel}>
                <X size={16} /> Cancelar
              </button>
              <button type="submit" className="simple-btn-save" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : <><Save size={16} /> Salvar Alterações</>}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
