import { Router } from "express";
import { authRouter } from "./auth.route";
import { classroomRouter } from "./classroom.route";
import { verifyAuth } from "../middleware/verifyAuth";
import { userRouter } from "./user.route";

export const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/classroom", verifyAuth, classroomRouter);
mainRouter.use("/user", verifyAuth, userRouter);
