'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, totalSlides]);

  const current = heroSlides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-green-500" style={{ height: 'calc(100vh - 80px)' }}>

      {/* Background Image */}
      <div className="absolute inset-0 bg-blue-500">
                <Image
          src={current.backgroundImage}
          alt={current.title}
                  fill
                  priority={currentSlide === 0}
          sizes="100vw"
          style={{
            objectFit: 'cover',
            opacity: 1,
            transition: 'opacity 0.7s ease-in-out',
          }}
          className="transition-opacity duration-700 ease-in-out"
          onLoad={() => console.log('✅ HeroSlider image loaded for slide', currentSlide)}
          onError={(e) => console.log('❌ HeroSlider image failed for slide', currentSlide, e)}
        />
            </div>

      {/* Very Light Transparent Overlay */}
      {current?.overlay && (
        <div className="absolute inset-0 bg-black/55 z-10"></div>
      )}


      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white z-20"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
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
            onClick={() => setCurrentSlide(index)}
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