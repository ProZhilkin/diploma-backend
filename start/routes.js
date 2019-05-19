'use strict'

const Route = use('Route')

Route.get('/content/:type/:hash', 'ContentController.show')

Route.group(() => {
  Route.post('/user/login', 'UserController.login')
  Route.post('/user/register', 'UserController.register')
}).middleware('guest')

Route.group(() => {
  Route.get('/user', 'UserController.getUser')
  Route.delete('/user/logout', 'UserController.revokeTokens')
  Route.get('/channels', 'ChannelController.show')
  Route.post('/channel', 'ChannelController.create')
  Route.get('/feeds', 'FeedController.show')
  Route.post('/feed', 'FeedController.create')
  Route.get('/feed', 'FeedController.getByUrl')
  Route.get('/favorite/channels', 'FavoriteChannelController.list')
  Route.post('/favorite/channel', 'FavoriteChannelController.create')
  Route.delete('/favorite/channel', 'FavoriteChannelController.remove')
  Route.get('/favorite/feeds', 'FavoriteFeedController.list')
  Route.post('/favorite/feed', 'FavoriteFeedController.create')
  Route.delete('/favorite/feed', 'FavoriteFeedController.remove')
  Route.put('/content', 'ContentController.save')
}).middleware('auth')