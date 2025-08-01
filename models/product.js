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
    }
})
mongoose.model('products', Product)