const { expect } = require('chai');
const sinon = require('sinon');
const service = require('../../../services/services');
const model = require('../../../models/models');

describe('Quando a função addProducts é chamada na camada de services', () => {
  const name = 'Blusa do vasco';
  describe('sem sucesso', async () => {
    before(async () => {
      const execute = null;
      sinon.stub(model, 'addProduct').resolves(execute);
    });
    after(async () => {
      model.addProduct.restore();
    });
    it('retorna um objeto com chave code e message', async () => {
      const response = await service.addProduct(name);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('message');
    });
  });
  describe('com sucesso', async () => {
    before(async () => {
      const execute = {id: 4, name: 'Blusa do vasco'};
      sinon.stub(model, 'addProduct').resolves(execute);
    });
    after(async () => {
      model.addProduct.restore();
    });
    it('retorna um objeto com chave code e data', async () => {
      const response = await service.addProduct(name);
      
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('data');
    });
  });
});
