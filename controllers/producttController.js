const service = require('../helpers/productService')




class Product{

    async searchProdcut(req,res){
        const product= await service.searchByname()

        // for each
        // Deve veincular a barra de pesquisa para mandar o nome para productService ( variável ' name ' da função)
    }
}



module.exports= new Product()