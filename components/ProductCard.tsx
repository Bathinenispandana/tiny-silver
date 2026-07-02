import Link from 'next/link'
import { Product } from '@/lib/products'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = `₹${product.price.toLocaleString('en-IN')}`

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group h-full overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg hover:border-accent">
        {/* Image */}
        <div className="relative h-64 w-full overflow-hidden bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-muted-foreground/30 mb-2">
                ◆
              </div>
              <p className="text-sm text-muted-foreground text-balance">
                {product.name}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Category */}
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="mb-2 text-lg font-semibold text-foreground text-balance group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          {/* Details */}
          <div className="mb-4 space-y-1 text-xs text-muted-foreground">
            <p>
              <span className="font-medium">Material:</span> {product.material}
            </p>
            <p>
              <span className="font-medium">Weight:</span> {product.weight}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">
              {formattedPrice}
            </span>
            {product.inStock ? (
              <span className="text-xs font-semibold text-green-600">In Stock</span>
            ) : (
              <span className="text-xs font-semibold text-destructive">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
