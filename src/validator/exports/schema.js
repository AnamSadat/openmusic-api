import Joi from 'joi';

const ExportSchema = Joi.object({
  targetEmail: Joi.string().email().required(),
});

export default ExportSchema;
