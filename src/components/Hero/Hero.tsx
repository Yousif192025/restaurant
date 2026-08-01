import React from 'react';
import { motion } from 'framer-motion';
import { useSaudiTheme } from '../SaudiThemeProvider';
import './Hero.css';

export const Hero: React.FC = () => {
  const theme = useSaudiTheme();

  return (
    <section className="hero-section" style={{ backgroundColor: theme.colors.deepGreen }}>
      <div className="hero-background">
        <div className="hero-pattern"></div>
        <div className="hero-palm-leaves"></div>
      </div>
      
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <div className="hero-badge">
            <span className="arabic-coffee-icon">☕</span>
            <span>أهلاً وسهلاً بكم</span>
          </div>
          
          <h1 className="hero-title">
            نكهات سعودية أصيلة
            <span className="hero-subtitle">و أشهى الأطباق العالمية</span>
          </h1>
          
          <p className="hero-description">
            اكتشف أشهى الأطباق السعودية والعالمية في أجواء عربية أصيلة
          </p>
          
          <div className="hero-actions">
            <button className="primary-btn">
              ابدأ الطلب الآن
            </button>
            <button className="secondary-btn">
              احجز طاولتك
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">+٥٠</span>
              <span className="stat-label">طبق سعودي</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">٤.٨</span>
              <span className="stat-label">تقييم العملاء</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">٣٠</span>
              <span className="stat-label">دقيقة توصيل</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-image"
        >
          <img 
            src="/images/saudi-food-hero.jpg" 
            alt="أطباق سعودية" 
            className="hero-food-image"
          />
          <div className="hero-image-overlay">
            <div className="arabic-pattern"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
