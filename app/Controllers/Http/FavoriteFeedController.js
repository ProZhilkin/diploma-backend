'use strict'

const FavoriteFeed = use('App/Models/FavoriteFeed')

class FavoriteFeedController {
  async create ({ auth, request }) {
    const { feed_id } = request.all()
    const favoriteFeed = new FavoriteFeed()
    favoriteFeed.user_id = auth.user.id
    favoriteFeed.feed_id = feed_id
    await favoriteFeed.save()
    return { status: true, favorite: favoriteFeed }
  }

  async remove ({ auth, request }) {
    const { feed_id } = request.all()
    const where = { user_id: auth.user.id, feed_id }
    const favoriteFeed = await FavoriteFeed.findBy(where)
    await favoriteFeed.delete()
    return { status: true }
  }

  async list ({ auth }) {
    const favoriteFeeds = await FavoriteFeed
      .query()
      .where('user_id', auth.user.id)
      .fetch()
    return favoriteFeeds
  }
}

module.exports = FavoriteFeedController