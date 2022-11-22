const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../controllers/controllers');
const service = require('../../../services/services');

describe('Quando addProduct é chamado na camada de controllers', () => {
  describe('sem sucesso', async () => {
    const req = {};
    const res = {};

    before(async () => {

      req.body = { name: 'Blusa do vasco' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const execute = { code: 404, message: 'Algo deu errado' };
      sinon.stub(service, 'addProduct').resolves(execute);
    });
    after(async () => {
      service.addProduct.restore();
    });

    it('retorna status code 404 e message "Algo deu errado"', async () => {
      const response = await controller.addProduct(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Algo deu errado' })).to.be.equal(true);
    });
  });
  describe('com sucesso', async () => {
    const req = {};
    const res = {};
    const responseStub = { id: 4, name: 'Blusa do vasco' };

    before(async () => {

      req.body = { name: 'Blusa do vasco' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const execute = { code: 201, data: responseStub };
      sinon.stub(service, 'addProduct').resolves(execute);
    });
    after(async () => {
      service.addProduct.restore();
    });
    it('retorna status code 201 e os dados corretos', async () => {
      const response = await controller.addProduct(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(responseStub)).to.be.equal(true);
    });
  });
});
