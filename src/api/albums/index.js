import AlbumsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'albums',
  version: '1.0.0',
  register: async (
    server,
    { albumService, storageLocalService, storageCloudService, validatorAlbums, validatorStorage },
  ) => {
    const albumsHandler = new AlbumsHandler(
      albumService,
      storageLocalService,
      storageCloudService,
      validatorAlbums,
      validatorStorage,
    );
    server.route(routes(albumsHandler));
  },
};
