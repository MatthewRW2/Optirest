const db = require('../config/db');

exports.obtenerVistaAsistenciasYCronograma = (req, res) => {
    const { fecha } = req.query; 
    let query = `SELECT * FROM VistaAsistenciasYCronograma`;
    const params = [];

    if (fecha) {
        query += ` WHERE fecha_asistencia = ? OR fecha_cronograma = ?`;
        params.push(fecha, fecha);
    }

    db.query(query, params, (err, results) => {
        if (err) {
            console.error("Error al obtener datos de la vista:", err);
            return res.status(500).send("Error al obtener los datos.");
        }
        res.json(results);
    });
};
