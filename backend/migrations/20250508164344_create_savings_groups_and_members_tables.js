exports.up = function(knex) {
    return knex.schema
      .createTable('savings_groups', (table) => {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.decimal('contribution_amount').notNullable();
        table.integer('member_count').notNullable();
        table.string('frequency', 20).notNullable();
        table.string('referral_code', 20).unique().notNullable();
        table.string('agent_id', 100).notNullable();
        table.string('status', 20).notNullable().defaultTo('active');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
      .createTable('group_members', (table) => {
        table.increments('id').primary();
        table
          .integer('group_id')
          .unsigned()
          .references('id')
          .inTable('savings_groups')
          .onDelete('CASCADE');
        table.string('user_id', 100).notNullable();
        table.integer('rotation_position').notNullable();
        table.string('status', 20).notNullable();
        table.timestamp('joined_at').defaultTo(knex.fn.now());
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('group_members')
      .dropTableIfExists('savings_groups');
  };
  