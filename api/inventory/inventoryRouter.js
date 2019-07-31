const inventoryRouter = require('express').Router();
const Inventory = require('./inventoryModel');

inventoryRouter.get('/inventory', async (req, res) => {
  const products = await Inventory.getAll();
  res.status(200).json(products);
});

inventoryRouter.delete('/inventory/:id', async (req, res) => {
  try {
    const product = await Inventory.remove(req.params.id);
    if (product) {
      return res.status(204).end();
    }
    throw new Error();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
});

inventoryRouter.post('/inventory', async (req, res) => {
  try {
    const product = await Inventory.insert(req.body);
    return res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
});

module.exports = inventoryRouter;
