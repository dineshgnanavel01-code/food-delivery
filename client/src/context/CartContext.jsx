/*
 * DINA FOOD — "Emerald Harvest" fresh market style
 * Cart + favorites + wishlist context with localStorage persistence.
 */
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { TAX_RATE } from "../data/foods";

const CartContext = createContext(null);

const LS_KEY = "harveat-cart-v1";

function loadStored() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* ignore parse errors */
  }
  return { items: [], favorites: [], wishlist: [] };
}

export function CartProvider({ children }) {
  const initial = useMemo(() => loadStored(), []);
  const [items, setItems] = useState(initial.items);
  const [favorites, setFavorites] = useState(initial.favorites);
  const [wishlist, setWishlist] = useState(initial.wishlist);
  const [promo, setPromo] = useState(null);
  const [toast, setToast] = useState(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ items, favorites, wishlist }));
  }, [items, favorites, wishlist]);

  // Simple built-in toast (no extra dependency)
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2200);
  }, []);

  const addToCart = useCallback(
    (food) => {
      setItems((prev) => {
        const existing = prev.find((c) => c.food.id === food.id);
        if (existing) {
          showToast(`Another ${food.name} added`, "success");
          return prev.map((c) =>
            c.food.id === food.id ? { ...c, quantity: c.quantity + 1 } : c,
          );
        }
        showToast(`${food.name} added to cart`, "success");
        return [...prev, { food, quantity: 1 }];
      });
    },
    [showToast],
  );

  const removeFromCart = useCallback(
    (foodId) => {
      setItems((prev) => prev.filter((c) => c.food.id !== foodId));
      showToast("Removed from cart", "neutral");
    },
    [showToast],
  );

  const increaseQty = useCallback((foodId) => {
    setItems((prev) =>
      prev.map((c) => (c.food.id === foodId ? { ...c, quantity: c.quantity + 1 } : c)),
    );
  }, []);

  const decreaseQty = useCallback((foodId) => {
    setItems((prev) =>
      prev
        .map((c) => (c.food.id === foodId ? { ...c, quantity: c.quantity - 1 } : c))
        .filter((c) => c.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleFavorite = useCallback(
    (restaurantId) => {
      setFavorites((prev) => {
        const isFav = prev.includes(restaurantId);
        showToast(isFav ? "Removed from favorites" : "Added to favorites ❤", "neutral");
        return isFav ? prev.filter((id) => id !== restaurantId) : [...prev, restaurantId];
      });
    },
    [showToast],
  );

  const toggleWishlist = useCallback(
    (foodId) => {
      setWishlist((prev) => {
        const isSaved = prev.includes(foodId);
        showToast(isSaved ? "Removed from wishlist" : "Saved to wishlist 🤍", "neutral");
        return isSaved ? prev.filter((id) => id !== foodId) : [...prev, foodId];
      });
    },
    [showToast],
  );

  const applyPromo = useCallback(
    (code) => {
      const upper = code.trim().toUpperCase();
      if (upper === "DINA10") {
        setPromo({ code: upper, type: "percent", value: 0.1 });
        showToast("Promo DINA10 applied — 10% off!", "success");
        return true;
      }
      if (upper === "FREEDELIVERY") {
        setPromo({ code: upper, type: "free-delivery" });
        showToast("Delivery fee waived with FREEDELIVERY!", "success");
        return true;
      }
      setPromo(null);
      showToast("Invalid promo code. Try DINA10", "error");
      return false;
    },
    [showToast],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, c) => sum + c.food.price * c.quantity, 0),
    [items],
  );
  const deliveryFee = useMemo(() => {
    if (items.length === 0) return 0;
    if (promo?.type === "free-delivery") return 0;
    return 2.99;
  }, [promo, items]);
  const discount = useMemo(
    () => (promo?.type === "percent" ? subtotal * promo.value : 0),
    [promo, subtotal],
  );
  const tax = useMemo(() => Math.max(0, subtotal - discount) * TAX_RATE, [subtotal, discount]);
  const total = useMemo(
    () => Math.max(0, subtotal - discount + tax + deliveryFee),
    [subtotal, discount, tax, deliveryFee],
  );
  const count = useMemo(() => items.reduce((sum, c) => sum + c.quantity, 0), [items]);

  const value = {
    items,
    favorites,
    wishlist,
    promoCode: promo?.code ?? null,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    toggleFavorite,
    toggleWishlist,
    applyPromo,
    subtotal,
    deliveryFee,
    tax,
    discount,
    total,
    count,
    toast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
