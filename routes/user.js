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
router.get('/profile/address',(req,res)=>{
    UserController.listEnd(req,res)
})
router.get('/profile/newaddress',(req,res)=>{
    res.render('user/addaddress')
})
router.post('/profile/address',(req,res)=>{
    UserController.addAddress(req,res)
})
router.get('/profile/editaddress/:id',(req,res)=>{
    UserController.editAddress(req,res)
})
router.post('/profile/editaddress',(req,res)=>{
    UserController.saveAddress(req,res)
})
router.post('/profile/deletaddress',(req,res)=>{
    UserController.delAddress(req,res)
})




module.exports= router