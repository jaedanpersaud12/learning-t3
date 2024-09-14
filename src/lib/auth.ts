import { auth } from "@clerk/nextjs/server";

export default function authUser() {
  const user = auth();

  if (!user.userId) throw new Error("User not signed in");

  return user;
}
