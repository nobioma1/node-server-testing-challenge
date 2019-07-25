const request = require('supertest');
const db = require('../../data/dbConfig');
const Inventory = require('./inventoryModel');
const server = require('../server');

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
      const { item1 } = testItems;
      await Inventory.insert(item1);
      const product = await Inventory.findById(1);
      expect(product).toHaveProperty('name', item1.name);
      expect(product).toHaveProperty('category', item1.category);
      expect(product).toHaveProperty('serial', item1.serial);
    });

    it('Should delete a product', async () => {
      const { item1, item2 } = testItems;
      await Inventory.insert(item1);
      await Inventory.insert(item2);
      await Inventory.remove(1);
      const products = await Inventory.getAll();
      expect(products).toHaveLength(1);
      expect(products[0]).toHaveProperty('name', item2.name);
    });
  });

  describe('Inventory Router', () => {
    it('[GET] /inventory should return status 200', async () => {
      await request(server)
        .get('/api/inventory')
        .expect(200);
    });

    it('[GET] /inventory should return items', async () => {
      const { item1, item2 } = testItems;
      await Inventory.insert(item1);
      await Inventory.insert(item2);
      await request(server)
        .get('/api/inventory')
        .expect(200)
        .then(res => {
          expect(res.body).toHaveLength(2);
        });
    });

    it('[DELETE] /inventory/:id should remove item', async () => {
      const { item1, item2 } = testItems;
      await Inventory.insert(item1);
      await Inventory.insert(item2);
      await request(server)
        .delete('/api/inventory/1')
        .expect(204);
    });

    it('[DELETE] /inventory/:id should remove item', async () => {
      await request(server)
        .delete('/api/inventory/1')
        .expect(500);
    });

    it('[POST] /inventory should create new item', async () => {
      const { item1 } = testItems;
      await request(server)
        .post('/api/inventory')
        .send(item1)
        .expect(201)
        .then(res => {
          expect(res.body).toHaveProperty('name', item1.name);
          expect(res.body).toHaveProperty('category', item1.category);
          expect(res.body).toHaveProperty('serial', item1.serial);
        });
    });

    it('[POST] /inventory should create new item', async () => {
      await request(server)
        .post('/api/inventory')
        .expect(500)
        .then(res => {
          expect(res.body).toEqual({ error: 'Error creating product' });
        });
    });
  });
});
