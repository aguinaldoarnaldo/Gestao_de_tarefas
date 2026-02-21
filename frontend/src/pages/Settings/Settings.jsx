import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, Moon, Save, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import './Settings.css';

const Settings = () => {
  const { user, loadUser } = useAuth();

  const [profile, setProfile] = useState({ nome: '', email: '' });
  const [password, setPassword] = useState({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
  const [notifications, setNotifications] = useState({ email: true, desktop: true });
  const [preferences, setPreferences] = useState({ darkMode: false, language: 'pt' });
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  useEffect(() => {
    if (user) {
      setProfile({ nome: user.nome || '', email: user.email || '' });
      const storedNotif = JSON.parse(localStorage.getItem('settings_notifications') || 'null');
      const storedPrefs = JSON.parse(localStorage.getItem('settings_preferences') || 'null');
      if (storedNotif) setNotifications(storedNotif);
      if (storedPrefs) setPreferences(storedPrefs);
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!profile.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!profile.email.trim()) newErrors.email = 'Email é obrigatório';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    setSaving(true);
    try {
      await apiService.updateUserProfile(profile);
      setSuccess('Perfil atualizado com sucesso');
      loadUser();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSaving(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!password.senhaAtual) newErrors.senhaAtual = 'Senha atual é obrigatória';
    if (!password.novaSenha || password.novaSenha.length < 6) newErrors.novaSenha = 'Nova senha precisa ter pelo menos 6 caracteres';
    if (password.novaSenha !== password.confirmarSenha) newErrors.confirmarSenha = 'Senhas não coincidem';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    setSaving(true);
    try {
      await apiService.updatePassword({ senhaAtual: password.senhaAtual, novaSenha: password.novaSenha });
      setSuccess('Senha alterada com sucesso');
      setPassword({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setErrors({ passwordSubmit: err.message });
    } finally {
      setSaving(false);
    }
  };

  const toggleNotification = (key) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    localStorage.setItem('settings_notifications', JSON.stringify(updated));
  };

  const togglePreference = (key) => {
    const updated = { ...preferences, [key]: !preferences[key] };
    setPreferences(updated);
    localStorage.setItem('settings_preferences', JSON.stringify(updated));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <section className="settings-card">
            <h3><User size={18} /> Conta</h3>
            <form onSubmit={saveProfile}>
              {errors.submit && <div className="error-banner">{errors.submit}</div>}
              <label>Nome</label>
              <input name="nome" value={profile.nome} onChange={handleProfileChange} />

              <label>Email</label>
              <input name="email" value={profile.email} onChange={handleProfileChange} />

              <button className="btn-primary" type="submit" disabled={saving}><Save size={16} /> Salvar Perfil</button>
            </form>
          </section>
        );

      case 'security':
        return (
          <section className="settings-card">
            <h3><Lock size={18} /> Segurança</h3>
            <form onSubmit={savePassword}>
              {errors.passwordSubmit && <div className="error-banner">{errors.passwordSubmit}</div>}
              <label>Senha Atual</label>
              <input type="password" name="senhaAtual" value={password.senhaAtual} onChange={handlePasswordChange} />

              <label>Nova Senha</label>
              <input type="password" name="novaSenha" value={password.novaSenha} onChange={handlePasswordChange} />

              <label>Confirmar Nova Senha</label>
              <input type="password" name="confirmarSenha" value={password.confirmarSenha} onChange={handlePasswordChange} />

              <button className="btn-primary" type="submit" disabled={saving}><Lock size={16} /> Alterar Senha</button>
            </form>
          </section>
        );

      case 'notifications':
        return (
          <section className="settings-card">
            <h3><Bell size={18} /> Notificações</h3>
            <div className="setting-row">
              <label>Email</label>
              <input type="checkbox" checked={notifications.email} onChange={() => toggleNotification('email')} />
            </div>
            <div className="setting-row">
              <label>Notificações Desktop</label>
              <input type="checkbox" checked={notifications.desktop} onChange={() => toggleNotification('desktop')} />
            </div>
          </section>
        );

      case 'preferences':
        return (
          <section className="settings-card">
            <h3><Moon size={18} /> Preferências</h3>
            <div className="setting-row">
              <label>Modo Escuro</label>
              <input type="checkbox" checked={preferences.darkMode} onChange={() => togglePreference('darkMode')} />
            </div>
            <div className="setting-row">
              <label>Idioma</label>
              <select value={preferences.language} onChange={(e) => { const v = e.target.value; const updated = { ...preferences, language: v }; setPreferences(updated); localStorage.setItem('settings_preferences', JSON.stringify(updated)); }}>
                <option value="pt">Português</option>
                <option value="en">English</option>
              </select>
            </div>
          </section>
        );

      case 'integrations':
        return (
          <section className="settings-card">
            <h3><CheckCircle size={18} /> Integrações & Avançado</h3>
            <p>Opções de integrações e configurações avançadas aparecerão aqui.</p>
          </section>
        );

      default:
        return null;
    }
  };

  if (!user) return <div className="loading">Carregando...</div>;

  return (
    <div className="settings-page">
      <h2>Configurações</h2>

      {success && (
        <div className="success-banner"><CheckCircle size={16} /> {success}</div>
      )}

      <div className="settings-layout">
        <aside className="settings-menu">
          <button className={activeTab === 'account' ? 'active' : ''} onClick={() => setActiveTab('account')}><User size={16} /> Conta</button>
          <button className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}><Lock size={16} /> Segurança</button>
          <button className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}><Bell size={16} /> Notificações</button>
          <button className={activeTab === 'preferences' ? 'active' : ''} onClick={() => setActiveTab('preferences')}><Moon size={16} /> Preferências</button>
          <button className={activeTab === 'integrations' ? 'active' : ''} onClick={() => setActiveTab('integrations')}><CheckCircle size={16} /> Integrações & Avançado</button>
        </aside>

        <main>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default Settings;
