// Product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  rating?: number;
  reviews?: number;
  tags?: string[];
}

// Cart item interface
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  addresses?: Address[];
  orders?: Order[];
}

// Address interface
export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

// Order interface
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  deliveryDate?: Date;
  shippingAddress: Address;
}

// Navigation item interface
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Form data interfaces
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}
