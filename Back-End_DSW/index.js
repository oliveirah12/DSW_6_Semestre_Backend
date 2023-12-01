require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const sequelize = require("./orm/config/db")
const router = require('./src/routes/routes')
const app = express();


app.use(cors())
app.use(express.json())
app.use(router)


const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS


const mongoosePort = 5000
mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@estufausuarios.txzejpr.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(mongoosePort)
        console.log(`MONGOOSE Conectado - Porta ${mongoosePort}`)
    })
.catch((error) => console.log(error))








sequelize.sync().then(() => console.log("SEQUELIZE Conectado"));

const port = 4000;

app.listen(port,()=>{
    console.log(`APP conectado - Porta ${port}`)
})

