/*
 * DINA FOOD — "Emerald Harvest" RestaurantDetails
 * Hero banner, info card with rating/reviews/delivery, menu sections, food cards.
 */
import { useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { FiArrowLeft, FiClock, FiMapPin } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import FoodCard from "../components/FoodCard";
import NotFound from "./NotFound";
import { getRestaurant } from "../data/restaurants";
import { getFoodsByRestaurant } from "../data/foods";

export default function RestaurantDetails() {
  const { id } = useParams();
  const restaurant = getRestaurant(id);
  const [activeSection, setActiveSection] = useState("All");

  const foods = useMemo(() => (restaurant ? getFoodsByRestaurant(restaurant.id) : []), [restaurant]);
  const sections = useMemo(() => {
    const set = new Set(foods.map((f) => f.category));
    return ["All", ...Array.from(set)];
  }, [foods]);

  if (!restaurant) return <NotFound />;

  const visible = activeSection === "All" ? foods : foods.filter((f) => f.category === activeSection);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* ── Banner ── */}
        <section className="relative h-56 sm:h-72 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <Link
            href="/restaurants"
            className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-card/90 backdrop-blur px-4 py-2 text-sm font-semibold hover:bg-card transition-colors">
            <FiArrowLeft className="h-4 w-4" /> Back
          </Link>
        </section>

        <section className="container -mt-16 relative z-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Info card */}
            <div className="rounded-3xl bg-card p-6 shadow-md">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-3xl font-extrabold">{restaurant.name}</h1>
                  <p className="mt-1 text-muted-foreground">{restaurant.cuisine}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-butter px-3 py-1 text-sm font-bold">
                      <AiFillStar className="h-4 w-4 text-papaya" />
                      {restaurant.rating.toFixed(1)}
                      <span className="font-normal text-foreground/60">
                        ({restaurant.reviews.toLocaleString()} reviews)
                      </span>
                    </span>
                    <span className="text-muted-foreground">
                      {restaurant.priceRange} price range
                    </span>
                  </div>
                </div>
                {restaurant.offer && (
                  <span className="sticker rotate-[2deg] bg-butter px-4 py-2 text-sm font-bold shadow-sm">
                    {restaurant.offer}
                  </span>
                )}
              </div>

              <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3">
                  <FiClock className="h-4 w-4 text-emerald" />
                  <span>
                    <strong>{restaurant.deliveryTime} min</strong> delivery
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3">
                  <FiClock className="h-4 w-4 text-emerald" />
                  <span>
                    Fee{" "}
                    <strong>{restaurant.deliveryFee === 0 ? "Free" : `$${restaurant.deliveryFee.toFixed(2)}`}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3">
                  <FiMapPin className="h-4 w-4 text-emerald" />
                  <span>
                    <strong>{restaurant.distance}</strong> · {restaurant.address}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {restaurant.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-emerald/30 bg-emerald/5 px-3 py-1 text-xs font-semibold text-emerald">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Sticky cart hint */}
            <div className="hidden lg:block">
              <div className="rounded-3xl border border-border bg-card p-5 sticky top-24 shadow-sm">
                <h3 className="eyebrow mb-2">Craving more?</h3>
                <p className="text-sm text-muted-foreground">
                  Add dishes from the menu — your cart updates instantly and
                  keeps everything warm until checkout.
                </p>
                <Link
                  href="/cart"
                  className="mt-4 block rounded-full bg-emerald px-5 py-2.5 text-center text-sm font-semibold text-white transition-all active:scale-[0.97] hover:bg-[oklch(0.47_0.1_165)]">
                  Go to cart
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Menu ── */}
        <section className="container py-10">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 active:scale-[0.96] ${
                  activeSection === s
                    ? "bg-emerald text-white shadow-sm"
                    : "border border-border bg-card hover:border-emerald/40"
                }`}>
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((f, i) => (
              <div key={f.id} className="fade-up" style={{ animationDelay: `${(i % 6) * 50}ms` }}>
                <FoodCard food={f} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
