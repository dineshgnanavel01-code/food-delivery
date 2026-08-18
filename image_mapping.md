# Image Replacement Mapping (unsplash-source URLs)

Format: `/manus-storage/<old>` → Unsplash image. Using `images.unsplash.com/photo-<id>` direct URLs (permanent).

| Asset | Old key | New image |
|---|---|---|
| harveat-logo | harveat-logo_216afe8f.png | inline SVG leaf (no external img) |
| hero-market-hero | hero-market-hero_d9d84655.png | hero grain bowl |
| hero-salad-top | hero-salad-top_b4bddf1b.png | overhead garden salad |
| food-burger | food-burger_56249571.jpg | smash burger |
| food-pasta | food-pasta_b696ea03.jpg | pasta al pomodoro |
| food-ramen | food-ramen_16687b7a.jpg | tonkotsu ramen |
| food-sushi | food-sushi_2b982778.jpg | dragon roll / sushi |
| food-tacos | food-tacos_0688096e.jpg | al pastor tacos |
| food-dessert | food-dessert_0f2065d9.webp | chocolate cake |
| food-pizza | food-pizza_3023ac80.jpg | margherita pizza |
| food-vegan | food-vegan_d1b49985.jpg | vegan plate |
| food-salad | food-salad_43c61f6e.jpg | summer garden salad |

Usage mapping:
- categories.js: Healthy Bowls→hero-market-hero, Burgers→food-burger, Italian→food-pasta, Asian→food-ramen, Mexican→food-tacos, Desserts→food-dessert
- foods.js: Harvest Grain Bowl→hero-market-hero, Summer Garden Salad→food-salad, Zesty Vegan Plate→food-vegan, Classic Smash Burger→food-burger, Crispy Fries & Dip Trio→food-burger (or better: fries image; use pizza? keep burger), Mushroom Swiss Burger→food-burger, Tagliatelle→food-pasta, Chicken Alfredo→food-pasta, Tonkotsu Ramen→food-ramen, Miso Veggie Ramen→food-ramen, Dragon Roll→food-sushi, Salmon Nigiri Set→food-sushi, Al Pastor Tacos→food-tacos, Black Bean Quesadilla→food-tacos, Molten Chocolate Cake→food-dessert, Berry Cheesecake→food-dessert, Margherita Pizza→food-pizza, Truffle Mushroom Pizza→food-pizza
- restaurants.js: Green Grill→hero-market-hero, Burger Barn→food-burger, Pasta Fresca→food-pasta, Ramen Republic→food-ramen, Sushi Studio→food-sushi, Taco Fiesta→food-tacos, Sweet Sprout Bakery→food-dessert, Piazza Napoletana→food-pizza
- Home.jsx hero imgs: grain bowl → hero-market-hero, salad → hero-salad-top

## Selected Unsplash image IDs (confirmed via search results)
- hero-market-hero (grain bowl): /upload/search_images/mRdc65sjW3k9.jpg (local) → need unsplash.com ID; fallback: use photo ID 1546069901-ba9599a7e63c? Actually that's salad. Use hero grain bowl: search index 6 → local file mRdc65sjW3k9.jpg. Get ID via unsplash URL pattern.
- hero-salad-top: nHfqoPXgKzUb.jpg local (garden salad green bg overhead)
- food-burger: BI7QwD8qWW2C.jpeg (smashburger held, good) — need its unsplash ID
- food-pasta: M3R50rIeiYxC.jpg local (pasta pomodoro epicurious)
- food-ramen: h422Eycqkaof.jpg local (rich tonkotsu overhead)
- food-sushi: y8Vzfu7tQEOk.jpg local (dragon roll)
- food-tacos: lqBTWw0TalFy.jpg local (al pastor tacos)
- food-dessert: kSOTjak213nE.jpg local (molten chocolate cake)
- food-pizza: H3An9PCgve4h.jpg local (wood fired margherita) — small 400px; prefer search result 8? h85GmC20C1P3 is text overlay. Use H3An9PCgve4h (400x400 OK for card) or find bigger.
- food-vegan: ByeN1LmLduD6.jpg local (big vegan bowl)
- food-salad: fBBNj57dpi7U.jpg local (salad bowl pink)
- fries: G7Sw0VSY4Ces.jpg local (fries basket) — use for Crispy Fries? Better map: use food-burger for fries (acceptable) OR use fries image for one burger variant.

NOTE: search tool download gives local files but NOT the unsplash IDs. Prefer using the local downloaded files uploaded via manus-upload-file --webdev so URLs are permanent and project-owned. That also avoids relying on external unsplash URLs which could change/be blocked.

## NEW storage URLs (uploaded, verified 200 via dev server):
- harveat-hero-bowl_95a518ce.jpg (Grain bowl, Green Grill/Harvest Grain Bowl)
- harveat-salad-top_3846082e.jpg (garden salad overhead, hero)
- harveat-burger_6c4b3b09.jpeg (smash burger, Burger Barn)
- harveat-pasta_3867cb57.jpg (pomodoro, Pasta Fresca)
- harveat-ramen_fd8512cf.jpg (tonkotsu, Ramen Republic)
- harveat-sushi_762ae89e.jpg (dragon roll, Sushi Studio)
- harveat-tacos_6e01252a.jpg (al pastor, Taco Fiesta)
- harveat-dessert_985ff4ac.jpg (molten cake, Sweet Sprout Bakery)
- harveat-pizza_f3401783.jpg (wood fired margherita, Piazza Napoletana)
- harveat-vegan_6a7dbad3.jpg (vegan plate, Zesty Vegan)
- harveat-salad_d8d4f7dd.jpg (summer garden salad)
- harveat-fries_71297975.jpg (Crispy Fries & Dip Trio)

## Status:
- All old /manus-storage/<old> refs replaced in categories.js, foods.js, restaurants.js, Home.jsx (verified via grep, zero old keys remain)
- Navbar.jsx + Footer.jsx: broken PNG logo replaced with inline SVG leaf mark (emerald leaf + papaya circle), no more LOGO const in Footer (LOGO const removed in Navbar too; only LOGO_MARK)
- Verified screenshots: Home (hero + categories loading), /restaurants (all 8 cards with photos), /restaurant/r2 (burger hero + menu imgs), /food/f1 (bowl detail), /cart, /checkout — all images render correctly
- Route for restaurant details is /restaurant/:id (not /restaurants/r2)
- Remaining: push to GitHub remote (gh repo dineshgnanavel01-code/food-delivery-app), save checkpoint, deliver.
