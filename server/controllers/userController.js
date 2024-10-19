const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.getUserProfile = (req, res) => {
    const nDocumento = req.params.nDocumento; // Obtener el nDocumento de los parámetros de la URL

    const sql = 'SELECT * FROM Usuario WHERE nDocumento = ?';
    
    db.query(sql, [nDocumento], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (result.length > 0) {
            // Enviar los datos del usuario si se encontró un resultado
            res.json(result[0]);
        } else {
            // Enviar un mensaje si el usuario no se encontró
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    });
};

exports.getAllUsers = (req, res) => {
    const sql = 'SELECT nDocumento, Nombres, Apellidos, Rol, correoElectronico, activo FROM usuario';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(result);
    });
};

exports.deleteUser = (req, res) => {
    const { nDocumento } = req.params;

    // Consulta para eliminar  - inactivar   el usuario por el número de documento
     const sql = 'UPDATE usuario SET activo = 0 WHERE nDocumento = ?';

    db.query(sql, [nDocumento], (err, result) => {
    if (err) {
        console.error('Error al desactivar el usuario:', err);
        return res.status(500).json({ error: 'Hubo un error al desactivar el usuario.' });
    }

    // Verificar si se actualizó algún registro
    if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Usuario desactivado exitosamente' });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

};


exports.getRol= (req, res) => {
    const sql = `
      SELECT DISTINCT Rol FROM usuario
    `;
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(result);
    });
  };

exports.getDocumentType= (req, res) => {
    const sql = `
      SELECT DISTINCT tipoDocumento FROM usuario
    `;
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(result);
    });
};

exports.editUser = (req, res) => {
    const { nDocumento } = req.params;
    const { nombres, apellidos, rol, correo, tipoDocumento} = req.body;

        const query = `
            UPDATE usuario 
            SET Nombres = ?, Apellidos = ?, Rol = ?, correoElectronico = ?,  tipoDocumento = ?
            WHERE NDocumento = ?
        `;
        const values = [nombres, apellidos, rol, correo, tipoDocumento, nDocumento];

        db.query(query, values, (err, result) => {
            if (err) {
                res.status(500).send("Error al actualizar el usuario");
            } else {
                res.send("Usuario actualizado exitosamente");
            }
        });
};
