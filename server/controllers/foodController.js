const db = require('../config/db');

exports.getAllFoods = (req, res) => {
    const query = "SELECT IdAlimento, IdCategoria, nombreAlimento, cantidadDisponible, cantidadMinima FROM alimento";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send("Error al obtener alimentos");
        } else {
            res.json(result);
        }
    });
};

exports.getCategories = (req, res) => {
    const query = "SELECT IdCategoria, nombreCategoria FROM categoria";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send("Error al obtener categorías");
        } else {
            res.json(result);
        }
    });
};

exports.getStatistics = (req, res) => {
    const query = `
        SELECT categoria.nombreCategoria, COUNT(alimento.IdAlimento) AS cantidadAlimentos
        FROM alimento
        JOIN categoria ON alimento.IdCategoria = categoria.IdCategoria
        GROUP BY categoria.nombreCategoria
    `;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send("Error al obtener estadísticas");
        } else {
            res.json(result);
        }
    });
};
