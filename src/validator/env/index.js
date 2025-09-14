import ConfigError from '../../exceptions/ConfigError.js';
import envSchema from './schema.js';

const EnvironmentValidation = {
  validateEnv: () => {
    const validationResult = envSchema.validate(process.env);

    if (validationResult.error) throw new ConfigError(validationResult.error.message);
    return validationResult.value;
  },
};

export default EnvironmentValidation;
