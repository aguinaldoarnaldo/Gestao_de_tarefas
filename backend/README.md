# 🖥️ Backend — TaskFlow API

API REST construída com **Node.js**, **Express** e **MySQL**, responsável por toda a lógica de negócio, autenticação e persistência de dados do sistema TaskFlow.

---

## 📁 Estrutura de Pastas

```
backend/
├── src/
│   ├── index.js              # Ponto de entrada da aplicação
│   ├── config/
│   │   └── database.js       # Configuração do pool de conexões MySQL
│   ├── controllers/
│   │   ├── authController.js       # Registo e login
│   │   ├── userController.js       # Gestão de perfil e utilizadores
│   │   ├── taskController.js       # CRUD de tarefas
│   │   ├── attachmentController.js # Upload/download/delete de anexos
│   │   └── permissionController.js # Gestão de permissões
│   ├── middlewares/
│   │   ├── authMiddleware.js  # Verificação do token JWT
│   │   └── roleMiddleware.js  # Verificação de perfil (admin)
│   ├── models/
│   │   ├── User.js        # Queries SQL para Utilizador
│   │   ├── Task.js        # Queries SQL para Tarefa
│   │   ├── Attachment.js  # Queries SQL para Anexo
│   │   └── Permission.js  # Queries SQL para Permissão
│   └── routes/
│       ├── authRoutes.js        # Rotas de autenticação
│       ├── userRoutes.js        # Rotas de utilizadores
│       ├── taskRoutes.js        # Rotas de tarefas
│       └── attachment.routes.js # Rotas de anexos
├── .env                   # Variáveis de ambiente (não versionado)
└── package.json
```

---

## ⚙️ Instalação e Execução

```bash
npm install
npm run dev    # Desenvolvimento com nodemon
npm start      # Produção
```

