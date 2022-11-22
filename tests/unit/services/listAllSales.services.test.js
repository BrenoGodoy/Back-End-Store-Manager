const { expect } = require('chai');
const sinon = require('sinon');
const service = require('../../../services/services');
const model = require('../../../models/models');

describe('Quando listAllSales é chamado na camada de services', () => {
  describe('sem sucesso', async () => {

    before(async () => {

      const execute = null;
      sinon.stub(model, 'listAllSales').resolves(execute);
    });

    after(async () => {
      model.listAllSales.restore();
    });

    it('retorna um objeto com chave code e message', async () => {
      const response = await service.listAllSales();

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('message');

    });
  });

  describe('com sucesso:', () => {
    before(async () => {

      const execute = [
        { sale_id: 1, product_id: 1, quantity: 5 },
        { sale_id: 1, product_id: 2, quantity: 10 },
        { sale_id: 2, product_id: 3, quantity: 15 }
      ];
      sinon.stub(model, 'listAllSales').resolves(execute);
    });

    after(async () => {
      model.listAllSales.restore();
    });

    it('retorna um objeto com chave code e data', async () => {
      const response = await service.listAllSales();

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('data');
    });
  });
});
