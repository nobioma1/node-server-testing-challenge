const inventoryRouter = require('express').Router();
const Inventory = require('./inventoryModel');

inventoryRouter.get('/inventory', async (req, res) => {
  const products = await Inventory.getAll();
  res.status(200).json(products);
});

module.exports = inventoryRouter;
