# 🚀 Resumo das Atividades e Desenvolvimento do Projeto TaskFlow

**Data:** Fevereiro de 2026
**Projeto:** Sistema de Gestão de Tarefas (TaskFlow)

Este documento resume todo o trabalho realizado no desenvolvimento do sistema TaskFlow, desde a concepção da base de dados até à implementação da interface de utilizador e documentação final.

---

## 1. 🏗️ Arquitetura e Base de Dados

O primeiro passo foi definir a estrutura sólida do sistema para suportar utilizadores, tarefas e anexos.

- **Definição do Modelo de Dados (`modelo_fisico.sql`)**:
  - Criámos a tabela `Utilizador` com suporte a perfis (`admin` e `membro`).
  - Estruturámos a tabela `Tarefa` com estados (Pendente, Em Andamento, Concluída) e datas de vencimento.
  - Implementámos a tabela `Anexo` para gerir ficheiros associados às tarefas.
  - Adicionámos tabelas de permissões (`Permissao`, `Permissao_Utilizador`) para escalabilidade futura.
  - **Destaque**: Uso de `ON DELETE CASCADE` para garantir integridade referencial (se apagar um utilizador, apaga as tarefas; se apagar tarefa, apaga os anexos).

---

## 2. ⚙️ Desenvolvimento do Backend (API)

Construímos uma API robusta em Node.js e Express para servir o frontend.

- **Configuração do Servidor**:
  - Setup inicial com `Express`, `cors`, `morgan` e variáveis de ambiente (`dotenv`).
  - Conexão segura ao MySQL usando `mysql2` com pool de conexões.

- **Segurança e Autenticação**:
  - Implementação de registo e login com **hash de senhas** (`bcryptjs`).
  - Geração e validação de **Tokens JWT** para controlo de sessão.
  - Criação de Middlewares:
    - `authMiddleware`: Protege rotas privadas.
    - `roleMiddleware`: Restringe acesso a funcionalidades de administrador.

- **Funcionalidades da API**:
  - **CRUD de Tarefas**: Criar, ler, atualizar e apagar tarefas (com validação de propriedade).
  - **Gestão de Anexos**: Upload de ficheiros com `Multer`, armazenamento em disco e registo na BD.
  - **Gestão de Utilizadores**: Perfil, alteração de senha e administração de contas.

---

## 3. 🎨 Desenvolvimento do Frontend (Interface)

Criámos uma interface moderna e responsiva utilizando React, Vite e Styled Components.

- **Design System**:
  - Definimos uma paleta de cores moderna (Azul `#0061ff` como primária).
  - Utilizámos `Styled Components` para criar componentes reutilizáveis e isolados.
  - Integração da biblioteca `lucide-react` para ícones consistentes.

- **Componentes Principais**:
  - **Layout Principal**: Sidebar colapsável, header fixo e navegação fluida.
  - **Dashboard Kanban**: Quadro interativo com colunas (Pendente, Em Andamento, Concluída).
  - **TaskCard**: Cartão de tarefa com visualização rápida de status, data e anexos.
  - **Modais**: Formulários para criar/editar tarefas sem sair da página.

- **Funcionalidades de Destaque**:
  - **Drag & Drop de Anexos**: Componente `AttachmentManager` que permite arrastar arquivos para upload.
  - **Feedback Visual**: Loaders, mensagens de erro e validações de formulário.
  - **Rotas Protegidas**: Sistema que redireciona utilizadores não autenticados para o login.

---

## 4. 🔄 Integração e Refinamentos

Após a base pronta, focámos em melhorar a experiência e corrigir detalhes.

- **Refinamento Visual**:
  - Removemos fundos brancos "duros" dos cartões para um visual mais limpo e integrado ao fundo do dashboard.
  - Ajustámos a responsividade para funcionar bem em telemóveis (menu hambúrguer, colunas empilhadas).

- **Gestão de Estado**:
  - Implementámos o `AuthContext` para gerir o utilizador logado em toda a aplicação.
  - Centralizámos as chamadas à API no `api.js` para facilitar manutenção.

---

## 5. 📚 Documentação

Para finalizar e garantir a manutenibilidade do projeto, criámos uma documentação completa.

- **READMEs**: Documentos específicos para o Backend, Frontend e o projeto geral, explicando instalação e tecnologias.
- **Documentação Técnica**: Explicação detalhada, ficheiro por ficheiro, com comentários em todos os blocos de código importantes, fluxos de autenticação e upload.

---

### ✅ Conclusão

O **TaskFlow** é agora um sistema completo, seguro e documentado. A arquitetura escolhida permite fácil expansão futura (como adicionar notificações em tempo real ou equipas), e a base de código está limpa e organizada.
