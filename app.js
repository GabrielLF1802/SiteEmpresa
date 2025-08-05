// Imports
const express = require('express')
const bodyParser= require('body-parser')
const {engine} = require('express-handlebars')
const app= express()
const path = require('path')
const session= require('express-session')
const flash = require('connect-flash')
// DB
const mongoose = require('mongoose')
const db = require('./config/db')
// Routes
const usuario= require('./routes/user')
const admin= require('./routes/admin')
// Authenticate
const passport= require('passport')
require('./config/auth')(passport)



// Configs 
    // Session
    app.use(session({
        secret:"appnode",
        resave:true,
        saveUninitialized:true
    }))

    app.use(passport.initialize());
    app.use(passport.session())
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
        app.use('/admin',admin)










const PORT = process.env.PORT || 8081
app.listen(PORT, ()=>{
    console.log('Server Started!')
} )