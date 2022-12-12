CREATE DATABASE if not exists Gameshop_database;
USE Gameshop_database;


DROP TABLE if exists buy;
DROP TABLE if exists have;
DROP TABLE if exists console;
DROP TABLE if exists store;
DROP TABLE if exists game;
DROP TABLE if exists editor;
DROP TABLE if exists client;


CREATE TABLE client(
   ID_client INT auto_increment,
   client_created datetime,
   client_age INT,
   client_name VARCHAR(50),
   lastname VARCHAR(50),
   phone VARCHAR(50),
   list_sale VARCHAR(50),
   mail_address VARCHAR(50),
   client_role VARCHAR(50),
   client_password VARCHAR(500),
   PRIMARY KEY(ID_client)
);

CREATE TABLE editor(
   editor_ID INT auto_increment,
   editor_name VARCHAR(50),
   PRIMARY KEY(editor_ID)
);


CREATE TABLE console(
   ID_console INT auto_increment,
   stockage INT,
   console_name VARCHAR(50),
   console_color VARCHAR(50),
   console_price INT,
   console_stock INT,
   console_image VARCHAR(50),
   view_image VARCHAR(50),
   PRIMARY KEY(ID_console)
);

CREATE TABLE game(
   ID_game INT auto_increment,
   price INT,
   game_description VARCHAR(300),
   game_name VARCHAR(50),
   category VARCHAR(50),
   game_stock INT,
   ID_editor INT NOT NULL,
   game_image VARCHAR(50),
   jacket VARCHAR(50),
   PRIMARY KEY(ID_game),
   FOREIGN KEY(ID_editor) REFERENCES editor(editor_ID)
);

CREATE TABLE have(
   ID_client INT,
   ID_game INT,
   PRIMARY KEY(ID_client, ID_game),
   FOREIGN KEY(ID_client) REFERENCES client(ID_client),
   FOREIGN KEY(ID_game) REFERENCES game(ID_game)
);

CREATE TABLE buy(
   ID_client INT,
   ID_console INT,
   PRIMARY KEY(ID_client, ID_console),
   FOREIGN KEY(ID_client) REFERENCES client(ID_client),
   FOREIGN KEY(ID_console) REFERENCES Console(ID_console)
);


insert into editor values (NULL,"Electronic Arts"); --  Fifa 1982 1
insert into editor values (NULL,"Nitendo"); -- Mario, Animal crossing, Wii sport 2
insert into editor values (NULL,"Activision"); -- Call of Duty 3
insert into editor values (NULL,"Blizzard"); -- Overwatch 2 4 
insert into editor values (NULL,"Take Two Interactive"); -- NBA 2K 5
insert into editor values (NULL,"Epic Games"); -- Rocket League 6 
insert into editor values (NULL,"Warner Bros"); -- Lego Star Wars : La Saga Skywalker 7
insert into editor values (NULL,"Ubisoft"); -- Assassin, Rayman 8
insert into editor values (NULL,"Gameloft");-- Asphalt 9 9 
insert into editor values (NULL,"Tencent"); --  Arena of Valor 10
insert into editor values (NULL,"Square Enix");-- Final fantasy VII 11
insert into editor values (NULL,"SEGA"); -- SONIC 12 
insert into editor values (NULL,"Bandai Namco"); -- Dragon Ball Z; Kakarot; The Witcher 3; 13 
insert into editor values (NULL,"Mojang Studios"); -- Minecraft 14
insert into editor values (NULL,"Rebound CG"); -- Tennis manager 2022 15

