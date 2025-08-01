// Imports

const express = require('express')
const router = express.Router()
const mongoose= require('mongoose')
require('../models/user')
const Usuario = mongoose.model('usuarios')
const bcrypt= require('bcryptjs')
const passport= require('passport')

// Controllers
const UserController= require('../controllers/userController')


// Routes Usuário

router.get('/',(req,res)=>{
    res.render('home')
})

    // Register
router.get('/register',(req,res)=>{
    res.render('user/register')
})


router.post('/register',(req,res)=>{
    UserController.register(req,res)
})





// Login 
router.get('/login',(req,res)=>{
    res.render('user/login')
})
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/user/',
        failureRedirect:'/user/login',
        failureFlash:true,
        successFlash:true
    })(req,res,next)
})



module.exports= router