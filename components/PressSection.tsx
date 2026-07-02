'use client'

export function PressSection() {
  const features = [
    {
      title: 'Premium Quality',
      description: 'Crafted from 925 sterling silver with meticulous attention to detail',
      icon: '✨',
    },
    {
      title: 'Ethical Sourcing',
      description: 'Responsibly sourced materials that support sustainable practices',
      icon: '🌿',
    },
    {
      title: 'Expert Craftsmanship',
      description: 'Artisan-made pieces by skilled craftspeople with decades of experience',
      icon: '🎨',
    },
    {
      title: 'Lifetime Value',
      description: 'Timeless designs that transcend trends and seasons',
      icon: '⏱️',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Jewelry Enthusiast',
      quote: 'The quality and design are absolutely stunning. Worth every penny!',
      image: '/products/pendant-necklace.png',
    },
    {
      name: 'Emma Johnson',
      role: 'Fashion Blogger',
      quote: 'Each piece is a work of art. I recommend Luxe Silver to everyone.',
      image: '/products/statement-ring.png',
    },
    {
      name: 'Jessica Chen',
      role: 'Luxury Collector',
      quote: 'Finally found a brand that understands true elegance and quality.',
      image: '/products/pendant-necklace.png',
    },
  ]

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Features Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Why Choose Luxe Silver
          </h2>
          <p className="text-primary/60 mb-12">
            Discover what makes our collection truly exceptional
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="backdrop-blur-md bg-background/30 border border-primary/20 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 group cursor-pointer"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-primary/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="pt-12 border-t border-primary/20">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            What Our Customers Say
          </h2>
          <p className="text-primary/60 mb-12">
            Join thousands of satisfied customers who love our pieces
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="backdrop-blur-md bg-background/30 border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 space-y-4"
              >
                {/* Stars */}
                <div className="text-accent text-lg">★★★★★</div>

                {/* Quote */}
                <p className="text-primary italic">{`"${testimonial.quote}"`}</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-primary/20">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-xs text-primary/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
