const express = require('express');
const { obtenerVistaAsistenciasYCronograma } = require('../controllers/totallunchesController');

const router = express.Router();

router.get('/vista-asistencias-cronograma', obtenerVistaAsistenciasYCronograma);
router.get('/vista-asistencias-cronograma/:fecha', obtenerVistaAsistenciasYCronograma);

module.exports = router;
