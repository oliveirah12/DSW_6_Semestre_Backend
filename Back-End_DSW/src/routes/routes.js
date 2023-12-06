const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const relatorioController = require('../controllers/relatorioController')
const controlesController = require('../controllers/controlesController')
const estufaController = require('../controllers/estufaController')


// const verificaToken = async (req, res, next) => {
//     const urlToken = 'http://localhost:5000/auth/token';

//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         console.log(token + ' - Backend Antes de chamar Auth')
//         const response = await axios.get(urlToken, { headers: { Authorization: token } });
//         console.log(token + ' - Backend Após chamar Auth')


//         if (response.data.isValidToken) {
//             next();
//         } else {
//             console.log('ELSE Linha 23: ' + token)
//             console.log(response)
//             res.status(401).json({ msg: 'Token inválido' });
//         }

//     } catch (error) {

//         res.status(401).json({ msg: 'Falha na autenticação' });
//         console.log('Linha 28 - ERROR: ', error)
//     }
// };

const verificaToken = async (request, response, next) =>{

    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
        response.status(401).json({ msg: 'Acesso negado'});
    } else {
        try {
            
            const secret = process.env.SECRET;

            jwt.verify(token, secret);
            next()
        } catch (error) {
            console.log(error);
            response.status(401).json({ msg: 'Token inválido'});
        }
    }
}


// Rotas para relatórios
router.get('/relatorio', verificaToken, relatorioController.all);
router.get('/relatorios', verificaToken, relatorioController.one);
router.delete('/deleterelatorio/:id', verificaToken, relatorioController.delete);



//Rotas Controles
router.put('/ligar/controles/:id', verificaToken, controlesController.ligarControle)
router.put('/desligar/controles/:id', verificaToken, controlesController.desligarControle)
router.get('/controlesIrrigacao/', verificaToken, controlesController.listarControles)



//Rotas de Estufas
router.get('/estufas', verificaToken, estufaController.all)
router.delete('/deleteestufa/:id', verificaToken, estufaController.delete)
router.post('/addestufa', verificaToken, estufaController.create)





module.exports = router
