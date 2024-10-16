const db = require('../config/db');

exports.cronograma = (req, res) => {
    const query = "SELECT `IdCronograma`,`fechaInicio`,`fechaFin`,`Observación` FROM cronograma; VALUES (?, ?, ?, ?)";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send("Error al insertar el desperdicio ");
        } else {
            res.json(result);
        }
    });
};