const express = require('express');
const inventoryRouter = require('./inventory/inventoryRouter');

const server = express();

server.use(express.json());

server.use('/api', inventoryRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Inventory App' });
});

module.exports = server;
