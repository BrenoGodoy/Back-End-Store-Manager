const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const model = require('../../../models/models');

describe('Quando addProducts é chamado na camada de models', () => {
  const name = 'Blusa do vasco';
  describe('com sucesso', () => {
    before(async () => {
      const execute = [{
        fieldCount: 0,
        affectedRows: 1,
        insertId: 4,
        info: '',
        serverStatus: 2,
        warningStatus: 0
}];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto com chaves id e name', async () => {
      const response = await model.addProduct(name);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
    });
    it('o objeto contêm os valores corretors', async () => {
      const response = await model.addProduct(name);

      expect(response.id).to.be.equal(4);
      expect(response.name).to.be.equal('Blusa do vasco');
    });
  });
});
