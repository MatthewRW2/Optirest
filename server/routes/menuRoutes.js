const express = require('express');
const { getMenuDetails } = require('../controllers/menuController');

const router = express.Router();

router.get('/detalle_menu', getMenuDetails);

module.exports = router;
