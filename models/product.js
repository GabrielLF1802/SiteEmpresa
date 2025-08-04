// Imports
const mongoose= require('mongoose')
const Schema= mongoose.Schema

const Product= new Schema({
    nome:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    valor:{
        type:Number,
        required:true
    },
    quant:{
        type:Number,
        default:0
    }
})
mongoose.model('products', Product)