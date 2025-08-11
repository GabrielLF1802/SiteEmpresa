const mongoose= require('mongoose')
const Schema= mongoose.Schema

const Adress= new Schema({
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
        type:Number,
        required:true
    },
    cidade:{
        type:String,
        required:true
    },
    estado:{
        type:String,
        required:true
    }
})

mongoose.model('adress', Adress)