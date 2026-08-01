import React from 'react';
import { motion } from 'framer-motion';
import './SaudiCategories.css';

interface Category {
  id: string;
  name: string;
  icon: string;
  badge?: string;
}

const categories: Category[] = [
  { id: 'all', name: 'الكل', icon: '🍽️' },
  { id: 'saudi', name: 'الأطباق السعودية', icon: '🇸🇦', badge: 'المملكة' },
  { id: 'kabsa', name: 'الكبسات', icon: '🍚' },
  { id: 'grill', name: 'المشويات', icon: '🍖' },
  { id: 'mandi', name: 'المندي', icon: '🍗' },
  { id: 'madghout', name: 'المضغوط', icon: '🥘' },
  { id: 'bukhari', name: 'البخاري', icon: '🍛' },
  { id: 'jareesh', name: 'الجريش', icon: '🥣' },
  { id: 'pastries', name: 'المعجنات', icon: '🍞' },
  { id: 'coffee', name: 'القهوة السعودية', icon: '☕' },
  { id: 'tea', name: 'الشاي', icon: '🍵' },
  { id: 'juices', name: 'العصائر', icon: '🥤' },
  { id: 'desserts', name: 'الحلويات الشرقية', icon: '🍰' },
  { id: 'dates', name: 'التمور', icon: '🌴' },
  { id: 'beverages', name: 'المشروبات', icon: '🧃' }
];

interface SaudiCategoriesProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const SaudiCategories: React.FC<SaudiCategoriesProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="saudi-categories">
      <div className="categories-header">
        <h2 className="categories-title">
          <span className="title-icon">🌙</span>
          قائمة الطعام
          <span className="title-sub">أشهى الأطباق السعودية والعالمية</span>
        </h2>
      </div>
      
      <div className="categories-scroll">
        <div className="categories-wrapper">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              {category.badge && (
                <span className="category-badge">{category.badge}</span>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
