  -- phpMyAdmin SQL Dump
  -- version 5.2.1
  -- https://www.phpmyadmin.net/
  --
  -- Servidor: 127.0.0.1
  -- Tiempo de generación: 16-09-2024 a las 18:44:17
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
  `IdAlimento` int(11) NOT NULL AUTO_INCREMENT,
  `IdCategoria` int(11) NOT NULL,
  `nombreAlimento` varchar(100) NOT NULL,
  `cantidadDisponible` varchar(20) NOT NULL,
  `cantidadMinima` varchar(20) NOT NULL,
  PRIMARY KEY (`IdAlimento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


  --
  -- Volcado de datos para la tabla `alimento`
  --

  INSERT INTO `alimento` (`IdAlimento`, `IdCategoria`, `nombreAlimento`, `cantidadDisponible`, `cantidadMinima`) VALUES
  (1, 1, 'Carne', '50', '10'),
  (2, 1, 'Pollo', '60', '15'),
  (3, 2, 'Arroz', '100', '20'),
  (4, 2, 'Frijoles', '80', '20'),
  (5, 3, 'Manzana', '150', '30');

  -- --------------------------------------------------------

  --
  -- Estructura de tabla para la tabla `asignacion_alimenticia`
  --

  CREATE TABLE `asignacion_alimenticia` (
    `IdAsignaciónAlimenticia` int(11) NOT NULL,
    `IdNivelAcademico` int(11) NOT NULL,
    `IdCategoria` int(11) NOT NULL,
    `cantidadAlimento` int(11) NOT NULL,
    `unidadMedida` enum('Gramos(g)','Unidad','Mililitro(ml)') NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  -- --------------------------------------------------------

  --
  -- Estructura de tabla para la tabla `asistencia`
  --

  CREATE TABLE `asistencia` (
    `IdAsistencia` varchar(11) NOT NULL,
    `fechaAsistencia` datetime NOT NULL,
    `cantidadAsistencia` int(11) NOT NULL,
    `IdDetalleCronograma` int(11) NOT NULL,
    `nDocumento` int(11) NOT NULL,
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
  -- Estructura de tabla para la tabla `cronograma`
  --

  CREATE TABLE `cronograma` (
    `IdCronograma` int(11) NOT NULL,
    `fechaInicio` date NOT NULL,
    `fechaFin` date NOT NULL,
    `Observación` varchar(500) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  -- --------------------------------------------------------

  --
  -- Estructura de tabla para la tabla `detalle_cronograma`
  --

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

  --
  -- Estructura de tabla para la tabla `detalle_entrada`
  --

  CREATE TABLE `detalle_entrada` (
    `IdAlimento` int(11) NOT NULL,
    `IdEntradaAlimentos` int(11) NOT NULL,
    `cantidadEntrada` varchar(20) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  -- --------------------------------------------------------

  --
  -- Estructura de tabla para la tabla `detalle_menu`
  --

  CREATE TABLE `detalle_menu` (
    `IdDetalleMenu` int(11) NOT NULL,
    `IdMenu` int(11) NOT NULL,
    `IdAlimento` int(11) NOT NULL,
    `cantidad` varchar(20) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  -- --------------------------------------------------------

  --
  -- Estructura de tabla para la tabla `detalle_salida`
  --

  CREATE TABLE `detalle_salida` (
    `IdAlimento` int(11) NOT NULL,
    `IdSalidaAlimentos` int(11) NOT NULL,
    `cantidadSalida` varchar(20) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  -- --------------------------------------------------------

  --
  -- Estructura de tabla para la tabla `entrada_alimentos`
  --

  CREATE TABLE `entrada_alimentos` (
    `IdEntradaAlimentos` int(11) NOT NULL,
    `fechaEntrada` date NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  -- --------------------------------------------------------

  --
  -- Estructura de tabla para la tabla `grupo`
  --

  CREATE TABLE `grupo` (
    `IdGrupo` int(11) NOT NULL,
    `Grado` char(10) NOT NULL,
    `IdNivelAcademico` int(11) NOT NULL,
    `cantidadEstudiantes` int(3) NOT NULL,
    `vigenciaAño` int(4) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  -- --------------------------------------------------------

  --
  -- Estructura de tabla para la tabla `menu`
  --

  CREATE TABLE `menu` (
    `IdMenu` int(11) NOT NULL,
    `Almuezo` tinyint(1) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  -- --------------------------------------------------------

  --
  -- Estructura de tabla para la tabla `nivel_academico`
  --

  CREATE TABLE `nivel_academico` (
    `IdNivelAcademico` int(11) NOT NULL,
    `Nombre` varchar(35) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  -- --------------------------------------------------------

  --
  -- Estructura de tabla para la tabla `salida_alimentos`
  --

  CREATE TABLE `salida_alimentos` (
    `IdSalidaAlimentos` int(11) NOT NULL,
    `FechaSalida` date NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
    `Contraseña` varchar(255) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  --
  -- Índices para tablas volcadas
  --

  --
  -- Indices de la tabla `alimento`
  --
  ALTER TABLE `alimento`
    ADD PRIMARY KEY (`IdAlimento`),
    ADD KEY `IdCategoriaF` (`IdCategoria`);

  --
  -- Indices de la tabla `asignacion_alimenticia`
  --
  ALTER TABLE `asignacion_alimenticia`
    ADD PRIMARY KEY (`IdAsignaciónAlimenticia`),
    ADD KEY `IdNivelAcademico` (`IdNivelAcademico`),
    ADD KEY `IdCategoriaFK` (`IdCategoria`);

  --
  -- Indices de la tabla `asistencia`
  --
  ALTER TABLE `asistencia`
    ADD PRIMARY KEY (`IdAsistencia`),
    ADD KEY `IdDetalleCronogramaFK` (`IdDetalleCronograma`),
    ADD KEY `nDocumentoFK` (`nDocumento`),
    ADD KEY `IdGrupoFK` (`IdGrupo`);

  --
  -- Indices de la tabla `categoria`
  --
  ALTER TABLE `categoria`
    ADD PRIMARY KEY (`IdCategoria`);

  --
  -- Indices de la tabla `cronograma`
  --
  ALTER TABLE `cronograma`
    ADD PRIMARY KEY (`IdCronograma`);

  --
  -- Indices de la tabla `detalle_cronograma`
  --
  ALTER TABLE `detalle_cronograma`
    ADD PRIMARY KEY (`IdDetalleCronograma`),
    ADD KEY `IdCronogramaFK` (`IdCronograma`),
    ADD KEY `IdMenuFK` (`IdMenu`);

  --
  -- Indices de la tabla `detalle_entrada`
  --
  ALTER TABLE `detalle_entrada`
    ADD KEY `IdAlimento_FK` (`IdAlimento`),
    ADD KEY `IdEntradaAlimentosFK` (`IdEntradaAlimentos`);

  --
  -- Indices de la tabla `detalle_menu`
  --
  ALTER TABLE `detalle_menu`
    ADD PRIMARY KEY (`IdDetalleMenu`),
    ADD KEY `IdMenuF` (`IdMenu`),
    ADD KEY `IdAlimentoF` (`IdAlimento`);

  --
  -- Indices de la tabla `detalle_salida`
  --
  ALTER TABLE `detalle_salida`
    ADD KEY `IdAlimentoFK` (`IdAlimento`),
    ADD KEY `IdSalidaAlimentosFK` (`IdSalidaAlimentos`);

  --
  -- Indices de la tabla `entrada_alimentos`
  --
  ALTER TABLE `entrada_alimentos`
    ADD PRIMARY KEY (`IdEntradaAlimentos`);

  --
  -- Indices de la tabla `grupo`
  --
  ALTER TABLE `grupo`
    ADD PRIMARY KEY (`IdGrupo`),
    ADD KEY `IdNivelAcademicoFK` (`IdNivelAcademico`);

  --
  -- Indices de la tabla `menu`
  --
  ALTER TABLE `menu`
    ADD PRIMARY KEY (`IdMenu`);

  --
  -- Indices de la tabla `nivel_academico`
  --
  ALTER TABLE `nivel_academico`
    ADD PRIMARY KEY (`IdNivelAcademico`);

  --
  -- Indices de la tabla `salida_alimentos`
  --
  ALTER TABLE `salida_alimentos`
    ADD PRIMARY KEY (`IdSalidaAlimentos`);

  --
  -- Indices de la tabla `usuario`
  --
  ALTER TABLE `usuario`
    ADD PRIMARY KEY (`nDocumento`);

  --
  -- Restricciones para tablas volcadas
  --

  --
  -- Filtros para la tabla `alimento`
  --
  ALTER TABLE `alimento`
    ADD CONSTRAINT `IdCategoriaF` FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`IdCategoria`);

  --
  -- Filtros para la tabla `asignacion_alimenticia`
  --
  ALTER TABLE `asignacion_alimenticia`
    ADD CONSTRAINT `IdCategoriaFK` FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`IdCategoria`),
    ADD CONSTRAINT `IdNivelAcademico` FOREIGN KEY (`IdNivelAcademico`) REFERENCES `nivel_academico` (`IdNivelAcademico`);

  --
  -- Filtros para la tabla `asistencia`
  --
  ALTER TABLE `asistencia`
    ADD CONSTRAINT `IdDetalleCronogramaFK` FOREIGN KEY (`IdDetalleCronograma`) REFERENCES `detalle_cronograma` (`IdDetalleCronograma`),
    ADD CONSTRAINT `IdGrupoFK` FOREIGN KEY (`IdGrupo`) REFERENCES `grupo` (`IdGrupo`),
    ADD CONSTRAINT `nDocumentoFK` FOREIGN KEY (`nDocumento`) REFERENCES `usuario` (`nDocumento`);

  --
  -- Filtros para la tabla `detalle_cronograma`
  --
  ALTER TABLE `detalle_cronograma`
    ADD CONSTRAINT `IdCronogramaFK` FOREIGN KEY (`IdCronograma`) REFERENCES `cronograma` (`IdCronograma`),
    ADD CONSTRAINT `IdMenuFK` FOREIGN KEY (`IdMenu`) REFERENCES `menu` (`IdMenu`);

  --
  -- Filtros para la tabla `detalle_entrada`
  --
  ALTER TABLE `detalle_entrada`
    ADD CONSTRAINT `IdAlimento_FK` FOREIGN KEY (`IdAlimento`) REFERENCES `alimento` (`IdAlimento`),
    ADD CONSTRAINT `IdEntradaAlimentosFK` FOREIGN KEY (`IdEntradaAlimentos`) REFERENCES `entrada_alimentos` (`IdEntradaAlimentos`);

  --
  -- Filtros para la tabla `detalle_menu`
  --
  ALTER TABLE `detalle_menu`
    ADD CONSTRAINT `IdAlimentoF` FOREIGN KEY (`IdAlimento`) REFERENCES `alimento` (`IdAlimento`),
    ADD CONSTRAINT `IdMenuF` FOREIGN KEY (`IdMenu`) REFERENCES `menu` (`IdMenu`);

  --
  -- Filtros para la tabla `detalle_salida`
  --
  ALTER TABLE `detalle_salida`
    ADD CONSTRAINT `IdAlimentoFK` FOREIGN KEY (`IdAlimento`) REFERENCES `alimento` (`IdAlimento`),
    ADD CONSTRAINT `IdSalidaAlimentosFK` FOREIGN KEY (`IdSalidaAlimentos`) REFERENCES `salida_alimentos` (`IdSalidaAlimentos`);

  --
  -- Filtros para la tabla `grupo`
  --
  ALTER TABLE `grupo`
    ADD CONSTRAINT `IdNivelAcademicoFK` FOREIGN KEY (`IdNivelAcademico`) REFERENCES `nivel_academico` (`IdNivelAcademico`);
  COMMIT;

  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
