const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.createPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getAllPlaylist,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

export default routes;
