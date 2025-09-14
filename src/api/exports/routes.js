const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/playlists/{playlistId}',
    handler: handler.addExportPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

export default routes;
