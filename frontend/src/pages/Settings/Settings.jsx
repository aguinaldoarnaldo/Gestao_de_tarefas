import React, { useState, useEffect, useCallback } from 'react';
import { User, Bell, Moon, Save, CheckCircle, Globe, Shield, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState({ nome: '', email: '' });
  const [notifications, setNotifications] = useState({ email: true, desktop: true, mobile: false });
  const [preferences, setPreferences] = useState({ darkMode: false, language: 'pt' });
  
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  // Load initial state from storage safely
  useEffect(() => {
    if (user) {
      setProfile({ nome: user.nome || '', email: user.email || '' });
      try {
        const storedNotif = sessionStorage.getItem('settings_notifications');
        const storedPrefs = sessionStorage.getItem('settings_preferences');
        if (storedNotif) setNotifications(JSON.parse(storedNotif));
        if (storedPrefs) setPreferences(JSON.parse(storedPrefs));
      } catch (e) {
        console.error("Error loading settings from storage", e);
      }
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };


  const saveProfile = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!profile.nome?.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!profile.email?.trim()) newErrors.email = 'Email é obrigatório';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    setSaving(true);
    setErrors({});
    try {
      await apiService.updateUserProfile(profile);
      setSuccess('Perfil atualizado com sucesso');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSaving(false);
    }
  };


  const toggleNotification = (key) => {
    setNotifications(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      sessionStorage.setItem('settings_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const togglePreference = (key) => {
    setPreferences(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      sessionStorage.setItem('settings_preferences', JSON.stringify(updated));
      if (key === 'darkMode') {
        document.body.classList.toggle('dark-mode', updated.darkMode);
      }
      return updated;
    });
  };

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="settings-card" key="account-tab">
            <h3><User size={20} /> Conta e Perfil</h3>
            <form onSubmit={saveProfile}>
              {errors.submit && <div className="error-banner">{errors.submit}</div>}
              <div className="form-group">
                <label>Nome Completo</label>
                <input name="nome" value={profile.nome} onChange={handleProfileChange} />
                {errors.nome && <span className="error-text">{errors.nome}</span>}
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input name="email" value={profile.email} onChange={handleProfileChange} />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <button className="btn-save" type="submit" disabled={saving}>
                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                Salvar Alterações
              </button>
            </form>
          </div>
        );

      case 'security':
        return (
          <div className="settings-card" key="security-tab">
            <h3><Shield size={20} /> Segurança</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
              A alteração de senha está disponível através do suporte. Por agora, mantenha as suas credenciais seguras e não as partilhe com ninguém.
            </p>
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <p style={{ fontWeight: '600', color: '#0061ff', margin: 0 }}>🔒 A sua conta está protegida com JWT</p>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-card" key="notifications-tab">
            <h3><Bell size={20} /> Notificações</h3>
            <div className="setting-row">
              <div className="setting-info">
                <span className="setting-label">E-mail</span>
                <span className="setting-description">Receba resumos e alertas por e-mail.</span>
              </div>
              <label className="switch">
                <input type="checkbox" checked={notifications.email} onChange={() => toggleNotification('email')} />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-row">
              <div className="setting-info">
                <span className="setting-label">Desktop</span>
                <span className="setting-description">Notificações no navegador em tempo real.</span>
              </div>
              <label className="switch">
                <input type="checkbox" checked={notifications.desktop} onChange={() => toggleNotification('desktop')} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="settings-card" key="appearance-tab">
            <h3><Moon size={20} /> Preferências</h3>
            <div className="setting-row">
              <div className="setting-info">
                <span className="setting-label">Modo Escuro</span>
                <span className="setting-description">Interface com cores mais escuras.</span>
              </div>
              <label className="switch">
                <input type="checkbox" checked={preferences.darkMode} onChange={() => togglePreference('darkMode')} />
                <span className="slider"></span>
              </label>
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label><Globe size={16} style={{verticalAlign: 'middle', marginRight: '5px'}} /> Idioma</label>
              <select 
                value={preferences.language} 
                onChange={(e) => {
                  const v = e.target.value;
                  setPreferences(p => {
                    const updated = {...p, language: v};
                    sessionStorage.setItem('settings_preferences', JSON.stringify(updated));
                    return updated;
                  });
                }}
              >
                <option value="pt">Português</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        );

      case 'delete':
        return (
          <div className="settings-card" key="delete-tab">
            <h3 style={{color: '#ef4444'}}><Trash2 size={20} /> Zona Crítica</h3>
            <p style={{color: '#64748b', marginBottom: '1.5rem'}}>
              Ao eliminar a sua conta, todos os seus dados serão removidos permanentemente. Esta ação não pode ser desfeita.
            </p>
            <button className="btn-save" style={{background: '#ef4444'}}>
              Eliminar Minha Conta
            </button>
          </div>
        );


      default:
        return null;
    }
  }, [activeTab, profile, notifications, preferences, saving, errors]);

  if (!user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'white' }}>
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="settings-page">
      <h2>Configurações</h2>
      
      <div className="settings-layout">
        <aside className="settings-menu">
          <button className={activeTab === 'account' ? 'active' : ''} onClick={() => setActiveTab('account')}>
            <User size={18} /> Conta
          </button>
          <button className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>
            <Shield size={18} /> Segurança
          </button>
          <button className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}>
             <Bell size={18} /> Notificações
          </button>
          <button className={activeTab === 'appearance' ? 'active' : ''} onClick={() => setActiveTab('appearance')}>
            <Moon size={18} /> Aparência
          </button>
          <button className={activeTab === 'delete' ? 'active' : ''} onClick={() => setActiveTab('delete')}>
            <Trash2 size={18} /> Avançado
          </button>
        </aside>

        <main className="settings-content">
          {success && (
            <div className="success-banner">
              <CheckCircle size={20} /> {success}
            </div>
          )}
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default Settings;
