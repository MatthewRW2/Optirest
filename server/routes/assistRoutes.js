const express = require('express');
const { registerAttendance } = require('../controllers/assistController');

const router = express.Router();

router.post('/asistencia/:nDocumento/:IdGrupo', registerAttendance);
module.exports = router;
