
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teas', table=>{
    table.string('id');
    table.string('name');
    table.string('ingredients');
    table.integer('caffeineScale');
    table.integer('price');
    table.boolean('inStock');
    table.integer('rating');
    table.text('imageUrl');
    table.integer('__v');
    table.json('categories');
    table.integer('quantity');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('teas');
};
