const { expect } = require('chai');
const sinon = require('sinon');
const service = require('../../../services/services');
const model = require('../../../models/models');

describe('Quando listOne é chamada na camada de services', () => {
  const id = 1;
  describe('sem sucesso', async () => {

    before(async () => {

      const execute = null;
      sinon.stub(model, 'listOne').resolves(execute);
    });

    after(async () => {
      model.listOne.restore();
    });

    it('retorna um objeto com chave code e message', async () => {
      const response = await service.listOne(id);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('message');

    });
  });
  describe('Com sucesso', () => {

    before(async () => {
      const execute = [{ "id": 1, "name": "Martelo de Thor" }];
      sinon.stub(model, 'listOne').resolves(execute);
    });

    after(async () => {
      model.listOne.restore();
    });
  
    it('retorna um objeto com chave code e data', async () => {
      const response = await service.listOne(id);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('data');

    });
  });
});