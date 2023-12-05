require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require("./orm/config/db")
const router = require('./src/routes/routes')
const app = express();


app.use(cors())
app.use(express.json())
app.use(router)


sequelize.sync().then(() => console.log("SEQUELIZE Conectado"));

const port = 4000;

app.listen(port,()=>{
    console.log(`APP conectado - Porta ${port}`)
})

