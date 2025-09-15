'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CartItem from '@/components/CartItem';
import CartSummary from '@/components/CartSummary';
import { useCart } from '@/hooks/useCart';


export default function CartPage() {
  const { cartItems, isLoading, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const router = useRouter();

  // Remove item from cart
  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  // Handle checkout
  const handleCheckout = () => {
    // Mock checkout - show toast notification
    alert('Checkout not implemented yet! 🛒');
  };

  // Calculate subtotal
  const subtotal = getCartTotal();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-light-gray">
        <div className="max-w-7xl mx-auto py-20 px-6 md:px-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-light-gray">
      <div className="max-w-7xl mx-auto py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          
          {/* Left Side - Cart Items */}
          <div className="flex-1 min-w-0">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-black mb-6 sm:mb-8"
            >
              Your Cart
            </motion.h1>

            {cartItems.length === 0 ? (
              /* Empty Cart State */
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-md p-6 sm:p-8 md:p-12 text-center"
              >
                <div className="text-4xl sm:text-6xl mb-4">😔</div>
                <h2 className="text-xl sm:text-2xl font-semibold text-dark-black mb-4">
                  Your cart is empty
                </h2>
                <p className="text-gray mb-6 text-sm sm:text-base">
                  Looks like you haven&apos;t added any items to your cart yet.
                </p>
                <motion.button
                  onClick={() => router.push('/#products')}
                  className="bg-green-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Shopping
                </motion.button>
              </motion.div>
            ) : (
              /* Cart Items */
              <div className="space-y-3 sm:space-y-4">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      price={item.price}
                      image={item.image}
                      quantity={item.quantity}
                      onRemove={handleRemoveItem}
                      onUpdateQuantity={updateQuantity}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Right Side - Summary */}
          {cartItems.length > 0 && (
            <div className="w-full lg:w-96 xl:w-[28rem]">
              <CartSummary
                subtotal={subtotal}
                onCheckout={handleCheckout}
              />
            </div>
          )}
        </div>

        {/* Continue Shopping Link */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 sm:mt-10 md:mt-12 text-center"
          >
            <button
              onClick={() => router.push('/#products')}
              className="text-green-600 hover:text-green-700 font-medium flex items-center justify-center mx-auto text-sm sm:text-base"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
