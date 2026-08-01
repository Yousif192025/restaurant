export const copy = {
  ar: {
    nav: { 
      menu: "القائمة", 
      table: "حجز طاولة", 
      orders: "طلباتي", 
      about: "من نحن" 
    },
    hero: {
      eyebrow: "مطعمي — نكهات سعودية أصيلة",  // تم التحديث
      title: "نكهات سعودية أصيلة تصل إليك في دقائق",
      subtitle: "أطباق سعودية وعالمية شهية، محضرة بأجود المكونات الطازجة يومياً.",
      ctaPrimary: "اطلب الآن",
      ctaSecondary: "تصفح القائمة",
      stat1Label: "تقييم العملاء",
      stat2Label: "متوسط وقت التوصيل",
    },
    promo: {
      title: "عروض اليوم",
      subtitle: "خصومات لفترة محدودة على أطباق مختارة",
    },
    categories: { 
      title: "تصفح حسب الصنف" 
    },
    popular: {
      title: "الأكثر طلبًا",
      subtitle: "الأطباق التي يعود إليها عملاؤنا مرارًا",
      addToCart: "أضف للسلة",
    },
    footer: {
      tagline: "نكهات سعودية أصيلة — توصيل سريع وطازج.",  // تم التحديث
      rights: "جميع الحقوق محفوظة",  // تم التحديث (أزلنا Silver Leaf)
    },
  },
  en: {
    nav: { 
      menu: "Menu", 
      table: "Book a Table", 
      orders: "My Orders", 
      about: "About" 
    },
    hero: {
      eyebrow: "Mata'ami — Authentic Saudi Flavors",  // تم التحديث
      title: "Authentic Saudi flavors, delivered in minutes",
      subtitle: "Delicious Saudi and international dishes, freshly prepared daily.",
      ctaPrimary: "Order Now",
      ctaSecondary: "View Menu",
      stat1Label: "Customer Rating",
      stat2Label: "Avg. Delivery Time",
    },
    promo: {
      title: "Today's Offers",
      subtitle: "Limited-time discounts on selected dishes",
    },
    categories: { 
      title: "Browse by Category" 
    },
    popular: {
      title: "Popular Right Now",
      subtitle: "The dishes our regulars keep coming back for",
      addToCart: "Add to Cart",
    },
    footer: {
      tagline: "Authentic Saudi flavors — fast and fresh delivery.",  // تم التحديث
      rights: "All rights reserved",  // تم التحديث (أزلنا Silver Leaf)
    },
  },
} as const;

export type Locale = keyof typeof copy;
