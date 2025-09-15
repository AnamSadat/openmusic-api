import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import InvariantError from '../../exceptions/InvariantError.js';

class CollabServices {
  constructor() {
    this._pool = new Pool();
  }

  async addCollab(playlistId, userId) {
    await this.verifyCollab(userId, playlistId);

    const id = `collab-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO collaborations (id, playlist_id, user_id) VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) throw new InvariantError('Failed to add collaboration');

    return result.rows[0].id;
  }

  async verifyCollab(userId, playlistId) {
    const query = {
      text: 'SELECT * FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length) throw new InvariantError('User is already a collaborator');
  }

  async deleteCollab(playlistId, userId) {
    if (!playlistId || !userId) throw new InvariantError('Both playlist ID and user ID are required');

    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) console.log('No collaboration found to delete');
  }
}

export default CollabServices;
