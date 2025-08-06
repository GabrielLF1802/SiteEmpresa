const axios= require('axios')


// Requisições de API do Dummy JSON

class Service{
    async searchProduct(){
        const response= await axios.get('https://dummyjson.com/products');

        return response.data.products 
    }
    async searchByname(name){
        const response= await axios.get(`https://dummyjson.com/products/search?q=${name}`)

        return response.data.products
    }
}

module.exports = new Service()