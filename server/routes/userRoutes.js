const express = require('express');
const { getAllUsers, editUser, getRol, getUserProfile, deleteUser, getDocumentType, getPerfil, getPerfilE, editProfile, verifyPassword } = require('../controllers/userController');

const router = express.Router();

router.get('/profile/:nDocumento', getUserProfile);
router.get('/usuarios', getAllUsers);
router.get('/perfil', getPerfil);
router.get('/perfilE/:nDocumento', getPerfilE);
router.get('/usuario/:nDocumento', getAllUsers);
router.put('/editar_usuario/:nDocumento', editUser);
router.put('/editar_perfil/:nDocumento', editProfile);
router.get('/roles', getRol);
router.get('/tipos_documentos', getDocumentType);
router.delete('/usuario/:nDocumento', deleteUser);
router.post('/verificar_contrasena/:nDocumento', verifyPassword);

module.exports = router;
