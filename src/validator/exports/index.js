import InvariantError from '../../exceptions/InvariantError.js';
import ExportSchema from './schema.js';

const ExportValidator = {
  validationExportPayload: (payload) => {
    const validationResult = ExportSchema.validate(payload);
    if (validationResult.error) throw new InvariantError(validationResult.error.message);
  },
};

export default ExportValidator;
