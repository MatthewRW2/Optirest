const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "optirest"
});

// Conexión a la base de datos
db.connect(err => {
    if (err) {
        console.error("Error al conectar a la base de datos: ", err);
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});

// Puerto en el que escucha el servidor
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

// Endpoint para registrar usuarios
app.post("/registro", (req, res) => {
    const { nombres, apellidos, email, tipoDocumento, numeroDocumento, contrasena } = req.body;

    // Hashear la contraseña antes de guardarla
    bcrypt.hash(contrasena, 10, (err, hash) => {
        if (err) {
            return res.status(500).send("Error al hashear la contraseña");
        }

        // Guardar el usuario con la contraseña hasheada
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
});

// Endpoint para obtener alimentos
app.get("/alimento", (req, res) => {
    const query = "SELECT IdAlimento, IdCategoria, nombreAlimento, cantidadDisponible, cantidadMinima FROM alimento";

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error al obtener alimentos: ", err);
            res.status(500).send("Error al obtener alimentos");
        } else {
            res.json(result);
        }
    });
});

// Endpoint para obtener detalles del menú
app.get("/detalle_menu", (req, res) => {
    const query = `
        SELECT detalle_menu.IdDetalleMenu, detalle_menu.cantidad, alimento.nombreAlimento
        FROM detalle_menu
        JOIN alimento ON detalle_menu.IdAlimento = alimento.IdAlimento
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error al obtener detalles del menú: ", err);
            res.status(500).send("Error al obtener detalles del menú");
        } else {
            res.json(result);
        }
    });
});

// Endpoint para obtener categorías
app.get("/categorias", (req, res) => {
    const query = "SELECT IdCategoria, nombreCategoria FROM categoria";
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error al obtener categorías: ", err);
            res.status(500).send("Error al obtener categorías");
        } else {
            res.json(result);
        }
    });
});



// Endpoint para obtener usuarios
app.get('/usuarios', (req, res) => {
    const sql = 'SELECT nDocumento, Nombres, Apellidos, Rol, correoElectronico FROM usuario';
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(result); 
    });
});




// Endpoint para editar un usuario
app.put("/editar_usuario/:nDocumento", (req, res) => {
    const { nDocumento } = req.params;
    const { nombres, apellidos, rol, tipoDocumento, contrasena } = req.body;

    // Si la contraseña es nueva, hashearla
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
                console.error("Error al actualizar el usuario: ", err);
                res.status(500).send("Error al actualizar el usuario");
            } else {
                res.send("Usuario actualizado exitosamente");
            }
        });
    });
});

// Endpoint para login
app.post("/login", (req, res) => {
    const { nombre, contrasena } = req.body;

    // Consultar la base de datos solo por el nombre de usuario
    db.query('SELECT * FROM usuario WHERE Nombres = ?', [nombre], (err, results) => {
        if (err) {
            console.error("Error al autenticar usuario: ", err);
            return res.status(500).send("Error al autenticar usuario");
        }

        // Verificar si el usuario existe
        if (results.length > 0) {
            const usuario = results[0];
            console.log("Contraseña en la base de datos:", usuario.Contraseña);
            console.log("Contraseña ingresada:", contrasena);

            // Comparar la contraseña ingresada con la almacenada en la base de datos
            bcrypt.compare(contrasena, usuario.Contraseña, (err, esIgual) => {
                if (err) {
                    console.error("Error al comparar contraseñas: ", err);
                    return res.status(500).send("Error al autenticar usuario");
                }

                // Si las contraseñas coinciden
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
});


// Endpoint para obtener estadísticas de alimentos por categoría
app.get("/estadisticas", (req, res) => {
    const query = `
        SELECT categoria.nombreCategoria, COUNT(alimento.IdAlimento) AS cantidadAlimentos
        FROM alimento
        JOIN categoria ON alimento.IdCategoria = categoria.IdCategoria
        GROUP BY categoria.nombreCategoria
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error al obtener estadísticas: ", err);
            res.status(500).send("Error al obtener estadísticas");
        } else {
            res.json(result);
        }
    });
});


// Cierre de la conexión
process.on('SIGINT', () => {
    db.end(err => {
        if (err) {
            console.error("Error al cerrar la conexión a la base de datos: ", err);
        } else {
            console.log("Conexión a la base de datos cerrada");
        }
        process.exit();
    });
});
