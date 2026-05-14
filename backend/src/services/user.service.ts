import { count } from "drizzle-orm";
import db from "../db/db";
import { classrooms, users } from "../db/schema";

export const getAdminStatsService = async () => {
  const [[totalClassrooms], [totalUsers]] = await Promise.all([
    db.select({ count: count() }).from(classrooms),
    db.select({ count: count() }).from(users),
  ]);

  return {
    totalClassrooms: totalClassrooms.count,
    totalUsers: totalUsers.count,
  };
};
