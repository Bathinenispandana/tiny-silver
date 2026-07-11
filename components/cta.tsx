import React from 'react'

export default function cta() {
  return (
    <section className="py-16 px-4 md:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-md bg-background/30 border border-primary/30 rounded-2xl p-12 text-center hover:border-primary/50 transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Explore More Collections
            </h2>
            <p className="text-primary/60 mb-8">
              Discover our complete range of premium silver jewelry
            </p>
            <a
              href="/products"
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-accent text-background font-bold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>
  )
}

