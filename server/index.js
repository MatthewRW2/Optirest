const express = require("express");
const mysql = require("mysql");
const cors = require('cors');

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
    const { nombres, apellidos, tipoDocumento, numeroDocumento, contrasena } = req.body;

    const query = 'INSERT INTO usuario (N_Documento, Nombres, Apellidos, tipoDocumento, Contraseña) VALUES (?, ?, ?, ?, ?)';
    const values = [numeroDocumento, nombres, apellidos, tipoDocumento, contrasena];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error al registrar el usuario: ", err);
            res.status(500).send("Error al registrar el usuario");
        } else {
            res.send("Registro exitoso");
        }
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


// Cierre de la conexión (opcional, no es necesario cerrarla inmediatamente después de cada consulta)
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
