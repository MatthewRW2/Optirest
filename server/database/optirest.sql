
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
-- Servidor: 127.0.0.1
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Base de datos: `optirest`

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `alimento`

CREATE TABLE `alimento` (
  `IdAlimento` int(11) NOT NULL,
  `IdCategoria` int(11) NOT NULL,
  `nombreAlimento` varchar(100) NOT NULL,
  `cantidadDisponible` varchar(20) NOT NULL,
  `cantidadMinima` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcado de datos para la tabla `alimento`
INSERT INTO `alimento` (`IdAlimento`, `IdCategoria`, `nombreAlimento`, `cantidadDisponible`, `cantidadMinima`) VALUES
(2, 1, 'Pollo', '60', '15'),
(3, 2, 'Arroz', '100', '20'),
(4, 2, 'Frijoles', '80', '20'),
(5, 3, 'Manzana', '150', '30'),
(6, 1, 'Carne de Res', '50', '10'),
(7, 1, 'Pescado', '40', '10'),
(8, 1, 'Cerdo', '45', '12'),
(9, 2, 'Papa', '70', '20'),
(10, 2, 'Pasta', '120', '25'),
(11, 2, 'Lentejas', '90', '15'),
(12, 2, 'Pan', '200', '50'),
(13, 3, 'Leche', '180', '40'),
(14, 3, 'Queso', '80', '20'),
(15, 4, 'Banana', '130', '30'),
(16, 4, 'Naranja', '140', '35'),
(17, 4, 'Fresas', '100', '25'),
(18, 5, 'Zanahoria', '60', '15'),
(19, 5, 'Espinaca', '50', '10'),
(20, 5, 'Brócoli', '45', '12'),
(21, 6, 'Garbanzos', '80', '20'),
(22, 6, 'Habichuelas', '60', '15'),
(23, 7, 'Jugo de Naranja', '90', '25'),
(24, 7, 'Agua', '500', '100'),
(25, 7, 'Té', '120', '30');

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `asignacion_alimenticia`

CREATE TABLE `asignacion_alimenticia` (
  `IdAsignaciónAlimenticia` int(11) NOT NULL,
  `IdNivelAcademico` int(11) NOT NULL,
  `IdCategoria` int(11) NOT NULL,
  `cantidadAlimento` int(11) NOT NULL,
  `unidadMedida` enum('Gramos(g)','Unidad','Mililitro(ml)') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcado de datos para la tabla `asignacion_alimenticia`
INSERT INTO `asignacion_alimenticia` (`IdAsignaciónAlimenticia`, `IdNivelAcademico`, `IdCategoria`, `cantidadAlimento`, `unidadMedida`) VALUES
(1, 1, 1, 25, 'Gramos(g)'),
(2, 1, 2, 25, 'Gramos(g)'),
(3, 1, 3, 25, 'Gramos(g)'),
(4, 1, 4, 25, 'Gramos(g)'),
(5, 1, 5, 25, 'Gramos(g)');

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `asistencia`

CREATE TABLE `asistencia` (
  `IdAsistencia` varchar(11) NOT NULL,
  `fechaAsistencia` datetime NOT NULL,
  `cantidadAsistencia` int(11) NOT NULL,
  `IdGrupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `categoria`

CREATE TABLE `categoria` (
  `IdCategoria` int(11) NOT NULL,
  `nombreCategoria` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcado de datos para la tabla `categoria`
INSERT INTO `categoria` (`IdCategoria`, `nombreCategoria`) VALUES
(1, 'Proteina'),
(2, 'Carbohidrato'),
(3, 'Lacteos'),
(4, 'Frutas'),
(5, 'Verduras'),
(6, 'Legumbres'),
(7, 'Bebidas');

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `cronograma`

CREATE TABLE `cronograma` (
  `IdCronograma` int(11) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `Observación` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcado de datos para la tabla `cronograma`
INSERT INTO `cronograma` (`IdCronograma`, `fechaInicio`, `fechaFin`, `Observación`) VALUES
(1, '2024-09-01', '2024-09-15', 'Inicio de clases y entrega de almuerzos'),
(2, '2024-09-16', '2024-09-30', 'Cancelación de clases'),
(3, '2024-10-01', '2024-10-10', 'Semana de actividades culturales'),
(4, '2024-10-11', '2024-10-20', 'Receso escolar'),
(5, '2024-10-21', '2024-10-31', 'Cierre del periodo');

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `detalle_cronograma`

CREATE TABLE `detalle_cronograma` (
  `IdDetalleCronograma` int(11) NOT NULL,
  `IdCronograma` int(11) NOT NULL,
  `IdMenu` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Dia` int(11) NOT NULL,
  `pesoDesperdicio` varchar(20) NOT NULL,
  `cantidadConsumida` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `detalle_entrada`

CREATE TABLE `detalle_entrada` (
  `IdAlimento` int(11) NOT NULL,
  `IdEntradaAlimentos` int(11) NOT NULL,
  `cantidadEntrada` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `detalle_menu`

CREATE TABLE `detalle_menu` (
  `IdDetalleMenu` int(11) NOT NULL,
  `IdMenu` int(11) NOT NULL,
  `IdAlimento` int(11) NOT NULL,
  `cantidad` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcado de datos para la tabla `detalle_menu`
INSERT INTO `detalle_menu` (`IdDetalleMenu`, `IdMenu`, `IdAlimento`, `cantidad`) VALUES
(1, 1, 2, '20'),
(2, 1, 3, '30'),
(3, 1, 4, '25'),
(4, 2, 2, '15'),
(5, 2, 3, '35'),
(6, 2, 5, '20'),
(7, 3, 4, '30'),
(8, 3, 5, '25'),
(9, 4, 2, '15'),
(10, 4, 3, '40');

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `detalle_salida`

CREATE TABLE `detalle_salida` (
  `IdAlimento` int(11) NOT NULL,
  `IdSalidaAlimentos` int(11) NOT NULL,
  `cantidadSalida` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `entrada_alimentos`

CREATE TABLE `entrada_alimentos` (
  `IdEntradaAlimentos` int(11) NOT NULL,
  `fechaEntrada` datetime NOT NULL,
  `observacion` varchar(500) NOT NULL,
  `IdUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `grupo`

CREATE TABLE `grupo` (
  `IdGrupo` int(11) NOT NULL,
  `nombreGrupo` varchar(50) NOT NULL,
  `IdNivelAcademico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `menu`

CREATE TABLE `menu` (
  `IdMenu` int(11) NOT NULL,
  `nombreMenu` varchar(50) NOT NULL,
  `observacionMenu` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcado de datos para la tabla `menu`
INSERT INTO `menu` (`IdMenu`, `nombreMenu`, `observacionMenu`) VALUES
(1, 'Almuerzo Infantil', 'Este menú está diseñado para niños entre 6 y 12 años.'),
(2, 'Desayuno Saludable', 'Menú con opciones bajas en azúcar y grasas.'),
(3, 'Almuerzo Ejecutivo', 'Menú ideal para adultos con necesidades calóricas altas.'),
(4, 'Cena Ligera', 'Menú diseñado para una cena baja en calorías.'),
(5, 'Snack de la Tarde', 'Opción para la merienda de los niños.');

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `nivel_academico`

CREATE TABLE `nivel_academico` (
  `IdNivelAcademico` int(11) NOT NULL,
  `nombreNivel` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcado de datos para la tabla `nivel_academico`
INSERT INTO `nivel_academico` (`IdNivelAcademico`, `nombreNivel`) VALUES
(1, 'Primaria'),
(2, 'Secundaria'),
(3, 'Preescolar'),
(4, 'Bachillerato'),
(5, 'Universitario');

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `salida_alimentos`

CREATE TABLE `salida_alimentos` (
  `IdSalidaAlimentos` int(11) NOT NULL,
  `fechaSalida` datetime NOT NULL,
  `observacion` varchar(500) NOT NULL,
  `IdUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `usuario`

CREATE TABLE `usuario` (
  `IdUsuario` int(11) NOT NULL,
  `Nombres` VARCHAR(100) NOT NULL,
  `Apellidos` VARCHAR(100) NOT NULL,
  `Rol` ENUM('Administrador','Docente','PersonalDeCocina') NOT NULL,
  `tipoDocumento` VARCHAR(3) NOT NULL,
  `numeroDocumento` INT(11) NOT NULL,
  `Contraseña` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcado de datos para la tabla `usuario`
INSERT INTO `usuario` (`IdUsuario`, `Nombres`, `Apellidos`, `Rol`, `tipoDocumento`, `numeroDocumento`, `Contraseña`)
VALUES 
(1, 'Juan', 'Pérez', 'Administrador', 'CC', 12345678, 'hashed_password_123'),
(2, 'Ana', 'Gómez', 'Docente', 'TI', 87654321, 'hashed_password_456'),
(3, 'Luis', 'Martínez', 'PersonalDeCocina', 'CC', 11223344, 'hashed_password_789'),
(4, 'María', 'Rodríguez', 'Docente', 'CE', 23456789, 'hashed_password_012'),
(5, 'Carlos', 'Fernández', 'PersonalDeCocina', 'CC', 34567890, 'hashed_password_345');

-- Índices para tablas volcadas

-- Índices para la tabla `alimento`
ALTER TABLE `alimento`
  ADD PRIMARY KEY (`IdAlimento`),
  ADD KEY `IdCategoria` (`IdCategoria`);

-- Índices para la tabla `asignacion_alimenticia`
ALTER TABLE `asignacion_alimenticia`
  ADD PRIMARY KEY (`IdAsignaciónAlimenticia`),
  ADD KEY `IdNivelAcademico` (`IdNivelAcademico`),
  ADD KEY `IdCategoria` (`IdCategoria`);

-- Índices para la tabla `asistencia`
ALTER TABLE `asistencia`
  ADD PRIMARY KEY (`IdAsistencia`),
  ADD KEY `IdGrupo` (`IdGrupo`);

-- Índices para la tabla `categoria`
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`IdCategoria`);

-- Índices para la tabla `cronograma`
ALTER TABLE `cronograma`
  ADD PRIMARY KEY (`IdCronograma`);

-- Índices para la tabla `detalle_cronograma`
ALTER TABLE `detalle_cronograma`
  ADD PRIMARY KEY (`IdDetalleCronograma`),
  ADD KEY `IdCronograma` (`IdCronograma`),
  ADD KEY `IdMenu` (`IdMenu`);

-- Índices para la tabla `detalle_entrada`
ALTER TABLE `detalle_entrada`
  ADD KEY `IdAlimento` (`IdAlimento`),
  ADD KEY `IdEntradaAlimentos` (`IdEntradaAlimentos`);

-- Índices para la tabla `detalle_menu`
ALTER TABLE `detalle_menu`
  ADD PRIMARY KEY (`IdDetalleMenu`),
  ADD KEY `IdMenu` (`IdMenu`),
  ADD KEY `IdAlimento` (`IdAlimento`);

-- Índices para la tabla `detalle_salida`
ALTER TABLE `detalle_salida`
  ADD KEY `IdAlimento` (`IdAlimento`),
  ADD KEY `IdSalidaAlimentos` (`IdSalidaAlimentos`);

-- Índices para la tabla `entrada_alimentos`
ALTER TABLE `entrada_alimentos`
  ADD PRIMARY KEY (`IdEntradaAlimentos`),
  ADD KEY `IdUsuario` (`IdUsuario`);

-- Índices para la tabla `grupo`
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`IdGrupo`),
  ADD KEY `IdNivelAcademico` (`IdNivelAcademico`);

-- Índices para la tabla `menu`
ALTER TABLE `menu`
  ADD PRIMARY KEY (`IdMenu`);

-- Índices para la tabla `nivel_academico`
ALTER TABLE `nivel_academico`
  ADD PRIMARY KEY (`IdNivelAcademico`);

-- Índices para la tabla `salida_alimentos`
ALTER TABLE `salida_alimentos`
  ADD PRIMARY KEY (`IdSalidaAlimentos`),
  ADD KEY `IdUsuario` (`IdUsuario`);

-- Índices para la tabla `usuario`
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IdUsuario`);

-- Restricciones para tablas volcadas

-- Filtros de restricciones para la tabla `alimento`
ALTER TABLE `alimento`
  ADD CONSTRAINT `alimento_ibfk_1` FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`IdCategoria`);

-- Filtros de restricciones para la tabla `asignacion_alimenticia`
ALTER TABLE `asignacion_alimenticia`
  ADD CONSTRAINT `asignacion_alimenticia_ibfk_1` FOREIGN KEY (`IdNivelAcademico`) REFERENCES `nivel_academico` (`IdNivelAcademico`),
  ADD CONSTRAINT `asignacion_alimenticia_ibfk_2` FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`IdCategoria`);

-- Filtros de restricciones para la tabla `asistencia`
ALTER TABLE `asistencia`
  ADD CONSTRAINT `asistencia_ibfk_1` FOREIGN KEY (`IdGrupo`) REFERENCES `grupo` (`IdGrupo`);

-- Filtros de restricciones para la tabla `detalle_cronograma`
ALTER TABLE `detalle_cronograma`
  ADD CONSTRAINT `detalle_cronograma_ibfk_1` FOREIGN KEY (`IdCronograma`) REFERENCES `cronograma` (`IdCronograma`),
  ADD CONSTRAINT `detalle_cronograma_ibfk_2` FOREIGN KEY (`IdMenu`) REFERENCES `menu` (`IdMenu`);

-- Filtros de restricciones para la tabla `detalle_entrada`
ALTER TABLE `detalle_entrada`
  ADD CONSTRAINT `detalle_entrada_ibfk_1` FOREIGN KEY (`IdAlimento`) REFERENCES `alimento` (`IdAlimento`),
  ADD CONSTRAINT `detalle_entrada_ibfk_2` FOREIGN KEY (`IdEntradaAlimentos`) REFERENCES `entrada_alimentos` (`IdEntradaAlimentos`);

-- Filtros de restricciones para la tabla `detalle_menu`
ALTER TABLE `detalle_menu`
  ADD CONSTRAINT `detalle_menu_ibfk_1` FOREIGN KEY (`IdMenu`) REFERENCES `menu` (`IdMenu`),
  ADD CONSTRAINT `detalle_menu_ibfk_2` FOREIGN KEY (`IdAlimento`) REFERENCES `alimento` (`IdAlimento`);

-- Filtros de restricciones para la tabla `detalle_salida`
ALTER TABLE `detalle_salida`
  ADD CONSTRAINT `detalle_salida_ibfk_1` FOREIGN KEY (`IdAlimento`) REFERENCES `alimento` (`IdAlimento`),
  ADD CONSTRAINT `detalle_salida_ibfk_2` FOREIGN KEY (`IdSalidaAlimentos`) REFERENCES `salida_alimentos` (`IdSalidaAlimentos`);

-- Filtros de restricciones para la tabla `entrada_alimentos`
ALTER TABLE `entrada_alimentos`
  ADD CONSTRAINT `entrada_alimentos_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`);

-- Filtros de restricciones para la tabla `grupo`
ALTER TABLE `grupo`
  ADD CONSTRAINT `grupo_ibfk_1` FOREIGN KEY (`IdNivelAcademico`) REFERENCES `nivel_academico` (`IdNivelAcademico`);

-- Filtros de restricciones para la tabla `salida_alimentos`
ALTER TABLE `salida_alimentos`
  ADD CONSTRAINT `salida_alimentos_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`);
