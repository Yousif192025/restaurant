import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* قسم المطعم */}
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="title-icon">🍽️</span>
              مطعمي
            </h3>
            <p className="footer-description">
              نكهات سعودية أصيلة وأشهى الأطباق العالمية في أجواء عربية أصيلة
            </p>
          </div>

          {/* روابط سريعة */}
          <div className="footer-section">
            <h4 className="footer-heading">روابط سريعة</h4>
            <ul className="footer-links">
              <li><Link to="/menu">القائمة</Link></li>
              <li><Link to="/offers">العروض الخاصة</Link></li>
              <li><Link to="/reservation">احجز طاولتك</Link></li>
              <li><Link to="/delivery">التوصيل</Link></li>
            </ul>
          </div>

          {/* معلومات الاتصال */}
          <div className="footer-section">
            <h4 className="footer-heading">اتصل بنا</h4>
            <ul className="footer-contact">
              <li>📍 الرياض، المملكة العربية السعودية</li>
              <li>📞 +966 12 345 6789</li>
              <li>✉️ info@mataami.com</li>
              <li>🕐 ٦ص - ١١م</li>
            </ul>
          </div>
        </div>

        {/* حقوق النشر - تم التحديث هنا */}
        <div className="footer-bottom">
          <p>© {currentYear} مطعمي — جميع الحقوق محفوظة</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">سياسة الخصوصية</Link>
            <Link to="/terms">شروط الاستخدام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
