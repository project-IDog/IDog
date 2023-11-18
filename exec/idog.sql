-- MariaDB dump 10.19-11.1.2-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: idog
-- ------------------------------------------------------
-- Server version	11.1.2-MariaDB-1:11.1.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `breeds`
--

DROP TABLE IF EXISTS `breeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `breeds` (
  `breed_no` int(11) DEFAULT NULL,
  `breed_name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `breeds`
--

LOCK TABLES `breeds` WRITE;
/*!40000 ALTER TABLE `breeds` DISABLE KEYS */;
INSERT INTO `breeds` VALUES
(1,'고든 세터'),
(2,'코통 드 튈레아르'),
(3,'골든두들'),
(4,'골든 리트리버'),
(5,'그레이트 데인'),
(6,'그레이트 스위스 마운틴 도그'),
(7,'그레이트 피레니즈'),
(8,'그레이 하운드'),
(9,'그린란드견'),
(10,'글렌 오브 이말 테리어'),
(11,'기슈견'),
(12,'나폴리탄 마스티프'),
(13,'노위지언 부훈트'),
(14,'노르웨이 엘크 하운드'),
(15,'노리치 테리어'),
(16,'노바스코샤 덕 톨링 레트리버'),
(17,'노퍽 테리어'),
(18,'뉴펀들랜드'),
(19,'닥스훈트'),
(20,'달마시안'),
(21,'댄디 딘몬트 테리어'),
(22,'도고 까나리오'),
(23,'도고 아르헨티노'),
(24,'도그 드 보르도'),
(25,'도베르만 핀셔'),
(26,'도사견'),
(27,'동경이'),
(28,'라고토 로마뇰로'),
(29,'라사압소'),
(30,'라페이로 도 알렌테조'),
(31,'라포니안 허더'),
(32,'래브라도 리트리버'),
(33,'레온베르거'),
(34,'레이크랜드 테리어'),
(35,'로디지아 리지백'),
(36,'루이지애나 레오파드 도그(카타훌라)'),
(37,'로첸'),
(38,'로트바일러'),
(39,'마스티프'),
(40,'맨체스터 테리어'),
(41,'말티즈'),
(42,'미니어처 불 테리어'),
(43,'미니어처 슈나우저'),
(44,'미니어처 핀셔'),
(45,'말티푸'),
(46,'바센지'),
(47,'바셋 하운드'),
(48,'버니즈 마운틴 도그'),
(49,'베들링턴 테리어'),
(50,'발바리'),
(51,'벨기에 말리노이즈'),
(52,'벨기에 테뷰런'),
(53,'벨지안 그리펀'),
(54,'벨지언 쉽독?(벨지언 셰퍼드)'),
(55,'보더콜리'),
(56,'보더 테리어'),
(57,'보르도 마스티프'),
(58,'보르조이'),
(59,'보스롱'),
(60,'보스턴 테리어'),
(61,'복서'),
(62,'볼로네즈'),
(63,'부르불(boerboel)'),
(64,'부비에 데 플랑드르'),
(65,'불개'),
(66,'불도그'),
(67,'불리 쿠타'),
(68,'불 마스티프'),
(69,'불 테리어'),
(70,'브뤼셀 그리펀'),
(71,'브리어드'),
(72,'브리타니'),
(73,'블랙 러시안 테리어'),
(74,'블랙 앤드 탄 쿤하운드'),
(75,'블러드 하운드'),
(76,'비글'),
(77,'비숑 프리제'),
(78,'비어디드 콜리'),
(79,'비즐라'),
(80,'빠삐용'),
(81,'사모예드'),
(82,'사플라니낙'),
(83,'살루키'),
(84,'삽살개'),
(85,'샤페이'),
(86,'서식스 스패니얼'),
(87,'세인트 버나드'),
(88,'셰틀랜드 쉽독'),
(89,'소프트 코티드 휘튼 테리어'),
(90,'솔로이츠 쿠인틀레'),
(91,'스무드 폭스 테리어'),
(92,'스웨디시 발훈트'),
(93,'스카이 테리어'),
(94,'스코티시 디어하운드'),
(95,'스코티시 테리어'),
(96,'스키퍼키'),
(97,'스태퍼드셔 불 테리어'),
(98,'스탠더드 슈나우저'),
(99,'스패니시 그레이 하운드'),
(100,'스패니시 마스티프'),
(101,'스피노네 이탈리아노'),
(102,'스피츠'),
(103,'시고르자브종'),
(104,'시바 이누'),
(105,'시베리언 허스키'),
(106,'시추'),
(107,'시코쿠견'),
(108,'실리엄 테리어'),
(109,'실키 테리어'),
(110,'아나톨리아 셰퍼드'),
(111,'아메리칸 불도그'),
(112,'아메리칸 불리'),
(113,'아메리칸 스태퍼드셔 테리어'),
(114,'아메리칸 아키다'),
(115,'아메리칸 에스키모 도그'),
(116,'아메리칸 인디언 도그'),
(117,'아메리칸 워터 스패니얼'),
(118,'아메리칸?코커 스패니얼'),
(119,'아메리칸 폭스하운드'),
(120,'아이디'),
(121,'아이리시 소프트코티드 휘튼 테리어'),
(122,'아이리시 레드 앤드 화이트 세터'),
(123,'아이리시 세터'),
(124,'아이리시 울프 하운드'),
(125,'아이리시 워터 스패니얼'),
(126,'아이리시 테리어'),
(127,'아키타'),
(128,'아펜핀셔'),
(129,'아프간 하운드'),
(130,'알래스칸 맬러뮤트'),
(131,'알래스칸 클리카이'),
(132,'에스트렐라 마운틴 독'),
(133,'에어데일 테리어'),
(134,'오브차카'),
(135,'오스트레일리언 실키 테리어'),
(136,'오스트레일리언 켈피'),
(137,'오스트레일리언 셰퍼드'),
(138,'오스트레일리언 캐틀 도그'),
(139,'오스트레일리언 테리어'),
(140,'오터 하운드'),
(141,'올드 잉글리시 쉽독'),
(142,'와이머라너'),
(143,'와이어 폭스 테리어'),
(144,'와이어헤어드 포인팅 그리펀'),
(145,'야쿠탄 라이카'),
(146,'요크셔 테리어'),
(147,'웨스트 하이랜드 화이트테리어'),
(148,'웰시 스프링어 스패니얼'),
(149,'웰시 코기'),
(150,'웰시 테리어'),
(151,'이비전 하운드'),
(152,'이탤리언 그레이하운드'),
(153,'잉글리시 세터'),
(154,'잉글리시 스프링어 스패니얼'),
(155,'잉글리시?코커 스패니얼'),
(156,'잉글리시 토이 스패니얼'),
(157,'잉글리시 폭스하운드'),
(158,'자이언트 슈나우저'),
(159,'재패니즈 친'),
(160,'재패니즈 스피츠'),
(161,'잭 러셀 테리어'),
(162,'저먼 셰퍼드'),
(163,'저먼 쇼트헤어드 포인터'),
(164,'저먼 와이어헤어드 포인터'),
(165,'저먼 핀셔'),
(166,'저먼 헌팅 테리어'),
(167,'제주개'),
(168,'진돗개'),
(169,'차우차우'),
(170,'차이니즈 샤페이'),
(171,'차이니즈 크레스티드'),
(172,'체서피크 베이 레트리버'),
(173,'체코슬로바키아 늑대개'),
(174,'치와와'),
(175,'카네 코르소'),
(176,'카디건 웰시 코기'),
(177,'카발리에 킹 찰스 스파니엘'),
(178,'캉갈'),
(179,'컬리코티드 레트리버'),
(180,'케리 블루 테리어'),
(181,'케언 테리어'),
(182,'케이넌 도그'),
(183,'케이스혼트'),
(184,'코리안 마스티프'),
(185,'코몬도르'),
(186,'코커 스패니얼'),
(187,'콜리'),
(188,'쿠바스'),
(189,'쿠이커혼제'),
(190,'클럼버 스패니얼'),
(191,'토이 폭스 테리어'),
(192,'티베탄 마스티프'),
(193,'티베탄 스패니얼'),
(194,'티베탄 테리어'),
(195,'파라오 하운드'),
(196,'파슨 러셀 테리어'),
(197,'패터데일 테리어'),
(198,'퍼그'),
(199,'페키니즈'),
(200,'펨브록 웰시 코기'),
(201,'포투기즈 워터 도그'),
(202,'포메라니안'),
(203,'포인터'),
(204,'폭스 테리어'),
(205,'폴리시 롤런드 시프도그'),
(206,'폼피츠'),
(207,'푸들'),
(208,'푸미'),
(209,'풀리'),
(210,'풍산개'),
(211,'프렌치 불도그'),
(212,'프티 바세 그리퐁 방댕'),
(213,'플랫코티드 레트리버'),
(214,'플롯 하운드'),
(215,'피니시 스피츠'),
(216,'피레니언 마스티프'),
(217,'피레니언 쉽독'),
(218,'피레니언 셰퍼드'),
(219,'필드 스패니얼'),
(220,'필라 브라질레이로'),
(221,'핏 불 테리어'),
(222,'해리어'),
(223,'하바니즈'),
(224,'홋카이도 이누'),
(225,'휘핏'),
(226,'시고르브자브종');
/*!40000 ALTER TABLE `breeds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challengeTypes`
--

DROP TABLE IF EXISTS `challengeTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `challengeTypes` (
  `challenge_type_no` int(11) NOT NULL AUTO_INCREMENT,
  `challenge_type_name` varchar(255) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `canceled` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`challenge_type_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challengeTypes`
--

LOCK TABLES `challengeTypes` WRITE;
/*!40000 ALTER TABLE `challengeTypes` DISABLE KEYS */;
/*!40000 ALTER TABLE `challengeTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenges`
--

DROP TABLE IF EXISTS `challenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `challenges` (
  `challenge_no` int(11) NOT NULL AUTO_INCREMENT,
  `challenge_type_no` int(11) NOT NULL,
  `challenge_name` varchar(255) NOT NULL,
  `challenge_desc` varchar(1000) NOT NULL,
  `challenge_complete_cnt` int(11) DEFAULT NULL,
  `challenge_image_url` varchar(1000) NOT NULL,
  `challenge_trigger_name` varchar(255) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `canceled` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`challenge_no`),
  KEY `challenge_type_no` (`challenge_type_no`),
  CONSTRAINT `challenges_ibfk_1` FOREIGN KEY (`challenge_type_no`) REFERENCES `challengeTypes` (`challenge_type_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenges`
--

LOCK TABLES `challenges` WRITE;
/*!40000 ALTER TABLE `challenges` DISABLE KEYS */;
/*!40000 ALTER TABLE `challenges` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`haru`@`%`*/ /*!50003 trigger insert_challenge
after insert
on challenges
for each row

begin
declare v_user_no int;
declare done boolean default false;
declare cur cursor for select user_no from users where canceled=0;
declare continue handler for not found set done=true;

open cur;

insert_loop: loop
fetch cur into v_user_no;
if done then
leave insert_loop;
end if;

insert into userChallenges(challenge_no, user_no) values(new.challenge_no, v_user_no);
end loop;

close cur;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `comment_no` int(11) NOT NULL AUTO_INCREMENT,
  `grave_no` int(11) NOT NULL,
  `user_no` int(11) NOT NULL,
  `comment_content` varchar(1000) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `canceled` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`comment_no`),
  KEY `grave_no` (`grave_no`),
  KEY `user_no` (`user_no`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`grave_no`) REFERENCES `graves` (`grave_no`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_no`) REFERENCES `users` (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES
(31,21,27,'엄청 작네용,,','2023-10-05 13:09:35','2023-10-05 13:09:35',0),
(32,20,21,'코키야 그 곳에선 평안하길,,','2023-10-05 13:40:01','2023-10-05 13:40:01',0),
(33,20,21,'코키 보고싶어 ㅜㅜ','2023-10-05 13:40:14','2023-10-05 13:40:14',0),
(34,21,21,'감자도 하늘에서는 평안하길....','2023-10-05 13:41:16','2023-10-05 13:41:16',0),
(35,22,21,'우리 구리 보고싶어 진짜 ㅜ','2023-10-05 13:41:59','2023-10-05 13:41:59',0);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dogs`
--

DROP TABLE IF EXISTS `dogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dogs` (
  `dog_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_no` int(11) NOT NULL,
  `dog_name` varchar(255) NOT NULL,
  `dog_breed` varchar(255) NOT NULL,
  `dog_birth_date` timestamp NULL DEFAULT NULL,
  `dog_is_dead` int(11) NOT NULL,
  `dog_death_date` timestamp NULL DEFAULT NULL,
  `dog_sex` char(1) NOT NULL,
  `dog_nft` int(11) DEFAULT NULL,
  `dog_img` varchar(1000) DEFAULT NULL,
  `dog_hash` varchar(500) DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `canceled` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`dog_no`),
  KEY `user_no` (`user_no`),
  CONSTRAINT `dogs_ibfk_1` FOREIGN KEY (`user_no`) REFERENCES `users` (`user_no`),
  CONSTRAINT `check_gender` CHECK (`dog_sex` in ('F','M','N'))
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dogs`
--

LOCK TABLES `dogs` WRITE;
/*!40000 ALTER TABLE `dogs` DISABLE KEYS */;
INSERT INTO `dogs` VALUES
(140,27,'감자','말티푸','2023-05-08 15:00:00',1,'2023-07-22 15:00:00','M',NULL,'https://ipfs.io/ipfs/bafkreia73irvoa4t6tcjgi6yf5guygtshgthvew242ostjn5p5seiq4pyy',NULL,'2023-10-05 12:29:43','2023-10-05 12:29:43',0),
(142,24,'앵두','포메라니안','2022-06-30 15:00:00',0,NULL,'M',90,'https://ipfs.io/ipfs/bafkreie3pfrj2bnsspkqejeoakcgokdldik2j456ynlf66twdnkxzglxyy',NULL,'2023-10-05 12:42:38','2023-10-05 12:42:38',0),
(143,27,'코키','보더콜리','2018-05-06 15:00:00',1,'2023-09-30 15:00:00','F',NULL,'https://ipfs.io/ipfs/bafkreigtpyyvofywky3kuq4oiuhngohknceamzhphidd2luzcm6422x3b4',NULL,'2023-10-05 12:46:27','2023-10-05 12:46:27',0),
(145,17,'방방','말티즈','2023-10-04 15:00:00',0,NULL,'F',92,'https://ipfs.io/ipfs/bafybeidbb5d4spuvi257qidhvuhrwjfzzj2puxuvvfpi3lavvw2mfse67q',NULL,'2023-10-05 13:02:46','2023-10-05 13:02:46',0),
(146,21,'흑당이','골든 리트리버','2017-07-11 15:00:00',0,NULL,'F',93,'https://ipfs.io/ipfs/bafybeihogyvldnqfupplxf6ld2sawh23hqluieyhyncud3gdus4of47yny',NULL,'2023-10-05 13:15:55','2023-10-05 13:15:55',0),
(147,21,'까까미','그레이 하운드','2023-08-13 15:00:00',0,NULL,'M',94,'https://ipfs.io/ipfs/bafybeicbhqpkytvnzu3dswmaralyb6rdsx3wgysh4jx6k6hmsabyzm54dy',NULL,'2023-10-05 13:20:39','2023-10-05 13:20:39',0),
(148,21,'윤구리','비글','2020-09-08 15:00:00',1,'2023-10-02 15:00:00','M',95,'https://ipfs.io/ipfs/bafkreiabwueadgx2e34u4xokes7tqb3vwu3fm2nadnuritvoyzishhuqli',NULL,'2023-10-05 13:22:04','2023-10-05 13:22:04',0),
(149,19,'릴 비윈','골든 리트리버','2017-11-10 15:00:00',0,NULL,'M',96,'https://ipfs.io/ipfs/bafybeihq3fnaofh3m3tw5vcqoe65vvwfmgtxre6a4wo5vgzeutbksvdjvm',NULL,'2023-10-05 13:44:21','2023-10-05 13:44:21',0),
(150,21,'뽀메','포메라니안','2022-04-11 15:00:00',0,NULL,'F',97,'https://ipfs.io/ipfs/bafkreigyp2ugj2v7uqrbrlcr4bfsixhtpm5kux6zyz6oubibs4o5x73m7a',NULL,'2023-10-05 13:46:47','2023-10-05 13:46:47',0),
(151,25,'김마늘','말티즈','2015-03-16 15:00:00',0,NULL,'M',NULL,'https://ipfs.io/ipfs/bafybeidhizfikwfusmuyphkojvvu4umcdnuluue3am5arkcvfjf6oplpcm',NULL,'2023-10-05 14:19:17','2023-10-05 14:19:17',0);
/*!40000 ALTER TABLE `dogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `graves`
--

DROP TABLE IF EXISTS `graves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `graves` (
  `grave_no` int(11) NOT NULL AUTO_INCREMENT,
  `dog_no` int(11) NOT NULL,
  `user_no` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `canceled` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`grave_no`),
  KEY `user_no` (`user_no`),
  KEY `dog_no` (`dog_no`),
  CONSTRAINT `graves_ibfk_1` FOREIGN KEY (`user_no`) REFERENCES `users` (`user_no`),
  CONSTRAINT `graves_ibfk_2` FOREIGN KEY (`dog_no`) REFERENCES `dogs` (`dog_no`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `graves`
--

LOCK TABLES `graves` WRITE;
/*!40000 ALTER TABLE `graves` DISABLE KEYS */;
INSERT INTO `graves` VALUES
(20,143,27,'2023-10-05 13:06:33','2023-10-05 13:06:33',0),
(21,140,27,'2023-10-05 13:07:12','2023-10-05 13:07:12',0),
(22,148,21,'2023-10-05 13:39:23','2023-10-05 13:39:23',0);
/*!40000 ALTER TABLE `graves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photos` (
  `photo_no` int(11) NOT NULL AUTO_INCREMENT,
  `dog_no` int(11) NOT NULL,
  `user_no` int(11) NOT NULL,
  `photo_url` varchar(1000) NOT NULL,
  `photo_comment` varchar(160) DEFAULT NULL,
  `photo_is_goat` int(11) NOT NULL DEFAULT 0,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `canceled` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`photo_no`),
  KEY `dog_no` (`dog_no`),
  KEY `user_no` (`user_no`),
  CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`dog_no`) REFERENCES `dogs` (`dog_no`),
  CONSTRAINT `photos_ibfk_2` FOREIGN KEY (`user_no`) REFERENCES `users` (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES
(55,140,27,'file:///data/user/0/com.idog.front/cache/ImagePicker/12f88799-cad2-4e12-bba6-447d59b516f1.jpeg','감자 정면샷ㅋㅋ',0,'2023-10-05 12:33:07','2023-10-05 12:33:07',0),
(56,140,27,'file:///data/user/0/com.idog.front/cache/ImagePicker/2a5ec4d0-0db9-4ee7-9db8-723b34eca395.jpeg','물놀이하고 자연건조됐을때',0,'2023-10-05 12:33:48','2023-10-05 12:33:48',0),
(57,140,27,'file:///data/user/0/com.idog.front/cache/ImagePicker/7577bd2f-dc29-4a9f-9ce6-d4a01d3fdab4.jpeg','애기 처음왔을때',0,'2023-10-05 12:34:13','2023-10-05 12:34:13',0),
(58,140,27,'file:///data/user/0/com.idog.front/cache/ImagePicker/e37f9849-3cc8-4486-a694-3c87cb2890e2.jpeg','감자야 오래오래 같이있자',0,'2023-10-05 12:38:17','2023-10-05 12:38:17',0),
(59,142,24,'file:///data/user/0/com.idog.front/cache/ImagePicker/98868478-862e-4623-97a4-8f3c0f20740b.jpeg','화난 앵두 무섭다',0,'2023-10-05 12:51:15','2023-10-05 12:51:15',0),
(60,142,24,'file:///data/user/0/com.idog.front/cache/ImagePicker/e58e705d-d1ca-45a7-ae45-65b2c929d81e.jpeg','풀밭의 앵두 귀여워🥰',0,'2023-10-05 12:51:57','2023-10-05 12:51:57',0),
(61,142,24,'file:///data/user/0/com.idog.front/cache/ImagePicker/5504ec21-ee6f-40c1-bf0c-fceda6845426.jpeg','털찐 앵두',0,'2023-10-05 12:52:16','2023-10-05 12:52:16',0),
(62,143,27,'file:///data/user/0/com.idog.front/cache/ImagePicker/845a63eb-9e74-458b-a43e-2532087e46f9.jpeg','켄넬에 익숙해지는 코키',0,'2023-10-05 12:58:54','2023-10-05 12:58:54',0),
(63,143,27,'file:///data/user/0/com.idog.front/cache/ImagePicker/f19ea1c5-e965-4228-bf79-a3eb638d5862.jpeg','호기심 가득한 눈망울',0,'2023-10-05 12:59:48','2023-10-05 12:59:48',0),
(64,143,27,'file:///data/user/0/com.idog.front/cache/ImagePicker/d10f9aff-b4cc-4e0d-8cff-9fce8548965d.jpeg','적응한 코키',0,'2023-10-05 13:03:46','2023-10-05 13:03:46',0),
(65,143,27,'file:///data/user/0/com.idog.front/cache/ImagePicker/e9c819c6-fbf7-498c-af05-67a67e4a2aa5.jpeg','첫 산책나간 코키',0,'2023-10-05 13:05:18','2023-10-05 13:05:18',0),
(66,145,17,'file:///data/user/0/com.idog.front/cache/ImagePicker/c242d1cb-456c-430e-86dc-3482ebce5f36.jpeg','헤헤',0,'2023-10-05 13:14:35','2023-10-05 13:14:35',0),
(67,145,17,'file:///data/user/0/com.idog.front/cache/ImagePicker/33418d3d-e94e-404c-a63b-66a16c1baee3.jpeg','견무룩',0,'2023-10-05 13:14:59','2023-10-05 13:14:59',0),
(68,145,17,'file:///data/user/0/com.idog.front/cache/ImagePicker/9bf5575e-b337-4126-a836-e74b033a6c8f.jpeg','낼름',0,'2023-10-05 13:15:22','2023-10-05 13:15:22',0),
(69,148,21,'file:///data/user/0/com.idog.front/cache/ImagePicker/128cce36-5584-4613-a5fb-312b09a9dc7a.jpeg','성장한 우리 구리',0,'2023-10-05 13:35:47','2023-10-05 13:35:47',0),
(70,147,21,'file:///data/user/0/com.idog.front/cache/ImagePicker/9e064d2e-35b1-4b06-8011-c82346948190.jpeg','ㅋㅋㅋ 책상 밑',0,'2023-10-05 13:36:07','2023-10-05 13:36:07',0),
(71,146,21,'file:///data/user/0/com.idog.front/cache/ImagePicker/9fecd003-1b94-49a3-969e-8bc02476becb.jpeg','희망이 윙쿠',0,'2023-10-05 13:36:30','2023-10-05 13:36:30',0),
(72,146,21,'file:///data/user/0/com.idog.front/cache/ImagePicker/416683a0-549a-4ee8-8afe-485ea2de0a45.jpeg','졸린 흑당이',0,'2023-10-05 13:36:49','2023-10-05 13:36:49',0),
(73,151,25,'file:///data/user/0/com.idog.front/cache/ImagePicker/57dc44ce-ecd7-4923-ac16-f1383d974a03.jpeg','마늘이 귀여워 🧄',0,'2023-10-05 14:21:34','2023-10-05 14:21:34',0),
(74,151,25,'file:///data/user/0/com.idog.front/cache/ImagePicker/360c3ae0-9031-4295-b26c-5b1ede1c95f0.jpeg','비몽사몽',0,'2023-10-05 14:22:58','2023-10-05 14:22:58',0),
(75,151,25,'file:///data/user/0/com.idog.front/cache/ImagePicker/70f2b596-2799-4723-831d-3431aabf89cf.jpeg','😴',0,'2023-10-05 14:23:38','2023-10-05 14:23:38',0);
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userChallenges`
--

DROP TABLE IF EXISTS `userChallenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userChallenges` (
  `user_challenge_no` int(11) NOT NULL AUTO_INCREMENT,
  `challenge_no` int(11) NOT NULL,
  `user_no` int(11) NOT NULL,
  `user_challenge_cnt` int(11) NOT NULL DEFAULT 0,
  `user_challenge_iscomplete` int(11) NOT NULL DEFAULT 0,
  `completed_date` timestamp NULL DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `canceled` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_challenge_no`),
  KEY `challenge_no` (`challenge_no`),
  KEY `user_no` (`user_no`),
  CONSTRAINT `userChallenges_ibfk_1` FOREIGN KEY (`challenge_no`) REFERENCES `challenges` (`challenge_no`),
  CONSTRAINT `userChallenges_ibfk_2` FOREIGN KEY (`user_no`) REFERENCES `users` (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userChallenges`
--

LOCK TABLES `userChallenges` WRITE;
/*!40000 ALTER TABLE `userChallenges` DISABLE KEYS */;
/*!40000 ALTER TABLE `userChallenges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `canceled` int(11) NOT NULL DEFAULT 0,
  `user_message` varchar(255) DEFAULT NULL,
  `user_profile_img` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  `user_address` varchar(500) DEFAULT NULL,
  `user_wallet_pw` varchar(255) DEFAULT NULL,
  `user_wallet_salt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(17,'quso1235813@gmail.com','나건','2023-10-04 02:14:43','2023-10-05 13:32:35',0,'안녕하세요?','https://lh3.googleusercontent.com/a/ACg8ocIkBMn479M3XReu4UyA5zzBBvO0Cd0WlOKnvqo5pEAS7GskaH1WiVbjqlYh4oFHG_Hv6fBoGr0xyOLzTGdHtjJF3g=s360-c-no','ROLE_USER','0x7361288446a73A63e051b59674ca810d35FB3aF5','97580be8f3cecd5dda2082de2164f63e6349e7188ccec4afb957379be5efe8d0','b5630406335d81be8aaec8acb8fb37f1'),
(18,'seobstation@gmail.com','이성섭','2023-10-04 03:24:29','2023-10-04 03:24:29',0,NULL,'https://lh3.googleusercontent.com/a/ACg8ocLv4u5hzd1kfT9T6jq-Dv90ZsLC4es3ZyXH-wWJVm8p=s96-c','ROLE_USER',NULL,NULL,NULL),
(19,'devsain0621@gmail.com','김민섭','2023-10-04 03:27:39','2023-10-05 13:38:07',0,NULL,'https://lh3.googleusercontent.com/a/ACg8ocI_sY9kl-YN3nZUn6LRyyWWXaP2pqYuZ6V94pWvKZNt=s96-c','ROLE_USER','0xC9598cA4057C1dB36B92503e39C94473a0E0c2FA','9ef7345318c46a7844d110a5db6c212d42b90348eafa0189f364b989001fd221','b5b1283de6f2ecc882c77723c81d8080'),
(20,'ccy9803@gmail.com','최찬영','2023-10-04 03:50:44','2023-10-05 04:57:11',0,'하나뿐인 내 반려견에게 메시지를 남겨주세요.','https://lh3.googleusercontent.com/a/ACg8ocIrG2_tDHxhhw4kKk6wnn7Bwo9R7Hz1hC3GbS45Qoyn=s96-c','ROLE_USER','0x85fa6e773e59aea078748e1553a0e3de215c228d','b75ed68ab738cf2fd40c6594f7ea17ebf4874c6ec7a538fcde7072f6b8c68e57','97eafd0d0601fa01ca5378d92593dee6'),
(21,'2019113591@dgu.ac.kr','윤선희','2023-10-04 04:06:49','2023-10-05 13:19:06',0,NULL,'https://lh3.googleusercontent.com/a/ACg8ocLfOw4S90fylofmzidIOFe4bQGlZwVorwlxpjyPlUE4=s96-c','ROLE_USER','0x5f78C1FD2c5661098bb08D2218B4FA1e17316F21',NULL,NULL),
(22,'dognfta209@gmail.com','dognftA209','2023-10-04 11:31:12','2023-10-04 11:31:12',0,NULL,'https://lh3.googleusercontent.com/a/ACg8ocIGlVAjCVu0_OgQTddPo4Ygqkys_MORSQmJ7il8h0SA=s96-c','ROLE_USER',NULL,NULL,NULL),
(23,'orcus.hades.pluto@gmail.com','hades orcus','2023-10-04 12:17:38','2023-10-04 12:17:38',0,NULL,'https://lh3.googleusercontent.com/a/ACg8ocKs2K5Dw2GCqHtW6eIr7yn4jZatqq57VDpJYtOt4G6c=s96-c','ROLE_USER',NULL,NULL,NULL),
(24,'rabbit1999k@gmail.com','이가경','2023-10-04 13:15:58','2023-10-05 13:21:45',0,'앵두맘','https://lh3.googleusercontent.com/a/ACg8ocIlayCtDkPGScWjxRsPVIv5wIX9KMtu08Ff4tipMVrk9Q=s96-c','ROLE_USER','0xeD7e50105E0D542e8F90bfa9c1c620EF0eadDc02','7d9db6a3dbd4a8d57d2774183c35643c00b1b5f092727ad30654b9ad1f0bdae6','2bc3f52e5f9341444c34d06757d147b5'),
(25,'rabbit1999k@inha.edu','뽀삐초코앵두코코호두','2023-10-05 00:04:18','2023-10-05 13:19:40',0,NULL,'https://lh3.googleusercontent.com/a/ACg8ocKidrzKpCreZbfOSrfI-klmEx-6ubXnb-CpMhZEdYju=s96-c','ROLE_USER','0xc99c203c97C1ad1e4a63a3D751bBf83Fa50841Ad','30db3f0dbd2e4969949f0672b6e3649fed1eab8a141492d210afa001583a4793','1d031267abfc7d6586e26b61d600e549'),
(26,'megahawk88@gmail.com','이상현','2023-10-05 00:42:06','2023-10-05 00:42:06',0,NULL,'https://lh3.googleusercontent.com/a/ACg8ocJ5tvBWVCSubBBar0UyfSGU8IIZKeEYFdwIpuhhFqYggA=s96-c','ROLE_USER',NULL,'3bca8e957ccad42cfad0edbb431a253badbeadcca38bd23bffa5c4719d388b52','60b22afe5ecd1f1496851614fe54c1b7'),
(27,'kmsid003@gmail.com','김민섭','2023-10-05 11:57:26','2023-10-05 13:53:32',0,NULL,'https://lh3.googleusercontent.com/a/ACg8ocJ4U1AfK0zLgEzbXV_ySCUNq2fPbefjtu4LuQqXomKa=s96-c','ROLE_USER','0xC9598cA4057C1dB36B92503e39C94473a0E0c2FA','295d73c90fcc6b465f3e7f2d26c2782be977dd7727308af17790024fdb610a34','1c2d01984501074c98b5efe5359727f7');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `walkings`
--

DROP TABLE IF EXISTS `walkings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `walkings` (
  `walking_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_no` int(11) NOT NULL,
  `dog_no` int(11) NOT NULL,
  `walking_startdate` timestamp NOT NULL,
  `walking_count` int(11) NOT NULL DEFAULT 1,
  `walking_time` int(11) DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `canceled` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`walking_no`),
  KEY `user_no` (`user_no`),
  KEY `dog_no` (`dog_no`),
  CONSTRAINT `walkings_ibfk_1` FOREIGN KEY (`user_no`) REFERENCES `users` (`user_no`),
  CONSTRAINT `walkings_ibfk_2` FOREIGN KEY (`dog_no`) REFERENCES `dogs` (`dog_no`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `walkings`
--

LOCK TABLES `walkings` WRITE;
/*!40000 ALTER TABLE `walkings` DISABLE KEYS */;
INSERT INTO `walkings` VALUES
(31,21,146,'2023-10-04 15:00:00',2,362,'2023-10-05 13:38:11','2023-10-05 13:38:11',0),
(32,25,151,'2023-10-04 15:00:00',1,12,'2023-10-05 14:26:26','2023-10-05 14:26:26',0);
/*!40000 ALTER TABLE `walkings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-05 23:44:23
