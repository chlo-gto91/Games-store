CREATE DATABASE if not exists Gameshop_database;
USE Gameshop_database;

DROP TABLE if exists store;
DROP TABLE if exists editor;
DROP TABLE if exists client;
DROP TABLE if exists game;

CREATE TABLE client(
   ID_client INT,
   client_age INT,
   client_name VARCHAR(50),
   lastname VARCHAR(50),
   phone VARCHAR(50),
   list_sale VARCHAR(50),
   mail_adress VARCHAR(50),
   PRIMARY KEY(ID_client)
);

CREATE TABLE editor(
   ID_editor VARCHAR(50),
   editor_name VARCHAR(50),
   creation_date VARCHAR(50),
   country VARCHAR(50),
   number_games VARCHAR(50),
   PRIMARY KEY(ID_editor)
);

CREATE TABLE game(
   ID_game INT,
   price INT,
   game_description VARCHAR(50),
   game_name VARCHAR(50),
   category VARCHAR(50),
   ID_editor VARCHAR(50) NOT NULL,
   ID_client INT,
   PRIMARY KEY(ID_game),
   FOREIGN KEY(ID_editor) REFERENCES editor(ID_editor),
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

insert into editor values (NULL,"Electronic Arts", "1982", "USA"); --Fifa 1982
insert into editor values (NULL,"Nitendo", "1889", "Japon"); -- Mario, Animal crossing, Wii sport
insert into editor values (NULL,"Activision", "1979", "USA");
insert into editor values (NULL,"Blizzard", "1991", "USA");
insert into editor values (NULL,"Take Two Interactive", "1993", "USA"); -- NBA 2K
insert into editor values (NULL,"Epic Games", "1991", "USA");
insert into editor values (NULL,"Warner Bros", "1923", "USA");
insert into editor values (NULL,"Ubisoft","1986","France","108"); -- Assassin, Rayman
insert into editor values (NULL,"Gameloft","1999","France");
insert into editor values (NULL,"Tencent","1998","Chine");
insert into editor values (NULL,"Square Enix","2003","Japon");
insert into editor values (NULL,"SEGA","1951","USA");
insert into editor values (NULL,"Bandai Namco","2006","Japon");
insert into editor values (NULL,"Mojang Studios","2009","Suède"); -- Minecraft
insert into editor values (NULL,"Rebound CG","2017","France"); -- Tennis manager 2022

ATLER TABLE client
ADD CONSTRAINT ck_phone CHECK (phone BETWEEN "0600000000" AND "0799999999");
ADD CONSTRAINT ck_age CHECK ( age BETWEEN 16 AND 90);
