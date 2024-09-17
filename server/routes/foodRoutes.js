const express = require('express');
const { getAllFoods, getCategories, getStatistics, insertFood, insertCategory } = require('../controllers/foodController');

const router = express.Router();

router.get('/alimento', getAllFoods);
router.get('/categorias', getCategories);
router.get('/estadisticas', getStatistics);

// Ruta para insertar un nuevo alimento
router.post('/insertar_alimento', insertFood);

// Ruta para insertar una nueva categoría
router.post('/insertar_categoria', insertCategory);

module.exports = router;
