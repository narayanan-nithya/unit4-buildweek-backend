exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.string('phoneNumber', 200).notNullable().unique()
    })
    .createTable('plants', (users) => {
      plants.increments('plant_id')
      plants.string('nickname', 256).notNullable()
      plants.string('species', 256)
      plants.integer('h2oFrequency', 256).notNullable()
      plants.string('image', 300)
      plants.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
}

exports.down = async (knex) => {
  await knex.schema
  .dropTableIfExists('users')
  .dropTableIfExists('plants')
}
