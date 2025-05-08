exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('fullname', 100).notNullable();
      table.string('email', 100).unique().notNullable();
      table.string('password_hash', 255).notNullable();
      table.string('role', 20).defaultTo('member').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  