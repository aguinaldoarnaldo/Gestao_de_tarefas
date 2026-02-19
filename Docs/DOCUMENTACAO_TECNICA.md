# 📚 Documentação Técnica Completa — TaskFlow

**Data:** Fevereiro de 2026  
**Versão:** 1.0  
**Projeto:** Sistema de Gestão de Tarefas com Anexos

---

## Índice

1. [Visão Geral do Sistema](#1-visão-geral-do-sistema)
2. [Base de Dados — modelo_fisico.sql](#2-base-de-dados)
3. [Backend — Ficheiros Comentados](#3-backend)
   - 3.1 index.js
   - 3.2 config/database.js
   - 3.3 middlewares/authMiddleware.js
   - 3.4 middlewares/roleMiddleware.js
   - 3.5 models/User.js
   - 3.6 models/Task.js
   - 3.7 models/Attachment.js
   - 3.8 models/Permission.js
   - 3.9 controllers/authController.js
   - 3.10 controllers/userController.js
   - 3.11 controllers/taskController.js
   - 3.12 controllers/attachmentController.js
   - 3.13 controllers/permissionController.js
   - 3.14 routes/authRoutes.js
   - 3.15 routes/userRoutes.js
   - 3.16 routes/taskRoutes.js
   - 3.17 routes/attachment.routes.js
4. [Frontend — Ficheiros Comentados](#4-frontend)
   - 4.1 main.jsx
   - 4.2 App.jsx
   - 4.3 contexts/AuthContext.jsx
   - 4.4 services/api.js
   - 4.5 components/ProtectedRoute
   - 4.6 components/LoadingScreen
   - 4.7 components/MainLayout
   - 4.8 components/TaskCard
   - 4.9 components/TaskModal
   - 4.10 components/AttachmentManager
   - 4.11 pages/Home
   - 4.12 pages/Dashboard
5. [Fluxo de Autenticação](#5-fluxo-de-autenticação)
6. [Fluxo de Upload de Anexos](#6-fluxo-de-upload-de-anexos)

---

## 1. Visão Geral do Sistema

O **TaskFlow** é uma aplicação web full-stack de gestão de tarefas. O utilizador pode:

- Registar-se e autenticar-se com email e senha
- Criar, editar e eliminar tarefas com título, descrição, status e data de vencimento
- Visualizar as tarefas num quadro **Kanban** com 3 colunas (Pendente, Em Andamento, Concluída)
- Anexar ficheiros (documentos, imagens, PDFs) a cada tarefa
- Descarregar e eliminar anexos
- Editar o seu perfil e alterar a palavra-passe
- Administradores podem gerir todos os utilizadores do sistema

**Arquitectura:**
```
[Browser] ←→ [React Frontend :5173] ←→ [Express API :5000] ←→ [MySQL :3306]
```

---

## 2. Base de Dados

**Ficheiro:** `Docs/SQl/modelo_fisico.sql`

```sql
-- Cria a base de dados com suporte a caracteres Unicode (acentos, emojis, etc.)
CREATE DATABASE IF NOT EXISTS GestaoTarefas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE GestaoTarefas;

-- ============================================================
-- TABELA: Utilizador
-- Armazena todos os utilizadores do sistema.
-- O campo 'tipo' define o perfil: 'admin' tem acesso total,
-- 'membro' só gere as suas próprias tarefas.
-- ============================================================
CREATE TABLE Utilizador (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- Identificador único auto-incrementado
    nome VARCHAR(100) NOT NULL,                -- Nome completo do utilizador
    email VARCHAR(100) NOT NULL UNIQUE,        -- Email único (usado no login)
    senha VARCHAR(200) NOT NULL,               -- Hash bcrypt da palavra-passe
    tipo ENUM('admin', 'membro') NOT NULL DEFAULT 'membro', -- Perfil de acesso
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data de registo automática
);

-- ============================================================
-- TABELA: Tarefa
-- Cada tarefa pertence a um utilizador (utilizador_id).
-- O status segue um ciclo: Pendente → Em Andamento → Concluída.
-- Se o utilizador for eliminado, as suas tarefas são eliminadas
-- automaticamente (ON DELETE CASCADE).
-- ============================================================
CREATE TABLE Tarefa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,              -- Título obrigatório da tarefa
    descricao TEXT,                            -- Descrição detalhada (opcional)
    status ENUM('Pendente', 'Em Andamento', 'Concluída') NOT NULL DEFAULT 'Pendente',
    data_vencimento DATE DEFAULT NULL,         -- Prazo da tarefa (opcional)
    utilizador_id INT NOT NULL,                -- Chave estrangeira para o criador
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (utilizador_id) REFERENCES Utilizador(id) ON DELETE CASCADE
);

-- ============================================================
-- TABELA: Anexo
-- Regista os metadados dos ficheiros enviados para cada tarefa.
-- O ficheiro físico é guardado no disco (pasta uploads/).
-- Se a tarefa for eliminada, os seus anexos são eliminados
-- automaticamente (ON DELETE CASCADE).
-- ============================================================
CREATE TABLE Anexo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_arquivo VARCHAR(255) NOT NULL,        -- Nome original do ficheiro
    caminho_arquivo VARCHAR(500) NOT NULL,     -- Caminho no disco (uploads/...)
    tipo_arquivo VARCHAR(100),                 -- MIME type (image/png, application/pdf...)
    tamanho_arquivo INT,                       -- Tamanho em bytes
    tarefa_id INT NOT NULL,                    -- Tarefa à qual o anexo pertence
    data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tarefa_id) REFERENCES Tarefa(id) ON DELETE CASCADE
);

-- ============================================================
-- TABELA: Permissao
-- Catálogo de permissões granulares (ex: "criar_tarefa").
-- Permite extensão futura do sistema de controlo de acesso.
-- ============================================================
CREATE TABLE Permissao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL               -- Nome descritivo da permissão
);

-- ============================================================
-- TABELA: Permissao_Utilizador
-- Tabela de junção N:N entre Utilizador e Permissao.
-- Chave primária composta garante que não há duplicados.
-- ============================================================
CREATE TABLE Permissao_Utilizador (
    utilizador_id INT NOT NULL,
    permissao_id INT NOT NULL,
    PRIMARY KEY (utilizador_id, permissao_id), -- Chave composta evita duplicados
    FOREIGN KEY (utilizador_id) REFERENCES Utilizador(id) ON DELETE CASCADE,
    FOREIGN KEY (permissao_id) REFERENCES Permissao(id) ON DELETE CASCADE
);
```

---

## 3. Backend

### 3.1 `src/index.js` — Ponto de Entrada

```javascript
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config(); // Carrega variáveis do ficheiro .env

const app = express();
const PORT = process.env.PORT || 5000; // Porta configurável via .env

// ── Middlewares globais ──────────────────────────────────────
app.use(cors());           // Permite requisições de origens diferentes (frontend :5173)
app.use(morgan('dev'));    // Regista cada requisição no terminal (método, rota, status, tempo)
app.use(express.json());  // Interpreta o corpo das requisições como JSON

// ── Rotas da API ─────────────────────────────────────────────
app.use('/api/auth', require('./routes/authRoutes'));           // Autenticação
app.use('/api/users', require('./routes/userRoutes'));          // Gestão de utilizadores
app.use('/api/tasks', require('./routes/taskRoutes'));          // Gestão de tarefas
app.use('/api/attachments', require('./routes/attachment.routes.js')); // Anexos

// Serve os ficheiros enviados (uploads) como estáticos
app.use('/uploads', express.static('uploads'));

// Rota raiz para verificar se a API está activa
app.get('/', (req, res) => {
  res.send('API de Gestão de Tarefas está rodando!');
});

// ── Tratamento global de erros ───────────────────────────────
// Captura qualquer erro não tratado nos controllers
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack);
  res.status(500).json({ 
    message: 'Ocorreu um erro interno no servidor.',
    // Em desenvolvimento mostra a mensagem de erro; em produção oculta
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

---

### 3.2 `src/config/database.js` — Conexão MySQL

```javascript
const mysql = require('mysql2');
require('dotenv').config();

// Cria um pool de conexões (mais eficiente que uma conexão única)
// O pool reutiliza conexões existentes em vez de criar uma nova a cada query
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Endereço do servidor MySQL
  user: process.env.DB_USER,       // Utilizador MySQL
  password: process.env.DB_PASS,   // Palavra-passe MySQL
  database: process.env.DB_NAME,   // Nome da base de dados
  waitForConnections: true,         // Aguarda se não houver conexões disponíveis
  connectionLimit: 10,              // Máximo de 10 conexões simultâneas
  queueLimit: 0                     // Sem limite de fila de espera
});

// Testa a conexão ao iniciar o servidor
pool.getConnection((err, connection) => {
  if (err) {
    console.error('DATABASE ERROR:', err.message);
  } else {
    console.log('Database connected successfully');
    connection.release(); // Liberta a conexão de volta ao pool
  }
});

// Exporta o pool com suporte a Promises (permite usar async/await)
module.exports = pool.promise();
```

---

### 3.3 `src/middlewares/authMiddleware.js` — Verificação JWT

```javascript
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware que protege rotas privadas
// Deve ser usado antes de qualquer controller que exija autenticação
const authMiddleware = (req, res, next) => {
  // Extrai o token do cabeçalho Authorization (formato: "Bearer <token>")
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Se não houver token, rejeita a requisição com 401 (Não Autorizado)
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    // Verifica e descodifica o token usando a chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Injeta os dados do utilizador (id, tipo) no objecto req
    // para que os controllers possam aceder a req.user
    req.user = decoded;
    next(); // Passa para o próximo middleware ou controller
  } catch (error) {
    // Token inválido, expirado ou adulterado
    res.status(400).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
```

---

### 3.4 `src/middlewares/roleMiddleware.js` — Controlo de Perfil

```javascript
// Middleware de autorização por perfil
// Deve ser usado APÓS o authMiddleware (req.user já está disponível)
exports.isAdmin = (req, res, next) => {
  // Verifica se o utilizador existe e tem perfil de administrador
  if (req.user && req.user.tipo === 'admin') {
    next(); // Utilizador é admin, prossegue
  } else {
    // Utilizador autenticado mas sem permissão de admin
    res.status(403).json({ message: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
  }
};
```

---

### 3.5 `src/models/User.js` — Modelo de Utilizador

```javascript
const db = require('../config/database');

const User = {
  // Insere um novo utilizador na base de dados
  // Retorna o ID do registo criado
  create: async (userData) => {
    const { nome, email, senha, tipo } = userData;
    const [result] = await db.query(
      'INSERT INTO Utilizador (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
      [nome, email, senha, tipo]
      // Os '?' são parâmetros preparados — previnem SQL Injection
    );
    return result.insertId;
  },

  // Busca utilizador pelo email (usado no login)
  // Retorna o registo completo incluindo a senha (hash)
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM Utilizador WHERE email = ?', [email]);
    return rows[0]; // undefined se não encontrado
  },

  // Busca utilizador pelo ID (usado para verificar sessão)
  // NÃO retorna a senha por segurança
  findById: async (id) => {
    const [rows] = await db.query('SELECT id, nome, email, tipo FROM Utilizador WHERE id = ?', [id]);
    return rows[0];
  },

  // Lista todos os utilizadores sem expor senhas
  getAll: async () => {
    const [rows] = await db.query('SELECT id, nome, email, tipo FROM Utilizador');
    return rows;
  },

  // Obtém as permissões granulares de um utilizador via JOIN
  getPermissions: async (userId) => {
    const [rows] = await db.query(`
      SELECT p.nome 
      FROM Permissao p
      JOIN Permissao_Utilizador pu ON p.id = pu.permissao_id
      WHERE pu.utilizador_id = ?
    `, [userId]);
    return rows.map(row => row.nome); // Retorna apenas os nomes como array
  },

  // Atualização dinâmica — só actualiza os campos fornecidos
  // Evita sobrescrever campos com undefined
  update: async (id, userData) => {
    const fields = [];
    const values = [];
    
    // Constrói a query dinamicamente com apenas os campos presentes
    if (userData.nome !== undefined) { fields.push('nome = ?'); values.push(userData.nome); }
    if (userData.email !== undefined) { fields.push('email = ?'); values.push(userData.email); }
    if (userData.senha !== undefined) { fields.push('senha = ?'); values.push(userData.senha); }
    if (userData.tipo !== undefined) { fields.push('tipo = ?'); values.push(userData.tipo); }
    
    values.push(id); // O ID vai no final para o WHERE
    
    await db.query(
      `UPDATE Utilizador SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
  },

  // Remove o utilizador e, por CASCADE, as suas tarefas e anexos
  delete: async (id) => {
    await db.query('DELETE FROM Utilizador WHERE id = ?', [id]);
  }
};

module.exports = User;
```

---

### 3.6 `src/models/Task.js` — Modelo de Tarefa

```javascript
const db = require('../config/database');

const Task = {
  // Cria nova tarefa associada a um utilizador
  create: async (taskData) => {
    const { titulo, descricao, status, data_vencimento, utilizador_id } = taskData;
    const [result] = await db.query(
      'INSERT INTO Tarefa (titulo, descricao, status, data_vencimento, utilizador_id) VALUES (?, ?, ?, ?, ?)',
      [titulo, descricao, status, data_vencimento, utilizador_id]
    );
    return result.insertId;
  },

  // Lista todas as tarefas com o nome do utilizador (JOIN)
  // Útil para painéis administrativos
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT t.*, u.nome as utilizador_nome 
      FROM Tarefa t 
      JOIN Utilizador u ON t.utilizador_id = u.id
    `);
    return rows;
  },

  // Busca uma tarefa específica pelo ID
  // Usado para verificar propriedade antes de editar/eliminar
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM Tarefa WHERE id = ?', [id]);
    return rows[0];
  },

  // Lista apenas as tarefas de um utilizador específico
  // Garante isolamento de dados entre utilizadores
  getByUserId: async (userId) => {
    const [rows] = await db.query('SELECT * FROM Tarefa WHERE utilizador_id = ?', [userId]);
    return rows;
  },

  // Actualiza todos os campos editáveis de uma tarefa
  update: async (id, taskData) => {
    const { titulo, descricao, status, data_vencimento } = taskData;
    await db.query(
      'UPDATE Tarefa SET titulo = ?, descricao = ?, status = ?, data_vencimento = ? WHERE id = ?',
      [titulo, descricao, status, data_vencimento, id]
    );
  },

  // Remove a tarefa e, por CASCADE, todos os seus anexos
  delete: async (id) => {
    await db.query('DELETE FROM Tarefa WHERE id = ?', [id]);
  }
};

module.exports = Task;
```

---

### 3.7 `src/models/Attachment.js` — Modelo de Anexo

```javascript
const db = require('../config/database');

const Attachment = {
  // Regista os metadados do ficheiro após upload pelo Multer
  create: async (attachmentData) => {
    const { nome_arquivo, caminho_arquivo, tipo_arquivo, tamanho_arquivo, tarefa_id } = attachmentData;
    const [result] = await db.query(
      'INSERT INTO Anexo (nome_arquivo, caminho_arquivo, tipo_arquivo, tamanho_arquivo, tarefa_id) VALUES (?, ?, ?, ?, ?)',
      [nome_arquivo, caminho_arquivo, tipo_arquivo, tamanho_arquivo, tarefa_id]
    );
    return result.insertId;
  },

  // Lista todos os anexos de uma tarefa
  getByTaskId: async (taskId) => {
    const [rows] = await db.query('SELECT * FROM Anexo WHERE tarefa_id = ?', [taskId]);
    return rows;
  },

  // Busca um anexo pelo ID (para verificar propriedade antes de eliminar)
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM Anexo WHERE id = ?', [id]);
    return rows[0];
  },

  // Remove o registo do anexo da base de dados
  // O ficheiro físico é eliminado separadamente no controller
  delete: async (id) => {
    await db.query('DELETE FROM Anexo WHERE id = ?', [id]);
  },

  // Remove todos os anexos de uma tarefa (útil ao eliminar tarefa)
  deleteByTaskId: async (taskId) => {
    await db.query('DELETE FROM Anexo WHERE tarefa_id = ?', [taskId]);
  }
};

module.exports = Attachment;
```

---

### 3.8 `src/models/Permission.js` — Modelo de Permissão

```javascript
const db = require('../config/database');

const Permission = {
  // Lista todas as permissões disponíveis no sistema
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM Permissao');
    return rows;
  },

  // Cria uma nova permissão no catálogo
  create: async (nome) => {
    const [result] = await db.query('INSERT INTO Permissao (nome) VALUES (?)', [nome]);
    return result.insertId;
  },

  // Atribui uma permissão a um utilizador (tabela de junção)
  assignToUser: async (utilizador_id, permissao_id) => {
    await db.query(
      'INSERT INTO Permissao_Utilizador (utilizador_id, permissao_id) VALUES (?, ?)',
      [utilizador_id, permissao_id]
    );
  },

  // Remove uma permissão de um utilizador
  removeFromUser: async (utilizador_id, permissao_id) => {
    await db.query(
      'DELETE FROM Permissao_Utilizador WHERE utilizador_id = ? AND permissao_id = ?',
      [utilizador_id, permissao_id]
    );
  },

  // Lista todas as permissões de um utilizador específico
  getByUserId: async (userId) => {
    const [rows] = await db.query(`
      SELECT p.* FROM Permissao p
      JOIN Permissao_Utilizador pu ON p.id = pu.permissao_id
      WHERE pu.utilizador_id = ?
    `, [userId]);
    return rows;
  }
};

module.exports = Permission;
```

---

### 3.9 `src/controllers/authController.js` — Autenticação

```javascript
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST /api/auth/register — Registo de novo utilizador
exports.register = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    // Verifica se o email já está registado
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    // Gera um salt aleatório e cria o hash da senha
    // bcrypt com 10 rounds é o padrão seguro recomendado
    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);

    // Cria o utilizador com o hash (nunca a senha em texto simples)
    const userId = await User.create({
      nome,
      email,
      senha: hashedSenha,
      tipo: tipo || 'membro' // Por defeito é 'membro'
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso!', userId });
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};

// POST /api/auth/login — Autenticação e emissão de token
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Busca o utilizador pelo email
    const user = await User.findByEmail(email);
    if (!user) {
      // Mensagem genérica para não revelar se o email existe
      return res.status(400).json({ message: 'Email ou senha incorretos.' });
    }

    // Compara a senha fornecida com o hash armazenado
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou senha incorretos.' });
    }

    // Gera o token JWT com payload mínimo (id e tipo)
    // Expira em 1 dia — o utilizador terá de fazer login novamente
    const token = jwt.sign(
      { id: user.id, tipo: user.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Devolve o token e os dados públicos do utilizador
    res.json({
      token,
      user: { id: user.id, nome: user.nome, email: user.email, tipo: user.tipo }
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};
```

---

### 3.10 `src/controllers/userController.js` — Gestão de Utilizadores

```javascript
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET /api/auth/me — Perfil do utilizador autenticado
exports.getProfile = async (req, res) => {
  try {
    // req.user.id foi injectado pelo authMiddleware
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    
    // Inclui as permissões granulares no perfil
    const permissions = await User.getPermissions(req.user.id);
    res.json({ ...user, permissions });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil.' });
  }
};

// GET /api/users — Lista todos (apenas admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

// PUT /api/users/:id — Actualiza utilizador (apenas admin)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, tipo } = req.body;
    const updateData = { nome, email, tipo };
    
    // Se uma nova senha foi fornecida, faz o hash antes de guardar
    if (senha) {
      const salt = await bcrypt.genSalt(10);
      updateData.senha = await bcrypt.hash(senha, salt);
    }
    
    await User.update(id, updateData);
    res.json({ message: 'Utilizador atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar utilizador.' });
  }
};

// DELETE /api/users/:id — Elimina utilizador (apenas admin)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Impede que o admin elimine a sua própria conta
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ message: 'Você não pode excluir sua própria conta.' });
    }
    
    await User.delete(id);
    res.json({ message: 'Utilizador excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir utilizador.' });
  }
};

