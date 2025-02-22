import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import * as React from "react";
import { Button } from "@/components/ui/button";
import Google from "@/icons/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function BusinessAuthForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <h1 className="text-center text-2xl font-semibold">
        Business Sign In to Credit Cloud
      </h1>
      <SignedOut>
        <div className="grid gap-4">
          <SignInButton>
            <Button variant="outline">
              <div className="flex items-center gap-2">
                <Google size={20} />
                Sign in with Google (Business)
              </div>
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button>
              <div className="flex items-center gap-2">
                <Google size={20} />
                Sign up with Google (Business)
              </div>
            </Button>
          </SignUpButton>
        </div>
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
