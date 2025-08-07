// Imports

const express = require('express')
const router = express.Router()
const mongoose= require('mongoose')
require('../models/user')
const Usuario = mongoose.model('usuarios')
const bcrypt= require('bcryptjs')
const passport= require('passport')
const axios= require('axios')

// Controllers
const UserController= require('../controllers/userController')
const productController = require('../controllers/productController')


// Routes Usuário

router.get('/search', async (req,res)=>{
    const name= req.query.q
    productController.searchProdcut(req,res,name)
});

    

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

// Logout

router.get('/logout',(req,res,next)=>{
    UserController.Sair(req,res,next)
})




module.exports= router