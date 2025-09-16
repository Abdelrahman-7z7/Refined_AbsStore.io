'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CartItemProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  index: number;
}

const CartItem: React.FC<CartItemProps> = ({ 
  id, 
  title, 
  description, 
  price, 
  image, 
  quantity,
  onRemove, 
  onUpdateQuantity,
  index 
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 99) {
      onUpdateQuantity(id, value);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          
          {/* Product Image */}
          <div className="relative w-full lg:w-24 xl:w-28 h-32 sm:h-36 lg:h-24 xl:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 mx-auto lg:mx-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="flex-grow min-w-0 space-y-3">
            
            {/* Title and Description */}
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-dark-black line-clamp-2 leading-tight">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-secondary-gray line-clamp-2 leading-relaxed">
                {description}
              </p>
            </div>
            
            {/* Seller & Warranty Info */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-secondary-gray">
                <svg className="w-3 h-3 mr-1 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                AbsStore
              </span>
              <span className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-secondary-gray">
                <svg className="w-3 h-3 mr-1 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                30 days warranty
              </span>
            </div>

            {/* Price and Actions Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-200/50">
              
              {/* Price Information */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="text-center sm:text-left">
                  <span className="text-xs text-secondary-gray block mb-1">Unit Price</span>
                  <div className="text-lg sm:text-xl font-bold text-dark-black">
                    ${price.toFixed(2)}
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <span className="text-xs sm:text-sm text-secondary-gray block mb-1">Total</span>
                  <div className="text-base sm:text-lg font-bold text-primary-green">
                    ${(price * quantity).toFixed(2)}
                  </div>
                </div>
              </div>
              
              {/* Quantity Controls and Remove Button */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                
                {/* Quantity Controls */}
                <div className="flex items-center bg-gray-50 rounded-xl p-1">
                  <motion.button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white shadow-sm hover:bg-gray-100 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={quantity <= 1}
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </motion.button>
                  
                  <div className="mx-2 min-w-[2.5rem] text-center">
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleInputChange}
                      min="1"
                      max="99"
                      className="w-full text-center font-bold text-dark-black bg-transparent border-none outline-none text-sm sm:text-base focus:ring-0"
                    />
                  </div>
                  
                  <motion.button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white shadow-sm hover:bg-gray-100 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={quantity >= 99}
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </motion.button>
                </div>
                
                {/* Remove Button */}
                <motion.button
                  onClick={() => onRemove(id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl transition-all duration-200 flex items-center text-xs sm:text-sm font-semibold group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="hidden sm:inline">Remove</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