// PUT /api/users/profile — Utilizador actualiza o seu próprio perfil
exports.updateProfile = async (req, res) => {
  try {
    const { nome, email } = req.body;
    
    // Verifica se o novo email já está em uso por outro utilizador
    if (email) {
      const existingUser = await User.findByEmail(email);
      if (existingUser && existingUser.id !== req.user.id) {
        return res.status(400).json({ message: 'Este email já está em uso por outro utilizador.' });
      }
    }
    
    await User.update(req.user.id, { nome, email });
    
    // Devolve os dados actualizados para o frontend actualizar o contexto
    const updatedUser = await User.findById(req.user.id);
    res.json({ message: 'Perfil atualizado com sucesso!', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar perfil.' });
  }
};

// PUT /api/users/change-password — Altera palavra-passe
exports.changePassword = async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body;
    
    // Busca o utilizador com a senha (findById não retorna a senha)
    const user = await User.findByEmail((await User.findById(req.user.id)).email);
    
    // Verifica se a senha actual está correcta antes de alterar
    const isMatch = await bcrypt.compare(senhaAtual, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha atual incorreta.' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(novaSenha, salt);
    
    await User.update(req.user.id, { senha: hashedPassword });
    res.json({ message: 'Senha alterada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao alterar senha.' });
  }
};

// GET /api/users/stats — Estatísticas das tarefas do utilizador
exports.getUserStats = async (req, res) => {
  try {
    const Task = require('../models/Task');
    const tasks = await Task.getByUser(req.user.id);
    
    // Calcula contagens por status
    const stats = {
      total: tasks.length,
      concluidas: tasks.filter(t => t.status === 'Concluída').length,
      emAndamento: tasks.filter(t => t.status === 'Em Andamento').length,
      pendentes: tasks.filter(t => t.status === 'Pendente').length
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar estatísticas.' });
  }
};
```

---

### 3.11 `src/controllers/taskController.js` — Gestão de Tarefas

```javascript
const Task = require('../models/Task');

// POST /api/tasks — Cria nova tarefa
exports.createTask = async (req, res) => {
  try {
    const { titulo, descricao, status, data_vencimento } = req.body;
    const utilizador_id = req.user.id; // ID do utilizador autenticado

    // Validação: a data de vencimento não pode ser no passado
    if (data_vencimento) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Compara apenas a data, sem hora
      const dueDate = new Date(data_vencimento);
      if (dueDate < today) {
        return res.status(400).json({ message: 'A data de vencimento deve ser uma data futura.' });
      }
    }

    const taskId = await Task.create({
      titulo, descricao,
      status: status || 'Pendente', // Status por defeito
      data_vencimento,
      utilizador_id
    });

    res.status(201).json({ message: 'Tarefa criada com sucesso!', taskId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa.' });
  }
};

// GET /api/tasks — Lista tarefas do utilizador autenticado
exports.getAllTasks = async (req, res) => {
  try {
    // Cada utilizador só vê as suas próprias tarefas
    const tasks = await Task.getByUserId(req.user.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas.' });
  }
};

// PUT /api/tasks/:id — Actualiza tarefa (apenas o criador)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, status, data_vencimento } = req.body;

    const task = await Task.getById(id);
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });

    // Verifica se o utilizador autenticado é o criador da tarefa
    if (task.utilizador_id !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado. Somente o criador pode editar esta tarefa.' });
    }

    // Valida a data de vencimento se foi alterada
    if (data_vencimento) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dueDate = new Date(data_vencimento);
      if (dueDate < today) {
        return res.status(400).json({ message: 'A data de vencimento deve ser uma data futura.' });
      }
    }

    await Task.update(id, { titulo, descricao, status, data_vencimento });
    res.json({ message: 'Tarefa atualizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa.' });
  }
};

