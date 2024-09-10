import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function TopNav() {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="">
        <h1 className="text-2xl font-bold">Gallery</h1>
      </div>
      <div className="flex items-center gap-4">
        <SignedOut>
          <Button variant="outline">
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default TopNav;
