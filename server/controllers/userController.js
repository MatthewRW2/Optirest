const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res) => {
    const sql = 'SELECT nDocumento, Nombres, Apellidos, Rol, correoElectronico FROM usuario';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(result);
    });
};

exports.editUser = (req, res) => {
    const { nDocumento } = req.params;
    const { nombres, apellidos, rol, tipoDocumento, contrasena } = req.body;

    bcrypt.hash(contrasena, 10, (err, hash) => {
        if (err) {
            return res.status(500).send("Error al hashear la contraseña");
        }

        const query = `
            UPDATE usuario 
            SET Nombres = ?, Apellidos = ?, Rol = ?, tipoDocumento = ?, Contraseña = ? 
            WHERE NDocumento = ?
        `;
        const values = [nombres, apellidos, rol, tipoDocumento, hash, nDocumento];

        db.query(query, values, (err, result) => {
            if (err) {
                res.status(500).send("Error al actualizar el usuario");
            } else {
                res.send("Usuario actualizado exitosamente");
            }
        });
    });
};
