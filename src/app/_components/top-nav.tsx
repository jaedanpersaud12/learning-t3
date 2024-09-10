"use client";

import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/utils/uploadthing";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

function TopNav() {
  const router = useRouter();
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
      <SignedIn>
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            router.refresh();
          }}
        />
      </SignedIn>
    </div>
  );
}

export default TopNav;
