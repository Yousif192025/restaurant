import React from 'react';
import { SaudiSEO } from '@/components/SEO/SaudiSEO';
import { Hero } from '@/components/Hero/Hero';
import { SaudiCategories } from '@/components/Menu/SaudiCategories';
import { SaudiOffers } from '@/components/Offers/SaudiOffers';
import { motion } from 'framer-motion';
import { saudiDishes } from '@/data/saudiMenu';
import { SaudiProductCard } from '@/components/Product/SaudiProductCard';

export const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [cart, setCart] = React.useState<string[]>([]);

  const handleAddToCart = (productId: string) => {
    setCart([...cart, productId]);
    // يمكنك إضافة منطق السلة هنا
    console.log('تم إضافة المنتج إلى السلة:', productId);
  };

  // دمج الأطباق السعودية والعالمية
  const allDishes = [
    ...saudiDishes.mainDishes,
    ...saudiDishes.appetizers,
    ...saudiDishes.desserts,
    ...saudiDishes.beverages,
    ...saudiDishes.breakfast,
    ...saudiDishes.breads
  ];

  // تصفية الأطباق حسب الفئة
  const filteredDishes = activeCategory === 'all' 
    ? allDishes 
    : allDishes.filter(dish => dish.category === activeCategory);

  return (
    <>
      <SaudiSEO />
      
      <main className="home-page">
        {/* الهيرو */}
        <Hero />
        
        {/* العروض الخاصة */}
        <section className="offers-section">
          <div className="container">
            <SaudiOffers />
          </div>
        </section>
        
        {/* قائمة الطعام */}
        <section className="menu-section">
          <div className="container">
            <SaudiCategories 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            
            <motion.div 
              className="products-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredDishes.length > 0 ? (
                filteredDishes.map((dish, index) => (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <SaudiProductCard
                      id={dish.id}
                      name={dish.name}
                      nameEn={dish.nameEn}
                      description={dish.description}
                      price={dish.price}
                      badge={dish.badge}
                      spicyLevel={dish.spicyLevel}
                      isPopular={dish.isPopular}
                      isSignature={dish.isSignature}
                      onAddToCart={handleAddToCart}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="no-products">
                  <p>🚫 لا توجد أطباق في هذه الفئة حالياً</p>
                </div>
              )}
            </motion.div>
          </div>
        </section>
        
        {/* مميزات المطعم */}
        <section className="features-section">
          <div className="container">
            <div className="features-grid">
              <div className="feature-card">
                <span className="feature-icon">🇸🇦</span>
                <h3>أطباق سعودية أصيلة</h3>
                <p>نقدم أشهى المأكولات السعودية التقليدية</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🚀</span>
                <h3>توصيل سريع</h3>
                <p>توصيل خلال ٣٠ دقيقة إلى جميع أنحاء الرياض</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">⭐</span>
                <h3>جودة عالية</h3>
                <p>أفضل المكونات الطازجة وأعلى معايير الجودة</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🌙</span>
                <h3>أجواء عربية</h3>
                <p>تجربة طعام فريدة في أجواء سعودية أصيلة</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
