import CollabHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'collabs',
  version: '1.0.0',
  register: async (server, { collabServices, playlistService, usersService, validator }) => {
    const collabHandler = new CollabHandler(
      collabServices,
      playlistService,
      usersService,
      validator,
    );
    server.route(routes(collabHandler));
  },
};
