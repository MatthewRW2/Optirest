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
app.get("/alimentos", (req, res) => {
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
    const query = "SELECT nombreCategoria FROM categoria";
    db.query(query, (err, result) => {
      if (err) {
        console.error("Error al obtener categorías: ", err);
        res.status(500).send("Error al obtener categorías");
      } else {
        res.json(result);
      }
    });
});

// Endpoint para insertar nuevos alimentos
app.post("/insertar_alimento", (req, res) => {
    const { nombreAlimento, cantidad, categoria, fechaEntrada } = req.body;
    const query = 'INSERT INTO alimento (nombreAlimento, cantidad, categoria, fechaEntrada) VALUES (?, ?, ?, ?)';
    const values = [nombreAlimento, cantidad, categoria, fechaEntrada];
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error al insertar alimento: ", err);
        res.status(500).send("Error al insertar alimento");
      } else {
        res.send("Alimento insertado exitosamente");
      }
    });
});

app.get('/usuarios', (req, res) => {
    const sql = 'SELECT IdUsuario, Nombres, Apellidos, Rol, numeroDocumento FROM usuario';
    
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error ejecutando la consulta:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      res.json(result); 
    });
});

// Endpoint para editar un usuario
app.put("/editar_usuario/:id", (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, rol, tipoDocumento, numeroDocumento, contrasena } = req.body;

    // Si la contraseña es nueva, hashearla
    bcrypt.hash(contrasena, 10, (err, hash) => {
        if (err) {
            return res.status(500).send("Error al hashear la contraseña");
        }

        const query = `
            UPDATE usuario 
            SET Nombres = ?, Apellidos = ?, Rol = ?, tipoDocumento = ?, numeroDocumento = ?, Contraseña = ? 
            WHERE IdUsuario = ?
        `;
        const values = [nombres, apellidos, rol, tipoDocumento, numeroDocumento, hash, id];

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
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Consulta a la base de datos
    db.query('SELECT * FROM usuario WHERE Nombres = ?', [username], (err, result) => {
        if (err) return res.status(500).send("Error en el servidor");

        if (result.length > 0) {
            const passwordFromDatabase = result[0].Contraseña;

            // Comparar la contraseña ingresada con la hasheada
            bcrypt.compare(password, passwordFromDatabase, (err, isMatch) => {
                if (err) {
                    return res.status(500).send("Error al comparar contraseñas");
                }

                if (isMatch) {
                    // Contraseña correcta
                    res.json({ success: true });
                } else {
                    // Contraseña incorrecta
                    res.status(401).send("Contraseña incorrecta");
                }
            });
        } else {
            // Usuario no encontrado
            res.status(404).send("Usuario no encontrado");
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
