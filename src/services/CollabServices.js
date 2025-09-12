import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import InvariantError from '../exceptions/InvariantError.js';

class CollabServices {
  constructor() {
    this._pool = new Pool();
  }

  async addCollab(playlistId, userId, credentials) {
    const id = `collab-${nanoid(16)}`;

    if (!playlistId) throw new InvariantError('ID Playlist is required');
    if (!userId) throw new InvariantError('ID user is required');
    if (!credentials) throw new InvariantError('Credentials is required');

    await this.verifyCollab(userId, playlistId);

    const query = {
      text: 'INSERT INTO collaborations (id, playlist_id, user_id) VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) throw new InvariantError('Gagal menambahkan collaborations');

    return result.rows[0].id;
  }

  async verifyCollab(userId, playlistId) {
    const query = {
      text: 'SELECT * FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length) {
      throw new InvariantError('User sudah jadi kolaborator');
    }
  }

  async deleteCollab(playlistId, userId) {
    if (!playlistId) throw new InvariantError('ID playlist is required');
    if (!userId) throw new InvariantError('ID user is required');
    // if (!credentials) throw new InvariantError('credentials is required');

    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      console.log('🚀 ~ CollabServices ~ deleteCollaborations ~ tidak ada yang dihapus');
    }
  }
}

export default CollabServices;
