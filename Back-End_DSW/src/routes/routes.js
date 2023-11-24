const connection = require('../database/knexConfig')
const express = require('express')
const router = express.Router()

const relatorioController = require('../controllers/relatorioController')
const controlesController = require('../controllers/controlesController')
const estufaController = require('../controllers/estufaController')
const dadosEstufaController = require('../controllers/dadosEstufaController')






// Rotas para relatórios
//router.post('/novoRelatorio', relatorioController.create);
router.get('/relatorio', relatorioController.all);
router.get('/relatorios/', relatorioController.one);
router.delete('/deleterelatorio/:id', relatorioController.delete);
//router.put('/atualizar/relatorio/:id', relatorioController.update);



//console.log("Rotas configuradas:", router.stack.map(layer => layer.route.path));
//router.delete('/delete/relatorio/:id',relatorioController.removerRelatorio)


router.put('/ligar/controles/:id', controlesController.ligarControle)
router.put('/desligar/controles/:id', controlesController.desligarControle)
router.get('/controlesIrrigacao', controlesController.listarControles)



//Rotas de Estufas
router.get('/estufas', estufaController.all)
router.delete('/deleteestufa/:id', estufaController.delete)
router.post('/addestufa', estufaController.create)

//router.delete('/controles/:id', StatusController.deleteControles)
//router.delete('/dadosEstufa/:id', StatusController.deleteDadosEstufa)

//Rotas Dados Estufa
//router.get('/dadosEstufas', dadosEstufaController.all)

module.exports = router
