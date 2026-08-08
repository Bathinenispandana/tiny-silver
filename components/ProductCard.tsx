import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = `₹${Number(product.price).toLocaleString("en-IN")}`;

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl">
        {/* Image */}
        <div className="relative h-72 w-full overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
            {product.category}
          </p>

          <h3 className="mb-2 text-xl font-semibold group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {product.description ?? 'Handcrafted sterling silver piece.'}
          </p>

          <div className="mb-4 space-y-1 text-sm text-muted-foreground">
            <p>
              <span className="font-medium">Material:</span> {product.material ?? 'Sterling silver'}
            </p>
            <p>
              <span className="font-medium">Weight:</span> {product.weight}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {formattedPrice}
            </span>

            {product.inStock ? (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                In Stock
              </span>
            ) : (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
