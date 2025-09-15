'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Truck, RotateCcw, Shield, Zap, Heart, ShoppingCart } from 'lucide-react';

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: <Truck className="w-8 h-8 text-blue-600" />,
    title: "Fast Delivery",
    description: "Get your orders delivered within 24-48 hours with our express shipping service."
  },
  {
    id: 2,
    icon: <RotateCcw className="w-8 h-8 text-green-600" />,
    title: "Easy Returns",
    description: "30-day hassle-free return policy with free return shipping for your peace of mind."
  },
  {
    id: 3,
    icon: <Shield className="w-8 h-8 text-purple-600" />,
    title: "Secure Payments",
    description: "Your payment information is protected with bank-level encryption and security."
  },
  {
    id: 4,
    icon: <Zap className="w-8 h-8 text-yellow-600" />,
    title: "Lightning Fast",
    description: "Optimized performance and instant loading for the best shopping experience."
  },
  {
    id: 5,
    icon: <Heart className="w-8 h-8 text-red-600" />,
    title: "Wishlist",
    description: "Save your favorite items for later with our intuitive wishlist feature."
  },
  {
    id: 6,
    icon: <ShoppingCart className="w-8 h-8 text-indigo-600" />,
    title: "Smart Cart",
    description: "Intelligent cart management with quantity controls and real-time price updates."
  }
];

export default function FeaturesSection() {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [screenSize, setScreenSize] = useState('desktop');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate cards per view and total groups based on screen size
  const getCardsPerView = () => {
    switch (screenSize) {
      case 'mobile': return 1;
      case 'tablet': return 2;
      default: return 3;
    }
  };

  const cardsPerView = getCardsPerView();
  const totalGroups = Math.ceil(features.length / cardsPerView);

  // Auto-scroll functionality - move by appropriate number of cards
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection('forward');
      setCurrentGroup((prevGroup) => (prevGroup + 1) % totalGroups);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalGroups]);

  const nextSlide = () => {
    setDirection('forward');
    setCurrentGroup((prevGroup) => (prevGroup + 1) % totalGroups);
  };

  const prevSlide = () => {
    setDirection('backward');
    setCurrentGroup((prevGroup) => (prevGroup - 1 + totalGroups) % totalGroups);
  };

  const getVisibleCards = () => {
    const cards = [];
    const startIndex = currentGroup * cardsPerView;
    
    for (let i = 0; i < cardsPerView; i++) {
      const index = (startIndex + i) % features.length;
      cards.push(features[index]);
    }
    return cards;
  };

  // Touch handlers for mobile swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setDirection('forward');
      nextSlide();
    } else if (isRightSwipe) {
      setDirection('backward');
      prevSlide();
    }
  };

  return (
    <section id="features" className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Features
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            What makes our store unique
          </p>
        </motion.div>
      </div>

      {/* Features Slider - Responsive container */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Cards Container with Navigation - Responsive centering */}
        <div 
          className="relative flex justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Navigation Arrows - Responsive positioning and visibility */}
          {screenSize !== 'mobile' && (
            <motion.button
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute left-1 sm:left-2 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white shadow-lg p-1.5 sm:p-2 md:p-3 hover:bg-gray-100 transition-all duration-300"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-700" />
            </motion.button>
          )}

          {screenSize !== 'mobile' && (
            <motion.button
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute right-1 sm:right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white shadow-lg p-1.5 sm:p-2 md:p-3 hover:bg-gray-100 transition-all duration-300"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-700" />
            </motion.button>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGroup}
              initial={{ 
                opacity: 0, 
                x: screenSize === 'mobile' 
                  ? 0 
                  : direction === 'forward' 
                    ? -50 
                    : 50 
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ 
                opacity: 0, 
                x: screenSize === 'mobile' 
                  ? 0 
                  : direction === 'forward' 
                    ? 50 
                    : -50 
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`flex ${
                screenSize === 'mobile' 
                  ? 'flex-col gap-4 w-full max-w-sm' 
                  : screenSize === 'tablet' 
                    ? 'gap-4 sm:gap-6' 
                    : 'gap-4 sm:gap-6 md:gap-8'
              }`}
            >
              {getVisibleCards().map((feature, index) => (
                <motion.div
                  key={`${currentGroup}-${feature.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`${
                    screenSize === 'mobile' 
                      ? 'w-full max-w-sm mx-auto' 
                      : screenSize === 'tablet' 
                        ? 'min-w-[280px] sm:min-w-[300px]' 
                        : 'min-w-[240px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[320px]'
                  } rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 bg-white hover:shadow-xl transition-all duration-500 ease-out relative z-20`}
                  whileHover={{ 
                    scale: screenSize === 'mobile' ? 1 : 1.02,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className={`${
                      screenSize === 'mobile' 
                        ? 'w-10 h-10 sm:w-12 sm:h-12' 
                        : 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12'
                    } flex items-center justify-center`}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className={`${
                    screenSize === 'mobile' 
                      ? 'text-lg sm:text-xl' 
                      : 'text-base sm:text-lg md:text-xl'
                  } font-semibold text-gray-900 mb-2 sm:mb-3 text-center`}>
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={`${
                    screenSize === 'mobile' 
                      ? 'text-sm sm:text-base' 
                      : 'text-xs sm:text-sm md:text-base'
                  } text-gray-600 text-center leading-relaxed`}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator - Responsive and touch-friendly */}
        <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 space-x-2 sm:space-x-3">
          {Array.from({ length: totalGroups }, (_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentGroup ? 'forward' : 'backward');
                setCurrentGroup(index);
              }}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className={`${
                screenSize === 'mobile' 
                  ? 'w-3 h-3 p-1' 
                  : 'w-2 h-2 sm:w-3 sm:h-3'
              } rounded-full transition-all duration-300 ${
                index === currentGroup 
                  ? 'bg-gray-900' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Mobile Touch Navigation - Swipe indicators */}
        {screenSize === 'mobile' && (
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={prevSlide}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Previous
            </button>
            <button
              onClick={nextSlide}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
