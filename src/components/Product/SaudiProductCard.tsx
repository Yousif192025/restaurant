import React from 'react';
import { motion } from 'framer-motion';
import { useSaudiTheme } from '../SaudiThemeProvider';
import './SaudiProductCard.css';

interface SaudiProductCardProps {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  image?: string;
  badge?: string;
  spicyLevel?: number;
  isPopular?: boolean;
  isSignature?: boolean;
  onAddToCart: (id: string) => void;
}

export const SaudiProductCard: React.FC<SaudiProductCardProps> = ({
  id,
  name,
  nameEn,
  description,
  price,
  image,
  badge,
  spicyLevel = 0,
  isPopular = false,
  isSignature = false,
  onAddToCart
}) => {
  const theme = useSaudiTheme();

  const renderSpicyLevel = () => {
    if (spicyLevel === 0) return null;
    const peppers = '🌶️'.repeat(Math.min(spicyLevel, 3));
    return <span className="spicy-indicator">{peppers}</span>;
  };

  return (
    <motion.div 
      className="saudi-product-card"
      style={{ 
        backgroundColor: theme.colors.offWhite,
        boxShadow: theme.shadows.card 
      }}
      whileHover={{ 
        y: -8,
        boxShadow: theme.shadows.hover 
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {image && (
        <div className="product-image-wrapper">
          <img src={image} alt={name} className="product-image" />
          {badge && (
            <span className="product-badge" style={{ backgroundColor: theme.colors.warmGold }}>
              {badge}
            </span>
          )}
          {isPopular && (
            <span className="popular-badge" style={{ backgroundColor: theme.colors.copper }}>
              🔥 الأكثر طلباً
            </span>
          )}
          {isSignature && (
            <span className="signature-badge" style={{ backgroundColor: theme.colors.deepGreen }}>
              ⭐ طبق مميز
            </span>
          )}
        </div>
      )}
      
      <div className="product-content">
        <div className="product-header">
          <h3 className="product-name">{name}</h3>
          <span className="product-name-en">{nameEn}</span>
          {renderSpicyLevel()}
        </div>
        
        <p className="product-description">{description}</p>
        
        <div className="product-footer">
          <div className="product-price">
            <span className="price-amount">{price}</span>
            <span className="price-currency">ر.س</span>
          </div>
          
          <button 
            className="add-to-cart-btn"
            style={{ backgroundColor: theme.colors.deepGreen }}
            onClick={() => onAddToCart(id)}
          >
            <span className="add-icon">+</span>
            <span>أضف للطلب</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
