import type { Category, Product, Review } from "@/types/menu";

/**
 * Real, keyword-relevant food photos (Creative Commons, via LoremFlickr) instead of
 * random unrelated placeholders. `lock` pins a specific photo per seed so the same
 * dish always shows the same image, while still varying across the gallery.
 */
function foodImages(keywords: string, count = 2, width = 900, height = 720): string[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = `${keywords}-${i}`.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return `https://loremflickr.com/${width}/${height}/${keywords}?lock=${seed}`;
  });
}


export const categories: Category[] = [
  { id: "burgers", name: { ar: "برجر", en: "Burgers" }, icon: "Beef", productCount: 2 },
  { id: "pizza", name: { ar: "بيتزا", en: "Pizza" }, icon: "Pizza", productCount: 2 },
  { id: "chicken", name: { ar: "دجاج", en: "Chicken" }, icon: "Drumstick", productCount: 2 },
  { id: "grills", name: { ar: "مشاوي", en: "Grills" }, icon: "Flame", productCount: 2 },
  { id: "salads", name: { ar: "سلطات", en: "Salads" }, icon: "Salad", productCount: 2 },
  { id: "desserts", name: { ar: "حلويات", en: "Desserts" }, icon: "IceCream", productCount: 2 },
  { id: "drinks", name: { ar: "مشروبات", en: "Drinks" }, icon: "CupSoda", productCount: 2 },
  { id: "coffee", name: { ar: "قهوة", en: "Coffee" }, icon: "Coffee", productCount: 2 },
];

const sizeSetFood = [
  { id: "sm", label: { ar: "صغير", en: "Small" }, priceDelta: -6 },
  { id: "md", label: { ar: "وسط", en: "Medium" }, priceDelta: 0 },
  { id: "lg", label: { ar: "كبير", en: "Large" }, priceDelta: 9 },
];

const sizeSetDrink = [
  { id: "sm", label: { ar: "صغير", en: "Small" }, priceDelta: -3 },
  { id: "md", label: { ar: "وسط", en: "Medium" }, priceDelta: 0 },
  { id: "lg", label: { ar: "كبير", en: "Large" }, priceDelta: 5 },
];

const extraSetFood = [
  { id: "cheese", label: { ar: "جبن إضافي", en: "Extra Cheese" }, price: 5 },
  { id: "fries", label: { ar: "بطاطس", en: "French Fries" }, price: 8 },
  { id: "sauce", label: { ar: "صوص إضافي", en: "Extra Sauce" }, price: 3 },
  { id: "drink", label: { ar: "مشروب", en: "Drink" }, price: 7 },
  { id: "meat", label: { ar: "لحم إضافي", en: "Extra Meat" }, price: 12 },
];

function makeReviews(seed: string, entries: Array<[string, number, string, string, number]>): Review[] {
  return entries.map(([author, rating, ar, en, days], i) => ({
    id: `${seed}-review-${i}`,
    author,
    rating,
    date: new Date(Date.now() - days * 86400000).toISOString(),
    comment: { ar, en },
    helpfulCount: Math.max(1, 18 - i * 4),
  }));
}

