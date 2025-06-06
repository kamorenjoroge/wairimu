import User from "./User";
import Image from "next/image";
import Link from "next/link";
import Cart from './Cart'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-secondary shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="h-12 w-12 relative transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Tess Treasures Logo"
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </div>
              <div className="ml-3 hidden sm:block">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Tess Treasures
                </span>
                <div className="text-xs text-gray-500 font-medium tracking-wide">
                  Premium Collection
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation links - Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary/5"
            >
              <span className="text-gray-700 group-hover:text-primary font-medium text-base">
                Home
              </span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-8"></div>
            </Link>
            
            <Link
              href="/shop"
              className="group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary/5"
            >
              <span className="text-gray-700 group-hover:text-primary font-medium text-base">
                Shop
              </span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-8"></div>
            </Link>
            
            <Link
              href="/orders"
              className="group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary/5"
            >
              <span className="text-gray-700 group-hover:text-primary font-medium text-base">
                Orders
              </span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-8"></div>
            </Link>
            
            <Link
              href="/checkout"
              className="ml-2 px-6 py-2.5 bg-gradient-to-r from-primary to-primary/90 text-white font-medium rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
            >
              Checkout
            </Link>
          </div>

          {/* Right section - Cart and User */}
          <div className="flex items-center space-x-3">
            {/* Cart - Desktop */}
            <div className="hidden sm:block">
              <div className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Cart />
              </div>
            </div>
            
            {/* User */}
            <div className="p-1 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <User />
            </div>
            
            {/* Cart - Mobile */}
            <div className="sm:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Cart />
            </div>
          </div>
        </div>

      
      </div>
    </nav>
  );
};

export default Navbar;