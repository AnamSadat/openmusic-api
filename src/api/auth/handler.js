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

    const id = await this._usersService.verifyUserCredential(username, password);
    const accessToken = await this._tokenManager.generateAccessToken({ id });
    const refreshToken = await this._tokenManager.generateRefreshToken({ id });

    await this._authService.addRefreshToken(refreshToken);

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
      message: 'Refresh token has been successfully deleted',
    };
  }
}

export default AuthHandler;
