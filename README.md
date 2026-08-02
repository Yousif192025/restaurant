# مطعمي — Modern Restaurant Ordering Platform (Frontend Rebuild)

This is the new React frontend for the **restaurant-web-app** (مطعمي) rebuild.
It's built to run **alongside the existing Flask backend** rather than replace it —
Flask keeps handling auth, table reservations, and orders, while this app takes over
the customer-facing UI and talks to Flask over a JSON API as those endpoints come online.

## Status: Milestone 1 — Architecture Foundation + Homepage

What's included in this milestone:

- Vite + React 19 + TypeScript + Tailwind CSS v4 project scaffold
- Feature-based folder structure (`features/menu`, `features/cart`, etc.)
- Design token system (colors, type, radii) themed for مطعمي
- Dark/light mode and full RTL (Arabic) / LTR (English) support, switchable at runtime
- API service layer (`services/apiClient.ts`) that calls Flask endpoints and falls
  back to local mock data until each endpoint exists on the backend
- Homepage: Hero, rotating promo banner, category grid, popular products grid
- Cart state (Zustand) wired into product cards and the header icon
- Routing scaffold (React Router) with placeholder pages for product detail, cart,
  checkout, and orders — ready to be filled in in the next milestones

## Status: Milestone 2 — Menu Experience + Product Details Experience

Milestone 1 (architecture + homepage) is unchanged: same stack, same design
system, same API abstraction layer. Milestone 2 adds:

- **Menu page** (`/menu`): instant search (debounced, suggestions, recent
  searches, highlighted matches, no-results state), sticky category nav,
  sort dropdown, filter drawer (category/price/rating/popular/offers/
  vegetarian/spicy/availability), infinite scroll via `IntersectionObserver`,
  loading skeletons, empty state, error state with retry
- **Product details page** (`/product/:id`): image gallery with thumbnail
  strip + full-screen zoom (keyboard arrows + escape), size & extras
  selectors with live pricing, quantity selector with stock validation,
  ingredients, nutrition facts, rating summary with per-star breakdown,
  filterable review list, related products (same-category + cross-category)
- **Pricing engine** (`features/menu/utils/pricing.ts`): pure functions for
  unit price (base + size delta + extras) and a tax-ready line breakdown
  (VAT_RATE constant), reused by the product page and ready for Checkout
- **Favorites** (`features/favorites/favoritesStore.ts`): Zustand + persisted
  locally, with a `syncWithBackend` placeholder for when `/api/favorites`
  exists
- **Cart** extended to carry selected size/extras per line, still Zustand,
  now persisted locally too
- Route-based code splitting: `MenuPage` and `ProductDetailsPage` are lazy-
  loaded (see bundle sizes below)

### Deliverables checklist

