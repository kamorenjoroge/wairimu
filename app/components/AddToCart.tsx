"use client";
import { useState } from "react";
import { FaShoppingCart, FaCheck, FaPlus, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCartStore } from "../../lib/store/cartStore";
import toast from "react-hot-toast";

interface AddtoCartProps {
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productQuantity: number;
  className?: string;
}

const AddtoCart = ({
  productId,
  productName,
  productPrice,
  productImage,
  productQuantity,
  className = ""
}: AddtoCartProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  const addToCart = useCartStore((state) => state.addToCart);

  const handleQuantityChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity > 0 && newQuantity <= productQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      addToCart(
        {
          id:productId,
          name: productName,
          price: productPrice,
          image: productImage,
        },
        quantity
      );
      
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 3000);
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <div className="flex items-center justify-between w-full">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleQuantityChange(-1)}
          disabled={quantity <= 1}
          className={`p-2 border border-gray-300 rounded-l-lg ${
            quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
          }`}
        >
          <FaMinus className="text-gray-600" />
        </motion.button>

        <div className="w-12 text-center border-t border-b border-gray-300 py-2">
          {quantity}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleQuantityChange(1)}
          disabled={quantity >= productQuantity}
          className={`p-2 border border-gray-300 rounded-r-lg ${
            quantity >= productQuantity
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-50"
          }`}
        >
          <FaPlus className="text-gray-600" />
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        disabled={isAdding || isAdded || productQuantity === 0}
        className={`py-2 px-4 rounded-lg text-white flex items-center justify-center ${
          isAdded
            ? "bg-green-500"
            : isAdding
            ? "bg-primary/80"
            : productQuantity === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-opacity-90"
        }`}
      >
        {productQuantity === 0 ? (
          "Out of Stock"
        ) : isAdding ? (
          <>
            <span className="animate-spin mr-2">↻</span>
            Adding...
          </>
        ) : isAdded ? (
          <>
            <FaCheck className="mr-2" /> Added
          </>
        ) : (
          <>
            <FaShoppingCart className="mr-2" /> Add to Cart
          </>
        )}
      </motion.button>

     
    </div>
  );
};

export default AddtoCart;