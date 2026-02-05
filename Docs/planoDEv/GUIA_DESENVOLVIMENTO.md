# 🛠️ Guia de Desenvolvimento

**Projeto:** Sistema de Gestão de Tarefas  
**Data:** 05 de Fevereiro de 2026

---

## 📚 Stack Tecnológica

### Backend
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** PostgreSQL / MongoDB
- **ORM:** Prisma (PostgreSQL) ou Mongoose (MongoDB)
- **Autenticação:** JWT (jsonwebtoken)
- **Validação:** Joi ou Zod
- **Upload de arquivos:** Multer
- **Email:** Nodemailer

### Frontend
- **Framework:** React 18+
- **Build Tool:** Vite
- **Routing:** React Router v6
- **State Management:** Context API / Zustand / Redux Toolkit
- **HTTP Client:** Axios
- **Formulários:** React Hook Form
- **Estilização:** CSS Modules / Styled Components
- **UI Components:** Componentes customizados
- **Ícones:** React Icons / Lucide React
- **Gráficos:** Chart.js / Recharts
- **Editor de Texto:** React Quill / TipTap

### DevOps & Ferramentas
- **Controle de Versão:** Git + GitHub
- **Package Manager:** npm / pnpm
- **Linting:** ESLint
- **Formatação:** Prettier
- **Testing:** Jest + React Testing Library
- **API Testing:** Postman / Insomnia
- **Deploy:** Vercel (Frontend) + Railway/Render (Backend)

---

## 📁 Estrutura de Pastas

### Backend (Node.js)
```
backend/
├── src/
│   ├── config/          # Configurações (DB, JWT, etc)
│   │   ├── database.js
│   │   ├── jwt.js
│   │   └── multer.js
│   ├── controllers/     # Lógica de negócio
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   ├── projectController.js
│   │   ├── teamController.js
│   │   └── userController.js
│   ├── models/          # Modelos de dados
│   │   ├── User.js
│   │   ├── Task.js
│   │   ├── Project.js
│   │   ├── Team.js
│   │   └── Comment.js
│   ├── routes/          # Rotas da API
│   │   ├── auth.routes.js
│   │   ├── task.routes.js
│   │   ├── project.routes.js
│   │   ├── team.routes.js
│   │   └── user.routes.js
│   ├── middlewares/     # Middlewares
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── validation.middleware.js
│   │   └── upload.middleware.js
│   ├── services/        # Serviços (email, upload, etc)
│   │   ├── emailService.js
│   │   ├── uploadService.js
│   │   └── notificationService.js
│   ├── utils/           # Utilitários
│   │   ├── validators.js
│   │   ├── helpers.js
│   │   └── constants.js
│   ├── app.js           # Configuração do Express
│   └── server.js        # Entrada da aplicação
├── uploads/             # Arquivos enviados
├── tests/               # Testes
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

### Frontend (React + Vite)
```
frontend/
├── public/
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── assets/          # Imagens, fontes, etc
│   ├── components/      # Componentes reutilizáveis
│   │   ├── common/      # Botões, Inputs, Cards
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Modal.jsx
│   │   ├── layout/      # Layout components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   └── features/    # Componentes específicos
│   │       ├── TaskCard.jsx
│   │       ├── ProjectCard.jsx
│   │       └── KanbanBoard.jsx
│   ├── pages/           # Páginas
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx
│   │   ├── tasks/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskDetails.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── projects/
│   │   │   ├── ProjectList.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   └── ProjectForm.jsx
│   │   └── teams/
│   │       ├── TeamList.jsx
│   │       └── TeamDetails.jsx
│   ├── contexts/        # Context API
│   │   ├── AuthContext.jsx
│   │   ├── TaskContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/           # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useTasks.js
│   │   └── useDebounce.js
│   ├── services/        # API calls
│   │   ├── api.js       # Axios config
│   │   ├── authService.js
│   │   ├── taskService.js
│   │   └── projectService.js
│   ├── utils/           # Utilitários
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── constants.js
│   ├── styles/          # Estilos globais
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── reset.css
│   ├── App.jsx
│   ├── main.jsx
│   └── routes.jsx
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔧 Configuração Inicial

