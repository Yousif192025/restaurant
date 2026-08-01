import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { ComingSoonPage } from "@/pages/ComingSoonPage";

// استيراد الصفحات الجديدة (سننشئها لاحقاً)
// import { MenuPage } from "@/pages/MenuPage";
// import { CartPage } from "@/pages/CartPage";
// import { CheckoutPage } from "@/pages/CheckoutPage";
// import { OffersPage } from "@/pages/OffersPage";
// import { AboutPage } from "@/pages/AboutPage";
// import { ContactPage } from "@/pages/ContactPage";
// import { ReservationPage } from "@/pages/ReservationPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* الصفحة الرئيسية */}
      <Route path="/" element={<HomePage />} />
      
      {/* قائمة الطعام */}
      <Route path="/menu" element={<ComingSoonPage />} />
      <Route path="/menu/category/:categoryId" element={<ComingSoonPage />} />
      
      {/* تفاصيل المنتج */}
      <Route path="/product/:id" element={<ComingSoonPage />} />
      
      {/* سلة المشتريات */}
      <Route path="/cart" element={<ComingSoonPage />} />
      
      {/* الدفع */}
      <Route path="/checkout" element={<ComingSoonPage />} />
      
      {/* الطلبات */}
      <Route path="/orders" element={<ComingSoonPage />} />
      <Route path="/orders/:id" element={<ComingSoonPage />} />
      
      {/* الحجز */}
      <Route path="/table" element={<ComingSoonPage />} />
      <Route path="/reservation" element={<ComingSoonPage />} />
      
      {/* العروض */}
      <Route path="/offers" element={<ComingSoonPage />} />
      
      {/* عن المطعم */}
      <Route path="/about" element={<ComingSoonPage />} />
      
      {/* اتصل بنا */}
      <Route path="/contact" element={<ComingSoonPage />} />
      
      {/* سياسة الخصوصية */}
      <Route path="/privacy" element={<ComingSoonPage />} />
      
      {/* شروط الاستخدام */}
      <Route path="/terms" element={<ComingSoonPage />} />
      
      {/* أي مسار غير موجود */}
      <Route path="*" element={<ComingSoonPage />} />
    </Routes>
  );
}
