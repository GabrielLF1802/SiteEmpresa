const mongoose= require('mongoose')
const Schema= mongoose.Schema

const Address= new Schema({
    end:{
        type:String,
        required:true
    },
    bairro:{
        type:String,
        required:true
    },
    numero:{
        type:Number,
        required:true
    },
    cep:{
        type:String,
        required:true
    },
    cidade:{
        type:String,
        required:true
    },
    estado:{
        type:String,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'usuarios',
        required:true
    }
})

mongoose.model('address', Address)