const reviewBank = {
  brisketBurger: makeReviews("brisket", [
    ["Sara A.", 5, "أفضل برجر جربته هذا العام، اللحم طري جدًا.", "Best burger I've had this year, incredibly tender.", 3],
    ["Omar K.", 5, "الصوص مميز والبصل المكرمل يعطي نكهة رائعة.", "The glaze is special, caramelized onion adds great flavor.", 9],
    ["Lina M.", 4, "لذيذ لكن الحصة كانت أصغر مما توقعت.", "Tasty but portion was smaller than I expected.", 20],
  ]),
  truffleMargherita: makeReviews("truffle", [
    ["Hind S.", 5, "عجينة رقيقة ومقرمشة، رائحة الكمأة تجنن.", "Thin crispy crust, the truffle aroma is incredible.", 5],
    ["Yousef T.", 5, "من أفضل البيتزا النباتية اللي جربتها.", "One of the best vegetarian pizzas I've tried.", 14],
  ]),
  periPeriChicken: makeReviews("peri", [
    ["Faisal N.", 4, "حار بالمقدار المناسب ومطهو بإتقان.", "Perfectly spicy and expertly grilled.", 2],
    ["Noura Z.", 5, "الدجاج طري جدًا من الداخل ومقرمش من الخارج.", "So juicy inside, crispy outside.", 11],
  ]),
  wagyuSkewers: makeReviews("wagyu", [
    ["Abdullah R.", 5, "جودة اللحم واضحة من أول قضمة.", "Meat quality is obvious from the first bite.", 1],
    ["Maha D.", 5, "يستحق السعر بدون مبالغة.", "Worth every riyal, no exaggeration.", 8],
  ]),
  kaleSalad: makeReviews("kale", [
    ["Reem A.", 4, "منعشة ومتوازنة، الفينيغريت خفيف وممتاز.", "Fresh and balanced, the vinaigrette is light and excellent.", 6],
  ]),
  basqueCheesecake: makeReviews("basque", [
    ["Khalid B.", 5, "القوام كريمي جدًا وصوص التوت يكمّله بشكل رائع.", "Silky texture, the berry compote complements it perfectly.", 4],
    ["Dana F.", 5, "حلى مثالي لمحبي التشيز كيك.", "Perfect dessert for cheesecake lovers.", 15],
  ]),
};

function avg(reviews: Review[]): number {
  if (!reviews.length) return 0;
  return Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
}

