import dotenv from 'dotenv';
import EnvironmentValidation from '../validator/env/index.js';

dotenv.config();

const validation = EnvironmentValidation.validateEnv();

const config = {
  app: {
    node_env: validation.NODE_ENV,
    port: validation.PORT,
  },
  db: {
    user: validation.PGUSER,
    password: validation.PGPASSWORD,
    database: validation.PGDATABASE,
    host: validation.PGHOST,
    port: validation.PGPORT,
  },
  auth: {
    accessTokenKey: validation.ACCESS_TOKEN_KEY,
    refreshTokenKey: validation.REFRESH_TOKEN_KEY,
    accessTokenAge: validation.ACCESS_TOKEN_AGE,
  },
  rabbitMq: {
    server: validation.RABBITMQ_SERVER,
  },
  redis: {
    host: validation.REDIS_SERVER,
    port: validation.REDIS_PORT,
  },
};

export default config;
