// components/Cart.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import {  FaTimes, FaPlus, FaMinus, FaTrash,FaShoppingCart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';


const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const totalPrice = useCartStore(state => state.getTotalPrice());
  
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  // Don't render anything on the server
  if (!isMounted) {
    return (
      <div className='relative'>
        <button className='text-dark hover:text-primary flex items-center transition-colors duration-200 group'>
          <div className='flex items-center relative'>
            
            <span className='ml-2 font-medium text-lg'>Cart</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className='relative' ref={dropdownRef}>
      <button 
        className='text-dark hover:text-primary flex items-center transition-colors duration-200 group'
        onClick={() => setIsCartOpen(!isCartOpen)}
        aria-label="Shopping Cart"
      >
        <div className='flex items-center relative'>
         <FaShoppingCart className='w-5 h-5' />
          
          {getTotalItems() > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className='ml-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
            >
              {getTotalItems()}
            </motion.span>
          )}
        </div>
      </button>
      
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className='absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200'
          >
            <div className='p-4 max-h-96 overflow-y-auto'>
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='text-center text-gray-500 py-4'
                >
                  Your cart is empty
                  <Link 
                    href="/shop" 
                    className="block mt-2 text-primary hover:underline"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Link>
                </motion.div>
              ) : (
                <>
                  <div className='flex justify-between items-center mb-4'>
                    <h3 className='font-semibold text-lg'>Your Cart ({getTotalItems()})</h3>
                    <button 
                      onClick={() => {
                        clearCart();
                        toast.success('Cart cleared');
                      }}
                      className='text-sm text-red-500 hover:text-red-700 flex items-center gap-1'
                    >
                      <FaTrash size={14} /> Clear All
                    </button>
                  </div>
                  
                  <div className='space-y-4'>
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className='flex gap-3 border-b pb-4'
                        >
                          <div className='relative w-16 h-16 rounded-md overflow-hidden shrink-0'>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className='object-cover'
                              sizes="64px"
                            />
                          </div>
                          
                          <div className='flex-1 min-w-0'>
                            <Link 
                              href={`/products/${item.id}`} 
                              className='font-medium hover:text-primary line-clamp-1'
                              onClick={() => setIsCartOpen(false)}
                            >
                              {item.name}
                            </Link>
                            <p className='text-sm text-gray-600'>Kes {item.price.toFixed(2)}</p>
                            
                            <div className='flex items-center justify-between mt-1'>
                              <div className='flex items-center border rounded-md'>
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className='px-2 py-1 text-gray-500 hover:bg-gray-100 transition-colors'
                                  aria-label="Decrease quantity"
                                >
                                  <FaMinus size={12} />
                                </button>
                                <span className='px-2 text-sm w-8 text-center'>{item.quantity}</span>
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className='px-2 py-1 text-gray-500 hover:bg-gray-100 transition-colors'
                                  aria-label="Increase quantity"
                                >
                                  <FaPlus size={12} />
                                </button>
                              </div>
                              
                              <button
                                onClick={() => {
                                  removeFromCart(item.id);
                                  toast.success('Item removed from cart');
                                }}
                                className='text-red-500 hover:text-red-700 transition-colors'
                                aria-label="Remove item"
                              >
                                <FaTimes size={14} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  <div className='mt-4 border-t pt-4'>
                    <div className='flex justify-between font-semibold mb-2'>
                      <span>Subtotal:</span>
                      <span>Kes {getTotalPrice().toFixed(2)}</span>
                      <p>Total: Kes {totalPrice}</p>
                    </div>
                    
                    <div className='mt-4 space-y-2'>
                      <Link
                        href="/cart"
                        className='block text-center py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors'
                        onClick={() => setIsCartOpen(false)}
                      >
                        View Cart
                      </Link>
                      <Link 
                        href="/checkout" 
                        className='block text-center py-2 px-4 text-white bg-primary hover:bg-primary-dark rounded-md transition-colors'
                        onClick={() => setIsCartOpen(false)}
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Cart;