const models = require('../models/models');

const listAll = async () => {
  const response = await models.listAll();
  if (!response) return { code: 400, message: 'No products were found' };

  const statusCodeResponse = { code: 200, data: response };
  return statusCodeResponse;
};

const listOne = async (id) => {
  const response = await models.listOne(id);
  if (!response) return { code: 404, message: 'Product not found' };

  const statusCodeResponse = { code: 200, data: response };
  return statusCodeResponse;
};

const addProduct = async (name) => {
  const response = await models.addProduct(name);
  if (!response) return { code: 404, message: 'Algo deu errado' };

  const statusCodeResponse = { code: 201, data: response };
  return statusCodeResponse;
};

const addSale = async (body) => {
  const validate = async () => {
    const ids = body.map((e) => e.productId);
    const idsExists = await Promise.all(ids.map(async (id) => models.listOne(id)));
    console.log(idsExists);
    if (idsExists.includes(null)) return true;
    return false;
  };

  const validId = await validate();
  if (validId) return { code: 404, message: 'Product not found' };

  const id = await models.createSale();
  await Promise.all(body.map(async ({ productId, quantity }) => {
    await models.addSale({ productId, quantity }, id);
  }));

  const statusCodeResponse = { code: 201, data: { id, itemsSold: body } };
  return statusCodeResponse;
};

const listAllSales = async () => {
  const response = await models.listAllSales();
  if (!response) return { code: 400, message: 'No Sales were found' };
  const camelCaseResponse = response.map((element) => ({
        saleId: element.sale_id,
        productId: element.product_id,
        quantity: element.quantity,
        date: 'data',
      }));
  const statusCodeResponse = { code: 200, data: camelCaseResponse };
  return statusCodeResponse;
};

const listOneSale = async (id) => {
  const response = await models.listOneSale(id);
  if (!response) return { code: 404, message: 'Sale not found' };
  const camelCaseResponse = response.map((e) => ({
    productId: e.product_id,
    quantity: e.quantity,
    date: 'data',
  }));

  const statusCodeResponse = { code: 200, data: camelCaseResponse };
  return statusCodeResponse;
};

const attProduct = async ({ id, name }) => {
  const findProduct = await models.listOne(id);
  if (!findProduct) return { code: 404, message: 'Product not found' };
    
  const response = await models.attProduct({ id, name });
  // if (!response) return { code: 404, message: 'Product not found' };

  const statusCodeResponse = { code: 200, data: response };
  return statusCodeResponse;
};

const delProduct = async (id) => {
  const findProduct = await models.listOne(id);
  if (!findProduct) return { code: 404, message: 'Product not found' };

  await models.delProduct(id);
  // if (!response) return { code: 404, message: 'Product not found' };

  return { code: 204 };
};

module.exports = {
  listAll, listOne, addProduct, addSale, listAllSales, listOneSale, attProduct, delProduct,
};
