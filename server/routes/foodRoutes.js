const express = require('express');
const { getAllFoods, getCategories, getStatistics } = require('../controllers/foodController');

const router = express.Router();

router.get('/alimento', getAllFoods);
router.get('/categorias', getCategories);
router.get('/estadisticas', getStatistics);

module.exports = router;
