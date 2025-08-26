//Imports
const express= require('express')
const router = express.Router()

const productController = require('../controllers/productController')


// Routes
    // Search
router.get('/product', async (req,res)=>{
    const name= req.query.q.toLowerCase()
    productController.searchProdcut(req,res,name)
});
router.get('/product/unic', async (req,res)=>{
    const unic= req.query.id
    productController.changeProduct(req,res,unic)
})





module.exports= router