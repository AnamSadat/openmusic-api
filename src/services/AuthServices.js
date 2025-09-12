import { Pool } from 'pg';
import InvariantError from '../exceptions/InvariantError.js';

class AuthServices {
  constructor() {
    this._pool = new Pool();
  }

  async addRefreshToken(refreshToken) {
    if (!refreshToken) throw new InvariantError('Refresh token is required');

    const query = {
      text: 'INSERT INTO auth VALUES($1)',
      values: [refreshToken],
    };

    await this._pool.query(query);
  }

  async verifyRefreshToken(token) {
    if (!token) throw new InvariantError('Refresh token is required');

    const query = {
      text: 'SELECT "refreshToken" FROM auth WHERE "refreshToken" = $1',
      values: [token],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) throw new InvariantError('Invalid refresh token');
  }

  async deleteRefreshToken(token) {
    if (!token) throw new InvariantError('Refresh token is required');

    const query = {
      text: 'DELETE FROM auth WHERE "refreshToken" = $1',
      values: [token],
    };

    await this._pool.query(query);
  }
}

export default AuthServices;
