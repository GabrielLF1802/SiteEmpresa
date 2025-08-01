// Imports
const express= require('express')
const router = express.Router()
// Db
const mongoose= require('mongoose')
require('../models/product')
const Product= mongoose.model('products')

// Routes Register New Product

router.get('/newproduct',(req,res)=>{
    res.render('admin/newproduct')
})
router.post('/newproduct',(req,res)=>{
    const erros = []
    if(!req.body.nome||req.body.nome==undefined||req.body.nome==null){
        erros.push({texto:'Nome inválido'})
    }
    if(!req.body.desc||req.body.desc==undefined||req.body.desc==null){
        erros.push({texto:'Descrição inválida'})
    }
    if(!req.body.valor||req.body.valor==undefined||req.body.valor==null){
        erros.push({texto:'Valor inválido'})
    }else{
        if(valor<=0){
            erros.push({texto:'Não pode haver um valor negativo'})
        }
    }

})

class newProduct{
    async RegisterProduct(req,res){

    }
}









module.exports= router