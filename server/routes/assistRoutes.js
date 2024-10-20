
const express = require('express');
const { registerAttendance, getCursos } = require('../controllers/assistController');

const router = express.Router();

router.post('/asistencia', registerAttendance); 
router.get('/curso', getCursos); 

module.exports = router;
