/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("abilities", (table) => {
        table.text('ability_name').primary();
        table.text('description').notNullable();
        table.specificType('tags', 'text[]');
        table.specificType('attribute', 'text[]');
        table.specificType('character_choice', 'text[]');
        table.specificType('trait', 'text[]');
        table.text('damage');
        table.text('damage_type');
        table.text('range');
        table.text('duration');
        table.text('action_type').notNullable();
        table.integer('action_cost').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("abilities");
};