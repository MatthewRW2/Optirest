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

// Insertar un alimento en la tabla 'alimento'
exports.insertFood = (req, res) => {
    const { IdCategoria, nombreAlimento, cantidadDisponible, cantidadMinima } = req.body;
  
    if (!IdCategoria || !nombreAlimento || !cantidadDisponible || !cantidadMinima) {
      return res.status(400).send("Todos los campos son obligatorios");
    }
  
    const query = "INSERT INTO alimento (IdCategoria, nombreAlimento, cantidadDisponible, cantidadMinima) VALUES (?, ?, ?, ?)";
  
    db.query(query, [IdCategoria, nombreAlimento, cantidadDisponible, cantidadMinima], (err, result) => {
      if (err) {
        return res.status(500).send("Error al insertar alimento");
      } else {
        res.status(201).send("Alimento insertado correctamente");
      }
    });
};

  


// Insertar una categoría en la tabla 'categoria'
exports.insertCategory = (req, res) => {
    const { IdCategoria, nombreCategoria } = req.body; // Agregar IdCategoria

    if (!IdCategoria || !nombreCategoria) {
        return res.status(400).send("El ID y el nombre de la categoría son obligatorios");
    }

    const query = "INSERT INTO categoria (IdCategoria, nombreCategoria) VALUES (?, ?)"; // Incluir IdCategoria

    db.query(query, [IdCategoria, nombreCategoria], (err, result) => {
        if (err) {
            return res.status(500).send("Error al insertar categoría");
        } else {
            res.status(201).json({ id: IdCategoria, nombreCategoria }); // Usar el IdCategoria proporcionado
        }
    });
};
