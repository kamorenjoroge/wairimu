'use client'
import { useUser, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { FaSignInAlt, FaArrowRight } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import Order from "../components/Orders";

const Page = () => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex flex-col items-center justify-center gap-6 p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              <FiLogIn className="text-5xl text-green-600" />
            </motion.div>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-800 mb-2"
          >
            Welcome to your Orders 
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-6"
          >
            Please sign in to access your personalized your orders.
          </motion.p>
          
          <SignInButton mode="modal">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-primary/95 to-back text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 w-full"
            >
              <FaSignInAlt />
              <span>Sign In</span>
              <FaArrowRight className="ml-1" />
            </motion.button>
          </SignInButton>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-sm text-gray-500"
          >
            Secure and seamless authentication
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-gray-500 mt-4 text-center"
        >
          Your data is protected with end-to-end encryption
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Order/>
    </div>
  );
};

export default Page;