# 🚀 Guia de Início Rápido

**Projeto:** Sistema de Gestão de Tarefas  
**Data:** 05 de Fevereiro de 2026

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v18 ou superior) - [Download](https://nodejs.org)
- **npm** ou **pnpm** (vem com Node.js)
- **Git** - [Download](https://git-scm.com)
- **MongoDB** (local ou Atlas) - [Download](https://www.mongodb.com/try/download/community)
  - OU **PostgreSQL** - [Download](https://www.postgresql.org/download/)
- **Editor de Código** (VS Code recomendado) - [Download](https://code.visualstudio.com)

### Verificar Instalação
```bash
node --version    # v18.0.0 ou superior
npm --version     # 9.0.0 ou superior
git --version     # 2.0.0 ou superior
```

---

## 🎯 Passo a Passo

### 1️⃣ Configurar Backend

```bash
# Navegar para a pasta do projeto
cd "C:\Users\Aguinaldo Arnaldo\Documents\Gestao_de_tarefas"

# Criar pasta backend (se não existir)
mkdir backend
cd backend

# Inicializar projeto Node.js
npm init -y

# Instalar dependências principais
npm install express cors dotenv bcryptjs jsonwebtoken mongoose

# Instalar dependências de desenvolvimento
npm install -D nodemon

# Instalar dependências adicionais
npm install joi multer nodemailer
```

### 2️⃣ Criar Estrutura de Pastas (Backend)

```bash
# Criar estrutura de pastas
mkdir src
cd src
mkdir config controllers models routes middlewares services utils
cd ..
mkdir uploads tests
```

### 3️⃣ Configurar Arquivo .env (Backend)

Criar arquivo `.env` na raiz do backend:

```env
PORT=5000
NODE_ENV=development

# MongoDB
DATABASE_URL=mongodb://localhost:27017/gestao_tarefas

# JWT
JWT_SECRET=meu_secret_super_seguro_12345
JWT_EXPIRES_IN=24h

# Email (configurar depois)
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

### 4️⃣ Criar Arquivo de Entrada (Backend)

**src/server.js:**
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API funcionando!' });
});

// Porta
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});
```

### 5️⃣ Configurar Scripts (Backend)

Editar **package.json** e adicionar:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

### 6️⃣ Testar Backend

```bash
# Rodar servidor
npm run dev

# Deve aparecer: 🚀 Servidor rodando na porta 5000
```

Abrir navegador em: `http://localhost:5000/api/health`  
Deve retornar: `{"status":"OK","message":"API funcionando!"}`

---

### 7️⃣ Configurar Frontend

```bash
# Voltar para a raiz do projeto
cd ..

# Criar projeto React com Vite
npm create vite@latest frontend -- --template react

# Navegar para frontend
cd frontend

# Instalar dependências
npm install

# Instalar dependências adicionais
npm install react-router-dom axios react-hook-form react-icons
```

### 8️⃣ Configurar .env (Frontend)

Criar arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Gestão de Tarefas
```

### 9️⃣ Testar Frontend

```bash
# Rodar servidor de desenvolvimento
npm run dev

# Deve aparecer: Local: http://localhost:5173
```

Abrir navegador em: `http://localhost:5173`

---

## 🎨 Próximos Passos

### Backend

1. **Configurar Conexão com Banco de Dados**
   - Criar `src/config/database.js`
   - Conectar ao MongoDB/PostgreSQL

2. **Criar Modelos**
   - `src/models/User.js`
   - `src/models/Task.js`
   - `src/models/Project.js`

3. **Criar Rotas de Autenticação**
   - `src/routes/auth.routes.js`
   - `src/controllers/authController.js`

4. **Implementar Middleware de Autenticação**
   - `src/middlewares/auth.middleware.js`

### Frontend

1. **Configurar Rotas**
   - Criar `src/routes.jsx`
   - Configurar React Router

2. **Criar Estrutura de Pastas**
   - `src/components/`
   - `src/pages/`
   - `src/services/`
   - `src/contexts/`

3. **Criar Páginas Iniciais**
   - Login
   - Registro
   - Dashboard

4. **Configurar Axios**
   - `src/services/api.js`
   - Interceptors para token

---

## 📚 Comandos Úteis

### Backend
```bash
npm run dev          # Rodar em modo desenvolvimento
npm start            # Rodar em produção
npm test             # Rodar testes
```

### Frontend
```bash
npm run dev          # Rodar servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
```

### Git
```bash
git status           # Ver status
git add .            # Adicionar todos os arquivos
git commit -m "msg"  # Fazer commit
git push             # Enviar para repositório
```

---

## 🔧 Ferramentas Recomendadas

### Extensões VS Code
- **ES7+ React/Redux/React-Native snippets**
- **ESLint**
- **Prettier**
- **Thunder Client** (testar API)
- **MongoDB for VS Code** (se usar MongoDB)
- **GitLens**

### Aplicativos
- **Postman** ou **Insomnia** - Testar API
- **MongoDB Compass** - Interface gráfica para MongoDB
- **pgAdmin** - Interface gráfica para PostgreSQL

---

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
```bash
# Reinstalar dependências
npm install
```

### Erro: "Port already in use"
```bash
# Mudar porta no .env
PORT=5001
```

### Erro de CORS
```javascript
// Verificar configuração no backend
app.use(cors({
  origin: 'http://localhost:5173'
}));
```

### MongoDB não conecta
```bash
# Verificar se MongoDB está rodando
# Windows: Serviços > MongoDB Server
# Ou iniciar manualmente:
mongod
```

---

## 📖 Documentação de Referência

Consulte os outros documentos na pasta `Docs/`:

1. **ROADMAP.md** - Planejamento completo do projeto
2. **FLUXO_DE_TELAS.md** - Estrutura de navegação e telas
3. **ESPECIFICACAO_FUNCIONALIDADES.md** - Detalhes das funcionalidades
4. **GUIA_DESENVOLVIMENTO.md** - Guia técnico completo

---

## ✅ Checklist Inicial

- [ ] Node.js instalado
- [ ] MongoDB/PostgreSQL instalado e rodando
- [ ] Git configurado
- [ ] Backend criado e rodando
- [ ] Frontend criado e rodando
- [ ] .env configurados
- [ ] Conexão com banco de dados funcionando
- [ ] Rota de teste funcionando
- [ ] Documentação lida

---

## 🎯 Meta da Primeira Semana

- ✅ Ambiente configurado
- ✅ Backend básico funcionando
- ✅ Frontend básico funcionando
- 🔲 Conexão com banco de dados
- 🔲 Sistema de autenticação (registro + login)
- 🔲 Primeira página funcional

---

**Boa sorte com o desenvolvimento! 🚀**

**Última atualização:** 05/02/2026