### 1. Backend Setup

```bash
# Navegar para a pasta backend
cd backend

# Inicializar projeto Node.js
npm init -y

# Instalar dependências principais
npm install express cors dotenv bcryptjs jsonwebtoken

# Instalar dependências de desenvolvimento
npm install -D nodemon

# Instalar dependências adicionais
npm install mongoose # ou prisma para PostgreSQL
npm install joi # validação
npm install multer # upload de arquivos
npm install nodemailer # envio de emails
```

**package.json - Scripts:**
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest"
  }
}
```

**Arquivo .env:**
```env
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=mongodb://localhost:27017/gestao_tarefas
# ou para PostgreSQL:
# DATABASE_URL=postgresql://user:password@localhost:5432/gestao_tarefas

# JWT
JWT_SECRET=seu_secret_super_seguro_aqui
JWT_EXPIRES_IN=24h

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_app

# Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

---

### 2. Frontend Setup

```bash
# Criar projeto Vite
npm create vite@latest frontend -- --template react

# Navegar para a pasta
cd frontend

# Instalar dependências
npm install

# Instalar dependências adicionais
npm install react-router-dom axios
npm install react-hook-form
npm install react-icons
npm install chart.js react-chartjs-2
npm install date-fns # manipulação de datas
```

**Arquivo .env:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Gestão de Tarefas
```

---

## 🗄️ Modelagem de Dados

### Modelo: User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  username: String (unique),
  password: String (hashed),
  avatar: String,
  role: String (enum: ['admin', 'manager', 'member', 'viewer']),
  bio: String,
  phone: String,
  department: String,
  isActive: Boolean,
  emailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Modelo: Task
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  project: ObjectId (ref: Project),
  assignedTo: ObjectId (ref: User),
  createdBy: ObjectId (ref: User),
  priority: String (enum: ['low', 'medium', 'high', 'urgent']),
  status: String (enum: ['pending', 'in_progress', 'completed', 'cancelled']),
  startDate: Date,
  dueDate: Date,
  estimatedTime: Number,
  tags: [String],
  attachments: [String],
  watchers: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Modelo: Project
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  team: ObjectId (ref: Team),
  manager: ObjectId (ref: User),
  status: String (enum: ['planning', 'active', 'completed', 'paused']),
  startDate: Date,
  dueDate: Date,
  budget: Number,
  color: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Modelo: Team
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  leader: ObjectId (ref: User),
  members: [ObjectId] (ref: User),
  department: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Modelo: Comment
```javascript
{
  _id: ObjectId,
  task: ObjectId (ref: Task),
  user: ObjectId (ref: User),
  content: String,
  attachments: [String],
  mentions: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Autenticação JWT

### Fluxo de Autenticação

1. **Registro:**
   - Usuário envia dados
   - Backend valida e cria hash da senha (bcrypt)
   - Salva no banco
   - Retorna sucesso

2. **Login:**
   - Usuário envia credenciais
   - Backend valida senha
   - Gera token JWT
   - Retorna token + dados do usuário

3. **Requisições Protegidas:**
   - Frontend envia token no header: `Authorization: Bearer <token>`
   - Middleware valida token
   - Adiciona dados do usuário em `req.user`
   - Continua para o controller

### Exemplo de Middleware de Autenticação

```javascript
// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = authMiddleware;
```

---

## 🛣️ Estrutura de Rotas da API

```
POST   /api/auth/register          # Registrar usuário
POST   /api/auth/login             # Login
POST   /api/auth/forgot-password   # Recuperar senha
GET    /api/auth/me                # Dados do usuário logado

GET    /api/tasks                  # Listar tarefas
POST   /api/tasks                  # Criar tarefa
GET    /api/tasks/:id              # Detalhes da tarefa
PUT    /api/tasks/:id              # Atualizar tarefa
DELETE /api/tasks/:id              # Excluir tarefa
POST   /api/tasks/:id/comments     # Adicionar comentário

GET    /api/projects               # Listar projetos
POST   /api/projects               # Criar projeto
GET    /api/projects/:id           # Detalhes do projeto
PUT    /api/projects/:id           # Atualizar projeto
DELETE /api/projects/:id           # Excluir projeto

GET    /api/teams                  # Listar equipes
POST   /api/teams                  # Criar equipe
GET    /api/teams/:id              # Detalhes da equipe
PUT    /api/teams/:id              # Atualizar equipe
DELETE /api/teams/:id              # Excluir equipe

GET    /api/users                  # Listar usuários
GET    /api/users/:id              # Perfil do usuário
PUT    /api/users/:id              # Atualizar perfil

GET    /api/notifications          # Listar notificações
PUT    /api/notifications/:id/read # Marcar como lida
```

### Exemplo de Rota

```javascript
// src/routes/task.routes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/auth.middleware');

// Todas as rotas requerem autenticação
router.use(authMiddleware);

router.get('/', taskController.list);
router.post('/', taskController.create);
router.get('/:id', taskController.getById);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;
```

---

## 📝 Convenções de Código

### Nomenclatura
- **Variáveis/Funções:** camelCase (`getUserById`, `taskList`)
- **Componentes React:** PascalCase (`TaskCard`, `LoginPage`)
- **Constantes:** UPPER_SNAKE_CASE (`API_URL`, `MAX_FILE_SIZE`)
- **Arquivos:** kebab-case ou PascalCase (`task-controller.js`, `TaskCard.jsx`)

### Git Commits
```
feat: adicionar autenticação JWT
fix: corrigir bug na listagem de tarefas
docs: atualizar README
style: formatar código
refactor: reorganizar estrutura de pastas
test: adicionar testes para taskController
```

### Branches
- `main` - Produção
- `develop` - Desenvolvimento
- `feature/nome-da-feature` - Nova funcionalidade
- `bugfix/nome-do-bug` - Correção de bug
- `hotfix/nome-do-hotfix` - Correção urgente

---

## ✅ Checklist de Desenvolvimento

### Antes de Começar
- [ ] Ler toda a documentação
- [ ] Configurar ambiente (Node.js, npm, editor)
- [ ] Clonar repositório
- [ ] Instalar dependências
- [ ] Configurar .env
- [ ] Testar conexão com banco de dados

### Durante o Desenvolvimento
- [ ] Seguir estrutura de pastas
- [ ] Escrever código limpo e comentado
- [ ] Validar dados no backend
- [ ] Tratar erros adequadamente
- [ ] Testar funcionalidades
- [ ] Fazer commits frequentes

### Antes de Fazer Push
- [ ] Testar localmente
- [ ] Verificar lint (ESLint)
- [ ] Remover console.logs
- [ ] Atualizar documentação se necessário
- [ ] Revisar código

---

## 🐛 Debug & Troubleshooting

### Backend
```javascript
// Usar console.log estrategicamente
console.log('Dados recebidos:', req.body);

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
```

### Frontend
```javascript
// React DevTools
// Axios interceptor para debug
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response);
    return Promise.reject(error);
  }
);
```

---

## 📚 Recursos Úteis

### Documentação
- [Node.js Docs](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/guide)
- [React Docs](https://react.dev)
- [MongoDB Docs](https://docs.mongodb.com)
- [JWT.io](https://jwt.io)

### Tutoriais
- [REST API com Node.js](https://www.youtube.com/results?search_query=rest+api+nodejs)
- [React Router v6](https://reactrouter.com/docs)
- [Autenticação JWT](https://www.youtube.com/results?search_query=jwt+authentication+nodejs)

---

## 🎨 Padrões de Design

### Controller Pattern
```javascript
// src/controllers/taskController.js
exports.create = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

### Service Pattern
```javascript
// src/services/emailService.js
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendWelcomeEmail(user) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Bem-vindo!',
      html: `<h1>Olá ${user.name}!</h1>`
    });
  }
}

module.exports = new EmailService();
```

---

**Última atualização:** 05/02/2026
