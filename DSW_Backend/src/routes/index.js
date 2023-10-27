const express = require('express');
const router = express.Router();
const plantas = require('../models/plantaModel')


router.get('/', function (req, res, next) {
    
    res.status(200).send({
        
    });
});


module.exports = router;