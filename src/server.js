import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';

// exception error
import ClientError from './exceptions/ClientError.js';

// api
import albums from './api/albums/index.js';
import songs from './api/songs/index.js';
import users from './api/users/index.js';

// validator
import AlbumsValidator from './validator/albums/index.js';
import SongsValidator from './validator/songs/index.js';
import UsersValidator from './validator/users/index.js';

// service
import AlbumServices from './services/AlbumServices.js';
import SongServices from './services/SongServices.js';
import UserServices from './services/UserServices.js';

dotenv.config();

const init = async () => {
  const albumService = new AlbumServices();
  const songService = new SongServices();
  const userServices = new UserServices();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.ext('onPreResponse', (request, h) => {
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
      console.error(response);
      const newResponse = h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
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
        service: albumService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songService,
        validator: SongsValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: userServices,
        validator: UsersValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

init();
