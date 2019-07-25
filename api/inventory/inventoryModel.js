const db = require('../../data/dbConfig');

module.exports = {
  getAll,
  insert,
  findById,
  remove,
};

function findById(id) {
  return db('products')
    .where({ id })
    .first();
}

function getAll() {
  return db('products');
}

async function insert(product) {
  const [id] = await db('products').insert(product);
  return await findById(id);
}

function remove(id) {
  return db('products')
    .where({ id })
    .del();
}
