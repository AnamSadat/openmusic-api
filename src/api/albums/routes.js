const routes = (handler) => [
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getAlbumHandler,
    // options: {
    //   auth: 'openmusic_jwt',
    // },
  },
  {
    method: 'POST',
    path: '/albums',
    handler: handler.createAlbumHandler,
    // options: {
    //   auth: 'openmusic_jwt',
    // },
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.updateAlbumHandler,
    // options: {
    //   auth: 'openmusic_jwt',
    // },
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumHandler,
    // options: {
    //   auth: 'openmusic_jwt',
    // },
  },
];

export default routes;
