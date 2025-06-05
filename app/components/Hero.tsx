'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const slideInLeft = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const slideInRight = {
    hidden: { x: 60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section className='relative bg-gradient-to-br from-back/30 via-white to-primary/5 py-16 md:py-20 lg:py-28 overflow-hidden'>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill=%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div 
          className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Hero Content */}
          <motion.div 
            className='w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left'
            variants={slideInLeft}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-full shadow-sm"
              variants={fadeInUp}
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">New Collection Available</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-[1.1] tracking-tight'
              variants={fadeInUp}
            >
              Premium{' '}
              <span className='relative inline-block'>
                <span className='bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent'>
                  Designer
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>{' '}
              Bags
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              className='text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light'
              variants={fadeInUp}
            >
              Discover our exclusive collection of premium quality bags crafted with precision, 
              designed for the modern lifestyle.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className='flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4'
              variants={fadeInUp}
            >
              <Link 
                href="/shop" 
                className='group relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white text-lg font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/25 overflow-hidden'
              >
                <span className="relative z-10">Explore Collection</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
              
              <Link 
                href="/collections" 
                className='group bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-primary hover:bg-white text-gray-700 hover:text-primary text-lg font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg'
              >
                <span className="flex items-center justify-center">
                  View Catalog
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className='flex flex-wrap justify-center lg:justify-start items-center gap-6 pt-8'
              variants={fadeInUp}
            >
              <div className='flex items-center space-x-2'>
                <div className="flex -space-x-1">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{i}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">2,000+ Happy Customers</p>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-sm">★</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">(4.9/5)</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div 
              className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6'
              variants={fadeInUp}
            >
              {[
                { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $100' },
                { icon: '🛡️', title: 'Quality Guarantee', desc: '2-year warranty' },
                { icon: '🔄', title: 'Easy Returns', desc: '30-day return policy' }
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center lg:items-start text-center lg:text-left p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 hover:border-primary/30 transition-all duration-300">
                  <span className="text-2xl mb-2">{feature.icon}</span>
                  <h3 className="font-semibold text-gray-800 text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className='w-full lg:w-1/2 relative'
            variants={slideInRight}
          >
            <div className='relative max-w-lg mx-auto'>
              {/* Main Image Container */}
              <motion.div 
                className='relative z-20 overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-white to-gray-50'
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 5 
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="aspect-square relative">
                  <Image 
                    src="/logo.png" 
                    alt="Premium Designer Bag Collection" 
                    fill
                    className='object-cover'
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
                </div>
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div 
                className='absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl'
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className='absolute -bottom-12 -left-12 w-48 h-48 bg-gradient-to-br from-secondary/15 to-primary/15 rounded-full blur-2xl'
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />

              {/* Discount Badge */}
              <motion.div 
                className='absolute top-6 -left-6 bg-gradient-to-r from-warning to-red-500 text-white font-bold py-3 px-6 rounded-2xl z-30 shadow-lg'
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: -15 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 1
                }}
                whileHover={{
                  rotate: -10,
                  scale: 1.05
                }}
              >
                <div className="text-center">
                  <div className="text-2xl font-black">30%</div>
                  <div className="text-xs font-medium -mt-1">OFF</div>
                </div>
              </motion.div>

              {/* Stock Indicator */}
              <motion.div 
                className='absolute bottom-6 -right-6 bg-white/95 backdrop-blur-sm py-3 px-5 rounded-2xl z-30 shadow-lg border border-gray-100'
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 1.2,
                  duration: 0.6
                }}
              >
                <div className='flex items-center space-x-3'>
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <div>
                    <div className='text-sm font-semibold text-gray-800'>In Stock</div>
                    <div className='text-xs text-gray-600'>Limited Edition</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;