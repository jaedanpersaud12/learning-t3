import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { getUserByClerkId } from "@/server/queries";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as {
      type: string;
      data: {
        id: string;
        first_name: string;
        last_name: string;
        email_addresses: { email_address: string }[];
      };
    };

    if (payload.type === "user.created") {
      const { id, first_name, last_name, email_addresses } = payload.data;

      const existingUser = await getUserByClerkId(id);

      if (!existingUser) {
        await db.insert(users).values({
          clerkId: id,
          displayName: `${first_name} ${last_name}`.trim() || "Unknown",
          email: email_addresses[0]?.email_address ?? "",
          phone: "",
          username: "",
          role: "ADMIN",
          balance: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        console.log(`New user created: ${id}`);
        return NextResponse.json(
          { status: "success", message: "User created" },
          { status: 201 },
        );
      } else {
        console.log(`User already exists: ${id}`);
        return NextResponse.json(
          { status: "success", message: "User already exists" },
          { status: 200 },
        );
      }
    }

    // Handle other event types if needed
    return NextResponse.json(
      { status: "success", message: "Webhook received" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { status: "error", message: "Error processing webhook" },
      { status: 400 },
    );
  }
}
