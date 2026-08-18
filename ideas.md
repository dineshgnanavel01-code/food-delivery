# Food Delivery App — Design Brainstorm

## User's required file structure (ground truth)
Plain JavaScript (.jsx) project, React + Vite + Tailwind CSS, React Icons (lucide-react compatible icon usage avoided — use react-icons instead):
```
src/components/  Navbar, SearchBar, CategoryCard, RestaurantCard, FoodCard, CartItem, OrderSummary, Footer
src/pages/       Home, RestaurantList, RestaurantDetails, FoodDetails, Cart, Checkout, OrderConfirmation
src/context/     CartContext.jsx
src/data/        restaurants.js, foods.js, categories.js
```
Also `public/images/restaurants|food|categories`, `src/assets/logo.png`, App.jsx, main.jsx, index.css.
Deliverable: website + push code to GitHub repo dineshgnanavel01-code/food-delivery-app.

## Three Stylistic Approaches

### 1. "Saffron Market" — Warm Editorial Bistro
Cream paper, saffron-tomato accent, Fraunces serif headlines, polaroid food cards.
**Probability:** 0.05

### 2. "Midnight Crave" — Dark Neon Cravings
Dark charcoal + neon orange glow, high-contrast cards, late-night delivery vibe.
**Probability:** 0.02

### 3. "Emerald Harvest" — Fresh Organic Market (CHOSEN)
Vibrant emerald-green + cream + papaya-orange palette inspired by fresh farmers markets. Rounded market-stall cards, chunky sans display type (Sora), playful sticker-style badges, fresh produce energy. Emotional intent: fresh, lively, trustworthy.
**Probability:** 0.03

---

## CHOSEN: "Emerald Harvest" — Fresh Organic Market

### Design Movement
Playful "fresh market" modernism — inspired by organic grocery branding (Farmdrop, Thrive Market) with sticker/badge pop and chunky rounded geometry.

### Core Principles
1. **Freshness as color** — deep emerald primary on cream; papaya orange as the appetite accent.
2. **Chunky rounded geometry** — big radii (1.25rem+), pill buttons, soft shadows — friendly, tactile.
3. **Sticker-style badges** — offer/veg/popular tags look like market stickers (rounded, rotated slightly).
4. **Photography carries appetite** — big food photos, quiet supporting UI.

### Color Philosophy
- Base: fresh cream `#FAF8F2`.
- Primary: **Emerald `#0E7C5F`** — trust + freshness (ownable vs. the sea of orange delivery apps).
- Accent: **Papaya `#FF7A29`** — appetite, CTAs, prices.
- Ink: deep forest `#12332A`. Supporting: blush `#FFE3D0` for hover chips, butter `#FFC94D` for ratings.

### Layout Paradigm
Asymmetric hero (text left, stacked/tilted photos right). Sectioned market "stalls": full-width bands with staggered card grids and pill filter rows.

### Signature Elements
1. **Sticker badges** — rotated rounded chips for offers/veg/popular.
2. **Leaf dot** in the wordmark (Harveat's "a" or leaf glyph in logo).
3. **Pill chips** everywhere — filters, tags, buttons.

### Interaction Philosophy
Tactile: cards lift + shadow on hover, buttons press down, cart badge springs when items added, toast confirmations.

### Animation
- fade-up entrances staggered 40–60ms, 450ms ease-out cubic-bezier(0.23,1,0.32,1)
- hover: translateY(-5px) + shadow, 200ms
- cart badge spring bounce on increment
- prefers-reduced-motion respected

### Typography System
- Display: **"Sora"** 600/700/800 — chunky, modern, rounded terminals.
- Body/UI: **"Inter"** 400/500/600.
- Hierarchy: eyebrow caps 11px tracked → Sora 40–60px display → Inter 15px body.

### Brand Essence
**Harveat** — fresh, honest food delivery for people who care where their dinner comes from. Personality: fresh, friendly, dependable.

### Brand Voice
Fresh, upbeat, sensory. Examples: "Fresh from the market, straight to your table." / "Tonight's cravings, covered."
No generic filler.

### Wordmark & Logo
"Harveat" in Sora 800 with a leaf replacing the dot accent; mark: bold emerald leaf + papaya fruit glyph on transparent background.

### Signature Brand Color
Emerald `#0E7C5F`.
