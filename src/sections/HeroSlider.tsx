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

  const current = heroSlides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ height: 'calc(100vh - 80px)' }}>

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
              sizes="100vw"
              style={{
                objectFit: 'cover',
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
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white z-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{current.title}</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">{current.subtitle}</p>
        <button
          onClick={() => handleCtaClick(current.ctaLink)}
          className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          {current.ctaText}
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white z-20"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white z-20"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
              index === currentSlide 
                ? 'bg-white border-white scale-125 shadow-lg' 
                : 'bg-transparent border-white hover:bg-white hover:bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      </div>
  );
};

export default HeroSlider;