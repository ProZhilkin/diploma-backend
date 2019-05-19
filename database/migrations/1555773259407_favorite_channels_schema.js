'use strict'

const Schema = use('Schema')

class FavoriteChannelsSchema extends Schema {
  up () {
    this.create('favorite_channels', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('channel_id').unsigned().references('id').inTable('channels')
      table.timestamps()
    })
  }

  down () {
    this.drop('favorite_channels')
  }
}

module.exports = FavoriteChannelsSchema
