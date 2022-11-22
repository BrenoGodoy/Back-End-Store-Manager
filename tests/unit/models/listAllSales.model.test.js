const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const model = require('../../../models/models');

describe('Quando listAllSales é chamado na camada de models', () => {
  describe('Sem sucesso:', () => {

    before(async () => {
      const execute = [];
      sinon.stub(connection, 'execute').resolves([execute]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const response = await model.listAllSales();

      expect(response).to.be.null;
    });
  });
  describe('Com sucesso:', () => {

    before(async () => {
      const execute = [
        { sale_id: 1, product_id: 1, quantity: 5 },
        { sale_id: 1, product_id: 2, quantity: 10 },
        { sale_id: 2, product_id: 3, quantity: 15 }
      ]
;
      sinon.stub(connection, 'execute').resolves([execute]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await model.listAllSales();

      expect(response).to.be.a('array');
    });
    it('o objeto tem as chaves corretas', async () => {
      const response = await model.listAllSales();
      response.forEach(r => {
        expect(r).to.be.a('object');
        expect(r).to.have.a.property('sale_id');
        expect(r).to.have.a.property('product_id');
        expect(r).to.have.a.property('quantity');
      })
    });
  });
});
