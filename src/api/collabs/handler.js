import autoBind from 'auto-bind';

class CollabHandler {
  constructor(collabServices, playlistService, usersService, validator) {
    this._collabService = collabServices;
    this._playlistService = playlistService;
    this._userService = usersService;
    this._validator = validator;

    autoBind(this);
  }

  async postCollabHandler(request, h) {
    await this._validator.validateCollabPayload(request.payload);

    const { playlistId, userId } = request.payload;
    const { id: credentials } = request.auth.credentials;

    await this._userService.getUserById(userId);
    await this._playlistService.verifyPlaylistOwner(playlistId, credentials);

    const collaborationId = await this._collabService.addCollab(playlistId, userId);

    const response = h
      .response({
        status: 'success',
        data: {
          collaborationId,
        },
      })
      .code(201);

    return response;
  }

  async deleteCollabHandler(request, h) {
    this._validator.validateCollabPayload(request.payload);

    const { playlistId, userId } = request.payload;
    const { id: credentials } = request.auth.credentials;

    await this._playlistService.verifyPlaylistOwner(playlistId, credentials);
    await this._collabService.deleteCollab(playlistId, userId);

    const response = h
      .response({
        status: 'success',
        message: 'Collaboration has been successfully removed',
      })
      .code(200);

    return response;
  }
}

export default CollabHandler;
