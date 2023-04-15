import httpStatus from "http-status";
import { userService } from "../services";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const result = await userService.queryUsers();
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateMe = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.user?._id, req.body);
  res.send(user);
});


export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
};
