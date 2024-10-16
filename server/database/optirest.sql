-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-10-2024 a las 23:51:10
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

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `ActualizarUsuario` (IN `p_nDocumento` INT(11), IN `p_Nombres` VARCHAR(100), IN `p_Apellidos` VARCHAR(100), IN `p_correoElectronico` VARCHAR(100), IN `p_Rol` ENUM('Administrador','Docente','PersonalDeCocina','Inactivo'), IN `p_tipoDocumento` VARCHAR(3), IN `p_Contraseña` VARCHAR(255))   BEGIN
    UPDATE Usuario
    SET 
        Nombres = p_Nombres,
        Apellidos = p_Apellidos,
        correoElectronico = p_correoElectronico,
        Rol = p_Rol,
        tipoDocumento = p_tipoDocumento,
        Contraseña = p_Contraseña
    WHERE nDocumento = p_nDocumento;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultarFechasCronograma` ()   BEGIN
    SELECT IdCronograma, fechaInicio, fechaFin
    FROM Cronograma;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultarMenusAlmuerzo` ()   BEGIN 
    SELECT IdMenu, Almuezo  
    FROM Menu  
    WHERE Almuezo = 1; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultarUsuario` (IN `p_nDocumento` INT(11))   BEGIN
    SELECT 
        nDocumento,
        Nombres,
        Apellidos,
        correoElectronico,
        Rol,
        tipoDocumento,
        Contraseña
    FROM Usuario
    WHERE nDocumento = p_nDocumento;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Consultar_Grupos_Por_Nivel` (IN `p_IdNivelAcademico` INT(11))   BEGIN 
    SELECT  
        g.IdGrupo, 
        g.Grado, 
        g.cantidadEstudiantes, 
        g.vigenciaAño 
    FROM  
        Grupo g 
    WHERE  
        g.IdNivelAcademico = p_IdNivelAcademico; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Consultar_Salida_Alimentos` (IN `p_FechaSalida` DATE)   BEGIN 
    SELECT 
        sa.IdSalidaAlimentos, 
        sa.FechaSalida, 
        ds.cantidadSalida, 
        a.nombreAlimento 
    FROM 
        Salida_Alimentos sa 
    JOIN 
        Detalle_Salida ds ON sa.IdSalidaAlimentos = ds.IdSalidaAlimentos 
    JOIN 
        Alimento a ON ds.IdAlimento = a.IdAlimento 
    WHERE 
        sa.FechaSalida = p_FechaSalida; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarCategoria` (IN `IdCategoria` INT, IN `nombreCategoria` VARCHAR(35))   BEGIN
    INSERT INTO Categoria(IdCategoria, nombreCategoria)
    VALUES (IdCategoria, nombreCategoria);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarMenu` (IN `p_almuezo` BIT)   BEGIN 
    DECLARE p_id INT; 
    -- Se asigna un nuevo ID basado en el máximo actual 
    SET p_id = (SELECT COALESCE(MAX(IdMenu), 0) + 1 FROM Menu); 
    -- Se realiza la inserción 
    INSERT INTO Menu (IdMenu, Almuezo) VALUES (p_id, p_almuezo); 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarUsuario` (IN `nDocumento` INT(11), IN `Nombres` VARCHAR(100), IN `Apellidos` VARCHAR(100), IN `correoElectronico` VARCHAR(100), IN `tipoDocumento` VARCHAR(3), IN `Contraseña` VARCHAR(255))   BEGIN
    INSERT INTO Usuario (nDocumento, Nombres, Apellidos, correoElectronico, tipoDocumento, Contraseña)
    VALUES (nDocumento, Nombres, Apellidos, correoElectronico, tipoDocumento, Contraseña);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Insertar_Grupo` (IN `p_Grado` CHAR(10), IN `p_IdNivelAcademico` INT(11), IN `p_cantidadEstudiantes` INT, IN `p_vigenciaAño` INT(4))   BEGIN 
    INSERT INTO Grupo (Grado, IdNivelAcademico, cantidadEstudiantes, vigenciaAño) 
    VALUES (p_Grado, p_IdNivelAcademico, p_cantidadEstudiantes, p_vigenciaAño); 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Insertar_Salida_Alimentos` (IN `p_FechaSalida` DATE)   BEGIN 
    INSERT INTO Salida_Alimentos (FechaSalida) 
    VALUES (p_FechaSalida); 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registrar_entrada_alimento` (IN `p_IdAlimento` INT, IN `p_fechaEntrada` DATE, IN `p_cantidadEntrada` INT)   BEGIN
    INSERT INTO entrada_alimentos (IdEntradaAlimentos, fechaEntrada)
    VALUES (p_IdAlimento, p_fechaEntrada);
    
    UPDATE alimentos
    SET cantidadDisponible = cantidadDisponible + p_cantidadEntrada
    WHERE IdAlimento = p_IdAlimento;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alimento`
