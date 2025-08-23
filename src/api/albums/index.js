import AlbumsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const albumsHandler = new AlbumsHandler(service, validator);
    // console.log('🚀 ~ albumsHandler:', albumsHandler);
    server.route(routes(albumsHandler));
  },
};
