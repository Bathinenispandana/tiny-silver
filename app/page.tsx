import { HeroCarousel } from '@/components/HeroCarousel'
import { CollectionsCarousel } from '@/components/CollectionsCarousel'
import { MasonryGrid } from '@/components/MasonryGrid'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { PressSection } from '@/components/PressSection'
import FeaturedCollections  from '@/components/FeaturedCollections'
import Cta from '@/components/cta'  

export const metadata = {
  title: 'Luxe Silver - Premium Sterling Silver Jewelry',
  description: 'Discover exquisite, handcrafted silver jewelry and artisan pieces. Premium quality silver products for the discerning collector.',
}

export default function Home() {
  // Get featured products (first 8)

  return (
    <div className="bg-background">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Collections Carousel */}
      <CollectionsCarousel />

      <FeaturedCollections />

      {/* Press & Features Section */}
      <PressSection />

      {/* Newsletter Signup */}
      <NewsletterSignup />

      <Cta/>
    </div>
  )
}
