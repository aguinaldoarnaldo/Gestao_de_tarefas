# 📊 Diagrama de Caso de Uso - Gestão de Tarefas com Anexos e Quadros

**Baseado em:** Documento de Análise "Projeto 2" e Modelo Físico SQL.  
**Última Atualização:** 04 de Março de 2026

---

## 📸 Representação Visual (Mermaid)

Este diagrama integra a organização por **Quadros** (Boards) à gestão de tarefas e anexos.

```mermaid
useCaseDiagram
    actor "Utilizador" as U

    package "Gestão de Conta" {
        usecase "Cadastrar Usuário" as UC1
        usecase "Fazer Login" as UC2
    }

    package "Gestão de Quadros (Boards)" {
        usecase "Criar Quadro" as UC4
        usecase "Visualizar Quadros" as UC5
        usecase "Editar Quadro" as UC6
        usecase "Excluir Quadro" as UC7
    }

    package "Gestão de Tarefas" {
        usecase "Criar Tarefa" as UC8
        usecase "Visualizar Tarefas" as UC9
        usecase "Editar Tarefa" as UC10
        usecase "Excluir Tarefa" as UC11
        usecase "Priorizar Tarefa" as UC12
        usecase "Filtrar por Status/Data" as UC13
        usecase "Vincular Tarefa a Quadro" as UC14
    }

    package "Gestão de Anexos" {
        usecase "Anexar Arquivo" as UC15
        usecase "Visualizar Anexos" as UC16
        usecase "Remover Anexo" as UC17
    }

    %% Relacionamentos de Ator
    U --> UC1
    U --> UC2
    
    U --> UC4
    U --> UC5
    U --> UC6
    U --> UC7

    U --> UC8
    U --> UC9
    U --> UC10
    U --> UC11
    U --> UC12
    U --> UC13
    
    U --> UC15
    U --> UC16
    U --> UC17

    %% Regras de Inclusão/Extensão
    UC15 ..> UC8 : <<include>>
    UC13 ..> UC9 : <<extend>>
    UC14 ..> UC8 : <<extend>>
```

---

## 📝 Descrição e Regras de Negócio

### 1. Ator: Utilizador
*   Proprietário de seus próprios Quadros e Tarefas.
*   **Permissão**: Apenas o utilizador criador pode gerenciar o conteúdo (editar/excluir).

### 2. Gestão de Quadros (Boards)
*   **Organização**: Permite agrupar tarefas por contexto (Projeto, Categoria, etc.).
*   **Visualização**: O utilizador pode ver todos os seus quadros criados.

### 3. Gestão de Tarefas
*   **Criar Tarefa (UC8)**: 
    *   **Validação de Data**: A data de vencimento, se definida, deve ser futura.
*   **Vincular a Quadro (UC14)**: Uma tarefa pode pertencer opcionalmente a um quadro.
*   **Filtragem (UC13)**: Capacidade de filtrar tarefas por Status ou Data em qualquer visualização.

### 4. Gestão de Anexos
*   **Multiplicidade**: Uma tarefa suporta múltiplos anexos (documentos, imagens).
*   **Integridade**: Anexos são removidos automaticamente se a tarefa pai for excluída.

---

## 🔗 Mapeamento com o Modelo Físico SQL

| Caso de Uso | Tabela/Campo SQL | Detalhe Técnica |
| :--- | :--- | :--- |
| Gerenciar Quadro | `quadro` | CRUD de pastas/boards organizadores. |
| Vincular Quadro | `Tarefa (quadro_id)` | Chave Estrangeira (FK) opcional. |
| Priorizar | `Tarefa (prioridade)` | Campo `ENUM` (Baixa, Média, Alta, Urgente). |
| Anexar Arquivo | `Anexo` | Tabela filha vinculada a `Tarefa`. |

---
> **Nota de Implementação**: Ao excluir um quadro (`ON DELETE CASCADE`), o sistema removerá em cadeia todas as tarefas e seus respectivos anexos.


---

## 🔒 Regras de Segurança e Acesso
1.  **Autenticação:** O usuário deve estar autenticado para acessar qualquer funcionalidade (exceto Cadastro e Login).
2.  **Propriedade:** Um usuário só pode manipular Quadros e Tarefas que contenham o seu `utilizador_id`.
3.  **Integridade:** O sistema garante que nenhuma tarefa órfã (sem dono) exista, através das chaves estrangeiras.

---
*Documento gerado automaticamente para suporte ao desenvolvimento.*
