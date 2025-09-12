import InvariantError from '../../exceptions/InvariantError.js';
import { PostAuthSchema, PutAuthSchema, DeleteAuthSchema } from './schema.js';

const AuthValidator = {
  validatePostAuthPayload: (payload) => {
    const validationResult = PostAuthSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutAuthPayload: (payload) => {
    const validationResult = PutAuthSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteAuthPayload: (payload) => {
    const validationResult = DeleteAuthSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default AuthValidator;
