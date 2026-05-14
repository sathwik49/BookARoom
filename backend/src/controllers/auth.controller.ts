import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { ValidationError } from "../utils/error";
import { googleLoginService } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";
import httpStatusCodes from "../constants/httpCodes";
import { cookieConfig, setCookies } from "../utils/setCookies";
import appConfig from "../config/appConfig";

export const googleLoginController = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) {
      throw new ValidationError("ID Token is required");
    }

    const result = await googleLoginService(token);

    setCookies(res, result.jwtToken);

    return ApiResponse.ok(res, null, "Successfull", httpStatusCodes.OK, null);
  },
);

export const logOutController = asyncHandler(
  async (req: Request, res: Response) => {
    res.clearCookie(appConfig.JWT_COOKIE_NAME, cookieConfig);
    return ApiResponse.ok(res, null, "Logged out", httpStatusCodes.OK, null);
  },
);

export const getMeController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;

    return ApiResponse.ok(
      res,
      user,
      "Fetched Profile successfully",
      httpStatusCodes.OK,
      null,
    );
  },
);
