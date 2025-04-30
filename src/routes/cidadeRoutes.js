const express = require('express');
const cidadesController = require('../controllers/cidadeController');

const router = express.Router();

router.get('/cidades', cidadesController.buscarCidades);

module.exports = router;
