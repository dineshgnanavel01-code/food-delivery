/*
 * HARVEAT — "Emerald Harvest" fresh market style
 * Navbar: sticky, emerald wordmark, location pill, search, cart badge bounce.
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { FiMapPin, FiSearch, FiShoppingCart, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useTheme } from "../contexts/ThemeContext";

// Inline brand mark: emerald leaf with papaya fruit accent (replaces external logo asset).
const LOGO_MARK = (
  <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
    <path
      d="M20 4C10 6 5 14 5 23c0 7 5 13 15 13s15-6 15-13C35 12 28 5 20 4z"
      fill="oklch(0.47 0.1 165)"
    />
    <path
      d="M20 10c-5 1.5-8 6-8.5 11.5 2.5-3 5.5-4.5 8.5-4.5 3 0 6 1.5 8.5 4.5C28 16 25 11.5 20 10z"
      fill="oklch(0.68 0.09 165)"
    />
    <path d="M20 12v21" stroke="oklch(0.97 0.005 100)" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M20 17l-4 3.5M20 21l3.5 3M20 25l-3 2.5" stroke="oklch(0.97 0.005 100)" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="30" cy="9" r="5" fill="oklch(0.72 0.19 45)" />
  </svg>
);

const LOCATIONS = ["Downtown", "Uptown", "Westside", "Eastville"];

export default function Navbar() {
  const [location] = useLocation();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Downtown");
  const [bounce, setBounce] = useState(false);
  const [prevCount, setPrevCount] = useState(count);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (count > prevCount) {
      setBounce(true);
      const t = setTimeout(() => setBounce(false), 400);
      return () => clearTimeout(t);
    }
    setPrevCount(count);
  }, [count, prevCount]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/restaurants", label: "Restaurants" },
    { href: "/cart", label: "Cart" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-background/92 backdrop-blur-xl shadow-[0_4px_20px_-6px_rgba(14,60,45,0.18)]"
          : "bg-background/70 backdrop-blur-md"
      }`}>
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          {LOGO_MARK}
          <span className="sr-only">Harveat logo</span>
          <span className="font-display text-2xl font-extrabold text-foreground tracking-tight">
            Harveat
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                location === l.href
                  ? "bg-emerald text-white shadow-sm"
                  : "text-foreground/70 hover:text-foreground hover:bg-blush"
              }`}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right utilities */}
        <div className="flex items-center gap-2">
          <div className="relative hidden lg:block">
            <button
              onClick={() => setLocationOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-sm text-foreground/80 hover:border-emerald/40 transition-colors">
              <FiMapPin className="h-4 w-4 text-emerald" />
              <span className="max-w-24 truncate">{selectedLocation}</span>
              <span className="text-xs text-muted-foreground">▾</span>
            </button>
            {locationOpen && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-border bg-popover shadow-xl">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setLocationOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                      loc === selectedLocation
                        ? "bg-blush text-foreground font-semibold"
                        : "hover:bg-secondary"
                    }`}>
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/restaurants"
            className="hidden lg:flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm text-muted-foreground hover:border-emerald/40 transition-colors"
            aria-label="Search food and restaurants">
            <FiSearch className="h-4 w-4 text-emerald" />
            <span className="hidden xl:inline">Search food & restaurants…</span>
          </Link>

          {/* Compact search icon for small screens (between desktop pill and theme toggle) */}
          <Link
            href="/restaurants"
            className="lg:hidden flex items-center rounded-full border border-border bg-card p-2 text-muted-foreground hover:border-emerald/40 transition-colors"
            aria-label="Search">
            <FiSearch className="h-5 w-5" />
          </Link>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-secondary transition-colors"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
            {theme === "light" ? (
              <FiMoon className="h-5 w-5" />
            ) : (
              <FiSun className="h-5 w-5 text-butter" />
            )}
          </button>

          <Link href="/cart" className="relative p-2.5 rounded-full hover:bg-secondary transition-colors">
            <FiShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span
                key={count}
                className={`absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-papaya text-[11px] font-bold text-white ${
                  bounce ? "cart-bounce" : ""
                }`}>
                {count}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2.5 rounded-full hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu">
            {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4 pt-2 flex flex-col gap-1 fade-up">
          <div className="flex items-center gap-2 py-2 px-2 text-sm text-foreground/70 border-b border-border mb-1">
            <FiMapPin className="h-4 w-4 text-emerald" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-transparent flex-1 outline-none">
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                location === l.href
                  ? "bg-emerald text-white"
                  : "text-foreground/70 hover:bg-secondary"
              }`}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
