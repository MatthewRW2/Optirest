const express = require('express');
const { getAllUsers, editUser, getRol, getUserProfile, deleteUser, getDocumentType, getPerfil } = require('../controllers/userController');

const router = express.Router();

router.get('/profile/:nDocumento', getUserProfile);
router.get('/usuarios', getAllUsers);
router.get('/perfil', getPerfil);
router.get('/usuario/:nDocumento', getAllUsers);
router.put('/editar_usuario/:nDocumento', editUser);
router.get('/roles', getRol);
router.get('/tipos_documentos', getDocumentType);
router.delete('/usuario/:nDocumento', deleteUser);
module.exports = router;
