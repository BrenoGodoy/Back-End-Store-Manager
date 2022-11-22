const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../controllers/controllers');
const service = require('../../../services/services');

describe('Quando listAll é chamado na camada de controllers', () => {
  describe('Sem sucesso', async () => {

    const req = {};
    const res = {};

    before(async () => {

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const execute = { code: 400, message: 'No products were found' };
      sinon.stub(service, 'listAll').resolves(execute);
    });
    after(async () => {
      service.listAll.restore();
    });

    it('retorna status code 400 e message "No products were found"', async () => {
      await controller.listAll(req, res);

      expect(res.status.calledWith(400)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'No products were found'})).to.be.equal(true);

    });
  });
  describe('Com sucesso:', async () => {
    const req = {};
    const res = {};
    const responseStub = [{ "id": 1, "name": "Martelo de Thor" }, { "id": 2, "name": "Traje de encolhimento" }, { "id": 3, "name": "Escudo do Capitão América" }];

    before(async () => {

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const execute = { code: 200, data: responseStub };
      sinon.stub(service, 'listAll').resolves(execute);
    });
    after(async () => {
      service.listAll.restore();
    });
    it('retorna status code 200 e os dados corretos', async () => {
      await controller.listAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(responseStub)).to.be.equal(true);
    });
  });
});