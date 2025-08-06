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


// Routes Usuário

router.get('/', async (req,res)=>{
    const termo = 'celular';

    try {
        const resposta = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${termo}`);
        const produtos = resposta.data.results;

        produtos.forEach(produto => {
            console.log('Título:', produto.title);
            console.log('Preço:', produto.price);
            console.log('Imagem:', produto.thumbnail);
            console.log('Link:', produto.permalink);
            console.log('---');
        });

        // Se quiser exibir no Handlebars:
        res.render('home', { produtos });

    } catch (err) {
        console.error('Erro ao buscar produtos:', err.message);
        res.render('home', { produtos: [] });
    }
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