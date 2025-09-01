// arquivo: routes/salasRoutes.js

// 1. Import do Express
const express = require('express');

// 2. Import do controller de salas
const salasController = require('../controller/salasController');

// 3. Cria uma instância do roteador do Express
const router = express.Router();

// 4. Define as rotas
router.get('/salas', salasController.getAllSalasDeAula);
router.get('/salas/:id', salasController.getSalaDeAulaById);

router.post('/salas', salasController.insertSalaDeAula);

router.put('/salas/:id', salasController.updateSalaDeAula);

router.delete('/salas/:id', salasController.deleteSalaDeAula);



// 5. Exporta o roteador
module.exports = router;