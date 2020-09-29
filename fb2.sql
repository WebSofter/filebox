-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               8.0.20 - MySQL Community Server - GPL
-- Операционная система:         Win64
-- HeidiSQL Версия:              11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных filebox
CREATE DATABASE IF NOT EXISTS `filebox` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `filebox`;

-- Дамп структуры для таблица filebox.Access
CREATE TABLE IF NOT EXISTS `Access` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `Name` char(70) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Дамп данных таблицы filebox.Access: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `Access` DISABLE KEYS */;
/*!40000 ALTER TABLE `Access` ENABLE KEYS */;

-- Дамп структуры для таблица filebox.Contents
CREATE TABLE IF NOT EXISTS `Contents` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdUser` int DEFAULT NULL,
  `IdAccess` int DEFAULT NULL,
  `Name` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IdParent` int unsigned DEFAULT '0',
  `IdType` int DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Дамп данных таблицы filebox.Contents: ~11 rows (приблизительно)
/*!40000 ALTER TABLE `Contents` DISABLE KEYS */;
REPLACE INTO `Contents` (`Id`, `IdUser`, `IdAccess`, `Name`, `Date`, `IdParent`, `IdType`) VALUES
	(4, 2, 1, 'Folder Name 1', '2020-05-25 09:02:59', 0, 1),
	(5, 2, 2, 'Папка 5', '2020-05-25 09:03:00', 0, 1),
	(6, 2, 2, 'Имя папки2', '2020-05-25 10:39:32', 0, 1),
	(22, 2, 2, 'Папка 4545', '2020-05-25 10:58:48', 4, 1),
	(24, 2, 1, 'file_2.jpg', '2020-05-26 05:04:05', 5, 2),
	(25, 2, 2, 'file_3.jpg', '2020-05-26 05:03:52', 0, 2),
	(27, 2, 2, 'file_name.png', '2020-05-26 05:03:38', 0, 2),
	(28, 2, 2, 'readme.txt', '2020-05-25 09:03:06', 4, 2),
	(29, 2, 1, 'folder', '2020-05-26 05:03:15', 4, 1),
	(30, 2, 2, 'file_1.jpg', '2020-05-26 05:03:04', 0, 2),
	(51, 2, 2, 'Моя новая папка', '2020-05-26 00:56:30', 0, 1);
/*!40000 ALTER TABLE `Contents` ENABLE KEYS */;

-- Дамп структуры для таблица filebox.Files
CREATE TABLE IF NOT EXISTS `Files` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `IdUser` int unsigned DEFAULT NULL,
  `IdAccess` int unsigned DEFAULT NULL,
  `IdParent` int unsigned DEFAULT NULL,
  `Name` char(120) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=326 DEFAULT CHARSET=latin1;

-- Дамп данных таблицы filebox.Files: ~5 rows (приблизительно)
/*!40000 ALTER TABLE `Files` DISABLE KEYS */;
REPLACE INTO `Files` (`Id`, `IdUser`, `IdAccess`, `IdParent`, `Name`, `Date`) VALUES
	(52, 2, 3, 0, 'File Name 3.pdf', '2020-05-23 17:17:57'),
	(55, 2, 1, 5, 'Имя файла.jpg', '2020-05-21 15:28:33'),
	(58, 2, 1, 4, 'file2.jpg', '2020-05-22 00:18:58'),
	(141, 2, 2, 0, 'File Name 2.pdf', '2020-05-23 17:17:58'),
	(325, 2, 1, 0, 'File Name 1.pdf', '2020-05-23 17:17:59');
/*!40000 ALTER TABLE `Files` ENABLE KEYS */;

