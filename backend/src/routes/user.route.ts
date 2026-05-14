import { Router } from "express";
import { getAdminStatsController } from "../controllers/user.controller";
import { roleGuard } from "../middleware/roleGuard";

export const userRouter = Router();

userRouter.get(
  "/stats",
  roleGuard("ADMIN", "INCHARGE"),
  getAdminStatsController,
);
