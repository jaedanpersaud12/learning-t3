import { type ClerkWebhookEvent } from "@/app/api/user/_types";
import "server-only";
import { db } from "./db";
import { users } from "./db/schema";
import { getUserByClerkId } from "./queries";
import { type userRoleEnum } from "./db/schema";

export const createUser = async (
  clerkId: string,
  evt: ClerkWebhookEvent,
  role: (typeof userRoleEnum.enumValues)[number] = "USER",
) => {
  console.log("Creating user with clerkId:", clerkId);
  console.log("Role:", role);

  const existingUser = await getUserByClerkId(clerkId);
  console.log("Existing user:", existingUser);

  const email = evt.data.email_addresses[0]?.email_address ?? "";
  console.log("Email:", email);

  if (!existingUser) {
    console.log("No existing user found, creating new user");
    try {
      const displayName =
        `${evt.data.first_name ?? ""} ${evt.data.last_name ?? ""}`.trim() ||
        "Unknown";
      console.log("Display name:", displayName);

      const newUser = {
        clerkId,
        displayName,
        email,
        phone: "",
        username: email.split("@")[0] ?? "",
        role,
        balance: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.log("New user data:", newUser);

      await db.insert(users).values(newUser);
      console.log("User inserted successfully");
    } catch (error) {
      console.error("Error inserting user:", error);
      throw error;
    }
  } else {
    console.log("User already exists, skipping creation");
  }
};
