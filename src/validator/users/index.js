import InvariantError from '../../exceptions/InvariantError.js';
import UsersSchema from './schema.js';

const UsersValidator = {
  validateUsersPayload: (payload) => {
    const validationResult = UsersSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default UsersValidator;
