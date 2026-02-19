# 🎨 Frontend — TaskFlow

Interface web moderna construída com **React 19**, **Vite** e **Styled Components**, que oferece uma experiência Kanban fluida para gestão de tarefas com suporte a anexos.

---

## 📁 Estrutura de Pastas

```
frontend/src/
├── main.jsx                    # Ponto de entrada React
├── App.jsx                     # Roteamento principal
├── index.css                   # Estilos globais base
├── contexts/
│   └── AuthContext.jsx         # Contexto global de autenticação
├── services/
│   └── api.js                  # Classe ApiService (todas as chamadas HTTP)
├── pages/
│   ├── Home/Home.jsx           # Página de apresentação (landing page)
│   ├── Login/login.jsx         # Formulário de login
│   ├── Register/Register.jsx   # Formulário de registo
│   ├── Dashboard/Dashboard.jsx # Quadro Kanban de tarefas
│   ├── Profile/Profile.jsx     # Perfil e alteração de senha
│   └── Users/Users.jsx         # Gestão de utilizadores (admin)
└── components/
    ├── MainLayout/MainLayout.jsx           # Layout com sidebar + header
    ├── ProtectedRoute/ProtectedRoute.jsx   # Guarda de rotas autenticadas
    ├── LoadingScreen/LoadingScreen.jsx     # Ecrã de carregamento inicial
    ├── TaskCard/TaskCard.jsx               # Cartão de tarefa no Kanban
    ├── TaskModal/TaskModal.jsx             # Modal criar/editar tarefa
    ├── AttachmentManager/AttachmentManager.jsx # Gestor de anexos
    └── UserModal/UserModal.jsx             # Modal criar/editar utilizador
```

---

## ⚙️ Instalação e Execução

```bash
npm install
npm run dev      # Servidor de desenvolvimento em http://localhost:5173
npm run build    # Build de produção
npm run preview  # Pré-visualização do build
```

---

## 📦 Dependências

| Pacote              | Versão    | Finalidade                                      |
|---------------------|-----------|-------------------------------------------------|
| react               | ^19.2.0   | Biblioteca de interface                         |
| react-dom           | ^19.2.0   | Renderização no DOM                             |
| react-router-dom    | ^7.13.0   | Roteamento SPA                                  |
| styled-components   | ^6.1.8    | CSS-in-JS para componentes estilizados          |
| lucide-react        | ^0.563.0  | Biblioteca de ícones SVG                        |
| vite                | ^7.2.4    | Bundler e servidor de desenvolvimento           |

---

## 🗺️ Rotas da Aplicação

| Rota         | Componente  | Protegida | Admin Only | Descrição                        |
|--------------|-------------|-----------|------------|----------------------------------|
| `/`          | Home        | ❌        | ❌         | Landing page pública             |
| `/login`     | Login       | ❌        | ❌         | Formulário de autenticação       |
| `/registro`  | Register    | ❌        | ❌         | Formulário de registo            |
| `/dashboard` | Dashboard   | ✅        | ❌         | Quadro Kanban de tarefas         |
| `/profile`   | Profile     | ✅        | ❌         | Perfil do utilizador             |
| `/users`     | Users       | ✅        | ✅         | Gestão de utilizadores           |

---

## 🧩 Componentes

### `App.jsx`
Componente raiz. Gere o ecrã de carregamento inicial (2 segundos com fade-out) e define todas as rotas com `react-router-dom`. Envolve a aplicação no `AuthProvider`.

### `AuthContext.jsx`
Contexto React que fornece estado de autenticação global:
- `user` — dados do utilizador autenticado
- `token` — JWT armazenado no `localStorage`
- `login(email, senha)` — autentica e guarda token
- `register(nome, email, senha)` — regista novo utilizador
- `logout()` — limpa token e estado
- `isAdmin()` — verifica se o utilizador é administrador
- `isAuthenticated` — booleano de sessão ativa

### `api.js` — `ApiService`
Classe singleton que centraliza todas as chamadas HTTP à API. Gere automaticamente:
- Cabeçalho `Authorization: Bearer <token>` em todas as requisições
- Remoção do `Content-Type` para uploads `FormData`
- Tratamento de erros com mensagens da API

**Métodos disponíveis:**
- `getTasks()`, `createTask()`, `updateTask()`, `deleteTask()`
- `getTaskAttachments()`, `uploadAttachment()`, `downloadAttachment()`, `deleteAttachment()`
- `getUserProfile()`, `updateUserProfile()`, `updatePassword()`
- `login()`, `register()`, `getCurrentUser()`
- `getAllUsers()`, `createUser()`, `updateUser()`, `deleteUser()`

