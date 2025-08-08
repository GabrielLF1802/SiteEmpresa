//Imports
const express= require('express')
const router = express.Router()

const productController = require('../controllers/productController')


// Routes
    // Search
router.get('/product', async (req,res)=>{
    const name= req.query.q
    productController.searchProdcut(req,res,name)
});





module.exports= router