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
    const sql = 'SELECT nDocumento, Nombres, Apellidos, Rol, correoElectronico FROM usuario';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(result);
    });
};

exports.deleteUser = (req, res) => {
    const { nDocumento } = req.params;

    // Consulta para eliminar el usuario por el número de documento
    const sql = 'DELETE FROM usuario WHERE nDocumento = ?';

    db.query(sql, [nDocumento], (err, result) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            return res.status(500).json({ error: 'Hubo un error al eliminar el usuario.' });
        }

        // Verificar si se eliminó algún registro
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    });
};

exports.getAllUsers = (req, res) => {
    const sql = 'SELECT nDocumento, Nombres, Apellidos, Rol, correoElectronico FROM usuario';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(result);
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
    const { nombres, apellidos, rol, correo, tipoDocumento, contrasena } = req.body;

    bcrypt.hash(contrasena, 10, (err, hash) => {
        if (err) {
            return res.status(500).send("Error al hashear la contraseña");
        }

        const query = `
            UPDATE usuario 
            SET Nombres = ?, Apellidos = ?, correoElectronico = ?, Rol = ?,  tipoDocumento = ?
            WHERE NDocumento = ?
        `;
        const values = [nombres, apellidos, rol, correo, tipoDocumento, hash, nDocumento];

        db.query(query, values, (err, result) => {
            if (err) {
                res.status(500).send("Error al actualizar el usuario");
            } else {
                res.send("Usuario actualizado exitosamente");
            }
        });
    });
};
