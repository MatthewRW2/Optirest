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
    const { correoElectronico, contrasena } = req.body;

    db.query('SELECT * FROM usuario WHERE correoElectronico = ?', [correoElectronico], (err, results) => {
        if (err) {
            return res.status(500).send("Error al autenticar usuario");
        }

        // Verificar si hay resultados (usuario existe)
        if (results.length === 0) {
            return res.status(404).json({ message: "El usuario no existe" }); // Usuario no encontrado
        }

        const usuario = results[0];

        // Verificar si el usuario está activo
        if (usuario.activo === 0) {
            return res.status(403).json({ message: "El usuario no existe" });
        }

        bcrypt.compare(contrasena, usuario.Contraseña, (err, esIgual) => {
            if (err) {
                return res.status(500).send("Error al autenticar usuario");
            }

            if (esIgual) {

                return res.json({
                    message: "Inicio de sesión exitoso",
                    nombre: usuario.Nombres,
                    rol: usuario.Rol,
                    nDocumento: usuario.nDocumento
                });
            } else {
                return res.status(401).json({ message: "Correo electrónico o contraseña incorrectos" });
            }
        });
    });
};

// Verificar si el correo existe
exports.verificarCorreo = (req, res) => {
    const { email } = req.body;

    db.query('SELECT * FROM usuario WHERE correoElectronico = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).send("Error al verificar el correo");
        }

        if (results.length > 0) {
            // El correo existe
            return res.json({ exists: true });
        } else {
            // El correo no está registrado
            return res.json({ exists: false });
        }
    });
};

exports.cambiarContra = (req, res) => {
    const { email, contrasena } = req.body;

    // Verificar que se envíen todos los campos
    if (!email || !contrasena) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
    }

    // Verificar si el correo electrónico existe en la base de datos
    db.query('SELECT * FROM usuario WHERE correoElectronico = ?', [email], (err, results) => {
        if (err) {
            console.error('Error al verificar el correo:', err);
            return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Correo no registrado.' });
        }

        // Hashear la nueva contraseña
        bcrypt.hash(contrasena, 10, (err, hash) => {
            if (err) {
                console.error('Error al hashear la contraseña:', err);
                return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
            }

            // Actualizar la contraseña en la base de datos
            db.query('UPDATE usuario SET Contraseña = ? WHERE correoElectronico = ?', [hash, email], (err) => {
                if (err) {
                    console.error('Error al cambiar la contraseña:', err);
                    return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
                }

                return res.json({ success: true, message: 'Contraseña cambiada exitosamente.' });
            });
        });
    });
};

