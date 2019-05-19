'use strict'

const Video = use('App/Models/Video')
const Factory = use('Factory')

class ChannelSeeder {
  async run () {
    const video = new Video()
    video.name = 'Ростов Главный — новости Ростова-на-Дону'
    video.owner_id = -36039
    await video.save()
  }
}

module.exports = ChannelSeeder
