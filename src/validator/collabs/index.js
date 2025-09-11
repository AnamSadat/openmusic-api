import InvariantError from '../../exceptions/InvariantError.js';
import CollabSchema from './schema.js';

const CollabValidator = {
  validateCollabPayload: (payload) => {
    const validateResult = CollabSchema.validate(payload);
    if (validateResult.error) throw new InvariantError(validateResult.error.message);
  },
};

export default CollabValidator;
