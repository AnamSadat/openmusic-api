import Joi from 'joi';

const PlaylistSchema = Joi.object({
  name: Joi.string().required(),
});

export default PlaylistSchema;
