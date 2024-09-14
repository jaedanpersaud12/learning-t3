import { SignedIn, SignedOut } from "@clerk/nextjs";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SignedOut>
        <div>Please sign in to view the images</div>
      </SignedOut>
      <SignedIn></SignedIn>
    </main>
  );
}
