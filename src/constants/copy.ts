export const copy = {
  ar: {
    nav: { menu: "القائمة", table: "حجز طاولة", orders: "طلباتي", about: "من نحن" },
    hero: {
      eyebrow: "سيلفر ليف — مطبخ موسمي",
      title: "نكهات تُطهى على مهل، تصل إليك في دقائق",
      subtitle:
        "من فرن الحطب إلى بابك؛ أطباق مطهوة بعناية بمكونات محلية طازجة كل يوم.",
      ctaPrimary: "اطلب الآن",
      ctaSecondary: "تصفح القائمة",
      stat1Label: "تقييم العملاء",
      stat2Label: "متوسط وقت التوصيل",
    },
    promo: {
      title: "عروض اليوم",
      subtitle: "خصومات لفترة محدودة على أطباق مختارة",
    },
    categories: { title: "تصفح حسب الصنف" },
    popular: {
      title: "الأكثر طلبًا",
      subtitle: "الأطباق التي يعود إليها عملاؤنا مرارًا",
      addToCart: "أضف للسلة",
    },
    footer: {
      tagline: "طهي هادئ، بلا استعجال — إلا في التوصيل.",
      rights: "جميع الحقوق محفوظة",
    },
  },
  en: {
    nav: { menu: "Menu", table: "Book a Table", orders: "My Orders", about: "About" },
    hero: {
      eyebrow: "Silver Leaf — Seasonal Kitchen",
      title: "Slow-cooked flavor, delivered in minutes",
      subtitle:
        "From the wood-fired oven to your door — dishes crafted daily with fresh, local ingredients.",
      ctaPrimary: "Order Now",
      ctaSecondary: "View Menu",
      stat1Label: "Customer Rating",
      stat2Label: "Avg. Delivery Time",
    },
    promo: {
      title: "Today's Offers",
      subtitle: "Limited-time discounts on selected dishes",
    },
    categories: { title: "Browse by Category" },
    popular: {
      title: "Popular Right Now",
      subtitle: "The dishes our regulars keep coming back for",
      addToCart: "Add to Cart",
    },
    footer: {
      tagline: "Unhurried cooking — delivered without the wait.",
      rights: "All rights reserved",
    },
  },
} as const;

export type Locale = keyof typeof copy;
