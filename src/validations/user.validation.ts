import Joi from "joi";
import { objectId, password } from "./custom.validation";

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    image: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required().custom(password),
    status: Joi.string().valid("active", "disable").required(),
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
    userId: Joi.string().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().optional(),
      username: Joi.string().optional(),
      email: Joi.string().optional().email(),
      image: Joi.string().optional(),
      phone: Joi.string().optional(),
      password: Joi.string().optional().custom(password),
      status: Joi.string().valid("active", "disable").optional(),
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
      username: Joi.string().optional(),
      image: Joi.string().optional(),
      phone: Joi.string().optional(),
      password: Joi.string().optional().custom(password),
      status: Joi.string().valid("active", "disable").optional(),
    })
    .min(1),
};

const followUser = {
  params: Joi.object().keys({
    followingId: Joi.string().required(),
  }),
};

const enrollCourse = {
  body: Joi.object().keys({
    courseId: Joi.string().required(),
  }),
};
const continueCourse = {
  body: Joi.object().keys({
    courseEnrolledId: Joi.string().required(),
  }),
};

const passEnrolledCourseExam = {
  body: Joi.object().keys({
    courseEnrolledId: Joi.string().required(),
    answers: Joi.array().required(),
  }),
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  followUser,
  enrollCourse,
  continueCourse,
  passEnrolledCourseExam,
  updateMe,
};
