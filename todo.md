# Fix Broken Images in Food Delivery App

Root cause identified: /manus-storage/ paths proxy to the SOURCE project's CloudFront storage, which returns 403 Access Denied in this copy (unrecoverable; images not in Git repo, Vercel deploys also return 410/404). Generation quota exhausted for today, so fix uses curated Unsplash images (permanent direct URLs, no re-upload needed) matched to each dish/category.

- [ ] Obtain image assets via curated Unsplash URLs (12 photos + logo)
- [ ] Create a simple inline SVG leaf logo as Logo component (no generation possible)
- [ ] Update data files (categories.js, foods.js, restaurants.js) with new URLs
- [ ] Update components (Navbar.jsx, Footer.jsx) and Home.jsx with new URLs
- [ ] Verify images load on Home, Restaurant List, Restaurant Details, Food Details, Cart
- [ ] Save checkpoint and deliver fixed project
