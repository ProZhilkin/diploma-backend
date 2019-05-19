'use strict'

const Video = use('App/Models/Video')

class VideoController {
  async create ({ request }) {
    const { name, owner_id } = request.all()
    const video = new Video()
    video.name = name
    video.owner_id = owner_id
    await video.save()
    return { status: true }
  }

  async show () {
    return await Video.all()
  }
}

module.exports = VideoController
