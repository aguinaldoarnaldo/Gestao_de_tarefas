import React, { useState, useEffect } from 'react';
import { X, Shield, Check, AlertCircle, Loader2 } from 'lucide-react';
import apiService from '../../services/api';
import './PermissionModal.css';

const PermissionModal = ({ isOpen, onClose, user }) => {
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && user) {
      fetchData();
    }
  }, [isOpen, user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [all, mine] = await Promise.all([
        apiService.getAvailablePermissions(),
        apiService.getUserPermissions(user.id)
      ]);
      setAvailablePermissions(all);
      setUserPermissions(mine.map(p => p.id));
    } catch (err) {
      setError('Falha ao carregar permissões');
    } finally {
      setLoading(false);
    }
  };

  const togglePermission = (id) => {
    setUserPermissions(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await apiService.updateUserPermissions(user.id, userPermissions);
      onClose();
    } catch (err) {
      setError(err.message || 'Erro ao salvar permissões');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="permission-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-info">
            <Shield size={24} color="#0061ff" />
            <div>
              <h3>Permissões de Acesso</h3>
              <p>Gerencie o que <strong>{user?.nome}</strong> pode fazer.</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body">
          {loading ? (
            <div className="loading-state">
              <Loader2 className="spinner" />
              <span>Carregando permissões...</span>
            </div>
          ) : error ? (
            <div className="error-banner">
              <AlertCircle size={18} />
              {error}
            </div>
          ) : (
            <div className="permissions-list">
              {availablePermissions.map(permission => (
                <div 
                  key={permission.id} 
                  className={`permission-item ${userPermissions.includes(permission.id) ? 'active' : ''}`}
                  onClick={() => togglePermission(permission.id)}
                >
                  <div className="item-content">
                    <span className="permission-name">{permission.nome}</span>
                  </div>
                  <div className="checkbox-ui">
                    {userPermissions.includes(permission.id) && <Check size={16} color="white" />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-save" onClick={handleSave} disabled={saving || loading}>
            {saving ? 'Gravando...' : 'Gravar Alterações'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;
