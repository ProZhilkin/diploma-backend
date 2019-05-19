'use strict'

const FavoriteVideo = use('App/Models/FavoriteVideo')

class FavoriteVideoController {
  async create ({ auth, request }) {
    const { video_id } = request.all()
    const favoriteVideo = new FavoriteVideo()
    favoriteVideo.user_id = auth.user.id
    favoriteVideo.video_id = video_id
    await favoriteVideo.save()
    return { status: true, video: favoriteVideo }
  }

  async remove ({ auth, request }) {
    const { video_id } = request.all()
    const where = { user_id: auth.user.id, video_id }
    const favoriteVideo = await FavoriteVideo.findBy(where)
    await favoriteVideo.delete()
    return { status: true }
  }

  async list ({ auth }) {
    const favoriteVideos = await FavoriteVideo
      .query()
      .where('user_id', auth.user.id)
      .fetch()
    return favoriteVideos
  }
}

module.exports = FavoriteVideoController
