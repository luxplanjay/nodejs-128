import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { createSession, setSessionCookies } from "../services/auth.js";
import { Session } from "../models/session.js";
import { sendEmail } from "../utils/sendEmail.js";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(400, "Email in use!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  const newSession = await createSession(newUser._id);
  setSessionCookies(res, newSession);

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, "Bad credentials");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, "Bad credentials");
  }

  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);

  res.status(200).json(user);
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("sessionId");

  res.status(204).send();
};

export const refreshSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (!sessionId || !refreshToken) {
    throw createHttpError(401, "Bad credentials");
  }

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, "Session not found");
  }

  const isRefreshTokenExpired = session.refreshTokenValidUntil < new Date();

  if (isRefreshTokenExpired) {
    await session.deleteOne();
    res.clearCookie("sessionId");
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    throw createHttpError(401, "Session expired");
  }

  // Оновлювати сесію!!!
  await session.deleteOne();
  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({ message: "Session refreshed!" });
};

export const requestResetEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(200)
      .json({ message: "Email with reset link has been sent" });
  }

  const resetToken = jwt.sign(
    { sub: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  // my-app.com/reset-pwd?token=iwjbghijbwgjbiwg
  const frontendURL = `${process.env.FRONTEND_URL}?token=${resetToken}`;
  console.log(resetToken);

  await sendEmail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Password reset link",
    html: `<p>Email reset <a href=${frontendURL}>link</a> here!!!</p>`,
  });

  res.status(200).json({ message: "Email with reset link has been sent" });
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  let payload;
  try {
    //  { sub: user._id, email: user.email },
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw createHttpError(401, "Bad token");
  }

  const user = await User.findOne({ _id: payload.sub, email: payload.email });
  if (!user) {
    throw createHttpError(404, "Not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.updateOne({ _id: user._id }, { password: hashedPassword });

  await Session.deleteMany({ userId: user._id });

  res.status(200).json({ message: "Password reset success" });
};
