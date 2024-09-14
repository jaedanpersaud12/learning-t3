import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import * as React from "react";

import { Button } from "@/components/ui/button";
import Google from "@/icons/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function UserAuthForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <h1 className="text-center text-2xl font-semibold">
        Sign In to Credit Cloud
      </h1>
      <SignedOut>
        <SignInButton forceRedirectUrl={"/dashboard"}>
          <Button variant="outline">
            <div className="flex items-center gap-2">
              <Google size={20} />
              Sign in with Google
            </div>
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-col gap-2">
          <SignOutButton redirectUrl="/login">
            <Button variant="outline">Sign Out</Button>
          </SignOutButton>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </SignedIn>
    </div>
  );
}
