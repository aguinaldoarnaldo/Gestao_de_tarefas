# Sistema de Gestão de Tarefas com Anexos

## 🚀 Setup Rápido

### Pré-requisitos
- Node.js (v18 ou superior)
- MySQL/MariaDB
- Git

### 1. Configurar Banco de Dados

```sql
-- Criar banco de dados
CREATE DATABASE gestao_tarefas;

-- Usar o banco
USE gestao_tarefas;

-- Executar o script SQL
source backend/database.sql;
```

### 2. Configurar Backend

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais do MySQL

# Iniciar servidor
npm run dev
```

### 3. Configurar Frontend

```bash
# Entrar na pasta do frontend (em outro terminal)
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### 4. Acessar Aplicação

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Estrutura do Projeto

```
Gestao_de_tarefas/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Controladores da API
│   │   ├── models/         # Modelos de dados
│   │   ├── routes/         # Rotas da API
│   │   ├── middlewares/    # Middlewares (autenticação)
│   │   ├── config/         # Configurações (banco, etc)
│   │   └── utils/          # Utilitários
│   ├── uploads/            # Pasta de anexos (criada automaticamente)
│   ├── database.sql        # Script SQL para setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   │   ├── AttachmentManager/
│   │   │   └── TaskCard/
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── services/       # Serviços de API
│   │   └── assets/         # Assets estáticos
│   └── package.json
└── README_SETUP.md
```

## 🔧 Funcionalidades Implementadas

### ✅ Backend
- **API RESTful** com Express.js
- **Autenticação JWT** para usuários
- **CRUD completo** para tarefas
- **Sistema de anexos**:
  - Upload de arquivos (Multer)
  - Download de arquivos
  - Exclusão de arquivos
  - Validação de permissões
- **Banco de dados MySQL** com relacionamentos

### ✅ Frontend
- **Interface moderna** com React + Vite
- **Dashboard Kanban** com drag & drop (visual)
- **Gestão de anexos**:
  - Upload via modal
  - Download direto
  - Visualização de metadados
  - Ícones por tipo de arquivo
- **Design responsivo** com TailwindCSS
- **Serviço de API centralizado**

### 🔐 Segurança
- Middleware de autenticação
- Validação de permissões (apenas criador pode gerenciar anexos)
- Sanitização de inputs
- Tokens JWT seguros

## 📱 Como Usar

### 1. Login/Cadastro
- Acesse `/login` ou `/registro`
- Use as credenciais de exemplo:
  - Email: `aguinaldo@example.com`
  - Senha: `123456`

### 2. Gestão de Tarefas
- Visualize tarefas no dashboard Kanban
- Clique em uma tarefa para ver detalhes
- Use o menu de opções para editar/excluir

### 3. Anexos
- No detalhe da tarefa, clique em "Adicionar" para上传 arquivos
- Clique no ícone de download para baixar arquivos
- Clique na lixeira para excluir anexos

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com MySQL**
   ```bash
   # Verifique se o MySQL está rodando
   sudo systemctl status mysql
   
   # Verifique credenciais no .env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=gestao_tarefas
   ```

2. **Erro de permissão de pasta uploads**
   ```bash
   # No Linux/Mac
   chmod 755 backend/uploads
   
   # No Windows (como administrador)
   icacls backend/uploads /grant Everyone:F
   ```

3. **CORS errors**
   - Verifique se o backend está rodando na porta 5000
   - Verifique se o frontend está configurado para http://localhost:5000

4. **Token JWT inválido**
   - Limpe o localStorage do navegador
   - Faça login novamente

## 🚀 Próximos Passos

- [ ] Implementar drag & drop real no Kanban
- [ ] Adicionar edição de tarefas
- [ ] Implementar notificações
- [ ] Adicionar filtros e busca
- [ ] Implementar equipes e compartilhamento
- [ ] Adicionar histórico de alterações

## 📝 Licença

Copyright © 2026 - Gestão de Tarefas