insert into client values (NULL,now(),20,"Gattino","Chloé","0625126117","Mario kart 8","chloegattino5@gmail.com",'USER',sha2(concat(now(),'cloclo91'), 224));
insert into client values (NULL,now(),17,"Cantrelle","Noa","0785896324","Wii sport resort","noacantrelle@efrei.net",'ADMIN',sha2(concat(now(),'nono640'), 224));
insert into client values (NULL,now(),31,"Rey","Pierre","0698741236","Assassin's Creed Origins","pierre.rey@efrei.net",'ADMIN',sha2(concat(now(),'pierropierro'), 224));
insert into client values (NULL,now(),14,"Gattino","Manon","0652741670","Mario kart 8","gattinomanon@gmail.com",'USER',sha2(concat(now(),'manongat'), 224));
insert into client values (NULL,now(),25,"Michot","Marie","0766984610","Minecraft","marie.michot@efrei.net",'USER',sha2(concat(now(),'marie77'), 224));
insert into client values (NULL,now(),38,"Harry","Potter","0620000000","Fifa 23","Harry.potter@efrei.net",'USER',sha2(concat(now(),'vol2mort'), 224));
insert into client values (NULL,now(),45,"Chapron","Nathalie","0645987632","Animal Crossing","nathalie.chapron@efrei.net",'ADMIN',sha2(concat(now(),'natlesang'), 224));
insert into client values (NULL,now(),18,"Hecq","Guerlyn","0699765213","NBA 2K23","guerlynhecq@gmail.com",'ADMIN',sha2(concat(now(),'guegue13'), 224));
insert into client values (NULL,now(),17,"Pinto","Martin","0755264890","Tennis manager 2022","martin.pinto@gmail.com",'USER',sha2(concat(now(),'pintouch13'), 224));
insert into client values (NULL,now(),14,"Gattino","Manon","0652741670","Animal Crossing","gattinomanon@gmail.com",'USER',sha2(concat(now(),'manongat'), 224));
insert into client values (NULL,now(),22,"Prim","Lorraine","0650020491","Rayman Legends Definitive","primlorraine@gmail.com",'ADMIN',sha2(concat(now(),'lolo91'), 224));


