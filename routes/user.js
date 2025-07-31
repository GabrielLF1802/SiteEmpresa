const express = require('express')
const router = express.Router()
const mongoose= require('mongoose')
require('../models/user')
const Usuario = mongoose.model('usuarios')
const bcrypt= require('bcryptjs')
const passport= require('passport')




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
    erros= []
    if(typeof req.body.senha==undefined|| !req.body.senha|| req.body.senha == null){
        erros.push({texto:'Senha Inválida'})
    }
    if (!req.body.nome|| typeof req.body.nome == undefined || req.body.nome== null){
        erros.push({texto:'Nome Inválido'})
    }
    if(!req.body.email||typeof req.body.email== undefined|| req.body.email== null){
        erros.push({texto:'Email Inválido'})
    }
    if(!req.body.nasc|| typeof req.body.nasc== undefined|| req.body.nasc== null){
        erros.push({texto:'Data de nascimento Inválida'})
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto:'As senhas não conhecidem'})
    }
    if(req.body.senha.length< 4){
        erros.push({texto:'Senha muito curta'})
    }
    if(erros.length>0){
        res.render('user/register',{erros:erros})
    }else{
        Usuario.findOne({email:req.body.email}).then((usuario)=>{
            if(usuario){
                req.flash('error_msg','Email já cadastrado')
                res.redirect('/user/register')
            }else{
                const newUser = new Usuario({
                    nome: req.body.nome,
                    email:req.body.email,
                    nasc: req.body.nasc,
                    senha: req.body.senha
                })
                bcrypt.genSalt(10,(erro, salt)=>{
                    bcrypt.hash(newUser.senha, salt, (erro, hash)=>{
                        if(erro){
                            req.flash('error_msg','Erro ao registrar')
                            res.redirect('/user/register')
                        }
                        newUser.senha= hash
                        newUser.save().then(()=>{
                            req.flash('success_msg','Sucesso ao registrar o novo usuário')
                            res.redirect('/user/')
                            
                        }).catch(()=>{
                            req.flash('error_msg','Erro ao registrar novo usuário')
                            res.redirect('/user/register')
                        })
                    })
                })
            }

        }).catch((err)=>{
            req.flash('error_msg','Erro ao registrar novo user')
            res.redirect('/user/register')
        })
    }

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