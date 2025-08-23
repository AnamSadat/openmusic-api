import Joi from 'joi';

const SongsSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  performer: Joi.string().required(),
  genre: Joi.string().required(),
  duration: Joi.number().optional(),
  albumId: Joi.string().optional(),
});

export default SongsSchema;
