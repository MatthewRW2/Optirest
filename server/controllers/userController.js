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

exports.getPerfil = (req, res) => {
    const { correoElectronico } = req.query; // Asegúrate de que esto sea correcto

    console.log('Correo electrónico recibido:', correoElectronico); // Para depuración

    // Consulta SQL para obtener solo el usuario específico
    db.query('SELECT nDocumento, Nombres, Apellidos, tipoDocumento, Rol, correoElectronico FROM usuario WHERE correoElectronico = ?', [correoElectronico], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        console.log('Resultados de la consulta:', results); // Agrega esto para depurar resultados

        // Verifica si se encontraron resultados
        if (results.length > 0) {
            res.json(results); // Devuelve todos los resultados coincidentes
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' }); // Manejo si no se encuentra el usuario
        }
    });
};

exports.getPerfilE = (req, res) => {
    const { nDocumento } = req.params; // Obtenemos nDocumento de los parámetros
    console.log('Número de documento recibido:', nDocumento);

    // Consulta SQL para obtener el usuario específico
    db.query('SELECT nDocumento, Nombres, Apellidos, tipoDocumento, Rol, correoElectronico FROM usuario WHERE nDocumento = ?', [nDocumento], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        console.log('Resultados de la consulta:', results);

        if (results.length > 0) {
            res.json(results[0]); // Devuelve el primer resultado
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    });
};

exports.editProfile = (req, res) => {
    const { nDocumento } = req.params;
    const { nombres, apellidos, correo, tipoDocumento, contrasena } = req.body;

    // Si la contraseña está presente, la hasheamos
    const hashedPasswordPromise = contrasena ? 
        new Promise((resolve, reject) => {
            bcrypt.hash(contrasena, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        }) : 
        Promise.resolve(null); // Si no hay contraseña, resolvemos con null

    // Actualizamos el perfil
    hashedPasswordPromise
        .then(hashedPassword => {
            // Preparamos los valores para la consulta
            const values = [nombres, apellidos, correo, tipoDocumento, hashedPassword, nDocumento];

            // Si no hay contraseña, no la incluimos en la consulta
            const query = `
                UPDATE usuario 
                SET Nombres = ?, Apellidos = ?, correoElectronico = ?, tipoDocumento = ?
                ${hashedPassword ? ', Contraseña = ?' : ''}
                WHERE NDocumento = ?
            `;

            // Filtramos los valores para evitar que el hash nulo se pase a la consulta
            const filteredValues = hashedPassword ? [...values] : values.slice(0, -1).concat(nDocumento);

            db.query(query, filteredValues, (err, result) => {
                if (err) {
                    res.status(500).send("Error al actualizar el usuario");
                } else {
                    res.send("Usuario actualizado exitosamente");
                }
            });
        })
        .catch(err => {
            res.status(500).send("Error al hashear la contraseña");
        });
};

exports.verifyPassword = (req, res) => {
    const { nDocumento } = req.params;
    const { contrasenaActual } = req.body;

    db.query('SELECT Contraseña FROM usuario WHERE nDocumento = ?', [nDocumento], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length > 0) {
            const user = results[0];

            // Compara la contraseña actual con la almacenada
            bcrypt.compare(contrasenaActual, user.Contraseña, (err, match) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al verificar la contraseña' });
                }

                if (match) {
                    res.json({ valid: true });
                } else {
                    res.json({ valid: false });
                }
            });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
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
