const express = require('express');
const { register, login, verificarCorreo, cambiarContra } = require('../controllers/authController');

const router = express.Router();

router.post('/registro', register);
router.post('/login', login);
router.post('/VerifyEmail', verificarCorreo);
router.post('/ChangePassword', cambiarContra); 

module.exports = router;
