# 🎨 Fluxo de Telas - Sistema de Gestão de Tarefas

**Versão:** 1.0  
**Data:** 05 de Fevereiro de 2026

---

## 📱 Estrutura de Navegação

```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEMA DE GESTÃO DE TAREFAS              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Página Inicial │
                    │   (Landing)     │
                    └─────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
            ┌──────────┐         ┌──────────┐
            │  Login   │         │ Registro │
            └──────────┘         └──────────┘
                    │                   │
                    └─────────┬─────────┘
                              ▼
                    ┌─────────────────┐
                    │   Dashboard     │
                    │   (Principal)   │
                    └─────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Tarefas    │     │   Projetos   │     │   Equipes    │
└──────────────┘     └──────────────┘     └──────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Nova Tarefa  │     │Novo Projeto  │     │ Nova Equipe  │
│Editar Tarefa │     │Editar Projeto│     │Editar Equipe │
│Ver Detalhes  │     │Ver Detalhes  │     │Ver Membros   │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## 🔐 Módulo de Autenticação

### 1. **Página de Login**
**Rota:** `/login`

**Elementos:**
- Logo do sistema
- Campo: Email/Username
- Campo: Senha
- Checkbox: "Lembrar-me"
- Botão: "Entrar"
- Link: "Esqueci minha senha"
- Link: "Criar conta"

**Fluxo:**
```
Login → Validação → Dashboard (sucesso)
                  → Mensagem de erro (falha)
```

---

### 2. **Página de Registro**
**Rota:** `/registro`

**Elementos:**
- Campo: Nome completo
- Campo: Email
- Campo: Username
- Campo: Senha
- Campo: Confirmar senha
- Checkbox: "Aceito os termos"
- Botão: "Criar conta"
- Link: "Já tenho conta"

**Fluxo:**
```
Registro → Validação → Email de confirmação → Login
                     → Mensagem de erro (falha)
```

---

### 3. **Recuperação de Senha**
**Rota:** `/recuperar-senha`

**Elementos:**
- Campo: Email
- Botão: "Enviar link"
- Link: "Voltar ao login"

---

## 🏠 Dashboard Principal

**Rota:** `/dashboard`

### Layout:
```
┌──────────────────────────────────────────────────────────┐
│  [Logo]  Dashboard    [Notificações] [Perfil] [Logout]  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Tarefas    │  │  Projetos   │  │   Equipes   │     │
│  │  Ativas: 15 │  │  Ativos: 5  │  │  Total: 3   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                          │
│  ┌────────────────────────────────────────────────┐     │
│  │         Gráfico de Progresso Semanal           │     │
│  │                                                │     │
│  └────────────────────────────────────────────────┘     │
│                                                          │
│  ┌────────────────────────────────────────────────┐     │
│  │         Tarefas Recentes                       │     │
│  │  • Tarefa 1 - Em Progresso                     │     │
│  │  • Tarefa 2 - Pendente                         │     │
│  │  • Tarefa 3 - Concluída                        │     │
│  └────────────────────────────────────────────────┘     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Componentes:**
- Cards de estatísticas
- Gráfico de progresso
- Lista de tarefas recentes
- Atalhos rápidos

---

## ✅ Módulo de Tarefas

### 4. **Lista de Tarefas**
**Rota:** `/tarefas`

**Elementos:**
- Barra de pesquisa
- Filtros (Status, Prioridade, Data, Projeto)
- Botão: "Nova Tarefa"
- Tabela/Cards de tarefas
- Paginação

**Colunas da Tabela:**
- Título
- Projeto
- Responsável
- Prioridade
- Status
- Data de entrega
- Ações (Editar, Excluir, Ver)

**Fluxo:**
```
Lista → Filtrar/Pesquisar → Resultados
     → Clicar em tarefa → Detalhes da Tarefa
     → Nova Tarefa → Formulário de Criação
```

---

### 5. **Nova Tarefa / Editar Tarefa**
**Rota:** `/tarefas/nova` ou `/tarefas/editar/:id`

**Formulário:**
- Campo: Título *
- Campo: Descrição (editor de texto rico)
- Select: Projeto *
- Select: Responsável
- Select: Prioridade (Baixa, Média, Alta, Urgente)
- Select: Status (Pendente, Em Progresso, Concluída)
- Campo: Data de início
- Campo: Data de entrega *
- Campo: Tags
- Upload: Anexos
- Botão: "Salvar"
- Botão: "Cancelar"

**Validações:**
- Campos obrigatórios (*)
- Data de entrega >= Data de início
- Título mínimo 5 caracteres

---

### 6. **Detalhes da Tarefa**
**Rota:** `/tarefas/:id`

**Seções:**
- **Cabeçalho:** Título, Status, Prioridade
- **Informações:** Projeto, Responsável, Datas
- **Descrição:** Texto completo
- **Anexos:** Lista de arquivos
- **Comentários:** Thread de discussão
- **Histórico:** Log de alterações
- **Ações:** Editar, Excluir, Marcar como concluída

---

## 📁 Módulo de Projetos

### 7. **Lista de Projetos**
**Rota:** `/projetos`

**Elementos:**
- Barra de pesquisa
- Filtros (Status, Data)
- Botão: "Novo Projeto"
- Cards de projetos (grid)
- Cada card mostra:
  - Nome do projeto
  - Progresso (%)
  - Número de tarefas
  - Membros da equipe
  - Data de entrega

---

