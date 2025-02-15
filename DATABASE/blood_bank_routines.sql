-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: blood_bank
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Temporary view structure for view `donor_view`
--

DROP TABLE IF EXISTS `donor_view`;
/*!50001 DROP VIEW IF EXISTS `donor_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `donor_view` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `email`,
 1 AS `number`,
 1 AS `table_name`,
 1 AS `state`,
 1 AS `district`,
 1 AS `city`,
 1 AS `pincode`,
 1 AS `reason`,
 1 AS `improve`,
 1 AS `deletion_time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `blood_bank_view`
--

DROP TABLE IF EXISTS `blood_bank_view`;
/*!50001 DROP VIEW IF EXISTS `blood_bank_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `blood_bank_view` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `email`,
 1 AS `number`,
 1 AS `table_name`,
 1 AS `state`,
 1 AS `district`,
 1 AS `city`,
 1 AS `pincode`,
 1 AS `reason`,
 1 AS `improve`,
 1 AS `deletion_time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `patient_view`
--

DROP TABLE IF EXISTS `patient_view`;
/*!50001 DROP VIEW IF EXISTS `patient_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `patient_view` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `email`,
 1 AS `number`,
 1 AS `state`,
 1 AS `district`,
 1 AS `city`,
 1 AS `pincode`,
 1 AS `table_name`,
 1 AS `reason`,
 1 AS `improve`,
 1 AS `deletion_time`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `donor_view`
--

/*!50001 DROP VIEW IF EXISTS `donor_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `donor_view` AS select `deleted_accounts`.`id` AS `id`,`deleted_accounts`.`name` AS `name`,`deleted_accounts`.`email` AS `email`,`deleted_accounts`.`number` AS `number`,`deleted_accounts`.`table_name` AS `table_name`,`deleted_accounts`.`state` AS `state`,`deleted_accounts`.`district` AS `district`,`deleted_accounts`.`city` AS `city`,`deleted_accounts`.`pincode` AS `pincode`,`deleted_accounts`.`reason` AS `reason`,`deleted_accounts`.`improve` AS `improve`,`deleted_accounts`.`deletion_time` AS `deletion_time` from `deleted_accounts` where (`deleted_accounts`.`table_name` = 'donor') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `blood_bank_view`
--

/*!50001 DROP VIEW IF EXISTS `blood_bank_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `blood_bank_view` AS select `deleted_accounts`.`id` AS `id`,`deleted_accounts`.`name` AS `name`,`deleted_accounts`.`email` AS `email`,`deleted_accounts`.`number` AS `number`,`deleted_accounts`.`table_name` AS `table_name`,`deleted_accounts`.`state` AS `state`,`deleted_accounts`.`district` AS `district`,`deleted_accounts`.`city` AS `city`,`deleted_accounts`.`pincode` AS `pincode`,`deleted_accounts`.`reason` AS `reason`,`deleted_accounts`.`improve` AS `improve`,`deleted_accounts`.`deletion_time` AS `deletion_time` from `deleted_accounts` where (`deleted_accounts`.`table_name` = 'blood_banks') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `patient_view`
--

/*!50001 DROP VIEW IF EXISTS `patient_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `patient_view` AS select `deleted_accounts`.`id` AS `id`,`deleted_accounts`.`name` AS `name`,`deleted_accounts`.`email` AS `email`,`deleted_accounts`.`number` AS `number`,`deleted_accounts`.`state` AS `state`,`deleted_accounts`.`district` AS `district`,`deleted_accounts`.`city` AS `city`,`deleted_accounts`.`pincode` AS `pincode`,`deleted_accounts`.`table_name` AS `table_name`,`deleted_accounts`.`reason` AS `reason`,`deleted_accounts`.`improve` AS `improve`,`deleted_accounts`.`deletion_time` AS `deletion_time` from `deleted_accounts` where (`deleted_accounts`.`table_name` = 'patient') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-02 19:51:32
