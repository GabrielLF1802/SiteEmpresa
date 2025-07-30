const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario= new Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    nasc:{
        type:Date,
        required: true
    },
    senha:{
        type:String,
        required: true
    },
    data:{
        type: Date,
        default: Date.now()
    },
    eAdmin:{
        type: Number,
        default: 0 
    }
})

mongoose.model('usuarios', Usuario)