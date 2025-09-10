const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.createSongHandler,
    // options: {
    //   auth: 'openmusic_jwt',
    // },
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongsHandler,
    // options: {
    //   auth: 'openmusic_jwt',
    // },
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongByIdHandler,
    // options: {
    //   auth: 'openmusic_jwt',
    // },
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.updateSongHandler,
    // options: {
    //   auth: 'openmusic_jwt',
    // },
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongHandler,
    // options: {
    //   auth: 'openmusic_jwt',
    // },
  },
];

export default routes;
