import AlbumsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { albumService, storageService, validatorAlbums, validatorStorage }) => {
    const albumsHandler = new AlbumsHandler(albumService, storageService, validatorAlbums, validatorStorage);
    server.route(routes(albumsHandler));
  },
};
