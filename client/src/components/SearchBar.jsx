/*
 * DINA FOOD — "Emerald Harvest" SearchBar
 * Pill-shaped search input with emerald icon.
 */
import { FiSearch } from "react-icons/fi";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search food or restaurants…",
  className = "",
}) {
  return (
    <div className={`relative w-full max-w-xl ${className}`}>
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-emerald" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:border-emerald/60 focus:ring-2 focus:ring-emerald/15"
      />
    </div>
  );
}