- [x] `npx tsc -b` passes with zero errors
- [x] `npm run lint` (oxlint — this project's configured linter) passes with
      zero warnings/errors
- [x] `npm run build` passes; route-based chunks confirmed
      (`MenuPage`, `ProductDetailsPage`, `menuService` split out from the
      main bundle)
- [x] Manual dev-server smoke check: boots cleanly, no config warnings, no
      failed module requests
- [ ] Automated responsive screenshots — **not included**: this sandbox has
      no headless browser available (no Playwright/Chromium, and the binary
      can't be downloaded under this environment's network restrictions).
      Please run `npm run dev` locally to visually verify; the design tokens
      and Tailwind breakpoints are unchanged from Milestone 1, which you've
      already reviewed.

### New reusable components (Milestone 2)

UI primitives (`components/ui/`): `Skeleton` / `ProductCardSkeleton`,
`EmptyState` / `ErrorState`, `Drawer` (generic slide-over, used by filters,
reusable for a future cart drawer), `QuantitySelector`, `RatingStars`,
`ProgressBar`, `FavoriteButton`, `SelectField`, `CheckboxRow`,
`PageLoadingFallback`.

Menu feature (`features/menu/`): `CategoryNav`, `FilterDrawer`,
`ProductGallery`, `SizeSelector`, `ExtrasSelector`, `RelatedProductsSection`,
plus hooks `useMenuFilters` and `useProductListing` (generic paginated
listing hook — reusable for any future filtered/paginated view, including
an eventual admin product list).

Reviews feature (`features/reviews/`): `RatingSummary`, `ReviewCard`,
`ReviewList` — fully decoupled from the product page, so they can be reused
on an order/service review flow later.

Search feature (`features/search/`): `SearchBar`, `recentSearchStore`.

## Status: Milestone 3 — Cart + Coupon System

Same stack, same design system, same API layer pattern as Milestones 1–2.
Adds:

- **Cart page** (`/cart`): full line-item list (image, name, selected size/
  extras, quantity stepper, remove), empty-cart state with a link back to
  the menu, sticky order-summary sidebar
- **Coupon system** (`features/cart/`): code input → `couponService.validate()`
  (API-ready, mock-backed) → apply/remove, with distinct error states for
  "not found" vs "below minimum subtotal". `LEAF20` and `TRUFFLE10` match the
  codes shown in the homepage promo banner so the two milestones feel
  connected; try them in the cart.
- **Cart totals engine** (`features/cart/utils/cartTotals.ts`): items
  subtotal → coupon discount → delivery fee (free above SAR 150) → VAT →
  grand total, built on top of Milestone 2's per-line pricing engine
- Cart state (size/extras/coupon) is now Zustand-persisted, so a reload
  doesn't lose the cart

### Deliverables checklist

- [x] `npx tsc -b` passes with zero errors
- [x] `npm run lint` (oxlint) passes with zero warnings/errors
- [x] `npm run build` passes; `CartPage` is its own lazy-loaded chunk
- [x] Manual dev-server smoke check: boots cleanly, no warnings
- [ ] Automated screenshots — same limitation as Milestone 2: no headless
      browser available in this sandbox. Run `npm run dev` and open `/cart`
      after adding a few items from `/menu` to see it.

## Status: Milestone 4 — Checkout + Order Confirmation

Same stack, design system, and API layer pattern as before. New dependency:
`react-hook-form` + `zod` + `@hookform/resolvers` for the checkout form —
these were in the originally-recommended stack and this is the first form
that actually needed real validation.

- **Checkout page** (`/checkout`): customer info form (name, phone, city,
  district, address, notes) validated with Zod, delivery/pickup selector
  (pickup removes the delivery fee live), payment method selector (cash,
  Mada, Visa, MasterCard, Apple Pay, STC Pay, bank transfer), live order
  review sidebar reusing the cart totals engine
- **Order confirmation page** (`/orders/:id`): success screen, generated
  order number (`ORD-YYYYMMDD-XXXX`), estimated prep time, order summary,
  a **"Send Order via WhatsApp"** button that opens `wa.me` with a
  pre-filled, formatted order message (customer info, items, options,
  address, payment method, total), and a link back to the order for tracking
- **Order history page** (`/orders`): lists past orders from local storage,
  wired to the header's "My Orders" nav item
- **Order service** (`features/orders/services/orderService.ts`): full
  `createOrder` / `getOrderById` / `updateStatus` surface, API-ready,
  mock-backed by a persisted local orders store until Flask exposes
  `/api/orders`
- Placing an order clears the cart and coupon, then routes to the
  confirmation page

### Deliverables checklist

- [x] `npx tsc -b` passes with zero errors
- [x] `npm run lint` (oxlint) passes with zero warnings/errors
- [x] `npm run build` passes; `CheckoutPage`, `OrderConfirmationPage`, and
      `OrderHistoryPage` are separate lazy-loaded chunks
- [x] Manual dev-server smoke check: boots cleanly, all new routes'
      modules transform without errors
- [ ] Automated screenshots — same sandbox limitation as prior milestones
      (no headless browser available). Run `npm run dev`, add items from
      `/menu`, and walk through `/cart` → `/checkout` → confirmation to
      verify visually.

### One thing to configure before going live

`src/constants/restaurant.ts` has a placeholder WhatsApp number
(`RESTAURANT_WHATSAPP_NUMBER`). Update it to the restaurant's real number
before this ships.

## Real, relevant product images

All product photos were switched from random Picsum placeholders to
**LoremFlickr** (`loremflickr.com`) — a free, actively-maintained placeholder
service that returns real Creative Commons-licensed Flickr photos matching
keywords you supply, instead of unrelated random images. Each dish now uses
keywords matching its actual name (e.g. the Truffle Margherita pulls
`pizza,margherita` photos, the Spanish Latte pulls `latte,coffee`), via the
`foodImages()` helper in `features/menu/data/mockMenu.ts`. The `lock`
parameter pins a specific photo per dish so it stays consistent across
reloads instead of changing every time.

When real photography is ready, replace the `foodImages(...)` calls in
`mockMenu.ts` with actual image URLs (or wire `menuService` to Flask, which
would return real URLs from the database).

## Getting started

```bash
npm install
npm run dev       # starts the dev server
npm run build     # production build
```

Copy `.env.example` to `.env` and point `VITE_API_BASE_URL` at your running Flask
instance once you start exposing JSON endpoints (e.g. `/api/categories`,
`/api/products/popular`).

## Folder structure

```
src/
 ├── components/
 │    └── ui/          # Button, Badge, PriceTag, VineRule, Skeleton, StateViews,
 │                      # Drawer, QuantitySelector, RatingStars, ProgressBar,
 │                      # FavoriteButton, SelectField, CheckboxRow, PageLoadingFallback
 ├── constants/         # i18n copy dictionary, category icon map
 ├── features/
 │    ├── menu/
 │    │    ├── components/   # CategoryCard, CategoryNav, ProductCard, ProductGallery,
 │    │    │                 # SizeSelector, ExtrasSelector, FilterDrawer, RelatedProductsSection
 │    │    ├── data/          # mockMenu.ts (categories + full product dataset)
 │    │    ├── hooks/         # useMenuFilters, useProductListing
 │    │    ├── services/      # menuService (full endpoint surface)
 │    │    └── utils/         # pricing.ts (pure pricing engine)
 │    ├── reviews/
 │    │    └── components/    # RatingSummary, ReviewCard, ReviewList
 │    ├── search/
 │    │    ├── components/    # SearchBar
 │    │    └── recentSearchStore.ts
 │    ├── cart/
 │    │    ├── components/    # CartLineItem, CouponInput, OrderSummary
 │    │    ├── data/          # mockCoupons.ts
 │    │    ├── services/      # couponService
 │    │    ├── utils/         # cartTotals.ts
 │    │    └── cartStore.ts   # size/extras/coupon-aware cart state
 │    ├── checkout/
 │    │    ├── components/    # DeliveryMethodSelector, PaymentMethodSelector
 │    │    └── checkoutSchema.ts  # Zod schema for the customer info form
 │    ├── orders/
 │    │    ├── services/      # orderService (create/get/updateStatus)
 │    │    ├── utils/         # orderNumber.ts, whatsapp.ts
 │    │    └── ordersStore.ts # persisted local order history
 │    └── favorites/     # favoritesStore
 ├── hooks/              # useDebouncedValue, useInfiniteScrollSentinel
 ├── layouts/            # Header, Footer, MainLayout
 ├── pages/              # HomePage, MenuPage, ProductDetailsPage, CartPage,
 │                        # CheckoutPage, OrderConfirmationPage, OrderHistoryPage,
 │                        # ComingSoonPage, home/*
 ├── routes/             # AppRoutes (all main routes lazy-loaded)
 ├── services/           # apiClient (Flask REST client)
 ├── store/              # uiStore (theme + locale)
 └── types/              # shared TypeScript types (Product, Order, MenuFilters...)
```

## Design system

- **Palette:** deep forest green (`forest-900`), warm gold/brass (`gold-500`),
  ember/rust accent (`ember-500`), parchment cream (`parchment-100/200`)
- **Type:** Fraunces (display, headings), Inter (body), JetBrains Mono (prices,
  labels, codes)
- **Signature element:** a hand-drawn vine/leaf underline (`VineRule`) used under
  section titles instead of generic dividers or numbered markers — ties directly
  into the brand mark

## Next milestones

1. Wiring `services/` to real Flask JSON endpoints (replacing mock fallbacks):
   `/api/categories`, `/api/menu`, `/api/products/*`, `/api/coupons/validate`,
   `/api/orders`, `/api/orders/:id`, `/api/orders/:id/status`
2. Performance pass: further bundle splitting (framer-motion/vendor chunk),
   image optimization/CDN, SEO/schema.org (Restaurant/Menu/Product schema,
   Open Graph, sitemap.xml, robots.txt), Core Web Vitals audit
3. Admin dashboard groundwork (order status board, sales stats) — the
   `OrderStatus` union and `orderService.updateStatus` are already in place
   for this
4. Table reservation flow (`/table` is currently a placeholder)

## Notes on the existing Flask backend

The original `restaurant-web-app` repo is Flask + SQLAlchemy + SQLite with
server-rendered Jinja templates (not React). To connect this frontend for real,
Flask routes need to grow JSON counterparts (e.g. `GET /api/categories`,
`GET /api/products/popular`, `POST /api/orders`) — see `services/apiClient.ts`
and `features/menu/services/menuService.ts` for the expected shape.
