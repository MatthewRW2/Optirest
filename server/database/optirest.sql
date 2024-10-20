-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2024 a las 02:33:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `optirest`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alimento`
--

CREATE TABLE `alimento` (
  `IdAlimento` int(11) NOT NULL,
  `IdCategoria` int(11) NOT NULL,
  `nombreAlimento` varchar(100) NOT NULL,
  `cantidadDisponible` varchar(20) NOT NULL,
  `cantidadMinima` varchar(20) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alimento`
--

INSERT INTO `alimento` (`IdAlimento`, `IdCategoria`, `nombreAlimento`, `cantidadDisponible`, `cantidadMinima`, `Fecha`) VALUES
(50, 1, 'Pollo', 200, 50, '2024-10-19 21:33:06'),
(51, 1, 'Carne de res', 150, 40, '2024-10-19 21:33:06'),
(52, 1, 'Pescado', 120, 30, '2024-10-19 21:33:06'),
(53, 2, 'Arroz', 300, 100, '2024-10-19 21:33:06'),
(54, 2, 'Pasta', 250, 80, '2024-10-19 21:33:06'),
(55, 2, 'Pan', 200, 60, '2024-10-19 21:33:06'),
(56, 3, 'Leche', 400, 150, '2024-10-19 21:33:06'),
(57, 3, 'Queso', 100, 30, '2024-10-19 21:33:06'),
(58, 3, 'Yogur', 120, 40, '2024-10-19 21:33:06'),
(59, 4, 'Manzanas', 180, 50, '2024-10-19 21:33:06'),
(60, 4, 'Bananas', 160, 40, '2024-10-19 21:33:06'),
(61, 4, 'Peras', 140, 30, '2024-10-19 21:33:06'),
(62, 5, 'Zanahorias', 200, 70, '2024-10-19 21:33:06'),
(63, 5, 'Papas', 300, 100, '2024-10-19 21:33:06'),
(64, 5, 'Espinacas', 80, 20, '2024-10-19 21:33:06'),
(65, 6, 'Lentejas', 100, 30, '2024-10-19 21:33:06'),
(66, 6, 'Frijoles', 150, 50, '2024-10-19 21:33:06'),
(67, 6, 'Garbanzos', 120, 40, '2024-10-19 21:33:06'),
(68, 7, 'Agua embotellada', 500, 200, '2024-10-19 21:33:06'),
(69, 7, 'Jugo de naranja', 300, 100, '2024-10-19 21:33:06'),
(70, 7, 'Refrescos', 400, 150, '2024-10-19 21:33:06');


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignacion_alimenticia`
--

CREATE TABLE `asignacion_alimenticia` (
  `IdAsignaciónAlimenticia` int(11) NOT NULL,
  `IdGrupo` int(11) NOT NULL,
  `IdCategoria` int(11) NOT NULL,
  `cantidadAlimento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `IdAsistencia` int(11) NOT NULL,
  `fechaAsistencia` datetime NOT NULL,
  `cantidadAsistencia` int(11) NOT NULL,
  `IdGrupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `IdCategoria` int(11) NOT NULL,
  `nombreCategoria` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`IdCategoria`, `nombreCategoria`) VALUES
(1, 'Proteina '),
(2, 'Carbohidrato'),
(3, 'Lacteos'),
(4, 'Frutas'),
(5, 'Verduras'),
(6, 'Legumbres'),
(7, 'Bebidas');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `cronograma`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `cronograma` (
`Fecha` date
,`Proteina` varchar(100)
,`Carbohidrato` varchar(100)
,`Lacteo` varchar(100)
,`Fruta` varchar(100)
,`Verdura` varchar(100)
,`Legumbre` varchar(100)
,`Bebida` varchar(100)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desperdicios`
--

