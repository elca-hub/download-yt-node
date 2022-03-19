drop database if exists yt_song;
create database if not exists yt_song;

use yt_song;

DROP TABLE IF EXISTS `songs`;

create table IF not exists `songs`
(
  `song_id` INT(20) AUTO_INCREMENT,
  `youtube_id` VARCHAR(200) NOT NULL,
  `list_id` VARCHAR (200) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `author` VARCHAR(100) NOT NULL,
  `sort_index` INT(10) NOT NULL,
  PRIMARY KEY (`song_id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP table if exists `lists`;

create table if not exists `lists`
(
  `list_id` INT(20) AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
   PRIMARY KEY (`list_id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

insert into lists values(-1, 'normal');