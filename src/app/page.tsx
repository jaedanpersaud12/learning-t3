import { db } from "@/server/db";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  console.log(images);

  return (
    <main className="mx-10">
      {images.map((image) => (
        <div key={image.id}>
          <div className="text-2xl font-bold text-white">{image.name}</div>
          <Image src={image.url} alt="mock" width={200} height={200} />
        </div>
      ))}
    </main>
  );
}
