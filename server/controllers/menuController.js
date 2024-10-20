const db = require('../config/db');

// Controlador para obtener el menú completo
const getMenuStatistics = async (req, res) => {
    try {
        // Cambia la consulta para obtener todos los campos de la tabla menu
        const query = 'SELECT * FROM menu';  
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error al obtener el menú:', error);
                return res.status(500).json({ message: 'Error al obtener el menú' });
            }
            
            // Enviar los resultados en formato JSON
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error al obtener el menú:', error);
        res.status(500).json({ message: 'Error al obtener el menú' });
    }
};

module.exports = {
    getMenuStatistics,
};
