/*
 * DINA FOOD — "Emerald Harvest" SearchBar
 * Pill-shaped search input with emerald icon.
 */
// Plain inline magnifier SVG (no icon library dependency — guaranteed to render on Vercel builds).
const SearchIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M20 20l-4.6-4.6" />
  </svg>
);

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search food or restaurants…",
  className = "",
}) {
  return (
    <div className={`relative w-full max-w-xl ${className}`}>
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-emerald" />
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
