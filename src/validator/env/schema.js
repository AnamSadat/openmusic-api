import Joi from 'joi';

const envSchema = Joi.object({
  // App
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
  PORT: Joi.number().default(5000),
  HOST: Joi.string().default('localhost'),

  // Database
  PGUSER: Joi.string().required(),
  PGPASSWORD: Joi.string().required(),
  PGDATABASE: Joi.string().required(),
  PGHOST: Joi.string().required(),
  PGPORT: Joi.number().default(5432),

  // Authentication
  ACCESS_TOKEN_KEY: Joi.string().required(),
  REFRESH_TOKEN_KEY: Joi.string().required(),
  ACCESS_TOKEN_AGE: Joi.string().default('1h'),

  // RabbitMQ
  RABBITMQ_SERVER: Joi.string().required(),

  // Redis
  // REDIS_SERVER: Joi.string().required(),
}).unknown();

export default envSchema;
