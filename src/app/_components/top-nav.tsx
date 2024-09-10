import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function TopNav() {
  return (
    <div className="flex items-center justify-between border-b bg-gray-800 p-4">
      <div className="text-white">
        <h1 className="text-2xl font-bold">Gallery</h1>
      </div>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default TopNav;
