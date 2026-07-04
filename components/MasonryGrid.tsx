'use client'

import { FuturisticProductCard } from './FuturisticProductCard'

interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  rating: number
  reviews: number
}

interface MasonryGridProps {
  products: Product[]
  columns?: number
}

export function MasonryGrid({ products, columns = 4 }: MasonryGridProps) {
  // Create columns for masonry layout
  const columnCount = columns
  const columnProducts = Array.from({ length: columnCount }, () => [] as Product[])

  products.forEach((product, index) => {
    columnProducts[index % columnCount].push(product)
  })

  const gridColsClass = 
    columnCount === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
    columnCount === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
    'grid-cols-1 md:grid-cols-2'

  return (
    <div className={`grid gap-6 ${gridColsClass}`}>
      {columnProducts.map((column, colIndex) => (
        <div
          key={colIndex}
          className="space-y-6"
          style={{
            marginTop: colIndex % 2 === 1 ? '120px' : '0',
          }}
        >
          {column.map((product) => (
            <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{
              animationDelay: `${(colIndex + 1) * 100}ms`,
            }}>
              <FuturisticProductCard product={product} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
