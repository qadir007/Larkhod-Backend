import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import bcryptjs from "bcryptjs";
import User from "../Models/User";

const createUser = async (reqBody) => {
  if (await getUserByEmail(reqBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const hashPass = await bcryptjs.hashSync(reqBody.password);
  return await User.create({
    ...reqBody,
    password: hashPass,
  });
};

const queryUsers = async () => {
  return await User.find();
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await User.findByIdAndUpdate(userId, updateBody);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await User.findByIdAndRemove(userId);
  return user;
};

export default {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
