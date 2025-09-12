import autoBind from 'auto-bind';

class UserHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async registerUserHandler(request, h) {
    this._validator.validateUsersPayload(request.payload);

    const { username, password, fullname } = request.payload;

    const userId = await this._service.addUser({ username, password, fullname });
    const response = h.response({
      status: 'success',
      data: {
        userId,
      },
    });

    response.code(201);
    return response;
  }

  async getUserByIdHandler(request, h) {
    const { id } = request.params;

    const userId = await this._service.getUserById(id);

    const response = h.response({
      status: 'success',
      data: {
        userId,
      },
    });

    response.code(200);
    return response;
  }
}

export default UserHandler;
