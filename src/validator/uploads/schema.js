import Joi from 'joi';

const ImageHeaderSchema = Joi.object({
  'content-type': Joi.string()
    .valid('image/png', 'image/avif', 'image/gif', 'image/jpeg', 'image/jpg', 'image/apng', 'image/webp')
    .required(),
}).unknown();

export default ImageHeaderSchema;
