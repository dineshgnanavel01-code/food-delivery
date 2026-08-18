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
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { TAX_RATE, type MenuItem } from "@/data/mockData";

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  favorites: string[]; // restaurant ids
  wishlist: string[]; // menu item ids
  promoCode: string | null;
  promoDiscount: number;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  increaseQty: (itemId: string) => void;
  decreaseQty: (itemId: string) => void;
  clearCart: () => void;
  toggleFavorite: (restaurantId: string) => void;
  toggleWishlist: (itemId: string) => void;
  applyPromo: (code: string) => boolean;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  count: number;
}

const CartContext = createContext<CartState | null>(null);

const LS_KEY = "tiffino-cart-v1";

interface StoredState {
  items: CartItem[];
  favorites: string[];
  wishlist: string[];
}

function loadStored(): StoredState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { items: [], favorites: [], wishlist: [] };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [stored] = useState<StoredState>(() => loadStored());
  const [items, setItems] = useState<CartItem[]>(stored.items);
  const [favorites, setFavorites] = useState<string[]>(stored.favorites);
  const [wishlist, setWishlist] = useState<string[]>(stored.wishlist);
  const [promo, setPromo] = useState<{ code: string; discount: number } | null>(null);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ items, favorites, wishlist }));
  }, [items, favorites, wishlist]);

  const addToCart = useCallback((item: MenuItem) => {
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

  const removeFromCart = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((c) => c.item.id !== itemId));
    toast("Removed from cart");
  }, []);

  const increaseQty = useCallback((itemId: string) => {
    setItems((prev) =>
      prev.map((c) =>
        c.item.id === itemId ? { ...c, quantity: c.quantity + 1 } : c,
      ),
    );
  }, []);

  const decreaseQty = useCallback((itemId: string) => {
    setItems((prev) =>
      prev
        .map((c) =>
          c.item.id === itemId ? { ...c, quantity: c.quantity - 1 } : c,
        )
        .filter((c) => c.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleFavorite = useCallback((restaurantId: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(restaurantId);
      toast(isFav ? "Removed from favorites" : "Added to favorites ❤");
      return isFav
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId];
    });
  }, []);

  const toggleWishlist = useCallback((itemId: string) => {
    setWishlist((prev) => {
      const isSaved = prev.includes(itemId);
      toast(isSaved ? "Removed from wishlist" : "Saved to wishlist 🤍");
      return isSaved ? prev.filter((id) => id !== itemId) : [...prev, itemId];
    });
  }, []);

  const applyPromo = useCallback((code: string) => {
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

  const value: CartState = {
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
