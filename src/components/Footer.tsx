'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';

const quickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Products', href: '#products' },
  { label: 'Features', href: '#features' },
  { label: 'Cart', href: '/cart' },
  { label: 'Messages', href: '#messages' }
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' }
];

const contactInfo = [
  { icon: MapPin, text: '123 Tech Street, Digital City, DC 12345' },
  { icon: Phone, text: '+90 543 6978152' },
  { icon: Mail, text: 'elorabi.abdelrahman@gmail.com' }
];

export default function Footer() {
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(href);
    }
  };

  return (
    <footer className="w-full bg-[#191919] text-gray-200 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Column 1 - Brand / Logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#369e62] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">AbsStore</span>
            </motion.div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">
              Your trusted online store for modern shopping experiences. Discover premium tech products with fast delivery and exceptional service.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-full bg-gray-800 p-2 hover:bg-[#369e62] transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-left text-gray-300 hover:text-[#369e62] transition-colors duration-300 relative group"
                  whileHover={{ x: 5 }}
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#369e62] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Column 3 - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <contact.icon className="w-4 h-4 text-[#369e62]" />
                  </div>
                  <span className="text-sm leading-relaxed">{contact.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-10 pt-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Abdelrahman Reyad. All rights reserved.
            </p>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-[#369e62] transition-colors duration-300 text-sm hidden md:block"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
