/*
 * DINA FOOD — "Emerald Harvest" FoodCard
 * Veg/Non-veg square indicator, popular sticker, wishlist heart,
 * price in papaya, add-to-cart or inline quantity controls.
 */
import { FiPlus, FiMinus, FiHeart } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useCart } from "../context/CartContext";

function VegIndicator({ veg }) {
  return (
    <span
      className={`inline-flex h-4.5 w-4.5 items-center justify-center rounded-[3px] border ${
        veg ? "border-emerald" : "border-[oklch(0.5_0.2_27)]"
      } bg-card`}>
      <span className={`h-2 w-2 rounded-full ${veg ? "bg-emerald" : "bg-[oklch(0.5_0.2_27)]"}`} />
    </span>
  );
}

export default function FoodCard({ food }) {
  const { items, addToCart, increaseQty, decreaseQty, wishlist, toggleWishlist } = useCart();
  const inCart = items.find((c) => c.food.id === food.id);
  const saved = wishlist.includes(food.id);

  return (
    <div className="group polaroid flex flex-col overflow-hidden bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3">
          <VegIndicator veg={food.veg} />
        </span>
        <button
          onClick={() => toggleWishlist(food.id)}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 backdrop-blur transition-all duration-150 active:scale-90 ${
            saved ? "text-papaya" : "text-foreground/50 hover:text-papaya"
          }`}>
          {saved ? <AiFillHeart className="h-4 w-4" /> : <FiHeart className="h-4 w-4" />}
        </button>
        {food.popular && (
          <span className="sticker absolute bottom-3 left-3 rotate-[2deg] bg-butter px-2.5 py-1 text-[11px] font-bold text-foreground">
            <AiFillStar className="mr-0.5 inline h-3 w-3 text-papaya" /> Popular
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-snug">{food.name}</h3>
          <span className="shrink-0 font-display text-base font-extrabold text-papaya">
            ${food.price.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{food.description}</p>
        <span className="inline-flex w-fit items-center gap-1 text-xs">
          <AiFillStar className="h-3 w-3 text-papaya" />
          <strong>{food.rating.toFixed(1)}</strong>
          <span className="text-muted-foreground">({food.reviews})</span>
        </span>
        <div className="mt-3">
          {inCart ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => decreaseQty(food.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background hover:border-emerald/50 hover:text-emerald transition-all active:scale-90">
                <FiMinus className="h-3.5 w-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-bold tabular-nums">{inCart.quantity}</span>
              <button
                onClick={() => increaseQty(food.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background hover:border-emerald/50 hover:text-emerald transition-all active:scale-90">
                <FiPlus className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(food)}
              className="rounded-full bg-emerald px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[oklch(0.47_0.1_165)] active:scale-[0.96]">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
