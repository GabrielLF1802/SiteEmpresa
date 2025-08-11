// Imports
const mongoose= require('mongoose')
require('../models/user')
require('../models/adress')
const Usuario= mongoose.model('usuarios')
const Adress= mongoose.model('address')
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
    validEnd(data){
        const erros= []
        if(!data.end||data.end==null||data.end==undefined){
            erros.push({texto:'Endereço inválido'})
        }
        if(!data.numero||data.numero==null||data.numero==undefined){
            erros.push({texto:'Número inválido'})
        }
        if(!data.bairro||data.bairro==undefined||data.bairro==null){
            erros.push({texto:'Bairro inválido'})
        }
        if(!data.cep||data.cep==undefined||data.cep==null){
            erros.push({texto:'CEP inválido'})
        }
        if(!data.cidade||data.cidade==undefined||data.cidade==null){
            erros.push({texto:"Cidade inválida"})
        }
        if(!data.estado||data.estado==undefined||data.estado==null){
            erros.push({texto:'Estado inválido'})
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
    async RenderProf(req,res){
        try{
            if(req.isAuthenticated()){
                res.render('user/profile',{user:req.user})
            }
        }catch(err){
            req.flash('error_msg','Erro ao carregar perfil de usuário')
            console.log('Falha ao carregar perfil', err)
    }
    }
    async ProfileEdit(req,res){
        try{
            const user= await Usuario.findOne({_id:req.body.id})
            if(user){
                if(user.nome!= req.body.nome){
                    user.nome= req.body.nome
                    await user.save()
                }
                if(user.email!=req.body.email){
                    user.email=req.body.email
                    await user.save()
                }
                if(user.senha!=req.body.senha){
                    if(req.body.senha== undefined|| req.body.senha == null || !req.body.senha|| req.body.senha.length<4){
                        req.flash('error_msg','Erro ao salvar, confira a sua nova senha')
                        return res.redirect('/user/profile')
                    }else{
                        const salt= await bcrypt.genSalt(10)
                        const novasenha= await bcrypt.hash(req.body.senha, salt)
                        user.senha= novasenha
                        await user.save()
                        req.flash('success_msg','Senha atualizada com sucesso!')
                        return res.redirect('/user/profile')
                    }
                }
                req.flash('success_msg','Perfil atualizado!')
                console.log('Perfil atualizado com sucesso!')
                return res.render('home')
                

            }
        }catch(err){
            req.flash('error_msg','Erro ao salvar atualização de perfil', err)
            res.render('user/profile')
            console.log('Erro ao atualizar perfil', err)

        }

    }
    async addAdress(req,res){
        const erros= this.validEnd(req.body)
        if(erros.length>0){
            return res.render('user/addadress',{erros})
        }
        try{
            if(req.isAuthenticated()){
                const data= req.body
                const newEnd= new Adress({
                    end:data.end,
                    numero:data.numero,
                    bairro:data.bairro,
                    cep:data.bairro,
                    cidade:data.cidade,
                    estado:data.estado,
                    usuario: req.user.id
                })
                await newEnd.save()
                console.log('Novo endereço salvo com sucesso')
                req.flash('success_msg','Novo endreço salvo')
                res.render('user/adress')
            }


        }catch(err){
            console.log('Erro ao salvar novo endreço', err)
            req.flash('error_msg','Erro ao salvar novo endereço')
            res.render('user/adress')
        }
        
    }

}
module.exports= new UserController()