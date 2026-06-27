import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CalendarCheck, ChevronDown, MapPin, Menu, Utensils, X } from "lucide-react";
import yumeLogo from "@/assets/yume-logo.png";
import { worlds } from "@/lib/worlds";

const utility = [
  { label: "Menu", path: "/menu", icon: Utensils },
  { label: "Réserver", path: "/reservations", icon: CalendarCheck },
  { label: "Visiter", path: "/visit", icon: MapPin },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [worldsOpen, setWorldsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const worldsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setWorldsOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (worldsRef.current && !worldsRef.current.contains(e.target as Node)) setWorldsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setWorldsOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/80 shadow-2xl shadow-primary/10" : "bg-black/40"
        } border-b border-white/10 backdrop-blur-2xl`}
      >
        <div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <Link to="/" className="group flex items-center gap-3 font-black tracking-[0.22em] text-gradient-brand">
            <span className="relative grid h-10 w-10 place-items-center rounded-full border border-primary/30 bg-white/5">
              <img src={yumeLogo} alt="YUME — Café & Lounge Sousse" className="h-9 w-9 rounded-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </span>
            <span className="text-xl">YUME</span>
          </Link>

          {/* Choose Your World */}
          <div ref={worldsRef} className="relative hidden md:block">
            <button
              onClick={() => setWorldsOpen((v) => !v)}
              aria-expanded={worldsOpen}
              aria-haspopup="true"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm font-semibold text-foreground transition-all hover:bg-white/10 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              Choose Your World
              <ChevronDown className={`h-4 w-4 transition-transform ${worldsOpen ? "rotate-180" : ""}`} />
            </button>

            {worldsOpen && (
              <div className="absolute left-1/2 top-[calc(100%+0.75rem)] z-50 w-[min(92vw,720px)] -translate-x-1/2 rounded-3xl border border-white/10 bg-black/90 p-3 shadow-2xl shadow-primary/20 backdrop-blur-2xl">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {worlds.map((w) => (
                    <Link
                      key={w.slug}
                      to={`/worlds/${w.slug}`}
                      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-black"
                      style={{ aspectRatio: "4 / 3" }}
                    >
                      <img src={w.image} alt={w.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: w.color }}>{w.tag}</div>
                        <div className="text-sm font-bold">{w.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between px-2 py-2 text-xs text-muted-foreground">
                  <span>6 univers immersifs · LED 8K 360°</span>
                  <Link to="/concept" className="font-semibold text-primary hover:underline">Le concept →</Link>
                </div>
              </div>
            )}
          </div>

          {/* Utility bar */}
          <div className="hidden items-center gap-1 md:flex">
            {utility.map(({ label, path, icon: Icon }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    active ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </div>

          <button
            className="rounded-full border border-white/10 bg-white/5 p-2 text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-black/95 px-4 pb-6 pt-3 backdrop-blur-2xl md:hidden">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Choose Your World</div>
            <div className="grid grid-cols-2 gap-2">
              {worlds.map((w) => (
                <Link key={w.slug} to={`/worlds/${w.slug}`} className="relative block overflow-hidden rounded-2xl border border-white/10" style={{ aspectRatio: "4 / 3" }}>
                  <img src={w.image} alt={w.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-75" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: w.color }}>{w.tag}</div>
                    <div className="text-xs font-bold">{w.name}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {utility.map(({ label, path, icon: Icon }) => (
                <Link key={path} to={path} className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-xs font-semibold text-foreground">
                  <Icon className="h-5 w-5 text-primary" />
                  {label}
                </Link>
              ))}
            </div>
            <Link to="/concept" className="mt-3 block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
              Le concept →
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile sticky Reserve */}
      <Link
        to="/reservations"
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-2xl shadow-primary/40 md:hidden"
      >
        <CalendarCheck className="h-4 w-4" /> Réserver
      </Link>
    </>
  );
}