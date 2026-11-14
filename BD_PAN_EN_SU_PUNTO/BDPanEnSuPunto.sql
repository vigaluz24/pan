-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema pan_en_su_punto
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pan_en_su_punto
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pan_en_su_punto` DEFAULT CHARACTER SET utf8mb4 COLLATE = utf8mb4_general_ci ;
SET FOREIGN_KEY_CHECKS = 0;
USE `pan_en_su_punto` ;

-- -----------------------------------------------------
-- Table `pan_en_su_punto`.`proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pan_en_su_punto`.`proveedor` (
  `id_proveedor` INT NOT NULL AUTO_INCREMENT,
  `NIT` INT NOT NULL,
  `razon_sociaL` VARCHAR(150) NOT NULL,
  `telefono` VARCHAR(50) NOT NULL,
  `direccion` VARCHAR(200) NOT NULL,
  `correo` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id_proveedor`),
  UNIQUE INDEX `NIT` (`NIT` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `pan_en_su_punto`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pan_en_su_punto`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(100) NULL DEFAULT NULL,
  `contrasena` VARCHAR(100) NOT NULL,
  `rol` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `pan_en_su_punto`.`compras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pan_en_su_punto`.`compras` (
  `id_compras` INT NOT NULL AUTO_INCREMENT,
  `id_proveedor` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `fechaa_compra` DATETIME NOT NULL,
  `total_compra` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_compras`),
  INDEX `fk_compras_proveedor_idx` (`id_proveedor` ASC) ,
  INDEX `fk_compras_usuarios_idx` (`id_usuario` ASC) ,
  CONSTRAINT `fk_compras_proveedor`
    FOREIGN KEY (`id_proveedor`)
    REFERENCES `pan_en_su_punto`.`proveedor` (`id_proveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_compras_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `pan_en_su_punto`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `pan_en_su_punto`.`materia_prima`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pan_en_su_punto`.`materia_prima` (
  `id_materia_prima` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `unidad_medida` VARCHAR(100) NOT NULL,
  `stock_actual` DECIMAL(10,2) NOT NULL,
  `stock_minimo` DECIMAL(10,2) NOT NULL,
  `costo_unitario` DECIMAL(10,2) NOT NULL,
  `fecha_vencimiento` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id_materia_prima`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `pan_en_su_punto`.`detalle_compras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pan_en_su_punto`.`detalle_compras` (
  `id_detalle_compras` INT NOT NULL AUTO_INCREMENT,
  `id_compra` INT NOT NULL,
  `id_materia_prima` INT NOT NULL,
  `cantidad` DECIMAL(10,2) NOT NULL,
  `precio_unitario` DECIMAL(10,2) NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_detalle_compras`),
  INDEX `fk_detalle_compras_idx` (`id_compra` ASC) ,
  INDEX `fk_detalle_materia_prima_idx` (`id_materia_prima` ASC) ,
  CONSTRAINT `fk_detalle_compras`
    FOREIGN KEY (`id_compra`)
    REFERENCES `pan_en_su_punto`.`compras` (`id_compras`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_materia_prima`
    FOREIGN KEY (`id_materia_prima`)
    REFERENCES `pan_en_su_punto`.`materia_prima` (`id_materia_prima`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `pan_en_su_punto`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pan_en_su_punto`.`producto` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT NULL DEFAULT NULL,
  `precio_venta` DECIMAL(10,2) NOT NULL,
  `impuestos` DECIMAL(10,2) NOT NULL,
  `stock_actual` DECIMAL(10,2) NOT NULL,
  `stock_minimo` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_producto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `pan_en_su_punto`.`receta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pan_en_su_punto`.`receta` (
  `id_receta` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NOT NULL,
  `paso_a_paso` TEXT NULL DEFAULT NULL,
  `rendimiento_porciones` INT NOT NULL,
  PRIMARY KEY (`id_receta`),
  UNIQUE INDEX `id_producto` (`id_producto` ASC) ,
  CONSTRAINT `fk_receta_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `pan_en_su_punto`.`producto` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `pan_en_su_punto`.`detalle_receta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pan_en_su_punto`.`detalle_receta` (
  `id_detalle_receta` INT NOT NULL AUTO_INCREMENT,
  `id_receta` INT NOT NULL,
  `id_materia_prima` INT NOT NULL,
  `cantidad` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_detalle_receta`),
  INDEX `fk_detalle_receta_idx` (`id_receta` ASC) ,
  INDEX `fk_detalle_materia_prima_idx` (`id_materia_prima` ASC) ,
  CONSTRAINT `fk_detalle_receta`
    FOREIGN KEY (`id_receta`)
    REFERENCES `pan_en_su_punto`.`receta` (`id_receta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_materia_prima`
    FOREIGN KEY (`id_materia_prima`)
    REFERENCES `pan_en_su_punto`.`materia_prima` (`id_materia_prima`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `pan_en_su_punto`.`venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pan_en_su_punto`.`venta` (
  `id_venta` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `fecha` DATETIME NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_venta`),
  INDEX `fk_venta_usuarios_idx` (`id_usuario` ASC) ,
  CONSTRAINT `fk_venta_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `pan_en_su_punto`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `pan_en_su_punto`.`detalle_venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pan_en_su_punto`.`detalle_venta` (
  `id_detalle_venta` INT NOT NULL AUTO_INCREMENT,
  `id_venta` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio_unitario` DECIMAL(10,2) NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_detalle_venta`),
  INDEX `fk_detalle_venta_idx` (`id_venta` ASC) ,
  INDEX `fk_detalle_producto_idx` (`id_producto` ASC) ,
  CONSTRAINT `fk_detalle_venta`
    FOREIGN KEY (`id_venta`)
    REFERENCES `pan_en_su_punto`.`venta` (`id_venta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `pan_en_su_punto`.`producto` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `pan_en_su_punto`.`merma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pan_en_su_punto`.`merma` (
  `id_merma` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_materia_prima` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `fecha_registro` DATETIME NOT NULL,
  `cantidad` DECIMAL(10,2) NOT NULL,
  `motivo` TEXT NOT NULL,
  PRIMARY KEY (`id_merma`),
  INDEX `fk_merma_usuarios_idx` (`id_usuario` ASC) ,
  INDEX `fk_merma_materia_prima_idx` (`id_materia_prima` ASC) ,
  INDEX `fk_merma_producto_idx` (`id_producto` ASC) ,
  CONSTRAINT `fk_merma_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `pan_en_su_punto`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_merma_materia_prima`
    FOREIGN KEY (`id_materia_prima`)
    REFERENCES `pan_en_su_punto`.`materia_prima` (`id_materia_prima`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_merma_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `pan_en_su_punto`.`producto` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `pan_en_su_punto`.`orden_produccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pan_en_su_punto`.`orden_produccion` (
  `id_orden` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_receta` INT NOT NULL,
  `fecha_programada` DATETIME NOT NULL,
  `cantidad_a_producir` INT NOT NULL,
  `estado` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id_orden`),
  INDEX `fk_orden_usuarios_idx` (`id_usuario` ASC) ,
  INDEX `fk_orden_receta_idx` (`id_receta` ASC) ,
  CONSTRAINT `fk_orden_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `pan_en_su_punto`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orden_receta`
    FOREIGN KEY (`id_receta`)
    REFERENCES `pan_en_su_punto`.`receta` (`id_receta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
SET FOREIGN_KEY_CHECKS = 1;
