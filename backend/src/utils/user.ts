import db from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { NotFoundError } from "./error";

export const getUserById = async (userId: string) => {
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      avatar: users.avatar,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) throw new NotFoundError("User not found");

  return user;
};
