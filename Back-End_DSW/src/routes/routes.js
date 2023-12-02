const express = require('express')
const router = express.Router()

const relatorioController = require('../controllers/relatorioController')
const controlesController = require('../controllers/controlesController')
const estufaController = require('../controllers/estufaController')
const userController = require('../controllers/userController')
const { default: axios } = require('axios')


const verificaToken = async () =>{
    const urlToken = 'http://localhost:5000/auth/token'

    try {
        const response = await axios.get(urlToken)
        console.log(response)
    } catch (error) {
        
    }
}


// Rotas para relatórios
router.get('/relatorio', userController.checkToken, relatorioController.all);
router.get('/relatorios',userController.checkToken, relatorioController.one);
router.delete('/deleterelatorio/:id', userController.checkToken, relatorioController.delete);



//Rotas Controles
router.put('/ligar/controles/:id', userController.checkToken, controlesController.ligarControle)
router.put('/desligar/controles/:id', userController.checkToken, controlesController.desligarControle)
router.get('/controlesIrrigacao/', userController.checkToken, controlesController.listarControles)



//Rotas de Estufas
router.get('/estufas/', verificaToken, estufaController.all)
router.delete('/deleteestufa/:id',userController.checkToken, estufaController.delete)
router.post('/addestufa', userController.checkToken, estufaController.create)





module.exports = router
