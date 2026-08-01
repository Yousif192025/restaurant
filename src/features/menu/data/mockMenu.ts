import type { Category, Product } from "@/types/menu";

export const categories: Category[] = [
  { id: "burgers", name: { ar: "برجر", en: "Burgers" }, icon: "Beef", productCount: 6 },
  { id: "pizza", name: { ar: "بيتزا", en: "Pizza" }, icon: "Pizza", productCount: 5 },
  { id: "chicken", name: { ar: "دجاج", en: "Chicken" }, icon: "Drumstick", productCount: 4 },
  { id: "grills", name: { ar: "مشاوي", en: "Grills" }, icon: "Flame", productCount: 5 },
  { id: "salads", name: { ar: "سلطات", en: "Salads" }, icon: "Salad", productCount: 4 },
  { id: "desserts", name: { ar: "حلويات", en: "Desserts" }, icon: "IceCream", productCount: 6 },
  { id: "drinks", name: { ar: "مشروبات", en: "Drinks" }, icon: "CupSoda", productCount: 5 },
  { id: "coffee", name: { ar: "قهوة", en: "Coffee" }, icon: "Coffee", productCount: 4 },
];

export const products: Product[] = [
  {
    id: "p-smoked-brisket-burger",
    categoryId: "burgers",
    name: { ar: "برجر البريسكت المدخّن", en: "Smoked Brisket Burger" },
    description: {
      ar: "لحم بقري مدخن ببطء، جبن غرويير، بصل مكرمل، صوص الخردل والعسل.",
      en: "Slow-smoked brisket, gruyère, caramelized onion, honey-mustard glaze.",
    },
    price: 42,
    discountPrice: 36,
    rating: 4.8,
    prepTimeMinutes: 18,
    isAvailable: true,
    image: "https://picsum.photos/seed/silverleaf-brisket-burger/700/560",
    tag: { ar: "الأكثر طلبًا", en: "Best Seller" },
  },
  {
    id: "p-truffle-margherita",
    categoryId: "pizza",
    name: { ar: "مارغريتا بالكمأة", en: "Truffle Margherita" },
    description: {
      ar: "عجينة مخمرة 48 ساعة، موزاريلا طازجة، ريحان، زيت الكمأة الأسود.",
      en: "48-hour fermented dough, fresh mozzarella, basil, black truffle oil.",
    },
    price: 55,
    rating: 4.9,
    prepTimeMinutes: 22,
    isAvailable: true,
    isVegetarian: true,
    image: "https://picsum.photos/seed/silverleaf-truffle-pizza/700/560",
  },
  {
    id: "p-peri-peri-chicken",
    categoryId: "chicken",
    name: { ar: "دجاج البيري بيري", en: "Peri-Peri Half Chicken" },
    description: {
      ar: "نصف دجاجة مشوية على الفحم، متبلة بصوص البيري بيري الحار.",
      en: "Charcoal-grilled half chicken, fiery peri-peri marinade.",
    },
    price: 48,
    rating: 4.7,
    prepTimeMinutes: 25,
    isAvailable: true,
    isSpicy: true,
    image: "https://picsum.photos/seed/silverleaf-peri-chicken/700/560",
    tag: { ar: "حار", en: "Spicy" },
  },
  {
    id: "p-wagyu-skewers",
    categoryId: "grills",
    name: { ar: "أسياخ الواغيو", en: "Wagyu Skewers" },
    description: {
      ar: "قطع واغيو مشوية على الفحم مع صوص الفلفل الأخضر.",
      en: "Charcoal-grilled wagyu cubes, green peppercorn jus.",
    },
    price: 68,
    discountPrice: 59,
    rating: 4.9,
    prepTimeMinutes: 20,
    isAvailable: true,
    image: "https://picsum.photos/seed/silverleaf-wagyu-skewers/700/560",
    tag: { ar: "عرض اليوم", en: "Today's Deal" },
  },
  {
    id: "p-citrus-kale-salad",
    categoryId: "salads",
    name: { ar: "سلطة الكرنب بالحمضيات", en: "Citrus Kale Salad" },
    description: {
      ar: "كرنب مقرمش، برتقال، أفوكادو، بذور اليقطين، فينيغريت الليمون.",
      en: "Crisp kale, orange segments, avocado, pumpkin seeds, lemon vinaigrette.",
    },
    price: 32,
    rating: 4.5,
    prepTimeMinutes: 10,
    isAvailable: true,
    isVegetarian: true,
    image: "https://picsum.photos/seed/silverleaf-kale-salad/700/560",
  },
  {
    id: "p-basque-cheesecake",
    categoryId: "desserts",
    name: { ar: "تشيز كيك الباسك المحروق", en: "Burnt Basque Cheesecake" },
    description: {
      ar: "قوام كريمي وطبقة كراميل محروقة، يقدم مع صوص التوت.",
      en: "Silky center, caramelized top, served with berry compote.",
    },
    price: 26,
    rating: 4.9,
    prepTimeMinutes: 8,
    isAvailable: true,
    isVegetarian: true,
    image: "https://picsum.photos/seed/silverleaf-basque-cheesecake/700/560",
  },
];

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getPopularProducts(limit = 6): Product[] {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);
}