### 8. **Novo Projeto / Editar Projeto**
**Rota:** `/projetos/novo` ou `/projetos/editar/:id`

**Formulário:**
- Campo: Nome do projeto *
- Campo: Descrição
- Select: Equipe responsável
- Campo: Data de início *
- Campo: Data de entrega *
- Select: Status
- Campo: Orçamento
- Upload: Documentos
- Botão: "Salvar"
- Botão: "Cancelar"

---

### 9. **Detalhes do Projeto**
**Rota:** `/projetos/:id`

**Abas:**
1. **Visão Geral**
   - Informações do projeto
   - Progresso geral
   - Estatísticas

2. **Tarefas**
   - Lista de tarefas do projeto
   - Kanban board (opcional)

3. **Equipe**
   - Membros do projeto
   - Papéis e responsabilidades

4. **Documentos**
   - Arquivos anexados
   - Upload de novos documentos

5. **Atividades**
   - Histórico de mudanças

---

## 👥 Módulo de Equipes

### 10. **Lista de Equipes**
**Rota:** `/equipes`

**Elementos:**
- Barra de pesquisa
- Botão: "Nova Equipe"
- Cards de equipes
- Cada card mostra:
  - Nome da equipe
  - Número de membros
  - Projetos ativos
  - Líder da equipe

---

### 11. **Nova Equipe / Editar Equipe**
**Rota:** `/equipes/nova` ou `/equipes/editar/:id`

**Formulário:**
- Campo: Nome da equipe *
- Campo: Descrição
- Select: Líder da equipe *
- Multi-select: Membros
- Campo: Departamento
- Botão: "Salvar"
- Botão: "Cancelar"

---

### 12. **Detalhes da Equipe**
**Rota:** `/equipes/:id`

**Seções:**
- Informações da equipe
- Lista de membros (com avatares)
- Projetos da equipe
- Estatísticas de produtividade

---

## 👤 Módulo de Perfil

### 13. **Perfil do Usuário**
**Rota:** `/perfil`

**Abas:**
1. **Informações Pessoais**
   - Avatar
   - Nome, Email, Username
   - Bio
   - Botão: "Editar"

2. **Minhas Tarefas**
   - Tarefas atribuídas
   - Filtros rápidos

3. **Configurações**
   - Notificações
   - Preferências
   - Segurança (alterar senha)

4. **Atividade**
   - Histórico de ações

---

## 📊 Módulo de Relatórios

### 14. **Relatórios**
**Rota:** `/relatorios`

**Tipos de Relatórios:**
1. **Produtividade por Usuário**
2. **Status de Projetos**
3. **Tarefas por Prioridade**
4. **Tempo médio de conclusão**
5. **Relatório personalizado**

**Elementos:**
- Filtros (Data, Usuário, Projeto)
- Gráficos interativos
- Botão: "Exportar PDF"
- Botão: "Exportar Excel"

---

## 🔔 Sistema de Notificações

**Localização:** Navbar (ícone de sino)

**Tipos de Notificações:**
- Nova tarefa atribuída
- Tarefa atualizada
- Comentário em tarefa
- Prazo próximo
- Tarefa concluída
- Novo membro na equipe

**Ações:**
- Marcar como lida
- Ir para item relacionado
- Limpar todas

---

## 🎨 Componentes Globais

### Navbar (Topo)
- Logo
- Menu de navegação
- Pesquisa global
- Notificações
- Perfil do usuário

### Sidebar (Lateral - Opcional)
- Dashboard
- Tarefas
- Projetos
- Equipes
- Relatórios
- Configurações

### Footer
- Copyright
- Links úteis
- Versão do sistema

---

## 📱 Responsividade

### Desktop (> 1024px)
- Sidebar + Conteúdo principal
- Tabelas completas
- Gráficos expandidos

### Tablet (768px - 1024px)
- Sidebar colapsável
- Tabelas com scroll horizontal
- Cards em grid 2 colunas

### Mobile (< 768px)
- Menu hambúrguer
- Cards em coluna única
- Tabelas em formato de cards
- Bottom navigation (opcional)

---

## 🎯 Prioridades de Implementação

### Sprint 1 (Semana 1-2)
1. Login/Registro
2. Dashboard básico
3. Lista de tarefas
4. Nova tarefa

### Sprint 2 (Semana 3-4)
1. Detalhes da tarefa
2. Editar/Excluir tarefa
3. Lista de projetos
4. Novo projeto

### Sprint 3 (Semana 5-6)
1. Detalhes do projeto
2. Equipes
3. Perfil do usuário
4. Notificações

### Sprint 4 (Semana 7-8)
1. Relatórios
2. Comentários
3. Anexos
4. Polimento geral

---

## 📝 Notas de Design

### Paleta de Cores Sugerida
- **Primária:** #4F46E5 (Indigo)
- **Secundária:** #10B981 (Green)
- **Alerta:** #F59E0B (Amber)
- **Erro:** #EF4444 (Red)
- **Sucesso:** #10B981 (Green)
- **Fundo:** #F9FAFB (Gray 50)
- **Texto:** #111827 (Gray 900)

### Tipografia
- **Fonte:** Inter, Roboto ou Outfit
- **Títulos:** 24-32px, Bold
- **Subtítulos:** 18-20px, Semibold
- **Corpo:** 14-16px, Regular

### Espaçamento
- **Padding cards:** 20-24px
- **Margin entre seções:** 32-40px
- **Gap em grids:** 16-24px

---

**Última atualização:** 05/02/2026
