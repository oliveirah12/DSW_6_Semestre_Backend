const mongoose = require('mongoose')



const User = mongoose.model('User', {
    login: String,
    senha: String
})

module.exports = User