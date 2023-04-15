import httpStatus from "http-status";
import {
  authService,
  emailService,
  tokenService,
  userService,
} from "../services";
import catchAsync from "../utils/catchAsync";

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const token = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, token });
});
const getAuthUser = catchAsync(async (req, res) => {  
  const user = await userService.getUserById(req.user.id);
  const token = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, token });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const token = await tokenService.generateAuthTokens(user);
  res.send({ user, token });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateVerifyEmailToken(
    req.body.email
  );
  const sendEmail = await emailService.sendResetPasswordEmail(
    req.body.email,
    resetPasswordToken
  );
  res.status(httpStatus.OK).send({ sendEmail });
});

const changePassword = catchAsync(async (req, res) => {
  await authService.changePassword(
    req.user,
    req.body.currentPassword,
    req.body.password
  );
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user.email
  );

  await userService.getUserByEmail(req.user.email);

  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  getAuthUser,
  changePassword,
};
