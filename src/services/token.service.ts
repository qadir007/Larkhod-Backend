import jwt from "jsonwebtoken";
import moment from "moment";
import httpStatus from "http-status";
import config from "../config/config";
import userService from "./user.service";
import ApiError from "../utils/ApiError";
import { tokenTypes } from "../config/tokens";

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    id: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const verifyToken = async (token) => {
  const payload = jwt.verify(token, config.jwt.secret);
  if (!payload) {
    throw new Error("Token is invalid");
  }
  return payload;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  return accessToken;
};

const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "No users found with this email");
  }
  const expires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    "minutes"
  );
  const resetPasswordToken = generateToken(
    user._id,
    expires,
    tokenTypes.RESET_PASSWORD
  );
  return resetPasswordToken;
};

const generateVerifyEmailToken = async (email) => {
  const expires = moment().add(
    config.jwt.verifyEmailExpirationMinutes,
    "minutes"
  );
  const verifyEmailToken = generateToken(
    email,
    expires,
    tokenTypes.VERIFY_EMAIL
  );
  return verifyEmailToken;
};

export default {
  generateToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
};
