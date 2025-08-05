const LocalStrategy= require('passport-local').Strategy
const bcrypt= require('bcryptjs')

// Model
const mongoose= require('mongoose')
require('../models/user')
const Usuario= mongoose.model('usuarios')

// Authenticate 

module.exports= function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email', passwordField:'senha'},(email,senha,done)=>{
            Usuario.findOne({email:email}).then((user)=>{
                if(!user){
                    return done(null,false,{message:"Usuário não cadastrado"})
                }
                bcrypt.compare(senha, user.senha, (erro,batem)=>{
                    if(batem){
                        console.log('Logado')
                        return done(null,user)
                    }else{
                        return done(null,false,{message:'Senha incorreta'})
                    }
                })
                
            })
        })
    )
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializeUser((id,done)=>{
        Usuario.findById(id).then((user)=>{
            done(null,user)
        }).catch((err)=>{
            done(err)
        })
    })
}