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

export default function HomePage() {
  return (
    <main className="">
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
