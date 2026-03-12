# 🖥️ TaskFlow — Frontend

Interface web da aplicação TaskFlow, construída com **React + Vite** e um design moderno de azul escuro e branco.

---

## 🗂️ Estrutura de Pastas

```text
frontend/
├── public/                 # Ficheiros estáticos públicos
├── src/
│   ├── assets/             # Imagens e recursos estáticos
│   ├── components/         # Componentes reutilizáveis
│   │   ├── MainLayout/     # Layout principal com barra de navegação horizontal
│   │   ├── TaskCard/       # Cartão de tarefa com menu contextual
│   │   ├── TaskModal/      # Modal de criação/edição de tarefas
│   │   ├── ProtectedRoute/ # Rota protegida (requer autenticação)
│   │   └── PublicRoute/    # Rota pública (redireciona se autenticado)
│   ├── contexts/
│   │   └── AuthContext.jsx # Estado global de autenticação (user, login, logout)
│   ├── pages/
│   │   ├── Login/          # Página de início de sessão
│   │   ├── Register/       # Página de registo de conta
│   │   ├── Boards/         # Listagem e gestão de quadros
│   │   ├── Dashboard/      # Quadro Kanban (Pendente / Em Andamento / Concluída)
│   │   ├── Calendar/       # Vista de tarefas organizada por data de vencimento
│   │   ├── Settings/       # Configurações de perfil, notificações e aparência
│   │   └── Profile/        # Perfil do utilizador
│   ├── services/
│   │   └── api.js          # Serviço centralizado de chamadas à API REST
│   ├── App.jsx             # Definição de rotas da aplicação
│   ├── index.css           # Estilos globais e reset CSS
│   └── main.jsx            # Entrada da aplicação React
├── index.html
├── vite.config.js
└── package.json
```

---

## 🎨 Design e Tema

O frontend utiliza um tema **Azul Escuro + Branco** consistente:

| Elemento | Cor |
| :--- | :--- |
| Barra de navegação | `#0d2137` — azul escuro profundo |
| Fundo das páginas | `#f4f7fc` — cinza-azulado suave |
| Cards e painéis | `#ffffff` — branco puro |
| Acento / item ativo | `#2a7de1` — azul médio |
| Texto principal | `#0d2137` — azul escuro |
| Texto secundário | `#6b859e` — cinza-azulado |

### Componentes de UI
- **Barra de navegação horizontal** estilo Trello — logo + itens + pesquisa + utilizador
- **Colunas Kanban** com drag-and-drop de status e contador de tarefas
- **Cards de tarefa** com menu contextual, prioridade colorida e data de vencimento
- **Modal de detalhes** com secção de informação lateral e upload de anexos
- **Configurações responsivas** com menu lateral (desktop) ou abas horizontais (mobile)

---

## 🚦 Rotas da Aplicação

| Rota | Componente | Acesso |
| :--- | :--- | :--- |
| `/login` | `Login` | Público |
| `/register` | `Register` | Público |
| `/recuperar-senha` | `ForgotPassword` | Público |
| `/boards` | `Boards` | Protegido |
| `/dashboard` | `Dashboard` | Protegido |
| `/calendar` | `Calendar` | Protegido |
| `/settings` | `Settings` | Protegido |
| `/profile` | `Profile` | Protegido |

---

## 🔐 Autenticação e Sessão

- O token JWT é guardado em **`sessionStorage`** (sessão independente por aba)
- O `AuthContext` expõe `user`, `login()` e `logout()` para todos os componentes
- `ProtectedRoute` redireciona para `/login` se não autenticado
- `PublicRoute` redireciona para `/boards` se já autenticado

---

## 📦 Dependências Principais

| Pacote | Versão | Uso |
| :--- | :--- | :--- |
| `react` | 19.x | Framework principal |
| `react-router-dom` | 6.x | Roteamento |
| `styled-components` | 6.x | Estilos em JS |
| `lucide-react` | latest | Ícones SVG |
| `vite` | 6.x | Bundler e dev server |

---

## ▶️ Executar em Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
# → http://localhost:5173

# Build de produção
npm run build
```

---

## 📱 Responsividade

| Tamanho | Comportamento |
| :--- | :--- |
| Desktop (>900px) | Layout completo, Kanban horizontal |
| Tablet (640–900px) | Kanban em coluna, Settings em abas |
| Mobile (<640px) | Drawer de navegação, layout vertical |
