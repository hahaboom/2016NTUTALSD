-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: SLM2016
-- ------------------------------------------------------
-- Server version	5.5.49-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `course_has_cc_address`
--

DROP TABLE IF EXISTS  course_has_cc_address ;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE course_has_cc_address (
  fk_course_id varchar(50) NOT NULL,
  cc_email varchar(100) NOT NULL,
  FOREIGN KEY (fk_course_id) REFERENCES course_info (id)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course_has_date`
--

DROP TABLE IF EXISTS `course_has_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_has_date` (
  `fk_course_id` varchar(50) NOT NULL,
  `date` date NOT NULL,
  FOREIGN KEY (`fk_course_id`) REFERENCES `course_info` (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course_has_ticket`
--

DROP TABLE IF EXISTS `course_has_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_has_ticket` (
  `fk_course_id` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
 FOREIGN KEY (`fk_course_id`) REFERENCES `course_info` (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course_info`
--

DROP TABLE IF EXISTS `course_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_info` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `code` varchar(50) NOT NULL,
  `type` varchar(10) NOT NULL,
  `batch` varchar(50) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `lecturer` varchar(10) DEFAULT NULL,
  `fk_status_id` varchar(10) NOT NULL,
  `page_link` varchar(100) DEFAULT NULL,
  `certificationPath` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`fk_status_id`) REFERENCES `course_status` (`id`)
) ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course_status`
--

DROP TABLE IF EXISTS `course_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_status` (
  `id` varchar(10) NOT NULL,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `course_status` (`id`, `name`) VALUES
('1', '準備中'),
('2', '報名中'),
('3', '取消'),
('4', '確定開課'),
('5', '上課中'),
('6', '課程結束');

--
-- Table structure for table `student_info`
--

DROP TABLE IF EXISTS `student_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_info` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `nickname` varchar(200) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `company` varchar(200) NOT NULL,
  `apartment` varchar(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  `ticket_type` varchar(200) NOT NULL,
  `ticket_price` varchar(200) NOT NULL,
  `receipt_type` varchar(200) NOT NULL,
  `receipt_company_name` varchar(200) NOT NULL,
  `receipt_company_EIN` varchar(200) NOT NULL,
  `receipt_EIN` varchar(200) NOT NULL,
  `student_status` varchar(200) NOT NULL,
  `payment_status` varchar(200) NOT NULL,
  `receipt_status` varchar(200) NOT NULL,
  `vege_meat` varchar(200) NOT NULL,
  `team_members` text NOT NULL,
  `comment` text NOT NULL,
  `timestamp` datetime NOT NULL,
  `certification_img` longtext NOT NULL,
  `certification_pdf` longtext NOT NULL,
  `fk_course_info_id` varchar(50) NOT NULL,
  `certification_id` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-15  0:26:13
