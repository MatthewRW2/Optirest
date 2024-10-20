const express = require('express');
const { getMenuStatistics } = require('../controllers/menuController');  // Importamos el controlador

const router = express.Router();

// Nueva ruta para obtener estadísticas de menús
router.get('/estadisticas_menu', getMenuStatistics);

module.exports = router;
