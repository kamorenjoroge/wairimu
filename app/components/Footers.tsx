'use client';

import Link from 'next/link';

const Footers = () => {
  return (
    <footer className="hidden md:block bg-white backdrop-blur-xl border-t border-secondary mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tess Treasures
            </h3>
            <p className="text-dark/80">
              Luxury bags and accessories crafted with passion and delivered with care.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-dark">Shop</h4>
            <ul className="space-y-2">
              {['New Arrivals', 'Bestsellers', 'Handbags', 'Backpacks', 'Accessories'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-dark/80 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-dark">Help</h4>
            <ul className="space-y-2">
              {['Contact Us', 'FAQs', 'Shipping', 'Returns', 'Size Guide'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-dark/80 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-dark">Stay Updated</h4>
            <p className="text-dark/80">
              Subscribe for exclusive offers and styling tips.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 bg-white border border-dark/20 rounded-l-xl focus:outline-none focus:ring-1 focus:ring-primary w-full"
              />
              <button className="bg-gradient-to-r from-primary to-secondary text-dark font-semibold px-4 py-2 rounded-r-xl hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-dark/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-dark/60 text-sm">
            © {new Date().getFullYear()} Tess Treasures. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-dark/60 hover:text-dark text-sm">Privacy Policy</Link>
            <Link href="#" className="text-dark/60 hover:text-dark text-sm">Terms of Service</Link>
            <Link href="#" className="text-dark/60 hover:text-dark text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;