-- Дамп структуры для таблица filebox.Folders
CREATE TABLE IF NOT EXISTS `Folders` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdUser` int DEFAULT NULL,
  `IdAccess` int DEFAULT NULL,
  `Name` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `IdParent` int unsigned DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

-- Дамп данных таблицы filebox.Folders: ~9 rows (приблизительно)
/*!40000 ALTER TABLE `Folders` DISABLE KEYS */;
REPLACE INTO `Folders` (`Id`, `IdUser`, `IdAccess`, `Name`, `Date`, `IdParent`) VALUES
	(4, 2, 1, 'Folder Name 1', '2020-05-24 18:45:39', 0),
	(5, 2, 2, 'Папка 5', '2020-05-25 08:03:23', 0),
	(6, 2, 2, 'Имя папки', '2020-05-24 18:45:43', 0),
	(7, 2, 1, 'Моя папка 3333', '2020-05-24 18:48:17', 6),
	(22, 2, 2, 'Папка', '2020-05-24 21:24:49', 0),
	(23, 2, 2, 'readme.txt', '2020-05-25 08:06:51', 4),
	(24, 2, 1, 'myfile.pdf', '2020-05-25 08:06:41', 5),
	(25, 2, 2, 'записки.pdf', '2020-05-25 08:06:20', 0),
	(26, 2, 2, 'тетрадь.doc', '2020-05-25 08:06:06', 0);
/*!40000 ALTER TABLE `Folders` ENABLE KEYS */;

-- Дамп структуры для таблица filebox.Inners
CREATE TABLE IF NOT EXISTS `Inners` (
  `IdFolderParent` int unsigned NOT NULL,
  `IdFolderChild` int unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Дамп данных таблицы filebox.Inners: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `Inners` DISABLE KEYS */;
/*!40000 ALTER TABLE `Inners` ENABLE KEYS */;

-- Дамп структуры для таблица filebox.Pricings
CREATE TABLE IF NOT EXISTS `Pricings` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `Name` char(70) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Volume` int unsigned DEFAULT NULL,
  `Price` int unsigned DEFAULT NULL,
  `Users` int unsigned DEFAULT NULL,
  `Status` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Дамп данных таблицы filebox.Pricings: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `Pricings` DISABLE KEYS */;
REPLACE INTO `Pricings` (`Id`, `Name`, `Volume`, `Price`, `Users`, `Status`) VALUES
	(1, 'Start', 2000, 10, 10, NULL),
	(2, 'Pro', 5000, 299, 15, 'favorite'),
	(3, 'Enterprise', 10000, 499, 20, NULL);
/*!40000 ALTER TABLE `Pricings` ENABLE KEYS */;

-- Дамп структуры для таблица filebox.Rights
CREATE TABLE IF NOT EXISTS `Rights` (
  `IdFile` int unsigned DEFAULT NULL,
  `IdUser` int unsigned DEFAULT NULL,
  `IdAccess` int unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Дамп данных таблицы filebox.Rights: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `Rights` DISABLE KEYS */;
/*!40000 ALTER TABLE `Rights` ENABLE KEYS */;

-- Дамп структуры для таблица filebox.Types
CREATE TABLE IF NOT EXISTS `Types` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` char(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Дамп данных таблицы filebox.Types: ~2 rows (приблизительно)
/*!40000 ALTER TABLE `Types` DISABLE KEYS */;
REPLACE INTO `Types` (`Id`, `Name`) VALUES
	(1, 'dir'),
	(2, 'file');
/*!40000 ALTER TABLE `Types` ENABLE KEYS */;

-- Дамп структуры для таблица filebox.Users
CREATE TABLE IF NOT EXISTS `Users` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `IdPricing` int unsigned DEFAULT NULL,
  `Login` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Password` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Name` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Surname` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COMMENT='Таблица пользователей';

-- Дамп данных таблицы filebox.Users: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
REPLACE INTO `Users` (`Id`, `IdPricing`, `Login`, `Password`, `Name`, `Surname`) VALUES
	(1, 2, 'admin', '123456', 'Админ', 'Админов'),
	(2, 3, 'websofter', '123456', 'Марк', 'Каменски'),
	(3, 2, 'gerda', '123456', 'Герда', 'Лемова');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
