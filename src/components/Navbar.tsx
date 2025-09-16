'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { NavLink } from '@/types/navigation';

const navigationLinks: NavLink[] = [
  { label: 'About', target: '/about', type: 'page' },
  { label: 'Products', target: '#products', type: 'section' },
  { label: 'Features', target: '#features', type: 'section' },
  { label: 'Contact', target: '#messages', type: 'section' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { getTotalQuantity } = useCart();
  const { user, logout } = useAuth();
  const cartItemCount = getTotalQuantity();
  const router = useRouter();

  // Handle hash navigation on page load
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash && window.location.pathname === '/') {
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const navbar = document.querySelector('nav');
            const navbarHeight = navbar ? navbar.offsetHeight : 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        }, 300);
      }
    };

    // Handle initial load
    handleHashNavigation();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu) {
        const target = event.target as Element;
        if (!target.closest('.user-menu-container')) {
          setShowUserMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLinkClick = (link: NavLink) => {
    // Close mobile menu after click
    setIsMobileMenuOpen(false);
    
    if (link.type === 'section') {
      // Check if we're on the home page
      if (window.location.pathname === '/') {
        // We're on home page, just scroll to section
        setTimeout(() => {
          const element = document.querySelector(link.target);
          if (element) {
            const navbar = document.querySelector('nav');
            const navbarHeight = navbar ? navbar.offsetHeight : 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        }, 100); // Small delay to ensure menu is closed
      } else {
        // We're on another page, navigate to home with hash using Next.js router
        router.push(`/${link.target}`);
      }
    } else if (link.type === 'page') {
      // Navigate to page using Next.js router
      router.push(link.target);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCartClick = () => {
    // Close mobile menu after click
    setIsMobileMenuOpen(false);
    router.push('/cart');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-black backdrop-blur-sm border-b border-gray-800 shadow-lg"
    >
      <div className="container-custom">
        {/* Mobile/Tablet Layout - Flex with space-between */}
        <div className="flex lg:hidden items-center justify-between h-16 sm:h-18">
          {/* Left Side - Logo */}
          <div className="flex items-center flex-shrink-0">
            <motion.button
              onClick={() => router.push('/')}
              className="flex items-center space-x-1 sm:space-x-2 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#369e62] rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm md:text-base font-bold text-white tracking-tight">AbsStore</span>
            </motion.button>
          </div>

          {/* Right Side - Cart and Menu */}
          <div className="flex items-center space-x-0.5 sm:space-x-1">
            {/* Cart Icon */}
            <motion.button
              onClick={handleCartClick}
              className="relative p-1.5 sm:p-2 text-white hover:text-gray-300 transition-colors duration-200 rounded-lg hover:bg-gray-800/50 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 11v6M15 11v6"
              />
            </svg>
              {/* Cart Badge */}
              {cartItemCount > 0 && (
                <motion.span 
                  className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-semibold rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-1.5 sm:p-2 text-white hover:text-gray-300 transition-colors duration-200 rounded-lg hover:bg-gray-800/50 flex items-center justify-center cursor-pointer"
            >
              <Image
                src="/assets/main-menu.png"
                alt="Menu"
                width={20}
                height={20}
                className="object-contain w-4 h-4 sm:w-5 sm:h-5"
              />
            </button>
          </div>
        </div>

        {/* Desktop Layout - Three Column Grid */}
        <div className="hidden lg:grid grid-cols-3 items-center h-20">
          {/* Left Side - Logo */}
          <div className="flex justify-start">
            <motion.button
              onClick={() => router.push('/')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="w-10 h-10 bg-[#369e62] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
              </div>
              <span className="text-xl xl:text-2xl font-bold text-white tracking-tight">AbsStore</span>
            </motion.button>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="flex items-center justify-center space-x-6 xl:space-x-8">
            {navigationLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className="relative text-white hover:text-gray-300 font-medium text-base transition-colors duration-200 group px-2 py-2 rounded-md cursor-pointer"
              >
                {link.label}
                <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </button>
            ))}
          </div>

          {/* Right Side - Auth, Cart and Menu */}
          <div className="flex items-center justify-end space-x-2">
            {/* Authentication Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              {user ? (
                /* User Menu */
                <div className="relative user-menu-container">
                  <motion.button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 text-white hover:text-gray-300 transition-colors duration-200 rounded-lg hover:bg-gray-800/50 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#369e62] rounded-full flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-medium hidden sm:block">{user.firstName}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.button>

                  {/* User Dropdown Menu */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            router.push('/profile');
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 min-h-[40px] flex items-center"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            router.push('/orders');
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 min-h-[40px] flex items-center"
                        >
                          Orders
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 min-h-[40px] flex items-center"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Login/Register Buttons */
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => router.push('/login')}
                    className="text-white hover:text-gray-300 font-medium text-sm transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-800/50 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    onClick={() => router.push('/register')}
                    className="bg-[#369e62] text-white hover:bg-[#008000] font-medium text-sm transition-colors duration-200 px-4 py-2 rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up
                  </motion.button>
                </div>
              )}
            </div>

            {/* Cart Icon - Desktop Only */}
            <motion.button
              onClick={handleCartClick}
              className="relative p-3 text-white hover:text-gray-300 transition-colors duration-200 rounded-lg hover:bg-gray-800/50 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 11v6M15 11v6"
              />
            </svg>
              {/* Cart Badge */}
              {cartItemCount > 0 && (
                <motion.span 
                  className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden border-t border-gray-800 bg-black/95 backdrop-blur-sm"
            >
              <div className="py-4 px-4 space-y-2 sm:py-6 sm:px-6 sm:space-y-3">
                {navigationLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link)}
                    className="block w-full text-left px-3 py-3 sm:px-4 text-white hover:text-gray-300 hover:bg-gray-800/50 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-sm sm:text-base min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </button>
                ))}

                {/* Mobile Authentication */}
                {user ? (
                  /* Mobile User Menu */
                  <div className="border-t border-gray-700 pt-3 mt-3">
                    <div className="px-3 py-2 mb-3 sm:px-4">
                      <p className="text-sm font-medium text-white truncate">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push('/profile');
                      }}
                      className="block w-full text-left px-3 py-3 sm:px-4 text-white hover:text-gray-300 hover:bg-gray-800/50 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-sm sm:text-base min-h-[44px] flex items-center"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push('/orders');
                      }}
                      className="block w-full text-left px-3 py-3 sm:px-4 text-white hover:text-gray-300 hover:bg-gray-800/50 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-sm sm:text-base min-h-[44px] flex items-center"
                    >
                      Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-3 sm:px-4 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-sm sm:text-base min-h-[44px] flex items-center"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  /* Mobile Login/Register Buttons */
                  <div className="border-t border-gray-700 pt-3 mt-3 space-y-2">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push('/login');
                      }}
                      className="block w-full text-left px-3 py-3 sm:px-4 text-white hover:text-gray-300 hover:bg-gray-800/50 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-sm sm:text-base min-h-[44px] flex items-center"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push('/register');
                      }}
                      className="block w-full text-center px-3 py-3 sm:px-4 bg-[#369e62] text-white hover:bg-[#008000] rounded-lg transition-colors duration-200 font-medium cursor-pointer text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
                
                {/* Mobile Cart Button */}
                <button
                  onClick={handleCartClick}
                  className="flex items-center justify-between w-full text-left px-3 py-3 sm:px-4 text-white hover:text-gray-300 hover:bg-gray-800/50 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-sm sm:text-base min-h-[44px]"
                >
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 11v6M15 11v6"
                      />
                    </svg>
                    <span>Cart</span>
                  </div>
                  {cartItemCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
