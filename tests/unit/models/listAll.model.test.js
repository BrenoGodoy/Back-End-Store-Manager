const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const model = require('../../../models/models');

describe('Quando listAll é chamado na camada de models', () => {
  describe('Sem sucesso:', () => {

    before(async () => {
      const execute = [];
      sinon.stub(connection, 'execute').resolves([execute]);
    });
    after(async () => {
      connection.execute.restore();
    });
    
    it('retorna null', async () => {
      const response = await model.listAll();

      expect(response).to.be.null;
    });
  });
  describe('Com sucesso:', () => {

    before(async () => {
      const execute = [{ "id": 1, "name": "Martelo de Thor" }, { "id": 2, "name": "Traje de encolhimento" }, { "id": 3, "name": "Escudo do Capitão América" }];
      sinon.stub(connection, 'execute').resolves([execute]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await model.listAll();

      expect(response).to.be.a('array');
    });
    it('o objeto tem as chaves corretas', async () => {
      const response = await model.listAll();
      response.forEach(r => {
        expect(r).to.be.a('object');
        expect(r).to.have.a.property('id');
        expect(r).to.have.a.property('name');
      })
    });
  });
});