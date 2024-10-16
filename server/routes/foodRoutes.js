const express = require('express');
const { 
    getAllFoods, 
    getCategories, 
    getStatistics,   // Importamos el controlador de estadísticas
    insertFood, 
    insertCategory, 
    deleteFood, 
    updateFood 
} = require('../controllers/foodController');

const router = express.Router();

router.get('/alimento', getAllFoods);
router.get('/categorias', getCategories);

// Nueva ruta para obtener las estadísticas de alimentos por categoría
router.get('/statistics', getStatistics); 

router.post('/insertar_alimento', insertFood);
router.post('/insertar_categoria', insertCategory);

router.delete('/alimento/:IdAlimento', deleteFood);


router.put('/alimento/:IdAlimento', updateFood);

module.exports = router;
