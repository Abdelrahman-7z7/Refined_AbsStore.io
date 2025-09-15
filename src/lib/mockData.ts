import { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    detailedDescription: "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers, gamers, and professionals who demand the best audio experience.",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center",
    additionalImages: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop&crop=center"
    ],
    category: "Audio",
    inStock: true,
    rating: 4.8,
    features: ["Noise Cancellation", "30h Battery Life", "Bluetooth 5.0", "Quick Charge"],
    specifications: {
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.0",
      "Weight": "250g",
      "Frequency Response": "20Hz - 20kHz"
    }
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitoring",
    detailedDescription: "Track your fitness journey with our smart fitness watch. Monitor heart rate, sleep patterns, and daily activities. Water-resistant design with 7-day battery life and GPS tracking for outdoor workouts.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center",
    additionalImages: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop&crop=center"],
    category: "Wearables",
    inStock: true,
    rating: 4.6,
    features: ["Heart Rate Monitor", "GPS Tracking", "7-Day Battery", "Water Resistant"],
    specifications: {
      "Display": "1.4\" AMOLED",
      "Battery Life": "7 days",
      "Water Resistance": "5ATM",
      "Sensors": "Heart Rate, GPS, Accelerometer"
    }
  },
  {
    id: 3,
    title: "Gaming Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard for gaming enthusiasts",
    detailedDescription: "Dominate your games with our premium mechanical keyboard. Featuring RGB backlighting, tactile switches, and programmable keys. Built for durability and performance with anti-ghosting technology.",
    price: 149.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop&crop=center",
    additionalImages: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop&crop=center", "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=500&h=500&fit=crop&crop=center"],
    category: "Gaming",
    inStock: true,
    rating: 4.7,
    features: ["RGB Backlighting", "Mechanical Switches", "Programmable Keys", "Anti-Ghosting"],
    specifications: {
      "Switch Type": "Mechanical",
      "Backlighting": "RGB",
      "Key Layout": "Full Size",
      "Connectivity": "USB-C"
    }
  },
  {
    id: 4,
    title: "4K Ultra HD Monitor",
    description: "27-inch 4K monitor with HDR support",
    detailedDescription: "Experience stunning visuals with our 27-inch 4K Ultra HD monitor. Featuring HDR support, 99% sRGB color accuracy, and ultra-thin bezels. Perfect for content creators, gamers, and professionals.",
    price: 399.99,
    originalPrice: 499.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop&crop=center",
    additionalImages: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&h=500&fit=crop&crop=center"],
    category: "Displays",
    inStock: true,
    rating: 4.9,
    features: ["4K Resolution", "HDR Support", "99% sRGB", "Ultra-thin Bezels"],
    specifications: {
      "Resolution": "3840 x 2160",
      "Panel Type": "IPS",
      "Refresh Rate": "60Hz",
      "Response Time": "5ms"
    }
  },
  {
    id: 5,
    title: "Wireless Charging Pad",
    description: "Fast wireless charging pad with LED indicator",
    detailedDescription: "Charge your devices wirelessly with our fast charging pad. Compatible with all Qi-enabled devices, features LED charging indicator and non-slip surface. Sleek design that fits any workspace.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&crop=center",
    category: "Accessories",
    inStock: true,
    rating: 4.5,
    features: ["Fast Charging", "LED Indicator", "Non-slip Surface", "Qi Compatible"],
    specifications: {
      "Output Power": "15W",
      "Compatibility": "Qi Standard",
      "Material": "Silicone + ABS",
      "Cable Length": "1.5m"
    }
  },
  {
    id: 6,
    title: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360-degree sound",
    detailedDescription: "Take your music anywhere with our portable Bluetooth speaker. Features 360-degree sound, 12-hour battery life, and waterproof design. Perfect for outdoor adventures and indoor entertainment.",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center",
    additionalImages: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center"],
    category: "Audio",
    inStock: true,
    rating: 4.4,
    features: ["360° Sound", "12h Battery", "Waterproof", "Bluetooth 5.0"],
    specifications: {
      "Battery Life": "12 hours",
      "Connectivity": "Bluetooth 5.0",
      "Water Rating": "IPX7",
      "Weight": "600g"
    }
  },
  {
    id: 7,
    title: "Gaming Mouse",
    description: "High-precision gaming mouse with customizable RGB",
    detailedDescription: "Achieve precision gaming with our high-DPI gaming mouse. Features customizable RGB lighting, programmable buttons, and ergonomic design. Built for competitive gaming with ultra-responsive sensors.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop&crop=center",
    additionalImages: ["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=500&fit=crop&crop=center"],
    category: "Gaming",
    inStock: true,
    rating: 4.6,
    features: ["High DPI", "RGB Lighting", "Programmable Buttons", "Ergonomic Design"],
    specifications: {
      "DPI Range": "100-16000",
      "Sensor": "Optical",
      "Buttons": "8 Programmable",
      "Weight": "95g"
    }
  },
  {
    id: 8,
    title: "USB-C Hub",
    description: "Multi-port USB-C hub with 4K HDMI output",
    detailedDescription: "Expand your device connectivity with our multi-port USB-C hub. Features 4K HDMI output, multiple USB ports, SD card reader, and power delivery. Perfect for laptops and tablets.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop&crop=center",
    category: "Accessories",
    inStock: true,
    rating: 4.3,
    features: ["4K HDMI", "Multiple USB Ports", "SD Card Reader", "Power Delivery"],
    specifications: {
      "HDMI Output": "4K @ 30Hz",
      "USB Ports": "3x USB 3.0",
      "Card Reader": "SD/TF",
      "Power Delivery": "100W"
    }
  },
  {
    id: 9,
    title: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for ergonomic workspace",
    detailedDescription: "Improve your workspace ergonomics with our adjustable aluminum laptop stand. Features multiple height adjustments, sturdy construction, and foldable design for easy storage and portability.",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop&crop=center",
    category: "Accessories",
    inStock: true,
    rating: 4.7,
    features: ["Adjustable Height", "Aluminum Construction", "Foldable Design", "Non-slip Surface"],
    specifications: {
      "Material": "Aluminum",
      "Height Range": "6-12 inches",
      "Weight Capacity": "15kg",
      "Compatibility": "All Laptops"
    }
  },
  {
    id: 10,
    title: "Webcam HD",
    description: "1080p HD webcam with built-in microphone",
    detailedDescription: "Enhance your video calls with our 1080p HD webcam. Features built-in microphone, auto-focus, and low-light correction. Perfect for remote work, streaming, and video conferencing.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop&crop=center",
    category: "Accessories",
    inStock: true,
    rating: 4.5,
    features: ["1080p HD", "Built-in Mic", "Auto-focus", "Low-light Correction"],
    specifications: {
      "Resolution": "1920 x 1080",
      "Frame Rate": "30fps",
      "Field of View": "90°",
      "Connectivity": "USB 2.0"
    }
  },
  {
    id: 11,
    title: "Tablet Pro",
    description: "10.1-inch Android tablet with stylus support",
    detailedDescription: "Productivity meets portability with our 10.1-inch Android tablet. Features stylus support, 8GB RAM, 128GB storage, and all-day battery life. Perfect for work, creativity, and entertainment.",
    price: 299.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop&crop=center",
    additionalImages: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop&crop=center", "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop&crop=center"],
    category: "Tablets",
    inStock: true,
    rating: 4.6,
    features: ["Stylus Support", "8GB RAM", "128GB Storage", "All-day Battery"],
    specifications: {
      "Display": "10.1\" IPS",
      "RAM": "8GB",
      "Storage": "128GB",
      "Battery": "8000mAh"
    }
  },
  {
    id: 12,
    title: "Smart Home Hub",
    description: "Central control hub for smart home devices",
    detailedDescription: "Control your entire smart home with our central hub. Compatible with 100+ devices, features voice control, and mobile app integration. Create automations and monitor your home from anywhere.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&crop=center",
    category: "Smart Home",
    inStock: true,
    rating: 4.4,
    features: ["Voice Control", "100+ Device Support", "Mobile App", "Automation"],
    specifications: {
      "Connectivity": "WiFi, Zigbee, Z-Wave",
      "Voice Assistant": "Built-in",
      "Compatibility": "100+ Devices",
      "Power": "AC Adapter"
    }
  },
  {
    id: 13,
    title: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with touch control",
    detailedDescription: "Illuminate your workspace with our adjustable LED desk lamp. Features touch control, multiple brightness levels, and color temperature adjustment. USB charging port included for convenience.",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=center",
    category: "Accessories",
    inStock: true,
    rating: 4.5,
    features: ["Touch Control", "Adjustable Brightness", "Color Temperature", "USB Port"],
    specifications: {
      "Brightness": "500-1500 lumens",
      "Color Temperature": "3000K-6500K",
      "Power": "USB-C",
      "Adjustment": "360° rotation"
    }
  },
  {
    id: 14,
    title: "External SSD",
    description: "1TB portable SSD with USB 3.2 Gen 2",
    detailedDescription: "Fast, reliable storage with our 1TB portable SSD. Features USB 3.2 Gen 2 connectivity, read speeds up to 1050MB/s, and compact design. Perfect for professionals and content creators.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop&crop=center",
    category: "Storage",
    inStock: true,
    rating: 4.8,
    features: ["1TB Capacity", "USB 3.2 Gen 2", "1050MB/s Read", "Compact Design"],
    specifications: {
      "Capacity": "1TB",
      "Interface": "USB 3.2 Gen 2",
      "Read Speed": "1050MB/s",
      "Write Speed": "1000MB/s"
    }
  },
  {
    id: 15,
    title: "Noise Cancelling Earbuds",
    description: "True wireless earbuds with active noise cancellation",
    detailedDescription: "Experience premium audio with our true wireless earbuds. Features active noise cancellation, 6-hour battery life, wireless charging case, and IPX7 water resistance.",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop&crop=center",
    additionalImages: ["https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop&crop=center"],
    category: "Audio",
    inStock: true,
    rating: 4.7,
    features: ["Active Noise Cancellation", "6h Battery", "Wireless Charging", "IPX7 Waterproof"],
    specifications: {
      "Battery Life": "6 hours + 18h case",
      "Connectivity": "Bluetooth 5.0",
      "Water Rating": "IPX7",
      "Charging": "Wireless + USB-C"
    }
  },
  {
    id: 16,
    title: "Gaming Chair",
    description: "Ergonomic gaming chair with lumbar support",
    detailedDescription: "Game in comfort with our ergonomic gaming chair. Features lumbar support, adjustable armrests, 360-degree swivel, and premium materials. Built for long gaming sessions and work.",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop&crop=center",
    additionalImages: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop&crop=center", "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop&crop=center"],
    category: "Furniture",
    inStock: true,
    rating: 4.6,
    features: ["Lumbar Support", "Adjustable Armrests", "360° Swivel", "Premium Materials"],
    specifications: {
      "Weight Capacity": "150kg",
      "Height Range": "45-55cm",
      "Material": "PU Leather",
      "Warranty": "2 years"
    }
  }
];
