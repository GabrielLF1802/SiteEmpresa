const express = require('express')
const router = express.Router()
const mongoose= require('mongoose')
require('../models/user')
const Usuario = mongoose.model('usuarios')


// Routes Usuário

router.get('/',(req,res)=>{
    res.render('home')
})

    // Register
router.get('/register',(req,res)=>{
    res.render('user/register')
})
router.post('/register',(req,res)=>{
    // Possíveis Erros


    const newUser = new Usuario({
        nome: req.body.nome,
        email:req.body.email,
        nasc: req.body.nasc,
        senha: req.body.senha
    })
    newUser.save().then(()=>{
        req.flash('success_msg','Sucesso ao registrar o novo usuário')
        res.redirect('/user/')
        
    }).catch(()=>{
        req.flash('error_msg','Erro ao registrar novo usuário')
        res.redirect('/user/')
    })
})





// Login 
router.get('/login',(req,res)=>{
    res.render('user/login')
})



module.exports= router