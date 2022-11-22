const service = require('../services/services');

const listAll = async (req, res) => {
  const { code, data, message } = await service.listAll();
  if (message) return res.status(code).json({ message });

  return res.status(code).json(data);
};

const listOne = async (req, res) => {
  const { id } = req.params;

  const { code, data, message } = await service.listOne(id);
  if (message) return res.status(code).json({ message });

  return res.status(code).json(data[0]);
};

const addProduct = async (req, res) => {
  const { name } = req.body;

  const { code, data, message } = await service.addProduct(name);
  if (message) return res.status(code).json({ message });

  return res.status(code).json(data);
};

const addSale = async (req, res) => {
  const { code, data, message } = await service.addSale(req.body);
  if (message) return res.status(code).json({ message });

  return res.status(code).json(data);
};

const listAllSales = async (req, res) => {
  const { code, data, message } = await service.listAllSales();

  if (message) return res.status(code).json({ message });
  return res.status(code).json(data);
};

const listOneSale = async (req, res) => {
  const { id } = req.params;

  const { code, data, message } = await service.listOneSale(id);
  if (message) return res.status(code).json({ message });

  return res.status(code).json(data);
};

const attProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { code, data, message } = await service.attProduct({ id, name });
  if (message) return res.status(code).json({ message });

  return res.status(code).json(data);
};

const delProduct = async (req, res) => {
  const { id } = req.params;

  const { code, message } = await service.delProduct(id);
  if (message) return res.status(code).json({ message });

  return res.status(code).json();
};

module.exports = {
  listAll, listOne, addProduct, addSale, listAllSales, listOneSale, attProduct, delProduct,
};
