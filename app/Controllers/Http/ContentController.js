'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')
const VkDownloader = require('../../../utilities/VkDownloader')
const YoutubeDownloader = require('../../../utilities/YoutubeDownloader')

class ContentController {
  async saveVk ({ request }) {
    let data = request.all()
    let vkDownloader = new VkDownloader(data.owner_id, data.id, data.type)
    let fileName = vkDownloader.getFileName(data.type)
    let file = await File.findBy({ name: fileName, type: data.type })
    if (file) return { status: true, file }
    try {
      let methodName = data.type === 'audio' ? 'saveAudio' : 'saveVideo'
      await vkDownloader[methodName]()
      file = new File()
      file.hash = data.owner_id + '_' + data.id
      file.name = fileName
      file.type = data.type
      await file.save()
      return { status: true, file }
    } catch (error) {
      return { status: false, error }
    }
  }

  async saveYoutube ({ request }) {
    let data = request.all()
    let youtubeDownloader = new YoutubeDownloader()
    let file = await File.findBy({ hash: data.hash, type: data.type })
    if (file) return { status: true, file }
    try {
      let methodName = data.type === 'audio' ? 'saveAudio' : 'saveVideo'
      let saved = await youtubeDownloader[methodName](data)
      file = new File()
      file.hash = data.hash
      file.name = saved.name
      file.type = data.type
      await file.save()
      return { status: true, file }
    } catch (error) {
      return { status: false, error }
    }
  }

  async showVk ({ params, response }) {
    const { hash, type } = params
    const where = { hash, type }
    const file = await File.findBy(where)
    return response.download(Helpers.tmpPath(file.name))
  }

  async showYoutube ({ params, response }) {
    const { hash, type } = params
    const where = { hash, type }
    const file = await File.findBy(where)
    return response.download(Helpers.tmpPath(file.name))
  }
}

module.exports = ContentController
