const express = require('express');
const { getAllUsers, editUser, getRol, getUserProfile, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.get('/profile/:nDocumento', getUserProfile);
router.get('/usuarios', getAllUsers);
router.get('/usuario/:nDocumento', getAllUsers);
router.put('/editar_usuario/:nDocumento', editUser);
router.get('/roles', getRol);
router.delete('/usuario/:nDocumento', deleteUser);
module.exports = router;
