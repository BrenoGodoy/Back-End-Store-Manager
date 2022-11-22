const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const model = require('../../../models/models')

describe('Quando listOne é chamado na camada de models', () => {
  const id = 1;
  describe('Sem sucesso:', () => {
    
    before(async () => {
      const execute = [];
      sinon.stub(connection, 'execute').resolves([execute]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const response = await model.listOne(id);

      expect(response).to.be.null;
    });
  });
  describe('Com sucesso:', () => {

    before(async () => {
      const execute = [{ "id": 1, "name": "Martelo de Thor" }];
      sinon.stub(connection, 'execute').resolves([execute]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array com 1 objeto', async () => {
      const response = await model.listOne(id);

      expect(response).to.be.a('array');
      expect(response.length).to.be.equal(1);
    });
    it('os objeto tem as chaves corretas', async () => {
      const response = await model.listOne(id);
      response.forEach(r => {
        expect(r).to.be.a('object');
        expect(r).to.have.a.property('id');
        expect(r.id).to.be.equal(1);
        expect(r).to.have.a.property('name');
      });
    });
  });
});
