import { eq } from "drizzle-orm";
import { db } from ".";
import { boards, users } from "./schema";
import { randomUUID } from "node:crypto";

export const getUserByUsername = async (username: string) => {
  return await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .get();
};

export const registerUser = async (user: {
  username: string;
  password: string;
  email: string;
}) => {
  return await db
    .insert(users)
    .values({
      id: randomUUID(),
      username: user.username,
      email: user.email,
      password: user.password,
    })
    .returning()
    .get();
};

export const getBoardBySlug = async (slug: string) => {
  return await db.query.boards.findFirst({
    where: eq(boards.slug, slug),
    with: {
      threads: true,
    },
  });
};
