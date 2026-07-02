import { Store, Phone, MapPin, Clock } from 'lucide-react'

export default function StoresPage() {
  const stores = [
    {
      id: 1,
      name: 'LUXE Silver - Delhi',
      address: 'Khan Market, New Delhi 110003',
      phone: '+91-11-4141-5000',
      hours: 'Mon - Sun: 11:00 AM - 8:00 PM',
      coords: { lat: 28.5921, lng: 77.5932 },
    },
    {
      id: 2,
      name: 'LUXE Silver - Mumbai',
      address: 'Bandra Kurla Complex, Mumbai 400051',
      phone: '+91-22-6163-0000',
      hours: 'Mon - Sun: 11:00 AM - 8:00 PM',
      coords: { lat: 19.0176, lng: 72.8479 },
    },
    {
      id: 3,
      name: 'LUXE Silver - Bangalore',
      address: 'UB City, Bangalore 560001',
      phone: '+91-80-4141-5000',
      hours: 'Mon - Sun: 11:00 AM - 8:00 PM',
      coords: { lat: 12.9716, lng: 77.5946 },
    },
    {
      id: 4,
      name: 'LUXE Silver - Hyderabad',
      address: 'Hitech City, Hyderabad 500081',
      phone: '+91-40-4141-5000',
      hours: 'Mon - Sun: 11:00 AM - 8:00 PM',
      coords: { lat: 17.3850, lng: 78.4867 },
    },
  ]

  return (
    <div className="bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Our Stores</h1>
          <p className="text-primary/60 text-lg">Visit our premium boutiques to experience our collections</p>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="group p-6 rounded-xl backdrop-blur-md bg-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Store size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-primary mb-3">{store.name}</h3>

                  <div className="space-y-2">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-primary/60 flex-shrink-0 mt-1" />
                      <p className="text-sm text-primary/70">{store.address}</p>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-primary/60 flex-shrink-0" />
                      <a
                        href={`tel:${store.phone.replace(/\D/g, '')}`}
                        className="text-sm text-primary hover:text-accent transition-colors"
                      >
                        {store.phone}
                      </a>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-3">
                      <Clock size={16} className="text-primary/60 flex-shrink-0 mt-1" />
                      <p className="text-sm text-primary/70">{store.hours}</p>
                    </div>
                  </div>

                  {/* Get Directions Button */}
                  <button className="mt-4 w-full px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors text-sm">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
