export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  material: string
  weight: string
  dimensions: string
  inStock: boolean
  rating: number
  reviews: number
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Sterling Silver Pendant Necklace',
    description: 'Elegant handcrafted sterling silver pendant with delicate chain. Perfect for everyday elegance.',
    price: 8999,
    category: 'Necklaces',
    image: '/products/pendant-necklace.png',
    material: 'Sterling Silver (925)',
    weight: '12g',
    dimensions: '3cm x 2cm',
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Silver Statement Ring',
    description: 'Bold and sophisticated silver statement ring with minimalist design. A timeless piece.',
    price: 5999,
    category: 'Rings',
    image: '/products/statement-ring.png',
    material: 'Sterling Silver (925)',
    weight: '8g',
    dimensions: 'Adjustable 6-8',
    inStock: true,
    rating: 4.9,
    reviews: 98,
  },
  {
    id: '3',
    name: 'Luxury Silver Bracelet',
    description: 'Exquisite silver bracelet featuring artisan craftsmanship and premium quality.',
    price: 12999,
    category: 'Bracelets',
    image: '/products/pendant-necklace.png',
    material: 'Sterling Silver (925)',
    weight: '25g',
    dimensions: '19cm circumference',
    inStock: true,
    rating: 4.7,
    reviews: 86,
  },
  {
    id: '4',
    name: 'Delicate Silver Earrings',
    description: 'Refined and delicate silver drop earrings for the sophisticated woman.',
    price: 3999,
    category: 'Earrings',
    image: '/products/statement-ring.png',
    material: 'Sterling Silver (925)',
    weight: '4g',
    dimensions: '4cm drop length',
    inStock: true,
    rating: 4.6,
    reviews: 72,
  },
  {
    id: '5',
    name: 'Premium Silver Locket',
    description: 'Heirloom-quality silver locket with engraving option. Store your precious memories.',
    price: 9999,
    category: 'Necklaces',
    image: '/products/pendant-necklace.png',
    material: 'Sterling Silver (925)',
    weight: '15g',
    dimensions: '2.5cm x 1.8cm',
    inStock: true,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '6',
    name: 'Minimalist Silver Cuff',
    description: 'Contemporary silver cuff bracelet with clean lines and elegant proportions.',
    price: 11999,
    category: 'Bracelets',
    image: '/products/statement-ring.png',
    material: 'Sterling Silver (925)',
    weight: '30g',
    dimensions: '6cm width',
    inStock: true,
    rating: 4.8,
    reviews: 94,
  },
  {
    id: '7',
    name: 'Silver Hoop Earrings',
    description: 'Classic and timeless silver hoop earrings. A versatile essential for any jewelry collection.',
    price: 2999,
    category: 'Earrings',
    image: '/products/pendant-necklace.png',
    material: 'Sterling Silver (925)',
    weight: '3g',
    dimensions: '3cm diameter',
    inStock: true,
    rating: 4.7,
    reviews: 143,
  },
  {
    id: '8',
    name: 'Ornate Silver Ring Set',
    description: 'Stunning set of three ornate silver rings with intricate detailing. Mix and match for your style.',
    price: 14999,
    category: 'Rings',
    image: '/products/statement-ring.png',
    material: 'Sterling Silver (925)',
    weight: '12g',
    dimensions: 'Adjustable sizes',
    inStock: true,
    rating: 4.9,
    reviews: 167,
  },
]

export const categories = ['All', 'Necklaces', 'Bracelets', 'Rings', 'Earrings']
