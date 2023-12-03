const express = require('express')
const router = express.Router()

const relatorioController = require('../controllers/relatorioController')
const controlesController = require('../controllers/controlesController')
const estufaController = require('../controllers/estufaController')
const { default: axios } = require('axios')


const verificaToken = async (req, res, next) => {
    const urlToken = 'http://localhost:5000/auth/token';

    try {
        const token = req.headers.authorization.split(' ')[1];
        const response = await axios.get(urlToken, { headers: { Authorization: token } });
        
        if (response.data.isValidToken) {
            next();
        } else {
            res.status(401).json({ msg: 'Token inválido' });
        }
        
    } catch (error) {

        res.status(401).json({ msg: 'Falha na autenticação' });
    }
};


// Rotas para relatórios
router.get('/relatorio', verificaToken, relatorioController.all);
router.get('/relatorios',verificaToken, relatorioController.one);
router.delete('/deleterelatorio/:id', verificaToken, relatorioController.delete);



//Rotas Controles
router.put('/ligar/controles/:id', verificaToken, controlesController.ligarControle)
router.put('/desligar/controles/:id', verificaToken, controlesController.desligarControle)
router.get('/controlesIrrigacao/', verificaToken, controlesController.listarControles)



//Rotas de Estufas
router.get('/estufas/', verificaToken, estufaController.all)
router.delete('/deleteestufa/:id',verificaToken, estufaController.delete)
router.post('/addestufa', verificaToken, estufaController.create)





module.exports = router