--

CREATE TABLE `alimento` (
  `IdAlimento` int(11) NOT NULL,
  `IdCategoria` int(11) NOT NULL,
  `nombreAlimento` varchar(100) NOT NULL,
  `cantidadDisponible` varchar(20) NOT NULL,
  `cantidadMinima` varchar(20) NOT NULL
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

--
-- Volcado de datos para la tabla `asignacion_alimenticia`
--

INSERT INTO `asignacion_alimenticia` (`IdAsignaciónAlimenticia`, `IdNivelAcademico`, `IdCategoria`, `cantidadAlimento`, `unidadMedida`) VALUES
(1, 3, 1, 25, 'Gramos(g)'),
(2, 1, 2, 25, 'Gramos(g)'),
(3, 2, 3, 25, 'Gramos(g)'),
(4, 2, 4, 25, 'Gramos(g)'),
(5, 4, 5, 25, 'Gramos(g)');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `IdAsistencia` int(11) NOT NULL,
  `fechaAsistencia` datetime NOT NULL,
  `cantidadAsistencia` int(11) NOT NULL,
  `IdDetalleCronograma` int(11) NOT NULL,
  `nDocumento` int(11) NOT NULL,
  `IdGrupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asistencia`
--

INSERT INTO `asistencia` (`IdAsistencia`, `fechaAsistencia`, `cantidadAsistencia`, `IdDetalleCronograma`, `nDocumento`, `IdGrupo`) VALUES
(1, '2024-09-01 00:00:00', 25, 1, 87654321, 1),
(2, '2024-09-01 00:00:00', 22, 1, 23456789, 2),
(3, '2024-09-01 00:00:00', 27, 1, 87654321, 3),
(4, '2024-09-01 00:00:00', 20, 1, 23456789, 4),
(5, '2024-09-01 00:00:00', 22, 1, 87654321, 5);

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

--
-- Volcado de datos para la tabla `cronograma`
--

INSERT INTO `cronograma` (`IdCronograma`, `fechaInicio`, `fechaFin`, `Observación`) VALUES
(1, '2024-09-01', '2024-09-15', 'Inicio de clases y entraga de almuerzos'),
(2, '2024-09-16', '2024-09-30', 'Cancelacion de clases'),
(3, '2024-10-01', '2024-10-10', 'Semana de actividades culturales'),
(4, '2024-10-11', '2024-10-20', 'Receso escolar '),
(5, '2024-10-21', '2024-10-31', 'Cierre del periodo');

--
-- Disparadores `cronograma`
--
DELIMITER $$
CREATE TRIGGER `validacion_fechas` BEFORE INSERT ON `cronograma` FOR EACH ROW BEGIN
    IF NEW.fechaFin < NEW.fechaInicio THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La fecha de fin no puede ser anterior a la fecha de inicio.';
    END IF;
END
$$
DELIMITER ;

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

--
-- Volcado de datos para la tabla `detalle_cronograma`
--

INSERT INTO `detalle_cronograma` (`IdDetalleCronograma`, `IdCronograma`, `IdMenu`, `Fecha`, `Dia`, `pesoDesperdicio`, `cantidadConsumida`) VALUES
(1, 1, 1, '2024-09-10', 0, '0.5', '100'),
(2, 2, 2, '2024-09-11', 0, '0.4', '120'),
(3, 3, 3, '2024-09-12', 0, '0.6', '110'),
(4, 4, 4, '2024-09-13', 0, '0.7', '130'),
(5, 5, 5, '2024-09-14', 0, '0.3', '140');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_entrada`
--

CREATE TABLE `detalle_entrada` (
  `IdAlimento` int(11) NOT NULL,
  `IdEntradaAlimentos` int(11) NOT NULL,
  `cantidadEntrada` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_entrada`
--

INSERT INTO `detalle_entrada` (`IdAlimento`, `IdEntradaAlimentos`, `cantidadEntrada`) VALUES
(1, 5, '30000 g'),
(2, 2, '5000 g'),
(3, 3, '5000 ml'),
(4, 4, '20000 g'),
(5, 1, '100000 g');

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

--
-- Volcado de datos para la tabla `detalle_menu`
--

INSERT INTO `detalle_menu` (`IdDetalleMenu`, `IdMenu`, `IdAlimento`, `cantidad`) VALUES
(1, 1, 1, '200g'),
(2, 3, 2, '150g'),
(3, 4, 3, '250g'),
(4, 5, 4, '300g'),
(5, 3, 1, '180g');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_salida`
--

CREATE TABLE `detalle_salida` (
  `IdAlimento` int(11) NOT NULL,
  `IdSalidaAlimentos` int(11) NOT NULL,
  `cantidadSalida` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_salida`
--

INSERT INTO `detalle_salida` (`IdAlimento`, `IdSalidaAlimentos`, `cantidadSalida`) VALUES
(1, 1, '2500g'),
(2, 2, '2500ml'),
(3, 3, '1200ml'),
(4, 4, '500g'),
(5, 5, '1500g');

--
-- Disparadores `detalle_salida`
--
DELIMITER $$
CREATE TRIGGER `Actualizar_Cantidad_After_Salida` AFTER INSERT ON `detalle_salida` FOR EACH ROW BEGIN 
    UPDATE Alimento 
    SET cantidadDisponible = cantidadDisponible - NEW.cantidadSalida 
    WHERE IdAlimento = NEW.IdAlimento; 
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrada_alimentos`
--

CREATE TABLE `entrada_alimentos` (
  `IdEntradaAlimentos` int(11) NOT NULL,
  `fechaEntrada` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entrada_alimentos`
--

INSERT INTO `entrada_alimentos` (`IdEntradaAlimentos`, `fechaEntrada`) VALUES
(1, '2024-09-01'),
(2, '2024-09-02'),
(3, '2024-09-03'),
(4, '2024-09-04'),
(5, '2024-09-05');

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

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`IdGrupo`, `Grado`, `IdNivelAcademico`, `cantidadEstudiantes`, `vigenciaAño`) VALUES
(1, '1A', 1, 30, 2024),
(2, '2B', 1, 25, 2024),
(3, '3C', 2, 28, 2024),
(4, '4D', 2, 32, 2024),
(5, '5E', 3, 29, 2024);

