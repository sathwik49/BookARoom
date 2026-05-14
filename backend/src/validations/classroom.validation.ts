import * as z from "zod";

export const createClassroomSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: "Classroom name is required",
    })
    .max(100, {
      message: "Classroom name must not exceed 100 characters",
    }),

  building: z
    .string()
    .trim()
    .min(1, {
      message: "Building name is required",
    })
    .max(100, {
      message: "Building name must not exceed 100 characters",
    }),

  capacity: z
    .number({
      message: "Capacity must be a number",
    })
    .int({
      message: "Capacity must be an integer",
    })
    .positive({
      message: "Capacity must be greater than 0",
    })
    .max(1000, {
      message: "Capacity must not exceed 1000",
    }),

  location: z.string().trim().optional(),
});

export const updateClassroomSchema = createClassroomSchema.partial();

export type CreateClassroomSchemaType = z.infer<typeof createClassroomSchema>;

export type UpdateClassroomSchemaType = z.infer<typeof updateClassroomSchema>;
