const db = require('../../data/dbConfig');
const Inventory = require('./inventoryModel');

beforeEach(async () => {
  await db('products').truncate();
});

const testItems = {
  item1: {
    name: 'Iphone',
    category: 'Phone',
    serial: 'KHFKSEK9873Y539',
  },
  item2: {
    name: 'Samsung',
    category: 'Tablet',
    serial: 'KSNNEJOR3893-3KNS',
  },
};

describe('Inventory', () => {
  describe('Inventory Model', () => {
    it('Should get all products', async () => {
      const products = await Inventory.getAll();
      expect(products).toHaveLength(0);
    });

    it('Should add a product', async () => {
      const { item1 } = testItems;
      let products = await Inventory.getAll();
      expect(products).toHaveLength(0);

      await Inventory.insert(item1);
      products = await Inventory.getAll();
      expect(products).toHaveLength(1);
      expect(products[0]).toHaveProperty('name', item1.name);
      expect(products[0]).toHaveProperty('category', item1.category);
      expect(products[0]).toHaveProperty('serial', item1.serial);
    });

    it('Should get a product by id', async () => {
      const { item1 } = testItems
      await Inventory.insert(item1);
      const product = await Inventory.findById(1);
      expect(product).toHaveProperty('name', item1.name);
      expect(product).toHaveProperty('category', item1.category);
      expect(product).toHaveProperty('serial', item1.serial);
    });

    it('Should delete a product', async () => {
      const { item1, item2 } = testItems
      await Inventory.insert(item1);
      await Inventory.insert(item2);
      await Inventory.remove(1);
      const products = await Inventory.getAll();
      expect(products).toHaveLength(1);
      expect(products[0]).toHaveProperty('name', item2.name);
    });
  });
});
