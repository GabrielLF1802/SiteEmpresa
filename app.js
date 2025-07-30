// Imports

const express = require('express')
const session= require('express-session')
const bodyParser= require('body-parser')
const {engine} = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const app= express()
const db = require('./config/db')
const usuario= require('./routes/user')

// Configs 
    // Session
    app.use(session({
        secret:"appnode",
        resave:true,
        saveUninitialized:true
    }))
    // Flash
    app.use(flash());
    
    // Handlebars
    app.engine('handlebars', engine({defaultLayout:'main',runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }}))
    app.set('view engine', 'handlebars')

    
    // Middleware
    app.use((req,res,next)=>{
        res.locals.success_msg= req.flash('success_msg')
        res.locals.error_msg= req.flash('error_msg')
        res.locals.error= req.flash('error')
        res.locals.user= req.user || null
        
        next()
    })
    // Body-parser
        app.use(bodyParser.urlencoded({extended:true}))
        app.use(bodyParser.json())
    // Public
        app.use(express.static(path.join(__dirname,'public')))
    // Mongoose
        mongoose.Promise= global.Promise
        mongoose.connect(db.mongoURI).then(() => {
            console.log('Connected to Mongodb')
        }).catch((erro)=>{
            console.log('Falha ao conectar' + erro)
        })

// Rotas

    // Usuários     
        app.use('/user',usuario)

    // Admin


    








const PORT = process.env.PORT || 8081
app.listen(PORT, ()=>{
    console.log('Server Started!')
} )