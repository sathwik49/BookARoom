import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  createClassroomSchema,
  updateClassroomSchema,
} from "../validations/classroom.validation";
import {
  createClassRoomService,
  deleteClassRoomService,
  getClassRoomByIdService,
  updateClassRoomService,
  getAllClassRoomsService,
} from "../services/classroom.service";
import { ApiResponse } from "../utils/ApiResponse";
import httpStatusCodes from "../constants/httpCodes";
import { AppError } from "../utils/error";

export const createClassRoomController = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = createClassroomSchema.safeParse(req.body);
    if (!validation.success) {
      throw validation.error;
    }
    await createClassRoomService(validation.data);

    return ApiResponse.ok(
      res,
      null,
      "Created CR",
      httpStatusCodes.CREATED,
      null,
    );
  },
);

export const getAllClassRoomsController = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;

    const limit = Math.min(Number(req.query.limit) || 10, 50);

    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const building =
      typeof req.query.building === "string" ? req.query.building : undefined;

    const result = await getAllClassRoomsService({
      page,
      limit,
      search,
      building,
    });

    return ApiResponse.ok(
      res,
      { classrooms: result.classrooms, pagination: result.pagination },
      "Fetched classrooms",
      httpStatusCodes.OK,
      null,
    );
  },
);

export const getClassRoomByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params["id"];
    if (!id || typeof id !== "string") {
      throw new AppError("CR not found");
    }
    const result = await getClassRoomByIdService(id);

    return ApiResponse.ok(
      res,
      { classroom: result.cr },
      "Fetched CR",
      httpStatusCodes.OK,
      null,
    );
  },
);

export const updateClassRoomController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params["id"];
    if (!id || typeof id !== "string") {
      throw new AppError("CR not found");
    }
    const validation = updateClassroomSchema.safeParse(req.body);
    if (!validation.success) {
      throw validation.error;
    }
    await updateClassRoomService(validation.data, id);

    return ApiResponse.ok(res, null, "Updated CR", httpStatusCodes.OK, null);
  },
);

export const deleteClassRoomController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params["id"];
    if (!id || typeof id !== "string") {
      throw new AppError("CR not found");
    }
    await deleteClassRoomService(id);
    return ApiResponse.ok(res, null, "Deleted CR", httpStatusCodes.OK, null);
  },
);
