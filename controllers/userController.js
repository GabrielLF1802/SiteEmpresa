// Imports
const mongoose= require('mongoose')
require('../models/user')
const Usuario= mongoose.model('usuarios')
const bcrypt= require('bcryptjs')

class UserController{
    async register (req,res){
        const erros = this.ValidUser(req.body)
        
        if(erros.length>0){
            return res.render('user/register', {erros})
        }
        try{
            const UserExist= await Usuario.findOne({email:req.body.email})
            if(UserExist){
                req.flash('error_msg','Email já cadastrado')
                return res.render('user/register')
            }
            const hashpassword= await this.gerarhash(req.body.senha)
            const newUser= new Usuario({
                nome:req.body.nome,
                senha:hashpassword,
                email:req.body.email,
                nasc:req.body.nasc
                })
            await newUser.save()
            console.log('Sucesso')
            req.flash('success_msg','Novo usuário registrado com sucesso')
            res.render('home')
        }catch(err){
            console.log(err)
            req.flash('error_msg','Erro ao registrar novo usuário')
            res.render('home')

        }
    }
    ValidUser(data){
        const erros= []
        if(!data.email|| data.email== undefined|| data.email== null){
            erros.push({texto:'Email inválido'})
        }
        if(!data.nome|| data.nome== undefined|| data.nome== null){
            erros.push({texto:'Nome inválido'})
        }
        if(!data.senha||data.senha==undefined||data.senha==null){
            erros.push({texto:'Senha inválida'})
        }else{
            if(data.senha.length<4){
                erros.push({texto:'Senha muito curta'})
            }
            if(data.senha != data.senha2){
                erros.push({texto:'As senhas não conhecidem'})
            }
        }
        if(!data.nasc|| data.nasc== undefined || data.nasc==null){
            erros.push({texto:'Data de nasc. inválida'})
        }
        return erros
    }
    async gerarhash(senha){
        const salt= await bcrypt.genSalt(10)
        const hash= await bcrypt.hash(senha,salt)
        return hash
    }
    async Sair(req,res,next){
    await req.logout(function(err){
        if(err){
            return next(err)
        }
        req.flash('success_msg','Deslogado com sucesso!')
        res.redirect('/user/')
    })
}

}
module.exports= new UserController()