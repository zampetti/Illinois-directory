CREATE DATABASE directory;
USE directory;
CREATE TABLE `department` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `name` varchar(100) NOT NULL );

CREATE TABLE `profile` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `deptId` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `imageUrl` varchar(100) NOT NULL ); 

CREATE USER IF NOT EXISTS 'profileWriter'@'%' IDENTIFIED BY 'password';
GRANT INSERT, UPDATE, SELECT ON directory.department TO 'profileWriter'@'%';
GRANT INSERT, UPDATE, SELECT ON directory.profile TO 'profileWriter'@'%';

LOAD DATA INFILE '/data/directory/departments.csv' 
INTO TABLE directory.department
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA INFILE '/data/directory/profiles.csv' 
INTO TABLE directory.profile
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';
