import InvariantError from '../../exceptions/InvariantError.js';
import { PlaylistSchema, SongSchema } from './schema.js';

const PlaylistValidator = {
  validatePlaylistPayload: (payload) => {
    const validationResult = PlaylistSchema.validate(payload);
    if (validationResult.error) throw new InvariantError(validationResult.error.message);
  },

  validateSongPlaylistPayload: (payload) => {
    const validationResult = SongSchema.validate(payload);
    if (validationResult.error) throw new InvariantError(validationResult.error.message);
  },
};

export default PlaylistValidator;
