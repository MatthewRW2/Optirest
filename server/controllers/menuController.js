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

// Controlador para crear un nuevo menú
const createMenu = async (req, res) => {
    const { IdProteina, IdCarbohidrato, IdLacteo, IdFruta, IdVerdura, IdLegumbre, IdBebida, Fecha, Descripcion } = req.body;

    try {
        // Consulta para insertar el nuevo menú
        const query = `
            INSERT INTO menu (IdProteina, IdCarbohidrato, IdLacteo, IdFruta, IdVerdura, IdLegumbre, IdBebida, Fecha, Descripcion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Ejecutar la consulta
        db.query(query, [IdProteina, IdCarbohidrato, IdLacteo, IdFruta, IdVerdura, IdLegumbre, IdBebida, Fecha, Descripcion], (error, results) => {
            if (error) {
                console.error('Error al crear el menú:', error.sqlMessage);  // Mostrar mensaje SQL específico
                return res.status(500).json({ message: 'Error al crear el menú', error: error.sqlMessage });
            }
            res.status(201).json({ message: 'Menú creado exitosamente', menuId: results.insertId });
        });
        
    } catch (error) {
        console.error('Error al crear el menú:', error);
        res.status(500).json({ message: 'Error al crear el menú' });
    }
};

module.exports = {
    getMenuStatistics,
    createMenu
};