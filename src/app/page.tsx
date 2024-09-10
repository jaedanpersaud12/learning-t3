import { db } from "@/server/db";
import { images } from "@/server/db/schema";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="mx-10">
      <SignedOut>
        <div>Please sign in to view the images</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}

const Images = async () => {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};

const ImageCard = async ({ image }: { image: typeof images.$inferSelect }) => {
  return (
    <div>
      <Image src={image.url} alt={image.name} width={200} height={200} />
    </div>
  );
};
