create database if not exists yt_song;
use yt_song;
DROP TABLE IF EXISTS `songs`;
create table IF not exists `songs`
(
  `id` INT(20) AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `author` VARCHAR(100) NOT NULL,
  `sort_index` INT(10) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;