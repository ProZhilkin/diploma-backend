'use strict'

const fluentFfmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const ytdl = require('ytdl-core')
const Helpers = use('Helpers')
const Model = use('Model')

class Content extends Model {
  static getUrl (hash) {
    return `http://www.youtube.com/watch?v=${hash}`
  }

  static saveAudio (data) {
    const options = Object.assign(data, { bitrate: 64, format: 'mp3' })
    return new Promise((resolve) => {
      const name = options.hash + '.' + options.format
      const stream = ytdl(Content.getUrl(options.hash), { quality: 'highestaudio' })
      const ffmpeg = fluentFfmpeg(stream)
      ffmpeg.audioBitrate(options.bitrate)
      ffmpeg.save(Helpers.tmpPath(name))
      ffmpeg.on('end', () => resolve({ name, ...options }))
    })
  }

  static saveVideo (data) {
    const options = Object.assign(data, { format: 'mp4', quality: 'highest' })
    return new Promise((resolve) => {
      const name = options.hash + '.' + options.format
      const filter = (f) => f.container === options.format
      const stream = ytdl(Content.getUrl(options.hash), { filter, quality: options.quality })
      stream.pipe(fs.createWriteStream(Helpers.tmpPath(name)))
      stream.on('end', () => resolve({ name, ...options }))
    })
  }
}

module.exports = Content