export const products: Product[] = [
  {
    id: "p-smoked-brisket-burger",
    categoryId: "burgers",
    name: { ar: "برجر البريسكت المدخّن", en: "Smoked Brisket Burger" },
    description: {
      ar: "لحم بقري مدخن ببطء، جبن غرويير، بصل مكرمل، صوص الخردل والعسل.",
      en: "Slow-smoked brisket, gruyère, caramelized onion, honey-mustard glaze.",
    },
    longDescription: {
      ar: "نُدخّن صدر البقر لمدة 12 ساعة على خشب الجوز قبل تقطيعه ووضعه على خبز البريوش المحمص مع جبن الغرويير الذائب وبصل مكرمل ببطء وصوص الخردل بالعسل المصنوع يوميًا في مطبخنا.",
      en: "We smoke the brisket for 12 hours over hickory wood before shredding it onto toasted brioche with melted gruyère, slow-caramelized onions, and a house-made honey-mustard glaze prepared fresh daily.",
    },
    price: 42,
    discountPrice: 36,
    rating: avg(reviewBank.brisketBurger),
    reviewCount: reviewBank.brisketBurger.length,
    prepTimeMinutes: 18,
    calories: 780,
    isAvailable: true,
    isPopular: true,
    hasOffer: true,
    images: foodImages("burger,brisket", 3),
    tag: { ar: "الأكثر طلبًا", en: "Best Seller" },
    ingredients: [
      { ar: "صدر بقري مدخن", en: "Smoked beef brisket" },
      { ar: "خبز البريوش", en: "Brioche bun" },
      { ar: "جبن غرويير", en: "Gruyère cheese" },
      { ar: "بصل مكرمل", en: "Caramelized onion" },
      { ar: "صوص الخردل بالعسل", en: "Honey-mustard glaze" },
    ],
    nutrition: { calories: 780, proteinGrams: 42, carbsGrams: 48, fatGrams: 46 },
    sizes: sizeSetFood,
    extras: extraSetFood,
    reviews: reviewBank.brisketBurger,
  },
  {
    id: "p-classic-smash-burger",
    categoryId: "burgers",
    name: { ar: "برجر السماش الكلاسيكي", en: "Classic Smash Burger" },
    description: {
      ar: "قرصان من اللحم المسحوق طازجًا، جبن أمريكي مزدوج، مخلل وصوص خاص.",
      en: "Double freshly-ground smashed patties, double American cheese, pickles, house sauce.",
    },
    price: 34,
    rating: 4.6,
    reviewCount: 58,
    prepTimeMinutes: 14,
    calories: 690,
    isAvailable: true,
    isPopular: true,
    images: foodImages("cheeseburger,burger", 2),
    ingredients: [
      { ar: "لحم بقري مسحوق طازج", en: "Freshly ground beef" },
      { ar: "جبن أمريكي", en: "American cheese" },
      { ar: "مخلل", en: "Pickles" },
      { ar: "صوص البيت", en: "House sauce" },
    ],
    nutrition: { calories: 690, proteinGrams: 38, carbsGrams: 40, fatGrams: 38 },
    sizes: sizeSetFood,
    extras: extraSetFood,
    reviews: [],
  },
  {
    id: "p-truffle-margherita",
    categoryId: "pizza",
    name: { ar: "مارغريتا بالكمأة", en: "Truffle Margherita" },
    description: {
      ar: "عجينة مخمرة 48 ساعة، موزاريلا طازجة، ريحان، زيت الكمأة الأسود.",
      en: "48-hour fermented dough, fresh mozzarella, basil, black truffle oil.",
    },
    longDescription: {
      ar: "عجينتنا تُخمّر لمدة 48 ساعة لتحقيق قوام هوائي ومقرمش، تُغطى بموزاريلا طازجة وريحان مقطوف يوميًا، وتُرش بزيت الكمأة الأسود قبل التقديم مباشرة.",
      en: "Our dough ferments for 48 hours for an airy, crisp crumb, topped with fresh mozzarella and daily-picked basil, finished with black truffle oil right before serving.",
    },
    price: 55,
    rating: avg(reviewBank.truffleMargherita),
    reviewCount: reviewBank.truffleMargherita.length,
    prepTimeMinutes: 22,
    calories: 640,
    isAvailable: true,
    isVegetarian: true,
    isPopular: true,
    images: foodImages("pizza,margherita", 3),
    ingredients: [
      { ar: "عجينة مخمرة 48 ساعة", en: "48-hour fermented dough" },
      { ar: "موزاريلا طازجة", en: "Fresh mozzarella" },
      { ar: "ريحان", en: "Basil" },
      { ar: "زيت الكمأة الأسود", en: "Black truffle oil" },
    ],
    nutrition: { calories: 640, proteinGrams: 26, carbsGrams: 78, fatGrams: 24 },
    sizes: sizeSetFood,
    extras: extraSetFood.filter((e) => e.id !== "meat"),
    reviews: reviewBank.truffleMargherita,
  },
  {
    id: "p-quattro-formaggi",
    categoryId: "pizza",
    name: { ar: "بيتزا الأجبان الأربعة", en: "Quattro Formaggi" },
    description: {
      ar: "موزاريلا، غورغونزولا، بارميزان، وفونتينا على قاعدة كريمية.",
      en: "Mozzarella, gorgonzola, parmesan, and fontina on a creamy base.",
    },
    price: 52,
    discountPrice: 47,
    rating: 4.7,
    reviewCount: 33,
    prepTimeMinutes: 20,
    calories: 710,
    isAvailable: true,
    hasOffer: true,
    isVegetarian: true,
    images: foodImages("pizza,cheese", 2),
    ingredients: [
      { ar: "موزاريلا", en: "Mozzarella" },
      { ar: "غورغونزولا", en: "Gorgonzola" },
      { ar: "بارميزان", en: "Parmesan" },
      { ar: "فونتينا", en: "Fontina" },
    ],
    nutrition: { calories: 710, proteinGrams: 30, carbsGrams: 70, fatGrams: 32 },
    sizes: sizeSetFood,
    extras: extraSetFood.filter((e) => e.id !== "meat"),
    reviews: [],
  },
  {
    id: "p-peri-peri-chicken",
    categoryId: "chicken",
    name: { ar: "دجاج البيري بيري", en: "Peri-Peri Half Chicken" },
    description: {
      ar: "نصف دجاجة مشوية على الفحم، متبلة بصوص البيري بيري الحار.",
      en: "Charcoal-grilled half chicken, fiery peri-peri marinade.",
    },
    longDescription: {
      ar: "تُنقع الدجاجة لمدة 24 ساعة في تتبيلة البيري بيري المصنوعة من الفلفل الحار الأفريقي، ثم تُشوى ببطء على الفحم لتحافظ على عصارتها من الداخل ومقرمشة من الخارج.",
      en: "The chicken is marinated for 24 hours in an African-bird's-eye-chili peri-peri blend, then slow-grilled over charcoal for a juicy interior and crisp skin.",
    },
    price: 48,
    rating: avg(reviewBank.periPeriChicken),
    reviewCount: reviewBank.periPeriChicken.length,
    prepTimeMinutes: 25,
    calories: 590,
    isAvailable: true,
    isSpicy: true,
    isPopular: true,
    images: foodImages("grilled,chicken", 2),
    tag: { ar: "حار", en: "Spicy" },
    ingredients: [
      { ar: "نصف دجاجة", en: "Half chicken" },
      { ar: "تتبيلة البيري بيري", en: "Peri-peri marinade" },
      { ar: "ليمون", en: "Lemon" },
    ],
    nutrition: { calories: 590, proteinGrams: 52, carbsGrams: 10, fatGrams: 32 },
    sizes: undefined,
    extras: extraSetFood.filter((e) => e.id !== "meat"),
    reviews: reviewBank.periPeriChicken,
  },
  {
    id: "p-crispy-chicken-tenders",
    categoryId: "chicken",
    name: { ar: "أصابع الدجاج المقرمشة", en: "Crispy Chicken Tenders" },
    description: {
      ar: "أصابع دجاج مقرمشة تُقدم مع صوص العسل والخردل.",
      en: "Crispy breaded tenders served with honey-mustard dip.",
    },
    price: 30,
    rating: 4.4,
    reviewCount: 41,
    prepTimeMinutes: 15,
    calories: 520,
    isAvailable: false,
    images: foodImages("chicken,tenders", 2),
    ingredients: [
      { ar: "صدر دجاج", en: "Chicken breast" },
      { ar: "بقسماط مقرمش", en: "Crispy breadcrumb" },
      { ar: "صوص العسل والخردل", en: "Honey-mustard dip" },
    ],
    nutrition: { calories: 520, proteinGrams: 34, carbsGrams: 38, fatGrams: 24 },
    extras: extraSetFood.filter((e) => e.id === "sauce" || e.id === "drink"),
    reviews: [],
  },
  {
    id: "p-wagyu-skewers",
    categoryId: "grills",
    name: { ar: "أسياخ الواغيو", en: "Wagyu Skewers" },
    description: {
      ar: "قطع واغيو مشوية على الفحم مع صوص الفلفل الأخضر.",
      en: "Charcoal-grilled wagyu cubes, green peppercorn jus.",
    },
    longDescription: {
      ar: "مكعبات واغيو درجة A5 تُشوى على الفحم لثوانٍ معدودة لتحافظ على طراوتها، تُقدم مع صوص الفلفل الأخضر وخبز الثوم.",
      en: "A5-grade wagyu cubes seared briefly over charcoal to stay tender, served with green peppercorn jus and garlic bread.",
    },
    price: 68,
    discountPrice: 59,
    rating: avg(reviewBank.wagyuSkewers),
    reviewCount: reviewBank.wagyuSkewers.length,
    prepTimeMinutes: 20,
    calories: 610,
    isAvailable: true,
    hasOffer: true,
    isPopular: true,
    images: foodImages("skewers,beef", 3),
    tag: { ar: "عرض اليوم", en: "Today's Deal" },
    ingredients: [
      { ar: "لحم واغيو A5", en: "A5 wagyu beef" },
      { ar: "صوص الفلفل الأخضر", en: "Green peppercorn jus" },
      { ar: "خبز الثوم", en: "Garlic bread" },
    ],
    nutrition: { calories: 610, proteinGrams: 48, carbsGrams: 14, fatGrams: 40 },
    extras: extraSetFood.filter((e) => e.id !== "meat"),
    reviews: reviewBank.wagyuSkewers,
  },
  {
    id: "p-mixed-grill-platter",
    categoryId: "grills",
    name: { ar: "طبق المشاوي المشكلة", en: "Mixed Grill Platter" },
    description: {
      ar: "تشكيلة من الكباب والشيش طاووق والكفتة مع الأرز والخضار المشوية.",
      en: "A mix of kebab, shish tawook, and kofta with rice and grilled vegetables.",
    },
    price: 62,
    rating: 4.8,
    reviewCount: 29,
    prepTimeMinutes: 28,
    calories: 890,
    isAvailable: true,
    isPopular: true,
    images: foodImages("kebab,grill", 2),
    ingredients: [
      { ar: "كباب لحم", en: "Beef kebab" },
      { ar: "شيش طاووق", en: "Shish tawook" },
      { ar: "كفتة", en: "Kofta" },
      { ar: "أرز بسمتي", en: "Basmati rice" },
    ],
    nutrition: { calories: 890, proteinGrams: 60, carbsGrams: 62, fatGrams: 42 },
    reviews: [],
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
    rating: avg(reviewBank.kaleSalad),
    reviewCount: reviewBank.kaleSalad.length,
    prepTimeMinutes: 10,
    calories: 340,
    isAvailable: true,
    isVegetarian: true,
    images: foodImages("salad,kale", 2),
    ingredients: [
      { ar: "كرنب", en: "Kale" },
      { ar: "برتقال", en: "Orange segments" },
      { ar: "أفوكادو", en: "Avocado" },
      { ar: "بذور اليقطين", en: "Pumpkin seeds" },
    ],
    nutrition: { calories: 340, proteinGrams: 8, carbsGrams: 30, fatGrams: 20 },
    extras: extraSetFood.filter((e) => e.id === "sauce"),
    reviews: reviewBank.kaleSalad,
  },
  {
    id: "p-grilled-halloumi-salad",
    categoryId: "salads",
    name: { ar: "سلطة الحلوم المشوي", en: "Grilled Halloumi Salad" },
    description: {
      ar: "جبن حلوم مشوي، طماطم كرزية، نعناع، فينيغريت الرمان.",
      en: "Grilled halloumi, cherry tomatoes, mint, pomegranate vinaigrette.",
    },
    price: 34,
    rating: 4.5,
    reviewCount: 22,
    prepTimeMinutes: 12,
    calories: 410,
    isAvailable: true,
    isVegetarian: true,
    images: foodImages("halloumi,salad", 2),
    ingredients: [
      { ar: "جبن حلوم", en: "Halloumi cheese" },
      { ar: "طماطم كرزية", en: "Cherry tomatoes" },
      { ar: "نعناع", en: "Mint" },
      { ar: "فينيغريت الرمان", en: "Pomegranate vinaigrette" },
    ],
    nutrition: { calories: 410, proteinGrams: 18, carbsGrams: 22, fatGrams: 26 },
    reviews: [],
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
    rating: avg(reviewBank.basqueCheesecake),
    reviewCount: reviewBank.basqueCheesecake.length,
    prepTimeMinutes: 8,
    calories: 430,
    isAvailable: true,
    isVegetarian: true,
    isPopular: true,
    images: foodImages("cheesecake,dessert", 2),
    ingredients: [
      { ar: "جبن كريمي", en: "Cream cheese" },
      { ar: "كراميل محروق", en: "Burnt caramel" },
      { ar: "صوص التوت", en: "Berry compote" },
    ],
    nutrition: { calories: 430, proteinGrams: 9, carbsGrams: 34, fatGrams: 28 },
    reviews: reviewBank.basqueCheesecake,
  },
  {
    id: "p-pistachio-baklava",
    categoryId: "desserts",
    name: { ar: "بقلاوة الفستق", en: "Pistachio Baklava" },
    description: {
      ar: "طبقات عجين رقيقة، فستق مطحون، شربات القطر بماء الورد.",
      en: "Thin pastry layers, crushed pistachio, rose-water syrup.",
    },
    price: 22,
    rating: 4.9,
    reviewCount: 47,
    prepTimeMinutes: 5,
    calories: 380,
    isAvailable: true,
    isVegetarian: true,
    images: foodImages("baklava,pistachio", 2),
    ingredients: [
      { ar: "عجين فيلو", en: "Filo pastry" },
      { ar: "فستق مطحون", en: "Crushed pistachio" },
      { ar: "شربات ماء الورد", en: "Rose-water syrup" },
    ],
    nutrition: { calories: 380, proteinGrams: 6, carbsGrams: 42, fatGrams: 20 },
    reviews: [],
  },
  {
    id: "p-fresh-mint-lemonade",
    categoryId: "drinks",
    name: { ar: "ليمون بالنعناع", en: "Fresh Mint Lemonade" },
    description: {
      ar: "عصير ليمون طازج مع أوراق النعناع المهروسة.",
      en: "Fresh-squeezed lemonade with muddled mint leaves.",
    },
    price: 16,
    rating: 4.6,
    reviewCount: 38,
    prepTimeMinutes: 4,
    calories: 120,
    isAvailable: true,
    isVegetarian: true,
    isPopular: true,
    images: foodImages("lemonade,mint", 2),
    ingredients: [
      { ar: "ليمون طازج", en: "Fresh lemon" },
      { ar: "نعناع", en: "Mint" },
      { ar: "شراب السكر", en: "Simple syrup" },
    ],
    nutrition: { calories: 120, proteinGrams: 0, carbsGrams: 30, fatGrams: 0 },
    sizes: sizeSetDrink,
    reviews: [],
  },
  {
    id: "p-mango-passionfruit",
    categoryId: "drinks",
    name: { ar: "مانجو باشن فروت", en: "Mango Passionfruit Cooler" },
    description: {
      ar: "مزيج المانجو الطازج مع باشن فروت وثلج مجروش.",
      en: "Fresh mango blended with passionfruit over crushed ice.",
    },
    price: 19,
    discountPrice: 15,
    rating: 4.7,
    reviewCount: 26,
    prepTimeMinutes: 5,
    calories: 160,
    isAvailable: true,
    hasOffer: true,
    images: foodImages("mango,smoothie", 2),
    ingredients: [
      { ar: "مانجو", en: "Mango" },
      { ar: "باشن فروت", en: "Passionfruit" },
      { ar: "ثلج مجروش", en: "Crushed ice" },
    ],
    nutrition: { calories: 160, proteinGrams: 1, carbsGrams: 38, fatGrams: 0 },
    sizes: sizeSetDrink,
    reviews: [],
  },
  {
    id: "p-spanish-latte",
    categoryId: "coffee",
    name: { ar: "لاتيه إسباني", en: "Spanish Latte" },
    description: {
      ar: "إسبريسو مضاعف مع حليب مكثف محلى وحليب مبخر.",
      en: "Double espresso with sweetened condensed milk and steamed milk.",
    },
    price: 20,
    rating: 4.8,
    reviewCount: 51,
    prepTimeMinutes: 6,
    calories: 210,
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    images: foodImages("latte,coffee", 2),
    ingredients: [
      { ar: "إسبريسو", en: "Espresso" },
      { ar: "حليب مكثف محلى", en: "Condensed milk" },
      { ar: "حليب مبخر", en: "Steamed milk" },
    ],
    nutrition: { calories: 210, proteinGrams: 6, carbsGrams: 26, fatGrams: 8 },
    sizes: sizeSetDrink,
    reviews: [],
  },
  {
    id: "p-pour-over",
    categoryId: "coffee",
    name: { ar: "قهوة مقطّرة يدويًا", en: "Hand Pour-Over" },
    description: {
      ar: "حبوب مختصة محمصة محليًا، تُحضّر يدويًا لكل طلب.",
      en: "Locally roasted specialty beans, brewed by hand for each order.",
    },
    price: 24,
    rating: 4.9,
    reviewCount: 19,
    prepTimeMinutes: 7,
    calories: 5,
    isAvailable: true,
    isVegetarian: true,
    images: foodImages("coffee,pourover", 2),
    ingredients: [
      { ar: "حبوب قهوة مختصة", en: "Specialty coffee beans" },
      { ar: "ماء مفلتر", en: "Filtered water" },
    ],
    nutrition: { calories: 5, proteinGrams: 0, carbsGrams: 1, fatGrams: 0 },
    reviews: [],
  },
];

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getPopularProducts(limit = 6): Product[] {
  return [...products].filter((p) => p.isPopular).slice(0, limit);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.ar.includes(q) ||
      p.name.en.toLowerCase().includes(q) ||
      p.description.en.toLowerCase().includes(q) ||
      p.description.ar.includes(q)
  );
}

export function getRecommendedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id);
  const others = products.filter((p) => p.categoryId !== product.categoryId && p.id !== product.id);
  return [...sameCategory, ...others].slice(0, limit);
}
