import Joi from 'joi';

const AlbumSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

export default AlbumSchema;
