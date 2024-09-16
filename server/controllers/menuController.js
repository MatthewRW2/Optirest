const db = require('../config/db');

exports.getMenuDetails = (req, res) => {
    const query = `
        SELECT detalle_menu.IdDetalleMenu, detalle_menu.cantidad, alimento.nombreAlimento
        FROM detalle_menu
        JOIN alimento ON detalle_menu.IdAlimento = alimento.IdAlimento
    `;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send("Error al obtener detalles del menú");
        } else {
            res.json(result);
        }
    });
};
