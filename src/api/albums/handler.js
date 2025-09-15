import autoBind from 'auto-bind';
import config from '../../utils/config.js';

class AlbumsHandler {
  constructor(albumService, storageService, validatorAlbums, validatorStorage) {
    this._albumService = albumService;
    this._storageService = storageService;
    this._validatorAlbums = validatorAlbums;
    this._validatorStorage = validatorStorage;

    autoBind(this);
  }

  async getAlbumHandler(request, h) {
    const { id } = request.params;
    const album = await this._albumService.getAlbums(id);

    const response = h.response({
      status: 'success',
      data: {
        album,
      },
    });

    response.code(200);
    return response;
  }

  async createAlbumHandler(request, h) {
    this._validatorAlbums.validateAlbumsPayload(request.payload);
    const { name, year } = request.payload;
    const albumId = await this._albumService.addAlbums({ name, year });

    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });

    response.code(201);
    return response;
  }

  async updateAlbumHandler(request, h) {
    this._validatorAlbums.validateAlbumsPayload(request.payload);
    const { id } = request.params;
    const { name, year } = request.payload;

    await this._albumService.updateAlbums(id, { name, year });

    const response = h.response({
      status: 'success',
      message: `Album with ID ${id} has been successfully updated`,
    });

    response.code(200);
    return response;
  }

  async deleteAlbumHandler(request, h) {
    const { id } = request.params;

    await this._albumService.deleteAlbums(id);

    const response = h.response({
      status: 'success',
      message: `Album with ID ${id} has been successfully deleted`,
    });

    response.code(200);
    return response;
  }

  async addCoverAlbumHandler(request, h) {
    const { id } = request.params;
    const { cover } = request.payload;
    this._validatorStorage.validateImageHeaders(cover.hapi.headers);

    const filename = await this._storageService.writeFile(cover, cover.hapi);
    const url = `http://${config.app.host}:${config.app.port}/albums/covers/${filename}`;

    await this._albumService.updateCoverByIdAlbum(id, url);

    const response = h
      .response({
        status: 'success',
        message: 'Sampul berhasil diunggah',
      })
      .code(201);

    return response;
  }
}

export default AlbumsHandler;
