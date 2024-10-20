const express = require('express');
const { almuerzos } = require('../controllers/totallunchesController');  // Asegúrate de que el nombre es correcto

const router = express.Router();

router.get('/almuerzo', almuerzos);  // Aquí también debe coincidir el nombre

module.exports = router;