insert into game values (NULL,55,"Frenzied karting races in the universe of super mario", "Mario kart 8","Family",15,2,"MarioKart8.jpg", "MarioKart.jpg"); --
insert into game values (NULL,50,"Adventure in the universe of super mario", "Super Mario Bross","Family",14,2, "SuperMarioBross.jpg", "marioBross.jpg"); -- 
insert into game values (NULL,48,"Family sports game", "Wii sport resort","Sport",12,2,"WiiSportResort.jpg", "WiiSport.jpg");
insert into game values (NULL,30,"Action-adventure open-world stealth game", "Assassin's Creed Origins","Adventure",26,8,"Assassin.jpg", "assasin.jpg");
insert into game values (NULL,20,"Players explore a blocky, procedurally generated 3D world with virtually infinite terrain and may discover and extract raw materials", "Minecraft","Adventure",4,14,"Minecraft.jpg", "Minecraft.jpg");
insert into game values (NULL,70,"Football game that allows the player to develop his favorite team", "Fifa 23","Sport",8,1,"Fifa23.jpg", "fifa.jpg");
insert into game values (NULL,52,"Series of life simulation games in which players control an avatar who starts a new life, in a city full of eccentric animals", "Animal Crossing","Adventure",9,2,"AnimalCrossing.jpg", "animalCross.jpg");
insert into game values (NULL,45,"Basketball game based on the National Basketball Association", "NBA 2K23","Sport",6,5,"NBA2k23.jpg", "2K23.jpg");
insert into game values (NULL,49,"Tennis management game", "Tennis manager 2022","Sport",4,15,"TennisManager2022.jpg", "Tennis.jpg");
insert into game values (NULL,30,"2D side-scrolling platform video game", "Rayman Legends Definitive","Adventure",10,8,"Rayman.jpg", "Rayman.jpg");
insert into game values (NULL, 70,"Worlds are colliding in Sonic the Hedgehog’s newest high-speed adventure!","Sonic FRONTIERS", "Adventure", 50,12,"Sonic.jpg", "Sonic.jpg");
insert into game values (NULL, 60,"Relive the story of Goku and other Z Fighters in DRAGON BALL Z: KAKAROT!", "Dragon Ball Z: Kakarot","Action", 30,13,"DBZ.png", "DBZ.jpg");
insert into game values (NULL, 50,"Call of Duty: WWII Multiplayer engages players in grounded, fast-paced combat across many of World War II's most iconic locations.","Call of Duty®: WWII","War", 8,3,"CallOfDuty.jpg", "WWII.jpg");
insert into game values (NULL, 60,"Overwatch 2 is a free-to-play, team-based action game set in the optimistic future, where every match is the ultimate 5v5 battlefield brawl.","Overwatch 2","MOBA", 18,4,"Overwatch2.jpg", "Overwatch.jpg");
insert into game values (NULL, 10,"Rocket League is a high-powered hybrid of arcade-style soccer and vehicular mayhem with easy-to-understand controls and fluid, physics-driven competition.","Rocket League","Car", 21,6,"RocketLeague.jpg", "RocketLeague.jpg");
insert into game values (NULL, 45,"The galaxy is yours in LEGO® Star Wars™: The Skywalker Saga.","Lego Star Wars : La Saga Skywalker","Adventure", 48,7,"LegoStarWars.jpg", "lego.jpg");
insert into game values (NULL, 55,"Take on the world's fearless and become an Asphalt legend in the best arcade racing game","Asphalt 9: Legends","Car", 10,9,"Asphalt9.jpg", "asphalt.jpg");
insert into game values (NULL, 20,"Experience Arena of Valor, an epic new 5v5 multiplayer online battle arena (MOBA)","Arena of Valor","RPG", 23,10,"ArenaOfValor.jpg", "Arena.png");
insert into game values (NULL, 5,"The game's story follows Cloud Strife, a mercenary who joins an eco-terrorist organization to stop a world-controlling megacorporation ","Final Fantasy VII","Adventure", 1,11,"FinalFantasyVII.jpg", "Final.png");
insert into game values (NULL, 30, "As war rages across the Northern Kingdoms, you accept the contract of your life and seek out the Child of Prophecy, a living weapon capable of changing the world.","The Witcher 3 : Wild Hunt","RPG", 20, 13,"TheWitcher.jpg", "Witcher.jpg");


insert into console values (NULL,500,"XBOX ONE","black",250,15,"XBOXone.png", "XboxOne.png");
insert into console values (NULL,500,"PS4","black",250,14, "ps4.png", "PS4.png");
insert into console values (NULL,0,"Nitendo 3DS","blue",130,6, "Nintendo3DS.png", "3DS.png");
insert into console values (NULL,32,"Nitendo SWITCH","black",260,11, "Switch.png", "Switch.png");
insert into console values (NULL,64,"Nitendo SWITCH OLED","white",320,2, "SwitchOLED.png", "SwitchOled.png");
insert into console values (NULL,500,"XBOX ONE S","white",350,9, "XBOXoneS.png", "XboxS.png");
insert into console values (NULL,32,"Nitendo SWITCH LITE","pink",200,5, "SwitchLite.png", "Switchlite.png");
insert into console values (NULL,1000,"PS5","white",500,3, "PS5.png", "PS5.png");
insert into console values (NULL,0,"Game Boy","grey",60,1, "gameboy.png", "Gameboy.png");
insert into console values (NULL,1000,"XBOX ONE X","black",500,5, "XBOXoneX.png", "XboxX.png");


insert into have values (1,15);
insert into have values (2,12);
insert into have values (3,11);
insert into have values (4,6);
insert into have values (5,2);
insert into have values (6,1);
insert into have values (7,9);
insert into have values (8,11);
insert into have values (9,7);
insert into have values (10,15);


insert into buy values (1,3);
insert into buy values (2,3);
insert into buy values (3,8);
insert into buy values (4,9);
insert into buy values (5,5);
insert into buy values (6,5);
insert into buy values (7,5);
insert into buy values (8,2);
insert into buy values (9,10);
insert into buy values (10,4);
