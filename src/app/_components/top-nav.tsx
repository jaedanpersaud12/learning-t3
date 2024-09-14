"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function TopNav() {
  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between">
        <div className="">
          <Link href="/">
            <h1 className="text-2xl font-bold">Gallery</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <SignedOut>
            <Button asChild variant="outline">
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
