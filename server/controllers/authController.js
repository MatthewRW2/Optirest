const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
    const { nombres, apellidos, email, tipoDocumento, numeroDocumento, contrasena } = req.body;

    // Hashear la contraseña antes de guardarla
    bcrypt.hash(contrasena, 10, (err, hash) => {
        if (err) {
            return res.status(500).send("Error al hashear la contraseña");
        }

        const query = 'INSERT INTO usuario (NDocumento, Nombres, Apellidos, correoElectronico, tipoDocumento, Contraseña) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [numeroDocumento, nombres, apellidos, email, tipoDocumento, hash], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al registrar usuario");
            } else {
                res.send("Registro exitoso");
            }
        });
    });
};

exports.login = (req, res) => {
    const { nombre, contrasena } = req.body;

    db.query('SELECT * FROM usuario WHERE Nombres = ?', [nombre], (err, results) => {
        if (err) {
            return res.status(500).send("Error al autenticar usuario");
        }

        if (results.length > 0) {
            const usuario = results[0];

            bcrypt.compare(contrasena, usuario.Contraseña, (err, esIgual) => {
                if (err) {
                    return res.status(500).send("Error al autenticar usuario");
                }

                if (esIgual) {
                    return res.json({ message: "Inicio de sesión exitoso" });
                } else {
                    return res.json({ message: "Nombre o contraseña incorrectos" });
                }
            });
        } else {
            return res.json({ message: "Nombre o contraseña incorrectos" });
        }
    });
};
