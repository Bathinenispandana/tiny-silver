import Link from "next/link";
import { products } from "@/lib/products";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;

  const slugToCategory: Record<string, string> = {
  "kumkum-box": "KumKumBox",
  "toe-rings": "ToeRings",
  "diya": "Diya",
  "plates": "Plates",
  "glass": "Glass",
  "flower": "Flower",
  "leaf": "leaf",
  "srichakra": "srichakra",
};

const filteredProducts = products.filter(
  (product) => product.category === slugToCategory[slug]
);

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="mb-10 text-4xl font-bold capitalize">
        {slug.replace(/-/g, " ")}
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found in this collection.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="overflow-hidden rounded-xl border transition hover:shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-72 w-full object-cover"
                />

                <div className="p-4">
                  <h2 className="text-lg font-semibold">{product.name}</h2>

                  <p className="mt-2 font-medium">{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}