import { isHttpError } from "http-errors";

export const errorHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    // console.log(error.status, error.message, error.name);
    return res.status(error.status).json({ error: error.message });
  }

  // localhost - оточення розробки DEV error.stack
  // vercel/render - оточення продакшена PROD error.message
  const isProduction = process.env.NODE_ENV === "production";

  res.status(500).json({
    error: isProduction ? error.message : error.stack,
  });
};
