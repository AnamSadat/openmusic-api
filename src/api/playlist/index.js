import PlaylistHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'playlist',
  version: '1.0.0',
  register: async (server, { playlistService, songService, validator }) => {
    const playlistHandler = new PlaylistHandler(playlistService, songService, validator);
    server.route(routes(playlistHandler));
  },
};
