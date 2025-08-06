const axios = require('axios');

(async () => {
  try {
    const resposta = await axios.get('https://dummyjson.com/products/search?q=phone');
    const produtos = resposta.data.products; 

    if (Array.isArray(produtos)) {
      produtos.forEach(produto => {
        console.log('Título:', produto.title);
        console.log('Preço:', produto.price);
        console.log('Imagem:', produto.thumbnail);
        console.log('Descrição:', produto.description);
        console.log('---');
      });
    } else {
      console.error('A resposta não contém um array de produtos.');
    }

  } catch (err) {
    console.error('Erro ao buscar produtos:', err.response?.status, err.message);
  }
})();
