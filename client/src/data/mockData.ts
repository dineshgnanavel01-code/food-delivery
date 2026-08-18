/*
 * TIFFINO — "Saffron Market" data layer
 * Mock restaurants, menu items & categories for the UI kit demo.
 */

export interface Category {
  id: string;
  name: string;
  emoji: string;
  image: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  veg: boolean;
  category: string; // menu section
  popular?: boolean;
  spicy?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryTime: string; // minutes
  deliveryFee: number;
  priceRange: string; // "$" ... "$$$$"
  image: string;
  cover?: string;
  tags: string[];
  category: string;
  address: string;
  distance: string;
  offer?: string;
}

export const BRAND = {
  name: "Tiffino",
  logo: "/manus-storage/tiffino-logo_e30303de.png",
};

export const IMG = {
  hero: "/manus-storage/hero-food-hero_774508eb.png",
  plateTop: "/manus-storage/hero-plate-top_8a08207f.png",
  promoBanner: "/manus-storage/promo-banner_689ed61b.png",
  biryani: "/manus-storage/food-biryani_8bf140ea.png",
  pizza: "/manus-storage/food-pizza_29a240c6.png",
  thai: "/manus-storage/food-thai_e8d14184.png",
  dessert: "/manus-storage/food-dessert_220dab1c.png",
  sushi: "/manus-storage/food-sushi_a685cbea.png",
};

export const categories: Category[] = [
  { id: "pizza", name: "Pizza", emoji: "🍕", image: IMG.pizza },
  { id: "biryani", name: "Biryani", emoji: "🍛", image: IMG.biryani },
  { id: "thai", name: "Thai", emoji: "🥘", image: IMG.thai },
  { id: "japanese", name: "Japanese", emoji: "🍣", image: IMG.sushi },
  { id: "desserts", name: "Desserts", emoji: "🍰", image: IMG.dessert },
];

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Bella Napoli",
    cuisine: "Italian · Wood-fired Pizza",
    rating: 4.8,
    reviews: 1240,
    deliveryTime: "25-35",
    deliveryFee: 2.99,
    priceRange: "$$",
    image: IMG.pizza,
    tags: ["Wood-fired", "Fresh pasta", "Family favorite"],
    category: "pizza",
    address: "12 Mulberry Street, Little Italy",
    distance: "2.4 km",
    offer: "20% off orders above $25",
  },
  {
    id: "r2",
    name: "Saffron Spice House",
    cuisine: "Indian · Royal Biryani",
    rating: 4.7,
    reviews: 980,
    deliveryTime: "30-40",
    deliveryFee: 1.99,
    priceRange: "$$",
    image: IMG.biryani,
    tags: ["Hyderabadi", "Tandoori", "Curries"],
    category: "biryani",
    address: "88 Spice Lane, Old Market",
    distance: "3.1 km",
    offer: "Free dessert with biryani",
  },
  {
    id: "r3",
    name: "Bangkok Basil",
    cuisine: "Thai · Street Food",
    rating: 4.6,
    reviews: 756,
    deliveryTime: "20-30",
    deliveryFee: 2.49,
    priceRange: "$",
    image: IMG.thai,
    tags: ["Curry", "Pad Thai", "Vegan options"],
    category: "thai",
    address: "4 River Road, Chinatown",
    distance: "1.8 km",
  },
  {
    id: "r4",
    name: "Sakura Roll Bar",
    cuisine: "Japanese · Sushi & Ramen",
    rating: 4.9,
    reviews: 1560,
    deliveryTime: "35-45",
    deliveryFee: 3.49,
    priceRange: "$$$",
    image: IMG.sushi,
    tags: ["Omakase", "Fresh fish", "Sake bar"],
    category: "japanese",
    address: "22 Cherry Blossom Ave",
    distance: "4.2 km",
    offer: "10% off first order",
  },
  {
    id: "r5",
    name: "The Cocoa Room",
    cuisine: "Desserts · Bakery",
    rating: 4.8,
    reviews: 890,
    deliveryTime: "15-25",
    deliveryFee: 1.49,
    priceRange: "$$",
    image: IMG.dessert,
    tags: ["Cakes", "Pastries", "Hot chocolate"],
    category: "desserts",
    address: "5 Confectionery Court",
    distance: "1.2 km",
    offer: "Buy 2 desserts, get 1 free",
  },
  {
    id: "r6",
    name: "Trattoria Verde",
    cuisine: "Italian · Mediterranean",
    rating: 4.5,
    reviews: 540,
    deliveryTime: "25-35",
    deliveryFee: 2.49,
    priceRange: "$$",
    image: IMG.pizza,
    tags: ["Organic", "Salads", "Pasta"],
    category: "pizza",
    address: "31 Greenway Plaza",
    distance: "2.9 km",
  },
  {
    id: "r7",
    name: "Masala Junction",
    cuisine: "Indian · North Indian",
    rating: 4.4,
    reviews: 430,
    deliveryTime: "30-40",
    deliveryFee: 1.99,
    priceRange: "$",
    image: IMG.biryani,
    tags: ["Paneer", "Naan", "Thalis"],
    category: "biryani",
    address: "17 Curry Street",
    distance: "3.6 km",
  },
  {
    id: "r8",
    name: "Golden Wok",
    cuisine: "Thai-Chinese Fusion",
    rating: 4.3,
    reviews: 312,
    deliveryTime: "25-35",
    deliveryFee: 2.99,
    priceRange: "$",
    image: IMG.thai,
    tags: ["Noodles", "Stir-fry", "Dim sum"],
    category: "thai",
    address: "9 Lantern Alley",
    distance: "2.2 km",
  },
];

