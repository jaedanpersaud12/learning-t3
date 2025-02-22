import "server-only";
import { db } from "./db";

export const getUserByClerkId = async (clerkId: string) => {
  console.log("Looking up user with clerkId:", clerkId);
  try {
    const user = await db.query.users.findFirst({
      where: (model, { eq }) => eq(model.clerkId, clerkId),
    });
    console.log("Database lookup result:", user);
    return user;
  } catch (error) {
    console.error("Error looking up user:", error);
    throw error;
  }
};
