import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { ComingSoonPage } from "@/pages/ComingSoonPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Scaffolded for upcoming milestones: menu/cart/checkout/orders */}
      <Route path="/product/:id" element={<ComingSoonPage />} />
      <Route path="/cart" element={<ComingSoonPage />} />
      <Route path="/checkout" element={<ComingSoonPage />} />
      <Route path="/orders/:id" element={<ComingSoonPage />} />
      <Route path="/table" element={<ComingSoonPage />} />
      <Route path="*" element={<ComingSoonPage />} />
    </Routes>
  );
}
