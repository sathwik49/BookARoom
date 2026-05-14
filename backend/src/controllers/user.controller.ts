import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { getAdminStatsService } from "../services/user.service";
import { ApiResponse } from "../utils/ApiResponse";
import httpStatusCodes from "../constants/httpCodes";

export const getAdminStatsController = asyncHandler(
  async (req: Request, res: Response) => {
    const stats = await getAdminStatsService();

    return ApiResponse.ok(
      res,
      stats,
      "Fetched Stats",
      httpStatusCodes.OK,
      null,
    );
  },
);
