// Imports
const express= require('express')
const router = express.Router()
// Db
const mongoose= require('mongoose')
require('../models/product')
const Product= mongoose.model('products')

// Controllers
const ProductController= require('../controllers/productController')

// Routes Register New Product

router.get('/newproduct',(req,res)=>{
    res.render('admin/newproduct')
})
router.post('/newproduct',(req,res)=>{
    ProductController.RegisterProduct(req,res)
})

// Routes List Products

router.get('/products',(req,res)=>{
    ProductController.ListProducts(req,res)
})
router.get('/products/edit/:id',(req,res)=>{
    Product.findOne({_id:req.params.id}).then((product)=>{
        res.render('admin/editproduct',{product:product})
    }).catch((err)=>{
        req.flash('error_msg','Produto não encontrado')
        res.render('admin/products')
    })
})

router.post('/products/edit',(req,res)=>{
    Product.findOne({_id:req.body.id}).then((product)=>{
        product.nome= req.body.nome,
        product.desc= req.body.desc,
        product.valor= req.body.valor

        product.save().then(()=>{
            req.flash('success_msg','Produto atualizado!')
            console.log('Produto atualizado com sucesso')
            res.render('admin/products')
        }).catch((err)=>{
            req.flash('error_msg','Erro ao atualizar o produto')
            res.render('admin/products')
        })
    }).catch((err)=>{
        req.flash('error_msg',`Erro ${err}`)
        res.render('admin/products')
    })


})















module.exports= router