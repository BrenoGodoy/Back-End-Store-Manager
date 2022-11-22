const connection = require('./connection');

const listAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  if (products.length === 0 || !products) return null;
  return products;
};

const listOne = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );
  if (product.length === 0 || !product) return null;
  return product;
};

const addProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );
  
  return { id: insertId, name };
};

const createSale = async () => {
  const date = '2002-11-18 00:00:00';
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)', [date],
  );

  return insertId;
};

const addSale = async ({ productId, quantity }, insertId) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, productId, quantity],
    );
  
  return true;
};

const listAllSales = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );
  if (sales.length === 0 || !sales) return null;
  return sales;
};

const listOneSale = async (id) => {
  const [sale] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?', [id],
  );
  if (sale.length === 0 || !sale) return null;
  return sale;
};

const attProduct = async ({ id, name }) => {
  const [product] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id],
  );
  if (product.length === 0 || !product) return null;
  return { id, name };
};

const delProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [id],
  );

  return 'sucess';
};

module.exports = {
  listAll,
  listOne,
  addProduct,
  addSale,
  createSale,
  listAllSales,
  listOneSale,
  attProduct,
  delProduct,
};
