module.exports={
    eAdmin: function(req,res,next){
        if(req.isAuthenticated()&&req.user.eAdmin==1){
            return next()
        }
        req.flash('error_msg','É preciso ser um admin para acessar essa rota ')
        res.redirect('/user/')
    }
}