import Joi from 'joi';

const UsersSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

export default UsersSchema;
