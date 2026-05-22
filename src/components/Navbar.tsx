import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CalendarCheck, Menu, Sparkles, X } from "lucide-react";
import yumeLogo from "@/assets/yume-logo.png";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "Concept", path: "/concept" },
  { label: "Menu", path: "/menu" },
  { label: "Galerie", path: "/gallery" },
  { label: "Corporate", path: "/corporate" },
  { label: "Voter", path: "/votes" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 18);
      setProgress(maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/82 shadow-2xl shadow-primary/10" : "bg-background/50"} border-b border-white/10 backdrop-blur-2xl`}>
      <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-150" style={{ width: `${progress}%` }} />

      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="group flex items-center gap-3 text-2xl font-black tracking-[0.22em] text-gradient-brand">
          <span className="relative grid h-12 w-12 place-items-center rounded-full border border-primary/30 bg-white/5 shadow-lg shadow-primary/20">
            <img src={yumeLogo} alt="YUME logo" className="h-10 w-10 rounded-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
            <span className="absolute inset-0 rounded-full border border-secondary/30 animate-pulse-glow" />
          </span>
          <span>YUME</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.045] p-1 backdrop-blur-xl lg:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  active ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                }`}
              >
                {active && <span className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-lg" />}
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/votes" className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-4 py-2 text-sm font-bold text-secondary transition-all hover:bg-secondary/15 hover:shadow-lg hover:shadow-secondary/10">
            <Sparkles className="h-4 w-4" /> Live vote
          </Link>
          <Link to="/reservations" className="premium-button inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:bg-primary/90">
            <CalendarCheck className="h-4 w-4" /> Réserver
          </Link>
        </div>

        <button
          className="rounded-full border border-white/10 bg-white/5 p-2 text-foreground lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Open navigation"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-background/95 px-4 pb-5 pt-2 backdrop-blur-2xl lg:hidden">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                  location.pathname === item.path ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/reservations"
              onClick={() => setMobileOpen(false)}
              className="premium-button mt-3 block rounded-2xl bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground hover:bg-primary/90"
            >
              Réserver maintenant
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
