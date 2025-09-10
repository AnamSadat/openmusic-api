import autoBind from 'auto-bind';

class AuthHandler {
  constructor(authService, usersService, tokenManager, validator) {
    this._authService = authService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    autoBind(this);
  }

  async postAuthentication(request, h) {
    this._validator.validatePostAuthPayload(request.payload);
    const { username, password } = request.payload;
    console.log('🚀 ~ AuthHandler ~ postAuthentication ~ password:', password);
    console.log('🚀 ~ AuthHandler ~ postAuthentication ~ username:', username);

    if (!request.payload.username) console.log('username gk ada:', request.payload.username);
    if (!request.payload.password) console.log('password gk ada:', request.payload.password);

    const id = await this._usersService.verifyUserCredential(username, password);
    console.log('🚀 ~ AuthHandler ~ postAuthentication ~ id:', id);

    const accessToken = await this._tokenManager.generateAccessToken({ id });
    const refreshToken = await this._tokenManager.generateRefreshToken({ id });

    await this._authService.addRefreshToken(refreshToken);

    console.log('Masuk ke post handler');

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });

    response.code(201);
    return response;
  }

  async putAuthentication(request, h) {
    this._validator.validatePutAuthPayload(request.payload);

    const { refreshToken } = request.payload;
    await this._authService.verifyRefreshToken(refreshToken);
    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this._tokenManager.generateAccessToken({ id });

    const response = h.response({
      status: 'success',
      data: { accessToken },
    });

    response.code(200);
    return response;
  }

  async deleteAuthentication(request) {
    this._validator.validateDeleteAuthPayload(request.payload);

    const { refreshToken } = request.payload;
    await this._authService.verifyRefreshToken(refreshToken);
    await this._authService.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    };
  }
}

export default AuthHandler;
