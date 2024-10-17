const db = require('../config/db');

exports.desperdicio = (req, res) => {
    const { Fecha, cantidad, IdMenu, descripcion } = req.body;
    const query = "INSERT INTO `desperdicios`(`Fecha`, `cantidad`, `descripcion`, `IdMenu`) VALUES (?, ?, ?, ?)";
    db.query(query, [Fecha, cantidad, descripcion, IdMenu], (err, result) => {
        if (err) {
            return res.status(500).send("Error al insertar el desperdicio");
        } else {
            res.json(result);
        }
    });    
};

// En tu archivo de rutas o controlador

exports.obtenerMenus = (req, res) => {
    const query = "SELECT IdMenu FROM menu"; // Ajusta según tus necesidades (puedes seleccionar otros campos también)

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send("Error al obtener los menús: " + err.message);
        }
        res.json(results);
    });
};
