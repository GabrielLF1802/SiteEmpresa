// Imports
const mongoose= require('mongoose')
require('../models/product')
const Product= mongoose.model('products')


class ProductController{
    async RegisterProduct(req,res){
        const erros = this.VerifErros(req.body)
        if(erros.length>0){
            res.render('admin/newproduct',{erros})
        }
        try{
            const ProductExis= await Product.findOne({nome:req.body.nome})
            if(ProductExis){
                req.flash('error_msg','Produto já cadastrado com o mesmo nome')
                return res.render('admin/newproduct')
            }
            const newProduct = new Product({
                nome:req.body.nome,
                desc:req.body.desc,
                valor:req.body.valor
            })
            await newProduct.save()
            console.log('Sucesso ao salvar novo produto')
            req.flash('success_msg','Sucesso ao salvar novo produto')
            res.render('admin/newproduct')
        }catch(err){
            req.flash('error_msg','Erro ao salvar novo produto')
            res.render('admin/newproduct')
        }
    }
    VerifErros(data){
        const erros=[]
        if(!data.nome||data.nome==undefined||data.nome==null){
            erros.push({texto:'Nome inválido'})
        }
        if(!data.desc||data.desc==undefined||data.desc==null){
            erros.push({texto:'Descrição inválida'})
        }
        if(!data.valor||data.valor==undefined||data.valor==null){
            erros.push({texto:'Valor inválido'})
            }else{
        if(data.valor<=0){
            erros.push({texto:'Não pode haver um valor negativo'})
        }
        }
        return erros
        
    }
    async ListProducts(req,res){
        try{
            const products = await Product.find()
            return res.render('admin/products',{products:products})
        }catch(err){
            console.log('Erro ao listar os produtos')
            req.flash('error_msg','Erro ao listar os produtos')
            res.render('home')
        }
    }
}

module.exports= new ProductController()