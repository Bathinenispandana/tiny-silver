'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

const collections = [
  {
    id: 1,
    name: "KumKumBox",
    slug: "kumkum-box",
    image: "/Kumkum-box.png",
    count: 2,
  },
  {
    id: 2,
    name: "Toe Rings",
    slug: "toe-rings",
    image: "/toe-ring-fly.jpeg",
    count: 4,
  },
  {
    id: 3,
    name: "Diya",
    slug: "diya",
    image: "/diya.jpeg",
    count: 2,
  },
  {
    id: 4,
    name: "Plates",
    slug: "plates",
    image: "/plate.jpeg",
    count: 2,
  },
  {
    id: 5,
    name: "Glass",
    slug: "glass",
    image: "/Glass.png",
    count: 1,
  },
  {
    id: 6,
    name: "Sets",
    slug: "sets",
    image: "/products/statement-ring.png",
    count: 14,
  },
];

export function CollectionsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="relative py-20 px-4 md:px-8">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-accent">
            Explore Collections
          </h2>
          <p className="text-accent/60">
            Discover our curated silver collections
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory no-scrollbar"
          >
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/products?category=${encodeURIComponent(
                  collection.name.toLowerCase()
                )}`}
                className="group flex w-52 flex-shrink-0 snap-start flex-col items-center"
              >
                {/* Circular Image */}
                <div className="relative h-44 w-44 overflow-hidden rounded-full border border-primary/20 bg-background shadow-md transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-xl">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 rounded-full bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Content Outside Image */}
                <div className="mt-5 flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold text-accent">
                    {collection.name}
                  </h3>

                  <p className="mt-1 text-sm text-accent/60">
                    {collection.count} Items
                  </p>

                  <span className="mt-4 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    View Collection
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={() => scroll('left')}
              className="rounded-full bg-primary/20 p-3 text-primary backdrop-blur-md transition-all duration-300 hover:bg-primary/40 hover:shadow-lg hover:shadow-primary/40"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={() => scroll('right')}
              className="rounded-full bg-primary/20 p-3 text-primary backdrop-blur-md transition-all duration-300 hover:bg-primary/40 hover:shadow-lg hover:shadow-primary/40"
            >
              <ChevronRight size={22} />
            </button>
          </div>
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