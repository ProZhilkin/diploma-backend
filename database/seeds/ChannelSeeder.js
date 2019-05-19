'use strict'

const Channel = use('App/Models/Channel')
const Factory = use('Factory')

class ChannelSeeder {
  async run () {
    const channel = new Channel()
    channel.channel_id = 'UCLUwAjLQ34CUa-UVuF1VWCw'
    await channel.save()
  }
}

module.exports = ChannelSeeder
