const db = require('../config/db');

// Controlador para insertar desperdicio
const desperdicio = (req, res) => {
    const { Fecha, cantidad, IdMenu, descripcion } = req.body;
    const query = "INSERT INTO `desperdicios`(`Fecha`, `cantidad`, `descripcion`, `IdMenu`) VALUES (?, ?, ?, ?)";
    
    db.query(query, [Fecha, cantidad, descripcion, IdMenu], (err, result) => {
        if (err) {
            console.error("Error al insertar el desperdicio:", err);
            return res.status(500).json({ message: "Error al insertar el desperdicio" });
        }
        res.status(201).json({ message: "Desperdicio insertado exitosamente", result });
    });
};

// Controlador para obtener los menús
const obtenerMenus = (req, res) => {
    const query = "SELECT IdMenu FROM menu";
    
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener los menús:", err);
            return res.status(500).json({ message: "Error al obtener los menús" });
        }
        res.status(200).json(results);
    });
};

// Controlador para obtener los desperdicios
const getDesperdicios = (req, res) => {
    const query = 'SELECT IdDesperdicio, Fecha, cantidad, descripcion, IdMenu FROM desperdicios';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener desperdicios:', err);
            return res.status(500).json({ message: 'Error al obtener desperdicios' });
        }
        res.status(200).json(results);
    });
};

// Exportar todos los controladores
module.exports = {
    desperdicio,
    obtenerMenus,
    getDesperdicios
};
