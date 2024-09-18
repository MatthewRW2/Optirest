const db = require('../config/db');

exports.cronograma = (req, res) => {
    const query = "SELECT `IdCronograma`,`fechaInicio`,`fechaFin`,`Observación` FROM cronograma;";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send("Error al obtener el cronograma");
        } else {
            res.json(result);
        }
    });
};