// DELETE /api/tasks/:id — Elimina tarefa (apenas o criador)
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.getById(id);
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });

    // Apenas o criador pode eliminar a tarefa
    if (task.utilizador_id !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado. Somente o criador pode excluir esta tarefa.' });
    }

    await Task.delete(id); // O CASCADE elimina os anexos associados
    res.json({ message: 'Tarefa excluída com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir tarefa.' });
  }
};
```

---

### 3.12 `src/controllers/attachmentController.js` — Gestão de Anexos

```javascript
const Attachment = require('../models/Attachment');
const Task = require('../models/Task');
const path = require('path');
const fs = require('fs'); // Módulo nativo para operações no sistema de ficheiros

// POST /api/attachments/task/:taskId — Upload de ficheiro
exports.uploadAttachment = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    // Verifica se o Multer processou um ficheiro
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    const task = await Task.getById(taskId);
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });

    // Apenas o criador da tarefa pode adicionar anexos
    if (task.utilizador_id !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado. Somente o criador pode anexar arquivos.' });
    }

    // Regista os metadados do ficheiro (o Multer já guardou o ficheiro no disco)
    const attachmentId = await Attachment.create({
      nome_arquivo: req.file.originalname,   // Nome original do ficheiro
      caminho_arquivo: req.file.path,         // Caminho no disco (ex: uploads/1234-foto.jpg)
      tipo_arquivo: req.file.mimetype,        // MIME type (image/jpeg, application/pdf...)
      tamanho_arquivo: req.file.size,         // Tamanho em bytes
      tarefa_id: taskId
    });

    res.status(201).json({ message: 'Arquivo anexado com sucesso!', attachmentId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao anexar arquivo.' });
  }
};

