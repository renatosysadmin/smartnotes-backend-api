import Joi from 'joi';

export const noteSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'O título deve ter no mínimo 3 caracteres',
      'string.max': 'O título deve ter no máximo 100 caracteres'
    }),
  content: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.min': 'O conteúdo não pode estar vazio'
    })
});
