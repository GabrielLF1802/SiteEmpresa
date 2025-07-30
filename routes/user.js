const express = require('express')
const router = express.Router()
const mongoose= require('mongoose')
require('../models/user')
const Usuario = mongoose.model('usuarios')


// Routes Usuário

router.get('/register',(req,res)=>{
    res.render('usuario/register')
})