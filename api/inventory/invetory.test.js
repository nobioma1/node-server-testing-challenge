const db = require('../../data/dbConfig');
const Inventory = require('./inventoryModel');

beforeEach(async () => {
  await db('products').truncate();
});

describe('Inventory', () => {
  describe('Inventory Model', () => {
    it('Should get all products', async () => {
      const products = await Inventory.getAll();
      expect(products).toHaveLength(0);
    });
  });
});
