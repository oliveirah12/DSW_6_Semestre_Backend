const express = require('express')
const router = express.Router()

const relatorioController = require('../controllers/relatorioController')
const controlesController = require('../controllers/controlesController')
const estufaController = require('../controllers/estufaController')
const userController = require('../controllers/userController')



// Rotas para relatórios
router.get('/relatorio', relatorioController.all);
router.get('/relatorios/', relatorioController.one);
router.delete('/deleterelatorio/:id', relatorioController.delete);



//Rotas Controles
router.put('/ligar/controles/:id', controlesController.ligarControle)
router.put('/desligar/controles/:id', controlesController.desligarControle)
router.get('/controlesIrrigacao', controlesController.listarControles)



//Rotas de Estufas
router.get('/estufas/:id', userController.checkToken, estufaController.all)
router.delete('/deleteestufa/:id', estufaController.delete)
router.post('/addestufa', estufaController.create)



//Rotas User
router.post('/auth/register', userController.create)
router.post('/auth/login', userController.login)

module.exports = router
