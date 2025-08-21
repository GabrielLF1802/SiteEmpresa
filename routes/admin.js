// Imports
const express= require('express')
const router = express.Router()
// Db
const mongoose= require('mongoose')
require('../models/product')
const Product= mongoose.model('products')
require('../config/multer')
const {eAdmin}= require('../helpers/eAdmin')


// Controllers
const ProductController= require('../controllers/localproductController')
const upload = require('../config/multer')

// Routes Register New Product

router.get('/newproduct', eAdmin, (req,res)=>{
    res.render('admin/newproduct')
})
router.post('/newproduct',eAdmin,  upload.array('images',5),(req,res)=>{
    ProductController.RegisterProduct(req,res)
})

// Routes List Products

router.get('/products', eAdmin, (req,res)=>{
    ProductController.ListProducts(req,res)
})
router.get('/products/edit/:id', eAdmin, upload.array('images',5), (req,res)=>{
    ProductController.EditProduct(req,res)    
})



router.post('/products/edit', eAdmin, upload.array("images",5), (req,res)=>{
    ProductController.SaveEdit(req,res)
})




router.post('/products/delet', eAdmin, (req,res)=>{
    ProductController.DeletProduct(req,res)
})

















module.exports= router