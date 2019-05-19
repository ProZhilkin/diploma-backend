'use strict'

const FavoriteChannel = use('App/Models/FavoriteChannel')

class FavoriteChannelController {
  async create ({ auth, request }) {
    const { channel_id } = request.all()
    const favoriteChannel = new FavoriteChannel()
    favoriteChannel.user_id = auth.user.id
    favoriteChannel.channel_id = channel_id
    await favoriteChannel.save()
    return { status: true, favorite: favoriteChannel }
  }

  async remove ({ auth, request }) {
    const { channel_id } = request.all()
    const where = { user_id: auth.user.id, channel_id }
    const favoriteChannel = await FavoriteChannel.findBy(where)
    await favoriteChannel.delete()
    return { status: true }
  }

  async list ({ auth }) {
    const favoritesChannels = await FavoriteChannel
      .query()
      .where('user_id', auth.user.id)
      .fetch()
    return favoritesChannels
  }
}

module.exports = FavoriteChannelController
