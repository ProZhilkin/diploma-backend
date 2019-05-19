'use strict'

const Channel = use('App/Models/Channel')

class ChannelController {
  async show () {
    return await Channel.all()
  }

  async create ({ request }) {
    const { channel_id } = request.all()
    const channel = new Channel()
    channel.channel_id = channel_id
    await channel.save()
    return { status: true }
  }
}

module.exports = ChannelController
