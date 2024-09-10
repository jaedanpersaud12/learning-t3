import { db } from "@/server/db";
import Image from "next/image";

const mockUrls = [
  "https://utfs.io/f/901c36d6-45f3-4ac1-b14d-0282ca8736d6-mqi9le.jpg",
  "https://utfs.io/f/0254134d-6b56-44cc-b21f-e512c420ae72-k9mxhx.jpg",
];

const mockImages = mockUrls.map((url, index) => {
  return {
    id: index + 1,
    url,
  };
});

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main className="">
      {posts.map((post) => (
        <div key={post.id}>
          <div className="text-2xl font-bold text-white">{post.name}</div>
        </div>
      ))}
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id}>
            <Image src={image.url} alt="mock" width={200} height={200} />
          </div>
        ))}
      </div>
    </main>
  );
}
