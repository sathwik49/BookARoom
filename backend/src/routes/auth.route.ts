import { Router } from "express";
import {
  getMeController,
  googleLoginController,
} from "../controllers/auth.controller";
import { verifyAuth } from "../middleware/verifyAuth";

export const authRouter = Router();

authRouter.post("/google", googleLoginController);
authRouter.get("/me", verifyAuth, getMeController);
