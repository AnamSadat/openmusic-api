import InvariantError from '../../exceptions/InvariantError.js';
import SongsSchema from './schema.js';

const SongsValidator = {
  validateSongsPayload: (payload) => {
    const validationResult = SongsSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default SongsValidator;
