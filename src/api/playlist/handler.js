import autoBind from 'auto-bind';
import InvariantError from '../../exceptions/InvariantError.js';

class PlaylistHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async createPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);

    if (!request.payload) throw new InvariantError('error');
    const { name } = request.payload;
    const { id: credentials } = request.auth.credentials;

    const playlistId = await this._service.addPlaylist(name, credentials);

    const response = h
      .response({
        status: 'success',
        data: {
          playlistId,
        },
      })
      .code(201);

    return response;
  }

  async getAllPlaylist(request, h) {
    const credentials = await request.auth.credentials;
    const playlists = await this._service.getPlaylist(credentials);

    const response = h
      .response({
        status: 'success',
        data: {
          playlists,
        },
      })
      .code(200);

    return response;
  }
}

export default PlaylistHandler;
