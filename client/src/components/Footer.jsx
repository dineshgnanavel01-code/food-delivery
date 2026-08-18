/*
 * HARVEAT — "Emerald Harvest" Footer
 * Deep forest band, pill links, warm cream text.
 */
import { Link } from "wouter";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

const LOGO = "/manus-storage/harveat-logo_216afe8f.png";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[oklch(0.26_0.05_165)] text-[oklch(0.94_0.02_90)]">
      <div className="container py-12 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <img src={LOGO} alt="Harveat" className="h-9 w-9" />
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
