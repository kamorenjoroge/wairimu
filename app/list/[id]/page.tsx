'use client'
import AddtoCart from '@/app/components/AddToCart';
import Moreinfo from '@/app/components/Moreinfo';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {  FiStar,  FiRefreshCw } from 'react-icons/fi';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  details: string;
  images: string[];
  color: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface ApiResponse {
  success: boolean;
  data: Product;
}

const ProductPage = () => {
  const { id } = useParams() as { id: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>('');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<ApiResponse>(`/api/products/${id}`);
        if (response.data.success) {
          setProduct(response.data.data);
          setMainImage(response.data.data.images[0]);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-back"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="text-primary text-xl"
        >
          <FiRefreshCw size={32} />
        </motion.div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-back"
      >
        <div className="text-lama text-xl">{error}</div>
      </motion.div>
    );
  }

  if (!product) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-back"
      >
        <div className="text-lama text-xl">Product not found</div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Breadcrumbs */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center text-sm text-gray-500 mb-6"
        > <Link href='/'>
          <span className="hover:text-primary cursor-pointer">Home</span></Link>
          
          <IoIosArrowForward className="mx-2" />
          <Link href='/shop'>
          <span className="hover:text-primary cursor-pointer">Products</span>
          </Link>
          <IoIosArrowForward className="mx-2" />
          <span className="text-primary">{product.name}</span>
        </motion.div>

        <div className='flex flex-col md:flex-row gap-8'>
          {/* Left side - Product Images */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='md:w-1/2'
          >
            <div className='bg-white rounded-lg overflow-hidden mb-4 shadow-sm relative'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={mainImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imageLoading ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='w-full h-96 flex items-center justify-center'
                >
                  <Image
                    height={500}
                    width={500}
                    src={mainImage} 
                    alt={product.name}
                    className='w-full h-full object-contain'
                    onLoadingComplete={() => setImageLoading(false)}
                  />
                </motion.div>
              </AnimatePresence>
              
              {imageLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-gray-100"
                >
                  <FiRefreshCw className="animate-spin text-gray-400" size={32} />
                </motion.div>
              )}
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
              >
                {isWishlisted ? (
                  <FaHeart className="text-red-500" size={20} />
                ) : (
                  <FaRegHeart className="text-gray-600" size={20} />
                )}
              </motion.button>
            </div>
            
            {product.images.length > 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='grid grid-cols-4 gap-2'
              >
                {product.images.map((image, index) => (
                  <motion.button 
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setImageLoading(true);
                      setMainImage(image);
                    }}
                    className={`bg-white rounded-md overflow-hidden border-2 ${mainImage === image ? 'border-primary' : 'border-transparent'} shadow-sm`}
                  >
                    <Image
                      height={100}
                      width={100}
                      src={image} 
                      alt={`Thumbnail ${index + 1}`}
                      className='w-full h-20 object-cover'
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right side - Product Details */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='md:w-1/2'
          >
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>{product.name}</h1>
              
              <div className='flex items-center mb-2'>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`${i < 4 ? 'text-yellow-400' : 'text-gray-300'} w-5 h-5`} 
                      fill={i < 4 ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className='ml-2 text-gray-500 text-sm'>(24 reviews)</span>
              </div>
              
              <div className='flex items-center mb-4'>
                <span className='text-primary text-2xl font-bold'>Kes {product.price.toLocaleString()}</span>
                {product.quantity > 0 ? (
                  <motion.span 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className='ml-4 px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded'
                  >
                    In Stock
                  </motion.span>
                ) : (
                  <motion.span 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className='ml-4 px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded'
                  >
                    Out of Stock
                  </motion.span>
                )}
              </div>

              <div className='mb-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>Color:</h3>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className='w-8 h-8 rounded-full border border-gray-300 shadow-sm'
                  style={{ backgroundColor: product.color }}
                />
              </div>

              <div className='mb-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>Details:</h3>
                <p className='text-gray-700'>{product.details}</p>
              </div>

              <div className='mb-8'>
                <AddtoCart
                  productId={product._id}
                  productName={product.name}
                  productPrice={product.price}
                  productImage={product.images[0]}
                  productQuantity={product.quantity}
                  className="mt-4"
                />
              </div>
              
              
              
              <div className='mt-6'>
               < Moreinfo />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;