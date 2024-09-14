import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { images } from "@/server/db/schema";
import { Download, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ImageCard = ({ image }: { image: typeof images.$inferSelect }) => {
  return (
    <Card className="mb-4 break-inside-avoid overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full">
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              alt={image.name}
              width={500}
              height={500}
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
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

export default ImageCard;
