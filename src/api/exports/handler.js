import autoBind from 'auto-bind';
import AuthError from '../../exceptions/AuthError.js';

class ExportHandler {
  constructor(producerService, playlistServie, validator) {
    this._producerService = producerService;
    this._playlistServie = playlistServie;
    this._validator = validator;

    autoBind(this);
  }

  async addExportPlaylistHandler(request, h) {
    const { id: credentials } = request.auth.credentials;

    if (!credentials) throw new AuthError('harus login');

    this._validator.validationExportPayload(request.payload);

    const { playlistId } = request.params;
    const { targetEmail } = request.payload;

    await this._playlistServie.verifyPlaylistOwner(playlistId, credentials);

    const message = {
      playlistId,
      targetEmail,
    };

    await this._producerService.sendMessage('export:playlists', JSON.stringify(message));

    const response = h
      .response({
        status: 'success',
        message: 'Permintaan Anda sedang kami proses',
      })
      .code(201);

    return response;
  }
}

export default ExportHandler;
