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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-black mb-1">
              Your Shopping Cart
            </h1>
            <p className="text-secondary-gray text-sm sm:text-base">
              {cartItems.length > 0 
                ? `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`
                : 'Your cart is currently empty'
              }
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          
          {/* Left Side - Cart Items */}
          <div className="flex-1 min-w-0">
            {cartItems.length === 0 ? (
              /* Empty Cart State */
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center border border-gray-100"
              >
                <div className="text-4xl sm:text-5xl mb-4">🛒</div>
                <h2 className="text-xl sm:text-2xl font-bold text-dark-black mb-3">
                  Your cart is empty
                </h2>
                <p className="text-secondary-gray mb-6 text-sm sm:text-base max-w-md mx-auto">
                  Looks like you haven&apos;t added any items to your cart yet. Start exploring our amazing products!
                </p>
                <motion.button
                  onClick={() => router.push('/#products')}
                  className="bg-primary-green text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-hover-green transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl"
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
            <div className="w-full xl:w-80 xl:max-w-sm">
              <div className="sticky top-6">
                <CartSummary
                  subtotal={subtotal}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          )}
        </div>

        {/* Continue Shopping Link */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 sm:mt-10 text-center"
          >
            <button
              onClick={() => router.push('/#products')}
              className="text-primary-green hover:text-hover-green font-semibold flex items-center justify-center mx-auto text-sm sm:text-base group transition-colors duration-300"
            >
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
