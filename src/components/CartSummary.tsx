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
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-dark-black mb-1">Order Summary</h2>
        <p className="text-secondary-gray text-xs sm:text-sm">Review your items and proceed to checkout</p>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {/* Subtotal */}
          <div className="flex justify-between items-center py-1">
            <span className="text-xs sm:text-sm text-secondary-gray">Subtotal</span>
            <span className="font-semibold text-dark-black text-sm sm:text-base">${subtotal.toFixed(2)}</span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between items-center py-1">
            <span className="text-xs sm:text-sm text-secondary-gray">Shipping</span>
            <span className="font-semibold text-primary-green text-sm sm:text-base flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free
            </span>
          </div>

          {/* Tax */}
          <div className="flex justify-between items-center py-1">
            <span className="text-xs sm:text-sm text-secondary-gray">Tax (8%)</span>
            <span className="font-semibold text-dark-black text-sm sm:text-base">${tax.toFixed(2)}</span>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-gray-200/50 pt-3 sm:pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg sm:text-xl font-bold text-dark-black">Total</span>
              <span className="text-xl sm:text-2xl font-bold text-primary-green">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
             <motion.button
               onClick={onCheckout}
               className="w-full bg-primary-green text-white py-3 sm:py-4 px-4 rounded-xl font-bold text-base sm:text-lg hover:bg-hover-green transition-all duration-300 mt-4 sm:mt-6 flex items-center justify-center shadow-lg hover:shadow-xl group cursor-pointer"
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
             >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Proceed to Checkout
        </motion.button>

        {/* Security Badge */}
        <div className="mt-4 sm:mt-6 text-center">
          <div className="flex items-center justify-center text-xs text-secondary-gray bg-gray-50 rounded-xl py-2 px-3">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Secure checkout with SSL encryption</span>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mt-4 sm:mt-6 space-y-2">
          <div className="flex items-center text-xs text-secondary-gray">
            <svg className="w-3 h-3 mr-2 text-primary-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Free shipping on all orders</span>
          </div>
          <div className="flex items-center text-xs text-secondary-gray">
            <svg className="w-3 h-3 mr-2 text-primary-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>30-day return policy</span>
          </div>
          <div className="flex items-center text-xs text-secondary-gray">
            <svg className="w-3 h-3 mr-2 text-primary-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Customer support 24/7</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartSummary;
