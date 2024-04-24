-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: social
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `name` varchar(45) NOT NULL,
  `coverPic` varchar(300) DEFAULT NULL,
  `profilePic` varchar(300) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `website` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Test','test@gmail.com','$2a$10$.Ixde6I2cHTyr36B.dI2yudDdejwWabW7iwiFFS5dOpJ4mUiPQSNO','John Doe',NULL,NULL,NULL,NULL),(2,'Test2','test2@gmail.com','$2a$10$csRe.A.LabCC3HcDuyBfE.IyXDGg.JnP1O20amb1LLmyue7Wradkq','Jane Doe2','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRANROIlaG50pv7a-eydVTMk68mrNQ19z5XWMJyTSKrpQ&s','https://i.pinimg.com/736x/33/a1/1e/33a11ec7801981f093f10698e251f954.jpg','CBE','hi'),(3,'Test3','test3@gmail.com','$2a$10$U/Yb297NG/aIHGdJ3SVu3OzupKj21odq66WUx5AgCv4Oo9L.AzoFK','Jack Doe',NULL,NULL,NULL,NULL),(13,'Nikillan','nikillan.mitmpl2022@learner.manipal.edu','$2a$10$B2GaFnKPjE0kWuULpBiU7e0isDJBPmOsc/Qjt7Ku22tm3dWrQZZHS','Nikillan','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxeSoYnIwqK6Yc_KADlpStwHHMf4Y_zOsT174dx3F9yw&s','https://media.licdn.com/dms/image/D5603AQG5ByTDxn6qaA/profile-displayphoto-shrink_400_400/0/1699388843431?e=1719446400&v=beta&t=yAv5r6GRbhNfNFOV89NxoYdUueYz2EVIDyPWROxFTx8','Manipal','hello'),(14,'notreallyankit','ankit@learner.manipal.edu','$2a$10$tVsPTgq9MqbyBWTTe1FUYOwwUneFYCXt0XmPruyJTUvK2a0Zqx0NK','Ankit','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVHPBkemcFGOj-8ePEcpgRz5gFY-KaMh00bGF0Q5r6mA&s','https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',NULL,NULL),(15,'akshajv','akshaj@learner.manipal.edu','$2a$10$lVALfzv81yNZ20Kac6RfzOOKRX2qZdGmHyOm6qHT6K1M/puxsqtM6','akshaj','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGfrzn2XkrXza55mxoPoLCAhNtRi8HnJFxCCQLsAylbQ&s','https://img.freepik.com/premium-photo/bright-vivid-instagram-profile-pic-cute-little-bunny-with-wideeyed-innocence-sporting-fru_983420-22471.jpg',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-24 10:37:39
