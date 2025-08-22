const service = require('../helpers/productService')




class Product{
    async searchProdcut(req,res,name){
        try{
            const product= await service.searchByname(name)
            if(!product){
                console.log('Produto não encontrado')
                req.flash('error_msg','Produto não foi encontrado')
            }
            console.log(product)
            res.render('products/searchproduct',{product:product})
        }catch(err){
            req.flash('error_msg','Erro ao carregar produtos',err)
            console.log(err)

        }    


    }
}



module.exports= new Product()