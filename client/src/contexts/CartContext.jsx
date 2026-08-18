/*
 * TIFFINO — "Saffron Market"
 * Cart + favorites + wishlist state management with localStorage persistence.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { TAX_RATE } from "@/data/foods";



const CartContext = createContext(null);

const LS_KEY = "tiffino-cart-v1";


function loadStored() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { items: [], favorites: [], wishlist: [] };
}

export function CartProvider({ children }) {
  const [stored] = useState(() => loadStored());
  const [items, setItems] = useState(stored.items);
  const [favorites, setFavorites] = useState(stored.favorites);
  const [wishlist, setWishlist] = useState(stored.wishlist);
  const [promo, setPromo] = useState(null);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ items, favorites, wishlist }));
  }, [items, favorites, wishlist]);

  const addToCart = useCallback((item) => {
    setItems((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        toast.success(`Another ${item.name} added`);
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      toast.success(`${item.name} added to cart`, {
        description: "Ready when you are",
      });
      return [...prev, { item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setItems((prev) => prev.filter((c) => c.item.id !== itemId));
    toast("Removed from cart");
  }, []);

  const increaseQty = useCallback((itemId) => {
    setItems((prev) =>
      prev.map((c) =>
        c.item.id === itemId ? { ...c, quantity: c.quantity + 1 } : c,
      ),
    );
  }, []);

  const decreaseQty = useCallback((itemId) => {
    setItems((prev) =>
      prev
        .map((c) =>
          c.item.id === itemId ? { ...c, quantity: c.quantity - 1 } : c,
        )
        .filter((c) => c.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleFavorite = useCallback((restaurantId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(restaurantId);
      toast(isFav ? "Removed from favorites" : "Added to favorites ❤");
      return isFav
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId];
    });
  }, []);

  const toggleWishlist = useCallback((itemId) => {
    setWishlist((prev) => {
      const isSaved = prev.includes(itemId);
      toast(isSaved ? "Removed from wishlist" : "Saved to wishlist 🤍");
      return isSaved ? prev.filter((id) => id !== itemId) : [...prev, itemId];
    });
  }, []);

  const applyPromo = useCallback((code) => {
    const upper = code.trim().toUpperCase();
    if (upper === "TIFFINO10") {
      setPromo({ code: upper, discount: 0.1 });
      toast.success("Promo TIFFINO10 applied — 10% off!");
      return true;
    }
    if (upper === "FREEDELIVERY") {
      setPromo({ code: upper, discount: 0 }); // handled in deliveryFee
      toast.success("Delivery fee waived with FREEDELIVERY!");
      return true;
    }
    setPromo(null);
    toast.error("Invalid promo code. Try TIFFINO10");
    return false;
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, c) => sum + c.item.price * c.quantity, 0),
    [items],
  );
  const deliveryFee = useMemo(() => {
    if (promo?.code === "FREEDELIVERY") return 0;
    if (items.length === 0) return 0;
    return 2.99;
  }, [promo, items]);
  const discount = useMemo(
    () => (promo?.code === "TIFFINO10" ? subtotal * promo.discount : 0),
    [promo, subtotal],
  );
  const taxable = subtotal - discount;
  const tax = useMemo(() => taxable * TAX_RATE, [taxable]);
  const total = useMemo(() => Math.max(0, taxable + tax + deliveryFee), [taxable, tax, deliveryFee]);
  const count = useMemo(
    () => items.reduce((sum, c) => sum + c.quantity, 0),
    [items],
  );

  const value = {
    items,
    favorites,
    wishlist,
    promoCode: promo?.code ?? null,
    promoDiscount: promo?.discount ?? 0,
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
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