--
-- Disparadores `grupo`
--
DELIMITER $$
CREATE TRIGGER `Registrar_Cambio_CantidadEstudiantes` AFTER UPDATE ON `grupo` FOR EACH ROW BEGIN 
    IF OLD.cantidadEstudiantes != NEW.cantidadEstudiantes THEN 
        INSERT INTO Log_Cambios_Grupo (IdGrupo, fechaCambio, cantidadEstudiantesAnterior, cantidadEstudiantesNueva) 
        VALUES (NEW.IdGrupo, NOW(), OLD.cantidadEstudiantes, NEW.cantidadEstudiantes); 
    END IF; 
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE `menu` (
  `IdMenu` int(11) NOT NULL,
  `Almuezo` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`IdMenu`, `Almuezo`) VALUES
(1, 1),
(2, 0),
(3, 1),
(4, 0),
(5, 1);

--
-- Disparadores `menu`
--
DELIMITER $$
CREATE TRIGGER `TriggerValidarAlmuezo` BEFORE INSERT ON `menu` FOR EACH ROW BEGIN 
    IF NEW.Almuezo NOT IN (0, 1) THEN 
        SIGNAL SQLSTATE '45000'  
        SET MESSAGE_TEXT = 'El valor de Almuezo debe ser 0 o 1'; 
    END IF; 
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel_academico`
--

CREATE TABLE `nivel_academico` (
  `IdNivelAcademico` int(11) NOT NULL,
  `Nombre` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nivel_academico`
--

INSERT INTO `nivel_academico` (`IdNivelAcademico`, `Nombre`) VALUES
(1, 'Primaria'),
(2, 'Secundaria'),
(3, 'Preescolar'),
(4, 'Educación Media');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salida_alimentos`
--

CREATE TABLE `salida_alimentos` (
  `IdSalidaAlimentos` int(11) NOT NULL,
  `FechaSalida` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salida_alimentos`
--

