const express = require('express');
const { getAllUsers, editUser, getRol, getUserProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/profile/:nDocumento', getUserProfile);
router.get('/usuarios', getAllUsers);
router.get('/usuarios/:nDocumento', getAllUsers);
router.put('/editar_usuario/:nDocumento', editUser);
router.get('/roles', getRol);
module.exports = router;
