# Guia de Configuração Distribuída - TaskFlow Elite

Este documento explica como configurar e executar o projeto **TaskFlow** dividindo os componentes em três máquinas diferentes:
1. **Máquina A:** Banco de Dados (MySQL)
2. **Máquina B:** Servidor Backend (Node.js)
3. **Máquina C:** Servidor Frontend (React/Vite)

---

## 📋 Pré-requisitos Gerais
- Todas as máquinas devem estar na mesma rede ou ter IPs públicos acessíveis entre si.
- Verifique se as portas necessárias estão abertas nos Firewalls de cada máquina.

---

## 🗄️ Máquina A: Banco de Dados (MySQL)

Nesta máquina, o objetivo é hospedar os dados e permitir que o Backend (Máquina B) se conecte remotamente.

1.  **Instalar MySQL Server.**
2.  **Configurar o MySQL para aceitar conexões externas:**
    - Edite o arquivo de configuração do MySQL (`my.cnf` ou `my.ini`).
    - Altere `bind-address = 127.0.0.1` para `bind-address = 0.0.0.0` (ou o IP específico da Máquina A).
3.  **Criar Usuário com permissão remota:**
    - Acesse o terminal do MySQL e execute:
    ```sql
    CREATE USER 'taskuser'@'%' IDENTIFIED BY 'sua_senha_segura';
    GRANT ALL PRIVILEGES ON gestao_tarefas_db.* TO 'taskuser'@'%';
    FLUSH PRIVILEGES;
    ```
    *(Nota: O '%' permite conexão de qualquer IP. Para maior segurança, substitua '%' pelo IP da Máquina B).*
4.  **Abrir Porta:** Garanta que a porta **3306** está aberta no Firewall.

---

## ⚙️ Máquina B: Servidor Backend (Node.js)

Esta máquina executará a lógica de negócios e se conectará à Máquina A.

1.  **Configurar Variáveis de Ambiente (`.env`):**
    - No diretório `backend/`, edite o arquivo `.env`:
    ```env
    PORT=5000
    DB_HOST=IP_DA_MAQUINA_A  # <-- Coloque o IP da Máquina de Banco de Dados aqui
    DB_USER=taskuser
    DB_PASS=sua_senha_segura
    DB_NAME=gestao_tarefas_db
    JWT_SECRET=seu_segredo_jwt_aqui
    ```
2.  **Instalar dependências e Iniciar:**
    ```bash
    cd backend
    npm install
    npm start
    ```
3.  **Abrir Porta:** Garanta que a porta **5000** está aberta no Firewall da Máquina B para receber conexões do Frontend.

---

## 💻 Máquina C: Servidor Frontend (React/Vite)

Esta máquina servirá a interface para os usuários e fará requisições para a Máquina B.

1.  **Configurar URL da API:**
    - No diretório do frontend, localize o arquivo de serviço da API (geralmente em `src/services/api.js` ou equivalente).
    - Certifique-se de que o `baseURL` do Axios aponta para o IP da Máquina B:
    ```javascript
    // Exemplo em src/services/api.js
    const API = axios.create({
      baseURL: 'http://IP_DA_MAQUINA_B:5000/api'
    });
    ```
2.  **Instalar dependências e Construir/Executar:**
    ```bash
    cd frontend
    npm install
    # Para desenvolvimento:
    npm run dev -- --host
    # Para produção:
    npm run build
    ```
    *(Nota: O `--host` no comando dev é essencial para que o servidor Vite seja acessível por outros dispositivos na rede).*
3.  **Acesso:** O sistema estará disponível em `http://IP_DA_MAQUINA_C:5173` (ou a porta configurada).

---

## 🚨 Dicas de Segurança (Importante)
- **Produção:** Nunca use `bind-address = 0.0.0.0` em servidores expostos à internet sem VPN ou regras de firewall muito restritas.
- **SSL:** Configure um proxy reverso (como Nginx) na Máquina B e C para habilitar HTTPS.
- **CORS:** No `backend/src/index.js`, garanta que o CORS permite a origem `http://IP_DA_MAQUINA_C`.

---
*Documento gerado automaticamente para suporte de implantação distribuída.*
