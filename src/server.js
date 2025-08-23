import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import ClientError from './exceptions/ClientError.js';
import albums from './api/albums/index.js';
import AlbumsValidator from './validator/albums/index.js';
import AlbumServices from './services/AlbumServices.js';

dotenv.config();

const init = async () => {
  const albumsServices = new AlbumServices();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response instanceof Error) {
      console.error(response); // <— log error ke console
      const newResponse = h.response({
        status: 'error',
        message: 'An internal server error occurred',
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsServices,
        validator: AlbumsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

init();
