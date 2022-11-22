const { expect } = require('chai');
const sinon = require('sinon');
const service = require('../../../services/services');
const model = require('../../../models/models');

describe('Quando list All é chamado na camada de services', () => {
  describe('sem sucesso', async () => {

    before(async () => {

      const execute = null;
      sinon.stub(model, 'listAll').resolves(execute);
    });

    after(async () => {
      model.listAll.restore();
    });

    it('retorna um objeto com chave code e message', async () => {
      const response = await service.listAll();

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('message');

    });
  });

  describe('com sucesso:', () => {
    before(async () => {

      const execute = [{ "id": 1, "name": "Martelo de Thor" }, { "id": 2, "name": "Traje de encolhimento" }, { "id": 3, "name": "Escudo do Capitão América" }];
      sinon.stub(model, 'listAll').resolves(execute);
    });

    after(async () => {
      model.listAll.restore();
    });

    it('retorna um objeto com chave code e data', async () => {
      const response = await service.listAll();
      
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('data');
    });
  });
});