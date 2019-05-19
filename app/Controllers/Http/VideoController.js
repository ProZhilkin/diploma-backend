'use strict'

const Video = use('App/Models/Video')

class VideoController {
  async show () {
    return await Video.all()
  }
}

module.exports = VideoController
