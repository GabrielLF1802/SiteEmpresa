// Imports
const express= require('express')
const router = express.Router()
// Db
const mongoose= require('mongoose')
require('../models/product')
const Product= mongoose.model('products')

// Controllers
const ProductController= require('../controllers/localproductController')

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
    ProductController.EditProduct(req,res)    
})



router.post('/products/edit',(req,res)=>{
    ProductController.SaveEdit(req,res)
})




router.post('/products/delet',(req,res)=>{
    ProductController.DeletProduct(req,res)
})

















module.exports= router