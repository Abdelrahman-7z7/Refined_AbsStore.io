'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Product } from '../types/product';
import { mockProducts } from '../lib/mockData';
import { useCart } from '../hooks/useCart';

const ProductsSection: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const { addToCart, isInCart, cartItems } = useCart();

  // Filter state
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: 'All',
    sortBy: 'Newest',
    searchQuery: ''
  });

  const handleToggleCard = (productId: number) => {
    setExpandedCard(expandedCard === productId ? null : productId);
  };

  const handleShowMore = () => {
    setVisibleProducts(prev => Math.min(prev + 8, filteredAndSortedProducts.length));
  };

  const handleShowLess = () => {
    // Add a small delay to allow smooth transition
    setTimeout(() => {
      setVisibleProducts(8);
    }, 100);
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange !== 'All') {
      filtered = filtered.filter(product => {
        const price = product.price;
        switch (filters.priceRange) {
          case 'Under $100':
            return price < 100;
          case '$100–$500':
            return price >= 100 && price <= 500;
          case '$500–$1000':
            return price >= 500 && price <= 1000;
          case 'Above $1000':
            return price > 1000;
          default:
            return true;
        }
      });
    }

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case 'Price: Low to High':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Best Rated':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'Newest':
      default:
        // Keep original order (newest first)
        break;
    }

    return filtered;
  }, [filters]);

  const displayedProducts = filteredAndSortedProducts.slice(0, visibleProducts);

  // Helper function to get quantity of an item in cart
  const getItemQuantity = (productId: string) => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Filter handlers
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setVisibleProducts(8); // Reset visible products when filters change
  };

  const resetFilters = () => {
    setFilters({
      category: 'All',
      priceRange: 'All',
      sortBy: 'Newest',
      searchQuery: ''
    });
    setVisibleProducts(8);
  };

  // Get unique categories for filter dropdown
  const categories = ['All', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  return (
    <section id="products" className="py-24">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Products
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our premium collection of tech products designed for modern lifestyles
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white shadow-md rounded-xl p-4 mb-10"
        >
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Category Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm bg-white hover:border-[#369e62] focus:border-[#369e62] focus:ring-1 focus:ring-[#369e62] transition-colors duration-200 min-w-[140px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm bg-white hover:border-[#369e62] focus:border-[#369e62] focus:ring-1 focus:ring-[#369e62] transition-colors duration-200 min-w-[140px]"
                >
                  <option value="All">All</option>
                  <option value="Under $100">Under $100</option>
                  <option value="$100–$500">$100–$500</option>
                  <option value="$500–$1000">$500–$1000</option>
                  <option value="Above $1000">Above $1000</option>
                </select>
              </div>

              {/* Sort By Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm bg-white hover:border-[#369e62] focus:border-[#369e62] focus:ring-1 focus:ring-[#369e62] transition-colors duration-200 min-w-[160px]"
                >
                  <option value="Newest">Newest</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Best Rated">Best Rated</option>
                </select>
              </div>

              {/* Reset Filters Button */}
              <div className="flex flex-col justify-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#369e62] border border-gray-300 hover:border-[#369e62] rounded-lg transition-colors duration-200 whitespace-nowrap"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                  className="w-full md:w-64 rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm focus:border-[#369e62] focus:ring-1 focus:ring-[#369e62] transition-colors duration-200"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Counter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-gray-600">
            Showing {displayedProducts.length} of {filteredAndSortedProducts.length} products
            {filters.category !== 'All' || filters.priceRange !== 'All' || filters.searchQuery ? (
              <span className="text-[#369e62] font-medium"> (filtered)</span>
            ) : null}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 max-w-7xl">
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isExpanded={expandedCard === product.id}
              onToggle={() => handleToggleCard(product.id)}
              onAddToCart={() => addToCart({
                id: product.id.toString(),
                title: product.title,
                description: product.description,
                price: product.price,
                image: product.image
              })}
              isInCart={isInCart(product.id.toString())}
              quantity={getItemQuantity(product.id.toString())}
              index={index}
            />
            ))}
          </AnimatePresence>
          </div>
        </div>

        {/* Show More/Less Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center items-center mt-8"
        >
          <AnimatePresence mode="wait">
            {visibleProducts < filteredAndSortedProducts.length ? (
              <motion.button
                key="show-more"
                onClick={handleShowMore}
                className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span>Show More Products</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
            ) : (
              <motion.button
                key="show-less"
                onClick={handleShowLess}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span>Show Less</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  isExpanded: boolean;
  onToggle: () => void;
  onAddToCart: () => void;
  isInCart: boolean;
  quantity: number;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isExpanded, onToggle, onAddToCart, isInCart, quantity, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden group">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        
        {/* Quick Add Button */}
        {product.inStock && (
          <motion.div
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            {quantity > 0 ? (
              <div className="bg-green-600 text-white px-3 py-2 rounded-full shadow-lg flex items-center space-x-2">
                <span className="text-sm font-semibold">{quantity}</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            ) : (
              <motion.button
                onClick={onAddToCart}
                className="bg-white/90 hover:bg-white text-gray-800 hover:text-green-600 p-2 rounded-full shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Add to Cart"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </motion.button>
            )}
          </motion.div>
        )}

        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.856 1.056L9.5 15.134 6.146 13.2a1 1 0 010-1.732L9.5 9.134l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            Sale
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-8 h-8 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray bg-gray-100 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray ml-1">{product.rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-dark-black mb-2 line-clamp-2">
          {product.title}
        </h3>

        <p className="text-gray text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-green">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <motion.button
          onClick={onToggle}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-white hover:text-gray-900 border-2 border-green-600 transition-all duration-300 mt-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isExpanded ? 'Close Details' : 'View More'}
        </motion.button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-gray-200 mt-4">
                {/* Detailed Description */}
                <p className="text-gray text-sm mb-4">
                  {product.detailedDescription}
                </p>

                {/* Features */}
                {product.features && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-dark-black mb-2">Key Features:</h4>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <svg className="w-3 h-3 text-primary-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Specifications */}
                {product.specifications && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-dark-black mb-2">Specifications:</h4>
                    <div className="space-y-1 text-sm">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray">{key}:</span>
                          <span className="text-dark-black font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Images */}
                {product.additionalImages && product.additionalImages.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-dark-black mb-2">More Images:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {product.additionalImages.map((image, idx) => (
                        <div key={idx} className="relative h-20 rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`${product.title} ${idx + 2}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4">
                  <motion.button
                    onClick={onAddToCart}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium border-2 transition-all duration-300 ${
                      isInCart 
                        ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200' 
                        : 'bg-green-600 text-white border-green-600 hover:bg-white hover:text-gray-900'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!product.inStock}
                  >
                    {!product.inStock 
                      ? 'Out of Stock' 
                      : quantity > 0 
                        ? `✓ ${quantity} in Cart` 
                        : 'Add to Cart'
                    }
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 border-2 border-gray-300 text-gray hover:border-primary-green hover:text-primary-green rounded-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProductsSection;
