"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiPackage,
  FiCreditCard,
  FiGrid,
} from "react-icons/fi";

const MobileMenu = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/",
      icon: FiHome,
      label: "Home",
      exact: true,
    },
    {
      href: "/shop",
      icon: FiGrid,
      label: "Shop",
    },
    {
      href: "/orders",
      icon: FiPackage,
      label: "Orders",
    },
    {
      href: "/checkout",
      icon: FiCreditCard,
      label: "Checkout",
    },
  ];

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Bottom spacing to prevent content from being hidden behind the menu */}
      <div className="md:hidden h-20" />
      
      {/* Mobile Menu */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Background with blur effect */}
        <div className="bg-white/95 backdrop-blur-md border-t border-secondary shadow-2xl">
          {/* Menu items container */}
          <div className="flex justify-around items-center px-2 py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative flex flex-col items-center justify-center 
                    px-3 py-2 rounded-2xl min-w-[60px] transition-all duration-300 
                    ${active 
                      ? 'text-white bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25' 
                      : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                    }
                  `}
                >
                  {/* Active indicator dot */}
                  {active && (
                    <div className="absolute -top-1 w-1 h-1 bg-white rounded-full opacity-80" />
                  )}
                  
                  {/* Icon */}
                  <Icon className={`h-5 w-5 mb-1 transition-transform duration-200 ${
                    active ? 'scale-110' : 'group-hover:scale-105'
                  }`} />
                  
                  {/* Label */}
                  <span className={`text-xs font-medium transition-all duration-200 ${
                    active ? 'text-white' : ''
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Ripple effect on tap */}
                  <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 active:opacity-100 transition-opacity duration-150" />
                </Link>
              );
            })}
          </div>
          
          {/* Home indicator line for iPhone-style design */}
          <div className="flex justify-center pb-2">
            <div className="w-32 h-1 bg-gray-300 rounded-full opacity-50" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;