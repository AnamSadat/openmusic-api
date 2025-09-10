import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import Jwt from '@hapi/jwt';

// exception error
import ClientError from './exceptions/ClientError.js';

// api
import albums from './api/albums/index.js';
import songs from './api/songs/index.js';
import users from './api/users/index.js';
import auth from './api/auth/index.js';

// validator
import AlbumsValidator from './validator/albums/index.js';
import SongsValidator from './validator/songs/index.js';
import UsersValidator from './validator/users/index.js';
import AuthValidator from './validator/auth/index.js';

// service
import AlbumServices from './services/AlbumServices.js';
import SongServices from './services/SongServices.js';
import UserServices from './services/UserServices.js';
import AuthServices from './services/AuthServices.js';
import TokenManager from './tokenize/TokenManager.js';
import playlist from './api/playlist/index.js';
import PlaylistServices from './services/PlaylistServices.js';
import PlaylistValidator from './validator/playlist/index.js';

dotenv.config();

const init = async () => {
  const albumService = new AlbumServices();
  const songService = new SongServices();
  const usersService = new UserServices();
  const authService = new AuthServices();
  const playlistService = new PlaylistServices();

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
      console.error('[ClientError]', response);
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response.isBoom) {
      const { statusCode } = response.output;

      switch (statusCode) {
        case 400:
          console.error('[BoomError 400] Bad Request:', response);
          break;
        case 401:
          console.error('[BoomError 401] Unauthorized:', response);
          break;
        case 403:
          console.error('[BoomError 403] Forbidden:', response);
          break;
        case 404:
          console.error('[BoomError 404] Not Found:', response);
          break;
        default:
          console.error(`[BoomError ${statusCode}]`, response);
      }

      return h.continue;
    }

    if (response instanceof Error) {
      console.error('[ServerError]', response);
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
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
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
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: auth,
      options: {
        authService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthValidator,
      },
    },
    {
      plugin: playlist,
      options: {
        service: playlistService,
        validator: PlaylistValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

init();
