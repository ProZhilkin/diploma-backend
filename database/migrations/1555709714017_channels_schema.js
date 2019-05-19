'use strict'

const Schema = use('Schema')

class ChannelsSchema extends Schema {
  up () {
    this.create('channels', (table) => {
      table.increments()
      table.string('channel_id', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('channels')
  }
}

module.exports = ChannelsSchema