INSERT INTO `salida_alimentos` (`IdSalidaAlimentos`, `FechaSalida`) VALUES
(1, '2024-09-01'),
(2, '2024-09-02'),
(3, '2024-09-03'),
(4, '2024-09-04'),
(5, '2024-09-05');

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
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`nDocumento`, `Nombres`, `Apellidos`, `correoElectronico`, `Rol`, `tipoDocumento`, `Contraseña`) VALUES
(11223344, 'Luis', 'Martínez', 'LM11@gmail.com', 'Inactivo', 'CC', 'hashed_password_789'),
(12345678, 'Juan', 'Pérez', 'JuanPerez@gmail.com', 'Inactivo', 'CC', 'hashed_password_123'),
(23456789, 'María', 'Rodríguez', 'RodriguezM@gmail.com', 'Inactivo', 'CE', 'hashed_password_012'),
(34567890, 'Carlos', 'Fernández', 'FernandezC41@gmail.com', 'Inactivo', 'CC', 'hashed_password_345'),
(87654321, 'Ana', 'Gómez', 'AnaGomez87@gmail.com', 'Inactivo', 'TI', 'hashed_password_456'),
(1024483867, 'Brayan', 'Bernal', 'brayan@gmail.com', 'Inactivo', 'CC', '$2b$10$Ld9AfV.26Z2CY4DVYuYFN.qH9htGpqn1ZmTwqtn9EiEhZh1MIsUVW');

