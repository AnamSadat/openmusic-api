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

  async getAllPlaylistHandler(request, h) {
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

  async postPlaylistSongByIdHandler(request, h) {
    this._validator.validateSongPlaylistPayload(request.payload);

    const { songId } = request.payload;
    const { id: playlistId } = request.params;
    const { id: credentials } = request.auth.credentials;

    await this._service.addSongWithPlaylist(playlistId, songId, credentials);

    const response = h
      .response({
        status: 'success',
        message: 'Berhasil nambah song di playlist',
      })
      .code(201);

    return response;
  }

  async getSongByIdPlaylistHandler(request, h) {
    const { id: credentials } = request.auth.credentials;
    console.log('🚀 ~ PlaylistHandler ~ getSongByIdPlaylist ~ credentials:', credentials);
    const { id } = request.params;
    console.log('🚀 ~ PlaylistHandler ~ getSongByIdPlaylist ~ playlistJhon:', id);
    console.log('setelah destructure');

    const playlist = await this._service.getSongByIdPlaylist(id, credentials);
    console.log('setelah playlist');

    const response = h
      .response({
        status: 'success',
        data: {
          playlist,
        },
      })
      .code(200);

    return response;
  }

  async deleteSongByIdPlaylistHandler(request, h) {
    this._validator.validateSongPlaylistPayload(request.payload);

    const { id: credentials } = request.auth.credentials;
    console.log('🚀 ~ PlaylistHandler ~ deleteSongByIdPlaylist ~ credentials:', credentials);
    const { songId } = request.payload;
    console.log('🚀 ~ PlaylistHandler ~ deleteSongByIdPlaylist ~ songId:', songId);
    const { id } = request.params;
    console.log('🚀 ~ PlaylistHandler ~ deleteSongByIdPlaylist ~ playlistId:', id);
    console.log('Sebelum validate');

    await this._service.verifyPlaylistOwner(id, credentials);
    console.log('sesudah validate');

    await this._service.deleteSongByIdPlaylist(songId, credentials, id);
    console.log('sesudah delete');

    const response = h
      .response({
        status: 'success',
        message: 'Berhasil dihapus',
      })
      .code(200);

    return response;
  }

  async deletePlaylistHandler(request, h) {
    const { id } = request.params;
    const { id: credentials } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, credentials);
    await this._service.deletePlaylist(id);

    const response = h
      .response({
        status: 'success',
        message: 'Berhasil dihapus',
      })
      .code(200);

    return response;
  }
}

export default PlaylistHandler;
