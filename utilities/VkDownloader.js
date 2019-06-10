const axios = require('axios')
const fluentFfmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const helpers = use('Helpers')
const matchAll = require('match-all')

class VkDownloader {
  constructor (ownerId, id) {
    this.host = 'https://vk.com/video'
    this.qualities = ['1080.mp4', '720.mp4', '360.mp4', '240.mp4']
    this.ownerId = ownerId
    this.id = id
  }

  get videoSrc () {
    return `${this.host}${this.ownerId}_${this.id}`
  }

  getFileName (type) {
    let format = type === 'audio' ? 'mp3' : 'mp4'
    return `${this.ownerId}_${this.id}.${format}`
  }

  async getSources () {
    let response = await axios.get(this.videoSrc)
    let pattern = /<source src=\\"(.+?)"/g
    let sources = matchAll(response.data, pattern).toArray().map(url => url.replace(/\\\//g, '/'))
    return sources.filter(source => this.qualities.find(quality => source.indexOf(quality) !== -1))
  }

  async saveVideo () {
    return new Promise(async (resolve, reject) => {
      let name = this.getFileName('video')
      let path = helpers.tmpPath(name)
      if (fs.existsSync(path)) resolve({ name, path })
      let sources = await this.getSources()
      let bestSource = sources.shift()
      let writer = fs.createWriteStream(path)
      let stream = await axios({ url: bestSource, method: 'GET', responseType: 'stream' })
      stream.data.pipe(writer)
      writer.on('finish', () => resolve({ name, path }))
      writer.on('error', reject)
    })
  }

  async saveAudio () {
    let video = await this.saveVideo()
    let options = { bitrate: 64 }
    let name = this.getFileName('audio')
    let path = helpers.tmpPath(name)
    let ffmpeg = fluentFfmpeg(video.path)
    ffmpeg.audioBitrate(options.bitrate)
    ffmpeg.save(path)
    return new Promise((resolve, reject) => {
      ffmpeg.on('end', () => resolve({ name, ...options }))
      ffmpeg.on('error', reject)
    })
  }
}

module.exports = VkDownloader