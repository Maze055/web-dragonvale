-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 27, 2016 at 08:01 PM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

--
-- Database: `dragonvale`
--
CREATE DATABASE IF NOT EXISTS `dragonvale` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `dragonvale`;

-- --------------------------------------------------------

--
-- Table structure for table `breedingHintsNotes`
--

DROP TABLE IF EXISTS `breedingHintsNotes`;
CREATE TABLE `breedingHintsNotes` (
  `id` char(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `en` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `it` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `breedingHintsNotes`
--

INSERT INTO `breedingHintsNotes` (`id`, `en`, `it`) VALUES
('4ELEM', 'Any four different elements', 'Quattro elementi diversi qualsiasi'),
('DREAM', 'Any other two different elements', 'Altri due elementi diversi qualsiasi'),
('GALA', 'Any Galaxy or epic', 'Qualsiasi Galaxy o epic'),
('MOT', 'Any pair of dragons', 'Qualsiasi coppia di draghi'),
('SNMO', 'Any pair of $ELEM dragons', 'Qualsiasi coppia di draghi $ELEM'),
('UNKN', 'Unknown at present', 'Attualmente sconosciuto'),
('WIP', 'Works in progress', 'Lavori in corso');

-- --------------------------------------------------------

--
-- Table structure for table `coins`
--

DROP TABLE IF EXISTS `coins`;
CREATE TABLE `coins` (
  `dragon` smallint(5) UNSIGNED NOT NULL,
  `level1` smallint(3) UNSIGNED NOT NULL,
  `level2` smallint(3) UNSIGNED NOT NULL,
  `level3` smallint(3) UNSIGNED NOT NULL,
  `level4` smallint(3) UNSIGNED NOT NULL,
  `level5` smallint(3) UNSIGNED NOT NULL,
  `level6` smallint(3) UNSIGNED NOT NULL,
  `level7` smallint(3) UNSIGNED NOT NULL,
  `level8` smallint(3) UNSIGNED NOT NULL,
  `level9` smallint(3) UNSIGNED NOT NULL,
  `level10` smallint(3) UNSIGNED NOT NULL,
  `leve111` smallint(3) UNSIGNED DEFAULT NULL,
  `level12` smallint(3) UNSIGNED DEFAULT NULL,
  `level13` smallint(3) UNSIGNED DEFAULT NULL,
  `level14` smallint(3) UNSIGNED DEFAULT NULL,
  `level15` smallint(3) UNSIGNED DEFAULT NULL,
  `level16` smallint(3) UNSIGNED DEFAULT NULL,
  `level17` smallint(3) UNSIGNED DEFAULT NULL,
  `level18` smallint(3) UNSIGNED DEFAULT NULL,
  `level19` smallint(3) UNSIGNED DEFAULT NULL,
  `level20` smallint(3) UNSIGNED DEFAULT NULL,
  `level21` smallint(3) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dragons`
--

DROP TABLE IF EXISTS `dragons`;
CREATE TABLE `dragons` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `en` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` time NOT NULL,
  `elem1` tinyint(3) UNSIGNED NOT NULL,
  `elem2` tinyint(3) UNSIGNED DEFAULT NULL,
  `elem3` tinyint(3) UNSIGNED DEFAULT NULL,
  `elem4` tinyint(3) UNSIGNED DEFAULT NULL,
  `parent1` smallint(5) UNSIGNED DEFAULT NULL,
  `parent2` smallint(5) UNSIGNED DEFAULT NULL,
  `elemBreed1` tinyint(3) UNSIGNED DEFAULT NULL,
  `elemBreed2` tinyint(3) UNSIGNED DEFAULT NULL,
  `elemBreed3` tinyint(3) UNSIGNED DEFAULT NULL,
  `elemBreed4` tinyint(3) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dragons`
--

INSERT INTO `dragons` (`id`, `en`, `time`, `elem1`, `elem2`, `elem3`, `elem4`, `parent1`, `parent2`, `elemBreed1`, `elemBreed2`, `elemBreed3`, `elemBreed4`) VALUES
(1, 'Plant', '00:00:05', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Fire', '00:05:00', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Earth', '02:00:00', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Cold', '12:00:00', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Lightning', '00:30:00', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Water', '04:00:00', 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'Air', '02:00:00', 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'Metal', '08:00:00', 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'Light', '10:00:00', 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'Dark', '13:00:00', 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'Flower', '01:00:00', 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'Poison', '00:30:00', 1, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'Moss', '12:00:00', 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'Tree', '14:00:00', 1, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'Obsidian', '08:00:00', 3, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'Lava', '10:00:00', 2, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'Lichen', '06:00:00', 4, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'Evergreen', '10:00:00', 1, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'Frostfire', '12:00:00', 4, 2, NULL, NULL, 4, NULL, 2, NULL, NULL, NULL),
(20, 'Blue Fire', '12:00:00', 2, 4, NULL, NULL, 2, NULL, 4, NULL, NULL, NULL),
(21, 'Mountain', '14:00:00', 4, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(22, 'Glacier', '10:00:00', 3, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(23, 'Ash', '06:00:00', 5, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(24, 'Cactus', '00:30:00', 1, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(25, 'Firefly', '03:00:00', 5, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(26, 'Scorch', '03:00:00', 2, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(27, 'Crystal', '24:00:00', 5, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(28, 'Quake', '06:00:00', 3, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(29, 'Storm', '05:00:00', 5, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(30, 'Hail', '08:00:00', 4, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(31, 'Seaweed', '05:00:00', 6, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(32, 'Swamp', '09:00:00', 1, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(33, 'Coral', '11:30:00', 6, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(34, 'Salamander', '09:30:00', 2, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(35, 'River', '13:00:00', 6, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(36, 'Mud', '06:00:00', 3, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(37, 'Iceberg', '08:00:00', 6, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(38, 'Ice', '08:00:00', 4, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(39, 'Current', '16:00:00', 6, 5, NULL, NULL, 6, NULL, 5, NULL, NULL, NULL),
(40, 'Plasma', '16:00:00', 5, 6, NULL, NULL, 5, NULL, 6, NULL, NULL, NULL),
(41, 'Willow', '08:00:00', 7, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(42, 'Pollen', '07:00:00', 1, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(43, 'Blazing', '08:00:00', 7, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(44, 'Smoke', '14:00:00', 2, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(45, 'Sandstorm', '02:00:00', 7, 3, NULL, NULL, 7, NULL, 3, NULL, NULL, NULL),
(46, 'Dodo', '16:00:00', 3, 7, NULL, NULL, 3, NULL, 7, NULL, NULL, NULL),
(47, 'Blizzard', '10:00:00', 7, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(48, 'Snow', '08:00:00', 4, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(49, 'Sonic', '08:00:00', 7, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(50, 'Thunder', '08:30:00', 5, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(51, 'Rain', '08:00:00', 7, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(52, 'Fog', '08:00:00', 6, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(53, 'Malachite', '12:00:00', 8, 1, NULL, NULL, 8, NULL, 1, NULL, NULL, NULL),
(54, 'Ironwood', '12:00:00', 1, 8, NULL, NULL, 1, NULL, 8, NULL, NULL, NULL),
(55, 'Brass', '05:00:00', 8, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(56, 'Forge', '24:00:00', 2, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(57, 'Iron', '04:00:00', 8, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(58, 'Scoria', '22:00:00', 3, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(59, 'Steel', '14:00:00', 8, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(60, 'Mine', '10:00:00', 4, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(61, 'Copper', '20:00:00', 8, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(62, 'Magnetic', '04:00:00', 5, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(63, 'Quicksilver', '18:00:00', 8, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(64, 'Rust', '06:00:00', 6, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(65, 'Chrome', '05:00:00', 8, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(66, 'Meteor', '14:00:00', 7, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(67, 'Luminous', '13:00:00', 9, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(68, 'Meadow', '09:00:00', 1, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(69, 'Heat', '12:00:00', 9, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(70, 'Ember', '08:00:00', 2, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(71, 'Glass', '12:30:00', 9, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(72, 'Sand', '06:30:00', 3, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(73, 'Glare', '09:30:00', 9, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(74, 'Phantom', '08:30:00', 4, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(75, 'Gamma', '19:00:00', 9, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(76, 'Flash', '06:00:00', 5, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(77, 'Shimmer', '11:00:00', 9, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(78, 'Lotus', '07:00:00', 6, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(79, 'Hypnotic', '21:30:00', 9, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(80, 'Wind', '05:00:00', 7, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(81, 'Radiant', '10:30:00', 9, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(82, 'Palladium', '05:30:00', 8, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(83, 'Nightshade', '13:30:00', 10, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(84, 'Fungus', '13:00:00', 1, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(85, 'Dungeon', '15:00:00', 10, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(86, 'Watch', '08:00:00', 2, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(87, 'Cave', '11:00:00', 10, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(88, 'Root', '09:00:00', 3, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(89, 'Crypt', '17:30:00', 10, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(90, 'Ruin', '06:00:00', 4, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(91, 'Wraith', '14:00:00', 10, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(92, 'Spark', '09:30:00', 5, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(93, 'Ooze', '18:30:00', 10, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(94, 'Abyss', '07:30:00', 6, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(95, 'Howl', '12:30:00', 10, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(96, 'Miasma', '10:30:00', 7, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(97, 'Acid', '15:30:00', 10, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(98, 'Promethium', '08:00:00', 8, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(99, 'Mirage', '17:00:00', 10, 9, NULL, NULL, 10, NULL, 9, NULL, NULL, NULL),
(100, 'Shadow', '18:00:00', 9, 10, NULL, NULL, 9, NULL, 10, NULL, NULL, NULL),
(101, 'Pepper', '06:00:00', 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(102, 'Forest', '04:00:00', 1, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(103, 'Arctic', '22:00:00', 4, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(104, 'Frostbite', '04:00:00', 10, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(105, 'Lodestone', '25:30:00', 8, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(106, 'Geode', '23:00:00', 3, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(107, 'Nectar', '05:00:00', 9, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(108, 'Orchid', '09:00:00', 1, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(109, 'Sulfur', '15:00:00', 2, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(110, 'Mirror', '14:00:00', 9, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(111, 'Halo', '12:00:00', 7, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(112, 'Wisp', '02:00:00', 5, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(113, 'Bone', '10:00:00', 2, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(114, 'Reindeer', '05:00:00', 4, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(115, 'Love', '16:00:00', 5, 1, 2, NULL, 11, NULL, 5, NULL, NULL, NULL),
(116, 'Clover', '07:00:00', 1, 3, NULL, NULL, 13, NULL, 1, NULL, NULL, NULL),
(117, 'Bloom', '13:00:00', 1, 4, 5, NULL, 29, NULL, 1, NULL, NULL, NULL),
(118, 'Sakura', '10:00:00', 1, 3, 2, NULL, 14, 11, NULL, NULL, NULL, NULL),
(119, 'Butterfly', '12:00:00', 7, 5, 2, NULL, 25, NULL, 7, NULL, NULL, NULL),
(120, 'Firework', '06:00:00', 2, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(121, 'Paper', '12:00:00', 2, 1, 3, 4, NULL, NULL, NULL, NULL, NULL, NULL),
(122, 'Ghost', '15:30:00', 4, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(123, 'Gift', '12:25:00', 1, 2, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(124, 'Century', '10:00:00', 3, 4, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(125, 'Rose', '14:00:00', 1, 2, 7, NULL, 11, NULL, 7, NULL, NULL, NULL),
(126, 'Motley', '13:00:00', 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(127, 'Terradiem', '24:00:00', 3, 6, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(128, 'Bouquet', '09:00:00', 6, 1, 2, NULL, 11, NULL, 6, NULL, NULL, NULL),
(129, 'Bearded', '15:00:00', 3, 4, 8, NULL, 21, NULL, 8, NULL, NULL, NULL),
(130, 'Liberty', '29:49:00', 7, 8, 5, NULL, 61, NULL, 7, NULL, NULL, NULL),
(131, 'Cotton', '24:00:00', 1, 2, 3, 5, NULL, NULL, NULL, NULL, NULL, NULL),
(132, 'Mistletoe', '08:00:00', 4, 1, 3, NULL, 14, 17, NULL, NULL, NULL, NULL),
(133, 'Carnival', '12:00:00', 3, 1, 2, NULL, 101, NULL, 3, NULL, NULL, NULL),
(134, 'Arbor', '10:00:00', 3, 1, NULL, NULL, 14, 102, NULL, NULL, NULL, NULL),
(135, 'Kite', '22:00:00', 8, 7, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(136, 'Leathery', '36:00:00', 5, 3, 2, 4, NULL, NULL, NULL, NULL, NULL, NULL),
(137, 'Nosferatu', '13:00:00', 4, 2, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(138, 'Bicentennial', '20:00:00', 5, 7, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(139, 'Coal', '12:00:00', 2, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(140, 'Thorn', '07:00:00', 8, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(141, 'Tidal', '15:00:00', 6, 10, 3, 5, 28, 94, NULL, NULL, NULL, NULL),
(142, 'Darkling', '14:00:00', 5, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(143, 'Garland', '24:00:00', 2, 1, 3, 5, NULL, NULL, NULL, NULL, NULL, NULL),
(144, 'Faire', '54:00:00', 5, 1, 4, 8, NULL, NULL, NULL, NULL, NULL, NULL),
(145, 'Trick', '15:00:00', 1, 2, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(146, 'Ortreat', '15:00:00', 1, 2, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(147, 'Spectre', '12:00:00', 4, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(148, 'Lycan', '24:00:00', 5, 4, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(149, 'Feast', '24:00:00', 1, 3, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(150, 'Harvest', '18:00:00', 1, 3, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(151, 'Bramble', '18:00:00', 10, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(152, 'Ornamental', '18:00:00', 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(153, 'Lace', '31:00:00', 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(154, 'Dazzling', '55:00:00', 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(155, 'Rainbow', '48:00:00', 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(156, 'Sun', '48:00:00', 12, NULL, NULL, NULL, NULL, NULL, 4, 5, NULL, NULL),
(157, 'Moon', '48:00:00', 11, NULL, NULL, NULL, NULL, NULL, 4, 5, NULL, NULL),
(158, 'Gold', '48:00:00', 15, NULL, NULL, NULL, NULL, NULL, 2, 8, NULL, NULL),
(159, 'Bronze Olympus', '35:00:00', 16, NULL, NULL, NULL, NULL, NULL, 3, 5, 7, NULL),
(160, 'Silver Olympus', '35:00:00', 16, NULL, NULL, NULL, NULL, NULL, 3, 5, 7, NULL),
(161, 'Gold Olympus', '35:00:00', 16, NULL, NULL, NULL, NULL, NULL, 3, 5, 7, NULL),
(162, 'Seasonal', '48:00:00', 17, NULL, NULL, NULL, NULL, NULL, 1, 2, 7, NULL),
(163, 'Silver', '47:00:00', 15, NULL, NULL, NULL, NULL, NULL, 4, 8, NULL, NULL),
(164, 'Platinum', '49:00:00', 15, NULL, NULL, NULL, NULL, NULL, 6, 8, NULL, NULL),
(165, 'Cyclops', '33:00:00', 16, NULL, NULL, NULL, NULL, NULL, 5, 6, 8, NULL),
(166, 'Double Rainbow', '60:00:00', 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(167, 'Electrum', '47:30:00', 15, NULL, NULL, NULL, NULL, NULL, 5, 8, NULL, NULL),
(168, 'Ouroboros', '26:24:00', 18, NULL, NULL, NULL, 62, NULL, 6, NULL, NULL, NULL),
(169, 'Bronze', '46:00:00', 15, NULL, NULL, NULL, NULL, NULL, 3, 8, NULL, NULL),
(170, 'Snowy Bronze', '32:00:00', 16, NULL, NULL, NULL, NULL, NULL, 2, 4, 7, NULL),
(171, 'Snowy Silver', '32:00:00', 16, NULL, NULL, NULL, NULL, NULL, 2, 4, 7, NULL),
(172, 'Snowy Gold', '32:00:00', 16, NULL, NULL, NULL, NULL, NULL, 2, 4, 7, NULL),
(173, 'Dream', '50:00:00', 19, NULL, NULL, NULL, NULL, NULL, 9, 10, NULL, NULL),
(174, 'Hydra', '34:00:00', 16, NULL, NULL, NULL, 39, 28, NULL, NULL, NULL, NULL),
(175, 'Daydream', '29:00:00', 19, NULL, NULL, NULL, 99, 79, NULL, NULL, NULL, NULL),
(176, 'Ragnarok', '39:27:00', 18, NULL, NULL, NULL, NULL, NULL, 2, 3, 4, 10),
(177, 'Snowflake 1', '02:30:00', 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(178, 'Snowflake 2', '02:30:00', 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(179, 'Snowflake 3', '25:00:00', 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(180, 'Snowflake 4', '25:00:00', 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(181, 'Snowflake 5', '40:00:00', 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(182, 'Monolith 1', '02:30:00', 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(183, 'Monolith 2', '02:30:00', 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(184, 'Monolith 3', '25:00:00', 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(185, 'Monolith 4', '25:00:00', 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(186, 'Monolith 5', '40:00:00', 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(187, 'Panlong', '36:00:00', 6, 3, 2, 7, NULL, NULL, NULL, NULL, NULL, NULL),
(188, 'Leap Year', '14:30:00', 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(189, 'Solstice', '23:30:00', 12, NULL, NULL, NULL, 43, NULL, 3, NULL, NULL, NULL),
(190, 'Blue Moon', '29:31:48', 11, NULL, NULL, NULL, NULL, NULL, 4, 5, NULL, NULL),
(191, 'Equinox', '24:00:00', 12, 11, NULL, NULL, 43, NULL, 6, NULL, NULL, NULL),
(192, 'Solar Eclipse', '48:00:00', 12, 11, NULL, NULL, NULL, NULL, 2, 3, 7, NULL),
(193, 'Lunar Eclipse', '48:00:00', 11, 12, NULL, NULL, NULL, NULL, 3, 4, 7, NULL),
(194, 'Apocalypse', '20:12:00', 18, NULL, NULL, NULL, NULL, NULL, 1, 4, 5, 8),
(195, 'Celtic', '17:00:00', 13, NULL, NULL, NULL, 29, NULL, 1, NULL, NULL, NULL),
(196, 'Spring', '24:00:00', 17, NULL, NULL, NULL, NULL, NULL, 2, 4, 5, NULL),
(197, 'Summer', '24:00:00', 17, NULL, NULL, NULL, NULL, NULL, 2, 5, 6, NULL),
(198, 'Autumn', '24:00:00', 17, NULL, NULL, NULL, NULL, NULL, 2, 4, 7, NULL),
(199, 'Zombie', '20:00:00', 18, NULL, NULL, NULL, 66, 42, NULL, NULL, NULL, NULL),
(200, 'Light Rift', '48:00:00', 9, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(201, 'Dark Rift', '48:00:00', 10, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(202, 'Winter', '24:00:00', 17, NULL, NULL, NULL, NULL, NULL, 3, 4, 7, NULL),
(203, 'Moonstruck', '11:54:00', 11, NULL, NULL, NULL, 115, 125, NULL, NULL, NULL, NULL),
(204, 'Victory', '36:00:00', 16, NULL, NULL, NULL, NULL, NULL, 4, 5, 7, NULL),
(205, 'Sprout', '36:00:00', 17, NULL, NULL, NULL, NULL, NULL, 3, 6, 9, NULL),
(206, 'Dawn', '20:00:00', 12, 11, NULL, NULL, 157, 156, NULL, NULL, NULL, NULL),
(207, 'Dusk', '20:00:00', 12, 11, NULL, NULL, 157, 156, NULL, NULL, NULL, NULL),
(208, 'Prism', '42:00:00', 13, NULL, NULL, NULL, NULL, NULL, 6, 9, NULL, NULL),
(209, 'Leaf', '37:00:00', 17, NULL, NULL, NULL, NULL, NULL, 1, 6, 9, NULL),
(210, 'Sunstruck', '32:00:00', 12, NULL, NULL, NULL, 99, 69, NULL, NULL, NULL, NULL),
(211, 'Nightmare', '36:29:00', 19, NULL, NULL, NULL, 95, 94, NULL, NULL, NULL, NULL),
(212, 'Berry', '16:00:00', 17, NULL, NULL, NULL, NULL, NULL, 2, 6, 9, NULL),
(213, 'Aurora', '54:00:00', 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(214, 'Seed', '18:00:00', 17, NULL, NULL, NULL, NULL, NULL, 4, 6, 9, NULL),
(215, 'Midnight', '12:00:00', 11, NULL, NULL, NULL, 157, 10, NULL, NULL, NULL, NULL),
(216, 'Elysium', '48:00:00', 16, 19, NULL, NULL, 173, 161, NULL, NULL, NULL, NULL),
(217, 'Delirium', '11:00:00', 19, NULL, NULL, NULL, 79, 173, NULL, NULL, NULL, NULL),
(218, 'Midday', '08:00:00', 12, NULL, NULL, NULL, 156, 207, NULL, NULL, NULL, NULL),
(219, 'Loot', '35:00:00', 15, NULL, NULL, NULL, 158, NULL, 1, NULL, NULL, NULL),
(220, 'Muse', '36:00:00', 16, 19, NULL, NULL, 174, 175, NULL, NULL, NULL, NULL),
(221, 'Omen', '27:00:00', 18, 11, NULL, NULL, 157, 194, NULL, NULL, NULL, NULL),
(222, 'Pharaoh', '30:00:00', 12, NULL, NULL, NULL, 156, 89, NULL, NULL, NULL, NULL),
(223, 'Garnet', '31:00:00', 14, NULL, NULL, NULL, 44, 15, NULL, NULL, NULL, NULL),
(224, 'Amethyst', '28:00:00', 14, NULL, NULL, NULL, 30, 49, NULL, NULL, NULL, NULL),
(225, 'Aquamarine', '31:00:00', 14, NULL, NULL, NULL, 35, 37, NULL, NULL, NULL, NULL),
(226, 'Diamond', '30:00:00', 14, NULL, NULL, NULL, 38, 60, NULL, NULL, NULL, NULL),
(227, 'Emerald', '31:00:00', 14, NULL, NULL, NULL, 27, 17, NULL, NULL, NULL, NULL),
(228, 'Pearl', '30:00:00', 14, NULL, NULL, NULL, 48, 31, NULL, NULL, NULL, NULL),
(229, 'Ruby', '31:00:00', 14, NULL, NULL, NULL, 65, 26, NULL, NULL, NULL, NULL),
(230, 'Peridot', '31:00:00', 14, NULL, NULL, NULL, 27, 24, NULL, NULL, NULL, NULL),
(231, 'Sapphire', '30:00:00', 14, NULL, NULL, NULL, 51, 21, NULL, NULL, NULL, NULL),
(232, 'Opal', '31:00:00', 14, NULL, NULL, NULL, 16, 36, NULL, NULL, NULL, NULL),
(233, 'Topaz', '30:00:00', 14, NULL, NULL, NULL, 24, 25, NULL, NULL, NULL, NULL),
(234, 'Turquoise', '31:00:00', 14, NULL, NULL, NULL, 12, 32, NULL, NULL, NULL, NULL),
(235, 'Jade', '30:26:15', 14, NULL, NULL, NULL, 34, 40, NULL, NULL, NULL, NULL),
(236, 'Amber', '30:26:15', 14, NULL, NULL, NULL, 28, 18, NULL, NULL, NULL, NULL),
(237, 'Jet', '30:00:00', 14, NULL, NULL, NULL, 23, 19, NULL, NULL, NULL, NULL),
(238, 'Lapis', '32:00:00', 14, NULL, NULL, NULL, 50, 45, NULL, NULL, NULL, NULL),
(239, 'Ovalith', '30:00:00', 14, NULL, NULL, NULL, 117, 187, NULL, NULL, NULL, NULL),
(240, 'Jasper', '35:00:00', 23, NULL, NULL, NULL, 53, 79, NULL, NULL, NULL, NULL),
(241, 'Tourmaline', '35:00:00', 23, NULL, NULL, NULL, 27, 167, NULL, NULL, NULL, NULL),
(242, 'Bismuth', '34:30:00', 23, NULL, NULL, NULL, 71, 56, NULL, NULL, NULL, NULL),
(243, 'Sanguinite', '36:00:00', 23, NULL, NULL, NULL, 105, 21, NULL, NULL, NULL, NULL),
(244, 'Mesolite', '31:00:00', 23, NULL, NULL, NULL, 109, 71, NULL, NULL, NULL, NULL),
(245, 'Antarian', '16:00:00', 22, NULL, NULL, NULL, 245, NULL, NULL, NULL, NULL, NULL),
(246, 'Arcturian', '06:00:00', 22, NULL, NULL, NULL, 246, NULL, NULL, NULL, NULL, NULL),
(247, 'Bizurian', '08:00:00', 22, NULL, NULL, NULL, 247, NULL, NULL, NULL, NULL, NULL),
(248, 'Polarian', '28:30:00', 22, NULL, NULL, NULL, 248, NULL, NULL, NULL, NULL, NULL),
(249, 'Sorarian', '45:00:00', 22, NULL, NULL, NULL, 249, NULL, NULL, NULL, NULL, NULL),
(250, 'Andromedan', '16:00:00', 22, NULL, NULL, NULL, 250, NULL, NULL, NULL, NULL, NULL),
(251, 'Procyon', '16:00:00', 22, NULL, NULL, NULL, 251, NULL, NULL, NULL, NULL, NULL),
(252, 'Comet', '22:00:00', 22, NULL, NULL, NULL, 252, NULL, NULL, NULL, NULL, NULL),
(253, 'Eridanian', '18:00:00', 22, NULL, NULL, NULL, 253, NULL, NULL, NULL, NULL, NULL),
(254, 'Gourd', '30:52:00', 1, 3, 2, 10, 101, 88, NULL, NULL, NULL, NULL),
(255, 'Pyrite', '36:00:00', 23, NULL, NULL, NULL, 57, 50, NULL, NULL, NULL, NULL),
(256, 'Holly', '24:00:00', 1, 3, 4, NULL, 132, 18, NULL, NULL, NULL, NULL),
(257, 'Flicker', '25:00:00', 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(258, 'Verglace', '25:00:00', 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(259, 'Regift', '12:00:00', 1, 2, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(260, 'Neoteric', '31:00:00', 9, 1, 5, 10, 67, 92, NULL, NULL, NULL, NULL),
(261, 'Barite', '35:00:00', 23, NULL, NULL, NULL, 30, 46, NULL, NULL, NULL, NULL),
(262, 'Serenity', '18:00:00', 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(263, 'Ire', '12:00:00', 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(264, 'Delight', '36:00:00', 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(265, 'Melancholy', '24:00:00', 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(266, 'Surprise', '24:00:00', 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(267, 'Okenite', '31:00:00', 23, NULL, NULL, NULL, 42, 48, NULL, NULL, NULL, NULL),
(268, 'Double Leap Year', '29:00:00', 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(269, 'Inferno', '08:00:00', 7, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(270, 'Chrysalis', '33:20:00', 26, NULL, NULL, NULL, 273, 271, NULL, NULL, NULL, NULL),
(271, 'Duskwing', '33:20:00', 26, NULL, NULL, NULL, 272, 270, NULL, NULL, NULL, NULL),
(272, 'Lacewing', '41:20:00', 26, NULL, NULL, NULL, 271, 274, NULL, NULL, NULL, NULL),
(273, 'Swallowtail', '41:20:00', 26, NULL, NULL, NULL, 274, 270, NULL, NULL, NULL, NULL),
(274, 'Marbletail', '50:40:00', 26, NULL, NULL, NULL, 272, 273, NULL, NULL, NULL, NULL),
(275, 'Quartz', '30:00:00', 23, NULL, NULL, NULL, 67, 16, NULL, NULL, NULL, NULL),
(276, 'Monolith 6', '24:00:00', 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(277, 'Tempest', '08:00:00', 5, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(278, 'Wavelyte', '36:00:00', 23, NULL, NULL, NULL, 77, 18, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `elements`
--

DROP TABLE IF EXISTS `elements`;
CREATE TABLE `elements` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `opposite` tinyint(3) UNSIGNED DEFAULT NULL,
  `isEpic` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `canBreed` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `en` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `it` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `elements`
--

INSERT INTO `elements` (`id`, `opposite`, `isEpic`, `canBreed`, `en`, `it`) VALUES
(1, 8, 0, 1, 'Plant', 'Vegetale'),
(2, 4, 0, 1, 'Fire', 'Fuoco'),
(3, 7, 0, 1, 'Earth', 'Terra'),
(4, 2, 0, 1, 'Cold', 'Freddo'),
(5, 6, 0, 1, 'Lightning', 'Folgore'),
(6, 5, 0, 1, 'Water', 'Acqua'),
(7, 3, 0, 1, 'Air', 'Aria'),
(8, 1, 0, 1, 'Metal', 'Metallo'),
(9, 10, 0, 1, 'Light', 'Luce'),
(10, 9, 0, 1, 'Dark', 'Oscuro'),
(11, NULL, 1, 1, 'Moon', 'Luna'),
(12, NULL, 1, 1, 'Sun', 'Sole'),
(13, NULL, 1, 1, 'Rainbow', 'Arcobaleno'),
(14, NULL, 1, 0, 'Gemstone', 'Gemma'),
(15, NULL, 1, 1, 'Treasure', 'Tesori'),
(16, NULL, 1, 1, 'Olympus', 'Olimpo'),
(17, NULL, 1, 1, 'Seasonal', 'Stagionale'),
(18, NULL, 1, 1, 'Apocalypse', 'Apocalisse'),
(19, NULL, 1, 1, 'Dream', 'Sogni'),
(20, NULL, 1, 1, 'Snowflake', 'Fiocco di neve'),
(21, NULL, 1, 1, 'Monolith', 'Monolito'),
(22, NULL, 0, 1, 'Galaxy', 'Galassia'),
(23, NULL, 1, 0, 'Crystalline', 'Cristallino'),
(24, NULL, 1, 1, 'Ornamental', 'Ornamentale'),
(25, NULL, 1, 1, 'Aura', 'Aura'),
(26, NULL, 1, 1, 'Chrysalis', 'Crisalide');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `breedingHintsNotes`
--
ALTER TABLE `breedingHintsNotes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coins`
--
ALTER TABLE `coins`
  ADD PRIMARY KEY (`dragon`);

--
-- Indexes for table `dragons`
--
ALTER TABLE `dragons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `elements`
--
ALTER TABLE `elements`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coins`
--
ALTER TABLE `coins`
  MODIFY `dragon` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dragons`
--
ALTER TABLE `dragons`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=279;
--
-- AUTO_INCREMENT for table `elements`
--
ALTER TABLE `elements`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
-- --------------------------------------------------------

--
-- Structure for view canBreed
--
CREATE OR REPLACE ALGORITHM=UNDEFINED DEFINER=root@localhost SQL SECURITY DEFINER VIEW canBreed as
select d.id as id,
			e1.canBreed is true
		and
			(e2.canBreed is null or e2.canBreed is true)
		and
			(e3.canBreed is null or e3.canBreed is true)
		and
			(e4.canBreed is null or e4.canBreed is true)
		as canBreed
from dragons d
	join elements e1
		on d.elem1 = e1.id
	left join elements e2
		on d.elem2 = e2.id
	left join elements e3
		on d.elem3 = e3.id
	left join elements e4
		on d.elem4 = e4.id;

-- --------------------------------------------------------

--
-- Structure for view breedingPool
--
CREATE OR REPLACE ALGORITHM=UNDEFINED DEFINER=root@localhost SQL SECURITY DEFINER VIEW breedingPool as
select d.id as dragonId, d.elem1 as elem
from dragons d
where d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, d.elem2 as elem
from dragons d
where d.elem2 is not null and
	d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, d.elem3 as elem
from dragons d
where d.elem3 is not null and
	d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, d.elem4 as elem
from dragons d
where d.elem4 is not null and
	d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, d.elemBreed1 as elem
from dragons d
where d.elemBreed1 is not null and
	d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, d.elemBreed2 as elem
from dragons d
where d.elemBreed2 is not null and
	d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, d.elemBreed3 as elem
from dragons d
where d.elemBreed3 is not null and
	d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, d.elemBreed4 as elem
from dragons d
where d.elemBreed4 is not null and
	d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, p.elem1 as elem
from dragons d
	join dragons p
		on d.parent1 = p.id
where d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, p.elem2 as elem
from dragons d
	join dragons p
		on d.parent1 = p.id
where p.elem2 is not null and
	d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, p.elem3 as elem
from dragons d
	join dragons p
		on d.parent1 = p.id
where p.elem3 is not null and
	d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, p.elem4 as elem
from dragons d
	join dragons p
		on d.parent1 = p.id
where p.elem4 is not null and
	d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, p.elem1 as elem
from dragons d
	join dragons p
		on d.parent2 = p.id
where d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, p.elem2 as elem
from dragons d
	join dragons p
		on d.parent2 = p.id
where p.elem2 is not null and
	d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, p.elem3 as elem
from dragons d
	join dragons p
		on d.parent2 = p.id
where p.elem3 is not null and
	d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, p.elem4 as elem
from dragons d
	join dragons p
		on d.parent2 = p.id
where p.elem4 is not null and
	d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, e.id as elem
from dragons d
	join elements e
where d.id in (155,166,188,213,173) and
	e.isEpic is false and e.canBreed is true
union
select 177, 4 union select 177, 6 union select 177, 7 -- Snowflake 1
union
select 178, 4 union select 178, 5 union select 178, 6 -- Snowflake 2
union
select 179, 2 union select 179, 4 union select 179, 6 -- Snowflake 3
union
select 180, 4 union select 180, 6 union select 180, 9 -- Snowflake 4
union
select 181, 1 union select 181, 4 union select 181, 6 -- Snowflake 5
union
select 182, 1 union select 182, 3 union select 182, 6 -- Monolith 1
union
select 183, 2 union select 183, 3 union select 183, 6 -- Monolith 2
union
select 184, 3 union select 184, 4 union select 184, 6 -- Monolith 3
union
select 185, 3 union select 185, 5 union select 185, 6 -- Monolith 4
union
select 186, 3 union select 186, 6 union select 186, 7 -- Monolith 5
union
select 276, 3 union select 276, 6 union select 276, 8 -- Monolith 6
union
select 245, 2 union select 245, 3 union select 245, 5 union select 245, 9 -- Antarian
union
select 246, 2 union select 246, 3 union select 246, 7 union select 246, 10 -- Arcturian
union
select 247, 4 union select 247, 5 union select 247, 7 union select 247, 10 -- Bizurian
union
select 248, 4 union select 248, 6 union select 248, 7 union select 248, 9 -- Polarian
union
select 249, 1 union select 249, 6 union select 249, 8 union select 249, 9 -- Sorarian
union
select 250, 1 union select 250, 2 union select 250, 3 union select 250, 4 -- Andromedan
union
select 251, 1 union select 251, 5 union select 251, 6 union select 251, 8 -- Procyon
union
select 252, 2 union select 252, 3 union select 252, 4 union select 252, 8 -- Comet
union
select 253, 1 union select 253, 3 union select 253, 4 union select 253, 9 -- Eridanian
union
select 262, 2 union select 262, 3 union select 262, 4 -- Serenity
union
select 263, 1 union select 263, 2 union select 263, 3 -- Ire
union
select 264, 1 union select 264, 2 union select 264, 4 -- Delight
union
select 265, 1 union select 265, 3 union select 265, 4 -- Melancholy
union
select 270, 2 union select 270, 3 union select 270, 4 -- Chrysalis
union
select 271, 1 union select 271, 2 union select 271, 3 -- Duskwing
union
select 272, 1 union select 272, 2 union select 272, 3 union select 272, 4 -- Lacewing
union
select 273, 1 union select 273, 2 union select 273, 3 union select 273, 4 -- Swallowtail
union
select 274, 1 union select 274, 2 union select 274, 3 union select 274, 4 -- Marbletail
;
