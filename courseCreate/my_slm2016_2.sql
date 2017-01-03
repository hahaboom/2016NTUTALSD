-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- 主機: 127.0.0.1
-- 產生時間： 2016-12-19 08:40:23
-- 伺服器版本: 10.1.19-MariaDB
-- PHP 版本： 7.0.13


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `slm2016`
--

-- --------------------------------------------------------

--
-- 資料表結構 `course_has_cc_address`
--

DROP TABLE IF EXISTS `course_has_cc_address`;
CREATE TABLE IF NOT EXISTS `course_has_cc_address` (
  `fk_course_id` varchar(50) NOT NULL,
  `cc_email` varchar(100) NOT NULL,
  KEY `FK_course_cc_address_course_info` (`fk_course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `course_has_date`
--

DROP TABLE IF EXISTS `course_has_date`;
CREATE TABLE IF NOT EXISTS `course_has_date` (
  `fk_course_id` varchar(50) NOT NULL,
  `date` date NOT NULL,
  KEY `FK_course_has_date_course_info` (`fk_course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `course_has_ticket`
--

DROP TABLE IF EXISTS `course_has_ticket`;
CREATE TABLE IF NOT EXISTS `course_has_ticket` (
  `fk_course_id` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  KEY `FK_course_ticket_info_course_info` (`fk_course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `course_info`
--

DROP TABLE IF EXISTS `course_info`;
CREATE TABLE IF NOT EXISTS `course_info` (
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
  KEY `FK_course_info_course_status` (`fk_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `course_status`
--

DROP TABLE IF EXISTS `course_status`;
CREATE TABLE IF NOT EXISTS `course_status` (
  `id` varchar(10) NOT NULL,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `course_status`
--

INSERT INTO `course_status` (`id`, `name`) VALUES
('1', '準備中'),
('2', '報名中'),
('3', '取消'),
('4', '確定開課'),
('5', '上課中'),
('6', '課程結束');

-- --------------------------------------------------------

--
-- 資料表結構 `student_info`
--

DROP TABLE IF EXISTS `student_info`;
CREATE TABLE IF NOT EXISTS `student_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `course_has_cc_address`
--
ALTER TABLE `course_has_cc_address`
  ADD CONSTRAINT `FK_course_cc_address_course_info` FOREIGN KEY (`fk_course_id`) REFERENCES `course_info` (`id`);

--
-- 資料表的 Constraints `course_has_date`
--
ALTER TABLE `course_has_date`
  ADD CONSTRAINT `FK_course_has_date_course_info` FOREIGN KEY (`fk_course_id`) REFERENCES `course_info` (`id`);

--
-- 資料表的 Constraints `course_has_ticket`
--
ALTER TABLE `course_has_ticket`
  ADD CONSTRAINT `FK_course_ticket_info_course_info` FOREIGN KEY (`fk_course_id`) REFERENCES `course_info` (`id`);

--
-- 資料表的 Constraints `course_info`
--
ALTER TABLE `course_info`
  ADD CONSTRAINT `FK_course_info_course_status` FOREIGN KEY (`fk_status_id`) REFERENCES `course_status` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
