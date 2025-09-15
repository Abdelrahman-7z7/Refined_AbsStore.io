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
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
        {/* Product Image */}
        <div className="relative w-full sm:w-20 md:w-24 h-32 sm:h-20 md:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 mx-auto sm:mx-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow min-w-0 space-y-3 sm:space-y-2">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-dark-black mb-1 line-clamp-2">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray mb-2 sm:mb-3 line-clamp-2">
              {description}
            </p>
          </div>
          
          {/* Seller & Warranty Info */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray">
            <span className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              AbsStore
            </span>
            <span className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              30 days warranty
            </span>
          </div>

          {/* Price and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <div>
                  <span className="text-xs sm:text-sm text-gray">Unit Price</span>
                  <div className="text-lg sm:text-xl font-bold text-dark-black">
                    ${price.toFixed(2)}
                  </div>
                </div>
                <div>
                  <span className="text-sm sm:text-lg font-semibold text-green-600">
                    Total: ${(price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Creative Quantity Controls */}
            <div className="flex items-center justify-between sm:justify-end space-x-3">
              {/* Quantity Controls */}
              <div className="flex items-center bg-gray-50 rounded-xl p-1">
                <motion.button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white shadow-sm hover:bg-gray-100 flex items-center justify-center transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={quantity <= 1}
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </motion.button>
                
                <div className="mx-2 sm:mx-3 min-w-[2.5rem] sm:min-w-[3rem] text-center">
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleInputChange}
                    min="1"
                    max="99"
                    className="w-full text-center font-semibold text-gray-800 bg-transparent border-none outline-none text-sm sm:text-lg"
                  />
                </div>
                
                <motion.button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white shadow-sm hover:bg-gray-100 flex items-center justify-center transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={quantity >= 99}
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </motion.button>
              </div>
              
              {/* Remove Button */}
              <motion.button
                onClick={() => onRemove(id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 flex items-center text-xs sm:text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="hidden sm:inline">Remove</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
