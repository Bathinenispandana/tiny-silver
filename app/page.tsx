import { HeroCarousel } from '@/components/HeroCarousel'
import { CollectionsCarousel } from '@/components/CollectionsCarousel'
import { MasonryGrid } from '@/components/MasonryGrid'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { PressSection } from '@/components/PressSection'
import { products } from '@/lib/products'

export const metadata = {
  title: 'Luxe Silver - Premium Sterling Silver Jewelry',
  description: 'Discover exquisite, handcrafted silver jewelry and artisan pieces. Premium quality silver products for the discerning collector.',
}

export default function Home() {
  // Get featured products (first 8)
  const featuredProducts = products.slice(0, 8)

  return (
    <div className="bg-background">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Collections Carousel */}
      <CollectionsCarousel />

      {/* Featured Products Section */}
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

      {/* Press & Features Section */}
      <PressSection />

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Footer CTA */}
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
    </div>
  )
}
