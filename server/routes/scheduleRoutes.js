const express = require('express');
const { 
    cronograma
} = require('../controllers/scheduleController');

const router = express.Router();

router.get('/cronograma', cronograma);


module.exports = router;