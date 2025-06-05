// app/cart/page.tsx
'use client';
import { useCartStore } from '@/lib/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you have not added anything to your cart yet
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart ({getTotalItems()})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold">Shopping Cart</h2>
              <button
                onClick={() => {
                  clearCart();
                  toast.success('Cart cleared');
                }}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Clear All
              </button>
            </div>
            
            <div className="divide-y">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 flex gap-4"
                >
                  <div className="relative w-24 h-24 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.id}`}
                      className="font-medium hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600 mt-1">Kes {item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                          disabled
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                          disabled
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success('Item removed from cart');
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>Kes {getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">To be determine</span>
              </div>
              
              <div className="border-t pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>Kes {getTotalPrice().toFixed(2)}</span>
              </div>
              <div className='mb-4 space-y-3'>
                  <Link
                href="/checkout" >
              <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors mt-4">
                Proceed to Checkout
              </button>
              </Link>
              
              <Link
                href="/shop"
                className="block text-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 mt-4 transition-colors"
              >
                Continue Shopping
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;