---

### `MainLayout.jsx`
Layout principal das páginas autenticadas. Inclui:
- **Sidebar colapsável** com animação suave (260px → 80px)
- **Menu mobile** com overlay e botão hamburger
- **Header fixo** com título da página, ícone de notificações e avatar do utilizador
- Navegação dinâmica: mostra "Utilizadores" apenas para admins
- Botão de logout com redirecionamento para `/login`

### `ProtectedRoute.jsx`
Componente de guarda de rotas. Comportamento:
- Se `loading` → mostra "Carregando..."
- Se não autenticado → redireciona para `/login`
- Se `adminOnly` e não for admin → redireciona para `/dashboard`
- Caso contrário → renderiza os filhos (`children`)

### `LoadingScreen.jsx`
Ecrã de splash exibido durante 2 segundos ao iniciar a aplicação. Suporta prop `fadeOut` para transição CSS suave antes de desaparecer.

---

### `Home.jsx` — Landing Page
Página pública de apresentação do produto. Construída inteiramente com **Styled Components**. Inclui:
- **Navbar** fixa com glassmorphism (blur + transparência)
- **Hero Section** com título gradiente, descrição e botões CTA
- **Features Section** com grelha de 4 cartões de funcionalidades
- **CTA Section** de conversão
- **Footer** com colunas de links e copyright

### `Dashboard.jsx` — Quadro Kanban
Página principal após login. Apresenta as tarefas em 3 colunas:
- **Pendente** (ícone cinzento)
- **Em Andamento** (ícone azul)
- **Concluída** (ícone verde)

Funcionalidades:
- Carrega tarefas da API ao montar
- Botão "Adicionar cartão" em cada coluna abre o `TaskModal`
- Clique em tarefa existente abre modal de edição
- Confirmação antes de eliminar tarefa

### `TaskCard.jsx`
Cartão individual de tarefa no Kanban. Apresenta:
- Título, descrição truncada (3 linhas), data de vencimento e contagem de anexos
- Indicador colorido lateral por status
- Menu dropdown (⋯) com opções: Ver detalhes, Editar, Excluir
- **Modal de detalhes** inline com informações completas e `AttachmentManager`
- Data marcada a vermelho se estiver em atraso

### `TaskModal.jsx`
Modal de formulário para criar ou editar tarefas. Campos:
- Título (obrigatório)
- Descrição (textarea)
- Status (select: Pendente / Em Andamento / Concluída)
- Data de Vencimento (validada — deve ser futura)
- Secção de Anexos (apenas em modo edição, via `AttachmentManager`)

### `AttachmentManager.jsx`
Componente de gestão de ficheiros associados a uma tarefa. Funcionalidades:
- **Drag & Drop** de ficheiros
- **Clique para selecionar** ficheiros
- Validação de tamanho (máximo 10MB por ficheiro)
- Lista de anexos com ícone por tipo (imagem, PDF, ficheiro genérico)
- Botões de **descarregar** e **eliminar** por anexo
- Indicador de upload em progresso

---

## 🎨 Design System

A aplicação usa uma paleta consistente definida via Styled Components:

| Token          | Valor       | Uso                              |
|----------------|-------------|----------------------------------|
| Azul primário  | `#0061ff`   | Botões, links, itens ativos      |
| Roxo           | `#8b5cf6`   | Gradientes decorativos           |
| Texto escuro   | `#0f172a`   | Títulos principais               |
| Texto médio    | `#1e293b`   | Corpo de texto                   |
| Texto suave    | `#64748b`   | Labels, metadados                |
| Fundo          | `#f8fafc`   | Background da aplicação          |
| Borda          | `#e2e8f0`   | Separadores e bordas de cards    |
| Erro           | `#dc2626`   | Mensagens de erro, datas em atraso |
| Sucesso        | `#10b981`   | Status "Concluída"               |

**Tipografia:** `Outfit` (Google Fonts) para títulos, sistema padrão para corpo.

**Animações:** Transições `cubic-bezier(0.4, 0, 0.2, 1)` para sidebar e elementos interativos.

---

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoint em `768px`:
- Sidebar oculta e substituída por menu hamburger no mobile
- Header fixo no topo em mobile
- Colunas Kanban empilhadas verticalmente em mobile
- Botões CTA da landing page em coluna no mobile
