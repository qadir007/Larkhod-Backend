import Joi from "joi";
import { objectId, password } from "./custom.validation";

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    image: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().optional(),
      email: Joi.string().optional().email(),
      image: Joi.string().optional(),
      phone: Joi.string().optional(),
      password: Joi.string().optional().custom(password),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const updateMe = {
  body: Joi.object()
    .keys({
      name: Joi.string().optional(),
      image: Joi.string().optional(),
      phone: Joi.string().optional(),
      password: Joi.string().optional().custom(password),
    })
    .min(1),
};



export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
};
