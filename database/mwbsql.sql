-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Yum
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Yum
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Yum` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `Yum` ;

-- -----------------------------------------------------
-- Table `Yum`.`Ingredients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`Ingredients` (
  `idIngredients` INT NOT NULL AUTO_INCREMENT,
  `Ingredient_Name` VARCHAR(45) NOT NULL,
  `Dietry_Warning` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idIngredients`),
  UNIQUE INDEX `idIngredients_UNIQUE` (`idIngredients` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Yum`.`Recipe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`Recipe` (
  `idRecipe` INT NOT NULL AUTO_INCREMENT,
  `Recipe_Name` VARCHAR(45) NOT NULL,
  `Cooking_Time` INT NOT NULL COMMENT 'Need to change so that it takes the time value. For now it is int and will be set as the minute value',
  `Prep_Time` INT NOT NULL,
  `Total_Time` INT NOT NULL,
  `Calories` INT NOT NULL,
  `Rating` INT NOT NULL,
  `Instructions` TEXT NOT NULL,
  `Review` TEXT NOT NULL,
  PRIMARY KEY (`idRecipe`),
  UNIQUE INDEX `idRecipe_UNIQUE` (`idRecipe` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Yum`.`Ingredients_Needed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`Ingredients_Needed` (
  `idRecipe` INT NOT NULL,
  `idIngredients` INT NOT NULL,
  PRIMARY KEY (`idRecipe`, `idIngredients`),
  INDEX `idIngredients_idx` (`idIngredients` ASC) VISIBLE,
  CONSTRAINT `idRecipe`
    FOREIGN KEY (`idRecipe`)
    REFERENCES `Yum`.`Recipe` (`idRecipe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idIngredients`
    FOREIGN KEY (`idIngredients`)
    REFERENCES `Yum`.`Ingredients` (`idIngredients`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Yum`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `First_Name` VARCHAR(45) NOT NULL,
  `Surname` VARCHAR(45) NOT NULL,
  `Username` VARCHAR(45) NOT NULL,
  `User_Password` VARCHAR(45) NOT NULL,
  `isAdmin` VARCHAR(45) BINARY NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `idUser_UNIQUE` (`idUser` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Yum`.`Saved_Recipes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`Saved_Recipes` (
  `idUser` INT NOT NULL,
  `idRecipe` INT NOT NULL,
  PRIMARY KEY (`idUser`, `idRecipe`),
  INDEX `idRecipe_idx` (`idRecipe` ASC) VISIBLE,
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `Yum`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idRecipe`
    FOREIGN KEY (`idRecipe`)
    REFERENCES `Yum`.`Recipe` (`idRecipe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Yum`.`Inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`Inventory` (
  `idUser` INT NOT NULL,
  `idIngredient` INT NOT NULL,
  PRIMARY KEY (`idUser`, `idIngredient`),
  INDEX `idIngredient_idx` (`idIngredient` ASC) VISIBLE,
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `Yum`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idIngredient`
    FOREIGN KEY (`idIngredient`)
    REFERENCES `Yum`.`Ingredients` (`idIngredients`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `Yum` ;

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`ingredient_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`ingredient_details` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`recipe_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`recipe_details` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`user_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`user_details` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`recipes_under_total_time`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`recipes_under_total_time` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`admin_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`admin_details` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`recipe_rating_under`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`recipe_rating_under` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`recipe_under_prep_time`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`recipe_under_prep_time` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`recipe_under_cooking_time`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`recipe_under_cooking_time` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`recipes_with_certain_ingredients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`recipes_with_certain_ingredients` (`idRecipe` INT, `Recipe_Name` INT, `Cooking_Time` INT, `Prep_Time` INT, `Total_Time` INT, `Calories` INT, `Rating` INT, `Instructions` INT, `Review` INT, `Dietry_Information` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`users_saved_recipes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`users_saved_recipes` (`idRecipe` INT, `Recipe_Name` INT, `Cooking_Time` INT, `Prep_Time` INT, `Total_Time` INT, `Calories` INT, `Rating` INT, `Instructions` INT, `Review` INT, `Dietry_Information` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`user_forgotten_username_password`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`user_forgotten_username_password` (`Username` INT, `User_Password` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`admin_forgotten_username_passowrd`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`admin_forgotten_username_passowrd` (`Username` INT, `User_Password` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`users_inventory_new`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`users_inventory_new` (`idIngredients` INT, `Ingredient_Name` INT, `Food_Group` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`ingredients_within_certain_food_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`ingredients_within_certain_food_group` (`idIngredients` INT, `Ingredient_Name` INT, `Food_Group` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`recipes_under_certain_calories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`recipes_under_certain_calories` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `Yum`.`recipes_with_certain_dietry_information`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Yum`.`recipes_with_certain_dietry_information` (`idRecipe` INT, `Recipe_Name` INT, `Cooking_Time` INT, `Prep_Time` INT, `Total_Time` INT, `Calories` INT, `Rating` INT, `Instructions` INT, `Review` INT, `Dietry_Information` INT);

-- -----------------------------------------------------
-- View `Yum`.`ingredient_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`ingredient_details`;
USE `Yum`;
CREATE  OR REPLACE VIEW `ingredient_details` AS
SELECT * FROM yum.ingredients;

-- -----------------------------------------------------
-- View `Yum`.`recipe_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`recipe_details`;
USE `Yum`;
CREATE  OR REPLACE VIEW `recipe_details` AS
SELECT * FROM yum.recipe;

-- -----------------------------------------------------
-- View `Yum`.`user_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`user_details`;
USE `Yum`;
CREATE  OR REPLACE VIEW `user_details` AS
SELECT * FROM yum.user;

-- -----------------------------------------------------
-- View `Yum`.`recipes_under_total_time`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`recipes_under_total_time`;
USE `Yum`;
CREATE  OR REPLACE VIEW `recipes_under_total_time` AS
SELECT * FROM yum.recipe WHERE total_time < 50;

-- -----------------------------------------------------
-- View `Yum`.`admin_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`admin_details`;
USE `Yum`;
CREATE OR REPLACE VIEW `admin_details` AS
SELECT * FROM yum.user WHERE isAdmin = true;

-- -----------------------------------------------------
-- View `Yum`.`recipe_rating_under`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`recipe_rating_under`;
USE `Yum`;
CREATE  OR REPLACE VIEW `recipe_rating_under` AS
SELECT * FROM yum.recipe WHERE rating < 4;

-- -----------------------------------------------------
-- View `Yum`.`recipe_under_prep_time`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`recipe_under_prep_time`;
USE `Yum`;
CREATE  OR REPLACE VIEW `recipe_under_prep_time` AS
SELECT * FROM yum.recipe WHERE Prep_Time < 120;

-- -----------------------------------------------------
-- View `Yum`.`recipe_under_cooking_time`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`recipe_under_cooking_time`;
USE `Yum`;
CREATE  OR REPLACE VIEW `recipe_under_cooking_time` AS
SELECT * FROM yum.recipe WHERE Cooking_Time < 90;

-- -----------------------------------------------------
-- View `Yum`.`recipes_with_certain_ingredients`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`recipes_with_certain_ingredients`;
USE `Yum`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `recipes_with_certain_ingredients` AS
    SELECT 
        `recipe`.`idRecipe` AS `idRecipe`,
        `recipe`.`Recipe_Name` AS `Recipe_Name`,
        `recipe`.`Cooking_Time` AS `Cooking_Time`,
        `recipe`.`Prep_Time` AS `Prep_Time`,
        `recipe`.`Total_Time` AS `Total_Time`,
        `recipe`.`Calories` AS `Calories`,
        `recipe`.`Rating` AS `Rating`,
        `recipe`.`Instructions` AS `Instructions`,
        `recipe`.`Review` AS `Review`,
        `recipe`.`Dietry_Information` AS `Dietry_Information`
    FROM
        ((`recipe`
        JOIN `ingredients_needed` ON ((`recipe`.`idRecipe` = `ingredients_needed`.`idRec`)))
        JOIN `ingredients` ON ((`ingredients_needed`.`idIngredients` = `ingredients`.`idIngredients`)))
    WHERE
        (`ingredients`.`Ingredient_Name` = 'Chicken Breast');

-- -----------------------------------------------------
-- View `Yum`.`users_saved_recipes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`users_saved_recipes`;
USE `Yum`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `users_saved_recipes` AS
    SELECT DISTINCT
        `recipe`.`idRecipe` AS `idRecipe`,
        `recipe`.`Recipe_Name` AS `Recipe_Name`,
        `recipe`.`Cooking_Time` AS `Cooking_Time`,
        `recipe`.`Prep_Time` AS `Prep_Time`,
        `recipe`.`Total_Time` AS `Total_Time`,
        `recipe`.`Calories` AS `Calories`,
        `recipe`.`Rating` AS `Rating`,
        `recipe`.`Instructions` AS `Instructions`,
        `recipe`.`Review` AS `Review`,
        `recipe`.`Dietry_Information` AS `Dietry_Information`
    FROM
        ((`recipe`
        JOIN `saved_recipes` ON ((`recipe`.`idRecipe` = `saved_recipes`.`idRecipe`)))
        JOIN `user` ON ((`saved_recipes`.`idUser` = `user`.`idUser`)))
    WHERE
        (`user`.`idUser` = 1);

-- -----------------------------------------------------
-- View `Yum`.`user_forgotten_username_password`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`user_forgotten_username_password`;
USE `Yum`;
CREATE  OR REPLACE VIEW `user_forgotten_username_password` AS
SELECT Username, User_Password
FROM user
WHERE idUser = 1;

-- -----------------------------------------------------
-- View `Yum`.`admin_forgotten_username_passowrd`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`admin_forgotten_username_passowrd`;
USE `Yum`;
CREATE  OR REPLACE VIEW `admin_forgotten_username_passowrd` AS
SELECT Username, User_Password
FROM yum.user
WHERE isAdmin = true;

-- -----------------------------------------------------
-- View `Yum`.`users_inventory_new`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`users_inventory_new`;
USE `Yum`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `users_inventory_new` AS
    SELECT DISTINCT
        `ingredients`.`idIngredients` AS `idIngredients`,
        `ingredients`.`Ingredient_Name` AS `Ingredient_Name`,
        `ingredients`.`Food_Group` AS `Food_Group`
    FROM
        ((`ingredients`
        JOIN `inventory` ON ((`ingredients`.`idIngredients` = `inventory`.`idIngredient`)))
        JOIN `user` ON ((`user`.`idUser` = `inventory`.`idUse`)))
    WHERE
        (`user`.`idUser` = 2);

-- -----------------------------------------------------
-- View `Yum`.`ingredients_within_certain_food_group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`ingredients_within_certain_food_group`;
USE `Yum`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `ingredients_within_certain_food_group` AS
    SELECT 
        `ingredients`.`idIngredients` AS `idIngredients`,
        `ingredients`.`Ingredient_Name` AS `Ingredient_Name`,
        `ingredients`.`Food_Group` AS `Food_Group`
    FROM
        `ingredients`
    WHERE
        (`ingredients`.`Food_Group` = 'Carbohydrates');

-- -----------------------------------------------------
-- View `Yum`.`recipes_under_certain_calories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`recipes_under_certain_calories`;
USE `Yum`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `recipes_under_certain_calories` AS
    SELECT 
        *
    FROM
        `recipe`
    WHERE
        (`recipe`.`Calories` < 2000);

-- -----------------------------------------------------
-- View `Yum`.`recipes_with_certain_dietry_information`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Yum`.`recipes_with_certain_dietry_information`;
USE `Yum`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `recipes_with_certain_dietry_information` AS
    SELECT 
        `recipe`.`idRecipe` AS `idRecipe`,
        `recipe`.`Recipe_Name` AS `Recipe_Name`,
        `recipe`.`Cooking_Time` AS `Cooking_Time`,
        `recipe`.`Prep_Time` AS `Prep_Time`,
        `recipe`.`Total_Time` AS `Total_Time`,
        `recipe`.`Calories` AS `Calories`,
        `recipe`.`Rating` AS `Rating`,
        `recipe`.`Instructions` AS `Instructions`,
        `recipe`.`Review` AS `Review`,
        `recipe`.`Dietry_Information` AS `Dietry_Information`
    FROM
        `recipe`
    WHERE
        (`recipe`.`Dietry_Information` = 'Milk');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
