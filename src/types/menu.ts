export interface LocalizedText {
  ar: string;
  en: string;
}

export interface Category {
  id: string;
  name: LocalizedText;
  icon: string; // lucide icon name reference, resolved in component
  productCount: number;
}

export interface Product {
  id: string;
  categoryId: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  discountPrice?: number;
  rating: number;
  prepTimeMinutes: number;
  isAvailable: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  image: string;
  tag?: LocalizedText;
}

export interface CartLine {
  product: Product;
  quantity: number;
}
