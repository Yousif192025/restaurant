import React from 'react';
import { motion } from 'framer-motion';
import './SaudiOffers.css';

interface Offer {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  badge?: string;
}

const offers: Offer[] = [
  {
    id: 'family-meal',
    title: 'وجبة عائلية',
    description: 'توصيل مجاني للطلبات فوق ١٠٠ ر.س',
    icon: '👨‍👩‍👧‍👦',
    color: '#1a472a',
    badge: 'عرض خاص'
  },
  {
    id: 'weekend-offer',
    title: 'عرض نهاية الأسبوع',
    description: 'خصم ٢٠٪ على جميع الأطباق السعودية',
    icon: '🎉',
    color: '#c9a84c',
    badge: 'لفترة محدودة'
  },
  {
    id: 'business-lunch',
    title: 'غداء العمل',
    description: 'وجبات خاصة بأسعار مخفضة من ١١ص - ٣م',
    icon: '💼',
    color: '#b87333',
    badge: 'عرض يومي'
  },
  {
    id: 'ramadan-offer',
    title: 'إفطار صائم',
    description: 'عروض رمضانية مميزة مع وجبات الإفطار',
    icon: '🌙',
    color: '#2d6a4f',
    badge: 'رمضان كريم'
  }
];

export const SaudiOffers: React.FC = () => {
  return (
    <div className="saudi-offers">
      <h2 className="offers-title">
        <span className="title-icon">🎁</span>
        عروض خاصة
      </h2>
      
      <div className="offers-grid">
        {offers.map((offer) => (
          <motion.div
            key={offer.id}
            className="offer-card"
            style={{ backgroundColor: offer.color }}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="offer-content">
              <span className="offer-icon">{offer.icon}</span>
              <h3 className="offer-title">{offer.title}</h3>
              <p className="offer-description">{offer.description}</p>
              {offer.badge && (
                <span className="offer-badge">{offer.badge}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
