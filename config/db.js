if(process.env.NODE_ENV == 'production'){
    module.exports= {mongoURI: 'link do db '}
}else{
    module.exports={mongoURI:'mongodb://localhost/empresa'}
}