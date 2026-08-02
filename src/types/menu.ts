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

export interface SizeOption {
  id: string;
  label: LocalizedText;
  priceDelta: number; // added to base price, 0 for the default size
}

export interface ExtraOption {
  id: string;
  label: LocalizedText;
  price: number;
}

export interface NutritionFacts {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string; // ISO date
  comment: LocalizedText;
  helpfulCount: number;
}

export interface Product {
  id: string;
  categoryId: string;
  name: LocalizedText;
  description: LocalizedText;
  longDescription?: LocalizedText;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  prepTimeMinutes: number;
  calories: number;
  isAvailable: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isPopular?: boolean;
  hasOffer?: boolean;
  images: string[];
  tag?: LocalizedText;
  ingredients: LocalizedText[];
  nutrition: NutritionFacts;
  sizes?: SizeOption[];
  extras?: ExtraOption[];
  reviews: Review[];
}

export interface SelectedExtra extends ExtraOption {
  quantity: 1;
}

export interface CartLine {
  lineId: string;
  product: Product;
  quantity: number;
  selectedSize?: SizeOption;
  selectedExtras: ExtraOption[];
  unitPrice: number;
}

export type SortOption = "recommended" | "priceAsc" | "priceDesc" | "rating" | "prepTime";

export interface MenuFilters {
  categoryId: string | null;
  priceMax: number | null;
  minRating: number | null;
  onlyPopular: boolean;
  onlyOffers: boolean;
  onlyVegetarian: boolean;
  onlySpicy: boolean;
  onlyAvailable: boolean;
}

export const defaultMenuFilters: MenuFilters = {
  categoryId: null,
  priceMax: null,
  minRating: null,
  onlyPopular: false,
  onlyOffers: false,
  onlyVegetarian: false,
  onlySpicy: false,
  onlyAvailable: false,
};
