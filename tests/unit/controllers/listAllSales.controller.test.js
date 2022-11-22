const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../controllers/controllers');
const service = require('../../../services/services');

describe('Quando listAllSales é chamado na camada de controllers', () => {
  describe('Sem sucesso', async () => {

    const req = {};
    const res = {};

    before(async () => {

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const execute = { code: 400, message: 'No Sales were found' };
      sinon.stub(service, 'listAllSales').resolves(execute);
    });
    after(async () => {
      service.listAllSales.restore();
    });

    it('retorna status code 400 e message "No Sales were found"', async () => {
      await controller.listAllSales(req, res);

      expect(res.status.calledWith(400)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'No Sales were found' })).to.be.equal(true);

    });
  });
  describe('Com sucesso:', async () => {
    const req = {};
    const res = {};
    const responseStub = [{ "saleId": 1, "productId": 1, "quantity": 5, "date": "data" }, { "saleId": 1, "productId": 2, "quantity": 10, "date": "data" }, { "saleId": 2, "productId": 3, "quantity": 15, "date": "data" }];

    before(async () => {

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const execute = { code: 200, data: responseStub };
      sinon.stub(service, 'listAllSales').resolves(execute);
    });
    after(async () => {
      service.listAllSales.restore();
    });
    it('retorna status code 200 e os dados corretos', async () => {
      await controller.listAllSales(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(responseStub)).to.be.equal(true);
    });
  });
});
