CREATE DATABASE if not exists Gameshop_database;
USE Gameshop_database;

DROP TABLE if exists store;
DROP TABLE if exists editor;
DROP TABLE if exists client;
DROP TABLE if exists game;

CREATE TABLE editor(
   ID_editor INT auto_increment,
   editor_name VARCHAR(50),
   PRIMARY KEY(ID_editor)
);

CREATE TABLE client(
   ID_client INT auto_increment,
   age INT,
   client_name VARCHAR(50),
   surname VARCHAR(50),
   phone VARCHAR(50),
   list_sale VARCHAR(50),
   mail_adress VARCHAR(50),
   Id_store INT NOT NULL,
   PRIMARY KEY(ID_client),
   FOREIGN KEY(Id_store) REFERENCES store(Id_store)
);

CREATE TABLE game(
   ID_game INT auto_increment,
   price INT,
   game_description VARCHAR(50),
   game_name VARCHAR(50),
   category VARCHAR(50),
   ID_editor VARCHAR(50) NOT NULL,
   Id_store INT NOT NULL,
   ID_client INT,
   PRIMARY KEY(ID_game),
   FOREIGN KEY(ID_editor) REFERENCES editor(ID_editor),
   FOREIGN KEY(Id_store) REFERENCES store(Id_store),
   FOREIGN KEY(ID_client) REFERENCES client(ID_client)
);

insert into client values (NULL,20,"Gattino","Chloé","0625126117","Mario kart 8","chloegattino5@gmail.com");
insert into client values (NULL,17,"Cantrelle","Noa","0785896324","Wii sport resort","noacantrelle@efrei.net");
insert into client values (NULL,31,"Rey","Pierre","0698741236","Assassin's Creed Origins","pierre.rey@efrei.net");
insert into client values (NULL,14,"Gattino","Manon","0652741670","Mario kart 8","gattinomanon@gmail.com");
insert into client values (NULL,25,"Michot","Marie","0766984610","Minecraft","marie.michot@efrei.net");
insert into client values (NULL,38,"Harry","Potter","0620000000","Fifa 23","Harry.potter@efrei.net");
insert into client values (NULL,45,"Chapron","Nathalie","0645987632","Animal Crossing","nathalie.chapron@efrei.net");
insert into client values (NULL,18,"Hecq","Guerlyn","0699765213","NBA 2K23","guerlynhecq@gmail.com");
insert into client values (NULL,17,"Pinto","Martin","0755264890","Tennis manager 2022","martin.pinto@gmail.com");
insert into client values (NULL,14,"Gattino","Manon","0652741670","Animal Crossing","gattinomanon@gmail.com");
insert into client values (NULL,22,"Prim","Lorraine","0650020491","Rayman Legends Definitive","primlorraine@gmail.com");

insert into game values (NULL,55,"frenzied karting races in the universe of super mario", "Mario kart 8");
insert into game values (NULL,48,"Family sports game", "Wii sport resort");
insert into game values (NULL,30,"action-adventure open-world stealth game", "Assassin's Creed Origins");
insert into game values (NULL,20,"players explore a blocky, procedurally generated 3D world with virtually infinite terrain and may discover and extract raw materials", "Minecraft");
insert into game values (NULL,70,"football game that allows the player to develop his favorite team", "Fifa 23");
insert into game values (NULL,52,"series of life simulation games in which players control an avatar who starts a new life, in a city full of eccentric animals", "Animal Crossing");
insert into game values (NULL,45,"basketball game based on the National Basketball Association", "NBA 2K23");
insert into game values (NULL,49,"tennis management game", "Tennis manager 2022");
insert into game values (NULL,30,"2D side-scrolling platform video game", "Rayman Legends Definitive");

insert into editor values (NULL,"Electronic Arts"); --Fifa
insert into editor values (NULL,"Nitendo"); -- Mario, Animal crossing, Wii sport
insert into editor values (NULL,"Activision");
insert into editor values (NULL,"Blizzard");
insert into editor values (NULL,"Take Two Interactive"); -- NBA 2K
insert into editor values (NULL,"Epic Games");
insert into editor values (NULL,"Warner Bros");
insert into editor values (NULL,"Ubisoft"); -- Assassin, Rayman
insert into editor values (NULL,"Gameloft");
insert into editor values (NULL,"Tencent");
insert into editor values (NULL,"Square Enix");
insert into editor values (NULL,"SEGA");
insert into editor values (NULL,"Bandai Namco");
insert into editor values (NULL,"Mojang Studios"); -- Minecraft
insert into editor values (NULL,"Rebound CG"); -- Tennis manager 2022

ATLER TABLE client
ADD CONSTRAINT ck_phone CHECK (phone BETWEEN "0600000000" AND "0799999999");
ADD CONSTRAINT ck_age CHECK ( age BETWEEN 16 AND 90);
