import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { ComingSoonPage } from "@/pages/ComingSoonPage";
import { PageLoadingFallback } from "@/components/ui/PageLoadingFallback";

const MenuPage = lazy(() => import("@/pages/MenuPage").then((m) => ({ default: m.MenuPage })));
const ProductDetailsPage = lazy(() =>
  import("@/pages/ProductDetailsPage").then((m) => ({ default: m.ProductDetailsPage }))
);
const CartPage = lazy(() => import("@/pages/CartPage").then((m) => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage").then((m) => ({ default: m.CheckoutPage })));
const OrderConfirmationPage = lazy(() =>
  import("@/pages/OrderConfirmationPage").then((m) => ({ default: m.OrderConfirmationPage }))
);
const OrderHistoryPage = lazy(() =>
  import("@/pages/OrderHistoryPage").then((m) => ({ default: m.OrderHistoryPage }))
);

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/orders/:id" element={<OrderConfirmationPage />} />
        {/* Scaffolded for a future milestone: table reservations */}
        <Route path="/table" element={<ComingSoonPage />} />
        <Route path="*" element={<ComingSoonPage />} />
      </Routes>
    </Suspense>
  );
}
