const service = require('../helpers/productService')




class Product{
    async searchProdcut(req,res,name){
        try{
            const product= await service.searchByname(name)
            if(!product){
                console.log('Produto não encontrado')
                req.flash('error_msg','Produto não foi encontrado')
            }
            product.forEach(product =>{
                console.log('Título:', product.title);
                console.log('Imagem:', product.thumbnail); 
                console.log('---');
            })
            res.render('products/searchproduct')
        }catch(err){
            req.flash('error_msg','Erro ao carregar produtos',err)
            console.log(err)

        }    

        // for each
        // Deve veincular a barra de pesquisa para mandar o nome para productService ( variável ' name ' da função)
    }
}



module.exports= new Product()