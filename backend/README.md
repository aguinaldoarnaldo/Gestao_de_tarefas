# ⚙️ TaskFlow — Backend

API REST da aplicação TaskFlow, construída com **Node.js + Express + MySQL**, com autenticação JWT e suporte a tempo real via **Socket.io**.

---

## 🗂️ Estrutura de Pastas

```text
backend/
├── src/
│   ├── config/
│   │   └── db.js               # Pool de conexão ao MySQL
│   ├── controllers/
│   │   ├── authController.js   # Registo e login de utilizadores
│   │   ├── userController.js   # Gestão do perfil do utilizador
│   │   ├── boardController.js  # CRUD de quadros
│   │   ├── taskController.js   # CRUD de tarefas com filtros
│   │   └── attachmentController.js  # Upload e remoção de anexos
│   ├── middlewares/
│   │   ├── auth.js             # Verificação do token JWT
│   │   └── upload.js           # Configuração do Multer (upload de ficheiros)
│   ├── models/
│   │   ├── User.js             # Model de utilizador
│   │   ├── Board.js            # Model de quadro
│   │   ├── Task.js             # Model de tarefa
│   │   └── Attachment.js       # Model de anexo
│   ├── routes/
│   │   ├── authRoutes.js       # POST /register, POST /login
│   │   ├── userRoutes.js       # GET/PUT /users/profile
│   │   ├── boardRoutes.js      # CRUD /boards
│   │   ├── taskRoutes.js       # CRUD /tasks
│   │   └── attachmentRoutes.js # POST/DELETE /attachments
│   └── index.js                # Entrada do servidor + Socket.io
├── uploads/                    # Ficheiros enviados pelos utilizadores
├── .env                        # Variáveis de ambiente (não versionado)
└── package.json
```

---

## 📡 Endpoints da API

### Autenticação — `/api/auth`

| Método | Rota | Descrição | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Criar nova conta | ❌ |
| `POST` | `/api/auth/login` | Iniciar sessão + obter token | ❌ |

### Utilizadores — `/api/users`

| Método | Rota | Descrição | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/profile` | Obter dados do perfil | ✅ |
| `PUT` | `/api/users/profile` | Atualizar nome e email | ✅ |

### Quadros — `/api/boards`

| Método | Rota | Descrição | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/boards` | Listar quadros do utilizador | ✅ |
| `POST` | `/api/boards` | Criar novo quadro | ✅ |
| `PUT` | `/api/boards/:id` | Atualizar quadro | ✅ |
| `DELETE` | `/api/boards/:id` | Eliminar quadro | ✅ |

### Tarefas — `/api/tasks`

| Método | Rota | Descrição | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Listar tarefas (filtros: `boardId`, `status`, `prioridade`) | ✅ |
| `GET` | `/api/tasks/:id` | Obter uma tarefa com anexos | ✅ |
| `POST` | `/api/tasks` | Criar nova tarefa | ✅ |
| `PUT` | `/api/tasks/:id` | Atualizar tarefa | ✅ |
| `DELETE` | `/api/tasks/:id` | Eliminar tarefa | ✅ |

### Anexos — `/api/attachments`

| Método | Rota | Descrição | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/attachments` | Fazer upload de anexo (multipart/form-data) | ✅ |
| `DELETE` | `/api/attachments/:id` | Remover anexo | ✅ |
| `GET` | `/uploads/:ficheiro` | Aceder ao ficheiro guardado | ❌ |

---

## 🗄️ Modelo de Dados

```
Utilizador (1) ──── (N) Quadro
Quadro     (1) ──── (N) Tarefa
Tarefa     (1) ──── (N) Anexo
```

### Tabelas principais

| Tabela | Campos relevantes |
| :--- | :--- |
| `utilizadores` | `id`, `nome`, `email`, `senha`, `criado_em` |
| `quadros` | `id`, `nome`, `descricao`, `utilizador_id`, `criado_em` |
| `tarefas` | `id`, `titulo`, `descricao`, `status`, `prioridade`, `data_vencimento`, `quadro_id`, `utilizador_id` |
| `anexos` | `id`, `nome_ficheiro`, `caminho`, `tamanho`, `tarefa_id`, `criado_em` |

---

## 🛠️ Configuração e Execução

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um ficheiro `.env` na raiz do `backend/`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=GestaoTarefas
JWT_SECRET=chave_secreta_longa_e_segura
PORT=5000
```

### 3. Inicializar a base de dados

```sql
-- Execute o ficheiro:
Docs/SQl/modelo_fisico.sql
```

### 4. Executar o servidor

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

O servidor ficará disponível em: **http://localhost:5000**

---

## 🔐 Segurança

- Senhas guardadas com **bcrypt** (hash + salt)
- Todos os endpoints protegidos verificam o header `Authorization: Bearer <token>`
- Tokens JWT com expiração configurável via `JWT_SECRET`
- Upload de ficheiros limitado em tamanho e tipo via **Multer**
- CORS configurado para aceitar pedidos do frontend

---

## 🔌 Socket.io

O servidor suporta comunicação em **tempo real** para atualizações de quadros:

```js
// O cliente conecta-se e entra numa sala de quadro
socket.emit('join_board', boardId);

// O servidor emite eventos quando tarefas são criadas/atualizadas/eliminadas
// Evento: 'task_updated', 'task_created', 'task_deleted'
```

---

## 📦 Dependências Principais

| Pacote | Descrição |
| :--- | :--- |
| `express` | Framework HTTP |
| `mysql2` | Driver MySQL com suporte a Promises |
| `jsonwebtoken` | Geração e verificação de tokens JWT |
| `bcryptjs` | Hash seguro de senhas |
| `multer` | Upload de ficheiros multipart |
| `socket.io` | Comunicação em tempo real |
| `cors` | Gestão de Cross-Origin Resource Sharing |
| `morgan` | Logger de pedidos HTTP |
| `dotenv` | Carregamento de variáveis de ambiente |
| `nodemon` | Reinício automático em desenvolvimento |
