'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

const collections = [
  { id: 1, name: 'KumKumBox', image: '/Kumkum-box.png', count: 2 },
  { id: 2, name: 'ToeRings', image: '/toe-ring-fly.jpeg', count: 4 },
  { id: 3, name: 'Diya', image: '/diya.jpeg', count: 2 },
  { id: 4, name: 'Plates', image: '/plate.jpeg', count: 2 },
  { id: 5, name: 'Glass', image: '/Glass.png', count: 1 },
  { id: 6, name: 'Sets', image: '/products/statement-ring.png', count: 14 },
]

export function CollectionsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-20 px-4 md:px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-2">
            Explore Collections
          </h2>
          <p className="text-accent/60">Discover our curated silver collections</p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory no-scrollbar"
          >
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/products?category=${collection.name.toLowerCase()}`}
                className="flex-shrink-0 w-80 group cursor-pointer snap-start"
              >
                <div className="relative h-96 rounded-2xl overflow-hidden backdrop-blur-md border border-primary/20 bg-background/40 hover:border-primary/50 transition-all duration-300">
                  {/* Image */}
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-primary z-10">
                    <h3 className="text-2xl text-sidebar font-bold mb-1">{collection.name}</h3>
                    <p className="text-sm text-sidebar">{collection.count} items</p>

                    {/* Floating button */}
                    <div className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-primary to-accent text-background rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      View Collection
                    </div>
                  </div>

                  {/* Border glow effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-primary/30 pointer-events-none" />
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 backdrop-blur-md"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 backdrop-blur-md"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
