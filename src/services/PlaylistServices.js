import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import InvariantError from '../exceptions/InvariantError.js';
import NotFoundError from '../exceptions/NotFoundError.js';

class PlaylistServices {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylist(name, uername) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, uername],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) throw new InvariantError('Gagal menambahkan playlist');

    return result.rows[0].id;
  }

  async getPlaylist(credentials) {
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username
         FROM playlists
         JOIN users ON users.id = playlists.owner
         WHERE playlists.owner = $1`,
      values: [credentials.id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) throw new NotFoundError('Playlist tidak ditemukan');

    let filteredPlaylists = result.rows;

    filteredPlaylists = filteredPlaylists.slice(0, 2);

    return filteredPlaylists;
  }

  async deletePlaylist(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) throw new NotFoundError('Gagal menghapus, ID tidak ditemukan');
  }

  async addSongWithPlaylist() {
    // TODO: Create ENDPOINT GET /playlists/{id}/songs
  }
}

export default PlaylistServices;
