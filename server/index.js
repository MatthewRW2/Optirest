const express = require("express");
const cors = require('cors');
const db = require('./config/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
const menuRoutes = require('./routes/menuRoutes');
const assistRoutes = require('./routes/assistRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const wasteRoutes = require('./routes/wasteRoutes');

app.use('/', authRoutes);  // Incluye /login y /registro
app.use('/', userRoutes);  // Incluye /usuarios y /editar_usuario/:nDocumento
app.use('/', foodRoutes);  // Incluye /alimento, /categorias y /estadisticas
app.use('/', menuRoutes);  // Incluye /detalle_menu
app.use('/', assistRoutes);  // Incluye /Registro asistencia
app.use('/', scheduleRoutes); //Incluye /Cronograma
app.use('/', wasteRoutes); //Incluye /Cronograma

// Puerto en el que escucha el servidor
app.listen(3001, () => {
    console.log("Server is running on port 3001");
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
