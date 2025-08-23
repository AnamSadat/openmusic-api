import autoBind from 'auto-bind';

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async getAlbumsHandler(request, h) {
    const { id } = request.params;
    const album = await this._service.getAlbums(id);

    const response = h.response({
      status: 'success',
      data: {
        album,
      },
    });

    return response;
  }

  async postAlbumsHandler(request, h) {
    this._validator.validateAlbumsPayload(request.payload);
    const { name, year } = request.payload;
    const albumId = await this._service.addAlbums({ name, year });

    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });

    response.code(201);
    return response;
  }

  async putAlbumsHandler(request, h) {
    this._validator.validateAlbumsPayload(request.payload);
    const { id } = request.params;
    const { name, year } = request.payload;

    await this._service.updateAlbums(id, { name, year });

    const response = h.response({
      status: 'success',
      message: 'Berhasil di update',
    });

    return response;
  }

  async deleteAlbumsHandler(request, h) {
    const { id } = request.params;

    await this._service.deleteAlbums(id);

    const response = h.response({
      status: 'success',
      message: `Albums dengan id ${id} berhasil di hapus`,
    });

    return response;
  }
}

export default AlbumsHandler;
