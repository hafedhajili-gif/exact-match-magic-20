import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarCheck, MapPin, Sparkles, Utensils } from "lucide-react";
import { worlds } from "@/lib/worlds";

export default function Home() {
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 50, y: 40 });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const onChange = () => setReduced(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % worlds.length), 6000);
    return () => window.clearInterval(id);
  }, [reduced]);

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const current = worlds[active];

  return (
    <main className="min-h-screen bg-black text-foreground">
      {/* HERO */}
      <section
        ref={heroRef}
        onMouseMove={onMove}
        className="relative isolate min-h-[100svh] overflow-hidden pt-16"
      >
        {/* Layered world images */}
        <div className="absolute inset-0 -z-10">
          {worlds.map((w, i) => (
            <img
              key={w.slug}
              src={w.image}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
              style={reduced ? undefined : { transform: i === active ? `scale(1.05) translate(${(cursor.x - 50) / 30}%, ${(cursor.y - 50) / 30}%)` : "scale(1)" }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-700"
            style={{ background: `radial-gradient(600px circle at ${cursor.x}% ${cursor.y}%, ${current.color}33, transparent 60%)` }}
          />
          <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")" }} />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-between gap-10 px-4 pb-12 pt-14 sm:pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-foreground/90 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" style={{ color: current.color }} />
              YUME · Sousse · Ouverture 2026
            </div>
            <h1 className="mt-6 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
              <span className="block text-gradient-brand">Un rêve dans lequel</span>
              <span className="block">vous pouvez entrer.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/75 sm:text-lg">
              Six mondes immersifs en 360°, projetés sur 4 murs LED 8K. Café · Lounge · Phygital. Choisissez votre univers — laissez-le vous transformer.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/reservations" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90">
                <CalendarCheck className="h-4 w-4" /> Réserver ma table
              </Link>
              <Link to="/menu" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-foreground backdrop-blur transition hover:bg-white/10">
                <Utensils className="h-4 w-4" /> Voir le menu
              </Link>
            </div>
          </div>

          {/* World selector strip */}
          <div>
            <div className="mb-3 flex items-end justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-white/60">Choose Your World</div>
                <div className="mt-1 text-2xl font-bold sm:text-3xl" style={{ color: current.color }}>
                  {current.name} <span className="text-white/40">·</span> <span className="text-white/80 italic font-light">{current.tagline}</span>
                </div>
              </div>
              <Link to={`/worlds/${current.slug}`} className="hidden shrink-0 items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 sm:inline-flex">
                Entrer dans {current.name} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {worlds.map((w, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={w.slug}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => (window.location.href = `/worlds/${w.slug}`)}
                    aria-label={`Aperçu du monde ${w.name}`}
                    className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                      isActive ? "border-white/60 ring-2 ring-offset-2 ring-offset-black" : "border-white/10 hover:border-white/30"
                    }`}
                    style={{ aspectRatio: "3 / 4", boxShadow: isActive ? `0 0 32px ${w.color}66` : undefined, ...(isActive ? { borderColor: w.color } : {}) }}
                  >
                    <img src={w.image} alt="" aria-hidden="true" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${isActive ? "scale-110 opacity-100" : "opacity-60 group-hover:opacity-90"}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-2 text-left">
                      <div className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: w.color }}>{w.tag}</div>
                      <div className="text-xs font-bold text-white">{w.name}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <Link to={`/worlds/${current.slug}`} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-bold text-white sm:hidden">
              Entrer dans {current.name} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CONCEPT TEASER */}
      <section className="relative border-t border-white/5 bg-black py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Le concept</div>
            <h2 className="mt-3 font-display text-4xl font-black leading-tight sm:text-5xl">
              Café, lounge, <span className="text-gradient-brand">expérience.</span>
            </h2>
            <p className="mt-5 text-white/70">
              YUME est un hub d'expérience digitale immersive. 4 murs LED 8K (7,04 m × 3,84 m chacun, P1.8 COB) transforment la salle en aquarium, en forêt zen, en Tokyo nocturne — à la demande. Vous changez de monde sans changer de fauteuil.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              {["360° immersif · ISEMC 8K", "Matcha Lab & cuisine japonaise halal", "Privatisations corporate & événements"].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/concept" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10">
                Découvrir l'expérience <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/corporate" className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-5 py-2.5 text-sm font-bold text-secondary hover:bg-secondary/20">
                Corporate & privatisations
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {worlds.slice(0, 4).map((w) => (
              <Link key={w.slug} to={`/worlds/${w.slug}`} className="group relative block overflow-hidden rounded-3xl border border-white/10" style={{ aspectRatio: "1 / 1" }}>
                <img src={w.image} alt={w.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: w.color }}>{w.tag}</div>
                  <div className="text-lg font-bold">{w.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK-FIND ROW: never hide essentials */}
      <section className="border-t border-white/5 bg-black py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3">
          {[
            { label: "Menu complet", desc: "Signature drinks · matcha · sushi · pâtisseries.", path: "/menu", icon: Utensils },
            { label: "Réserver", desc: "Date, heure, monde de votre choix.", path: "/reservations", icon: CalendarCheck },
            { label: "Nous trouver", desc: "Sousse, Tunisie · plan & horaires.", path: "/visit", icon: MapPin },
          ].map(({ label, desc, path, icon: Icon }) => (
            <Link key={path} to={path} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-primary/40 hover:bg-white/[0.06]">
              <Icon className="h-6 w-6 text-primary" />
              <div className="mt-4 text-lg font-bold">{label}</div>
              <div className="mt-1 text-sm text-white/65">{desc}</div>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Accéder <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER MINI */}
      <footer className="border-t border-white/5 bg-black py-10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} YUME · Sousse, Tunisie · Un rêve dans lequel vous pouvez entrer.
      </footer>
    </main>
  );
}