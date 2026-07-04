'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const heroSlides = [
  {
    id: 1,
    title: 'Timeless Elegance',
    subtitle: 'Discover our premium sterling silver collection',
    image: '1.jpeg',
    cta: 'Shop Now',
    ctaLink: '/products',
  },
  {
    id: 2,
    title: 'Crafted to Perfection',
    subtitle: 'Exquisite designs for the discerning collector',
    image: '/products/statement-ring.png',
    cta: 'Explore',
    ctaLink: '/products',
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoplay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % heroSlides.length)
    setAutoplay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setAutoplay(false)
  }

  const slide = heroSlides[current]

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-primary/5 to-background overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern" style={{
          backgroundImage: 'linear-gradient(rgba(202, 148, 193, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(202, 148, 193, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Slides */}
      {heroSlides.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center">
            {/* Content */}
            <div className="z-10 px-8 md:px-12 space-y-8">
              <div className="space-y-4 animate-in fade-in slide-in-from-left-8 duration-1000">
                <h2 className="text-5xl md:text-7xl font-bold text-primary">
                  {item.title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 === 0 ? 'text-accent' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h2>
                <p className="text-lg md:text-xl text-primary/80 max-w-md">
                  {item.subtitle}
                </p>
              </div>

              <div className="animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                <Link
                  href={item.ctaLink}
                  className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-accent text-background font-bold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
                >
                  {item.cta}
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="hidden md:flex justify-center items-center h-full relative">
              <div className="absolute w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
              <img
                src={item.image}
                alt={item.title}
                className="relative w-80 h-80 object-cover rounded-2xl shadow-2xl shadow-primary/30 animate-in fade-in zoom-in duration-1000"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 backdrop-blur-md"
      > 
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 backdrop-blur-md"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index)
              setAutoplay(false)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? 'bg-accent w-8'
                : 'bg-primary/40 hover:bg-primary/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
