const express = require('express')
const User = require('../../orm/models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



class userController {
    

    async create(request, response){

        const {login, senha, senhaConfirmation} = request.body

        if(!login){
            return response.status(422).json({msg : 'Login obrigatório'})
        }
        if(!senha){
            return response.status(422).json({msg : 'Senha obrigatória'})
        }
        console.log(request.body)
        console.log(senha)
        console.log(senhaConfirmation)

        if(senha != senhaConfirmation){
            return response.status(423).json({msg : 'Senhas não coincidem'})
        }

        const userExist = await User.findOne({login: login})

        if(userExist){
            return response.status(422).json({msg : 'Login já existente'})
        }

        const salt = await bcrypt.genSalt(10)
        const senhaHash = await bcrypt.hash(senha, salt)

        const user = new User({
            login,
            senha: senhaHash,
        })  

        try {
            await user.save()
            response.status(201).json({msg: 'Usuário criado'})  

        } catch (error) {
            console.log(error)
            response.status(500).json({msg: error})
        }
    }

    async login(request, response){

        const {login, senha} = request.body
        //const { authorization } = request.headers

        if(!login){
            return response.status(422).json({msg : 'Login obrigatório'})
        }
        if(!senha){
            return response.status(422).json({msg : 'Senha obrigatória'})
        }

        const user = await User.findOne({login: login})

        if(!user){
            return response.status(404).json({msg : 'Login não existe'})
        }


        const checkSenha = await bcrypt.compare(senha, user.senha)
        if(!checkSenha){
            return response.status(422).json({msg : 'Senha inválida'})
        }

        
        try {
            const secret = process.env.SECRET
            const token = jwt.sign(
                {
                    id: user._id,
                },
                secret
            )
            
            response.status(201).json({msg: 'Login realizado', token})  

        } catch (error) {
            console.log(error)
            response.status(500).json({msg: error})
        }
    }


    checkToken(request, response, next){
        const authHeader = request.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]
        console.log(token + ' - Linha 92')

        if(!token){
            return response.status(401).json({msg: 'Acesso negado'})
        }

        try {
            const secret = process.env.SECRET

            jwt.verify(token, secret)
            next()

        } catch (error) {
            console.log(error)
            response.status(400).json({msg: 'Token inválido'})
        }
    }
    
}

module.exports = new userController();
