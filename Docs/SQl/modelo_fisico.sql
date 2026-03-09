-- Banco de Dados para Gestão de Tarefas com Anexos
-- RESET: DROP DATABASE IF EXISTS GestaoTarefas;
CREATE DATABASE IF NOT EXISTS GestaoTarefas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE GestaoTarefas;

-- Tabela de Utilizadores
CREATE TABLE Utilizador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(200) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Quadros (Boards)
CREATE TABLE quadro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    utilizador_id INT NOT NULL,
    foto_fundo VARCHAR(500) DEFAULT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (utilizador_id) REFERENCES Utilizador(id) ON DELETE CASCADE
);

-- Tabela de Tarefas
CREATE TABLE Tarefa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    status ENUM('Pendente', 'Em Andamento', 'Concluída') NOT NULL DEFAULT 'Pendente',
    prioridade ENUM('Baixa', 'Média', 'Alta', 'Urgente') NOT NULL DEFAULT 'Média',
    data_vencimento DATE DEFAULT NULL,
    utilizador_id INT NOT NULL,
    quadro_id INT DEFAULT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (utilizador_id) REFERENCES Utilizador(id) ON DELETE CASCADE,
    FOREIGN KEY (quadro_id) REFERENCES quadro(id) ON DELETE SET NULL
);

-- Tabela de Anexos (Arquivos)
CREATE TABLE Anexo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_arquivo VARCHAR(255) NOT NULL,
    caminho_arquivo VARCHAR(500) NOT NULL,
    tipo_arquivo VARCHAR(100),
    tamanho_arquivo INT,
    tarefa_id INT NOT NULL,
    data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tarefa_id) REFERENCES Tarefa(id) ON DELETE CASCADE
);

