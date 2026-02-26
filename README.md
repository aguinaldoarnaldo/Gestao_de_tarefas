# 📋 TaskFlow — Sistema de Gestão de Tarefas

> Aplicação web full-stack para organização de tarefas com suporte a anexos, controlo de acesso por perfil e interface Kanban moderna.

---

## 🗂️ Estrutura do Projeto

```text
Gestao_de_tarefas/
├── backend/            # API REST em Node.js + Express + MySQL
│   ├── src/            # Código-fonte da API
│   ├── uploads/        # Armazenamento físico de anexos
│   └── temp_debug/     # Artefatos de depuração (ignorado pelo Git)
├── frontend/           # Interface em React + Vite + Styled Components
│   └── src/            # Código-fonte da interface web
├── Docs/               # Documentação técnica e manuais
│   ├── Diagrams/       # Diagramas de fluxo e casos de uso
│   ├── SQl/            # Scripts de criação da base de dados
│   └── ...             # Manuais de setup e apresentações
├── .gitignore          # Configurações globais de exclusão do Git
├── LICENSE             # Termos de licença do projeto
└── README.md           # Este documento
```

---

## 🚀 Tecnologias Utilizadas

| Camada | Tecnologia |
| :--- | :--- |
| **Frontend** | React 19, Vite, React Router DOM, Styled Components, Lucide React |
| **Backend** | Node.js, Express, MySQL2, JWT, Bcrypt, Multer |
| **Base de Dados** | MySQL 8 |
| **Autenticação** | JSON Web Tokens (JWT) |

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
- **Node.js** >= 18
- **MySQL** >= 8 em execução

### 1. Preparação da Base de Dados
Importe o modelo físico para o seu servidor MySQL:
```sql
-- Execute o ficheiro localizado em:
Docs/SQl/modelo_fisico.sql
```

### 2. Configuração do Backend
```bash
cd backend
npm install
# Crie um ficheiro .env baseado no exemplo abaixo
npm run dev
```

**Variáveis de ambiente (`backend/.env`):**
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=GestaoTarefas
JWT_SECRET=sua_chave_secreta_aqui
PORT=5000
```

### 3. Configuração do Frontend
```bash
cd frontend
npm install
npm run dev
```

Aceda em: **http://localhost:5173**

---

## 🔐 Controlo de Acesso

O sistema utiliza RBAC (*Role-Based Access Control*):
- **Admin**: Gestão total de utilizadores, tarefas e quadros.
- **Membro**: Criação e gestão das suas próprias tarefas e acesso a quadros onde foi convidado.

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

**Equipa de Desenvolvimento**  
*TaskFlow — Eficiência em cada tarefa.*
