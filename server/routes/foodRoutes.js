const express = require('express');
const { 
    getAllFoods, 
    getCategories, 
    getStatistics, 
    insertFood, 
    insertCategory, 
    deleteFood, 
    updateFood 
} = require('../controllers/foodController');

const router = express.Router();

router.get('/alimento', getAllFoods);
router.get('/categorias', getCategories);
router.get('/estadisticas', getStatistics);

router.post('/insertar_alimento', insertFood);
router.post('/insertar_categoria', insertCategory);

router.delete('/alimento/:IdAlimento', deleteFood);

router.put('/alimento/:IdAlimento', updateFood);

module.exports = router;
