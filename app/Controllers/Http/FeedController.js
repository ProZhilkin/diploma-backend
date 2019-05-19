'use strict'

const RssParser = require('rss-parser')
const Feed = use('App/Models/Feed')

class FeedController {
  async create ({ request }) {
    const { title, url } = request.all()
    const feed = new Feed()
    feed.title = title
    feed.url = url
    await feed.save()
    return { status: true }
  }

  async show () {
    return await Feed.all()
  }

  async getByUrl ({ request }) {
    const { url } = request.all()
    const parser = new RssParser()
    const feed = await parser.parseURL(url)
    return feed
  }
}

module.exports = FeedController
