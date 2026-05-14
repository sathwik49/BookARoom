import { Router } from "express";
import {
  getMeController,
  googleLoginController,
  logOutController,
} from "../controllers/auth.controller";
import { verifyAuth } from "../middleware/verifyAuth";

export const authRouter = Router();

authRouter.post("/google", googleLoginController);
authRouter.post("/logout", verifyAuth, logOutController);
authRouter.get("/me", verifyAuth, getMeController);
