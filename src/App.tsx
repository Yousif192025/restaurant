import React, { useState } from 'react';
import { SaudiThemeProvider } from './components/SaudiThemeProvider';
import { LocalizationProvider } from './context/LocalizationContext';
import { Hero } from './components/Hero/Hero';
import { SaudiCategories } from './components/Menu/SaudiCategories';
import { SaudiProductCard } from './components/Product/SaudiProductCard';
import { saudiDishes } from './data/saudiMenu';
import './styles/saudi-theme.css';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<string[]>([]);

  const handleAddToCart = (productId: string) => {
    setCart([...cart, productId]);
    // Add your cart logic here
  };

  // Combine Saudi dishes with your existing international dishes
  const allDishes = [...saudiDishes.mainDishes, ...saudiDishes.appetizers, ...saudiDishes.desserts];

  return (
    <LocalizationProvider>
      <SaudiThemeProvider>
        <div className="app">
          <Hero />
          
          <div className="container">
            <SaudiCategories 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            
            <div className="products-grid">
              {allDishes.map((dish) => (
                <SaudiProductCard
                  key={dish.id}
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
              ))}
            </div>
          </div>
        </div>
      </SaudiThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
