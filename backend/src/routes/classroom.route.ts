import { Router } from "express";
import {
  createClassRoomController,
  deleteClassRoomController,
  getAllClassRoomsController,
  getClassRoomByIdController,
  updateClassRoomController,
} from "../controllers/classroom.controller";
import { roleGuard } from "../middleware/roleGuard";

export const classroomRouter = Router();

classroomRouter.post(
  "/",
  roleGuard("ADMIN", "INCHARGE"),
  createClassRoomController,
);

classroomRouter.get("/", getAllClassRoomsController);

classroomRouter.get("/:id", getClassRoomByIdController);

classroomRouter.patch(
  "/:id",
  roleGuard("ADMIN", "INCHARGE"),
  updateClassRoomController,
);

classroomRouter.delete(
  "/:id",
  roleGuard("ADMIN", "INCHARGE"),
  deleteClassRoomController,
);
