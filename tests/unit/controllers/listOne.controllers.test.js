const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../controllers/controllers');
const service = require('../../../services/services');

describe('Quando listOne é chamada na camada de controllers', () => {
  describe('Sem sucesso:', async () => {
    const req = {};
    const res = {};

    before(async () => {

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const execute = { code: 404, message: 'Product not found' };
      sinon.stub(service, 'listOne').resolves(execute);
    });
    after(async () => {
      service.listOne.restore();
    });

    it('retorna status code 404 e message "Product not found"', async () => {
      await controller.listOne(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });
  describe('Com sucesso:', async () => {
    const req = {};
    const res = {};
    const responseStub = [{ "id": 1, "name": "Martelo de Thor" }];

    before(async () => {

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const execute = { code: 200, data: responseStub };
      sinon.stub(service, 'listOne').resolves(execute);
    });
    after(async () => {
      service.listOne.restore();
    });

    it('retorna status code 200 e os dados corretos', async () => {
      await controller.listOne(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(responseStub[0])).to.be.equal(true);
    });
  });
});
