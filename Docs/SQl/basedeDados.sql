create DATABASE If not EXISTS GestaoTarefas CHARACTER set utf8mb4 COLLATE utf8mb4_unicode_ci;

use GestaoTarefas;

create TABLE Utilizador(
	id int AUTO_INCREMENT PRIMARY key,
    nome varchar(100) not null,
    email varchar(100) not null UNIQUE,
    senha varchar(200) not null,
    tipo ENUM("Admin","membro") not null
);

create TABLE permissao(
	id int AUTO_INCREMENT PRIMARY key,
    nome varchar(100) not null
);

CREATE TABLE permissao_utilizador(
	utilizador_id int not null,
    permissao_id int not null,
    PRIMARY key (utilizador_id, permissao_id),
    FOREIGN key (utilizador_id) REFERENCES utilizador(id) on DELETE CASCADE,
    FOREIGN key (permissao_id) REFERENCES permissao(id) on DELETE CASCADE
);

CREATE TABLE tarefa(
	id int AUTO_INCREMENT  PRIMARY key,
    titulo varchar(400) not null,
    status enum('Pendente','Em andamento', 'Concluida') not null,
    data_vencimento date not null,
    utililzador_id int not null,
    FOREIGN key (utilizador_id) REFERENCES utilizador(id) on DELETE CASCADE
);