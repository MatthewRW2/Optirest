const express = require('express');
const { desperdicio, obtenerMenus } = require('../controllers/wasteController');

const router = express.Router();

router.post('/desperdicio', desperdicio); // Ruta para insertar desperdicio
router.get('/menus', obtenerMenus); // Ruta para obtener los IdMenu disponibles

module.exports = router;
