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
    console.log('🚀 ~ CollabHandler ~ postCollabHandler ~ userId:', userId);
    console.log('🚀 ~ CollabHandler ~ postCollabHandler ~ playlistId:', playlistId);
    const { id: credentials } = request.auth.credentials;
    console.log('🚀 ~ CollabHandler ~ postCollabHandler ~ credentials:', credentials);
    await this._userService.getUserById(userId);
    await this._playlistService.verifyPlaylistOwner(playlistId, credentials);

    const collaborationId = await this._collabService.addCollab(playlistId, userId, credentials);

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

    console.log('🚀 ~ CollabHandler ~ deleteCollabHandler ~ userId:', userId);
    console.log('🚀 ~ CollabHandler ~ deleteCollabHandler ~ playlistId:', playlistId);
    console.log('🚀 ~ CollabHandler ~ deleteCollabHandler ~ credentials:', credentials);

    await this._playlistService.verifyPlaylistOwner(playlistId, credentials);
    await this._collabService.deleteCollab(playlistId, userId);

    const response = h
      .response({
        status: 'success',
        message: 'Collaborations berhasil dihapus',
      })
      .code(200);

    return response;
  }
}

export default CollabHandler;