CREATE TABLE `desperdicios` (
  `IdDesperdicio` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `cantidad` int(11) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `IdMenu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `desperdicios`
--

INSERT INTO `desperdicios` (`IdDesperdicio`, `Fecha`, `cantidad`, `descripcion`, `IdMenu`) VALUES
(9, '2024-10-16', 5000, 'MUCHO', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `IdGrupo` int(11) NOT NULL,
  `Grado` char(10) NOT NULL,
  `NivelAcademico` enum('primaria','secundaria','media','superior') NOT NULL,
  `cantidadEstudiantes` int(3) NOT NULL,
  `vigenciaAño` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`IdGrupo`, `Grado`, `NivelAcademico`, `cantidadEstudiantes`, `vigenciaAño`) VALUES
(1, 'Primero', 'primaria', 30, 2023),
(2, 'Segundo', 'primaria', 28, 2023),
(3, 'Tercero', 'primaria', 25, 2023),
(4, 'Cuarto', 'primaria', 27, 2023),
(5, 'Quinto', 'primaria', 29, 2023),
(6, 'Sexto', 'secundaria', 32, 2023),
(7, 'Séptimo', 'secundaria', 31, 2023),
(8, 'Octavo', 'secundaria', 30, 2023),
(9, 'Noveno', 'secundaria', 28, 2023),
(10, 'Décimo', 'media', 26, 2023),
(11, 'Once', 'media', 24, 2023),
(12, 'SENA', 'superior', 22, 2024),
(101, 'Primero', 'primaria', 30, 2024),
(102, 'Primero', 'primaria', 28, 2024),
(201, 'Segundo', 'primaria', 25, 2024),
(202, 'Segundo', 'primaria', 27, 2024),
(301, 'Tercero', 'primaria', 29, 2024),
(302, 'Tercero', 'primaria', 32, 2024),
(401, 'Cuarto', 'secundaria', 31, 2024),
(402, 'Cuarto', 'secundaria', 30, 2024),
(501, 'Quinto', 'secundaria', 28, 2024),
(502, 'Quinto', 'secundaria', 26, 2024),
(601, 'Sexto', 'media', 24, 2024),
(602, 'Sexto', 'media', 23, 2024),
(701, 'Séptimo', 'media', 30, 2024),
(702, 'Séptimo', 'media', 28, 2024),
(801, 'Octavo', 'media', 25, 2024),
(802, 'Octavo', 'media', 27, 2024),
(901, 'Noveno', 'media', 29, 2024),
(902, 'Noveno', 'media', 32, 2024),
(1001, 'Décimo', 'media', 31, 2024),
(1002, 'Décimo', 'media', 30, 2024),
(1101, 'Once', 'media', 28, 2024),
(1102, 'Once', 'media', 22, 2024),
(290720, 'SENA', 'superior', 22, 2024);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE `menu` (
  `IdMenu` int(11) NOT NULL,
  `IdProteina` int(11) NOT NULL,
  `IdCarbohidrato` int(11) NOT NULL,
  `IdLacteo` int(11) NOT NULL,
  `IdFruta` int(11) NOT NULL,
  `IdVerdura` int(11) NOT NULL,
  `IdLegumbre` int(11) NOT NULL,
  `IdBebida` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`IdMenu`, `IdProteina`, `IdCarbohidrato`, `IdLacteo`, `IdFruta`, `IdVerdura`, `IdLegumbre`, `IdBebida`, `Fecha`, `Descripcion`) VALUES
(1, 50, 53, 56, 59, 62, 65, 68, '2024-10-20', 'Pollo con arroz, leche, manzana, zanahorias, lentejas y agua embotellada.'),
(2, 51, 54, 57, 60, 63, 66, 69, '2024-10-21', 'Carne de res con pasta, queso, bananas, papas, frijoles y jugo de naranja.'),
(3, 52, 53, 58, 61, 64, 67, 70, '2024-10-22', 'Pescado con arroz, yogur, peras, espinacas, garbanzos y refrescos.'),
(4, 50, 54, 56, 60, 62, 66, 68, '2024-10-23', 'Pollo con pasta, leche, bananas, zanahorias, frijoles y agua embotellada.'),
(5, 51, 55, 57, 59, 63, 65, 69, '2024-10-24', 'Carne de res con pan, queso, manzanas, papas, lentejas y jugo de naranja.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `nDocumento` int(11) NOT NULL,
  `Nombres` varchar(100) NOT NULL,
  `Apellidos` varchar(100) NOT NULL,
  `correoElectronico` varchar(100) NOT NULL,
  `Rol` enum('Administrador','Docente','PersonalDeCocina','Inactivo') NOT NULL DEFAULT 'Inactivo',
  `tipoDocumento` varchar(3) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`nDocumento`, `Nombres`, `Apellidos`, `correoElectronico`, `Rol`, `tipoDocumento`, `Contraseña`, `activo`) VALUES
(123456789, 'mateo', 'lopez', 'mateo@gmai.com', 'Inactivo', 'CC', '$2b$10$6ztGmwbRuNQ1Q4ymceBg9OvzWv2e2UfAt4uho.uS./lulL2bdewUu', 1),
(2147483647, 'Ingrid', 'Roa', 'Ingrid@gmail.com', 'Administrador', 'CC', '$2b$10$0lc8cChpV52IRDU9mc5XdeJCavCitO7CEachNinCfeQj8SoNfdWxq', 1);

-- --------------------------------------------------------

--
-- Estructura para la vista `cronograma`
--
DROP TABLE IF EXISTS `cronograma`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `cronograma`  AS SELECT `m`.`Fecha` AS `Fecha`, `p`.`nombreAlimento` AS `Proteina`, `c`.`nombreAlimento` AS `Carbohidrato`, `l`.`nombreAlimento` AS `Lacteo`, `f`.`nombreAlimento` AS `Fruta`, `v`.`nombreAlimento` AS `Verdura`, `leg`.`nombreAlimento` AS `Legumbre`, `b`.`nombreAlimento` AS `Bebida` FROM (((((((`menu` `m` join `alimento` `p` on(`m`.`IdProteina` = `p`.`IdAlimento`)) join `alimento` `c` on(`m`.`IdCarbohidrato` = `c`.`IdAlimento`)) join `alimento` `l` on(`m`.`IdLacteo` = `l`.`IdAlimento`)) join `alimento` `f` on(`m`.`IdFruta` = `f`.`IdAlimento`)) join `alimento` `v` on(`m`.`IdVerdura` = `v`.`IdAlimento`)) join `alimento` `leg` on(`m`.`IdLegumbre` = `leg`.`IdAlimento`)) join `alimento` `b` on(`m`.`IdBebida` = `b`.`IdAlimento`)) ORDER BY `m`.`Fecha` ASC ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alimento`
--
ALTER TABLE `alimento`
  ADD PRIMARY KEY (`IdAlimento`),
  ADD UNIQUE KEY `nombreAlimento` (`nombreAlimento`),
  ADD KEY `IdCategoriaF` (`IdCategoria`);

--
-- Indices de la tabla `asignacion_alimenticia`
--
ALTER TABLE `asignacion_alimenticia`
  ADD PRIMARY KEY (`IdAsignaciónAlimenticia`),
  ADD KEY `IdGrupo` (`IdGrupo`),
  ADD KEY `IdCategoriaFK` (`IdCategoria`);

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD PRIMARY KEY (`IdAsistencia`),
  ADD KEY `IdGrupoFK` (`IdGrupo`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`IdCategoria`);

--
-- Indices de la tabla `desperdicios`
--
ALTER TABLE `desperdicios`
  ADD PRIMARY KEY (`IdDesperdicio`),
  ADD KEY `FK_IdMenu` (`IdMenu`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`IdGrupo`);

--
-- Indices de la tabla `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`IdMenu`),
  ADD KEY `fk_Menu_Proteina` (`IdProteina`),
  ADD KEY `fk_Menu_Carbohidrato` (`IdCarbohidrato`),
  ADD KEY `fk_Menu_Lacteo` (`IdLacteo`),
  ADD KEY `fk_Menu_Fruta` (`IdFruta`),
  ADD KEY `fk_Menu_Verdura` (`IdVerdura`),
  ADD KEY `fk_Menu_Legumbre` (`IdLegumbre`),
  ADD KEY `fk_Menu_Bebida` (`IdBebida`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`nDocumento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alimento`
--
ALTER TABLE `alimento`
  MODIFY `IdAlimento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT de la tabla `asignacion_alimenticia`
--
ALTER TABLE `asignacion_alimenticia`
  MODIFY `IdAsignaciónAlimenticia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  MODIFY `IdAsistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `IdCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `desperdicios`
--
ALTER TABLE `desperdicios`
  MODIFY `IdDesperdicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `IdGrupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=290721;

--
-- AUTO_INCREMENT de la tabla `menu`
--
ALTER TABLE `menu`
  MODIFY `IdMenu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `nDocumento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alimento`
--
ALTER TABLE `alimento`
  ADD CONSTRAINT `FK_Alimento_Categoria` FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`IdCategoria`) ON DELETE CASCADE;

