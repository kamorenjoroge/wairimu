"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AddtoCart from "./AddToCart";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiCheck,
  FiSearch,
  FiChevronDown,
  FiEye,
  FiFilter,
  FiX,
  FiStar,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  details: string;
  images: string[];
  color: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Notification {
  message: string;
  type: "success" | "error";
}

type SortOption =
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<Notification | null>(null);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const initialProductsPerPage = 12;
  const productsPerLoad = 6;

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sorting state
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);

  // Lazy loading state
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const sortOptions = [
    { value: "newest", label: "Newest Arrivals", icon: "🔥" },
    { value: "price-asc", label: "Price: Low to High", icon: "💰" },
    { value: "price-desc", label: "Price: High to Low", icon: "💎" },
    { value: "name-asc", label: "Name: A to Z", icon: "📝" },
    { value: "name-desc", label: "Name: Z to A", icon: "📝" },
  ];

  const fetchProducts = useCallback(
    async (
      page: number = 1,
      search: string = "",
      sort: SortOption = "newest",
      initialLoad: boolean = false
    ) => {
      try {
        setIsFetching(true);
        const limit = initialLoad ? initialProductsPerPage : productsPerLoad;
        const response = await axios.get<{ success: boolean; data: Product[] }>(
          `/api/products?page=${page}&limit=${limit}&search=${search}&sort=${sort}`
        );

        if (response.data.success) {
          if (page === 1) {
            setProducts(response.data.data);
            const initialSelectedImages: Record<string, string> = {};
            response.data.data.forEach((product: Product) => {
              initialSelectedImages[product._id] = product.images[0];
            });
            setSelectedImage(initialSelectedImages);
          } else {
            setProducts((prev) => [...prev, ...response.data.data]);
            const newSelectedImages: Record<string, string> = {};
            response.data.data.forEach((product: Product) => {
              newSelectedImages[product._id] = product.images[0];
            });
            setSelectedImage((prev) => ({ ...prev, ...newSelectedImages }));
          }

          setHasMore(response.data.data.length === limit);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        showNotification("Failed to load products", "error");
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProducts(1, "", "newest", true);
  }, [fetchProducts]);

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.details.toLowerCase().includes(query)
      );
    }

    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, searchQuery, sortOption]);

  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ): void => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const changeImage = (productId: string, image: string): void => {
    setSelectedImage((prev) => ({
      ...prev,
      [productId]: image,
    }));
  };

  const toggleWishlist = (productId: string): void => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
        showNotification("Removed from wishlist", "success");
      } else {
        newWishlist.add(productId);
        showNotification("Added to wishlist", "success");
      }
      return newWishlist;
    });
  };

  const handleScroll = useCallback(() => {
    if (isFetching || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts(currentPage, searchQuery, sortOption);
    }
  }, [currentPage, fetchProducts, searchQuery, sortOption]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(1, searchQuery, sortOption, true);
  };

  const handleSortOptionClick = (option: SortOption) => {
    setSortOption(option);
    setShowSortOptions(false);
    fetchProducts(1, searchQuery, option, true);
  };

  const clearSearch = () => {
    setSearchQuery("");
    fetchProducts(1, "", sortOption, true);
  };

  if (loading && currentPage === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-back/30 to-white flex justify-center items-center">
        <motion.div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 font-medium">Loading our amazing products...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/80 via-white to-primary/90 mb-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              className={`fixed top-6 right-6 flex items-center px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm z-50 border ${
                notification.type === "error"
                  ? "bg-red-50/90 text-red-800 border-red-200"
                  : "bg-green-50/90 text-green-800 border-green-200"
              }`}
            >
              <FiCheck className="mr-3 text-lg" />
              <span className="font-medium">{notification.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-dark via-primary to-secondary bg-clip-text text-transparent mb-4">
            Our Premium Collection
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover handcrafted bags that blend style, functionality, and premium quality
          </p>
          <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <FiStar className="text-yellow-400 mr-1" />
              <span>4.9/5 Rating</span>
            </div>
            <div>•</div>
            <div>{products.length}+ Products</div>
            <div>•</div>
            <div>Free Shipping</div>
          </div>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 mb-8 relative z-20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative w-full md:w-2/3 lg:w-1/2">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search for bags, colors, styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors duration-300 bg-white/80 backdrop-blur-sm text-gray-700 placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX className="text-lg" />
                  </button>
                )}
              </div>
            </form>

            {/* Sort Dropdown */}
            <div className="relative w-full md:w-auto">
              <button
                onClick={() => setShowSortOptions(!showSortOptions)}
                className="flex items-center justify-between w-full md:w-72 px-6 py-4 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm hover:border-primary transition-colors duration-300 text-gray-700"
              >
                <div className="flex items-center">
                  <FiFilter className="mr-3 text-lg" />
                  <span className="font-medium">
                    {sortOptions.find((opt) => opt.value === sortOption)?.label || "Sort By"}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: showSortOptions ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown className="text-lg" />
                </motion.div>
              </button>

              <AnimatePresence>
                {showSortOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-full md:w-72 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortOptionClick(option.value as SortOption)}
                        className={`w-full text-left px-6 py-4 hover:bg-primary/5 transition-colors duration-200 flex items-center ${
                          sortOption === option.value
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        <span className="mr-3 text-lg">{option.icon}</span>
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No products found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We could not find any products matching your search. Try different keywords or browse our collections.
            </p>
            <button
              onClick={clearSearch}
              className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors duration-300 font-medium"
            >
              Browse All Products
            </button>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((product: Product, index: number) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group-hover:scale-[1.02]">
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <Image
                        width={300}
                        height={300}
                        src={selectedImage[product._id]}
                        alt={product.name}
                        className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Image Indicators */}
                      {product.images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {product.images.map((image: string, index: number) => (
                            <button
                              key={index}
                              onClick={() => changeImage(product._id, image)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                selectedImage[product._id] === image
                                  ? "bg-primary scale-125"
                                  : "bg-gray-300 hover:bg-gray-400"
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Wishlist & Quick Actions */}
                      <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => toggleWishlist(product._id)}
                          className={`p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 ${
                            wishlist.has(product._id)
                              ? "bg-red-500 text-white"
                              : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500"
                          }`}
                        >
                          <FiHeart className={`text-sm ${wishlist.has(product._id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Stock Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full border border-green-200">
                          In Stock
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="mb-3">
                        <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-primary transition-colors duration-300">
                          {product.name}
                        </h2>
                        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                          {product.details}
                        </p>
                      </div>

                      {/* Color & Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded-full border-2 border-gray-200 shadow-sm"
                            style={{ backgroundColor: product.color }}
                          />
                          <span className="text-xs text-gray-500 capitalize">{product.color}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-primary">
                            Kes {product.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                         <div className="mt-4 gap-2">
                    <AddtoCart
                      productId={product._id}
                      productName={product.name}
                      productPrice={product.price}
                      productImage={product.images[0]}
                      productQuantity={product.quantity}
                      className="mt-4"
                    />
                    </div>

                        <div>
                        <Link href={`/list/${product._id}`}>
                          <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:border-primary hover:text-primary font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn text-sm">
                            <FiEye className="text-sm group-hover/btn:scale-110 transition-transform duration-200" />
                            View Details
                          </button>
                        </Link>

                        </div>
                        
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Loading Indicator */}
            {isFetching && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center py-12"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="text-gray-600 font-medium">Loading more products...</p>
                </div>
              </motion.div>
            )}

            {/* End of Products */}
            {!hasMore && filteredProducts.length > initialProductsPerPage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-4xl mb-4">🎉</div>
                <p className="text-gray-600 font-medium">You have seen all our amazing products!</p>
               </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;