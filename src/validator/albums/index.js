import AlbumSchema from './schema.js';
import InvariantError from '../../exceptions/InvariantError.js';

const AlbumsValidator = {
  validateAlbumsPayload: (payload) => {
    const validationResult = AlbumSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default AlbumsValidator;
