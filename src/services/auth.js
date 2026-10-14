import crypto from "node:crypto";
import { Session } from "../models/session.js";

export const createSession = async (userId) => {
  return Session.create({
    userId,
    accessToken: crypto.randomUUID(),
    refreshToken: crypto.randomUUID(),
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
};

export const setSessionCookies = (res, session) => {
  res.cookie("accessToken", session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
};