export const menuItems: MenuItem[] = [
  // Bella Napoli
  { id: "m1", restaurantId: "r1", name: "Margherita Classica", description: "San Marzano tomato, fior di latte, fresh basil, extra virgin olive oil on a wood-fired crust.", price: 11.99, rating: 4.8, reviews: 420, image: IMG.pizza, veg: true, category: "Pizza", popular: true },
  { id: "m2", restaurantId: "r1", name: "Truffle Mushroom Pizza", description: "Wild mushrooms, truffle cream, fontina cheese, thyme on a crispy thin base.", price: 15.99, rating: 4.9, reviews: 310, image: IMG.pizza, veg: true, category: "Pizza", popular: true },
  { id: "m3", restaurantId: "r1", name: "Spaghetti Carbonara", description: "Guanciale, egg yolk, pecorino romano, black pepper — the Roman way.", price: 12.49, rating: 4.7, reviews: 285, image: IMG.pizza, veg: false, category: "Pasta" },
  { id: "m4", restaurantId: "r1", name: "Tiramisu", description: "Mascarpone cream, espresso-soaked ladyfingers, cocoa dust.", price: 6.99, rating: 4.9, reviews: 380, image: IMG.dessert, veg: true, category: "Desserts", popular: true },
  // Saffron Spice House
  { id: "m5", restaurantId: "r2", name: "Hyderabadi Chicken Biryani", description: "Slow-dum basmati rice layered with marinated chicken, saffron and fried onions.", price: 13.99, rating: 4.8, reviews: 520, image: IMG.biryani, veg: false, category: "Biryani", popular: true },
  { id: "m6", restaurantId: "r2", name: "Paneer Butter Masala", description: "Cottage cheese cubes in a silky tomato-cream gravy with kasuri methi.", price: 10.99, rating: 4.6, reviews: 240, image: IMG.biryani, veg: true, category: "Curries" },
  { id: "m7", restaurantId: "r2", name: "Tandoori Mixed Grill", description: "Chicken tikka, seekh kebab and malai tikka from the clay oven, served with mint chutney.", price: 16.99, rating: 4.7, reviews: 190, image: IMG.biryani, veg: false, category: "Tandoori" },
  { id: "m8", restaurantId: "r2", name: "Garlic Naan Basket", description: "Warm tandoori naan brushed with garlic butter — basket of 4.", price: 4.99, rating: 4.5, reviews: 300, image: IMG.biryani, veg: true, category: "Breads" },
  // Bangkok Basil
  { id: "m9", restaurantId: "r3", name: "Thai Green Curry", description: "Coconut milk, Thai basil, bamboo shoots and chicken in an aromatic green curry.", price: 12.99, rating: 4.7, reviews: 260, image: IMG.thai, veg: false, category: "Curries", popular: true },
  { id: "m10", restaurantId: "r3", name: "Pad Thai", description: "Rice noodles, tamarind, peanuts, egg and prawns, wok-tossed to order.", price: 11.49, rating: 4.6, reviews: 230, image: IMG.thai, veg: false, category: "Noodles", popular: true },
  { id: "m11", restaurantId: "r3", name: "Tofu Basil Stir-fry", description: "Crispy tofu, holy basil, chili and garlic — a vegan favorite.", price: 10.49, rating: 4.5, reviews: 150, image: IMG.thai, veg: true, category: "Vegan", spicy: true },
  // Sakura Roll Bar
  { id: "m12", restaurantId: "r4", name: "Dragon Roll", description: "Shrimp tempura, avocado, eel and unagi sauce topped with tobiko.", price: 16.99, rating: 4.9, reviews: 440, image: IMG.sushi, veg: false, category: "Signature Rolls", popular: true },
  { id: "m13", restaurantId: "r4", name: "Salmon Nigiri Set", description: "Six pieces of fresh Norwegian salmon over seasoned sushi rice.", price: 14.99, rating: 4.8, reviews: 380, image: IMG.sushi, veg: false, category: "Nigiri" },
  { id: "m14", restaurantId: "r4", name: "Tofu Veggie Roll", description: "Avocado, cucumber, pickled radish and tofu cream cheese.", price: 9.99, rating: 4.6, reviews: 120, image: IMG.sushi, veg: true, category: "Signature Rolls" },
  // The Cocoa Room
  { id: "m15", restaurantId: "r5", name: "Molten Chocolate Lava Cake", description: "Warm dark chocolate cake with a flowing center, served with vanilla ice cream.", price: 7.99, rating: 4.9, reviews: 410, image: IMG.dessert, veg: true, category: "Cakes", popular: true },
  { id: "m16", restaurantId: "r5", name: "Berry Cheesecake Slice", description: "New York style cheesecake with a fresh berry compote.", price: 6.49, rating: 4.7, reviews: 210, image: IMG.dessert, veg: true, category: "Cakes" },
  { id: "m17", restaurantId: "r5", name: "Croissant Box", description: "Four buttery French croissants baked fresh this morning.", price: 8.99, rating: 4.8, reviews: 175, image: IMG.dessert, veg: true, category: "Pastries" },
  // Trattoria Verde
  { id: "m18", restaurantId: "r6", name: "Pesto Fusilli", description: "House-made basil pesto, pine nuts, parmesan and organic fusilli.", price: 11.49, rating: 4.5, reviews: 130, image: IMG.pizza, veg: true, category: "Pasta" },
  { id: "m19", restaurantId: "r6", name: "Mediterranean Salad", description: "Heirloom tomatoes, burrata, olives and olive oil on wild greens.", price: 9.99, rating: 4.4, reviews: 95, image: IMG.pizza, veg: true, category: "Salads" },
  // Masala Junction
  { id: "m20", restaurantId: "r7", name: "Shahi Paneer Thali", description: "Paneer in royal gravy, dal makhani, rice, roti, raita and a sweet.", price: 12.99, rating: 4.4, reviews: 160, image: IMG.biryani, veg: true, category: "Thalis", popular: true },
  // Golden Wok
  { id: "m21", restaurantId: "r8", name: "Singapore Noodles", description: "Rice vermicelli, curry spice, shrimp, egg and vegetables.", price: 10.99, rating: 4.3, reviews: 110, image: IMG.thai, veg: false, category: "Noodles" },
  { id: "m22", restaurantId: "r8", name: "Kung Pao Chicken", description: "Wok-fired chicken, peanuts, chili and Sichuan peppercorn.", price: 11.99, rating: 4.4, reviews: 98, image: IMG.thai, veg: false, category: "Mains", spicy: true },
];

export const getRestaurant = (id: string) => restaurants.find((r) => r.id === id);
export const getMenuItems = (restaurantId: string) =>
  menuItems.filter((m) => m.restaurantId === restaurantId);

export const TAX_RATE = 0.08;
export const MIN_ORDER = 10;
