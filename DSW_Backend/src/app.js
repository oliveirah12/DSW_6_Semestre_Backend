const express = require('express');
const app = express();
const router = express.Router();

//Rotas
const index = require('./routes/index');
const taskRoute = require('./routes/router');
app.use('/', index);
app.use('/persons', taskRoute);
module.exports = app;


