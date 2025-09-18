import Jwt from '@hapi/jwt';
import InvariantError from '../exceptions/InvariantError.js';
import config from '../utils/config.js';

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, config.auth.accessTokenKey),
  generateRefreshToken: (payload) => Jwt.token.generate(payload, config.auth.refreshTokenKey),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifact = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifact, config.auth.refreshTokenKey);
      const { payload } = artifact.decoded;
      return payload;
    } catch (error) {
      console.error('🚀 ~ verifyRefreshToken error:', error);
      throw new InvariantError('Invalid refresh token');
    }
  },
};

export default TokenManager;
