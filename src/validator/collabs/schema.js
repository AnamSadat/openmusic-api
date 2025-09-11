import Joi from 'joi';

const CollabSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

export default CollabSchema;
