# Luxe Silver - Premium Sterling Silver eCommerce Platform

A luxury eCommerce website built with Next.js 15, TypeScript, and Tailwind CSS, featuring a premium silver jewelry collection with Razorpay payment integration.

## Features

### Core Functionality
- **Product Catalog**: Browse 8+ premium sterling silver jewelry pieces
- **Product Filtering & Sorting**: Filter by category (Necklaces, Bracelets, Rings, Earrings) and sort by name or price
- **Product Details**: Comprehensive product pages with specifications, images, and material information
- **Shopping Cart**: Add/remove items, adjust quantities, persistent localStorage storage
- **Checkout**: Multi-step checkout with customer information collection
- **Payment Integration**: Razorpay payment gateway with order creation and verification
- **Order Confirmation**: Post-purchase confirmation page with order tracking information
- **Responsive Design**: Mobile-first design that works seamlessly on all devices

### Design & UX
- **Luxury Aesthetic**: Premium silver and charcoal color palette with gold accents
- **Professional Typography**: Elegant font hierarchy with Geist font family
- **Smooth Interactions**: Hover effects, transitions, and loading states
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom theme tokens
- **State Management**: React Context API (Cart Context)
- **Payment**: Razorpay API
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Font**: Geist (Google Fonts)

## Project Structure

```
/app
  ├── page.tsx                    # Home page with hero and featured products
  ├── layout.tsx                  # Root layout with header, footer, providers
  ├── globals.css                 # Global styles and theme tokens
  ├── products/
  │   └── page.tsx               # Products listing with filters
  ├── product/
  │   └── [id]/
  │       └── page.tsx           # Product detail page
  ├── cart/
  │   └── page.tsx               # Shopping cart page
  ├── checkout/
  │   └── page.tsx               # Checkout form page
  ├── order-confirmation/
  │   └── page.tsx               # Order confirmation page
  ├── api/
  │   ├── create-order/
  │   │   └── route.ts           # Razorpay order creation API
  │   └── verify-payment/
  │       └── route.ts           # Razorpay payment verification API

/components
  ├── Header.tsx                  # Navigation header with cart icon
  ├── Footer.tsx                  # Footer with links and information
  ├── ProductCard.tsx             # Reusable product card component

/context
  └── CartContext.tsx             # Cart state management with localStorage

/lib
  └── products.ts                 # Mock product data and categories

/public/products                   # Product images directory
```

## Installation & Setup

### Prerequisites
- Node.js 18+ (LTS recommended)
- pnpm package manager

### Environment Variables

Create a `.env.local` file with the following:

```env
# Razorpay API Keys (from your Razorpay Dashboard)
RAZORPAY_KEY_ID=your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
NEXT_PUBLIC_RAZORPAY_KEY=your_public_key_here
```

### Installation Steps

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up environment variables** (see above)

3. **Start development server**:
   ```bash
   pnpm dev
   ```

4. **Open browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Usage Guide

### Browsing Products
1. Navigate to `/products` to see all available items
2. Use category filters on the left sidebar to narrow down options
3. Sort by name (A-Z) or price (low to high, high to low)
4. Click on any product to view full details

### Shopping
1. On product detail page, adjust quantity using +/- buttons
2. Click "Add to Cart" to add item to your shopping cart
3. Cart updates appear in the header cart icon
4. Click cart icon to view all items

### Checkout
1. Click "Proceed to Checkout" on cart page
2. Fill in shipping information (required fields marked with *)
3. Click "Proceed to Payment"
4. Complete payment through Razorpay checkout
5. View order confirmation with order number and tracking details

### Managing Cart
- Adjust quantities directly from the cart page
- Remove items with the "Remove" button
- View itemized breakdown with individual prices
- See free shipping information
- Order total is calculated automatically

## Customization

### Theme Colors
Edit `/app/globals.css` `:root` section to customize colors:
- `--background`: Page background (light off-white)
- `--foreground`: Text color (deep charcoal)
- `--primary`: Primary action color (deep blue)
- `--accent`: Highlight color (gold)
- `--border`: Border colors (light gray)

### Product Data
Edit `/lib/products.ts` to:
- Add/remove products
- Update prices and descriptions
- Change categories
- Modify specifications

### Styling
- Tailwind classes in component files
- Custom CSS in globals.css
- Theme tokens auto-applied throughout

## Payment Integration

### Razorpay Setup
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Get your API keys from Settings → API Keys
3. Add keys to `.env.local`
4. Razorpay handles:
   - Secure payment processing
   - Card/UPI/Wallet payments
   - 3D Secure authentication
   - Payment verification

### Testing
- **Test Cards**: Razorpay provides test card numbers in dashboard
- **Test Mode**: API keys automatically work in test mode
- **Webhook**: Configure webhooks in Razorpay dashboard for production

## Performance Optimizations

- **Image Optimization**: Next.js Image component for auto-optimization
- **Code Splitting**: Route-based code splitting for faster loads
- **Caching**: Browser and server-side caching strategies
- **Responsive Images**: Tailwind-based responsive breakpoints
- **Lazy Loading**: Components and images load on-demand

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

### Phase 2 - User Accounts
- User registration and login
- Order history and tracking
- Saved favorites/wishlist
- User profile management

### Phase 3 - Database
- Product inventory management
- Order persistence
- Customer data storage
- Analytics tracking

### Phase 4 - Advanced Features
- Product reviews and ratings
- Related products recommendations
- Email notifications
- Admin dashboard

## Troubleshooting

### Cart Not Persisting
- Check if localStorage is enabled in browser
- Clear browser cache and reload
- Verify CartProvider is wrapping the app

### Payment Not Working
- Confirm Razorpay keys are set in .env.local
- Check Razorpay dashboard for test/live mode
- Verify CORS settings if experiencing API errors

### Images Not Loading
- Check /public/products directory exists
- Verify image file paths in /lib/products.ts
- Ensure image files are in correct format

## Support & Feedback

For issues or feature requests, contact support@luxesilver.com

## License

© 2024 Luxe Silver. All rights reserved.

---

**Built with Next.js, Tailwind CSS, and Razorpay**
