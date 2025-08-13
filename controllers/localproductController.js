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
                valor:req.body.valor,
                quant:req.body.quant,
                image: req.file ? req.file.path : null
            })
            await newProduct.save()
            console.log('Sucesso ao salvar novo produto')
            req.flash('success_msg','Sucesso ao salvar novo produto')
            res.redirect('/admin/newproduct')
        }catch(err){
            req.flash('error_msg','Erro ao salvar novo produto')
            res.redirect('/admin/newproduct')
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
        if(!data.quant||data.quant==undefined||data.quant==null){
            erros.push({texto:'Quantidade inválida'})
        }
        if(!data.valor||data.valor==undefined||data.valor==null){
            erros.push({texto:'Valor inválido'})
            }else{
        if(data.valor<=0||data.quant<0){
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


    async EditProduct (req,res) {
    const product = await Product.findOne({_id:req.params.id})
    try{
        if(product){
            return res.render('admin/editproduct',{product:product})
        }
    }catch{     
            req.flash('error_msg','Produto não encontrado')
            res.redirect('/admin/products')
        }
}


    async SaveEdit(req,res){
        try{
            const ProductExis= await Product.findOne({_id:req.body.id})
            if(ProductExis){
                ProductExis.nome=req.body.nome,
                ProductExis.desc= req.body.desc,
                ProductExis.valor= req.body.valor,
                ProductExis.quant= req.body.quant

                await ProductExis.save().then(()=>{
                    req.flash('success_msg','Produto Atualizado')
                    res.redirect('/admin/products')
                    console.log('Produto alterado com sucesso!')
                }).catch((err)=>{
                    req.flash('error_msg','Falha ao alterar o produto')
                    res.redirect('/admin/products')
                })
            }
        }catch(err){
            req.flash('error_msg',`Erro ${err}`)
            res.redirect('/admin/products')
        }

    }

    async DeletProduct(req,res){

    try{
        await Product.deleteOne({_id:req.body.id})
        req.flash('success_msg','Produto deletado!')
        res.redirect('/admin/products')
    }catch{
        req.flash('error_msg','Erro ao deletar produto')
        res.redirect('/admin/products')
    }
}
}

module.exports= new ProductController()