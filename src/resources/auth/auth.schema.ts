import Joi from 'joi';

export const signupSchema = Joi.object({
  email: Joi.string().email().max(100).required(),
  fullname: Joi.string().max(100).required(),
  password: Joi.string()
    .min(8).max(128)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
