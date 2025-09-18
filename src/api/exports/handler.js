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

    if (!credentials) throw new AuthError('User must be logged in');

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
        message: 'Your export request is being processed',
      })
      .code(201);

    return response;
  }
}

export default ExportHandler;
