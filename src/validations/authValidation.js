import { Segments, Joi } from "celebrate";

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
  }),
};

export const resetPasswordSchema = {
  [Segments.BODY]: Joi.object({
    password: Joi.string().min(8).max(16).required(),
    token: Joi.string().required(),
  }),
};
