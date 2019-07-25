exports.up = knex => knex.schema.createTable('products', (table) => {
  table
    .increments();
  table
    .string('name', 128)
    .unique()
    .notNullable();
  table
    .string('category')
    .notNullable();
  table
    .string('serial')
    .notNullable();
  table
    .timestamp('created_at')
    .defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTableIfExists('products');
