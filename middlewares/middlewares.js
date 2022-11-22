const validateAdd = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validateAddSale = (req, res, next) => {
  const [body] = req.body;

  if (!body.productId) return res.status(400).json({ message: '"productId" is required' });
  if (body.quantity === undefined) { 
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (body.quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

// const validateAttProduct = (req, res, next) => {
//   const { name } = req.body;

//   if (!name) return res.status(400).json({ message: '"name" is required' });
//   if (name.length < 5) {
//     return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
//   } 

//   next();
// };

module.exports = { validateAdd, validateAddSale };
