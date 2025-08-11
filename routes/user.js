// Imports

const express = require('express')
const router = express.Router()
const passport= require('passport')


// Controllers
const UserController= require('../controllers/userController')



// Routes Usuário

    // Home
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

// Logout

router.get('/logout',(req,res,next)=>{
    UserController.Sair(req,res,next)
})

// Profile
router.get('/profile',(req,res)=>{
    UserController.RenderProf(req,res)
})
router.post('/profile/edit',(req,res)=>{
    UserController.ProfileEdit(req,res)
})
router.get('/profile/adress',(req,res)=>{
    res.render('user/adress')
})
router.get('/profile/newadress',(req,res)=>{
    res.render('user/addadress')
})
router.post('/profile/adress',(req,res)=>{
    UserController.addAdress(req,res)
})




module.exports= router