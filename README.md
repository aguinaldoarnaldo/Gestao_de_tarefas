# 📋 TaskFlow — Sistema de Gestão de Tarefas com Anexos

> Aplicação web full-stack que permite a utilizadores organizar e acompanhar as suas tarefas através de quadros Kanban, com suporte a anexos de ficheiros e autenticação segura por JWT.

---

## 🗂️ Estrutura do Projeto

```text
Gestao_de_tarefas/
├── backend/                # API REST — Node.js + Express + MySQL
│   ├── src/
│   │   ├── config/         # Conexão à base de dados
│   │   ├── controllers/    # Lógica de negócio (auth, users, boards, tasks, attachments)
│   │   ├── middlewares/    # Autenticação JWT e upload de ficheiros
│   │   ├── models/         # Modelos de dados (User, Board, Task, Attachment)
│   │   ├── routes/         # Rotas da API REST
│   │   └── index.js        # Entrada do servidor + Socket.io
│   ├── uploads/            # Armazenamento físico de anexos
│   └── .env                # Variáveis de ambiente (não versionado)
├── frontend/               # Interface em React + Vite + Styled Components
│   └── src/
│       ├── components/     # Componentes reutilizáveis (Layout, TaskCard, Modal…)
│       ├── contexts/       # AuthContext (gestão de sessão)
│       ├── pages/          # Páginas da aplicação
│       └── services/       # Serviço de comunicação com a API
├── Docs/                   # Documentação técnica
│   ├── Diagrams/           # Diagramas UML e de fluxo
│   └── SQl/                # Scripts SQL (modelo físico da BD)
├── .gitignore
├── LICENSE
└── README.md               # Este documento
```

---

## 🚀 Tecnologias Utilizadas

| Camada | Tecnologia |
| :--- | :--- |
| **Frontend** | React 19, Vite, React Router DOM v6, Styled Components, Lucide React |
| **Backend** | Node.js, Express 4, Socket.io, Multer, JWT, Bcrypt |
| **Base de Dados** | MySQL 8 |
| **Autenticação** | JSON Web Tokens (JWT) — sessões independentes por aba via `sessionStorage` |

---

## ✨ Funcionalidades Principais

- 📌 **Quadros Kanban** — criação de múltiplos quadros de trabalho por utilizador
- ✅ **Tarefas** — criação, edição, filtragem por prioridade/status, ordenação por data
- 📎 **Anexos** — upload e download de ficheiros associados a tarefas
- 📅 **Calendário** — visualização de tarefas por data de vencimento
- ⚙️ **Configurações** — edição de perfil, preferências de notificação e aparência
- 🔐 **Autenticação** — registo, login e sessões separadas por aba do browser

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos

- **Node.js** >= 18
- **MySQL** >= 8 em execução local

### 1. Base de Dados

Importe o esquema para o seu servidor MySQL:

```bash
# No MySQL Workbench ou cliente de linha de comandos:
source Docs/SQl/modelo_fisico.sql
```

### 2. Backend

```bash
cd backend
npm install
# Crie o ficheiro .env com as variáveis abaixo
npm run dev
```

**Ficheiro `backend/.env`:**

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=GestaoTarefas
JWT_SECRET=chave_secreta_longa_e_segura
PORT=5000
```

O servidor estará disponível em: **http://localhost:5000**

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em: **http://localhost:5173**

---

## 🔐 Modelo de Acesso

Cada utilizador é o único proprietário das suas próprias tarefas e quadros:

- Um utilizador só vê e gere os seus próprios **Quadros**
- Cada **Tarefa** pertence a um único utilizador (o criador)
- Uma Tarefa pode ter **zero ou múltiplos Anexos**
- Sessões são independentes por aba do browser (`sessionStorage`)

---

## 📡 API — Endpoints Principais

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Criar conta |
| `POST` | `/api/auth/login` | Iniciar sessão |
| `GET` | `/api/boards` | Listar quadros do utilizador |
| `POST` | `/api/boards` | Criar quadro |
| `DELETE` | `/api/boards/:id` | Eliminar quadro |
| `GET` | `/api/tasks` | Listar tarefas (filtros opcionais) |
| `POST` | `/api/tasks` | Criar tarefa |
| `PUT` | `/api/tasks/:id` | Atualizar tarefa |
| `DELETE` | `/api/tasks/:id` | Eliminar tarefa |
| `POST` | `/api/attachments` | Upload de anexo |
| `DELETE` | `/api/attachments/:id` | Remover anexo |

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Consulte o ficheiro `LICENSE` para mais detalhes.

---

**TaskFlow** — *Eficiência em cada tarefa.*
