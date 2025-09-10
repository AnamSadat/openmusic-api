import InvariantError from '../../exceptions/InvariantError.js';
import { PostAuthSchema, PutAuthSchema, DeleteAuthSchema } from './schema.js';

const AuthValidator = {
  validatePostAuthPayload: (payload) => {
    const validationResult = PostAuthSchema.validate(payload);
    console.log('validator post aman');
    if (validationResult.error) {
      console.log('validator post tidak aman');
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutAuthPayload: (payload) => {
    const validationResult = PutAuthSchema.validate(payload);
    console.log('validator put aman');
    if (validationResult.error) {
      console.log('validator put tidak aman');
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteAuthPayload: (payload) => {
    const validationResult = DeleteAuthSchema.validate(payload);
    console.log('validator delete aman');
    if (validationResult.error) {
      console.log('validator delete tidak aman');
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default AuthValidator;
