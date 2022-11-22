const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../controllers/controllers');
const service = require('../../../services/services');

describe('Quando listOneSale é chamada na camada de controllers', () => {
  describe('Sem sucesso:', async () => {
    const req = {};
    const res = {};

    before(async () => {

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const execute = { code: 404, message: 'Sale not found' };
      sinon.stub(service, 'listOneSale').resolves(execute);
    });
    after(async () => {
      service.listOneSale.restore();
    });

    it('retorna status code 404 e message "Sale not found"', async () => {
      await controller.listOneSale(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    });
  });
  describe('Com sucesso:', async () => {
    const req = {};
    const res = {};
    const responseStub = [{ "productId": 1, "quantity": 5, "date": "data" }, { "productId": 2, "quantity": 10, "date": "data" }];

    before(async () => {

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const execute = { code: 200, data: responseStub };
      sinon.stub(service, 'listOneSale').resolves(execute);
    });
    after(async () => {
      service.listOneSale.restore();
    });

    it('retorna status code 200 e os dados corretos', async () => {
      await controller.listOneSale(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(responseStub)).to.be.equal(true);
    });
  });
});
