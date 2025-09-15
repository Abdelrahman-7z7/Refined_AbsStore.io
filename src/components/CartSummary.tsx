'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CartSummaryProps {
  subtotal: number;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, onCheckout }) => {
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-100 sticky top-4 sm:top-8"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-dark-black mb-4 sm:mb-6">Order Summary</h2>
      
      <div className="space-y-3 sm:space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-sm sm:text-base text-gray">Subtotal</span>
          <span className="font-semibold text-dark-black text-sm sm:text-base">${subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <span className="text-sm sm:text-base text-gray">Shipping</span>
          <span className="font-semibold text-green-600 text-sm sm:text-base">Free</span>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center">
          <span className="text-sm sm:text-base text-gray">Tax</span>
          <span className="font-semibold text-dark-black text-sm sm:text-base">${tax.toFixed(2)}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-3 sm:pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg sm:text-xl font-bold text-dark-black">Total</span>
            <span className="text-xl sm:text-2xl font-bold text-dark-black">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <motion.button
        onClick={onCheckout}
        className="w-full bg-green-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-base sm:text-lg hover:bg-green-700 transition-all duration-300 mt-4 sm:mt-6 flex items-center justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        Proceed to Checkout
      </motion.button>

      {/* Security Badge */}
      <div className="mt-3 sm:mt-4 text-center">
        <div className="flex items-center justify-center text-xs sm:text-sm text-gray">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Secure checkout with SSL encryption
        </div>
      </div>
    </motion.div>
  );
};

export default CartSummary;
