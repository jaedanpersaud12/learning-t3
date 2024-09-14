import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

const authUser = () => {
  const user = auth();

  if (!user.userId) throw new Error("User not signed in");

  return user;
};

// export const getCurrentUserImages = async () => {
//   const user = authUser();

//   const images = await db.query.images.findMany({
//     where: (model, { eq }) => eq(model.userId, user.userId),
//     orderBy: (model, { desc }) => desc(model.id),
//   });

//   if (!images) return [];

//   return images;
// };
