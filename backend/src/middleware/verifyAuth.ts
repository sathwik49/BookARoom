import { NextFunction, Request, Response } from "express";
import asyncHandler from "./asyncHandler";
import appConfig from "../config/appConfig";
import { AuthError } from "../utils/error";
import jwt from "jsonwebtoken";
import { JwtDecodedPayload } from "../types";
import { getUserById } from "../utils/user";

export const verifyAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies[appConfig.JWT_COOKIE_NAME];
    if (!token) throw new AuthError();

    const result = jwt.verify(token, appConfig.JWT_SECRET) as JwtDecodedPayload;
    const user = await getUserById(result.userId);
    req.user = user;

    next();
  },
);
