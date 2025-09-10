import Joi from 'joi';

const PlaylistSchema = Joi.object({
  name: Joi.string().required(),
});

const SongSchema = Joi.object({
  songId: Joi.string().required(),
});

export { PlaylistSchema, SongSchema };
