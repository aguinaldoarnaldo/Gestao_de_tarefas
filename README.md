# 📋 TaskFlow — Sistema de Gestão de Tarefas

> Aplicação web full-stack para organização de tarefas com suporte a anexos, controlo de acesso por perfil e interface Kanban moderna.

---

## 🗂️ Estrutura do Projeto

```
Gestao_de_tarefas/
├── backend/          # API REST em Node.js + Express + MySQL
├── frontend/         # Interface em React + Vite + Styled Components
├── Docs/
│   ├── SQl/          # Modelo físico da base de dados (SQL)
│   └── Diagrams/     # Diagramas do sistema
└── README.md
```

---

## 🚀 Tecnologias Utilizadas

| Camada     | Tecnologia                                      |
|------------|-------------------------------------------------|
| Frontend   | React 19, Vite, React Router DOM, Styled Components, Lucide React |
| Backend    | Node.js, Express 5, MySQL2, JWT, Bcrypt, Multer |
| Base de Dados | MySQL 8                                      |
| Autenticação | JSON Web Tokens (JWT)                         |

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
- Node.js >= 18
- MySQL >= 8 em execução

### 1. Base de Dados
```sql
-- Execute o ficheiro:
Docs/SQl/modelo_fisico.sql
```

### 2. Backend
```bash
cd backend
# Crie o ficheiro .env com as variáveis abaixo
npm install
npm run dev
```

**Variáveis de ambiente (`backend/.env`):**
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=GestaoTarefas
JWT_SECRET=chave_secreta_jwt
PORT=5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

Aceda em: **http://localhost:5173**

---

## 🔐 Perfis de Utilizador

| Perfil  | Permissões                                                      |
|---------|-----------------------------------------------------------------|
| `admin` | Gerir utilizadores, criar/editar/eliminar qualquer tarefa       |
| `membro`| Criar, editar e eliminar as suas próprias tarefas e anexos      |

---

## 📡 Endpoints da API

### Autenticação (`/api/auth`)
| Método | Rota         | Descrição                        |
|--------|--------------|----------------------------------|
| POST   | `/register`  | Registo de novo utilizador       |
| POST   | `/login`     | Login e obtenção do token JWT    |
| GET    | `/me`        | Dados do utilizador autenticado  |

### Tarefas (`/api/tasks`) — requer token
| Método | Rota         | Descrição                        |
|--------|--------------|----------------------------------|
| GET    | `/`          | Listar tarefas do utilizador     |
| POST   | `/`          | Criar nova tarefa                |
| PUT    | `/:id`       | Atualizar tarefa                 |
| DELETE | `/:id`       | Eliminar tarefa                  |

### Utilizadores (`/api/users`) — admin
| Método | Rota         | Descrição                        |
|--------|--------------|----------------------------------|
| GET    | `/`          | Listar todos os utilizadores     |
| PUT    | `/:id`       | Atualizar utilizador             |
| DELETE | `/:id`       | Eliminar utilizador              |

### Anexos (`/api/attachments`) — requer token
| Método | Rota                    | Descrição               |
|--------|-------------------------|-------------------------|
| POST   | `/task/:taskId`         | Enviar anexo            |
| GET    | `/task/:taskId`         | Listar anexos da tarefa |
| GET    | `/:id/download`         | Descarregar anexo       |
| DELETE | `/:id`                  | Eliminar anexo          |

---

## 🗃️ Modelo de Base de Dados

```
Utilizador ──< Tarefa ──< Anexo
Utilizador ──< Permissao_Utilizador >── Permissao
```

---

## 📄 Licença

MIT — consulte o ficheiro `LICENSE` para mais detalhes.
