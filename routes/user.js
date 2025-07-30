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





// Login 
router.get('/login',(req,res)=>{
    res.render('user/login')
})



module.exports= router