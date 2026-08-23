export interface ProductColor {
  name: string;
  hex: string;
  imageUrl: string;
}

export type ProductCategory =
  | 'all'
  | 'ladies-toys'
  | 'men-toys'
  | 'lovense'
  | 'bondage'
  | 'lubricants'
  | 'anal-toys'
  | 'dildos'
  | 'strap-on'
  | 'rose-toys'
  | 'wands';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'new' | 'hot' | 'bestseller' | 'sale';
  isBestseller?: boolean;
  isRestocked?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stockQuantity: number;
  features: string[];
  specs: {
    material: string;
    vibrationModes: string;
    waterproof: string;
    battery: string;
    noiseLevel: string;
    dimensions?: string;
  };
  colors: ProductColor[];
  mainImage: string;
  galleryImages: string[];
}

export interface CategoryCard {
  id: ProductCategory;
  title: string;
  subtitle?: string;
  imageUrl: string;
  count: number;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
}

export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  productName: string;
  date: string;
  rating: number;
  comment: string;
  type: 'whatsapp' | 'tiktok';
  verifiedBuyer: boolean;
}
