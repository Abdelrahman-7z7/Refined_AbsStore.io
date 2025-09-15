export interface Product {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  price: number;
  originalPrice?: number;
  image: string;
  additionalImages?: string[];
  category: string;
  inStock: boolean;
  rating: number;
  features?: string[];
  specifications?: Record<string, string>;
}

export interface ProductCardProps {
  product: Product;
  isExpanded: boolean;
  onToggle: () => void;
}
