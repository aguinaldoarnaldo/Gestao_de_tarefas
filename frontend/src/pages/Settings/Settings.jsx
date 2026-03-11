import React, { useState, useEffect, useCallback } from 'react';
import { User, Bell, Moon, Save, CheckCircle, Globe, Shield, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState({ email: true, desktop: true, mobile: false });
  const [preferences, setPreferences] = useState({ darkMode: false, language: 'pt' });
  
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('notifications');

  useEffect(() => {
    if (user) {
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
  }, [activeTab, notifications, preferences, errors]);

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
