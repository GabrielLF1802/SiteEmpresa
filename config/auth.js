const LocalStrategy= require('passport-local').Strategy
const bcrypt= require('bcryptjs')

// Model
const mongoose= require('mongoose')
require('../models/user')
const Usuario= mongoose.model('usuarios')

// Authenticate 

momdule.exports= function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email', passwordField:'senha'},(email,senha,done)=>{
            Usuario.findOne({email:email}).then((usuario)=>{
                if(!usuario){
                    return done(null,false,{message:"Usuário não cadastrado"})
                }
                bcrypt.compare(senha, usuario.senha, (erro,batem)=>{
                    if(batem){
                        return done(null,usuario)
                    }else{
                        return done(null,false,{message:'Senha incorreta'})
                    }
                })
                
            })
        })
    )
    passport.serializeUser((usuario,done)=>{
        done(null,usuario.id)
    })
    passport.desirializeUser((id,done)=>{
        Usuario.findById(id).then((usuario)=>{
            done(null,usuario)
        }).catch((err)=>{
            done(err)
        })
    })
}