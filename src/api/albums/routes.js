const routes = (handler) => [
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getAlbumHandler,
  },
  {
    method: 'POST',
    path: '/albums',
    handler: handler.createAlbumHandler,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.updateAlbumHandler,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumHandler,
  },
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: handler.addCoverAlbumHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
    },
  },
  {
    method: 'GET',
    path: '/albums/covers/{param*}',
    handler: {
      directory: {
        path: `${process.cwd()}/uploads`,
      },
    },
  },
];

export default routes;
