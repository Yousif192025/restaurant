# مطعمي 🍽️

منصة طلب طعام سعودية حديثة تقدم أشهى الأطباق المحلية والعالمية.

## المميزات
- 🇸🇦 أطباق سعودية أصيلة
- 🌍 أطباق عالمية متنوعة
- 📱 تجربة مستخدم عربية متكاملة
- 🚀 توصيل سريع

## التقنيات المستخدمة
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
## Status: Milestone 1 — Architecture Foundation + Homepage

What's included in this milestone:

- Vite + React 19 + TypeScript + Tailwind CSS v4 project scaffold
- Feature-based folder structure (`features/menu`, `features/cart`, etc.)
- Design token system (colors, type, radii) themed for Silver Leaf
- Dark/light mode and full RTL (Arabic) / LTR (English) support, switchable at runtime
- API service layer (`services/apiClient.ts`) that calls Flask endpoints and falls
  back to local mock data until each endpoint exists on the backend
- Homepage: Hero, rotating promo banner, category grid, popular products grid
- Cart state (Zustand) wired into product cards and the header icon
- Routing scaffold (React Router) with placeholder pages for product detail, cart,
  checkout, and orders — ready to be filled in in the next milestones

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
 ├── components/       # shared UI primitives (Button, Badge, PriceTag, VineRule...)
 ├── constants/        # i18n copy dictionary, nav items
 ├── features/
 │    ├── menu/        # categories, products, ProductCard, CategoryCard, menuService
 │    ├── cart/         # cart store
 │    ├── checkout/     # (scaffolded, next milestone)
 │    ├── orders/       # (scaffolded, next milestone)
 │    ├── search/       # (scaffolded, next milestone)
 │    └── favorites/    # (scaffolded, next milestone)
 ├── layouts/           # Header, Footer, MainLayout
 ├── pages/             # HomePage + home/* section components
 ├── routes/            # AppRoutes
 ├── services/          # apiClient (Flask REST client)
 ├── store/             # uiStore (theme + locale)
 └── types/             # shared TypeScript types
```

## Design system

- **Palette:** deep forest green (`forest-900`), warm gold/brass (`gold-500`),
  ember/rust accent (`ember-500`), parchment cream (`parchment-100/200`)
- **Type:** Fraunces (display, headings), Inter (body), JetBrains Mono (prices,
  labels, codes)
- **Signature element:** a hand-drawn vine/leaf underline (`VineRule`) used under
  section titles instead of generic dividers or numbered markers — ties directly
  into the "Silver Leaf" name

## Next milestones

1. Menu page + product detail (gallery, sizes, extras, dynamic pricing, reviews)
2. Cart drawer + coupon system
3. Checkout (customer info, delivery/pickup, payment method, order review)
4. Order confirmation + WhatsApp order message generation
5. Wiring `services/` to real Flask JSON endpoints (replacing mock fallbacks)
6. Performance pass (code-splitting, image optimization, SEO/schema.org, Core Web Vitals)

## Notes on the existing Flask backend

The original `restaurant-web-app` repo is Flask + SQLAlchemy + SQLite with
server-rendered Jinja templates (not React). To connect this frontend for real,
Flask routes need to grow JSON counterparts (e.g. `GET /api/categories`,
`GET /api/products/popular`, `POST /api/orders`) — see `services/apiClient.ts`
and `features/menu/services/menuService.ts` for the expected shape.
