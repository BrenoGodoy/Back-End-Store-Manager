const { expect } = require('chai');
const sinon = require('sinon');
const service = require('../../../services/services');
const model = require('../../../models/models');

describe('Quando listOneSale é chamada na camada de services', () => {
  const id = 1;
  describe('sem sucesso', async () => {

    before(async () => {

      const execute = null;
      sinon.stub(model, 'listOneSale').resolves(execute);
    });

    after(async () => {
      model.listOneSale.restore();
    });

    it('retorna um objeto com chave code e message', async () => {
      const response = await service.listOneSale(id);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('message');

    });
  });
  describe('Com sucesso', () => {

    before(async () => {
      const execute = [
        { sale_id: 1, product_id: 1, quantity: 5 },
        { sale_id: 1, product_id: 2, quantity: 10 }
      ];
      sinon.stub(model, 'listOneSale').resolves(execute);
    });

    after(async () => {
      model.listOneSale.restore();
    });

    it('retorna um objeto com chave code e data', async () => {
      const response = await service.listOneSale(id);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('data');

    });
  });
});
