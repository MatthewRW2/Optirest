const express = require('express');
const { getMenuStatistics, createMenu } = require('../controllers/menuController');  // Importamos el controlador

const router = express.Router();

// Ruta para obtener estadísticas de menús
router.get('/estadisticas_menu', getMenuStatistics);

// Ruta para crear un nuevo menú
router.post('/crear_menu', createMenu);

module.exports = router;
