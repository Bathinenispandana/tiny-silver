export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground font-bold text-lg">
                L
              </div>
              <span className="text-lg font-semibold text-foreground">Luxe Silver</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium sterling silver jewelry crafted for the discerning collector.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  All Products
                </a>
              </li>
              <li>
                <a href="/products" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Necklaces
                </a>
              </li>
              <li>
                <a href="/products" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Bracelets
                </a>
              </li>
              <li>
                <a href="/products" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Rings
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; 2024 Luxe Silver. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
