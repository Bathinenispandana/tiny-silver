import React from 'react'
import { MasonryGrid } from '@/components/MasonryGrid'
import { products } from '@/lib/products'

export default function FeaturedCollections() {

      // Get featured products (first 8)
      const featuredProducts = products.slice(0, 8)

  return (
    <section className="py-20 px-4 md:px-8 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
            </div>
    
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  Featured Collection
                </h2>
                <p className="text-primary/60">
                  Handpicked pieces for the discerning collector
                </p>
              </div>
    
              <MasonryGrid products={featuredProducts} columns={4} />
            </div>
          </section>
  )
}
