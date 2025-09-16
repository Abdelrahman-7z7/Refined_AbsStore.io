'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  overlay: boolean;
}

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Premium Tech Collection',
    subtitle: 'Discover cutting-edge technology with our exclusive premium tech products',
    backgroundImage: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop&crop=center',
    ctaText: 'Shop Now',
    ctaLink: '#products',
    overlay: true,
  },
  {
    id: '2',
    title: 'Gaming Essentials',
    subtitle: 'Level up your gaming experience with our high-performance gaming gear',
    backgroundImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop&crop=center',
    ctaText: 'Explore Gaming',
    ctaLink: '#products',
    overlay: true,
  },
  {
    id: '3',
    title: 'Smart Home Solutions',
    subtitle: 'Transform your home with our innovative smart home technology',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop&crop=center',
    ctaText: 'Learn More',
    ctaLink: '#products',
    overlay: true,
  },
  {
    id: '4',
    title: 'Audio Excellence',
    subtitle: 'Experience crystal-clear sound with our premium audio equipment',
    backgroundImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=600&fit=crop&crop=center',
    ctaText: 'Shop Audio',
    ctaLink: '#products',
    overlay: true,
  },
];

  const totalSlides = heroSlides.length;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection('left');
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, totalSlides]);

  const goToNext = () => {
    setDirection('left');
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToPrevious = () => {
    setDirection('right');
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 'right' : 'left');
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handleCtaClick = (link: string) => {
    if (link.startsWith('#')) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const current = heroSlides[currentSlide];

  return (
    <div 
      className="relative w-full overflow-hidden bg-black h-screen sm:h-[calc(100vh-80px)]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >

      {/* Background Image with Directional Fade */}
      <div className="absolute inset-0 bg-black">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ 
              opacity: 0, 
              x: direction === 'right' ? 50 : -50 
            }}
            animate={{ 
              opacity: 1, 
              x: 0 
            }}
            exit={{ 
              opacity: 0, 
              x: direction === 'right' ? -50 : 50 
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={current.backgroundImage}
              alt={current.title}
              fill
              priority={currentSlide === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
              onLoad={() => console.log('✅ HeroSlider image loaded for slide', currentSlide)}
              onError={(e) => console.log('❌ HeroSlider image failed for slide', currentSlide, e)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Very Light Transparent Overlay */}
      {current?.overlay && (
        <div className="absolute inset-0 bg-black/55 z-10"></div>
      )}

      {/* Content - Centered with same z-index as navigation */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center text-white z-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight px-2"
        >
          {current.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-xs sm:max-w-lg md:max-w-2xl opacity-90 px-2 leading-relaxed"
        >
          {current.subtitle}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={() => handleCtaClick(current.ctaLink)}
          className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white text-sm sm:text-base hover:scale-105 active:scale-95"
        >
          {current.ctaText}
        </motion.button>
      </div>

      {/* Navigation Arrows - Hidden on mobile, visible on tablet and desktop */}
      <button
        onClick={goToPrevious}
        className="hidden sm:flex absolute left-3 sm:left-6 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-100 text-white p-2 sm:p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white z-20 hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="hidden sm:flex absolute right-3 sm:right-6 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-100 text-white p-2 sm:p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white z-20 hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators - Enhanced for touch devices */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 border-2 touch-manipulation ${
              index === currentSlide 
                ? 'bg-white border-white scale-125 shadow-lg' 
                : 'bg-transparent border-white hover:bg-white hover:bg-opacity-50 active:bg-white active:bg-opacity-70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      </div>
  );
};

export default HeroSlider;