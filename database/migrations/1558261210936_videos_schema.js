'use strict'

const Schema = use('Schema')

class VideosSchema extends Schema {
  up () {
    this.create('videos', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.string('owner_id', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('videos')
  }
}

module.exports = VideosSchema
