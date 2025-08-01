// Imports
const mongoose= require('mongoose')
const Schema= mongoose.Schema

const Product= new Schema({
    nome:{
        typeof:String,
        required:true
    },
    desc:{
        typeof:String,
        required:true
    },
    valor:{
        typeof:Number,
        required:true
    }
})
mongoose.model('products', Product)