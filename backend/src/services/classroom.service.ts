import { and, eq, count, ilike, desc, or } from "drizzle-orm";
import db from "../db/db";
import { classrooms } from "../db/schema";
import {
  CreateClassroomSchemaType,
  UpdateClassroomSchemaType,
} from "../validations/classroom.validation";
import { AppError, ValidationError } from "../utils/error";

export const createClassRoomService = async (
  data: CreateClassroomSchemaType,
) => {
  const { name, building, capacity, location } = data;
  const [isExistingCR] = await db
    .select()
    .from(classrooms)
    .where(and(eq(classrooms.building, building), eq(classrooms.name, name)))
    .limit(1);
  if (isExistingCR) {
    throw new ValidationError("A CR with the name exists in the building");
  }

  await db.insert(classrooms).values({
    name,
    building,
    capacity,
    location,
  });
  return;
};

type GetAllClassRoomsParams = {
  page: number;
  limit: number;
  search?: string;
  building?: string;
};

export const getAllClassRoomsService = async ({
  page,
  limit,
  search,
  building,
}: GetAllClassRoomsParams) => {
  const offset = (page - 1) * limit;

  const filters = [];

  if (search) {
    filters.push(
      or(
        ilike(classrooms.name, `%${search}%`),
        ilike(classrooms.building, `%${search}%`),
        ilike(classrooms.location, `%${search}%`),
      ),
    );
  }

  if (building) {
    filters.push(eq(classrooms.building, building));
  }

  const whereClause = filters.length > 0 ? and(...filters) : undefined;

  const data = await db
    .select({
      id: classrooms.id,
      name: classrooms.name,
      building: classrooms.building,
      capacity: classrooms.capacity,
      location: classrooms.location,
      createdAt: classrooms.createdAt,
    })
    .from(classrooms)
    .where(whereClause)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(classrooms.createdAt));

  const [totalResult] = await db
    .select({
      count: count(),
    })
    .from(classrooms)
    .where(whereClause);

  const total = Number(totalResult.count);

  return {
    classrooms: data,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getClassRoomByIdService = async (crId: string) => {
  const [cr] = await db
    .select({
      id: classrooms.id,
      name: classrooms.name,
      building: classrooms.building,
      capacity: classrooms.capacity,
      location: classrooms.location,
      createdAt: classrooms.createdAt,
    })
    .from(classrooms)
    .where(eq(classrooms.id, crId));

  if (!cr) {
    throw new AppError("CR not found");
  }

  return { cr };
};

export const updateClassRoomService = async (
  data: UpdateClassroomSchemaType,
  crId: string,
) => {
  const [cr] = await db
    .select()
    .from(classrooms)
    .where(eq(classrooms.id, crId));

  if (!cr) {
    throw new AppError("CR not found");
  }
  const { name, building, capacity, location } = data;

  const updateData: Partial<UpdateClassroomSchemaType> = {};

  if (name !== undefined) updateData.name = name;
  if (building !== undefined) updateData.building = building;
  if (capacity !== undefined) updateData.capacity = capacity;
  if (location !== undefined) updateData.location = location;

  const [updatedCr] = await db
    .update(classrooms)
    .set(updateData)
    .where(eq(classrooms.id, crId))
    .returning();

  return updatedCr;
};

export const deleteClassRoomService = async (crId: string) => {
  const [cr] = await db
    .select({
      id: classrooms.id,
      name: classrooms.name,
      building: classrooms.building,
      capacity: classrooms.capacity,
      location: classrooms.location,
      createdAt: classrooms.createdAt,
    })
    .from(classrooms)
    .where(eq(classrooms.id, crId));

  if (!cr) {
    throw new AppError("CR not found");
  }
  await db.delete(classrooms).where(eq(classrooms.id, crId));
  return;
};
