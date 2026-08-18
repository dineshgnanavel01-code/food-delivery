/*
 * HARVEAT — "Emerald Harvest" Footer
 * Deep forest band, pill links, warm cream text.
 */
import { Link } from "wouter";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

// Inline brand mark: emerald leaf with papaya fruit accent (same as Navbar, dark-footer variant).
const LOGO_MARK = (
  <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
    <path
      d="M20 4C10 6 5 14 5 23c0 7 5 13 15 13s15-6 15-13C35 12 28 5 20 4z"
      fill="oklch(0.55 0.1 165)"
    />
    <path d="M20 12v21" stroke="oklch(0.94 0.02 90)" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M20 17l-4 3.5M20 21l3.5 3M20 25l-3 2.5" stroke="oklch(0.94 0.02 90)" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="30" cy="9" r="5" fill="oklch(0.72 0.19 45)" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="mt-16 bg-[oklch(0.26_0.05_165)] text-[oklch(0.94_0.02_90)]">
      <div className="container py-12 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            {LOGO_MARK}
            <span className="sr-only">Harveat</span>
            <span className="font-display text-2xl font-extrabold">Harveat</span>
          </div>
          <p className="text-sm text-[oklch(0.82_0.03_85)] leading-relaxed">
            Fresh from the market, straight to your table. Honest food delivered
            from the best kitchens in your neighborhood.
          </p>
        </div>
        <div>
          <h4 className="eyebrow !text-[oklch(0.79_0.12_50)] mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/restaurants" className="hover:text-white transition-colors">Restaurants</Link></li>
            <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow !text-[oklch(0.79_0.12_50)] mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm">
            <li><span className="hover:text-white transition-colors">About us</span></li>
            <li><span className="hover:text-white transition-colors">Careers</span></li>
            <li><span className="hover:text-white transition-colors">Partner with us</span></li>
            <li><span className="hover:text-white transition-colors">Blog</span></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow !text-[oklch(0.79_0.12_50)] mb-4">Contact</h4>
          <ul className="space-y-2.5 text-sm text-[oklch(0.82_0.03_85)]">
            <li className="flex items-center gap-2"><FiMapPin className="h-4 w-4 text-papaya shrink-0" /> Downtown, New York</li>
            <li className="flex items-center gap-2"><FiPhone className="h-4 w-4 text-papaya shrink-0" /> +1 (555) 010-2468</li>
            <li className="flex items-center gap-2"><FiMail className="h-4 w-4 text-papaya shrink-0" /> hello@harveat.app</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[oklch(0.7_0.02_85)]">
          <span>© {new Date().getFullYear()} Harveat. All rights reserved.</span>
          <span>Freshly made with 🌿</span>
        </div>
      </div>
    </footer>
  );
}