--
-- Filtros para la tabla `asignacion_alimenticia`
--
ALTER TABLE `asignacion_alimenticia`
  ADD CONSTRAINT `FK_Asignacion_Categoria` FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`IdCategoria`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Asignacion_Grupo` FOREIGN KEY (`IdGrupo`) REFERENCES `grupo` (`IdGrupo`) ON DELETE CASCADE;

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `FK_Asistencia_Grupo` FOREIGN KEY (`IdGrupo`) REFERENCES `grupo` (`IdGrupo`) ON DELETE CASCADE;

--
-- Filtros para la tabla `desperdicios`
--
ALTER TABLE `desperdicios`
  ADD CONSTRAINT `FK_Desperdicios_Menu` FOREIGN KEY (`IdMenu`) REFERENCES `menu` (`IdMenu`) ON DELETE CASCADE;

--
-- Filtros para la tabla `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `fk_Menu_Bebida` FOREIGN KEY (`IdBebida`) REFERENCES `alimento` (`IdAlimento`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_Menu_Carbohidrato` FOREIGN KEY (`IdCarbohidrato`) REFERENCES `alimento` (`IdAlimento`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_Menu_Fruta` FOREIGN KEY (`IdFruta`) REFERENCES `alimento` (`IdAlimento`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_Menu_Lacteo` FOREIGN KEY (`IdLacteo`) REFERENCES `alimento` (`IdAlimento`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_Menu_Legumbre` FOREIGN KEY (`IdLegumbre`) REFERENCES `alimento` (`IdAlimento`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_Menu_Proteina` FOREIGN KEY (`IdProteina`) REFERENCES `alimento` (`IdAlimento`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_Menu_Verdura` FOREIGN KEY (`IdVerdura`) REFERENCES `alimento` (`IdAlimento`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
