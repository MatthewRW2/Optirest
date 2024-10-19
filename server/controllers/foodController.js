const db = require('../config/db');

// Obtener todos los alimentos, incluyendo el campo fecha
exports.getAllFoods = (req, res) => {
    const query = "SELECT IdAlimento, IdCategoria, nombreAlimento, cantidadDisponible, cantidadMinima, fecha FROM alimento";
    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send("Error al obtener alimentos");
        } else {
            res.json(result);
        }
    });
};

// Obtener todas las categorías
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

// Obtener estadísticas de alimentos con categorías
exports.getStatistics = (req, res) => {
    const query = `
      SELECT categoria.nombreCategoria, alimento.nombreAlimento, 
             alimento.cantidadDisponible, alimento.cantidadMinima, alimento.fecha
      FROM alimento
      JOIN categoria ON alimento.IdCategoria = categoria.IdCategoria
    `;
  
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send("Error al obtener estadísticas");
      } else {
        res.json(result);
      }
    });
  };

// Insertar o actualizar alimento en la tabla 'alimento'
exports.insertFood = (req, res) => {
    const { IdCategoria, nombreAlimento, cantidadDisponible, cantidadMinima, fecha } = req.body;

    // Validar que todos los campos sean proporcionados
    if (!IdCategoria || !nombreAlimento || !cantidadDisponible || !cantidadMinima || !fecha) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    // Primero verifica si el alimento ya existe en la base de datos
    const checkQuery = "SELECT cantidadDisponible FROM alimento WHERE nombreAlimento = ?";
    db.query(checkQuery, [nombreAlimento], (err, result) => {
        if (err) {
            return res.status(500).send("Error al verificar si el alimento ya existe");
        }

        if (result.length > 0) {
            // Si el alimento existe, actualiza la cantidad sumando la nueva cantidad
            const nuevaCantidad = parseInt(result[0].cantidadDisponible) + parseInt(cantidadDisponible);
            const updateQuery = "UPDATE alimento SET cantidadDisponible = ?, fecha = ? WHERE nombreAlimento = ?";
            db.query(updateQuery, [nuevaCantidad, fecha, nombreAlimento], (err, updateResult) => {
                if (err) {
                    return res.status(500).send("Error al actualizar la cantidad del alimento");
                } else {
                    return res.status(200).send("Cantidad de alimento actualizada correctamente");
                }
            });
        } else {
            // Si el alimento no existe, lo inserta como un nuevo registro
            const insertQuery = "INSERT INTO alimento (IdCategoria, nombreAlimento, cantidadDisponible, cantidadMinima, fecha) VALUES (?, ?, ?, ?, ?)";
            db.query(insertQuery, [IdCategoria, nombreAlimento, cantidadDisponible, cantidadMinima, fecha], (err, insertResult) => {
                if (err) {
                    return res.status(500).send("Error al insertar nuevo alimento");
                } else {
                    return res.status(201).send("Alimento insertado correctamente");
                }
            });
        }
    });
};


// Insertar una categoría en la tabla 'categoria'
exports.insertCategory = (req, res) => {
    const { IdCategoria, nombreCategoria } = req.body;

    if (!IdCategoria || !nombreCategoria) {
        return res.status(400).send("El ID y el nombre de la categoría son obligatorios");
    }

    // Verificar si la categoría ya existe
    const checkQuery = "SELECT * FROM categoria WHERE nombreCategoria = ?";
    db.query(checkQuery, [nombreCategoria], (err, result) => {
        if (err) {
            return res.status(500).send("Error al verificar si la categoría ya existe");
        }

        if (result.length > 0) {
            // Si la categoría ya existe, retornar un error
            return res.status(400).send("La categoría ya existe");
        } else {
            // Si no existe, insertar la nueva categoría
            const insertQuery = "INSERT INTO categoria (IdCategoria, nombreCategoria) VALUES (?, ?)";
            db.query(insertQuery, [IdCategoria, nombreCategoria], (err, result) => {
                if (err) {
                    return res.status(500).send("Error al insertar categoría");
                } else {
                    res.status(201).json({ id: IdCategoria, nombreCategoria });
                }
            });
        }
    });
};


// Eliminar un alimento de la tabla 'alimento'
exports.deleteFood = (req, res) => {
    const { IdAlimento } = req.params;

    if (!IdAlimento) {
        return res.status(400).send("El ID del alimento es obligatorio");
    }

    const query = "DELETE FROM alimento WHERE IdAlimento = ?";

    db.query(query, [IdAlimento], (err, result) => {
        if (err) {
            return res.status(500).send("Error al eliminar alimento");
        } else if (result.affectedRows === 0) {
            return res.status(404).send("Alimento no encontrado");
        } else {
            res.status(200).send("Alimento eliminado correctamente");
        }
    });
};

// Editar un alimento en la tabla 'alimento', incluyendo la fecha
exports.updateFood = (req, res) => {
    const { IdAlimento } = req.params; // ID del alimento que se va a editar
    const { IdCategoria, nombreAlimento, cantidadDisponible, cantidadMinima, fecha } = req.body;

    if (!IdAlimento) {
        return res.status(400).send("El ID del alimento es obligatorio");
    }

    if (!IdCategoria || !nombreAlimento || !cantidadDisponible || !cantidadMinima || !fecha) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `
        UPDATE alimento 
        SET IdCategoria = ?, nombreAlimento = ?, cantidadDisponible = ?, cantidadMinima = ?, fecha = ? 
        WHERE IdAlimento = ?`;

    db.query(query, [IdCategoria, nombreAlimento, cantidadDisponible, cantidadMinima, fecha, IdAlimento], (err, result) => {
        if (err) {
            return res.status(500).send("Error al actualizar el alimento");
        } else if (result.affectedRows === 0) {
            return res.status(404).send("Alimento no encontrado");
        } else {
            res.status(200).send("Alimento actualizado correctamente");
        }
    });
};
