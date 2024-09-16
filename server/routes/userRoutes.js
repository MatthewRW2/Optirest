const express = require('express');
const { getAllUsers, editUser } = require('../controllers/userController');

const router = express.Router();

router.get('/usuarios', getAllUsers);
router.put('/editar_usuario/:nDocumento', editUser);

module.exports = router;
