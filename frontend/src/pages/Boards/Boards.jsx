import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, ArrowUpRight, LayoutGrid, Loader2, CheckCircle2, AlertCircle, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import './Boards.css';

const ACCENTS = ['#2a7de1','#10b981','#8b5cf6','#f59e0b','#ef4444','#06b6d4','#ec4899','#14b8a6'];
const getAccent = (id) => ACCENTS[(Number(id) || 0) % ACCENTS.length] || ACCENTS[0];

/* ─── Toast component rendered via portal to avoid DOM nesting issues ─── */
const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div className={`bp-toast ${toast.type === 'error' ? 'bp-toast--error' : ''}`}>
      {toast.type === 'error' ? <AlertCircle size={16}/> : <CheckCircle2 size={16}/>}
      <span>{toast.msg}</span>
    </div>
  );
};

const Boards = () => {
  const { user } = useAuth();
  const navigate  = useNavigate();

  const [boards,       setBoards]       = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [isModalOpen,  setIsModalOpen]  = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);
  const [newBoard,     setNewBoard]     = useState({ nome: '', descricao: '', foto_fundo: null });
  const [creating,     setCreating]     = useState(false);
  /* ── Mounted check helper ────────────────────────────── */
  const isMounted = React.useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const [toast,        setToast]        = useState(null);

  /* ── Toast helper ─────────────────────────────────── */
  const showToast = useCallback((msg, type = 'success') => {
    if (isMounted.current) {
      setToast({ msg, type });
      setTimeout(() => {
        if (isMounted.current) setToast(null);
      }, 5000);
    }
  }, []);

  const fetchBoards = useCallback(async (showSpinner = false) => {
    if (showSpinner) setLoading(true);
    try {
      const data = await apiService.getBoards();
      if (isMounted.current) {
        setBoards(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error('fetchBoards error:', e);
      if (isMounted.current) setBoards([]);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchBoards(true);
    }
  }, [fetchBoards, user]);

  if (loading && !boards.length && !user) {
    return (
      <div className="bp-loading">
        <Loader2 size={32} className="bp-spin"/> Verificando autenticação...
      </div>
    );
  }

  /* ── Open edit modal ──────────────────────────────── */
  const openEditModal = (board, e) => {
    e.stopPropagation();
    setEditingBoard(board);
    setNewBoard({ nome: board.nome || '', descricao: board.descricao || '', foto_fundo: null });
    setIsModalOpen(true);
  };

  /* ── Close modal ──────────────────────────────────── */
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBoard(null);
    setNewBoard({ nome: '', descricao: '', foto_fundo: null });
  };

  /* ── Save (create or update) ──────────────────────── */
  const handleSave = async (e) => {
    e.preventDefault();
    if (creating) return;
    setCreating(true);

    const savedName = newBoard.nome || '';

    try {
      const fd = new FormData();
      fd.append('nome',     newBoard.nome     || '');
      fd.append('descricao', newBoard.descricao || '');
      if (newBoard.foto_fundo) fd.append('foto_fundo', newBoard.foto_fundo);

      if (editingBoard) {
        await apiService.updateBoard(editingBoard.id, fd);
      } else {
        await apiService.createBoard(fd);
      }

      // 1. Close the modal
      closeModal();

      // 2. Show success toast
      showToast(
        editingBoard
          ? `✓ Quadro "${savedName}" atualizado com sucesso!`
          : `✓ Quadro "${savedName}" criado com sucesso!`
      );

      // 3. Refresh list in background (no spinner)
      await fetchBoards(false);

    } catch (err) {
      console.error('handleSave error:', err);
      showToast(err.message || 'Erro ao guardar quadro', 'error');
    } finally {
      setCreating(false);
    }
  };

  /* ── Delete ───────────────────────────────────────── */
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Eliminar este quadro e todas as suas tarefas?')) return;
    try {
      await apiService.deleteBoard(id);
      showToast('Quadro eliminado.');
      await fetchBoards(false);
    } catch (err) {
      showToast(err.message || 'Erro ao eliminar', 'error');
    }
  };

  /* ── Greeting ─────────────────────────────────────── */
  const hour      = new Date().getHours();
  const greeting  = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  const firstName = user?.nome?.split(' ')[0] || 'Utilizador';

  /* ════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════ */
  return (
    <div className="bp-root">

      {/* ─── Toast ───────────────────────────────────── */}
      <Toast toast={toast} />

      {/* ─── Header ──────────────────────────────────── */}
      <div className="bp-header">
        <div className="bp-header-left">
          <span className="bp-greeting">{greeting}, <strong>{firstName}</strong></span>
          <h1 className="bp-title">Meus Quadros</h1>
        </div>
        <button className="bp-btn-create" onClick={() => setIsModalOpen(true)}>
          <Plus size={18}/> Novo Quadro
        </button>
      </div>

      {/* ─── Stats ───────────────────────────────────── */}
      {!loading && boards.length > 0 && (
        <div className="bp-stats">
          <div className="bp-stat">
            <LayoutGrid size={16}/>
            <span><strong>{boards.length}</strong> quadro{boards.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      )}

      {/* ─── Content ─────────────────────────────────── */}
      {loading ? (
        <div className="bp-loading">
          <Loader2 size={32} className="bp-spin"/> Carregando…
        </div>
      ) : boards.length === 0 ? (
        <div className="bp-empty">
          <div className="bp-empty-art"><LayoutGrid size={40}/></div>
          <h3>Nenhum quadro ainda</h3>
          <p>Crie o seu primeiro quadro para começar a organizar as suas tarefas</p>
          <button className="bp-btn-create" onClick={() => setIsModalOpen(true)}>
            <Plus size={16}/> Criar Primeiro Quadro
          </button>
        </div>
      ) : (
        <div className="bp-grid">
          {boards.map(board => {
            if (!board || !board.id) return null;
            const accent    = getAccent(board.id);
            const boardName = String(board.nome || 'Sem Nome');
            const initials  = boardName.substring(0, 2).toUpperCase();
            return (
              <article
                key={board.id}
                className={`bp-card ${board.foto_fundo ? 'bp-card--has-bg' : ''}`}
                style={{
                  '--accent': accent,
                  '--accent-faint': `${accent}15`,
                  backgroundImage: board.foto_fundo
                    ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(http://localhost:5000/${board.foto_fundo})`
                    : 'none'
                }}
                onClick={() => navigate(`/dashboard?boardId=${board.id}`)}
              >
                <div className="bp-card-bar"/>

                <div className="bp-card-body">
                  <div className="bp-card-top">
                    <div className="bp-card-avatar">{initials}</div>
                    <div className="bp-card-actions">
                      <button
                        className="bp-card-edit"
                        onClick={e => openEditModal(board, e)}
                        title="Editar"
                      >
                        <Pencil size={14}/>
                      </button>
                      <button
                        className="bp-card-delete"
                        onClick={e => handleDelete(board.id, e)}
                        title="Eliminar"
                      >
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </div>

                  <h3 className="bp-card-name">{boardName}</h3>
                  <p className="bp-card-desc">{board.descricao || 'Sem descrição'}</p>

                  <div className="bp-card-preview">
                    <div className="bp-preview-col">
                      <div className="bp-preview-dot" style={{background:'#94a3b8'}}/>
                      <div className="bp-preview-bar" style={{width:'70%'}}/>
                      <div className="bp-preview-bar" style={{width:'50%'}}/>
                    </div>
                    <div className="bp-preview-col">
                      <div className="bp-preview-dot" style={{background: accent}}/>
                      <div className="bp-preview-bar" style={{width:'90%'}}/>
                    </div>
                    <div className="bp-preview-col">
                      <div className="bp-preview-dot" style={{background:'#10b981'}}/>
                      <div className="bp-preview-bar" style={{width:'60%'}}/>
                      <div className="bp-preview-bar" style={{width:'40%'}}/>
                    </div>
                  </div>
                </div>

                <div className="bp-card-footer">
                  <span className="bp-card-owner">
                    <span className="bp-owner-dot" style={{background: accent}}/>
                    {board.criador_nome}
                  </span>
                  <span className="bp-card-cta">Abrir <ArrowUpRight size={13}/></span>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ─── Modal ───────────────────────────────────── */}
      {isModalOpen && (
        <div className="bp-modal-overlay" onClick={closeModal}>
          <div className="bp-modal" onClick={e => e.stopPropagation()}>
            <div className="bp-modal-head">
              <h2>{editingBoard ? 'Editar Quadro' : 'Criar Quadro'}</h2>
              <button className="bp-modal-close" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSave} className="bp-modal-body">
              <div className="bp-field">
                <label>Nome *</label>
                <input
                  type="text"
                  value={newBoard.nome}
                  onChange={e => setNewBoard({ ...newBoard, nome: e.target.value })}
                  placeholder="Ex: Trabalho, Projeto Pessoal…"
                  required
                  autoFocus
                />
              </div>
              <div className="bp-field">
                <label>Descrição <em>(opcional)</em></label>
                <textarea
                  rows={3}
                  value={newBoard.descricao}
                  onChange={e => setNewBoard({ ...newBoard, descricao: e.target.value })}
                  placeholder="Sobre o que é este quadro?"
                />
              </div>
              <div className="bp-field">
                <label>Foto de Fundo <em>(opcional)</em></label>
                {editingBoard && editingBoard.foto_fundo && (
                  <div className="bp-current-bg">
                    <img src={`http://localhost:5000/${editingBoard.foto_fundo}`} alt="Fundo atual" />
                    <span>Fundo atual</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setNewBoard({ ...newBoard, foto_fundo: e.target.files[0] })}
                />
              </div>
              <div className="bp-modal-actions">
                <button type="button" className="bp-btn-ghost" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="bp-btn-create" disabled={creating}>
                  {creating
                    ? <><Loader2 size={15} className="bp-spin"/> {editingBoard ? 'A guardar…' : 'A criar…'}</>
                    : <><CheckCircle2 size={15}/> {editingBoard ? 'Guardar Alterações' : 'Criar Quadro'}</>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Boards;
