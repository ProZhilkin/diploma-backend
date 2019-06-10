const fluentFfmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const helpers = use('Helpers')
const ytdl = require('ytdl-core')

class YoutubeDownloader {
  constructor () {
    this.host = 'http://www.youtube.com/watch?v='
  }

  getUrl (hash) {
    return `${this.host}${hash}`
  }

  saveVideo (data) {
    const options = Object.assign(data, { format: 'mp4', quality: 'highest' })
    const name = options.hash + '.' + options.format
    const filter = (f) => f.container === options.format
    const stream = ytdl(this.getUrl(options.hash), { filter, quality: options.quality })
    stream.pipe(fs.createWriteStream(helpers.tmpPath(name)))
    return new Promise((resolve, reject) => {
      stream.on('end', () => resolve({ name, ...options }))
      stream.on('error', reject)
    })
  }

  saveAudio (data) {
    const options = Object.assign(data, { bitrate: 64, format: 'mp3' })
    const name = options.hash + '.' + options.format
    const stream = ytdl(this.getUrl(options.hash), { quality: 'highestaudio' })
    const ffmpeg = fluentFfmpeg(stream)
    ffmpeg.audioBitrate(options.bitrate)
    ffmpeg.save(helpers.tmpPath(name))
    return new Promise((resolve, reject) => {
      ffmpeg.on('end', () => resolve({ name, ...options }))
      ffmpeg.on('error', reject)
    })
  }
}

module.exports = YoutubeDownloader