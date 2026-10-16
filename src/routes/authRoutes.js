import { celebrate } from "celebrate";
import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from "../controllers/authController.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validations/authValidation.js";

const router = Router();

router.post("/auth/register", celebrate(registerUserSchema), registerUser);

router.post("/auth/login", celebrate(loginUserSchema), loginUser);

router.post("/auth/logout", logoutUser);

router.post("/auth/refresh", refreshSession);

export default router;
