exports.seed = knex => knex('products')
  .del()
  .then(() => knex('products').insert([
    {
      name: 'Samsung',
      category: 'Phone',
      serial: 'LDHNF87406JNAB698',
    },
    {
      name: 'Asus',
      category: 'Laptop',
      serial: 'KDJNFO38593JKNSKER',
    },
    {
      name: 'Iphone 6s',
      category: 'Phone',
      serial: 'KJEFNF3958FENKDSLS',
    },
    {
      name: 'Macbook Pro 2018',
      category: 'Laptop',
      serial: 'KJFNKEKF9489230FKG',
    },
    {
      name: 'Panasonic',
      category: 'Television',
      serial: 'JDMFODN9385982JNER',
    }
  ]));
