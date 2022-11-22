const express = require('express');
const controller = require('./controllers/controllers');
const middlewares = require('./middlewares/middlewares');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', controller.listAll);
app.post('/products', middlewares.validateAdd, controller.addProduct);
app.get('/products/:id', controller.listOne);
app.put('/products/:id', middlewares.validateAdd, controller.attProduct);
app.delete('/products/:id', controller.delProduct);

app.get('/sales', controller.listAllSales);
app.get('/sales/:id', controller.listOneSale);
app.post('/sales', middlewares.validateAddSale, controller.addSale);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
// iniciando o projeto 
module.exports = app;
