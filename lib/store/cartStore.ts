// lib/store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product, quantity) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          
          if (existingItem) {
            const updatedCart = state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            
            toast.success(`Added ${quantity} more ${product.name} (${existingItem.quantity + quantity} total)`);
            return { cart: updatedCart };
          } else {
            toast.success(`${quantity} ${product.name} added to cart`);
            return {
              cart: [...state.cart, { ...product, quantity }],
            };
          }
        });
      },
      removeFromCart: (productId) => {
        const product = get().cart.find(item => item.id === productId);
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
        if (product) {
          toast.success(`${product.name} removed from cart`);
        }
      },
      updateQuantity: (productId, newQuantity) => {
        if (newQuantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          ),
        }));
      },
      clearCart: () => {
        const itemCount = get().getTotalItems();
        set({ cart: [] });
        toast.success(`Cart cleared (${itemCount} items removed)`);
      },
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        const total = get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return parseFloat(total.toFixed(2)); // Fixed the toFixed() error
      },
      getItemQuantity: (productId) => {
        const item = get().cart.find(item => item.id === productId);
        return item ? item.quantity : 0;
      }
    }),
    {
      name: 'cart-storage',
      version: 1,
    }
  )
);