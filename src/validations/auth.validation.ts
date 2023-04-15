import Joi from "joi";
import { password } from "./custom.validation";

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    image: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required().custom(password),
    status: Joi.boolean().optional(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
const changePassword = {
  body: Joi.object().keys({
    currentPassword: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

export default {
  register,
  login,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  changePassword,
};