--
-- Disparadores `usuario`
--
DELIMITER $$
CREATE TRIGGER `No_Eliminar_Usuario_Con_Rol_Administrador` BEFORE DELETE ON `usuario` FOR EACH ROW BEGIN
    IF OLD.Rol = 'Administrador' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'No se puede eliminar un usuario con rol de Administrador.';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vistamenu`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vistamenu` (
`IdCronograma` int(11)
,`fechaInicio` date
,`fechaFin` date
,`IdMenu` int(11)
,`Almuezo` tinyint(1)
,`cantidadEnMenu` varchar(20)
,`IdAlimento` int(11)
,`nombreAlimento` varchar(100)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vistamenusalmuerzo`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vistamenusalmuerzo` (
`IdMenu` int(11)
,`Almuezo` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_consumo_alimentos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_consumo_alimentos` (
`nombreAlimento` varchar(100)
,`fechaEntrada` date
,`Dia` int(11)
,`Fecha` date
,`pesoDesperdicio` varchar(20)
,`cantidadConsumida` varchar(20)
,`cantidadDisponible` varchar(20)
,`porcentajeDesperdicio` double(19,2)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_fecha_entrada_alimentos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_fecha_entrada_alimentos` (
`IdEntradaAlimentos` int(11)
,`fechaEntrada` date
,`IdAlimento` int(11)
,`nombreAlimento` varchar(100)
,`cantidadEntrada` varchar(20)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_grupos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_grupos` (
`IdGrupo` int(11)
,`Grado` char(10)
,`NivelAcademico` varchar(35)
,`cantidadEstudiantes` int(3)
,`vigenciaAño` int(4)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_salida_alimentos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_salida_alimentos` (
`IdSalidaAlimentos` int(11)
,`FechaSalida` date
,`cantidadSalida` varchar(20)
,`nombreAlimento` varchar(100)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vistamenu`
--
DROP TABLE IF EXISTS `vistamenu`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistamenu`  AS SELECT `c`.`IdCronograma` AS `IdCronograma`, `c`.`fechaInicio` AS `fechaInicio`, `c`.`fechaFin` AS `fechaFin`, `m`.`IdMenu` AS `IdMenu`, `m`.`Almuezo` AS `Almuezo`, `dm`.`cantidad` AS `cantidadEnMenu`, `a`.`IdAlimento` AS `IdAlimento`, `a`.`nombreAlimento` AS `nombreAlimento` FROM ((((`cronograma` `c` join `detalle_cronograma` `dc` on(`c`.`IdCronograma` = `dc`.`IdCronograma`)) join `menu` `m` on(`dc`.`IdMenu` = `m`.`IdMenu`)) join `detalle_menu` `dm` on(`m`.`IdMenu` = `dm`.`IdMenu`)) join `alimento` `a` on(`dm`.`IdAlimento` = `a`.`IdAlimento`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vistamenusalmuerzo`
--
DROP TABLE IF EXISTS `vistamenusalmuerzo`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistamenusalmuerzo`  AS SELECT `menu`.`IdMenu` AS `IdMenu`, `menu`.`Almuezo` AS `Almuezo` FROM `menu` WHERE `menu`.`Almuezo` = 1 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_consumo_alimentos`
--
DROP TABLE IF EXISTS `vista_consumo_alimentos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_consumo_alimentos`  AS SELECT `a`.`nombreAlimento` AS `nombreAlimento`, `ea`.`fechaEntrada` AS `fechaEntrada`, `dc`.`Dia` AS `Dia`, `dc`.`Fecha` AS `Fecha`, `dc`.`pesoDesperdicio` AS `pesoDesperdicio`, `dc`.`cantidadConsumida` AS `cantidadConsumida`, `a`.`cantidadDisponible` AS `cantidadDisponible`, round(`dc`.`pesoDesperdicio` / `dc`.`cantidadConsumida` * 100,2) AS `porcentajeDesperdicio` FROM ((`alimento` `a` join `detalle_cronograma` `dc` on(`a`.`IdAlimento` = `dc`.`IdMenu`)) join `entrada_alimentos` `ea` on(`ea`.`IdEntradaAlimentos` = `a`.`IdAlimento`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_fecha_entrada_alimentos`
--
DROP TABLE IF EXISTS `vista_fecha_entrada_alimentos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_fecha_entrada_alimentos`  AS SELECT `e`.`IdEntradaAlimentos` AS `IdEntradaAlimentos`, `e`.`fechaEntrada` AS `fechaEntrada`, `a`.`IdAlimento` AS `IdAlimento`, `a`.`nombreAlimento` AS `nombreAlimento`, `d`.`cantidadEntrada` AS `cantidadEntrada` FROM ((`detalle_entrada` `d` join `entrada_alimentos` `e` on(`e`.`IdEntradaAlimentos` = `d`.`IdEntradaAlimentos`)) join `alimento` `a` on(`a`.`IdAlimento` = `d`.`IdAlimento`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_grupos`
--
DROP TABLE IF EXISTS `vista_grupos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_grupos`  AS SELECT `g`.`IdGrupo` AS `IdGrupo`, `g`.`Grado` AS `Grado`, `n`.`Nombre` AS `NivelAcademico`, `g`.`cantidadEstudiantes` AS `cantidadEstudiantes`, `g`.`vigenciaAño` AS `vigenciaAño` FROM (`grupo` `g` join `nivel_academico` `n` on(`g`.`IdNivelAcademico` = `n`.`IdNivelAcademico`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_salida_alimentos`
--
DROP TABLE IF EXISTS `vista_salida_alimentos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_salida_alimentos`  AS SELECT `sa`.`IdSalidaAlimentos` AS `IdSalidaAlimentos`, `sa`.`FechaSalida` AS `FechaSalida`, `ds`.`cantidadSalida` AS `cantidadSalida`, `a`.`nombreAlimento` AS `nombreAlimento` FROM ((`salida_alimentos` `sa` join `detalle_salida` `ds` on(`sa`.`IdSalidaAlimentos` = `ds`.`IdSalidaAlimentos`)) join `alimento` `a` on(`ds`.`IdAlimento` = `a`.`IdAlimento`)) ;

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
-- Indices de la tabla `desperdicios`
--
ALTER TABLE `desperdicios`
  ADD PRIMARY KEY (`IdDesperdicio`),
  ADD KEY `FK_IdMenu` (`IdMenu`);

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
  ADD PRIMARY KEY (`IdAlimento`),
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
  ADD PRIMARY KEY (`IdAlimento`),
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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alimento`
--
ALTER TABLE `alimento`
  MODIFY `IdAlimento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `IdCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `cronograma`
--
ALTER TABLE `cronograma`
  MODIFY `IdCronograma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `desperdicios`
--
ALTER TABLE `desperdicios`
  MODIFY `IdDesperdicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_cronograma`
--
ALTER TABLE `detalle_cronograma`
  MODIFY `IdDetalleCronograma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detalle_entrada`
--
ALTER TABLE `detalle_entrada`
  MODIFY `IdAlimento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detalle_menu`
--
ALTER TABLE `detalle_menu`
  MODIFY `IdDetalleMenu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detalle_salida`
--
ALTER TABLE `detalle_salida`
  MODIFY `IdAlimento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `entrada_alimentos`
--
ALTER TABLE `entrada_alimentos`
  MODIFY `IdEntradaAlimentos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `IdGrupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `menu`
--
ALTER TABLE `menu`
  MODIFY `IdMenu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `nivel_academico`
--
ALTER TABLE `nivel_academico`
  MODIFY `IdNivelAcademico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `salida_alimentos`
--
ALTER TABLE `salida_alimentos`
  MODIFY `IdSalidaAlimentos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- Filtros para la tabla `desperdicios`
--
ALTER TABLE `desperdicios`
  ADD CONSTRAINT `FK_IdMenu` FOREIGN KEY (`IdMenu`) REFERENCES `menu` (`IdMenu`);

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
