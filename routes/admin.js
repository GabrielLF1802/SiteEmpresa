// Imports
const express= require('express')
const router = express.Router()
// Db
const mongoose= require('mongoose')
require('../models/product')
const Product= mongoose.model('products')

// Controllers
const newProduct= require('../controllers/productController')

// Routes Register New Product

router.get('/newproduct',(req,res)=>{
    res.render('admin/newproduct')
})
router.post('/newproduct',(req,res)=>{
    newProduct.RegisterProduct(req,res)
})











module.exports= router