import "server-only";
import { db } from "./db";

export const getUserByClerkId = async (clerkId: string) => {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.clerkId, clerkId),
  });

  return user;
};
