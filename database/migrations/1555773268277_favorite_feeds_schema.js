'use strict'

const Schema = use('Schema')

class FavoriteFeedsSchema extends Schema {
  up () {
    this.create('favorite_feeds', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('feed_id').unsigned().references('id').inTable('feeds')
      table.timestamps()
    })
  }

  down () {
    this.drop('favorite_feeds')
  }
}

module.exports = FavoriteFeedsSchema
