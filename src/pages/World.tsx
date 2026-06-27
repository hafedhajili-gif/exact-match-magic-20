import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarCheck, Sparkles, Utensils } from "lucide-react";
import { getWorld, worlds } from "@/lib/worlds";
import NotFound from "./NotFound";

export default function World() {
  const { slug } = useParams<{ slug: string }>();
  const world = getWorld(slug);
  if (!world) return <NotFound />;
  const others = worlds.filter((w) => w.slug !== world.slug);

  return (
    <main className="min-h-screen bg-black text-foreground">
      <section className="relative min-h-[88svh] overflow-hidden pt-16">
        <img src={world.image} alt={world.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black" />
        <div
          className="absolute inset-0 mix-blend-screen opacity-40"
          style={{ background: `radial-gradient(60% 60% at 50% 40%, ${world.color}33, transparent 70%)` }}
        />

        <div className="relative mx-auto flex min-h-[calc(88svh-4rem)] max-w-7xl flex-col justify-end px-4 pb-16 pt-12">
          <Link to="/" className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur hover:bg-white/10">
            <ArrowLeft className="h-3.5 w-3.5" /> Tous les mondes
          </Link>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] backdrop-blur" style={{ color: world.color }}>
            <Sparkles className="h-3.5 w-3.5" /> {world.tag}
          </div>
          <h1 className="mt-5 font-display text-6xl font-black leading-[0.95] tracking-tight sm:text-8xl">
            {world.name}
          </h1>
          <p className="mt-5 max-w-2xl text-xl italic text-white/85 sm:text-2xl">{world.tagline}</p>
          <p className="mt-4 max-w-2xl text-white/70">{world.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/reservations" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-black transition hover:opacity-90" style={{ background: world.color, boxShadow: `0 0 30px ${world.color}66` }}>
              <CalendarCheck className="h-4 w-4" /> Réserver dans {world.name}
            </Link>
            <Link to="/menu" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur hover:bg-white/10">
              <Utensils className="h-4 w-4" /> Pairing menu
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-black py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {[
            { title: "Ambiance", items: world.ambience },
            { title: "Bande-son", items: [world.sound] },
            { title: "Pairing signature", items: [world.pairing] },
          ].map((b) => (
            <div key={b.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: world.color }}>{b.title}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: world.color }} />{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 bg-black py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-white/60">Voyager ailleurs</div>
              <h2 className="mt-2 font-display text-3xl font-black sm:text-4xl">Les autres mondes</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {others.map((w) => (
              <Link key={w.slug} to={`/worlds/${w.slug}`} className="group relative overflow-hidden rounded-2xl border border-white/10" style={{ aspectRatio: "3 / 4" }}>
                <img src={w.image} alt={w.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: w.color }}>{w.tag}</div>
                  <div className="text-sm font-bold">{w.name}</div>
                </div>
                <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-bold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                  Entrer <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}