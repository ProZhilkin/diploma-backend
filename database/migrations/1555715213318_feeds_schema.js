'use strict'

const Schema = use('Schema')

class FeedsSchema extends Schema {
  up () {
    this.create('feeds', (table) => {
      table.increments()
      table.string('url', 255).notNullable()
      table.string('title', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('feeds')
  }
}

module.exports = FeedsSchema
