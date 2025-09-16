'use client';

import { useEffect } from 'react';
import HeroSlider from '@/sections/HeroSlider';
import ProductsSection from '@/sections/ProductsSection';
import FeaturesSection from '@/sections/FeaturesSection';
import MessagesSection from '@/sections/MessagesSection';

export default function Home() {
  // Handle hash navigation when coming from other pages
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash && hash !== '#') {
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

    // Handle initial load with hash
    handleHashNavigation();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Slider Section */}
      <section className="relative z-10 h-screen">
        <HeroSlider />
      </section>
      
      {/* Products Section */}
      <section className="relative z-20 bg-white">
        <ProductsSection />
      </section>

      {/* Features Section */}
      <section className="relative z-30">
        <FeaturesSection />
      </section>

      {/* Messages Section */}
      <section className="relative z-40">
        <MessagesSection />
      </section>
    </main>
  );
}
