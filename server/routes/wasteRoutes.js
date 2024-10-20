const express = require('express');
const router = express.Router();
const { desperdicio, obtenerMenus, getDesperdicios } = require('../controllers/wasteController');

// Ruta para insertar desperdicio
router.post('/desperdicio', desperdicio);

// Ruta para obtener los menús
router.get('/menus', obtenerMenus);

// Ruta para obtener los desperdicios
router.get('/desperdicios', getDesperdicios);

module.exports = router;
