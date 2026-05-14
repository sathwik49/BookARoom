import { NextFunction, Request, Response } from "express";
import { Role } from "../constants/roles";
import { AuthError, ForbiddenError } from "../utils/error";

export const roleGuard =
  (...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      throw new AuthError();
    }

    if (!roles.includes(user.role as Role)) {
      throw new ForbiddenError();
    }

    next();
  };