// DELETE /api/attachments/:id — Elimina anexo
exports.deleteAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const attachment = await Attachment.getById(id);
    if (!attachment) return res.status(404).json({ message: 'Anexo não encontrado.' });

    const task = await Task.getById(attachment.tarefa_id);
    
    // Apenas o criador da tarefa pode eliminar os seus anexos
    if (task.utilizador_id !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    // Elimina o ficheiro físico do disco antes de remover o registo da BD
    if (fs.existsSync(attachment.caminho_arquivo)) {
      fs.unlinkSync(attachment.caminho_arquivo);
    }

    await Attachment.delete(id);
    res.json({ message: 'Anexo excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir anexo.' });
  }
};

// GET /api/attachments/:id/download — Descarrega ficheiro
exports.downloadAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const attachment = await Attachment.getById(id);
    if (!attachment) return res.status(404).json({ message: 'Anexo não encontrado.' });

    const task = await Task.getById(attachment.tarefa_id);
    if (task.utilizador_id !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    // res.download() envia o ficheiro com o nome original como Content-Disposition
    res.download(attachment.caminho_arquivo, attachment.nome_arquivo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao baixar arquivo.' });
  }
};
```

---

### 3.17 `src/routes/attachment.routes.js` — Configuração do Multer

```javascript
const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configura onde e como os ficheiros são guardados no disco
const storage = multer.diskStorage({
  // Define a pasta de destino, criando-a se não existir
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!require('fs').existsSync(uploadPath)) {
      require('fs').mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  // Gera um nome único usando o timestamp actual + nome original
  // Evita colisões entre ficheiros com o mesmo nome
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.use(authMiddleware); // Todas as rotas de anexos requerem autenticação

router.post('/task/:taskId', upload.single('file'), attachmentController.uploadAttachment);
router.get('/task/:taskId', attachmentController.getTaskAttachments);
router.get('/:id/download', attachmentController.downloadAttachment);
router.delete('/:id', attachmentController.deleteAttachment);
```

---

## 4. Frontend

### 4.1 `src/main.jsx` — Ponto de Entrada React

```jsx
// Ponto de entrada da aplicação React
// Monta o componente App no elemento #root do index.html
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  {/* Activa avisos adicionais em desenvolvimento */}
    <App />
  </React.StrictMode>,
)
```

---

### 4.2 `src/App.jsx` — Roteamento Principal

```jsx
function App() {
  // Estado para controlar o ecrã de carregamento inicial
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Após 2 segundos, inicia o fade-out do ecrã de carregamento
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Aguarda 500ms (duração da animação CSS) antes de remover do DOM
      setTimeout(() => setIsLoading(false), 500);
    }, 2000);

    return () => clearTimeout(timer); // Limpa o timer se o componente desmontar
  }, []);

  return (
    <>
      {/* Ecrã de carregamento sobreposto (z-index alto) */}
      {isLoading && <LoadingScreen fadeOut={fadeOut} />}
      
      {/* AuthProvider fornece o contexto de autenticação a toda a app */}
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            
            {/* Rotas protegidas — requerem autenticação */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout title="O meu Quadro">
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Rota exclusiva para administradores */}
            <Route path="/users" element={
              <ProtectedRoute adminOnly>
                <MainLayout title="Gestão de Utilizadores">
                  <Users />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Qualquer rota desconhecida redireciona para a página inicial */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}
```

---

### 4.3 `src/contexts/AuthContext.jsx` — Contexto de Autenticação

```jsx
// Cria o contexto — valor inicial null
const AuthContext = createContext(null);

// Hook personalizado para consumir o contexto
// Lança erro se usado fora do AuthProvider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Inicializa o token a partir do localStorage (persiste entre sessões)
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // Quando o token muda, carrega os dados do utilizador da API
  useEffect(() => {
    if (token) {
      loadUser(); // Valida o token e carrega o perfil
    } else {
      setLoading(false); // Sem token, não há utilizador autenticado
    }
  }, [token]);

  // Carrega o perfil do utilizador a partir do token existente
  const loadUser = async () => {
    try {
      const userData = await apiService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      logout(); // Token inválido ou expirado — faz logout
    } finally {
      setLoading(false);
    }
  };

  // Autentica o utilizador e guarda o token no localStorage
  const login = async (email, senha) => {
    const response = await apiService.login(email, senha);
    const { token: newToken, user: userData } = response;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    return response;
  };

  // Remove o token e limpa o estado de autenticação
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Verifica se o utilizador tem perfil de administrador
  const isAdmin = () => user?.tipo === 'admin';

  // Valor exposto a todos os componentes filhos
  const value = {
    user, token, loading,
    login, register, logout, isAdmin,
    isAuthenticated: !!user // true se user não for null
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

---

### 4.4 `src/services/api.js` — Serviço de API

```javascript
class ApiService {
  // Constrói os cabeçalhos de autenticação para cada requisição
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Token JWT no cabeçalho
    };
  }

  // Método genérico para todas as requisições HTTP
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options // Permite sobrescrever headers e método
    };

    // Para uploads (FormData), o browser define o Content-Type automaticamente
    // com o boundary correcto — não deve ser definido manualmente
    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      // Extrai a mensagem de erro da resposta JSON da API
      const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return await response.json();
  }

  // Upload de ficheiro — usa FormData para multipart/form-data
  async uploadAttachment(taskId, file) {
    const formData = new FormData();
    formData.append('file', file); // Campo 'file' esperado pelo Multer
    
    return this.request(`/attachments/task/${taskId}`, {
      method: 'POST',
      body: formData // FormData activa a remoção do Content-Type
    });
  }

  // Download de ficheiro — retorna um Blob para criar URL temporária
  async downloadAttachment(attachmentId) {
    const url = `${this.baseURL}/attachments/${attachmentId}/download`;
    const token = localStorage.getItem('token');
    
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) throw new Error('Erro ao baixar arquivo');
    return response.blob(); // Blob permite criar URL temporária com URL.createObjectURL()
  }
}

// Singleton — uma única instância partilhada por toda a aplicação
const apiService = new ApiService();
export default apiService;
```

---

### 4.5 `components/ProtectedRoute/ProtectedRoute.jsx`

```jsx
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  // Enquanto o AuthContext verifica o token, mostra um indicador de carregamento
  if (loading) return <div>Carregando...</div>;

  // Utilizador não autenticado → redireciona para login
  if (!user) return <Navigate to="/login" replace />;

  // Rota exclusiva para admin mas utilizador não é admin → redireciona para dashboard
  if (adminOnly && user.tipo !== 'admin') return <Navigate to="/dashboard" replace />;

  // Tudo OK — renderiza o conteúdo protegido
  return children;
};
```

---

### 4.6 `components/AttachmentManager/AttachmentManager.jsx`

```jsx
const AttachmentManager = ({ taskId }) => {
  // Estado para controlar o drag & drop
  const [dragActive, setDragActive] = useState(false);

  // Gere os eventos de drag (enter, over, leave)
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Activa o estado visual de "drag activo" ao entrar/passar
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  // Processa os ficheiros largados na área de drop
  const handleDrop = async (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = [...e.dataTransfer.files]; // Converte FileList para Array
    await uploadFiles(files);
  };

  // Faz upload de múltiplos ficheiros sequencialmente
  const uploadFiles = async (files) => {
    setUploading(true);
    for (const file of files) {
      // Valida o tamanho antes de enviar (10MB = 10 * 1024 * 1024 bytes)
      if (file.size > 10 * 1024 * 1024) {
        alert(`Arquivo ${file.name} é muito grande. Máximo: 10MB`);
        continue; // Salta para o próximo ficheiro
      }
      await apiService.uploadAttachment(taskId, file);
    }
    await fetchAttachments(); // Recarrega a lista após uploads
    setUploading(false);
  };

  // Download: cria URL temporária a partir do Blob e simula clique num link
  const handleDownload = async (attachment) => {
    const blob = await apiService.downloadAttachment(attachment.id);
    const url = window.URL.createObjectURL(blob); // URL temporária na memória
    const a = document.createElement('a');
    a.href = url;
    a.download = attachment.nome_arquivo; // Nome do ficheiro no download
    document.body.appendChild(a);
    a.click(); // Simula clique para iniciar download
    window.URL.revokeObjectURL(url); // Liberta a memória
    document.body.removeChild(a);
  };

  // Devolve ícone adequado ao tipo MIME do ficheiro
  const getFileIcon = (tipo) => {
    if (tipo?.startsWith('image/')) return <Image size={20} />;
    if (tipo?.includes('pdf')) return <FileText size={20} />;
    return <File size={20} />; // Ícone genérico para outros tipos
  };

  // Formata bytes para unidade legível (B, KB, MB)
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
};
```

---

### 4.12 `pages/Dashboard/Dashboard.jsx` — Quadro Kanban

```jsx
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // null = nova tarefa

  // Carrega as tarefas ao montar o componente
  useEffect(() => { fetchTasks(); }, []);

  // Abre o modal em modo de criação (sem tarefa seleccionada)
  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  // Abre o modal em modo de edição com a tarefa seleccionada
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Guarda a tarefa (cria ou actualiza conforme selectedTask)
  const handleSaveTask = async (taskData) => {
    if (selectedTask) {
      await apiService.updateTask(selectedTask.id, taskData);
    } else {
      await apiService.createTask(taskData);
    }
    await fetchTasks(); // Recarrega para reflectir as alterações
    setIsModalOpen(false);
  };

  // Define as 3 colunas do Kanban com ícone e título
  const columns = [
    { title: 'Pendente', icon: <Circle size={18} color="#94a3b8" /> },
    { title: 'Em Andamento', icon: <RotateCcw size={18} color="#0061ff" /> },
    { title: 'Concluída', icon: <CheckCheck size={18} color="#10b981" /> },
  ];

  return (
    <KanbanBoard>
      {columns.map((col) => (
        <KanbanColumn>
          <ColumnHeader>
            {col.icon}
            <h2>{col.title}</h2>
            {/* Contador de tarefas nesta coluna */}
            <TaskCount>{tasks.filter(t => t.status === col.title).length}</TaskCount>
          </ColumnHeader>

          <TaskListContainer>
            {/* Filtra e renderiza apenas as tarefas desta coluna */}
            {tasks
              .filter(task => task.status === col.title)
              .map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  canEdit={true}
                />
              ))
            }
            
            {/* Botão para adicionar tarefa nesta coluna */}
            <AddTaskButton onClick={handleCreateTask}>
              <Plus size={18} /> Adicionar cartão
            </AddTaskButton>
          </TaskListContainer>
        </KanbanColumn>
      ))}
    </KanbanBoard>
  );
};
```

---

## 5. Fluxo de Autenticação

```
1. Utilizador preenche email + senha em /login
2. Frontend chama POST /api/auth/login
3. Backend verifica email na BD → compara senha com bcrypt
4. Se válido → gera JWT com {id, tipo} e expira em 1 dia
5. Frontend guarda token no localStorage
6. AuthContext actualiza estado: user = dados do utilizador
7. React Router redireciona para /dashboard
8. Em cada requisição seguinte, o token é enviado no cabeçalho Authorization
9. authMiddleware verifica e descodifica o token → injeta req.user
10. Ao fechar o browser, o token persiste no localStorage
11. Ao reabrir, AuthContext lê o token e chama GET /api/auth/me para validar
```

---

## 6. Fluxo de Upload de Anexos

```
1. Utilizador abre detalhes de uma tarefa (TaskCard)
2. AttachmentManager carrega lista de anexos existentes (GET /api/attachments/task/:id)
3. Utilizador arrasta ficheiro ou clica para seleccionar
4. Frontend valida tamanho (máx 10MB)
5. Frontend cria FormData com o ficheiro e chama POST /api/attachments/task/:id
6. Multer (backend) guarda o ficheiro em uploads/ com nome único (timestamp + nome original)
7. attachmentController regista os metadados na tabela Anexo
8. Frontend recarrega a lista de anexos
9. Para download: GET /api/attachments/:id/download → res.download() envia o ficheiro
10. Frontend cria URL temporária com URL.createObjectURL(blob) e simula clique
```
