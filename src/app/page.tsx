'use client';

import HeroSlider from '@/sections/HeroSlider';
import ProductsSection from '@/sections/ProductsSection';
import FeaturesSection from '@/sections/FeaturesSection';
import MessagesSection from '@/sections/MessagesSection';

export default function Home() {
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
