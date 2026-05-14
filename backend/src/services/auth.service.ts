import { and, eq } from "drizzle-orm";
import appConfig from "../config/appConfig";
import db from "../db/db";
import { accounts, users } from "../db/schema";
import { AppError } from "../utils/error";
import { generateJwtToken } from "../utils/jwt";

export const googleLoginService = async (token: string) => {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const payload = await response.json();

  if (!payload.email) {
    throw new AppError("Invalid Google token");
  }
  const { email, name, picture, sub: googleId } = payload;

  const [isExistingAccount] = await db
    .select()
    .from(accounts)
    .where(
      and(
        eq(accounts.provider, "google"),
        eq(accounts.providerAccountId, googleId),
      ),
    )
    .limit(1);

  if (isExistingAccount) {
    const jwtToken = generateJwtToken({ userId: isExistingAccount.userId });
    return { jwtToken };
  }

  const result = await db.transaction(async (tx) => {
    let [user] = await tx
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      [user] = await tx
        .insert(users)
        .values({ email, name: name ?? "", avatar: picture })
        .returning();
    }

    const [account] = await tx
      .insert(accounts)
      .values({
        provider: "google",
        providerAccountId: googleId,
        userId: user.id,
      })
      .returning();

    return { user, account };
  });

  const jwtToken = generateJwtToken({ userId: result.user.id });
  return { jwtToken };
};
