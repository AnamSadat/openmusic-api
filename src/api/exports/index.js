import ExportHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { exportService, playlistService, validator }) => {
    const exportHandler = new ExportHandler(exportService, playlistService, validator);
    server.route(routes(exportHandler));
  },
};
