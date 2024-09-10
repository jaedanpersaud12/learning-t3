import { db } from "@/server/db";
import { images } from "@/server/db/schema";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SignedOut>
        <div>Please sign in to view the images</div>
      </SignedOut>
      <SignedIn>
        <ImageGallery />
      </SignedIn>
    </main>
  );
}

const ImageGallery = async () => {
  const user = auth();

  if (!user.userId) return null;

  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
    where: (model, { eq }) => eq(model.userId, user.userId),
  });

  return (
    <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};

const ImageCard = ({ image }: { image: typeof images.$inferSelect }) => {
  return (
    <Card className="mb-4 break-inside-avoid overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full">
          <Image
            src={image.url}
            alt={image.name}
            width={500}
            height={500}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-2">
        <p className="truncate pl-2 text-sm font-medium">{image.name}</p>
        <div className="flex space-x-2">
          <Button size="icon" variant="ghost">
            <Download className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
