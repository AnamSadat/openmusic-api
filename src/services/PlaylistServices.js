import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import InvariantError from '../exceptions/InvariantError.js';
import NotFoundError from '../exceptions/NotFoundError.js';
import ForbiddenError from '../exceptions/ForbiddenError.js';
import AuthError from '../exceptions/AuthError.js';

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
        WHERE playlists.owner = $1

        UNION

        SELECT playlists.id, playlists.name, users.username
        FROM collaborations
        JOIN playlists ON collaborations.playlist_id = playlists.id
        JOIN users ON users.id = playlists.owner
        WHERE collaborations.user_id = $1;`,
      values: [credentials.id],
    };

    const result = await this._pool.query(query);

    let filteredPlaylists = result.rows;

    filteredPlaylists = filteredPlaylists.slice(0, 2);

    return filteredPlaylists;
  }

  async deletePlaylist(id) {
    if (!id) throw new InvariantError('ID is required');

    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) console.log('tidak ada yang dihapus');
  }

  async addSongWithPlaylist(playlistId, songId, userId) {
    const checkSongId = await this._pool.query({
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [songId],
    });

    if (!checkSongId.rows.length) throw new NotFoundError('dong id gk ada');

    const checkAccess = await this._pool.query({
      text: `
    SELECT 1 FROM playlists 
    WHERE id = $1 AND owner = $2
    UNION
    SELECT 1 FROM collaborations 
    WHERE playlist_id = $1 AND user_id = $2
  `,
      values: [playlistId, userId],
    });

    if (!checkAccess.rows.length) throw new ForbiddenError('Anda tidak punya akses ke playlist ini');

    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO playlist_songs (id, playlist_id, song_id) VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) throw new InvariantError('Musik gagal ditambahkan kedalam playlist');
  }

  async verifyPlaylistOwner(playlistId, owner) {
    const query = {
      text: 'SELECT owner FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) throw new NotFoundError('Playlist tidak ditemukan');

    const playlist = result.rows[0];

    if (playlist.owner !== owner) {
      throw new ForbiddenError('Anda tidak berhak mengakses resource ini');
    }
  }

  async getSongByIdPlaylist(id, credentials) {
    if (!id) throw new InvariantError('Id is required');
    if (!credentials) throw new AuthError('Credentials is no exist');

    await this.verifyPlaylistAccess(id, credentials);

    const query = {
      text: `
      SELECT playlists.id, playlists.name, users.username,
            songs.id AS song_id, songs.title, songs.performer
      FROM playlists
      JOIN users ON users.id = playlists.owner
      LEFT JOIN playlist_songs ON playlist_songs.playlist_id = playlists.id
      LEFT JOIN songs ON songs.id = playlist_songs.song_id
      WHERE playlists.id = $1
      LIMIT 2
    `,
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) throw new InvariantError('Gagal mengambil song di playlist');

    const { id: playlistId, name, username } = result.rows[0];

    const songs = result.rows
      .filter((row) => row.song_id)
      .map((row) => ({
        id: row.song_id,
        title: row.title,
        performer: row.performer,
      }));

    return {
      id: playlistId,
      name,
      username,
      songs,
    };
  }

  async deleteSongByIdPlaylist(id, credentials, playlistId) {
    console.log('🚀 ~ PlaylistServices ~ deleteSongByIdPlaylist ~ id:', id);
    if (!id) throw new InvariantError('ID is reuqired');
    console.log('🚀 ~ PlaylistServices ~ deleteSongByIdPlaylist ~ credentials:', credentials);
    if (!credentials) throw new InvariantError('Credentials is required');

    const query = {
      text: 'DELETE FROM playlist_songs WHERE song_id = $1 AND playlist_id = $2 RETURNING id',
      values: [id, playlistId],
    };

    const result = await this._pool.query(query);
    console.log('🚀 ~ PlaylistServices ~ deleteSongByIdPlaylist ~ result:', result.rows.length);

    if (!result.rows.length) {
      console.log('🚀 ~ PlaylistServices ~ deleteSongByIdPlaylist ~ tidak ada yang dihapus');
    }
  }

  async verifyPlaylistAccess(playlistId, userId) {
    try {
      // coba dulu cek owner
      await this.verifyPlaylistOwner(playlistId, userId);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        // kalau bukan owner, cek collaborator
        const result = await this._pool.query({
          text: 'SELECT * FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
          values: [playlistId, userId],
        });

        if (!result.rows.length) {
          throw new ForbiddenError('Anda tidak berhak mengakses resource ini');
        }
      } else {
        throw error; // kalau error lain, lempar ulang
      }
    }
  }
}

export default PlaylistServices;
