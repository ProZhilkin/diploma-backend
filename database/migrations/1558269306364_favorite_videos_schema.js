'use strict'

const Schema = use('Schema')

class FavoriteVideosSchema extends Schema {
  up () {
    this.create('favorite_videos', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('video_id').unsigned().references('id').inTable('videos')
      table.timestamps()
    })
  }

  down () {
    this.drop('favorite_videos')
  }
}

module.exports = FavoriteVideosSchema
