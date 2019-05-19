'use strict'

const Content = use('App/Models/Content')
const File = use('App/Models/File')
const Helpers = use('Helpers')

class ContentController {
  async save ({ request }) {
    const data = request.all()
    const method = data.type === 'audio' ? 'saveAudio' : 'saveVideo'
    const where = { hash: data.hash, type: data.type }
    try {
      let file = await File.findBy(where)
      if (!file) {
        let savedFile = await Content[method](data)
        file = new File()
        file.name = savedFile.name
        file.hash = savedFile.hash
        file.type = savedFile.type
        await file.save()
      }
      return { status: true, file }
    } catch {
      return { status: false }
    }
  }

  async show ({ params, response }) {
    const { hash, type } = params
    const where = { hash, type }
    const file = await File.findBy(where)
    return response.download(Helpers.tmpPath(file.name))
  }
}

module.exports = ContentController
