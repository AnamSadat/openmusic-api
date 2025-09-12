import autoBind from 'auto-bind';

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async getAlbumHandler(request, h) {
    const { id } = request.params;
    const album = await this._service.getAlbums(id);

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

  async updateAlbumHandler(request, h) {
    this._validator.validateAlbumsPayload(request.payload);
    const { id } = request.params;
    const { name, year } = request.payload;

    await this._service.updateAlbums(id, { name, year });

    const response = h.response({
      status: 'success',
      message: `Album with ID ${id} has been successfully updated`,
    });

    response.code(200);
    return response;
  }

  async deleteAlbumHandler(request, h) {
    const { id } = request.params;

    await this._service.deleteAlbums(id);

    const response = h.response({
      status: 'success',
      message: `Album with ID ${id} has been successfully deleted`,
    });

    response.code(200);
    return response;
  }
}

export default AlbumsHandler;
