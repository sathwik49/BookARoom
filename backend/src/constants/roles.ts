export const ROLES = {
  ADMIN: "ADMIN",
  PROFESSOR: "PROFESSOR",
  STUDENT: "STUDENT",
  STAFF: "STAFF",
  INCHARGE: "INCHARGE",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
