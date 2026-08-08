import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";

export default function NewArrivalsPage() {
  const newProducts = products.filter((product) => product.isNew);

  return (
    <section className="max-w-7xl mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold mb-8">New Arrivals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
            />
            <h2>{product.name}</h2>
            <p>₹{product.price.toLocaleString("en-IN")}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}