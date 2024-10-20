const db = require('../config/db');

exports.almuerzos = (req, res) => {
    const { fecha } = req.query;  // Obtener la fecha desde el parámetro de la solicitud
    if (!fecha) {
        return res.status(400).send("Debe proporcionar una fecha");
    }

    const query = `
        SELECT fechaAsistencia, SUM(cantidadAsistencia) AS totalAsistencia
        FROM asistencia
        WHERE fechaAsistencia = ?
        GROUP BY fechaAsistencia;
    `;

    db.query(query, [fecha], (err, result) => {
        if (err) {
            return res.status(500).send("Error al obtener la asistencia");
        } else if (result.length === 0) {
            return res.status(404).send("No se encontraron registros para esa fecha");
        } else {
            res.json(result);
        }
    });
};
