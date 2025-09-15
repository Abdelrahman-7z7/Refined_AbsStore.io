'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
            Fashion Forward
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the latest trends in fashion with our curated collection of quality clothing
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="shadow-custom">
              Shop Collection
            </Button>
            <Button variant="outline" size="lg">
              View Lookbook
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
