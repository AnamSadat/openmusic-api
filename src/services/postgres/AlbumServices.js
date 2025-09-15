import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import InvariantError from '../../exceptions/InvariantError.js';
import NotFoundError from '../../exceptions/NotFoundError.js';

class AlbumServices {
  constructor() {
    this._pool = new Pool();
  }

  async getAlbums(id) {
    if (!id) throw new InvariantError('Album ID is required');

    const queryAlbum = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };

    const querySong = {
      text: 'SELECT id, title, performer FROM songs WHERE "albumId" = $1',
      values: [id],
    };

    const resultAlbum = await this._pool.query(queryAlbum);
    const resultSong = await this._pool.query(querySong);

    if (!resultAlbum.rowCount) throw new NotFoundError('Album not found');

    const album = resultAlbum.rows[0];
    album.songs = resultSong.rows;

    return album;
  }

  async addAlbums({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) throw new InvariantError('Failed to add album');

    return result.rows[0].id;
  }

  async updateAlbums(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) throw new NotFoundError('Album not found, failed to update');

    return result;
  }

  async deleteAlbums(id) {
    if (!id) throw new InvariantError('Album ID is required');

    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) throw new NotFoundError('Album not found, failed to delete');
  }

  async updateCoverByIdAlbum(albumId, path) {
    if (!albumId) throw new InvariantError('Album ID is required');
    if (!path) throw new InvariantError('Path is required');

    const query = {
      text: 'UPDATE albums SET coverUrl = $1 WHERE id = $2 RETURNING id',
      values: [path, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) throw new NotFoundError('Tidak ditemukan');

    return result.rows[0].id;
  }
}

export default AlbumServices;