### Variáveis de Ambiente (`.env`)
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=GestaoTarefas
JWT_SECRET=chave_secreta_forte
PORT=5000
```

---

## 📦 Dependências

| Pacote        | Versão   | Finalidade                              |
|---------------|----------|-----------------------------------------|
| express       | ^5.2.1   | Framework HTTP                          |
| mysql2        | ^3.16.3  | Driver MySQL com suporte a Promises     |
| jsonwebtoken  | ^9.0.3   | Geração e verificação de tokens JWT     |
| bcryptjs      | ^3.0.3   | Hash seguro de palavras-passe           |
| multer        | ^2.0.2   | Upload de ficheiros multipart/form-data |
| cors          | ^2.8.6   | Controlo de origens cruzadas (CORS)     |
| morgan        | ^1.10.1  | Logger de requisições HTTP              |
| dotenv        | ^17.2.4  | Carregamento de variáveis de ambiente   |
| nodemon       | ^3.1.11  | Reinício automático em desenvolvimento  |

---

## 🔌 Rotas da API

### `/api/auth` — Autenticação

| Método | Rota        | Middleware    | Descrição                         |
|--------|-------------|---------------|-----------------------------------|
| POST   | `/register` | —             | Cria novo utilizador              |
| POST   | `/login`    | —             | Autentica e devolve token JWT     |
| GET    | `/me`       | authMiddleware| Devolve dados do utilizador atual |

### `/api/tasks` — Tarefas (todas protegidas)

| Método | Rota        | Descrição                                      |
|--------|-------------|------------------------------------------------|
| GET    | `/`         | Lista tarefas do utilizador autenticado        |
| GET    | `/my-tasks` | Alias para listar as tarefas do utilizador     |
| POST   | `/`         | Cria nova tarefa                               |
| PUT    | `/:id`      | Atualiza tarefa (apenas o criador)             |
| DELETE | `/:id`      | Elimina tarefa (apenas o criador)              |

### `/api/users` — Utilizadores

| Método | Rota              | Middleware              | Descrição                        |
|--------|-------------------|-------------------------|----------------------------------|
| GET    | `/profile`        | auth                    | Perfil do utilizador autenticado |
| PUT    | `/profile`        | auth                    | Atualiza nome/email              |
| PUT    | `/change-password`| auth                    | Altera palavra-passe             |
| GET    | `/stats`          | auth                    | Estatísticas das tarefas         |
| GET    | `/`               | auth + isAdmin          | Lista todos os utilizadores      |
| POST   | `/`               | auth + isAdmin          | Cria utilizador (admin)          |
| PUT    | `/:id`            | auth + isAdmin          | Edita utilizador (admin)         |
| DELETE | `/:id`            | auth + isAdmin          | Elimina utilizador (admin)       |

### `/api/attachments` — Anexos (todas protegidas)

| Método | Rota                | Descrição                          |
|--------|---------------------|------------------------------------|
| POST   | `/task/:taskId`     | Faz upload de ficheiro para tarefa |
| GET    | `/task/:taskId`     | Lista anexos de uma tarefa         |
| GET    | `/:id/download`     | Descarrega um anexo                |
| DELETE | `/:id`              | Elimina um anexo                   |

---

## 🛡️ Middlewares

### `authMiddleware.js`
Verifica se o cabeçalho `Authorization: Bearer <token>` está presente e válido. Injeta `req.user` com os dados do utilizador decodificados do JWT.

### `roleMiddleware.js`
Exporta `isAdmin` — verifica se `req.user.tipo === 'admin'`. Usado nas rotas de gestão de utilizadores.

---

## 🗄️ Modelos (Models)

### `User.js`
- `create(userData)` — Insere novo utilizador
- `findByEmail(email)` — Busca por email (login)
- `findById(id)` — Busca por ID (sem expor senha)
- `getAll()` — Lista todos (sem senhas)
- `getPermissions(userId)` — Lista permissões do utilizador
- `update(id, userData)` — Atualização dinâmica de campos
- `delete(id)` — Remove utilizador

### `Task.js`
- `create(taskData)` — Insere nova tarefa
- `getAll()` — Lista todas com nome do utilizador (JOIN)
- `getById(id)` — Busca por ID
- `getByUserId(userId)` — Tarefas de um utilizador
- `update(id, taskData)` — Atualiza campos
- `delete(id)` — Remove tarefa

### `Attachment.js`
- `create(attachmentData)` — Regista ficheiro enviado
- `getByTaskId(taskId)` — Lista anexos de uma tarefa
- `getById(id)` — Busca por ID
- `delete(id)` — Remove registo
- `deleteByTaskId(taskId)` — Remove todos os anexos de uma tarefa

### `Permission.js`
- `getAll()` — Lista todas as permissões
- `create(nome)` — Cria nova permissão
- `assignToUser(utilizador_id, permissao_id)` — Atribui permissão
- `removeFromUser(utilizador_id, permissao_id)` — Remove permissão
- `getByUserId(userId)` — Permissões de um utilizador

---

## 🗃️ Base de Dados

O script SQL encontra-se em `Docs/SQl/modelo_fisico.sql`.

### Tabelas

| Tabela                | Descrição                                      |
|-----------------------|------------------------------------------------|
| `Utilizador`          | Utilizadores do sistema (admin/membro)         |
| `Tarefa`              | Tarefas criadas pelos utilizadores             |
| `Anexo`               | Ficheiros associados a tarefas                 |
| `Permissao`           | Catálogo de permissões disponíveis             |
| `Permissao_Utilizador`| Relação N:N entre utilizadores e permissões    |

### Relações
- `Tarefa.utilizador_id` → `Utilizador.id` (CASCADE DELETE)
- `Anexo.tarefa_id` → `Tarefa.id` (CASCADE DELETE)
- `Permissao_Utilizador` → chave composta (utilizador_id, permissao_id)

---

## 🔒 Segurança

- Palavras-passe armazenadas com **bcrypt** (salt rounds = 10)
- Tokens JWT com expiração de **1 dia**
- Rotas protegidas por middleware de autenticação
- Utilizadores só podem editar/eliminar as suas próprias tarefas e anexos
- Administradores não podem eliminar a própria conta
